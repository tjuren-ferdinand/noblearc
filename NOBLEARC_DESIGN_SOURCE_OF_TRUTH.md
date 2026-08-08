# NOBLEARC DESIGN SOURCE OF TRUTH

> Final, measurable documentation of the NobleArc website exactly as implemented. No subjective descriptions — only concrete values from the actual source files (`index.html`, `style.css`, `script.js`, `ventures/*/index.html`, `favicon.svg`, `sitemap.xml`, `robots.txt`).

---

## 1. GLOBAL DESIGN TOKENS

### 1.1 CSS Custom Properties (`:root` in `style.css`)

| Token     | HEX / RGBA | RGB                    | HSL (approx, rounded) | Usage |
|-----------|------------|------------------------|------------------------|-------|
| `--dark-bg` | `#0a0a0a` | `rgb(10, 10, 10)` | `hsl(0, 0%, 4%)` | Splash screen, mobile menu overlay, navbar scrolled overlay base |
| `--bg`      | `#0d0d0d` | `rgb(13, 13, 13)` | `hsl(0, 0%, 5%)` | `body` background |
| `--surface` | `#121212` | `rgb(18, 18, 18)` | `hsl(0, 0%, 7%)` | Venture cards background |
| `--text`    | `#f2f2f2` | `rgb(242, 242, 242)` | `hsl(0, 0%, 95%)` | Primary text, links, headings |
| `--muted`   | `#888888` | `rgb(136, 136, 136)` | `hsl(0, 0%, 53%)` | Secondary / muted text, arc stroke, status labels |
| `--subtle`  | `rgba(255, 255, 255, 0.08)` | `rgba(255,255,255,0.08)` | `hsla(0, 0%, 100%, 0.08)` | Default borders, dividers, card borders, nav CTA border |
| `--gold`    | `#d4af37` | `rgb(212, 175, 55)` | `hsl(43, 62%, 52%)` | Article hover, favicon stroke, lab-dot "building" |
| `--copper`  | `#b87333` | `rgb(184, 115, 51)` | `hsl(27, 55%, 47%)` | Splash gradient stop, lab-dot "exploring" |

### 1.2 Additional Hard-Coded Colors (no token)

| Value | Usage |
|-------|-------|
| `#1a1a1a` | Gradient stop at start/end of splash `NOBLEARC` gradient |
| `rgba(10, 10, 10, 0.7)` | Scrolled navbar background (`--dark-bg` at 70% opacity) |
| `rgba(255, 255, 255, 0.25)` | Hover/focus border color on buttons, nav CTA, inputs |
| `rgba(255, 255, 255, 0.03)` | Hover background on `.btn`, `.nav-cta` |
| `rgba(255, 255, 255, 0.2)` | Hover border color on `.venture-card` |
| `#555555` | Lab-dot color for `private` |
| `#66cc66` | Lab-dot color for `launched` |

### 1.3 Base Layout Tokens

| Property | Value |
|----------|-------|
| Root `font-size` | Browser default (`16px`); `rem` values below assume `1rem = 16px` |
| `html, body` height | `100%` |
| `body` `font-family` | `'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `body` `font-weight` | `300` (light) |
| `body` `line-height` | `1.6` |
| `body` `color` | `var(--text)` (`#f2f2f2`) |
| `body` `background` | `var(--bg)` (`#0d0d0d`) |
| `body` initial `overflow` | `hidden` (until `body.loaded` is applied) |
| `body.loaded` `overflow` | `auto` |
| `html` `scroll-behavior` | `smooth` (overridden by `prefers-reduced-motion`) |
| `box-sizing` | `border-box` on all elements via `*` reset |
| Global `a` | `color: var(--text)`; `text-decoration: none` |

### 1.4 Accessibility / Motion

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 2. COMPLETE PAGE BLUEPRINT

```text
NOBLEARC
│
├── <head>
│   ├── Meta charset, viewport
│   ├── Title: "NobleArc — Building What Comes Next"
│   ├── Description, Open Graph
│   ├── Favicon link (favicon.svg)
│   ├── Google Fonts: Inter 300/400/500, Montserrat 200
│   └── style.css
│
├── <body class="splash-active">
│   ├── NAVIGATION (fixed top)
│   │   ├── Logo "NobleArc" (left)
│   │   ├── Hamburger toggle (mobile only)
│   │   └── Links: Ventures, Lab, Ideas, About, CTA
│   │
│   ├── SPLASH OVERLAY
│   │   ├── "NOBLEARC" gradient-animated word
│   │   └── Fades out after 2.5s
│   │
│   ├── MAIN
│   │   ├── SECTION: Welcome
│   │   │   ├── "Välkommen till NOBLEARC"
│   │   │   └── "Scroll" hint at bottom
│   │   ├── SECTION: Hero
│   │   │   ├── "We build what comes next."
│   │   │   ├── Subtitle
│   │   │   └── Two CTA buttons
│   │   ├── SECTION: What is NobleArc?
│   │   │   ├── Eyebrow
│   │   │   ├── Title
│   │   │   ├── Lead
│   │   │   └── 3-column concept grid (Build / Grow / Own)
│   │   ├── SECTION: The Arc
│   │   │   ├── Eyebrow
│   │   │   ├── Title
│   │   │   ├── SVG arc line (stroke draw)
│   │   │   └── Lead
│   │   ├── SECTION: Our Ventures
│   │   │   ├── Header (title + lead)
│   │   │   └── 4 venture cards (WISE / VUE / NORTH / FORGE)
│   │   ├── SECTION: Why NobleArc?
│   │   │   ├── Title
│   │   │   └── 3 principles (01-03)
│   │   ├── SECTION: Lab
│   │   │   ├── Title
│   │   │   └── 5 status pills with dots
│   │   ├── SECTION: Journal / Ideas
│   │   │   ├── Title
│   │   │   └── 4 article links
│   │   ├── SECTION: About
│   │   │   ├── Title, lead, 3 traits
│   │   └── SECTION: Contact
│   │       ├── Title, lead
│   │       └── Form (name, email, building, message)
│   │
│   └── FOOTER
│       ├── Brand block
│       ├── Link list
│       └── Copyright + legal
│
└── script.js
```

### 2.1 HTML Section Order (`index.html`)

| Order | ID | Class | Layout container | Min-height | Notes |
|-------|----|-------|------------------|------------|-------|
| 1 | `welcome` | `section section welcome` | `.container` | `100vh` | Centered, "Välkommen till NOBLEARC" |
| 2 | `hero` | `section section hero` | `.container` | `100vh` | Centered, hero heading + CTAs |
| 3 | `what-is` | `section section what-is` | `.container.narrow` | — | Concept grid 3 cols |
| 4 | `arc` | `section section arc` | `.container.narrow` | — | Centered SVG arc |
| 5 | `ventures` | `section section ventures` | `.container` | — | 4 cards |
| 6 | `why` | `section section why` | `.container` | — | 3 principles |
| 7 | `lab` | `section section lab` | `.container.narrow` | — | Pills |
| 8 | `journal` | `section section journal` | `.container` | — | Article list |
| 9 | `about` | `section section about` | `.container.narrow` | — | Traits |
| 10 | `contact` | `section section contact` | `.container.narrow` | — | Form |

### 2.2 Venture Detail Pages (`ventures/{slug}/index.html`)

| File | Slug | Title | Status (from `<span class="eyebrow">`) |
|------|------|-------|----------------------------------------|
| `ventures/wise/index.html` | `wise` | `WISE — Built by NobleArc` | `Status: Exploring` |
| `ventures/vue/index.html` | `vue` | `VUE — Built by NobleArc` | `Status: In development` |
| `ventures/north/index.html` | `north` | `NORTH — Built by NobleArc` | `Status: Coming soon` |
| `ventures/forge/index.html` | `forge` | `FORGE — Built by NobleArc` | `Status: NobleArc venture` |

All four detail pages use `body class="loaded"`, `main class="reveal"`, `section class="section in-view hero"` and `container`.

---

## 3. LAYOUT & SPACING

### 3.1 Containers

| Class | Width | Margin |
|-------|-------|--------|
| `.container` | `width: min(1100px, 92%)` | `margin: 0 auto` |
| `.narrow` | `width: min(800px, 92%)` | `margin: 0 auto` (inherits container auto) |
| `.container` horizontal space | `4%` on mobile due to `92%` width, side gutters never explicit |

### 3.2 Section Spacing

| Breakpoint | `.section` `padding` |
|------------|----------------------|
| Default (>=769px) | `padding: 7rem 0` (`112px` top/bottom) |
| `max-width: 768px` | `padding: 4.5rem 0` (`72px` top/bottom) |

### 3.3 Grids

#### 3.3.1 Concept / Principle / Venture Grid

```css
.concept-grid,
.principle-grid,
.venture-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
}
```

| Property | Value |
|----------|-------|
| Display | `grid` |
| Columns (desktop) | `repeat(auto-fit, minmax(240px, 1fr))` |
| Columns (mobile `<=768px`) | `1fr` |
| Gap | `1.5rem` (`24px`) |
| Top margin | `3rem` (`48px`) |

#### 3.3.2 Lab Pills

```css
.lab-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}
```

### 3.4 Other Spacing Values

| Element | Property | Value |
|---------|----------|-------|
| `.section-header` | `display`, `gap`, `margin-bottom`, `align-items` | `flex`, `1.5rem`, `2rem`, `flex-end` |
| `.section-header .section-lead` | `max-width` | `34ch` |
| `.hero-ctas` | `display`, `gap`, `justify-content` | `flex`, `1rem`, `center` |
| `.traits` | `display`, `gap`, `margin-top` | `flex`, `2rem` (`1rem` mobile), `2rem` |
| `.footer-top` | `display`, `justify-content`, `gap`, `margin-bottom` | `flex`, `space-between`, `2rem`, `2rem` |
| `.footer-bottom` | `display`, `justify-content`, `gap` | `flex`, `space-between`, `1rem` |
| `.footer-links` | `display`, `gap` | `flex`, `1.5rem` |
| `.contact-form` | `display`, `gap`, `margin-top` | `grid`, `1rem`, `2.5rem` |

### 3.5 Z-Index Stack

| Element | `z-index` |
|---------|-----------|
| `.splash` | `9999` |
| `.nav` | `100` |
| `.nav-toggle` | `101` (mobile) |
| `.nav-links` (mobile overlay) | `99` |

---

## 4. TYPOGRAPHY

### 4.1 Font Families

| Use | Family | Weights loaded |
|-----|--------|----------------|
| Body, headings, UI | `Inter` | `300`, `400`, `500` |
| Splash logo only | `Montserrat` | `200` |
| System fallbacks | `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | — |

### 4.2 Type Scale

| Class / Element | `font-size` | `font-weight` | `line-height` | `letter-spacing` | Other |
|-----------------|-------------|---------------|---------------|------------------|-------|
| `body` | inherited `16px` | `300` | `1.6` | — | `-webkit-font-smoothing: antialiased` |
| `.nav-logo` | `1.1rem` (`17.6px`) | `500` | — | `-0.02em` | — |
| `.nav-links` | `0.85rem` (`13.6px`) | `300` (inherited) | — | — | `color: var(--muted)` |
| `.welcome-title` | `clamp(1.5rem, 5vw, 3rem)` | `300` | — | `0.05em` | text-align: center |
| `.scroll-hint` | `0.7rem` (`11.2px`) | `300` | — | `0.15em` | `text-transform: uppercase`; `color: var(--muted)` |
| `.hero-title` | `clamp(2.5rem, 7vw, 5.5rem)` | `400` | `1.05` | `-0.03em` | text-align: center |
| `.hero-sub` | `clamp(1rem, 2vw, 1.25rem)` | `300` | — | — | `color: var(--muted)`; `max-width: 46ch`; `margin: 0 auto 2rem` |
| `.section-title` | `clamp(2rem, 5vw, 3.5rem)` | `400` | `1.1` | `-0.02em` | `margin-bottom: 1.25rem` |
| `.section-lead` | `clamp(1.05rem, 2vw, 1.25rem)` | `300` | `1.6` | — | `color: var(--muted)`; `max-width: 46ch` |
| `.section-header .section-lead` | `clamp(1.05rem, 2vw, 1.25rem)` | `300` | `1.6` | — | `max-width: 34ch`; `margin: 0` |
| `.eyebrow` | `0.75rem` (`12px`) | `300` | — | `0.15em` | `text-transform: uppercase`; `display: block`; `color: var(--muted)`; `margin-bottom: 1rem` |
| `.concept h3`, `.principle h3` | `1.1rem` (`17.6px`) | `400` | — | `0.08em` | `text-transform: uppercase`; `margin-bottom: 0.5rem` |
| `.concept p`, `.principle p` | `0.95rem` (`15.2px`) | `300` | — | — | `color: var(--muted)` |
| `.venture-card h3` | `1.5rem` (`24px`) | `400` | — | `0.08em` | `text-transform: uppercase`; `margin-bottom: 0.25rem` |
| `.venture-card p` | `0.95rem` (`15.2px`) | `300` | — | — | `color: var(--muted)` |
| `.venture-status` | `0.7rem` (`11.2px`) | `300` | — | `0.12em` | `text-transform: uppercase`; `color: var(--muted)`; `margin-bottom: 1rem` |
| `.principle-num` | `0.75rem` (`12px`) | `300` | — | — | `color: var(--muted)`; `margin-bottom: 0.75rem` |
| `.lab-pill` | `0.85rem` (`13.6px`) | `300` | — | — | `color: var(--muted)` |
| `.article-card a` | `1.1rem` (`17.6px`) | `300` | — | — | `transition: color 0.2s`; hover `color: var(--gold)` |
| `.traits` | `1rem` (`16px`) | `300` | — | — | `color: var(--muted)` |
| `.btn` | `0.85rem` (`13.6px`) | `300` | — | — | `color: var(--text)` |
| `.footer-brand strong` | inherited `1rem` | `500` | — | `0.05em` | — |
| `.footer-brand p` | `0.9rem` (`14.4px`) | `300` | — | — | `color: var(--muted)` |
| `.footer-links a`, `.footer-legal a` | `0.85rem` (`13.6px`) | `300` | — | — | `color: var(--muted)` |
| `.footer-bottom` | `0.8rem` (`12.8px`) | `300` | — | — | `color: var(--muted)` |

### 4.3 Splash Logo Typography

```css
.splash h1 {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(1.5rem, 5vw, 3.5rem);
  font-weight: 200;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
  padding: 0 1rem;
}
```

### 4.4 Mobile Typography Changes

Inside `@media (max-width: 768px)`:

| Class | Changed value |
|-------|---------------|
| `.hero-title` | `font-size: clamp(2rem, 10vw, 3.5rem)` |

All other type values remain as defined above.

---

## 5. COLORS — WHERE EACH IS USED

### 5.1 Backgrounds

| Element | `background` |
|---------|--------------|
| `html, body` | `#0d0d0d` (`var(--bg)`) |
| `.splash` | `#0a0a0a` (`var(--dark-bg)`) |
| `.nav-scrolled` | `rgba(10, 10, 10, 0.7)` over `#0d0d0d` body, plus `backdrop-filter: blur(12px)` |
| `.venture-card` | `#121212` (`var(--surface)`) |
| `.btn:hover` | `rgba(255, 255, 255, 0.03)` over `--bg` |
| `.nav-cta:hover` | `rgba(255, 255, 255, 0.03)` over `--bg` or scrolled nav |
| Mobile `.nav-links` | `#0a0a0a` (`var(--dark-bg)`) full-screen |
| Inputs/textarea | `transparent` |

### 5.2 Text Colors

| Element | `color` |
|---------|---------|
| Default text, headings, `a` | `#f2f2f2` (`var(--text)`) |
| Muted text (`.section-lead`, `.hero-sub`, `.eyebrow`, `.principle-num`, `.concept p`, `.principle p`, `.venture-card p`, `.venture-status`, `.lab-pill`, `.traits`, `.footer-*`) | `#888888` (`var(--muted)`) |
| `.btn-ghost` | `#888888` (`var(--muted)`) |
| `.btn-ghost:hover` | `#f2f2f2` (`var(--text)`) |
| `.article-card a:hover` | `#d4af37` (`var(--gold)`) |
| `.nav-links a` | `#888888` (`var(--muted)`) |
| `.nav-links a:hover` | `#f2f2f2` (`var(--text)`) |

### 5.3 Borders

| Element | `border` |
|---------|----------|
| `.btn` | `1px solid rgba(255, 255, 255, 0.08)` (`var(--subtle)`) |
| `.btn-ghost` | `1px solid transparent` |
| `.nav-cta` | `1px solid rgba(255, 255, 255, 0.08)` |
| `.venture-card` | `1px solid rgba(255, 255, 255, 0.08)` |
| `.concept` | `border-top: 1px solid var(--subtle)` |
| `.principle` | `border-top: 1px solid var(--subtle)` |
| `.article-card` | `border-top: 1px solid var(--subtle)` |
| `.footer` | `border-top: 1px solid var(--subtle)` |
| `.lab-pill` | `1px solid var(--subtle)` |
| `.contact-form input`, `.contact-form textarea` | `1px solid var(--subtle)` |
| Focus/hover borders | `rgba(255, 255, 255, 0.25)` |
| `.venture-card:hover` | `rgba(255, 255, 255, 0.2)` |

### 5.4 Gradients

#### 5.4.1 Splash `NOBLEARC` Gradient

```css
background: linear-gradient(
  90deg,
  #1a1a1a 0%,
  #b87333 25%,
  #d4af37 50%,
  #b87333 75%,
  #1a1a1a 100%
);
background-size: 300% 100%;
```

- Direction: `90deg` (left to right)
- 5 stops: `#1a1a1a` → `#b87333` (copper) → `#d4af37` (gold) → `#b87333` (copper) → `#1a1a1a`
- Background size `300% 100%`; animated with `flow` keyframes

### 5.5 Lab Dot Colors

| Class | Dot background |
|-------|----------------|
| `.lab-dot.exploring` | `#b87333` (`var(--copper)`) |
| `.lab-dot.prototype` | `#888888` (`var(--muted)`) |
| `.lab-dot.building` | `#d4af37` (`var(--gold)`) |
| `.lab-dot.private` | `#555555` |
| `.lab-dot.launched` | `#66cc66` |

---

## 6. ANIMATIONS

### 6.1 Global Scroll Reveal

**Name:** `SectionReveal` (CSS, not a keyframe)

```css
.section {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.section.in-view,
.section.welcome {
  opacity: 1;
  transform: translateY(0);
}
```

| Property | Value |
|----------|-------|
| Initial state | `opacity: 0`; `transform: translateY(24px)` |
| Final state | `opacity: 1`; `transform: translateY(0)` |
| Duration | `800ms` |
| Easing | `ease` (CSS default) |
| Trigger | `IntersectionObserver` at `threshold: 0.05` adds `.in-view`; `.welcome` is always `.in-view` |

### 6.2 Main Content Reveal

```css
main {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: 0.5s;
}
main.reveal {
  opacity: 1;
  transform: translateY(0);
}
```

| Property | Value |
|----------|-------|
| Initial | `opacity: 0`; `transform: translateY(20px)` |
| Final | `opacity: 1`; `transform: translateY(0)` |
| Duration | `800ms` |
| Delay | `500ms` between class addition and transition start |
| Easing | `ease` |
| Trigger | `script.js` adds `.reveal` at `DOMContentLoaded + 2500ms` on `index.html`; detail pages already include `class="reveal"` in HTML |

### 6.3 Splash Screen Intro

```css
.splash {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  z-index: 9999;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.8s ease, visibility 0.8s ease;
}
```

**6.3.1 Storyboard timeline (index.html only)**

| Time | State | Notes |
|------|-------|-------|
| 0ms | `.splash` visible, `opacity: 1`; `main` `opacity: 0`, `transform: translateY(20px)`; `body` `overflow: hidden` | Splash background `#0a0a0a` fills viewport; centered `NOBLEARC` gradient text |
| 0–∞ | `NOBLEARC` gradient flow runs continuously | `animation: flow 3s linear infinite`; `background-size: 300% 100%` |
| 2500ms | `script.js` adds `.fade-out` to `.splash`, `.loaded` to `body`, `.reveal` to `main` | Classes applied at 2500ms |
| 2500ms | Splash fade starts | `opacity: 1 → 0`; `visibility: hidden` after transition |
| 2500ms–3300ms | Splash opacity animates to 0 over 800ms | `transition: opacity 0.8s ease, visibility 0.8s ease` |
| 2500ms | `body.loaded` enables `overflow: auto` | No visual transition for overflow |
| 2500ms | `main.reveal` class is added; `transition-delay: 0.5s` causes main transition to start at 3000ms | — |
| 3000ms–3800ms | `main` opacity `0 → 1`, `translateY(20px) → 0` over 800ms | — |
| 3300ms | Splash is fully `opacity: 0` and `visibility: hidden` | Splash remains in DOM but not painted; removed from pointer events |

### 6.4 Gradient Flow Animation (`flow`)

```css
@keyframes flow {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}
```

| Property | Value |
|----------|-------|
| Duration | `3000ms` (3s) |
| Easing | `linear` |
| Iteration | `infinite` |
| Transform | `background-position` moves horizontally from `100%` to `-100%` |
| Stops | 5-color linear gradient (`#1a1a1a → copper → gold → copper → #1a1a1a`) |
| Direction | Leftward motion due to decreasing `background-position` |

### 6.5 Navbar Scroll State

```css
.nav-scrolled {
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

| Property | Value |
|----------|-------|
| Trigger | `window.scrollY > 40` (JavaScript) |
| Added class | `.nav-scrolled` on `<nav>` |
| Background | `rgba(10, 10, 10, 0.7)` |
| Backdrop filter | `blur(12px)`; prefixed `-webkit-backdrop-filter: blur(12px)` |
| Transition | `background 0.4s ease, backdrop-filter 0.4s ease` (note: `backdrop-filter` transitions to new values) |
| Revert | `nav-scrolled` removed when `window.scrollY <= 40` |

### 6.6 The Arc SVG Draw

```html
<svg class="arc-line" viewBox="0 0 300 80" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <path d="M10,70 Q150,0 290,70" />
</svg>
```

```css
.arc-line {
  width: 100%; max-width: 320px; height: 80px;
  margin: 3rem auto;
  fill: none;
  stroke: #888888;
  stroke-width: 1;
  stroke-dasharray: 500;
  stroke-dashoffset: 500;
  transition: stroke-dashoffset 1.8s ease;
}
.arc.in-view .arc-line { stroke-dashoffset: 0; }
```

| Property | Value |
|----------|-------|
| Shape | Quadratic Bézier `M10,70 Q150,0 290,70` |
| ViewBox | `0 0 300 80` |
| Rendered dimensions | `width: 100%`, `max-width: 320px`, `height: 80px` |
| Stroke color | `#888888` (`var(--muted)`) |
| Stroke width | `1` |
| Draw start | `stroke-dashoffset: 500` (fully hidden) |
| Draw end | `stroke-dashoffset: 0` (fully visible) |
| Duration | `1800ms` |
| Easing | `ease` |
| Trigger | `IntersectionObserver` on `.arc` at `threshold: 0.3` adds `.in-view` |

### 6.7 Hover Animations

| Element | Default state | Hover state | Duration | Easing |
|---------|---------------|-------------|----------|--------|
| `.nav-links a` | `color: #888888` | `color: #f2f2f2` | `200ms` | `ease` (default) |
| `.nav-cta` | `border: 1px solid rgba(255,255,255,0.08)` | `border-color: rgba(255,255,255,0.25); background: rgba(255,255,255,0.03)` | `200ms` | `ease` |
| `.btn` (primary) | `border: 1px solid rgba(255,255,255,0.08); transform: none` | `border-color: rgba(255,255,255,0.25); background: rgba(255,255,255,0.03); transform: translateY(-2px)` | `200ms` | `ease` |
| `.btn-ghost` | `border-color: transparent; color: #888888` | `color: #f2f2f2; border-color: rgba(255,255,255,0.08)` | `200ms` | `ease` |
| `.venture-card` | `transform: none; border: 1px solid rgba(255,255,255,0.08)` | `transform: translateY(-6px); border-color: rgba(255,255,255,0.2)` | `250ms` | `ease` |
| `.article-card a` | `color: #f2f2f2` | `color: #d4af37` | `200ms` | `ease` |
| `input`, `textarea` | `border: 1px solid rgba(255,255,255,0.08)` | `border-color: rgba(255,255,255,0.25)` (focus) | `200ms` | `ease` |
| `.footer-links a`, `.footer-legal a` | `color: #888888` | `color: #f2f2f2` | `200ms` | `ease` |

### 6.8 Mobile Menu

| Property | Value |
|----------|-------|
| Default | `display: none` on `.nav-links` |
| Trigger | Click `.nav-toggle` toggles `.open` |
| Open state | `.nav-links.open` sets `display: flex` |
| Animation | None — instant show/hide (`display` property) |
| `aria-expanded` | Toggled to `true`/`false` by JS |
| Close on link click | Yes |

### 6.9 Page Transitions

| Property | Value |
|----------|-------|
| Between pages | None. Standard browser navigation. |
| Internal anchors | `html { scroll-behavior: smooth }` |
| On detail pages (`ventures/*`) | `main.reveal` already present in HTML, so `opacity: 1` immediately (no animation) |

---

## 7. SCROLL BEHAVIOR

| Property | Value |
|----------|-------|
| Smooth scroll | `scroll-behavior: smooth` on `html` |
| Reduced motion | `scroll-behavior: auto` when `prefers-reduced-motion: reduce` |
| Splash scroll lock | `body` starts `overflow: hidden`; unlocked to `overflow: auto` at 2500ms |
| Navbar scroll trigger | `window.scrollY > 40` |
| Section reveal trigger | `IntersectionObserver` `{ threshold: 0.05 }` |
| Arc draw trigger | `IntersectionObserver` `{ threshold: 0.3 }` |
| Scroll listener | `{ passive: true }` |

---

## 8. NAVIGATION

### 8.1 Navbar Container

```css
.nav {
  position: fixed;
  top: 0; left: 0; width: 100%;
  z-index: 100;
  transition: background 0.4s ease, backdrop-filter 0.4s ease;
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 4%;
}
```

### 8.2 Logo

| Property | Value |
|----------|-------|
| Class | `.nav-logo` |
| Text | `NobleArc` |
| `href` | `index.html: /`; detail pages: `../../index.html` |
| `font-size` | `1.1rem` (`17.6px`) |
| `font-weight` | `500` |
| `letter-spacing` | `-0.02em` |
| Color | `#f2f2f2` (inherited from `a`) |

### 8.3 Desktop Links

```css
.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  align-items: center;
  font-size: 0.85rem;
}
```

| State | Appearance |
|-------|------------|
| Default | `color: #888888` (`var(--muted)`) |
| Hover | `color: #f2f2f2` (`var(--text)`) over 200ms |

### 8.4 Nav CTA

```css
.nav-cta {
  border: 1px solid rgba(255,255,255,0.08);
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  color: #f2f2f2 !important;
  transition: border-color 0.2s, background 0.2s;
}
```

### 8.5 State at Top

- No `.nav-scrolled`
- Background: transparent (shows `--bg` body through it)
- Backdrop filter: none
- Logo + links sit over page content
- `padding: 1.25rem 4%`

### 8.6 State While Scrolling (scrollY > 40)

```css
.nav-scrolled {
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

### 8.7 Mobile Menu

- Hamburger shows at `max-width: 768px`
- Two `span` lines, each `22px × 1px`, color `#f2f2f2`, `margin: 6px 0`
- Full-screen overlay: `#0a0a0a`, `inset: 0`, centered flex column, `gap: 1.5rem`, `font-size: 1.25rem`, `z-index: 99`
- No open/close animation

---

## 9. HERO / INTRO

### 9.1 Splash Step-by-Step

| Time | Visual state | Technical details |
|------|--------------|-------------------|
| 0ms | Full-screen `#0a0a0a` overlay; centered `NOBLEARC` gradient text; gradient flow already running | `.splash` `z-index: 9999`; `body` `overflow: hidden`; `main` `opacity: 0` |
| 0–2500ms | Gradient flow continues | `flow` animation loops every 3000ms; text never static |
| 2500ms | JS adds `.fade-out`, `.loaded`, `.reveal` | No user interaction required |
| 2500ms–3300ms | Splash fades out (`opacity 1 → 0`) | `transition: 0.8s ease`; `pointer-events: none` added at end of transition |
| 3000ms–3800ms | Main content fades/slides in | `transition-delay: 0.5s`; `opacity 0 → 1`, `translateY(20px) → 0` |
| 3300ms | Splash overlay fully hidden | `opacity: 0`; `visibility: hidden` |

### 9.2 Welcome Section

```css
.welcome {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
}
```

| Element | Value |
|---------|-------|
| `.welcome-title` | `clamp(1.5rem, 5vw, 3rem)`, `font-weight: 300`, `letter-spacing: 0.05em`, centered |
| `.scroll-hint` | `0.7rem`, `uppercase`, `letter-spacing: 0.15em`, `color: var(--muted)`, absolute `bottom: 3rem`, centered horizontally via `left: 50%` + `transform: translateX(-50%)` |

### 9.3 Hero Section

```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 4%;
}
```

| Element | Value |
|---------|-------|
| `.hero-title` | `We build what comes next.`; `clamp(2.5rem, 7vw, 5.5rem)`, `font-weight: 400`, `line-height: 1.05`, `letter-spacing: -0.03em`, `margin-bottom: 1.25rem` |
| `.hero-sub` | `NobleArc is a venture studio…`; `clamp(1rem, 2vw, 1.25rem)`, `color: #888888`, `max-width: 46ch`, `margin: 0 auto 2rem` |
| `.hero-ctas` | `display: flex`, `gap: 1rem`, `justify-content: center`, `flex-wrap: wrap` |

---

## 10. THE ARC

### 10.1 Visual Arc System

| Property | Value |
|----------|-------|
| SVG file | inline in `index.html` |
| Class | `.arc-line` |
| ViewBox | `0 0 300 80` |
| Path | `M10,70 Q150,0 290,70` |
| Width | `100%` (`max-width: 320px`) |
| Height | `80px` |
| Margin | `3rem auto` (centered) |
| Fill | `none` |
| Stroke | `#888888` (`var(--muted)`) |
| Stroke width | `1` |
| Dash array | `500` |
| Draw animation | `stroke-dashoffset: 500 → 0` over `1.8s ease` when `.arc.in-view` |
| Trigger | `IntersectionObserver` `threshold: 0.3` |

---

## 11. VENTURES

### 11.1 Venture Card

```css
.venture-card {
  display: block;
  background: #121212;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.25s, border-color 0.25s;
}
.venture-card:hover {
  transform: translateY(-6px);
  border-color: rgba(255,255,255,0.2);
}
```

| Property | Value |
|----------|-------|
| Background | `#121212` |
| Border | `1px solid rgba(255,255,255,0.08)` |
| Border radius | `12px` |
| Padding | `1.5rem` (`24px`) |
| Hover transform | `translateY(-6px)` over `250ms` |
| Hover border | `rgba(255,255,255,0.2)` over `250ms` |

### 11.2 Venture Typography

| Part | Value |
|------|-------|
| Status label | `font-size: 0.7rem`, `uppercase`, `letter-spacing: 0.12em`, `color: #888888`, `margin-bottom: 1rem` |
| Name (`h3`) | `font-size: 1.5rem`, `font-weight: 400`, `text-transform: uppercase`, `letter-spacing: 0.08em`, `margin-bottom: 0.25rem` |
| Description (`p`) | `font-size: 0.95rem`, `color: #888888` |

### 11.3 Current Ventures

| # | Name | Slug | Status (from DOM) |
|---|------|------|-------------------|
| 1 | WISE | `wise` | Exploring |
| 2 | VUE | `vue` | In development |
| 3 | NORTH | `north` | Coming soon |
| 4 | FORGE | `forge` | NobleArc venture |

**There is no `NOBLEARC / 001` numbering system in the current DOM.** New ventures are added by:
1. Creating a new `a.venture-card` in `index.html` `#ventures .venture-grid`.
2. Creating a new folder `ventures/{slug}/index.html` using the same detail-page template.
3. Updating `sitemap.xml` and `robots.txt` if necessary.

---

## 12. RESPONSIVE DESIGN

### 12.1 Breakpoint

Only one media query is used:

```css
@media (max-width: 768px) { ... }
```

### 12.2 Changes at `max-width: 768px`

| Selector / Property | Desktop | Mobile (`<=768px`) |
|---------------------|---------|--------------------|
| `.nav-links` | `display: flex`, inline | `display: none`; becomes full-screen overlay `display: flex` when `.open` |
| `.nav-toggle` | `display: none` | `display: block; z-index: 101` |
| `.nav-cta` | `padding: 0.45rem 0.9rem` | `padding: 0.75rem 1.5rem`; `border-color: var(--subtle)` |
| `.section` | `padding: 7rem 0` | `padding: 4.5rem 0` |
| `.hero-title` | `clamp(2.5rem, 7vw, 5.5rem)` | `clamp(2rem, 10vw, 3.5rem)` |
| `.concept-grid`, `.principle-grid`, `.venture-grid` | `repeat(auto-fit, minmax(240px, 1fr))` | `grid-template-columns: 1fr` |
| `.section-header` | `flex`, `align-items: flex-end` | `flex-direction: column; align-items: flex-start` |
| `.traits` | `gap: 2rem` | `gap: 1rem` |

### 12.3 Layout Summary by Range

| Range | Container | Grids | Nav | Section padding |
|-------|-----------|-------|-----|-----------------|
| `0–768px` | `92%` | single column | hamburger | `4.5rem 0` |
| `769px–1100px+` | `92%` up to `1100px`; `.narrow` up to `800px` | auto-fit grid (`min 240px`) | horizontal links | `7rem 0` |

---

## 13. SHADOWS / BLUR / EFFECTS

### 13.1 Visual Effects Used

| Effect | Value | Where |
|--------|-------|-------|
| `backdrop-filter: blur(12px)` | `blur(12px)` | `.nav-scrolled` |
| `-webkit-backdrop-filter: blur(12px)` | `blur(12px)` | `.nav-scrolled` |
| `box-shadow` | **None** | No box-shadows are used anywhere |
| `text-shadow` | **None** | No text-shadows are used |
| `filter` | **None** | — |
| `mix-blend-mode` | **None** | — |

### 13.2 Text Gradient Effect

Only on `.splash h1`:

```css
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;
color: transparent;
background: linear-gradient(90deg, #1a1a1a 0%, #b87333 25%, #d4af37 50%, #b87333 75%, #1a1a1a 100%);
background-size: 300% 100%;
```

---

## 14. BORDERS / RADIUS

### 14.1 Border Radius Values

| Class / Element | Border radius |
|-----------------|---------------|
| `.btn`, `.nav-cta`, `.lab-pill` | `999px` (pill) |
| `.venture-card` | `12px` |
| `.contact-form input`, `.contact-form textarea` | `8px` |
| `.lab-dot` | `50%` |

### 14.2 Border Widths

| Element | Border width |
|---------|--------------|
| `.btn`, `.nav-cta`, `.venture-card`, `.lab-pill`, `.contact-form input`, `.contact-form textarea` | `1px` |
| `.concept`, `.principle`, `.article-card`, `.footer` | `border-top: 1px` |
| `.btn-ghost` | `1px` (transparent) |

### 14.3 Border Colors

| Element | Default color | Hover / focus color |
|---------|---------------|---------------------|
| `.btn` | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.25)` |
| `.nav-cta` | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.25)` |
| `.venture-card` | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.2)` |
| `.lab-pill` | `rgba(255,255,255,0.08)` | no hover |
| `input`, `textarea` | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.25)` (focus) |
| Dividers (`concept`, `principle`, `.article-card`, `.footer`) | `rgba(255,255,255,0.08)` | — |

---

## 15. ICONS / SVG / GRAPHICS

### 15.1 Favicon

| Property | Value |
|----------|-------|
| File | `favicon.svg` |
| ViewBox | `0 0 100 100` |
| Background rect | `100 × 100`, fill `#0a0a0a` |
| Arc path | `M18,78 Q50,12 82,78` |
| Stroke | `#d4af37` |
| Stroke width | `3` |
| Stroke linecap | `round` |

### 15.2 Arc SVG

| Property | Value |
|----------|-------|
| Location | Inline in `index.html` inside `#arc` section |
| SVG class | `.arc-line` |
| ViewBox | `0 0 300 80` |
| Path | `M10,70 Q150,0 290,70` |
| Rendered size | `100%` width, `max-width: 320px`, `height: 80px` |

### 15.3 Other Graphics

- **No icons:** There are no separate icon SVGs, font icons, or image assets.
- **Arrows / chevrons:** None. CTA arrows are text characters (`→` in contact button). Back arrow on detail pages is the text character `←`.

---

## 16. CURSOR INTERACTIONS

| Property | Value |
|----------|-------|
| Custom cursor | **None** |
| Magnetic buttons | **None** |
| Hover preview | **None** |
| Cursor follower | **None** |
| Pointer cursor | Native `pointer` on all `<a>`, `<button>`, `input`, `textarea` (`.btn`, `.nav-toggle`, form button have `cursor: pointer` explicit or inherited) |

Links and buttons use the browser's default pointer.

---

## 17. MICROINTERACTIONS

### 17.1 States Summary

| Element | Default | Hover | Active | Focus | Disabled |
|---------|---------|-------|--------|-------|----------|
| `.nav-links a` | `color: #888888` | `color: #f2f2f2` (200ms) | — | — | — |
| `.nav-cta` | `border: rgba(255,255,255,0.08); color: #f2f2f2` | `border: rgba(255,255,255,0.25); background: rgba(255,255,255,0.03)` (200ms) | — | — | — |
| `.btn` | `border: rgba(255,255,255,0.08); background: transparent; transform: none` | `border: rgba(255,255,255,0.25); background: rgba(255,255,255,0.03); transform: translateY(-2px)` (200ms) | — | — | — |
| `.btn-ghost` | `border: transparent; color: #888888` | `border: rgba(255,255,255,0.08); color: #f2f2f2` (200ms) | — | — | — |
| `.venture-card` | `border: rgba(255,255,255,0.08); transform: none` | `border: rgba(255,255,255,0.2); transform: translateY(-6px)` (250ms) | — | — | — |
| `.article-card a` | `color: #f2f2f2` | `color: #d4af37` (200ms) | — | — | — |
| `input` / `textarea` | `border: rgba(255,255,255,0.08); color: #f2f2f2` | — | — | `border: rgba(255,255,255,0.25)` (200ms) | — |
| `.footer-links a`, `.footer-legal a` | `color: #888888` | `color: #f2f2f2` (200ms) | — | — | — |

### 17.2 Menu Toggle Button

| State | Value |
|-------|-------|
| Default | Two white `1px` lines, `22px` wide, `6px` vertical margin |
| Hover | No visual change defined |
| Active | No visual change defined |

---

## 18. CONTACT FORM

```html
<form class="contact-form" id="contact-form" action="#" novalidate>
  <input type="text" name="name" placeholder="Name" required />
  <input type="email" name="email" placeholder="Email" required />
  <input type="text" name="building" placeholder="What are you building?" />
  <textarea name="message" rows="4" placeholder="Message" required></textarea>
  <button type="submit" class="btn">Send to NobleArc →</button>
</form>
```

### 18.1 Fields

| Field | Type | Placeholder | Required | Validation |
|-------|------|-------------|----------|------------|
| Name | `text` | `Name` | yes | HTML `required` |
| Email | `email` | `Email` | yes | HTML `required`, `type="email"` |
| Building | `text` | `What are you building?` | no | — |
| Message | `textarea` (4 rows) | `Message` | yes | HTML `required` |

### 18.2 Styling

```css
.contact-form {
  display: grid;
  gap: 1rem;
  margin-top: 2.5rem;
}
.contact-form input,
.contact-form textarea {
  width: 100%;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  padding: 0.9rem 1rem;
  color: #f2f2f2;
  font: inherit;
  outline: none;
  transition: border-color 0.2s;
}
.contact-form input:focus,
.contact-form textarea:focus { border-color: rgba(255,255,255,0.25); }
.contact-form input::placeholder,
.contact-form textarea::placeholder { color: #888888; }
.contact-form button { justify-self: start; cursor: pointer; }
```

### 18.3 Behavior

| Property | Value |
|----------|-------|
| Submit handler | `e.preventDefault()` then `window.location.href = "mailto:hello@noblearc.se?subject=...&body=..."` |
| Form reset | `form.reset()` after opening `mailto:` |
| Loading | None |
| Success | None (browser opens mail client) |
| Error | Native HTML5 validation, no custom messages |

---

## 19. PAGE TRANSITIONS

| Property | Value |
|----------|-------|
| Page transitions | **None** — standard browser navigation. |
| Internal links | Smooth scroll via `html { scroll-behavior: smooth }` |
| Anchor targets | `#welcome`, `#hero`, `#what-is`, `#arc`, `#ventures`, `#why`, `#lab`, `#journal`, `#about`, `#contact` |
| Detail page load | `main.reveal` already present, no animation on venture detail pages |

### 19.1 Splash-to-Main Timing (index only)

| Event | Time |
|-------|------|
| Splash visible | 0–3300ms |
| Splash fade begins | 2500ms |
| Splash fully hidden | 3300ms |
| Main transition begins | 3000ms (after 500ms delay) |
| Main fully visible | ~3800ms |

---

## 20. PERFORMANCE / TECHNICAL ARCHITECTURE

### 20.1 Stack

| Layer | Value |
|-------|-------|
| Framework | **None** (vanilla HTML/CSS/JS) |
| Build tools | **None** |
| Routing | Static file/folder based (`/ventures/{slug}/`) |
| CSS | Single `style.css` |
| JavaScript | Single `script.js` (~71 lines) |
| Animation libraries | **None** (CSS + native `IntersectionObserver`) |
| Fonts | Google Fonts loaded with `preconnect` |

### 20.2 Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&amp;family=Montserrat:wght@200&amp;display=swap" rel="stylesheet" />
```

### 20.3 Files

| File | Size (approx) | Role |
|------|---------------|------|
| `index.html` | 9.7 KB | Home page |
| `style.css` | 10.5 KB | Global stylesheet |
| `script.js` | 2.5 KB | Global JS |
| `favicon.svg` | 223 B | Favicon |
| `sitemap.xml` | 461 B | Sitemap |
| `robots.txt` | 64 B | Robots |
| `ventures/{slug}/index.html` × 4 | ~1.3 KB each | Detail pages |

### 20.4 Reusable Components

No components in the framework sense. Repeated patterns:

- `.container` / `.narrow`
- `.section`
- `.eyebrow` + `.section-title` + `.section-lead`
- `.btn` / `.btn-ghost`
- `.nav` (shared across all pages)
- `.footer` (shared across all pages)

### 20.5 Design Tokens

CSS custom properties in `:root` (listed in section 1.1) are the only design tokens.

---

## 21. DESIGN TOKENS REFERENCE

```css
:root {
  --dark-bg: #0a0a0a;
  --bg: #0d0d0d;
  --surface: #121212;
  --text: #f2f2f2;
  --muted: #888888;
  --subtle: rgba(255, 255, 255, 0.08);
  --gold: #d4af37;
  --copper: #b87333;
}
```

### 21.1 Typography Tokens

```css
--font-body: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-splash: 'Montserrat', sans-serif;
```

### 21.2 Size Tokens

| Token | Value |
|-------|-------|
| `--container-width` | `1100px` (with `92%` fallback) |
| `--narrow-width` | `800px` (with `92%` fallback) |
| `--section-padding-y` | `7rem` desktop / `4.5rem` mobile |
| `--gap-sm` | `0.75rem` |
| `--gap-md` | `1rem` |
| `--gap-lg` | `1.5rem` |
| `--gap-xl` | `2rem` |

### 21.3 Radius Tokens

| Token | Value |
|-------|-------|
| `--radius-sm` | `8px` (inputs) |
| `--radius-md` | `12px` (cards) |
| `--radius-pill` | `999px` (buttons, pills) |
| `--radius-full` | `50%` (dots) |

### 21.4 Timing Tokens

| Token | Value |
|-------|-------|
| `--transition-fast` | `200ms` |
| `--transition-normal` | `250ms` (venture cards) |
| `--transition-slow` | `400ms` (navbar) |
| `--reveal-duration` | `800ms` |
| `--arc-draw-duration` | `1800ms` |
| `--splash-fade-duration` | `800ms` |
| `--splash-delay` | `2500ms` |
| `--main-reveal-delay` | `500ms` |

---

## 22. HOW TO RECREATE NOBLEARC EXACTLY

### 22.1 What to Build

A static, single-page website (`index.html`) plus four detail pages under `/ventures/{slug}/index.html`.

### 22.2 Step-by-Step

1. **Create `style.css` with the exact content from section 1.1 and the following core rules:**
   - Reset `*` with `margin: 0; padding: 0; box-sizing: border-box;`
   - `:root` variables exactly as listed.
   - `html { scroll-behavior: smooth; }` with `prefers-reduced-motion` fallback.
   - `body` with `font-family: 'Inter'...`, `background: #0d0d0d`, `color: #f2f2f2`, `font-weight: 300`, `line-height: 1.6`, `overflow: hidden`.
   - `body.loaded { overflow: auto; }`.
   - `.container { width: min(1100px, 92%); margin: 0 auto; }`.
   - `.narrow { width: min(800px, 92%); }`.

2. **Add splash screen at the start of `body`:**
   ```html
   <div id="splash" class="splash">
     <h1>NOBLEARC</h1>
   </div>
   ```
   Style it exactly per the values in `style.css`.

3. **Add the fixed `<nav>` and `<main>` in that order.**

4. **Create all 10 `<section>`s inside `<main>` in the exact order from section 2.1.**

5. **Add the `<footer>` after `<main>`.**

6. **Include `script.js` at the bottom of `body`.**

7. **Replicate the four venture detail pages** by copying the `ventures/wise/index.html` structure and changing only `title`, `meta description`, `h1`, `hero-sub`, `section-lead`, and the status `<span>`.

### 22.3 Critical Values to Copy Exactly

- **Colors**: Use `:root` variables; do not introduce new colors.
- **Containers**: `min(1100px, 92%)` and `min(800px, 92%)`.
- **Section padding**: `7rem 0` desktop, `4.5rem 0` mobile.
- **Splash timing**: 2500ms delay, 800ms fade, 500ms main reveal delay.
- **Scroll reveal**: `translateY(24px)` → `0`, `800ms ease`, `IntersectionObserver { threshold: 0.05 }`.
- **Arc draw**: `stroke-dasharray: 500`, `stroke-dashoffset: 500 → 0`, `1.8s ease`, threshold `0.3`.
- **Nav scroll**: `scrollY > 40`, background `rgba(10,10,10,0.7)`, `backdrop-filter: blur(12px)`, transition `0.4s ease`.
- **Grids**: `repeat(auto-fit, minmax(240px, 1fr))` with `1.5rem` gap; switch to `1fr` on mobile.
- **Buttons**: `1px` border `rgba(255,255,255,0.08)`, `border-radius: 999px`, `padding: 0.75rem 1.5rem`, hover `translateY(-2px)`.
- **Venture cards**: `background: #121212`, `border: 1px solid rgba(255,255,255,0.08)`, `border-radius: 12px`, `padding: 1.5rem`, hover `translateY(-6px)`.
- **Inputs**: `background: transparent`, `border: 1px solid rgba(255,255,255,0.08)`, `border-radius: 8px`, `padding: 0.9rem 1rem`, focus `border-color: rgba(255,255,255,0.25)`.

### 22.4 Assets

- `favicon.svg` must be exactly the 100×100 SVG with `#0a0a0a` background and `#d4af37` arc path.
- `sitemap.xml` and `robots.txt` must list all current URLs.

### 22.5 Fonts

Load only these Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Montserrat:wght@200&display=swap" rel="stylesheet" />
```

### 22.6 No Additions

Do **not** add:
- shadows
- custom cursors
- magnetic effects
- parallax
- page-transition libraries
- extra images
- extra JavaScript frameworks
- extra font weights

If another AI follows this document and the listed assets exactly, the resulting site should be visually and functionally as close to the current NobleArc website as technically possible.
