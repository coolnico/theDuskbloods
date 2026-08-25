# Dusk Bloods Official Website

> 官方网站：[duskfloods.net](https://duskfloods.net)

Dusk Bloods 官方网站的开源项目，使用 Next.js 15 构建，部署在 Cloudflare Pages。

## 技术栈

- [Next.js 15](https://nextjs.org/) - React 框架
- [React 18](https://react.dev/) - UI 库
- [Tailwind CSS](https://tailwindcss.com/) - 样式框架
- [next-intl](https://next-intl.dev/) - 国际化支持
- [Cloudflare Pages](https://pages.cloudflare.com/) - 部署平台
- [OpenNext](https://opennext.js.org/cloudflare/) - Cloudflare 部署工具

## 功能特性

- 响应式设计，支持移动端适配
- 多语言支持（English, 日本語, 中文, Español, Français, Deutsch, 한국어, Italiano, Português）
- SEO 优化（sitemap, robots.txt）
- Google Analytics 集成

## 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── (root)/            # 主路由（英文）
│   └── [locale]/          # 多语言路由
├── components/            # React 组件
├── i18n/                  # 国际化配置
├── lib/                   # 工具函数
└── messages/              # 翻译文件
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3444
```

## 构建与部署

```bash
# 构建项目
npm run build

# 预览 Cloudflare 部署
npm run preview

# 部署到 Cloudflare Pages
npm run deploy
```

## 页面列表

- `/` - 首页
- `/about` - 关于游戏
- `/gameplay` - 游戏玩法
- `/characters` - 角色介绍
- `/release-date` - 发售日期
- `/faq` - 常见问题
- `/privacy` - 隐私政策
- `/terms` - 服务条款

## 许可证

MIT License

## 链接

- 官网：[duskfloods.net](https://duskfloods.net)
