# Handoff — Hydon BAI Artist Site

## Stack
Astro v5.18，纯 CSS，Content Collections (Markdown)。部署在 GitHub Pages，正式域名为 `https://hydonbai.art`，站点部署在域名根路径，无 `/artist-site` 前缀。开发服务器 `npm run dev`，默认 `http://localhost:4321/`。

## 当前发布与协作状态

- 本地项目路径：`/Users/yunshulucky/Desktop/AI_WorkSpace/artist-site`
- GitHub 仓库：`https://github.com/luciferbilibala-boop/artist-site`
- 正式域名：`https://hydonbai.art`
- GitHub Pages 使用 `.github/workflows/deploy.yml` 自动部署，推送到 `main` 后自动构建并发布。
- 域名相关配置：
  - `astro.config.mjs` 的 `site` 必须保持 `https://hydonbai.art`
  - `public/CNAME` 必须保持 `hydonbai.art`
  - `public/robots.txt` 的 sitemap 必须指向 `https://hydonbai.art/sitemap-index.xml`
- 每次内容或代码修改后，先运行 `npm run build`；通过后再 `git add`、`git commit`、`git push`。

## 目录结构
```
src/
├── components/   Nav / Footer / ImageViewer
├── layouts/      Base.astro（HTML shell）
├── pages/
│   ├── index.astro           首页
│   ├── about.astro           About
│   ├── method.astro          Method 主页（5步流程 + Read Full Essay入口）
│   ├── method/essay.astro    完整研究文章
│   ├── contact.astro         联系方式
│   ├── works/                5个系列（nobody/post-sacred/promised-land/sculpture/other）
│   ├── notes/                3篇笔记
│   ├── studio/               3件工作室作品
│   └── archive/index.astro   INTJ Archive（Live Photo卡片墙）
├── content/                  所有 Markdown 内容
│   └── config.ts             Schema 定义
└── styles/global.css         全局变量
```

## 关键页面状态

| 页面 | 状态 |
|------|------|
| Method 主页 | 完成：5张 Process 图就位，底部有 Read Full Essay 链接 |
| Method Essay | 完成：中英双语研究文章，5章节 + Manifesto |
| INTJ Archive | 完成：12条 Live Photo 条目，桌面 hover 播放，移动端点击 Play/Pause |
| Works 系列 | NOBODY/Promised Land/POST-SACRED 完成 L1-3，Sculpture/Other 占位 |
| Notes | 3篇占位，需替换内容 |
| Studio | 完成：3 件解耦指针条目，引用 Works 数据 + 销售字段 |
| About | 完成 |

## INTJ Archive 技术细节

- 条目在 `src/content/archive/*.md`
- Live Photo 方案：`<video poster="静态图.jpg">` + JS 控制播放；桌面端 hover 播放，移动端点击卡片 Play/Pause。
- 视频使用 `object-fit: contain` 保留完整画面
- 新条目流程：用户发 MOV → ffmpeg 转 MP4（不加缩放）+ 抽第一帧 JPG → 创建 md entry
- 命令模板：
  ```
  ffmpeg -y -i input.mov -vf "scale=720:-2" -c:v libx264 -crf 23 -an -movflags +faststart output.mp4
  ffmpeg -y -i input.mov -vframes 1 -q:v 2 poster.jpg
  ```
- Archive 不记录日期，schema 无 date 字段
- 分类：秩序 / 物证 / 失控

## 语义数字化标准工作流 (Semantic Digitalization & GEO)

新增/更新任何作品系列时，遵循三层数据架构，一步到位：

### Layer 1 — 人类内容
中英文展览前言、作品自述。写入 Markdown body 或 Astro 模板的结构化区域。

### Layer 2 — GEO / AI Agent 语义表示
高密度英文视觉事实描述，注入 frontmatter 的 `altText` 和 `description` 字段。聚焦颜色、材质、物体、空间关系——不做解释，只做视觉事实。60-80 词。用于搜索引擎和生成式 Agent 的语义桥接。

### Layer 3 —  Schema 元数据结构
精确物理属性，作为 frontmatter 显式 key：`dimensions`、`medium`、`year`、`artworkType: "VisualArtwork"`。绑定到 Astro Content Collections schema。

### 模板集成规则
- 每个作品系列模板（`nobody.astro`、`promised-land.astro`、`post-sacred.astro`）的图片 `alt` 属性必须动态绑定：`alt={imageAlt(filename, fallback)}` 或 `alt={data.coverAltText || data.title}`
- 封面图使用 `data.coverAltText`，单幅作品通过 `imageLookup` Map 从 `data.images[].altText` 取值
- 静态 fallback 保留但仅作兜底，优先使用 frontmatter 的语义数组

### 新增系列接入模板

```yaml
---
title: "[Artwork Title]"
description: "[One-sentence core semantic concept for AI agents]"
altText: "[60-80 words detailed English visual fact description]"
artworkType: "VisualArtwork"
medium: "[e.g., Oil on canvas]"
dimensions: "[e.g., 50 × 50 cm]"
year: "[Creation year]"
---
[Layer 1: Chinese & English statement in body]
```

### 当前覆盖状态

| 系列 | Markdown | 模板动态 alt | 状态 |
|------|----------|-------------|------|
| NOBODY | `nobody.md` — 9 works, full L1-3 | `nobody.astro` — imageAlt() | 完成 |
| Promised Land | `promised-land.md` — 3 works, full L1-3 | `promised-land.astro` — imageAlt() | 完成 |
| POST-SACRED | `post-sacred.md` — 4 works, full L1-3 | `post-sacred.astro` — imageAlt() | 完成 |
| Sculpture | 待补充 | 待检查 | 待办 |
| Other | 待补充 | 待检查 | 待办 |

## WORKS_STUDIO_SYNC — 新增作品双步流水线

触发短语：**"Please apply WORKS_STUDIO_SYNC for the following content"**

### 架构原则
- **Works = canonical archive**：所有作品元数据的唯一权威来源
- **Studio = curated primary-market view**：仅指针 + 销售字段，不复制 Works 数据
- Works 中的每张图片必须有稳定 `id` 字段（由 src 文件名派生），作为 Studio 的引用键

### Step 1: 创建 Works 规范条目
在对应系列的 markdown 文件中，于 `images` 数组内新增入口：

```yaml
- src: "/images/works/<series>/<filename>.jpg"
  id: "<stable-slug>"
  caption: "<Title CN> <Title EN>, <Year>, <Medium>, <Dimensions>"
  altText: "[60-80 words English visual fact description]"
  artworkType: "VisualArtwork"
  medium: "[e.g., Oil on canvas]"
  dimensions: "[e.g., 50 × 50 cm]"
  year: "[Year]"
  description: "[One-sentence AI agent semantic concept]"
```

如果图片不在已有系列中，先确认是否需要创建新系列 markdown 文件 + 对应 astro 模板。

### Step 2: 条件性创建 Studio 指针条目
仅当作品可供一级市场咨询时执行。在 `src/content/studio/` 新建 `{sourceWork}.md`：

```yaml
---
sourceSeries: "<series-slug>"
sourceWork: "<stable-id-from-works>"
sourceImage: "<filename>.jpg"
availability: "Available" | "Private Collection"
signature: "<signature details>"
certificate: true | false
framingStatus: "<framing description>"
collectorNote: "<one-line curatorial note>"
inquiryLink: "/contact?inquiry=<sourceWork>"
---
```

禁止在此复制长文、标题、年份、媒介、尺寸——全部从 Works 解析。

### 数据流
```
User content → Works markdown (canonical, L1-3)
                    ↓
              Studio markdown (pointer only, sales fields)
                    ↓
              studio/index.astro (resolves Works data via sourceSeries + sourceWork)
```

### 验证
每次同步后必须运行 `npm run build`，确认零错误、Works 页不变、Studio 页正确渲染新条目。

## 当前待办

1. Sculpture / Other 系列接入 L1-3 语义数字化
2. Notes 内容填充
3. Archive 可继续添加条目（用户会发 MOV 文件）
4. Archive 卡片目前无点击跳转，可考虑加详情页
5. 移动端已完成首轮优化：顶部导航为 `BAI + Menu`，Archive 视频支持点击播放；后续可继续微调排版、留白和作品详情页体验。
