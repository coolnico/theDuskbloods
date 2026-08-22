# Google AdSense 审计报告

**网站**: https://duskbloods.net
**审计日期**: 2026-08-21
**审计方式**: 自动化代码库分析
**网站类型**: Next.js 15 粉丝信息站，主题为 "The Duskbloods"（FromSoftware × Nintendo Switch 2）
**主要语言**: 英语（支持 9 种语言：en, ja, zh, es, fr, de, ko, it, pt）
**托管平台**: Cloudflare Workers（通过 OpenNext 部署）

---

## 审计结论

**未就绪（Not ready）** — 申请前必须修复多个阻断项和高风险项。

---

## 阻断项（Blockers）

### ADS-CONTENT-02：原创内容 vs 外部媒体嵌入

- **问题**: 网站嵌入了 YouTube 视频和来自 `media.fromsoftware.jp`（官方新闻素材）的热链图片。虽然文字内容是原创的，但图库和视频部分严重依赖第三方托管的媒体，且每个媒体素材缺少原创评论、编辑说明或分析。
- **证据**: `src/messages/en.json` — `home.screenshots` 引用外部截图；`home.videos` 嵌入 YouTube 预告片；`gameplay.sections[*].image` 和 `characters.roster.items[*].image` 均指向 `media.fromsoftware.jp`。
- **修复**: 为每个嵌入的视频和图片图库条目添加原创评论、分析或描述性上下文。确保每个嵌入媒体周围有大量发布者创建的文本（不仅仅是标题）。考虑将关键图片本地托管并附上适当归属。

### ADS-OWN-01 / ADS-OWN-02：网站所有权验证路径不明确

- **问题**: 尚无 AdSense 广告代码、meta 验证标签或 ads.txt。网站通过 OpenNext 部署到 Cloudflare Workers — 发布者必须确认可以将 AdSense 代码注入 `<head>`（目前通过 `src/app/layout.tsx` 实现）。
- **证据**: `public/` 中无 `ads.txt`。所有布局文件中无 AdSense meta 标签或广告代码。
- **修复**: 这不是永久性阻断项 — 发布者可以在 `layout.tsx` 的 `<head>` 中添加 AdSense 代码。申请前确认 Cloudflare 部署管道支持此操作。获取 AdSense 发布者 ID 后，创建包含正确 Google 卖家行的 `ads.txt`。

### ADS-PRIV-01：隐私政策未披露 Google 广告/分析数据收集

- **问题**: 当前隐私政策（`src/messages/en.json` → `privacy.paragraphs`）提到了"隐私友好的分析工具"和"用于语言偏好及广告/分析合作伙伴的 Cookie"，但未明确提及 Google、Google AdSense、Google Analytics、Cookie、Web Beacon、IP 地址或 Google 产品使用的其他标识符。
- **证据**: 隐私政策文本："We may use privacy-friendly analytics to understand aggregate traffic" 和 "cookies are used to remember your language preference and to support advertising or analytics partners."
- **修复**: 重写隐私政策，明确披露：(1) Google Analytics 的使用及其数据收集实践，(2) 第三方广告供应商（包括 Google）可能使用 Cookie、Web Beacon 和 IP 地址来投放广告，(3) Google 对 DART Cookie 的使用，(4) 用户如何通过 Google 广告设置和 DAA 退出页面选择退出。链接到 Google 的隐私政策。

### ADS-PRIV-04：无欧盟用户同意机制

- **问题**: 针对 EEA/UK 访客，没有 Cookie 同意横幅、CMP（同意管理平台）或任何同意机制。Google Analytics 在未经同意的情况下无条件加载给所有生产环境访客。
- **证据**: `src/components/GoogleAnalytics.tsx` — GA 在所有生产域名上加载，无同意检查。`package.json` 中无 CMP 库。无同意横幅组件。
- **修复**: 实现 CMP（例如 Google 认证的 CMP，或自建同意横幅），要求：(1) 在用户同意前阻止 Google Analytics 和广告脚本加载，(2) 提供细粒度的同意选项，(3) 存储同意状态，(4) 遵守 CCPA 的"不出售"要求。这是 Google 欧盟用户同意政策对 EEA/UK 流量的强制要求。

---

## 高风险项

### ADS-CRAWL-01：网站在线状态 — 验证所有关键 URL 返回 200

- **问题**: 无法仅从代码库完全验证。网站部署到 Cloudflare Workers，具有 ISR 重新验证（locale 路由 `revalidate = 172800`）。所有路由在构建时静态生成。404 页面存在（`[locale]/not-found.tsx`）。
- **证据**: `next.config.js` 中的构建配置，路由结构已确认，站点地图包含 10 个页面 × 9 种语言 = 90 个 URL。
- **修复**: 申请前，通过 `curl` 或浏览器手动验证所有站点地图 URL 返回 HTTP 200。检查 Cloudflare Workers 部署是否稳定且不会返回间歇性 5xx 错误。

### ADS-CRAWL-02：AdSense 爬虫访问 — robots.txt 和 Cloudflare

- **问题**: `robots.txt` 允许所有爬虫（`User-agent: *, Allow: /`），这很好。但是，Cloudflare 的默认安全设置可能会阻止 AdSense 爬虫（用户代理：`Mediapartners-Google`）。网站运行在 Cloudflare Workers 上 — 如果启用了机器人管理或 WAF 规则，可能会阻止爬虫。
- **证据**: `src/app/robots.ts` — `rules: { userAgent: '*', allow: '/' }`。无特定的 `Mediapartners-Google` 规则。Cloudflare 配置不在代码库中。
- **修复**: 在 Cloudflare 控制面板中，验证 AdSense 爬虫（`Mediapartners-Google`）未被机器人管理、WAF 规则或 IP 限制阻止。考虑在 `robots.ts` 中添加特定的 `User-agent: Mediapartners-Google` 规则并明确 `Allow`。

### ADS-CRAWL-06：DNS 和托管可靠性

- **问题**: 网站使用 Cloudflare Workers，提供出色的正常运行时间和全球分发。但是，`next.config.js` 中的 `images.unoptimized: true` 设置和 OpenNext 适配器相对较新，可能存在边缘情况。
- **证据**: `next.config.js` — `images: { unoptimized: true }`。OpenNext Cloudflare 适配器 v1.20.2。
- **修复**: 申请前监控网站 1-2 周。检查 Cloudflare Workers 分析中的错误率。确保自定义域名（`duskbloods.net`）正确解析且 SSL 配置正确。

### ADS-CONTENT-03：详情页内容深度

- **问题**: 网站的游戏玩法、角色和 FAQ 页面有大量内容。但是，图库页面（`src/components/views/GalleryView.tsx`）似乎是没有大量文本内容的截图图库 — 这是薄页面风险。
- **证据**: 图库页面在站点地图中 `priority: 0.8`。消息文件中的 `gallery` 命名空间内容很少。
- **修复**: 为图库页面添加描述性文本 — 每个截图的上下文、展示了什么、为什么重要。确保页面有足够的文本内容对用户和爬虫都有价值。

### ADS-PROG-04：流量来源

- **问题**: Google Analytics（`G-0QELYVWG7M`）已激活。网站似乎依赖自然搜索流量。没有付费流量、点击交换或垃圾邮件来源的证据。但是，无法仅从代码库完全验证。
- **证据**: `src/components/GoogleAnalytics.tsx` — 标准 GA4 实现。未检测到付费广告脚本。
- **修复**: 与网站所有者确认流量来源是自然/合法的。如果使用任何付费推广，确保着陆页是高质量且不具误导性的。

### ADS-UX-05：信任页面 — 关于和联系页面

- **问题**: 关于和联系页面存在，但无法从代码库完全验证其内容质量。关于页面应有关于网站及其作者的实质性、真实内容。联系页面应有可用的联系方式。
- **证据**: 页面存在于 `/about` 和 `/contact`。内容来自 i18n 消息。页脚包含关于非官方网站的免责声明。
- **修复**: 验证关于页面有真实的作者/发布者信息（不仅仅是游戏描述）。确保联系页面有可用的联系表单或电子邮件地址。如果适用于 AdSense，添加实际地址或注册商业实体。

### ADS-TXT-01：ads.txt 未配置

- **问题**: 不存在 `ads.txt` 文件。一旦知道 AdSense 发布者 ID，这是必需的。
- **证据**: `public/` 目录中无 `ads.txt`。`src/app/` 中无动态 `ads.txt` 路由。
- **修复**: 创建 `public/ads.txt`，包含正确的 Google 卖家行：`google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`（替换为实际发布者 ID）。或者，如果愿意，可以在 `src/app/ads.txt/route.ts` 创建动态路由。

---

## 中风险项

### ADS-CONTENT-06：混合语言内容

- **问题**: 网站支持 9 种语言，具有完整的国际化。所有页面内容都已正确翻译。但是，一些游戏特定术语（角色名称、能力名称如 "Blood Blade"、"Light of Hayern"）在所有语言版本中都是英文。这对专有名词来说是可以接受的，但应予以验证。
- **证据**: `src/messages/` 包含 9 个完整的 JSON 文件。角色名称和能力名称在各语言版本中保持一致。
- **修复**: 这通常是可接受的。确保所有 9 个语言版本的 JSON 文件是完整的，而不是部分翻译的。英文游戏术语在游戏网站中是标准的。

### ADS-CONTENT-07：评论区和用户生成内容

- **问题**: 网站上没有评论区、论坛或用户生成内容。这消除了 UGC 审核风险，但也意味着更少的互动信号。
- **证据**: 代码库中未检测到评论组件、UGC 提交表单或论坛页面。
- **修复**: 不需要立即操作。如果以后添加评论/UGC，在这些页面启用 AdSense 之前实施审核。

### ADS-CONTENT-08：SEO 关键词模式

- **问题**: 元数据和内容看起来是自然撰写的。标题/H1 模式是描述性的，没有关键词堆砌。但是，有些标题相当长（例如 "The Duskbloods — FromSoftware PvPvE Action Game for Nintendo Switch 2 (2026)"）。
- **证据**: `src/lib/seo.ts` — 标题模板 `%s | Duskbloods Guide`。`Metadata.*` 命名空间中的页面标题详细但自然。
- **修复**: 不需要立即操作。标题是描述性的且以用户为中心，这是适当的。监控任何过度优化的信号。

### ADS-UX-01：导航清晰度

- **问题**: 头部导航清晰，带有标签链接（Gameplay、Characters、Gallery、Network Test、Release Date、FAQ）。页脚有组织良好的部分（Explore、Site、Legal）。移动导航使用水平可滚动行。
- **证据**: `src/components/Header.tsx` — 带有桌面和移动导航的粘性头部。`src/components/Footer.tsx` — 包含所有关键页面的三列布局。
- **修复**: 不需要立即操作。导航结构良好且功能正常。

### ADS-UX-02：网站目的清晰度

- **问题**: 网站清楚地将自己定位为 "Duskbloods Guide" — 非官方粉丝信息中心。英雄部分、页脚免责声明和关于页面都表明这不是官方网站。
- **证据**: 消息中的 `nav.disclaimer`："The Duskbloods is a trademark of FromSoftware and Nintendo. This is an unofficial fan information site."
- **修复**: 不需要立即操作。网站的目的和关联状态已清楚传达。

### ADS-UX-03：欺骗性元素

- **问题**: 未检测到欺骗性导航、虚假下载按钮、误导性重定向或虚假播放按钮。网站的 CTA（"Explore Gameplay"、"Network Test Info"）是诚实的，指向真实内容。
- **证据**: `home.hero.ctaPrimary` 和 `home.hero.ctaSecondary` 中的 CTA 文本是描述性和准确的。
- **修复**: 不需要立即操作。

### ADS-UX-04：网站行为

- **问题**: 未检测到弹出窗口、弹出底部、自动下载或意外重定向。网站使用标准的 Next.js 导航。未发现恶意脚本或改变行为的代码。
- **证据**: 代码库中无弹出组件、重定向脚本或下载触发器。
- **修复**: 不需要立即操作。

### ADS-UX-06：类广告布局

- **问题**: 网站当前不显示广告。布局以内容为中心，具有暗黑奇幻美学。没有令人混淆的广告/内容分离问题。
- **证据**: 代码库中无广告组件、广告位占位符或广告相关 CSS。
- **修复**: 以后添加 AdSense 广告时，确保广告和内容之间有清晰的视觉分离。使用标准的 AdSense 广告标签（"广告"或"赞助内容"）。

### ADS-CRAWL-03：依赖 POST 的页面

- **问题**: 所有页面都可通过 GET 请求访问。未检测到表单或依赖 POST 的内容门控。
- **证据**: 所有路由都是标准的 Next.js 页面路由，没有 POST 要求。
- **修复**: 不需要立即操作。

### ADS-CRAWL-04：重定向链

- **问题**: 唯一的重定向是 `/en` → `/` 和 `/en/:path*` → `/:path*`（在 `next.config.js` 中配置）。这些是简单的单跳重定向，可以接受。
- **证据**: `next.config.js` — 包含 `/en` 路由的 `redirects` 数组。
- **修复**: 不需要立即操作。这些重定向是干净的，对语言路由策略是必要的。

### ADS-CRAWL-05：URL 稳定性

- **问题**: URL 是干净和稳定的。内容 URL 中没有会话 ID、用户特定参数或动态路径段。规范 URL 通过元数据中的 `alternates.canonical` 正确设置。
- **证据**: URL 结构：`/`、`/gameplay`、`/characters` 等。带语言前缀：`/ja`、`/zh/gameplay` 等。全部是静态路径。
- **修复**: 不需要立即操作。

### ADS-CRAWL-07：站点地图和索引

- **问题**: 存在全面的站点地图，覆盖所有 10 个页面 × 9 种语言 = 90 个 URL。站点地图通过 `src/app/sitemap.ts` 动态生成。所有页面都正确设置了 `hreflang` 替代链接。
- **证据**: `src/app/sitemap.ts` — 为所有页面和语言生成 URL，包含优先级和更新频率。
- **修复**: 不需要立即操作。站点地图结构良好。

### ADS-PROG-01：自我点击和展示量灌水

- **问题**: 没有自我点击或展示量灌水工具的证据。网站当前没有广告。这需要在放置广告后由所有者确认。
- **证据**: 未检测到自动化脚本、点击工具或展示量操纵代码。
- **修复**: 放置广告后，所有者必须承诺永远不点击自己的广告，不使用任何工具来灌充展示量或点击量。

### ADS-PROG-02：用户诱导点击广告

- **问题**: 未检测到 "support us by clicking ads" 或类似诱导性语言。网站的 CTA 以内容为中心。
- **证据**: 所有消息文件中无广告点击诱导文本。
- **修复**: 不需要立即操作。永远不要添加要求用户点击广告的文字。

### ADS-PROG-03：广告标签

- **问题**: 当前不显示广告。添加广告时，必须能够清楚地区分广告和内容。
- **证据**: 尚无广告组件存在。
- **修复**: 实施广告时，使用中性标签（"广告"、"赞助内容"），确保广告在视觉上与内容不同。不要使用 "推荐" 或 "精选内容" 等标签来标记广告。

### ADS-PROG-05：广告代码修改

- **问题**: 尚无广告代码存在。添加 AdSense 代码后，不得修改以灌充性能。
- **证据**: 代码库中无 AdSense 代码。
- **修复**: 按原样使用 AdSense 代码。不要包裹在 iframe 中、修改点击处理程序或添加人工间距来提高点击率。

### ADS-PROG-06：广告放置限制

- **问题**: 当前未放置广告。添加广告时，不得将其放置在电子邮件、软件、弹出窗口或非内容页面中。
- **证据**: 尚无广告放置代码存在。
- **修复**: 仔细规划广告放置。仅在内容页面上放置广告（不在隐私、条款、404 或空白页面上）。不要在弹出窗口、电子邮件或软件中放置广告。

### ADS-PROG-07：WebView 变现

- **问题**: 网站是标准网站，不是 WebView 应用。此要求不适用于本网站。
- **证据**: 网站在浏览器中运行，不在应用 WebView 中。Cloudflare Workers 提供标准 HTTP 响应。
- **修复**: 不适用。

### ADS-PUB-01 至 ADS-PUB-16：内容政策合规

- **问题**: 网站包含关于 "The Duskbloods" 的游戏指南/信息内容。未检测到非法内容、版权侵权（网站使用带有归属的官方新闻素材）、仇恨言论、暴力宣传、成人内容、欺骗性做法或政治虚假信息。网站正确声明了其非官方状态。
- **证据**: 所有消息文件和页面结构的内容分析。页脚免责声明："The Duskbloods is a trademark of FromSoftware and Nintendo. This is an unofficial fan information site and is not affiliated with or endorsed by FromSoftware or Nintendo."
- **修复**: 内容政策方面不需要立即操作。如果以后添加评论，继续监控 UGC。

### ADS-PUB-05：发布者身份

- **问题**: 网站清楚地将自己标识为非官方网站。关于页面应包含真实的发布者/作者信息。服务条款页面承认商标所有权。
- **证据**: 页脚免责声明、服务条款内容、关于页面存在。
- **修复**: 确保关于页面有真实的作者/发布者联系信息，不仅仅是游戏描述。

### ADS-REST-01 至 ADS-REST-08：受限库存

- **问题**: 没有受限内容类别适用于本网站。网站是关于电子游戏的（不受限制）。没有赌博、烟草、酒精、武器、处方药或成人内容。
- **证据**: 内容分析确认仅包含游戏相关内容。
- **修复**: 不适用。

### ADS-PRIV-02：第三方 Cookie 披露

- **问题**: 隐私政策提到了 "advertising or analytics partners"，但未明确披露第三方（Google）可能放置/读取 Cookie 或使用 Web Beacon/IP 地址。
- **证据**: 当前隐私文本："cookies are used to remember your language preference and to support advertising or analytics partners."
- **修复**: 更新隐私政策，明确声明："包括 Google 在内的第三方供应商使用 Cookie，根据用户对此网站或其他网站的先前访问来投放广告。"包括指向 Google 隐私政策和广告个性化设置的链接。

### ADS-PRIV-03：广告请求中的个人身份信息

- **问题**: 当前广告请求中未向 Google 传递个人身份信息。GA 实现是标准的，没有发送 PII 的自定义维度。
- **证据**: `src/components/GoogleAnalytics.tsx` — 标准 gtag.js 配置，无自定义用户数据。
- **修复**: 不需要立即操作。添加 AdSense 时，不要在广告请求参数中传递任何 PII。

### ADS-PRIV-05：位置数据

- **问题**: 未检测到精确位置数据收集。网站不请求地理位置权限。
- **证据**: 代码库中无 Geolocation API 使用或基于位置的功能。
- **修复**: 不适用。

### ADS-PRIV-06：儿童定向内容

- **问题**: 网站是关于一款适合青少年/成熟观众的电子游戏（FromSoftware 游戏通常被评级为 T 或 M）。内容不专门针对 13 岁以下儿童。但是，游戏的受众可能包括未成年人。
- **证据**: 游戏内容以动作/暴力为主。没有 COPPA 特定措施。
- **修复**: 如果网站不是儿童定向的（看起来不是），则不需要 COPPA 标记。但是，不要对可能主要由儿童查看的任何内容使用基于兴趣的定向。

### ADS-PRIV-07：Google 域名 Cookie

- **问题**: 未检测到在 Google 域名上设置、修改或删除 Cookie 的自定义代码。
- **证据**: 代码库中无针对 Google 域名的 Cookie 操纵代码。
- **修复**: 不适用。

### ADS-PRIV-08：敏感定向限制

- **问题**: 没有针对敏感类别的广告个性化定向证据。网站当前不构建受众列表或再营销细分。
- **证据**: GA4 实现是基本的，没有受众创建或再营销设置。
- **修复**: 添加 AdSense 时，不要基于健康、经济困难、种族、宗教、犯罪、政治派别、工会成员身份、性行为或性取向创建受众细分。

### ADS-PRIV-09：住房/就业/信贷定向

- **问题**: 不适用。网站不宣传住房、就业或信贷相关服务。
- **证据**: 代码库中无此类内容或广告。
- **修复**: 不适用。

### ADS-PRIV-10：基于兴趣的广告披露

- **问题**: 当前不提供个性化广告。添加 AdSense 后，将需要基于兴趣的广告披露和控制。
- **证据**: 尚无广告个性化设置存在。
- **修复**: 实施 AdSense 时，在隐私政策中包含基于兴趣的广告披露，并提供指向 Google 广告设置和 DAA 退出页面的链接。

### ADS-ELIG-01：年龄资格

- **问题**: 无法从代码库验证。发布者必须年满 18 岁或使用家长/监护人帐户。
- **证据**: 代码库中无年龄相关信息。
- **修复**: 与网站所有者确认。

### ADS-ELIG-02：重复帐户

- **问题**: 无法从代码库验证。发布者不应创建重复的 AdSense 帐户。
- **证据**: 代码库中无 AdSense 帐户信息。
- **修复**: 与网站所有者确认。

### ADS-ELIG-03：政策合规

- **问题**: 这是所有其他检查的总和。详见各个项目。
- **证据**: 不适用 — 元要求。
- **修复**: 解决本报告中识别的所有阻断项和高风险项。

### ADS-ELIG-04：托管产品

- **问题**: 不适用。网站自托管在 Cloudflare Workers 上，不在 Blogger、YouTube 或托管合作伙伴平台上。
- **证据**: 通过 `@opennextjs/cloudflare` 适配器部署。
- **修复**: 不适用。

### ADS-SITE-01：AdSense 网站管理

- **问题**: 网站尚未添加到 AdSense 帐户。这是流程步骤，不是代码问题。
- **证据**: 代码库中无 AdSense 配置。
- **修复**: 修复阻断项后，将网站添加到 AdSense 帐户，验证所有权并提交审核。

### ADS-SITE-02：所有权验证方法

- **问题**: 网站可通过以下方式验证：(1) `<head>` 中的 AdSense 广告代码，(2) ads.txt，或 (3) meta 标签。这三种方法在当前架构中技术上都可行。
- **证据**: `src/app/layout.tsx` 有一个 `<head>` 部分，可以放置 meta 标签或广告代码。`public/` 目录可以托管 `ads.txt`。
- **修复**: 选择一种验证方法并实施。广告代码方法最简单 — 将 AdSense 代码片段添加到 `layout.tsx`。

### ADS-TXT-02：ads.txt 建议

- **问题**: 发布 ads.txt 是为了防止未经授权的库存销售。
- **证据**: 不存在 `ads.txt`。
- **修复**: 获取 AdSense 发布者 ID 后创建 `public/ads.txt`。

### ADS-CONTENT-01：有用的原创内容

- **问题**: 网站有大量原创内容 — 详细的游戏玩法指南、角色描述、FAQ、网络测试信息和游戏机制解释。内容组织良好且信息丰富。风险在于部分内容依赖外部媒体（来自 FromSoftware CDN 的图片、YouTube 嵌入）。
- **证据**: `en.json` 包含 900 多行原创文本内容。游戏玩法指南有 10 多个详细部分。角色阵容有 6 个详细角色档案及能力。FAQ 有 15 多个问答项目。
- **修复**: 内容质量总体良好。确保每个页面有足够的原创文本（不仅仅是图片/视频）可以独立存在。图库页面可能需要更多文本内容。

### ADS-CONTENT-04：建设中

- **问题**: 网站已上线且功能正常。所有页面都有真实内容。角色页面有关于 "Full roster coming soon" 的说明，这对发布前游戏网站来说是可以接受的。
- **证据**: 所有 10 个页面都已实现并有真实内容。`characters.note` 部分说 "The complete Bloodsworn roster will be revealed as launch approaches."
- **修复**: 不需要立即操作。"即将推出" 的说明对尚未发布的游戏来说是适当的。

### ADS-CONTENT-05：广告与内容比例

- **问题**: 当前不显示广告。添加广告时，广告不得主导内容。
- **证据**: 不存在广告组件。
- **修复**: 实施广告时，保持合理的广告与内容比例。Google 建议每页不超过 3 个广告单元。确保广告不会将内容推到首屏以下。

---

## 完整检查清单

| ID | 状态 | 证据 | 下一步操作 |
| --- | --- | --- | --- |
| ADS-ELIG-01 | 未知 | 无法从代码库验证年龄 | 与网站所有者确认 |
| ADS-ELIG-02 | 未知 | 无法从代码库验证帐户状态 | 与网站所有者确认 |
| ADS-ELIG-03 | 失败 | 多个政策项目尚未解决 | 修复所有阻断项和高风险项 |
| ADS-ELIG-04 | 不适用 | 网站自托管在 Cloudflare Workers 上，不是托管平台 | 无需操作 |
| ADS-OWN-01 | 通过 | 发布者控制代码库；可通过 `layout.tsx` 注入 `<head>` | 验证 Cloudflare 部署支持代码注入 |
| ADS-OWN-02 | 通过 | 发布者拥有域名 `duskbloods.net` 并控制代码库 | 无需操作 |
| ADS-OWN-03 | 通过 | 网站使用标准 JS 渲染；Next.js SSR/SSG 生成完整 HTML | 无需操作 |
| ADS-SITE-01 | 未知 | 网站尚未添加到 AdSense 帐户 | 修复阻断项后将网站添加到 AdSense |
| ADS-SITE-02 | 通过 | 多种验证方法可用（广告代码、ads.txt、meta 标签） | 选择并实施一种方法 |
| ADS-TXT-01 | 失败 | 不存在 `ads.txt` 文件；未配置 AdSense 发布者 ID | 获取发布者 ID 后创建包含正确 Google 卖家行的 `ads.txt` |
| ADS-TXT-02 | 失败 | `ads.txt` 未发布 | 获取 AdSense 发布者 ID 后创建 `ads.txt` |
| ADS-CONTENT-01 | 通过 | 900 多行原创游戏玩法指南内容、角色数据、FAQ、网络测试信息 | 无需操作 |
| ADS-CONTENT-02 | 失败 | 图库和视频部分嵌入外部媒体（FromSoftware CDN、YouTube），每个素材缺少大量原创评论 | 为每个嵌入媒体添加原创评论 |
| ADS-CONTENT-03 | 通过 | 所有页面都有大量文本内容；游戏玩法页面有 10 多个详细部分 | 图库页面可以增加更多文本；添加描述性内容 |
| ADS-CONTENT-04 | 通过 | 网站已上线且有真实内容；"roster coming soon" 对发布前游戏是适当的 | 无需操作 |
| ADS-CONTENT-05 | 不适用 | 当前不显示广告 | 添加广告时监控广告与内容比例 |
| ADS-CONTENT-06 | 通过 | 所有 9 种语言版本都有完整翻译；英文游戏术语是可接受的专有名词 | 无需操作 |
| ADS-CONTENT-07 | 不适用 | 网站上无评论区或 UGC | 如果以后添加 UGC，实施审核 |
| ADS-CONTENT-08 | 通过 | 标题和内容是自然撰写的；未检测到关键词堆砌 | 无需操作 |
| ADS-UX-01 | 通过 | 头部有 6 个导航链接；页脚有 3 个组织良好的部分；移动导航正常 | 无需操作 |
| ADS-UX-02 | 通过 | 网站清楚标识为 "Duskbloods Guide" — 非官方粉丝中心；导航流程合乎逻辑 | 无需操作 |
| ADS-UX-03 | 通过 | 无欺骗性按钮、虚假下载、误导性重定向或导航中的广告位 | 无需操作 |
| ADS-UX-04 | 通过 | 无弹出窗口、弹出底部、自动下载或意外重定向 | 无需操作 |
| ADS-UX-05 | 通过 | About、Contact、Privacy 和 Terms 页面都存在且可从页脚访问 | 验证 About 页面有真实作者信息；确保 Contact 有可用方法 |
| ADS-UX-06 | 不适用 | 当前不显示广告 | 添加广告时规划清晰的广告/内容分离 |
| ADS-CRAWL-01 | 未知 | 无法从代码库验证实时 URL 的 HTTP 状态 | 手动验证所有站点地图 URL 返回 200 |
| ADS-CRAWL-02 | 失败 | `robots.txt` 允许所有爬虫但无特定 `Mediapartners-Google` 规则；Cloudflare 机器人管理状态未知 | 验证 Cloudflare 不阻止 AdSense 爬虫；添加特定规则 |
| ADS-CRAWL-03 | 通过 | 所有页面可通过 GET 访问；无依赖 POST 的内容 | 无需操作 |
| ADS-CRAWL-04 | 通过 | 唯一的重定向是 `/en` → `/`（单跳，干净） | 无需操作 |
| ADS-CRAWL-05 | 通过 | URL 是干净、稳定的静态路径；规范 URL 正确设置 | 无需操作 |
| ADS-CRAWL-06 | 未知 | Cloudflare Workers 托管应该可靠；无法验证实际正常运行时间 | 申请前监控网站稳定性 1-2 周 |
| ADS-CRAWL-07 | 通过 | 全面的站点地图包含 90 个 URL；所有页面都有 `hreflang` 替代链接 | 无需操作 |
| ADS-PROG-01 | 未知 | 尚未显示广告；无法验证点击行为 | 所有者必须承诺永远不点击自己的广告 |
| ADS-PROG-02 | 通过 | 无 "点击广告" 或 "支持我们" 的诱导性语言 | 无需操作 |
| ADS-PROG-03 | 不适用 | 尚未显示广告 | 添加广告时使用中性标签 |
| ADS-PROG-04 | 未知 | 无法从代码库验证流量来源 | 与所有者确认自然流量 |
| ADS-PROG-05 | 不适用 | 尚无广告代码存在 | 按原样使用 AdSense 代码；不要修改 |
| ADS-PROG-06 | 不适用 | 尚无广告放置存在 | 仅在内容页面上放置广告 |
| ADS-PROG-07 | 不适用 | 标准网站，不是 WebView 应用 | 无需操作 |
| ADS-PUB-01 | 通过 | 无非法内容或活动宣传 | 无需操作 |
| ADS-PUB-02 | 通过 | 使用带有归属的官方新闻素材；正确声明非官方状态 | 无需操作 |
| ADS-PUB-03 | 通过 | 无仇恨言论、歧视、骚扰或暴力宣传 | 无需操作 |
| ADS-PUB-04 | 通过 | 无动物虐待或濒危物种内容 | 无需操作 |
| ADS-PUB-05 | 通过 | 网站清楚标识为非官方粉丝资源；条款承认商标所有者 | 确保 About 页面有真实发布者信息 |
| ADS-PUB-06 | 通过 | 无网络钓鱼、虚假声明或欺骗性内容 | 无需操作 |
| ADS-PUB-07 | 通过 | 无促进不诚实行为的内容 | 无需操作 |
| ADS-PUB-08 | 通过 | 无成人主题、色情内容或儿童剥削内容 | 无需操作 |
| ADS-PUB-09 | 通过 | 网站身份清晰；元数据准确 | 获取发布者 ID 后添加 ads.txt |
| ADS-PUB-10 | 不适用 | 尚未显示广告 | 规划非侵入性广告放置 |
| ADS-PUB-11 | 不适用 | 尚未显示广告 | 仅在有大量内容的页面上显示广告 |
| ADS-PUB-12 | 不适用 | 尚未显示广告 | 不要在屏幕外或背景中放置广告 |
| ADS-PUB-13 | 通过 | 无虚假选举声明、有害健康声明或否认气候变化 | 无需操作 |
| ADS-PUB-14 | 通过 | 无用于政治欺骗的操纵媒体 | 无需操作 |
| ADS-PUB-15 | 通过 | 无儿童危害内容；网站是关于青少年评级的电子游戏 | 无需操作 |
| ADS-PUB-16 | 通过 | 无危机利用或不敏感内容 | 无需操作 |
| ADS-REST-01 | 通过 | 无色情内容、色情娱乐或色情产品 | 无需操作 |
| ADS-REST-02 | 通过 | 除正常游戏讨论外无令人震惊、血腥或暴力内容 | 无需操作 |
| ADS-REST-03 | 通过 | 无爆炸物、枪支或武器销售/说明 | 无需操作 |
| ADS-REST-04 | 通过 | 无烟草、毒品或相关用具内容 | 无需操作 |
| ADS-REST-05 | 通过 | 无酒精销售或不负责任的饮酒宣传 | 无需操作 |
| ADS-REST-06 | 通过 | 无赌博或付费机会游戏 | 无需操作 |
| ADS-REST-07 | 通过 | 无处方药销售或未经批准的补充剂 | 无需操作 |
| ADS-REST-08 | 不适用 | 未显示广告或视频广告 | 添加广告时监控广告遮挡 |
| ADS-PRIV-01 | 失败 | 隐私政策未披露 Google 特定数据收集（Cookie、Web Beacon、IP 地址） | 重写隐私政策，添加 Google 特定披露 |
| ADS-PRIV-02 | 失败 | 隐私政策未明确提及第三方广告供应商使用 Cookie/Web Beacon | 更新隐私政策措辞 |
| ADS-PRIV-03 | 通过 | 广告请求中未向 Google 传递 PII；标准 GA4 实现 | 无需操作 |
| ADS-PRIV-04 | 失败 | 无欧盟同意机制；GA 未经同意为所有访客加载 | 为 EEA/UK 流量实施 CMP/同意横幅 |
| ADS-PRIV-05 | 通过 | 无位置数据收集或 Geolocation API 使用 | 无需操作 |
| ADS-PRIV-06 | 通过 | 网站不是儿童定向的；内容是关于青少年评级的游戏 | 无需操作 |
| ADS-PRIV-07 | 通过 | 无 Google 域名上的 Cookie 操纵 | 无需操作 |
| ADS-PRIV-08 | 通过 | 无敏感类别定向；无受众列表或再营销 | 无需操作 |
| ADS-PRIV-09 | 不适用 | 网站不宣传住房、就业或信贷服务 | 无需操作 |
| ADS-PRIV-10 | 不适用 | 当前不提供个性化广告 | 实施 AdSense 时添加基于兴趣的广告披露 |

---

## 完整性检查

- **参考中的要求 ID 数量**: 60
- **报告中的要求 ID 数量**: 60
- **缺失的 ID**: 无

### 各部分明细：
- A. 资格和帐户要求: 4/4
- B. 网站所有权、验证和准备: 7/7
- C. 内容质量和网站价值: 8/8
- D. 导航、用户体验和信任信号: 6/6
- E. 可爬取性、访问和技术可用性: 7/7
- F. AdSense 计划政策要求: 7/7
- G. Google 发布者政策: 16/16
- H. Google 发布者限制: 8/8
- I. 隐私和数据要求: 10/10

---

## 所需操作汇总（按优先级排序）

### 申请前必须修复（阻断项）
1. **重写隐私政策** — 添加 Google Analytics、AdSense、Cookie、Web Beacon、IP 地址和 DART Cookie 的 Google 特定披露。(ADS-PRIV-01, ADS-PRIV-02)
2. **实施同意机制** — 添加 CMP/Cookie 同意横幅，在 EEA/UK 访客同意前阻止 GA 和广告脚本加载。(ADS-PRIV-04)
3. **为嵌入媒体添加原创评论** — 确保图库条目、YouTube 嵌入和外部图片周围有大量原创文本。(ADS-CONTENT-02)
4. **创建 ads.txt** — 获取 AdSense 发布者 ID 后，创建包含正确 Google 卖家行的 `public/ads.txt`。(ADS-TXT-01, ADS-TXT-02)

### 申请前应修复（高风险）
5. **验证 AdSense 爬虫访问** — 检查 Cloudflare 控制面板中是否有阻止 `Mediapartners-Google` 的机器人管理规则。(ADS-CRAWL-02)
6. **监控网站稳定性** — 验证所有 90 个站点地图 URL 返回 200；检查 Cloudflare Workers 错误率。(ADS-CRAWL-01, ADS-CRAWL-06)
7. **增强图库页面** — 为图库页面添加描述性文本内容。(ADS-CONTENT-03)
8. **验证 About/Contact 页面** — 确保 About 有真实作者信息，Contact 有可用方法。(ADS-UX-05)
9. **添加 AdSense 验证代码** — 准备好后，将 AdSense 代码片段添加到 `layout.tsx` 的 `<head>`。(ADS-OWN-01, ADS-SITE-02)

### 建议优化（中风险）
10. **规划广告放置策略** — 设计非侵入性广告位，保持清晰的广告/内容分离。(ADS-UX-06, ADS-PROG-03, ADS-CONTENT-05)
11. **确认流量来源** — 与所有者确认流量是自然/合法的。(ADS-PROG-04)
12. **将 `Mediapartners-Google` 添加到 robots.txt** — 明确允许 AdSense 爬虫。(ADS-CRAWL-02)
