# Design System Specification: AURA NAUTICA (Yacht Services)

## 1. Color Palette (Strict Dual Palette)
This project strictly implements the user-mandated dual color system: **Deep Indigo** and **Frost White**.

### Primary Base: Deep Indigo
- `color-indigo-950`: `#120d3f` (Deepest abyss / shadow backgrounds)
- `color-indigo-900`: `#1b1456` (Deep surface elevation)
- `color-indigo-800`: `#271E79` (Brand Core - RGB: 39, 30, 121 / Primary Deep Indigo)
- `color-indigo-700`: `#382db0` (Interactive hover & elevated states)
- `color-indigo-600`: `#4c3fd6` (Luminous accent glow & active highlights)
- `color-indigo-500`: `#6c60e8` (Subtle high-contrast borders)
- `color-indigo-400`: `#9187f2` (Muted accent accents / labels)
- `color-indigo-200`: `#c8c3fa` (Subtle soft badges)
- `color-indigo-100`: `#ebe9fe` (Tinted highlight)

### Secondary Base: Frost White
- `color-frost-50`: `#ffffff` (Pure specular highlight)
- `color-frost-100`: `#F7F7FF` (Frost White Core - RGB: 247, 247, 255 / Primary Background Light & Primary Text Dark)
- `color-frost-200`: `#eeeffc` (Surface border & container fill)
- `color-frost-300`: `#dde0f7` (Dividers & subtle borders)
- `color-frost-400`: `#bfc4ee` (Muted secondary text on dark indigo)
- `color-frost-500`: `#9ca3dc` (Tertiary captions)

### Surface & Transparency Tokens
- `color-glass-dark`: `rgba(39, 30, 121, 0.75)`
- `color-glass-card`: `rgba(27, 20, 86, 0.65)`
- `color-glass-border`: `rgba(247, 247, 255, 0.12)`
- `color-glass-frost`: `rgba(247, 247, 255, 0.85)`
- `color-glow`: `rgba(76, 63, 214, 0.4)`

## 2. Typography Hierarchy
- **Display / Headings**: `'Cinzel', 'Outfit', 'Plus Jakarta Sans', serif/sans-serif` (Luxury yacht, high-end editorial feel)
- **Body / Interface**: `'Plus Jakarta Sans', 'Inter', system-ui, sans-serif`
- **Monospace / Metrics / Coordinates**: `'JetBrains Mono', monospace`

### Typography Scales
- `text-hero`: `clamp(2.75rem, 7vw, 6.5rem)` / line-height: 0.95 / tracking: -0.03em / weight: 700
- `text-h1`: `clamp(2.25rem, 4.5vw, 3.75rem)` / line-height: 1.05 / tracking: -0.02em / weight: 600
- `text-h2`: `clamp(1.75rem, 3vw, 2.5rem)` / line-height: 1.15 / tracking: -0.01em / weight: 600
- `text-h3`: `1.35rem` / line-height: 1.3 / tracking: -0.01em / weight: 600
- `text-body-lg`: `1.125rem` / line-height: 1.6 / weight: 400
- `text-body`: `0.975rem` / line-height: 1.65 / weight: 400
- `text-caption`: `0.75rem` / line-height: 1.5 / tracking: 0.15em / uppercase / weight: 600

## 3. Spacing & Elevation System
- Base unit: `4px`
- Section Padding: `py-24 md:py-36`
- Container Max-Width: `max-w-7xl` (1280px)
- Border Radius: `rounded-2xl` (16px) for cards, `rounded-full` for badges & pill buttons

## 4. Animation & Easing
- Entrance / Deceleration: `cubic-bezier(0.16, 1, 0.3, 1)` (250ms - 400ms)
- Hover Transitions: `cubic-bezier(0.4, 0, 0.2, 1)` (150ms)
- Canvas Scrubbing: GSAP ScrollTrigger `scrub: 1` with decoupled requestAnimationFrame loop.
