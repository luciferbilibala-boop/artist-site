# Hydon BAI Artist Website — 项目现状

## 技术栈
- **Astro v5**（静态站点框架）
- 纯 CSS，无 UI 框架
- 内容管理：Astro Content Collections（Markdown + frontmatter）
- 部署在 GitHub Pages，正式域名 `https://hydonbai.art`
- 站点部署在域名根路径，无 `/artist-site` 前缀
- GitHub 仓库：`https://github.com/luciferbilibala-boop/artist-site`

## 发布配置

| 项目 | 当前值 |
|------|--------|
| 正式域名 | `https://hydonbai.art` |
| GitHub 仓库 | `https://github.com/luciferbilibala-boop/artist-site` |
| 自动部署 | `.github/workflows/deploy.yml` |
| Astro site | `astro.config.mjs` → `site: 'https://hydonbai.art'` |
| GitHub Pages CNAME | `public/CNAME` → `hydonbai.art` |
| Sitemap | `public/robots.txt` → `https://hydonbai.art/sitemap-index.xml` |

每次更新流程：修改内容 → `npm run build` → commit → push 到 `main` → GitHub Pages 自动部署。

## 目录结构

```
src/
├── components/
│   ├── Nav.astro          # 顶部导航
│   ├── Footer.astro       # 页脚
│   └── ImageViewer.astro  # 图片查看器组件
├── layouts/
│   └── Base.astro         # 基础布局（HTML shell + meta）
├── pages/
│   ├── index.astro        # 首页：LUCENTIQUE，最新文章入口
│   ├── about.astro        # About 页面
│   ├── method.astro       # Hydon BAI Method（核心方法论页）
│   ├── contact.astro      # 联系方式
│   ├── works/             # 作品系列页（nobody/post-sacred/promised-land/sculpture/other）
│   ├── notes/             # 笔记/文章（ai-images/louvre-40-minutes/on-surface）
│   ├── studio/            # 工作室作品（可售）
│   └── archive/           # INTJ Archive（Live Photo 卡片墙）
├── content/               # Markdown 内容，通过 Content Collections 管理
│   ├── config.ts          # Schema 定义
│   ├── works/             # 5个作品系列
│   ├── notes/             # 3篇笔记
│   ├── studio/            # 3件工作室作品
│   └── archive/           # 12条 INTJ Archive 条目
├── styles/
│   └── global.css         # 全局样式变量与基础样式
└── utils/
    └── paths.ts           # 路径工具
```

## 各页面状态

### 已完成
- **首页** — 功能完整，展示最新文章
- **About** — 内容已填充
- **Method** — 内容完整，5张 Process 步骤图已就位
- **Contact** — 功能完整
- **Works（系列页）** — 5个系列页 + 列表页，结构完成，图片大部分为占位符
- **Notes** — 3篇文章，结构完成
- **Studio** — 3件作品，结构完成
- **INTJ Archive** — **今天刚完成的核心功能**：
  - 12条条目，分三类：秩序 / 物证 / 失控
  - 支持 Live Photo：桌面 hover 播放短视频，移动端点击 Play/Pause
  - 技术方案：`<video poster="静态图">`，JS 控制 play/pause
  - 视频使用 MP4 (h.264)，视频使用 `object-fit: contain` 保留完整画面
  - 页面已移除日期显示
- **移动端首轮优化**：
  - 顶部导航在手机端显示为 `BAI + Menu`
  - Menu 展开后显示两列导航
  - Archive 视频卡片在手机端显示 Play/Pause 控制

### 待完善
- **Works**：大部分图片仍为占位符，需替换真实作品图
- **Notes**：3篇，内容可扩充
- **Studio**：图片占位，需替换
- **Archive**：可继续添加条目

## Content Collection Schema

### archive（INTJ Archive）
```ts
title: string
image: string           // 静态封面图路径
video?: string          // 可选，Live Photo 视频 (MP4)
category: '秩序' | '物证' | '失控'
tags: string[]
excerpt: string
location?: string
```

### works（作品系列）
```ts
title, subtitle, coverImage, order, category
images[], detailImages[], diptychImages[], exhibitionImages[]
```

### notes（笔记）
```ts
title, date, excerpt, category, coverImage?, type: 'text'|'image-text'|'video', videoUrl?, tags[]
```

### studio（工作室）
```ts
title, year, medium, dimensions, series, status: 'available'|'reserved'|'sold', images[], order
```

## 图片状态

| 目录 | 状态 |
|------|------|
| `/public/images/method/` | 5张 Process 步骤图，全部就位 |
| `/public/images/archive/` | 12组（jpg海报 + mp4视频），完整 |
| `/public/images/placeholder/` | 大量占位符图，Works/Notes/Studio 在用 |
| `/public/images/works/` | 部分真实图片 |

## 关键设计决策

1. **Method 页面**：核心文本中英双语，5步流程（Incision → Saturation → Reconstruction → Transfer → Disappearance）
2. **Archive Live Photo**：桌面 hover 触发播放，移动端点击播放/暂停；`video` poster 属性做静态封面，避免双层叠加在 Safari 上的黑帧问题
3. **Archive 不记录日期**：按文件添加顺序排列
4. **视频编码**：MOV → MP4 (libx264)，后续上传**不加缩放**，保留原始分辨率
5. **正式域名部署**：使用 `https://hydonbai.art` 根路径，禁止恢复 `/artist-site` 前缀

## 当前待讨论

- Works 系列页的真实图片替换
- Notes/Studio 内容的补充
- Archive 是否需要进一步分类或筛选功能
- 是否需要单条 Archive 的详情页（目前卡片点击无跳转）
- 移动端二轮优化（可选：作品详情页排版、Archive 详情页、图片加载策略）
