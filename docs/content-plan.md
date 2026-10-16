# The Duskbloods 待办内容计划（v3 · 架构定稿版）

> 更新：2026-10 · `/guides` 攻略中心架构已落地（未部署）。
> 本文档是**待写文章清单 + 写作规范**。架构细节见下方「写作规范」，不重复实现文档。

---

## 一、架构现状（已完成，待部署）

```
/guides                    攻略 hub：人物图鉴/地图直链卡 + 6分类卡 + 最新攻略列表
/guides/tier-lists         分类页（强度榜与选角）
/guides/weapons            分类页（武器与配装）
/guides/maps               分类页（地图路线；顶部跳 /maps）
/guides/mechanics          分类页（游戏机制）
/guides/comparisons        分类页（对比与购买）
/guides/progression        分类页（成长与终局）
/guides/<article-slug>     攻略文章详情

/characters · /maps 等     静态资料页（与攻略双向互链，不重复写文章）
/latest/<slug>             新闻（时效内容；已上线 9 篇不动）
```

**分工铁律**：静态页吃资料词（characters/maps/gameplay/release-date），文章吃攻略词（tier list/best X/how to Y/vs Z/status）。写文章前先查静态页有没有同意图内容——有就不硬写。

---

## 二、写作规范（新文章怎么落）

```yaml
---
title: "The Duskbloods Tier List: Best Bloodsworn Ranked (2026)"
section: guides          # ← 加这行进 /guides；不写默认 news → /latest
date: "2026-10-15"
summary: "含关键词的独立短段（会作 meta description）"
image: "https://duskbloods.net/og.svg"
tags: ["tier-list", "characters"]   # ← 决定进哪些分类
---
```

- tags → 分类映射见 `src/lib/guides-categories.ts`
- 写完跑 `node scripts/generate-articles.mjs`
- 翻译放 `content/<locale>/` 同名文件；P0 配 ja/zh/zh-TW/ru，P1 配 ja/zh，其余 en fallback
- 发布前检查：title≤60字符含 The Duskbloods；内链≥1条到静态页；末尾 Sources；与清单内其他文章关键词不重复

---

## 三、待写文章清单

### 🔴 P0 — 立刻（发售前 6-8 周窗口）

| # | slug | 主关键词 | tags | 备注 |
|---|------|---------|------|------|
| 1 | duskbloods-tier-list | duskbloods tier list | tier-list | **网测预览版占位**，发售日回填正式版；发售周搜索量之王 |
| 2 | duskbloods-best-bloodsworn | best bloodsworn to start | tier-list, characters | 新手选谁；与 tier list 互链 |
| 3 | duskbloods-weapon-tier | best weapons duskbloods | weapons | 横向武器对比（roster 页只有单角色数据） |
| 4 | duskbloods-virtue-farming | how to get virtue fast | virtue, gameplay | 攻略意图（/gameplay 只讲机制） |
| 5 | duskbloods-vs-elden-ring | duskbloods vs elden ring | comparison, vs | FAQ 只有简答，对比词有独立搜索量 |
| 6 | duskbloods-beginner-tips | duskbloods tips | tips, gameplay | 20条经验清单（与 /gameplay tips 差异化：清单式） |

### 🟠 P1 — 11 月（发售前 2-4 周）

| # | slug | 主关键词 | tags | 备注 |
|---|------|---------|------|------|
| 7 | duskbloods-preorder-guide | duskbloods pre order | preorder, buying | 价格/版本公布后 48h 内发；此前先发占位版 |
| 8 | （扩写）october-2026-delay-risk | duskbloods delayed | — | 不新写，扩写旧文抢 delayed 词形 |
| 9 | duskbloods-full-roster | duskbloods full roster | characters | 12+ 全员情报流；随披露更新 |
| 10 | duskbloods-single-player | duskbloods single player | gameplay | 中等价值 |

### 🟡 P2 — 发售周

| # | slug | 主关键词 | tags | 时机 |
|---|------|---------|------|------|
| 11 | duskbloods-server-status | duskbloods server status | — | **发售日当天**（网测已暴露服务器问题，救援文必搜） |
| 12 | duskbloods-review | duskbloods review | — | 发售日 |
| 13 | duskbloods-day-one-mistakes | duskbloods mistakes | tips | 发售周 |

### 🔵 P3 — 发售后 1-8 周

| # | slug | 主关键词 | tags |
|---|------|---------|------|
| 14 | duskbloods-ending-story | duskbloods ending | ending |
| 15 | duskbloods-trophies | duskbloods trophies | trophies |
| 16 | duskbloods-patch-notes | duskbloods patch notes | patch（持续更新） |
| 17 | tier list 正式版回填 #1 | — | — |
| 18 | duskbloods-best-builds | best builds | builds |

---

## 四、日期公布日的应急动作（事件触发）

1. 更新 `/release-date` 静态页（facts/timeline/window 全改）+ `Metadata.releaseDate` 11语言
2. 4 篇旧发售日文章：正文更新为新日期；december-31 主文加汇总
3. P1 #7 preorder 文 48h 内发出
4. 首页 `networkBanner` 改为发售日公告

## 五、部署

- 状态：**代码已完成（含 /guides 架构），未部署**
- 命令：`npm run deploy`（Cloudflare Workers）
- 部署后验证：`/zh/guides`、`/guides/tier-lists`、`/latest` 旧文 200、sitemap 无 category 路径

## 六、指标目标（当前 30 天：3,451 浏览 · $5-10 广告）

| 节点 | 浏览量 | AdSense |
|------|--------|---------|
| 发售前 2 周 | 8k-12k | $20-40 |
| 发售周 | 30k-80k | $150-400 |
