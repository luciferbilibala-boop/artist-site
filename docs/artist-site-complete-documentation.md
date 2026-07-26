# Hydon BAI Artist Website — Complete Documentation for LLM

> This document provides a complete, machine-readable description of the Hydon BAI artist website (https://hydonbai.art). It covers site architecture, all content, the three-layer semantic system, and every page. Designed for an LLM to understand the full site without needing to open URLs.

---

## 1. Site Overview

- **Artist**: Hydon BAI (当代艺术家)
- **Domain**: https://hydonbai.art
- **GitHub**: https://github.com/luciferbilibala-boop/artist-site
- **Tech Stack**: Astro v5 (static site), pure CSS, Content Collections (Markdown + Zod schemas)
- **Deployment**: GitHub Pages via `.github/workflows/deploy.yml`, auto-deploys on push to `main`
- **Local path**: `/Users/yunshulucky/Desktop/AI_WorkSpace/Hydon BAI/artist-site`
- **Dev server**: `npm run dev` → `http://localhost:4321/`

---

## 2. URL Structure / Sitemap

```
https://hydonbai.art/
├── /                              Homepage — signature, manifesto, featured video, nav grid
├── /works/                        Works index — grid of 7 series cards
├── /works/brittle-thorn/          The Brittle Thorn series — 4 paintings (2025)
├── /works/nobody/                 NOBODY series — 9 paintings + 1 diptych
├── /works/promised-land/          Promised Land series — 3 paintings
├── /works/post-sacred/            POST-SACRED series — 4 paintings
├── /works/absence/                ASSENZA (Absence) series — 12 monotype prints
├── /works/sculpture/              Sculpture series (placeholder, no L1-3 yet)
├── /works/other/                  Other works (placeholder, no L1-3 yet)
├── /notes/                        Notes index — 3 essays
├── /notes/ai-images/              "Observations on AI-Generated Images"
├── /notes/louvre-40-minutes/      "40 Minutes Before a Painting at the Louvre"
├── /notes/on-surface/             "Studio Notes: On 'Surface'"
├── /studio/                       Studio index — 4 collectible works
├── /studio/nobody-in-control/     Studio: Nobody in Control
├── /studio/nobody-is-watching/    Studio: Nobody Is Watching
├── /studio/odyssey-at-apogee/     Studio: Odyssey at Apogee
├── /studio/specimen/              Studio: Specimen
├── /archive/                      INTJ Archive — 12 Live Photo cards (3 categories)
├── /about/                        About — artist statement, bio, exhibitions, awards
├── /method/                       Method — 5-step process with images
├── /method/essay/                 Full research essay (Chinese + English, 5 chapters)
├── /contact/                      Contact page
```

---

## 3. Three-Layer Semantic Architecture

Every content entry uses a three-layer data model:

### Layer 1 — Human-Readable Content
Chinese and English text in Markdown body. Exhibition prefaces, artwork statements, concept notes. This is what human visitors read.

### Layer 2 — AI / Search Engine Semantic Representation
High-density English visual fact descriptions in frontmatter fields:
- `description`: One-sentence core semantic concept for AI agents
- `altText` / `coverAltText`: 60–80 word English visual fact descriptions. Color, material, objects, spatial relationships. No interpretation — pure visual facts.
- Used for: search engine indexing, AI agent semantic bridging, `<img alt>` attributes

### Layer 3 — Machine-Readable Schema.org Structured Data
Explicit physical properties as frontmatter keys: `artworkType`, `medium`, `dimensions`, `year`. Rendered by `JsonLd.astro` component into JSON-LD. Schema types: `CollectionPage` → `CreativeWorkSeries` → `VisualArtwork`.

### Template Binding Rules
- Cover images: `alt={data.coverAltText || data.title}`
- Individual works: `imageLookup` Map resolves `images[].altText` by filename
- Static fallbacks exist but semantic data takes priority
- JSON-LD is auto-generated from frontmatter arrays

---

## 4. Content Collection Schemas (from `src/content/config.ts`)

### works (7 collections)
```typescript
{
  title: string
  subtitle: string
  coverImage: string
  description?: string
  coverAltText?: string
  order: number
  category: string
  images?: Array<{
    src: string
    id?: string
    caption?: string
    width?: number
    altText?: string
    artworkType?: string
    medium?: string
    dimensions?: string
    year?: string
    description?: string
  }>
  detailImages?: Array<{...}>
  diptychImages?: Array<{...}>
  exhibitionImages?: Array<{...}>
  publishedAt?: Date
}
```

### notes (3 entries)
```typescript
{
  title: string
  date: Date
  excerpt?: string
  category: string
  coverImage?: string
  type: 'text' | 'image-text' | 'video'
  videoUrl?: string
  tags?: string[]
}
```

### archive (12 entries)
```typescript
{
  title: string
  image: string          // static poster frame path
  video?: string         // optional Live Photo MP4
  category: '秩序' | '物证' | '失控'
  tags: string[]
  excerpt: string
  location?: string
}
```

### studio (4 entries — pointer-only, resolves Works data)
```typescript
{
  sourceSeries: string       // which Works collection
  sourceWork: string         // stable id from Works images array
  sourceImage: string        // filename
  availability: 'Available' | 'Private Collection'
  signature?: string
  certificate?: boolean
  framingStatus?: string
  collectorNote?: string
  inquiryLink?: string
}
```

**Studio architecture principle**: Studio = curated primary-market view. Only pointers + sales fields. Never duplicates Works data. All metadata (title, year, medium, dimensions) is resolved from Works at render time.

---

## 5. Full Content — Works Series

### 5.1 The Brittle Thorn / 徒花棘 (order: 0, category: "painting")

**Frontmatter metadata:**
- title: "徒花棘"
- subtitle: "The Brittle Thorn"
- description: "The Brittle Thorn by Hydon BAI — a 2025 oil painting series in which pomegranates, pistols, flowers, and domestic objects expose the fragility concealed within beauty, abundance, and everyday order."
- coverImage: "/images/works/brittle-thorn/the-sabotage.jpg"

**4 works, all 2025 oil on canvas:**
1. "Pretty Vacant 漂亮的空虚" (40×40cm) — A pistol served on a white platter among opened pomegranates, loose seeds, and red juice.
2. "Anarchy in the Domestic 日常的刺杀" (40×60cm) — A pistol enters a pale domestic table filled with fruit, flowers, glass vessels, and spreading pomegranate juice.
3. "The Sabotage 静物即破坏" (40×60cm) — A cooled banquet aftermath with an empty plate, darkening juice, scattered fruit, and a remaining handgun.
4. "No Future 被人塑造的未来" (40×60cm) — A synthetic yellow duck follows an ivory heel across turquoise tiles, broken pomegranates, petals, and a rope.

**Series structure:** 01 诱惑 / Seduction → 02 潜入 / Intrusion → 03 余波 / Aftermath → 04 驯化 / Conditioning.

**Core concept:** The series reworks the Vanitas/虚空派 still-life tradition by moving danger from future decay into the present domestic environment. Beauty does not simply oppose violence; it makes danger acceptable, while danger reveals the fragility of abundance. The English title is "The Brittle Thorn", with "Pomegranate, Pistols, and the Fragile Everyday" as its subtitle.

**Template**: `src/pages/works/brittle-thorn.astro` — a bespoke bilingual editorial layout with orientation-aware image presentation and a downloadable 18-page series booklet PDF.

### 5.2 NOBODY (order: 1, category: "painting")

**Frontmatter metadata:**
- title: "NOBODY"
- subtitle: "Nobody is the state before becoming someone."
- description: "NOBODY series by Hydon BAI — oil paintings exploring identity, instinct, and awareness through the recurring figure of a child with a Buddha-like face."
- coverImage: "/images/works/nobody/the-interval.jpg"
- coverAltText: "A prominent contemporary oil painting featuring a white, winged, doll-like cherub figure sleeping peacefully face down on a dark upright piano. Above it floats a red-and-white striped carousel canopy with small white horse silhouettes, set against a solid, vibrant red background."

**9 individual works + 1 diptych:**
1. "永恒循环 Repetition" (2025, Oil on canvas, 40×60cm) — Two bald, winged infants with closed Buddha-like eyes riding a vintage carousel. Teal-green background.
2. "拒绝下沉 The Refusal to Sink" (2025, Oil on canvas, 60×60cm) — Infant in white spacesuit inside a pink inflatable flamingo float, drifting on textured turquoise water.
3. "The Interval" (2025, Oil on canvas, 50×50cm) — Bald, winged cherub sleeping face down on a dark upright piano, carousel canopy floating above against intense reddish-orange background.
4. "Nobody Is Watching" (2025, Oil on canvas, 50×70cm) — Top-down view: infant in spacesuit floating in turquoise pool, empty pink flamingo float nearby.
5. "Nobody Plays Here" (2026, Oil on canvas, 50×50cm) — Child in spacesuit at indoor pool with green tiles, wearing flamingo ring, three toy warships floating.
6. "不在其所 Out of Place" (2025, Oil on canvas, 50×60cm) — Underwater: infant in spacesuit with wire net on helmet, standing on grid tiles surrounded by red goldfish in dark green water.
7. "The Performed Self" (2026, Oil on canvas, 50×50cm) — Warm domestic scene: toddler kicking a brown bear holding pillow, feathers floating, vintage lamps.
8. "Nobody in Control" (2025, Oil on canvas) — Bald child with closed eyes behind red stage curtains, holding puppet strings over miniature city, walls covered with maps and newspaper clippings.
9. "被继承的循环 The Inherited Loop" (2025, Oil on canvas, 40×60cm each) — **Diptych**: Left panel shows empty carousel framework under flat blue/sand sky; right panel shows bald cherub sleeping on grey piano against solid blue background.

**Series structure (from template):**
- Section: 出现 Presence — "Nobody first appears as a body, not as an identity." (Repetition, The Interval)
- Section: 对抗 Friction — "Nobody tests the world before understanding it." (The Refusal to Sink, Nobody Plays Here, The Performed Self, The Inherited Loop)
- Section: 悬置 Suspension — "Nobody is the state before becoming someone." (Nobody Is Watching, Out of Place, Nobody in Control)

**Template**: `src/pages/works/nobody.astro` renders L1 concept notes (Chinese concept explanation: theme logic, repetition/de-individuation, child+Buddha duality), exhibition preface (CN+EN bilingual), stage markers, individual works with `imageAlt()` dynamic binding, and a downloadable PDF catalogue link.

---

### 5.3 Promised Land / 前往应许之地 (order: 2, category: "painting")

**Frontmatter metadata:**
- title: "前往应许之地"
- subtitle: "Toward the Promised Land"
- description: "The title artwork and core philosophy of 'Toward the Promised Land' series by Hydon BAI, mapping cosmic exploration onto the classical structure of an Odyssey."
- coverImage: "/images/works/promised-land/odyssey-at-apogee.jpg"
- coverAltText: "A grand contemporary oil painting. In the foreground, four figures in pale blue robes stand closely together, their faces obscured by neoclassical blue sculptural masks or expressive stone-like faces with closed eyes. Above them, a large circular architectural portal or spaceship window opens up to a view of a massive, glowing orange planet casting a warm light into the dark cosmic background."

**3 works:**
1. "《远地点上的奥德赛》Odyssey at Apogee" (2020, Oil on canvas, 100×70cm) — Four figures in blue robes with neoclassical masks, circular portal opening to glowing orange planet.
2. "《信徒与流放者》Believers and Exiles" (2020, Oil on canvas, 80×60cm) — Three identical female figures in blue garments inside dark spaceship cabin, a lone astronaut floating away into deep space.
3. "《应许之地的太空羊》Space Sheep of the Promised Land" (2020, Oil on canvas, 70×70cm) — Golden desert dunes under pale blue sky, a dense flock of white sheep wearing transparent glass space helmets packed behind a barrier.

**Body content (Layer 1):** Full Chinese + English exhibition introduction and individual artwork statements for each piece. The series maps space exploration onto ancient epic structures (Odysseus, Moses exodus). Central theme: all outward exploration is inward searching; all extreme departures are about coming home.

**Template**: `src/pages/works/promised-land.astro`

---

### 5.4 POST-SACRED / 后神圣时代 (order: 3, category: "painting")

**Frontmatter metadata:**
- title: "POST-SACRED"
- subtitle: "后神圣时代"
- description: "POST-SACRED series by Hydon BAI — oil paintings exploring the reconstruction of faith through deconstructed bodies, biological specimens, and cyber-spiritual systems in a post-human era."
- coverImage: "/images/works/post-sacred/specimen.jpg"
- coverAltText: "A crisp contemporary oil painting showcasing a headless and legless human skeletal torso suspended inside a transparent glass aquarium filled with water. Bright orange and white koi fish swim gently through the chest and pelvic bones, interspersed with pale pink roses growing out of the structure against a calm turquoise background."

**4 works:**
1. "Specimen 标本" (2025, Oil on canvas, 40×60cm) — Headless/legless skeletal torso in glass aquarium with koi fish and pink roses.
2. "Seed 种子" (2025, Oil on canvas, 50×60cm) — Skull and rib cage in white planter box, coral-orange roses sprouting from bone cavities, koi fish floating in ambient air.
3. "Artificial Enlightenment 人工觉悟" (2025, Oil on canvas, 50×70cm) — Serene Buddha statue with neon pink visor over eyes, cybernetic arm with IV drip bag labeled 囍 (Double Happiness).
4. "The New Idol 新神" (2025, Oil on canvas, 50×50cm) — Dark stone Buddha in lotus meditation, massive glowing red digital screen behind, IV drip stand silhouetted against purple background.

**Template**: `src/pages/works/post-sacred.astro`

---

### 5.5 ASSENZA / 不在场 (order: 5, category: "monotype")

**Frontmatter metadata:**
- title: "不在场"
- subtitle: "ABSENCE — The Exile of the Subject and the Simulacrum of Life"
- description: "独幅版画系列《不在场》ASSENZA by Hydon BAI — 主体的流放与生命的拟像，用物质的极端确定性对抗数字虚无"
- coverImage: "/images/works/absence/absence-01.jpg"
- coverAltText: "A monotype print from the ASSENZA series. An isolated shopping cart rendered in muted tones against a textured, grainy background reminiscent of industrial electronic noise. The image bears the surface quality of the Hydon BAI Method — a deterministic monotype process where the original drawing is destroyed at the moment of printing."

**12 monotype prints (2018):**
All rendered through the Hydon BAI Method (deterministic monotype). Subjects: shopping cart, vacant chair, two hollow shells, collapsing bicycle, twisted bicycle, bicycle fragments, empty shopping cart, protective equipment without body, boundary marker, empty stage with microphone, gecko casting two shadows, bullet-like information fragments.

**Core concept**: The series functions as a portrait of the evacuated self in the digital age. Objects designed to carry, transport, protect, or express — all present and intact, but the subject that should be using them is absent. The medium itself (monotype, where the original is destroyed at the moment of printing) mirrors the content: presence born from disappearance.

**Template**: `src/pages/works/absence.astro`

---

### 5.6 Sculpture (placeholder)

No L1-3 data filled. Template exists at `src/pages/works/[slug].astro` as fallback.

### 5.7 Other (placeholder)

No L1-3 data filled. Template exists at `src/pages/works/[slug].astro` as fallback.

---

## 6. Full Content — Notes

### 6.1 "关于AI生成图像的几个观察" (2024-03-15)
- Category: "一个观察，不一定对"
- Type: text
- Tags: AI, images, philosophy of technology
- Body: Compares AI-generated images to early photography. Photography at least required a real object in front of the lens. AI images require only probability distributions. Raises the question: when image production far exceeds viewing time, do we still gaze? If an image doesn't need to be gazed at to be produced, what is its reason for existing?

### 6.2 "在卢浮宫看一幅画看了四十分钟" (2024-01-10)
- Category: "一个观察，不一定对"
- Type: text
- Tags: looking, time, Louvre
- Body: The author stood before Chardin's "The Ray" at the Louvre for 40 minutes. At a certain angle, the dissected ray appeared to breathe. Most visitors spend under 10 seconds per artwork. Calculates: to see all Louvre works at 10s each takes months; at 40 minutes each, it takes more than a lifetime. A museum isn't meant to be "finished" — it's meant to be chosen from.

### 6.3 "工作室笔记：关于'表面'" (2024-02-20)
- Category: "一个观察，不一定对"
- Type: image-text
- Tags: studio, materials, painting
- Body: Working in the studio on a canvas surface — scraping, repainting, re-scraping. All things have surfaces. The thicker the paint layer, the richer the surface, but the more it conceals what's beneath. Question: under what conditions does surface stop being concealment and become revelation? Possibly when one stops trying to see through it — allowing surface to exist as surface is itself a form of revelation.

---

## 7. Full Content — Studio (Collectible Works)

All Studio entries are **pointer-only** — they reference Works data via `sourceSeries` + `sourceWork` + `sourceImage`. The `studio/index.astro` template resolves full metadata from the corresponding Works collection at build time.

| Studio Entry | Source Series | Source Work | Availability |
|-------------|--------------|-------------|-------------|
| Anarchy in the Domestic | brittle-thorn | anarchy-in-the-domestic | Available |
| The Sabotage | brittle-thorn | the-sabotage | Available |
| No Future | brittle-thorn | no-future | Available |
| Nobody in Control | nobody | nobody-in-control | Available |
| Nobody Is Watching | nobody | nobody-is-watching | Available |
| Odyssey at Apogee | promised-land | odyssey-at-apogee | Available |
| Specimen | post-sacred | specimen | Available |

**Studio-only fields**: `order`, `signature`, `certificate`, `framingStatus`, `collectorNote`, `inquiryLink`.
**All other fields** (title, year, medium, dimensions, description, altText, images): resolved from Works.

---

## 8. Full Content — INTJ Archive

12 Live Photo entries, 3 categories. Each entry: static JPG poster + optional MP4 video. Desktop: hover to play video. Mobile: tap to Play/Pause.

### Category: 秩序 (Order)
- "spring" — "谁的五月天" (tags: INTJ, 精神状态, 春日)
- (additional entries in this category)

### Category: 物证 (Material Evidence)
- "spring" — (tagged as 物证)

### Category: 失控 (Out of Control)
- "OUT OF CONTROL" — excerpt: "OUT OF CONTROL"
- "observation" — excerpt: "只想做观察者，不想做参与者"
- "crowd-phobia"
- "defensive-romance"
- "free-as-a-bird"
- "german-bathroom"
- "louvre-bathhouse"
- "quiet-birthday"
- "raining-inside"
- "vampire"
- "with-the-wind"

**Video encoding**: MOV → MP4 (libx264), no scaling. Poster: first frame extracted as JPG.
**Template**: `src/pages/archive/index.astro` — renders a masonry/stack layout of cards grouped by category. Each card loads the poster image and lazy-loads the video on hover/tap.

---

## 9. Static Pages

### 9.1 Homepage (`/`)
Components: Signature image ("Hydon BAI"), manifesto line ("在秩序与失控之间，寻找可被凝视的沉默。"), featured autoplay video loop (with WeChat fallback to static poster), 4-card navigation grid (Works, Notes, Archive, Studio).

### 9.2 About (`/about`)
Sections: Artist Statement, How He Sees (creative philosophy), Education (Brera Academy Milan, CAFA Beijing — Sculpture BA + MA, Printmaking MA), Awards, Exhibitions (17 exhibitions 2016–2021, curated by Claudia Ivan, Maria Cristina Galli, etc.), Projects (The Gaze Lab, Chengdu residency, Borderline collaboration).

### 9.3 Method (`/method`)
5-step process with images: 01 Incision (build physical contour on acrylic plate), 02 Saturation (cover plate in black, image enters "latent" state), 03 Reconstruction (manually rebuild light, shadow, texture), 04 Transfer (paper pressed onto plate, irreversible transformation begins), 05 Disappearance (manual traces on plate are physically destroyed after transfer).
Core statement: "The image exists in the act of disappearance."
Sections: Deterministic Monotype, The Act of Disappearance, Post-Digital Aura, Beyond Printmaking, Manifesto.
Footer: link to full essay.

### 9.4 Method Essay (`/method/essay`)
Full academic essay in Chinese + English. 5 chapters:
1. **Beyond Printmaking** — Hydon BAI Method as an image-generation system, not a technique. The image is born between mediums.
2. **Deterministic Monotype** — Resists traditional monotype's embrace of accident. Extreme manual control. "The process may be repeatable. The image is not."
3. **The Act of Disappearance** — The core is not control but disappearance. Parallels drawn with Tibetan sand mandalas. "The image exists in the act of disappearance."
4. **Post-Digital Aura** — References Walter Benjamin's "The Work of Art in the Age of Mechanical Reproduction." In the digital age, this method uses the logic of reproduction to recover singularity, weight, and aura.
5. **Manifesto** — "In an age of infinite reproduction, we still choose: slowness, manual labor, erosion, and irreversibility. Because some images should only exist once. Like life itself."

### 9.5 Contact (`/contact`)
Contact information page.

---

## 10. Components

| Component | Path | Purpose |
|-----------|------|---------|
| Nav.astro | src/components/ | Top navigation. Mobile: "BAI + Menu" with two-column dropdown |
| Footer.astro | src/components/ | Site footer |
| ImageViewer.astro | src/components/ | Full-size image viewer |
| JsonLd.astro | src/components/ | Generates schema.org JSON-LD from Works data. Iterates all image arrays, builds VisualArtwork objects with @type, name, description, dateCreated, artMedium, dimensions. Wraps in CollectionPage → CreativeWorkSeries. |
| Base.astro | src/layouts/ | HTML shell: DOCTYPE, meta charset, viewport, OG/Twitter tags, global CSS import |

---

## 11. Image Directory Structure

```
public/images/
├── works/
│   ├── brittle-thorn/   4 paintings
│   ├── nobody/          9 paintings + 1 diptych pair
│   ├── promised-land/   3 paintings
│   ├── post-sacred/     4 paintings
│   ├── absence/         12 monotype prints
│   ├── sculpture/       placeholder images
│   └── other/           placeholder images
├── archive/             12 sets (JPG poster + MP4 video per entry)
├── method/              5 process step images
├── placeholder/         fallback images for Notes/Works/Studio
├── home/                featured-poster.jpg, featured-loop.webp
└── (various)            signature-hero.png, signature-logo.png, favicon.png
public/videos/           featured-autoplay.mp4
public/downloads/        hydon-bai-nobody-official-catalogue.pdf
                         hydon-bai-the-brittle-thorn-series-booklet-v2.pdf
```

### 11.1 Series Publication Management

Website publication files follow `docs/CONTENT_PUBLISHING_WORKFLOW.md`.
Each published series has a manifest under `docs/series-manifests/` that maps:

- structured series metadata in `src/content/works/`;
- bespoke long-form page code in `src/pages/works/`;
- web-ready artwork images in `public/images/works/`;
- current downloadable files in `public/downloads/`;
- Studio availability entries in `src/content/studio/`.

Original artwork masters, supplied research material, reproducible production
tools, final PDFs and social-media PNG pages remain in the sibling
`../内容发布/` directory outside the Git repository. The tracked website package
contains only files required for publication and project documentation.

---

## 12. Current Status

### Completed (L1 + L2 + L3):
- **The Brittle Thorn / 徒花棘**: 4 works, full three-layer data + bespoke bilingual template; 3 available works linked to Studio
- **NOBODY**: 9 works, full three-layer data + template with dynamic alt binding
- **Promised Land**: 3 works, full three-layer data + template
- **POST-SACRED**: 4 works, full three-layer data + template
- **ASSENZA (Absence)**: 12 monotype prints, full three-layer data + template
- **Studio**: 7 entries, pointer-only model with Works data resolution
- **INTJ Archive**: 12 Live Photo entries with hover/tap video playback
- **About, Method, Method Essay, Contact, Homepage**: Complete
- **Notes**: 3 essays complete
- **Mobile optimization**: First round complete (nav, archive video controls)

### Placeholder / Incomplete:
- **Sculpture**: Works collection exists, no L1-3 data yet
- **Other**: Works collection exists, no L1-3 data yet
- **Notes**: 3 entries exist, room for more content

---

## 13. Build & Deploy

```bash
# Local dev
npm run dev              # → http://localhost:4321/

# Production build
npm run build            # Outputs to dist/

# Deploy
git add .
git commit -m "..."
git push origin main     # GitHub Actions auto-deploys to GitHub Pages
```

Build output: static HTML files in `dist/`, sitemap auto-generated by `@astrojs/sitemap`, robots.txt at `public/robots.txt` pointing to sitemap.

---

## 14. Key Design Decisions

1. **No UI framework** — pure CSS. Site is under 5KB of CSS per page.
2. **Content Collections** over manual data files — enables Zod validation and TypeScript autocomplete.
3. **Studio = pointer model** — avoids data duplication. Works is the single source of truth for artwork metadata.
4. **Archive no dates** — entries ordered by file addition order, not chronology.
5. **Live Photo via video poster** — avoids double-layer rendering issues on Safari. `<video poster="static.jpg">` + JS controls.
6. **WeChat compatibility** — featured video has WeChat detection fallback to static WebP.
7. **Custom domain** at root path (`hydonbai.art`), no subpath prefix.

---

*Document updated from the codebase at `/Users/yunshulucky/Desktop/AI_WorkSpace/Hydon BAI/artist-site/`.*
