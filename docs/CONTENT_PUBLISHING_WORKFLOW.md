# Hydon BAI 网站内容发布流程

本文件规定作品系列从艺术项目母档进入艺术家网站时的存储关系。目标是让原始资料、编辑产物、网站资产和代码各自只有一个明确职责。

## 两个来源系统

### 1. 艺术项目母档

母档位于独立的内容发布工作区。每个系列使用以下结构：

```text
系列名称/
├── 00_MANIFEST.md
├── 01_source/
├── 02_production/
├── 03_final/
└── 04_web/
```

母档是原图、原始资料、最终PDF和社交媒体PNG的权威来源。网站仓库不得成为原始作品图的唯一存储位置。

### 2. 网站发布仓库

```text
artist-site/
├── src/content/works/{series}.md
├── src/pages/works/{series}.astro
├── src/content/studio/{work}.md
├── public/images/works/{series}/
├── public/downloads/
└── docs/series-manifests/{series}.md
```

各层职责：

- `src/content/works/`：标题、描述、作品清单、尺寸、媒介、年份、alt text与JSON-LD数据。
- `src/pages/works/`：系列特有的长文案、叙事顺序和视觉排版。
- `src/content/studio/`：可售作品状态；与Works页面分开维护。
- `public/images/works/`：网页发布图，不放母图、不放编辑过程图。
- `public/downloads/`：网站当前提供下载的文件。
- `docs/series-manifests/`：记录母档版本、网站文件映射、校验值和上线状态。

## 文件命名

- 系列slug使用小写英文和连字符，例如 `brittle-thorn`。
- 作品图使用稳定作品slug，例如 `pretty-vacant.jpg`。
- 网站下载文件名必须稳定且有明确版本，例如 `hydon-bai-the-brittle-thorn-series-booklet-v2.pdf`。
- 社交媒体页面使用两位页码前缀，例如 `01_cover.png`。
- 不使用 `final-final`、`final3`、`new` 等无法解释的版本名称。

## 发布门槛

### Gate A：母档确认

- 标题、中英文文案、作品信息均已确认。
- 最终PDF和单页PNG页数一致。
- 母图、PDF和生成脚本已归档。

### Gate B：网站准备

- Works结构化数据已更新。
- 专属页面文案与排版已更新。
- Studio销售状态已更新。
- 图片alt text与下载文件已检查。
- 系列发布清单已更新。

### Gate C：技术核验

- `npm run build` 成功。
- 页面、图片和PDF均能在构建产物中找到。
- Git提交只包含本次系列相关文件。

### Gate D：线上核验

- 页面返回HTTP 200。
- 下载文件返回HTTP 200。
- 线上PDF页数及校验值与母档一致。
- 检查桌面端与移动端页面。

## 版本与清理

1. 编辑过程中允许多个候选版本，但必须留在母档的制作阶段。
2. 用户确认后，只保留确认版、其生成脚本、原始资料和必要的发布记录。
3. 网站不保留未链接的旧PDF；如必须兼容旧链接，应在系列清单中明确说明。
4. 删除旧版前，先确认当前网站引用不指向旧文件。
5. 清理后记录释放空间、保留文件和对应Git提交。
