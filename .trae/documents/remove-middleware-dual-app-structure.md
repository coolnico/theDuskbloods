# 删除中间件，改用 pokegen 式双目录结构

## Context

当前 duskbloods 用 next-intl middleware 处理 i18n 路由：
- 访问 `/` → middleware rewrite 到 `/en` → 渲染 `/app/[locale]/page.tsx`
- 访问 `/about` → middleware rewrite 到 `/en/about` → 渲染 `/app/[locale]/about/page.tsx`
- 访问 `/zh` → middleware 解析前缀 → 渲染 `/app/[locale]/page.tsx`

问题：英文版路由依赖 middleware rewrite 才能匹配 `/app/[locale]/` 动态段。

pokegen 的做法是**双目录结构 + 共享页面内容**：
- `/app/page.tsx` — 英文首页，直接渲染共享的 client component
- `/app/about/page.tsx` — 英文 about，调用同一个 `makeStaticPage` 工厂
- `/app/[locale]/page.tsx` — 多语言版首页
- `/app/[locale]/about/page.tsx` — 多语言 about，调用同一个 `makeStaticPage` 工厂

**关键**：英文版和多语言版共用同一份页面内容组件——差异只在 metadata + breadcrumb + setRequestLocale 这层薄包装上。

## duskbloods 的复用机制（已就绪）

duskbloods 已经比 pokegen 更进一步：把页面内容拆成 `src/components/views/` 下的 client component（`HomeView`、`AboutView`、`GameplayView` 等）。

- 每个 View 是 `'use client'`，**不接受 `locale` prop**
- 通过 `useTranslations()` hook 从 `NextIntlClientProvider` 拿 locale 和 messages
- `LocaleShell` 在根 layout 里包裹 children，根据 URL 路径段检测 locale 并提供对应 messages

**结果**：英文版 `/app/about/page.tsx` 和多语言版 `/app/[locale]/about/page.tsx` 渲染的是**同一个 `<AboutView />` 组件实例**，差异只是：
1. `generateMetadata` 调 `getMetadata('en')` vs `getMetadata(locale)`
2. `setRequestLocale('en')` vs `setRequestLocale(locale)`
3. breadcrumb 写死 `'en'` vs 传 `locale`

页面内容（实际 HTML 结构）100% 共用，不存在内容重复。

## 改动范围

### 1. 删除 middleware

文件：`src/middleware.ts` — 直接删除。

删除后用其他机制替代 middleware 承担的两件事：
- `/en` → `/` 硬重定向：改用 `next.config.js` 的 `redirects()`（HTTP 302，不走 middleware 层）
- i18n 路由解析（rewrite `/` → `/en`）：不再需要，英文版文件存在后 Next.js 路由直接匹配静态路径

### 2. 创建 7 个英文版子页面（薄包装）

每个文件结构跟对应 `[locale]/xxx/page.tsx` 一致，差异只是：
- 去掉 `params: Promise<{ locale: string }>` 参数
- `setRequestLocale('en')` 写死
- `getMetadata('en')` 和 `makeBreadcrumbLd('en', ...)` 写死
- `<XxxView />` 完全相同（同一组件、同一 props）

模板（以 about 为例）：
```tsx
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { makePageMetadata, makeBreadcrumbLd } from '@/lib/page-helpers';
import AboutView from '@/components/views/AboutView';

const getMetadata = makePageMetadata({ namespace: 'Metadata.about', path: '/about' });

export function generateMetadata(): Promise<Metadata> {
  return getMetadata('en');
}

export default function AboutPage() {
  setRequestLocale('en');
  const breadcrumbLd = makeBreadcrumbLd('en', [
    { name: 'Home', href: '/' },
    { name: 'About' },
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <AboutView />
    </>
  );
}
```

要创建的文件（namespace 和 View 名来自对应 `[locale]/xxx/page.tsx`）：
- `src/app/about/page.tsx` — `Metadata.about`，`/about`，`AboutView`
- `src/app/privacy/page.tsx` — 复制时按对应 `[locale]/privacy/page.tsx` 的 namespace 和 View
- `src/app/terms/page.tsx` — 同上
- `src/app/gameplay/page.tsx` — `Metadata.gameplay`，`/gameplay`，`GameplayView`
- `src/app/characters/page.tsx` — 同上模式
- `src/app/faq/page.tsx` — 同上模式
- `src/app/network-test/page.tsx` — 同上模式

**`/app/page.tsx` 已经存在且结构正确**（之前已确认），不需要改动。

### 3. next.config.js 加 redirects

文件：`next.config.js`

加 `redirects()` 处理 `/en` 和 `/en/*` → `/` 和 `/*`，保留 SEO 友好性：

```js
async redirects() {
  return [
    { source: '/en', destination: '/', permanent: false },
    { source: '/en/:path*', destination: '/:path*', permanent: false },
  ];
}
```

### 4. localeDetection 配置（已做）

文件：`src/i18n/routing.ts` — 已添加 `localeDetection: false`。删除 middleware 后即使留着也无影响。

## 不需要改动

- `src/app/[locale]/` 目录全部保留 — 仍然服务 `/zh`、`/ja` 等带前缀路径
- `src/app/page.tsx` 和 `src/app/layout.tsx` — 已经是英文版，结构正确
- `src/components/views/*` — 共用的页面内容组件
- `src/components/LocaleShell.tsx` — 客户端 locale 检测（基于 URL 路径段）独立于 middleware
- `src/i18n/request.ts` — `requestLocale` 无效时回退到 `defaultLocale='en'`，已兼容无 middleware 场景
- `src/app/sitemap.ts` 和 `src/app/robots.ts` — 不依赖 middleware

## 验证步骤

1. dev server 已在跑（端口 3444），删除 middleware 后会热更新
2. curl 验证关键路由：
   - `GET /` → 200 英文（响应头**没有** `x-middleware-rewrite`）
   - `GET /about`、`/privacy`、`/terms`、`/gameplay`、`/characters`、`/faq`、`/network-test` → 200 英文
   - `GET /zh`、`/zh/about`、`/zh/gameplay` → 200 中文
   - `GET /en`、`/en/about` → 302 跳转到 `/`、`/about`（来自 next.config.js redirects）
3. 浏览器实际打开 http://localhost:3444/、http://localhost:3444/zh、http://localhost:3444/about 验证渲染正常
4. 抽查一个页面（如 `/about`）的 HTML 内容，确认和 `/zh/about` 渲染的是同一个 `AboutView` 组件（结构一致，文案不同）

## 风险与权衡

- **风险**：访问 `/about` 渲染的是 `/app/about/page.tsx`，需要确保 `Metadata` namespace、`View` 组件引用跟 `/app/[locale]/about/page.tsx` 一致。计划用对照模板逐个写，确保 namespace 和 View 名完全对齐。
- **权衡**：保留了 7 份薄包装 page.tsx（每份不到 30 行，且结构高度一致，维护成本低）。换来的好处是路由匹配不依赖 middleware，CDN 缓存命中率最大化，每个请求只消耗 1 次 Worker 额度（无 rewrite，无 307 跳转）。
- **真正复用的部分**：所有页面内容（`View` 组件）只在 `src/components/views/` 下写一份，英文版和多语言版都 import 同一个组件实例。这跟 pokegen 的 `makeStaticPage` 工厂本质一样，只是组织方式不同——duskbloods 用独立的 View 文件，pokegen 用工厂函数返回的组件。
