# Google AdSense 申请就绪审计报告（线上）

- **目标站点**: https://duskbloods.net
- **审计依据**: [yantoumu/adsense-site-auditor-skill](https://github.com/yantoumu/adsense-site-auditor-skill) · `references/adsense-requirements.md`（73 项 ADS-* 检查项）
- **审计类型**: 申请前就绪审计（pre-application）
- **证据范围**: 线上页面 HTTP 抓取 + 本仓库源码交叉验证（仅读取，未做任何修改）
- **审计日期**: 2026-10-25
- **快照说明**: Google 政策以官方文档为准；本清单源快照日期为 2026-06-16

---

## 决策

**Ready after fixes（修复后可申请）**

站点已具备较完整的 AdSense 申请基础：公开可访问、导航清晰、原创分析型内容扎实、隐私政策已披露 Google Analytics 与广告 Cookie / web beacon、`ads.txt` 已上线且含正确 Google 卖家行、无弹窗/误导按钮/违禁内容。未发现硬性政策违规（Blocker）。

申请前建议优先处理下列 **High** 风险，并补齐 Medium 项；账号/流量类 **Unknown** 项需站长确认。

---

## Blockers

**无。**

未发现会导致直接拒审的硬性违规：无违禁内容、无欺诈 UX、无爬虫封锁（robots 层面）、无占位/施工中站点、隐私政策已含 Google 产品数据披露。

---

## High Risks

- **`ADS-PRIV-04`**：隐私政策承诺「欧盟/英国适用 GDPR 或 ePrivacy 时会在非必要 Cookie / 个性化广告标识符之前征求同意」，但**线上并无 Cookie 同意横幅 / CMP**。当前 `GoogleAnalytics.tsx` 在生产域名客户端加载 GA（`anonymize_ip: true`, `allow_ad_personalization_signals: false`），会在同意前写入分析 Cookie。  
  - **证据**: 线上首页 HTML 无 consent UI 字符串（`Accept cookies` / `Cookie settings` 等均未命中）；`src/components/GoogleAnalytics.tsx` 在 `PROD_HOSTNAMES` 匹配后直接挂载 gtag；`src/messages/*.json` 隐私段落仅有「会征求同意」承诺。  
  - **官方依据**: Google EU 用户同意政策 / AdSense 隐私要求。  
  - **修复**: 申请前（至少启用广告前）接入简易 Cookie 同意横幅或 CMP：EEA/UK 默认不加载非必要 Cookie，同意后再初始化 GA/AdSense；提供「拒绝」与「撤回」路径。在 `allow_ad_personalization_signals` 与广告请求侧保持与同意状态联动。

- **`ADS-PUB-02`**：图库与角色页大量使用 **FromSoftware 官方图床** `media.fromsoftware.jp` 的官方截图（首页 9 张、图库 32 张等）。站内有署名（`imageCredit`: “Images in this article are official materials © FromSoftware / Nintendo”）与原创分析，但**是否获得官方媒体素材使用授权无法从外部核实**。游戏媒体站常见拒审点是「版权内容」。  
  - **证据**: 线上 `<img src="https://media.fromsoftware.jp/theduskbloods/...">`；图库页有原创逐帧分析；About/Terms 声明非官方、内容归原权利人。  
  - **官方依据**: Google 发布商政策 — 无版权侵权 / 无假冒。  
  - **修复**: 确认 FromSoftware/Nintendo 媒体条款是否允许转载；或改为自有二次创作/自摄截图/经授权素材；保留并强化「官方素材 + 原创分析」署名。若无法确认授权，申请前将图库改为不含官方位图的纯文字分析，或延迟至版权风险隔离后再上广告。

- **`ADS-CRAWL-02`（部分未知）**: `robots.txt` 对 `User-Agent: *` 为 `Allow: /`，对 `Mediapartners-Google` 无负面规则，**robots 层面不阻断**。但站点经 **Cloudflare Workers + Static Assets** 托管，Bot Management / WAF / 地域限制是否拦截 `Mediapartners-Google` 无法从外部确认。  
  - **证据**: 线上 robots.txt 全量允许；HTTP 头 `server: cloudflare`。  
  - **修复**: 在 Cloudflare 控制台确认未对 `Mediapartners-Google` / `AdsBot-Google` / `Googlebot` 启用挑战或拦截；必要时加显式 `User-Agent: Mediapartners-Google` + `Allow: /`。

---

## Medium Risks

- **`ADS-CRAWL-07`**: `sitemap.xml` 共 211 条 URL，覆盖 11 语言与新闻/攻略详情页，但 **英文主路径缺失**: `/maps`、`/kin`、`/contact`、`/system-requirements` 未写入 sitemap（页面本身可访问）。  
  - **证据**: 线上 sitemap 枚举 EN 路径 29 条，不含上述四条；`curl` 四页均 200。  
  - **修复**: 在 `src/app/sitemap.ts` 的 `PAGES` 中补全上述路径（contact 可低 priority）。

- **`ADS-CONTENT-03`**: 部分栏目正文偏薄（去除导航后约 390–480 词）：`/maps` ≈ 484 词、`/kin` ≈ 412、`/network-test` ≈ 391。对比之下 `/gameplay` ≈ 2077、`/faq` ≈ 1616、攻略详情 1200–1772 词。  
  - **修复**: 为 maps/kin/network-test 补充机制说明、区域/阵营结构、报名步骤与更新日志，目标每页 ≥ 800–1000 词原创正文。

- **`ADS-PRIV-10`**: 隐私政策已含 Google Ads Settings / GA Opt-out / aboutads.info 退出链接（个性化广告披露基本齐全），但同意管理与「广告选择」运营位尚未与 CMP 打通。  
  - **修复**: 与 `ADS-PRIV-04` 一并在同意横幅中提供个性化广告开关或指向 Google 广告设置的入口。

- **`ADS-UX-05`（增强项）**: About/Contact/Privacy/Terms 均真实可访问，含邮箱 `contact@duskbloods.net` 与非官方免责声明。若 AdSense 侧要求实体主体信息，可补充「运营者 / 注册主体」一句（非必须，视审核反馈）。

- **`ADS-PROG-03` / 广告位预留（前向）**: 当前**未投放 AdSense 广告代码**（`NEXT_PUBLIC_ADSENSE_CLIENT` 未设置，线上 HTML 无 `adsbygoogle`）。这是合理的申请期做法。启用广告后需保证广告与内容区分清晰、不伪装成下载/播放按钮、不占据导航位。

---

## Low / 建议项

- 薄页面 `/contact`（约 187 词）属正常联系页，无需扩充。
- `/en` → `/` 重定向正常；URL 稳定、带 canonical / hreflang / JSON-LD（WebSite、VideoGame、BreadcrumbList 等）。
- 隐私政策完整度高于多数申请站：Analytics、广告 Cookie、web beacon、IP、儿童、GDPR 选择、权利与联系方式均已覆盖。
- 语言共 11 种（en/ja/zh/zh-TW/es/fr/de/ko/it/pt/ru），均为 AdSense 支持语言。
- 无评论 / UGC，`ADS-CONTENT-07` 无审核压力。

---

## Exhaustive Checklist（73 项全覆盖）

| ID | Status | Evidence | Next action |
| --- | --- | --- | --- |
| ADS-ELIG-01 | Unknown | 需站长确认申请人 ≥18 岁或使用监护人账号 | 申请前由账号持有人确认 |
| ADS-ELIG-02 | Unknown | `ads.txt` 已含 `pub-8183721371181494`，说明已有 AdSense 账号 | 确认为同一出版商唯一账号、用「添加站点」而非新开号 |
| ADS-ELIG-03 | Pass | C–H 节未发现硬性违规；余留 High 见上 | 处理 High 项后再提交 |
| ADS-ELIG-04 | N/A | 自有域名独立站，非 Blogger/YouTube 托管产品 | — |
| ADS-OWN-01 | Pass | Next.js 源码可控；`Document.tsx` 提供 `<head>` 注入点（AdSense snippet 可开关） | 保持 `NEXT_PUBLIC_ADSENSE_CLIENT` 可注入 |
| ADS-OWN-02 | Pass | 自有域名 `duskbloods.net`，线上可改 HTML/CMS 路径 | — |
| ADS-OWN-03 | Pass | 页面为 JS 正常渲染的 Next.js SSR/静态页，head/body 结构完整 | — |
| ADS-SITE-01 | Unknown | 无法访问 AdSense 后台站点状态（Ready/Getting ready） | 后台添加站点并完成审核流 |
| ADS-SITE-02 | Pass | 验证可行路径：ads.txt 已上线；亦可 meta / 广告代码 | 任选一种验证（推荐 ads.txt + 广告代码） |
| ADS-TXT-01 | Pass | `https://duskbloods.net/ads.txt` → `google.com, pub-8183721371181494, DIRECT, f08c47fec0942fa0` | 保持 publisher ID 与账号一致 |
| ADS-TXT-02 | Pass | `ads.txt` 已公开发布 | — |
| ADS-CONTENT-01 | Pass | 原创攻略/分析：Albert 指南 1772 词、Tier List 1240 词、PvPvE 深文 1110 词等 | 保持更新与原创性 |
| ADS-CONTENT-02 | Pass | 官方截图 + 明显原创评述（图库逐帧解读、攻略机制拆解）；非纯聚合 | 继续强化原创比例；版权见 ADS-PUB-02 |
| ADS-CONTENT-03 | Pass | 主内容页充实；maps/kin/network-test 偏薄（见 Medium） | 补齐薄页正文 |
| ADS-CONTENT-04 | Pass | 全站可访问，无 lorem / coming soon / 空壳栏目 | — |
| ADS-CONTENT-05 | Pass | 当前无广告、无联盟块；正文占主导 | 上广告后维持广告密度 ≤ 内容 |
| ADS-CONTENT-06 | Pass | 主语言 en，另 10 语言均为 AdSense 支持语言 | — |
| ADS-CONTENT-07 | N/A | 无评论区 / UGC | 若加评论需先建审核 |
| ADS-CONTENT-08 | Pass | 标题/H1/正文无堆砌关键词、无 doorway 模式 | — |
| ADS-UX-01 | Pass | Header/Footer 导航完整，含移动端横向滚动导航 | — |
| ADS-UX-02 | Pass | 栏目结构清晰（Guides/Latest/Gameplay/…），页内有面包屑与相关链接 | — |
| ADS-UX-03 | Pass | CTA 为站内栏目链接（Explore Gameplay / View the Characters 等），无假下载/假播放 | 保持 |
| ADS-UX-04 | Pass | 无强制跳转、无 popunder、无下载触发；外链仅多语言站内 | — |
| ADS-UX-05 | Pass | `/about` `/contact`（contact@duskbloods.net）`/privacy` `/terms` 均 200 且有实质内容 | 可选补运营主体 |
| ADS-UX-06 | Pass | 无仿广告布局 | 上广告后使用中性标签 |
| ADS-CRAWL-01 | Pass | 抽检 18 个 URL 全部 200（含 /guides、/latest/*、11 语言首页） | — |
| ADS-CRAWL-02 | Unknown | robots 允许全部；Cloudflare Bot/WAF 对 Mediapartners-Google 状态未知 | 后台确认爬虫放行 |
| ADS-CRAWL-03 | Pass | 内容页均为 GET 可访问，无 POST-only | — |
| ADS-CRAWL-04 | Pass | `/en` → `/` 等重定向极少且稳定 | — |
| ADS-CRAWL-05 | Pass | 简洁 URL（`/guides/duskbloods-albert-guide`），带 canonical | — |
| ADS-CRAWL-06 | Pass | DNS 解析正常；TLS 1.3；证书 `CN=duskbloods.net`，有效期至 2027-01-16 | — |
| ADS-CRAWL-07 | Pass | 已有 sitemap.xml（211 URLs）并写入 robots；但缺 /maps /kin /contact /system-requirements | 补 sitemap 条目 |
| ADS-PROG-01 | Unknown | 是否自点广告/刷量需站长声明 | 签署合规承诺，禁自点 |
| ADS-PROG-02 | Pass | 无「请点击广告支持我们」类文案或箭头引导 | — |
| ADS-PROG-03 | N/A | 当前未展示广告 | 启用后使用「广告/Advertisement」中性标签 |
| ADS-PROG-04 | Unknown | 流量来源（SEO/社交/付费）需站长说明 | 确保自然流量为主，避免 PTC/交换点击 |
| ADS-PROG-05 | N/A | 线上无广告代码（`AdSenseSnippet` 未启用） | 启用后原样使用官方代码 |
| ADS-PROG-06 | Pass | 无邮件/弹窗/非内容页/仿 Google 页广告位 | — |
| ADS-PROG-07 | N/A | 普通网站，非 App WebView 变现 | — |
| ADS-PUB-01 | Pass | 游戏资讯站，无非法活动/侵权教程 | — |
| ADS-PUB-02 | Unknown | 使用 media.fromsoftware.jp 官方截图并署名 + 原创分析；授权状态无法外部核实 | 确认媒体素材授权或替换素材 |
| ADS-PUB-03 | Pass | 无仇恨/歧视/骚扰/暴力颂扬/恐怖主义内容 | — |
| ADS-PUB-04 | N/A | 无动物虐待/濒危物种商品 | — |
| ADS-PUB-05 | Pass | 页脚/About/Terms/Privacy 多处声明 unofficial fan site、非 FromSoftware/Nintendo 关联 | 保持 |
| ADS-PUB-06 | Pass | 无钓鱼、无虚假暴富承诺、无误导服务 | — |
| ADS-PUB-07 | Pass | 无假证件/作弊/破解/间谍软件内容 | — |
| ADS-PUB-08 | Pass | 无成人/儿童性化内容 | — |
| ADS-PUB-09 | Pass | 站点身份明确；ads.txt 与 Google 卖家 ID 一致 | 账号侧保持映射准确 |
| ADS-PUB-10 | Pass | 无广告遮挡/挤出内容/逼点退出 | 上广告后按官方布局规范 |
| ADS-PUB-11 | Pass | 无广告叠在空白/施工/纯复制页（当前未上广告） | 避免在最薄页首批上广告 |
| ADS-PUB-12 | N/A | 无屏外/背景页广告位 | — |
| ADS-PUB-13 | Pass | 发售日页明确区分 confirmed / rumor / placeholder（如 12/31 占位说），无虚假健康/选举/气候断言 | — |
| ADS-PUB-14 | Pass | 图片为官方截图；无政治/社会议题深度伪造 | — |
| ADS-PUB-15 | Pass | 无儿童性剥削/诱拐相关内容 | — |
| ADS-PUB-16 | N/A | 无利用敏感突发事件牟利的内容 | — |
| ADS-REST-01 | N/A | 无性/成人主题 | — |
| ADS-REST-02 | Pass | 游戏战斗/哥特美术属常规游戏媒体，非血腥震撼博眼球 | — |
| ADS-REST-03 | N/A | 无爆炸物/枪械改装教程 | — |
| ADS-REST-04 | N/A | 无烟草/毒品内容 | — |
| ADS-REST-05 | N/A | 无酒类销售/豪饮推广 | — |
| ADS-REST-06 | N/A | 无在线赌博 | — |
| ADS-REST-07 | N/A | 无处方药/药房/违禁 App | — |
| ADS-REST-08 | Pass | 无广告遮挡/隐藏视频控件/违规自动播放广告 | — |
| ADS-PRIV-01 | Pass | `/privacy` 明确披露 Google Analytics、广告 Cookie、web beacon、IP、标识符及用途 | 保持政策与实现同步 |
| ADS-PRIV-02 | Pass | 明确写有第三方（含 Google）可放置/读取 Cookie 与 web beacon | — |
| ADS-PRIV-03 | Pass | GA 配置 `anonymize_ip: true` + `allow_ad_personalization_signals: false`；未见 URL/查询传 PII | 启用广告后同样禁止 PII 入广告请求 |
| ADS-PRIV-04 | Fail | 政策承诺 EU 同意，但线上无同意横幅/CMP，GA 在同意前即可能写 Cookie | 实现 Cookie 同意横幅再申请/上广告 |
| ADS-PRIV-05 | N/A | 不收集精确定位 | — |
| ADS-PRIV-06 | Pass | 隐私声明非儿童向（not directed at children under 13） | — |
| ADS-PRIV-07 | Pass | 无脚本操作 Google 域 Cookie | — |
| ADS-PRIV-08 | N/A | 无基于敏感类别（健康/宗教/性取向等）的个性化广告或受众列表 | — |
| ADS-PRIV-09 | N/A | 无住房/就业/信贷类定向广告 | — |
| ADS-PRIV-10 | Pass | 已提供 Google Ads Settings、GA Opt-out、aboutads.info 链接 | 与 CMP/广告选择控件打通 |

---

## Completeness Check

- Requirement IDs in reference: **73**
- Requirement IDs in report: **73**
- Missing IDs: **none**

| 分区 | 数量 | Pass | Fail | Unknown | N/A |
| --- | ---: | ---: | ---: | ---: | ---: |
| A. Eligibility | 4 | 1 | 0 | 2 | 1 |
| B. Ownership/Site/ads.txt | 7 | 6 | 0 | 1 | 0 |
| C. Content Quality | 8 | 7 | 0 | 0 | 1 |
| D. Navigation/UX | 6 | 6 | 0 | 0 | 0 |
| E. Crawlability | 7 | 6 | 0 | 1 | 0 |
| F. AdSense Program | 7 | 2 | 0 | 2 | 3 |
| G. Publisher Policies | 16 | 12 | 0 | 1 | 3 |
| H. Publisher Restrictions | 8 | 2 | 0 | 0 | 6 |
| I. Privacy/Data | 10 | 6 | 1 | 0 | 3 |
| **合计** | **73** | **48** | **1** | **7** | **17** |

Unknown 明细（7）: `ADS-ELIG-01` `ADS-ELIG-02` `ADS-SITE-01` `ADS-CRAWL-02` `ADS-PROG-01` `ADS-PROG-04` `ADS-PUB-02`  
Fail 明细（1）: `ADS-PRIV-04`

**最终状态计数: Pass 48 · Fail 1 · Unknown 7 · N/A 17 = 73**

---

## 申请前行动清单（按优先级）

1. **实现 Cookie 同意横幅 / 简易 CMP**（EEA/UK）；同意前不加载 GA 广告信号与 AdSense。(`ADS-PRIV-04`, `ADS-PRIV-10`)
2. **确认官方截图使用授权**，或隔离/替换 `media.fromsoftware.jp` 素材。(`ADS-PUB-02`)
3. **Cloudflare 控制台放行** `Mediapartners-Google` / `AdsBot-Google` / `Googlebot`。(`ADS-CRAWL-02`)
4. **补全 sitemap**：`/maps` `/kin` `/contact` `/system-requirements`。(`ADS-CRAWL-07`)
5. **加厚** `/maps` `/kin` `/network-test` 正文。(`ADS-CONTENT-03`)
6. **站长确认**：年龄/账号唯一性、无自点、流量来源合法。(`ADS-ELIG-01/02`, `ADS-PROG-01/04`)
7. 后台将站点标为 Ready 后，**再**设置 `NEXT_PUBLIC_ADSENSE_CLIENT` 并以中性标签投放广告。(`ADS-SITE-01`, `ADS-PROG-03`, `ADS-PUB-10`)

---

## 审计方法（证据来源）

| 检查 | 手段 |
| --- | --- |
| 页面可达性 | Python urllib 抽检 18 路径（首页/栏目/新闻/攻略/隐私/条款/多语言）全部 HTTP 200 |
| robots / sitemap / ads.txt | 直接 GET 线上文件全文 |
| 隐私与信任页 | 剥离标签后全文审阅 `/privacy` `/about` `/contact` `/terms` |
| 内容深度 | 各页正文词数；攻略 1110–1772 词，栏目 391–2077 词 |
| 广告/同意/追踪 | 线上 HTML 扫描 `adsbygoogle`/`googlesyndication`/GA/consent 字符串；源码核对 `Document.tsx`、`GoogleAnalytics.tsx` |
| 导航与 CTA | 解析首页全部 `<a>/<button>` 文案与外链 host |
| TLS/DNS | socket + ssl 握手，证书有效期 |
| 版权素材 | 图片 host 枚举（`media.fromsoftware.jp`）+ 文内署名字符串 |

---

*本报告仅审计、不修改站点。未对线上或仓库做任何代码变更。*
