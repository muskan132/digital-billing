## Overview

JPSL presents itself as India's trusted payment solutions platform through a clean, implementation-focused brand voice. The homepage opens with a bold headline rendered centered over a deep black hero band ({colors.brand-navy}), decorated with amber-gold accent dots and warm mesh wire illustrations scattered around the headline. The signature **amber-gold primary CTA** ({colors.primary}) "Get Started" sits at the visual center, paired with an outlined "Request a demo" secondary. Below the buttons, a real JPSL product UI mockup card breaks out of the hero band with a deep diffuse drop shadow.

Below the hero, the page cycles through a distinctive sequence of feature sections: a dense payment status panel with warm status icons; a **bold gold** ({colors.card-tint-yellow-bold}) "Your on-demand payment assistant" banner card flanked by warm cream/sand feature tiles showing product UI mockups; and a "Bring all your payments together" 3-column grid with warm-toned mockups. The pricing page renders 4 tiers horizontally with one tier featured (gold-bordered) and a dense feature comparison table running below.

The system uses JioType across every UI surface — clean geometric character that pairs naturally with the warm gold-and-black brand identity. Buttons are `{rounded.md}` (8px) rectangles, NOT pills — distinguishing Notion's sober rectangular geometry from competitors that use pills universally. Cards use `{rounded.lg}` (12px) consistently.

**Key Characteristics:**
- Deep black hero band ({colors.brand-navy}) with scattered amber-gold dots + warm mesh wire decorative illustrations
- **Signature amber-gold CTA** ({colors.primary}) primary button — JPSL's recognizable "Get Started" button color
- Real JPSL product UI mockup card embedded in the hero with deep drop shadow
- Bold gold feature banner ({colors.card-tint-yellow-bold}) for high-emphasis content sections
- Warm card tint palette (gold-peach, amber-rose, cream-mint, warm-cream, sand, yellow) reflecting the brand's warm fintech identity
- JioType across every UI surface
- 8px-rounded buttons (NOT pills), 12px-rounded cards — sober editorial geometry
- 4-tier pricing comparison with dense feature table
- Centered hero layout (different from the left-aligned norm of most B2B SaaS)

## Colors

> Source: JPSL brand tokens applied to Notion's structural color system. Token names and structure preserved; values updated to JPSL palette.

### Brand & Primary
- **JPSL Amber Gold** ({colors.primary}): Signature primary CTA color — the unmistakable "Get Started" amber-gold button. Reserved for the dominant CTA only.
- **Gold Pressed** ({colors.primary-pressed}): Pressed-state variant
- **Gold Deep** ({colors.primary-deep}): Deeper variant for emphasis
- **Brand Black** ({colors.brand-navy}): Hero band background — full black
- **Brand Black Deep** ({colors.brand-navy-deep}): Deeper black for promo banner
- **Brand Black Mid** ({colors.brand-navy-mid}): Mid dark surface
- **Link Gold** ({colors.link-blue}): Inline text link gold (NOT primary CTA)
- **Link Gold Pressed** ({colors.link-blue-pressed}): Pressed-state link gold

### Brand Color Spectrum (echoes live product database properties)
- **Brand Amber** ({colors.brand-pink}): Amber accent
- **Brand Amber Deep** ({colors.brand-pink-deep}): Deeper amber
- **Brand Orange** ({colors.brand-orange}): Orange accent
- **Brand Orange Deep** ({colors.brand-orange-deep}): Deeper orange-rust
- **Brand Gold** ({colors.brand-purple}): Gold accent variant
- **Brand Gold 300** ({colors.brand-purple-300}): Light gold
- **Brand Gold 800** ({colors.brand-purple-800}): Deep gold-brown for tag text
- **Brand Teal** ({colors.brand-teal}): Teal accent
- **Brand Green** ({colors.brand-green}): Bright green
- **Brand Yellow** ({colors.brand-yellow}): Soft yellow
- **Brand Brown** ({colors.brand-brown}): Brand brown for "earthy" tints

### Card Tints (Pastel Feature Card Backgrounds)
- **Tint Gold-Peach** ({colors.card-tint-peach}): Warm pale gold-peach
- **Tint Amber-Rose** ({colors.card-tint-rose}): Warm pale amber-rose
- **Tint Cream-Mint** ({colors.card-tint-mint}): Warm pale cream-mint
- **Tint Warm-Cream** ({colors.card-tint-lavender}): Palest warm cream
- **Tint Sand** ({colors.card-tint-sky}): Warm pale sand
- **Tint Yellow** ({colors.card-tint-yellow}): Pale yellow
- **Tint Gold Bold** ({colors.card-tint-yellow-bold}): Bold warm gold for high-emphasis feature banners
- **Tint Cream** ({colors.card-tint-cream}): Cream tint
- **Tint Gray** ({colors.card-tint-gray}): Neutral surface

### Surface
- **Canvas White** ({colors.canvas}): Page background and primary card surface
- **Surface** ({colors.surface}): Subtle section backgrounds, search-pill rest, featured pricing tier
- **Surface Soft** ({colors.surface-soft}): Quieter section divisions
- **Hairline** ({colors.hairline}): 1px borders and primary dividers
- **Hairline Soft** ({colors.hairline-soft}): Quieter dividers
- **Hairline Strong** ({colors.hairline-strong}): Stronger 1px border for inputs

### Text
- **Ink Deep** ({colors.ink-deep}): Pure black for emphasis
- **Ink** ({colors.ink}): Primary headlines and body text
- **Charcoal** ({colors.charcoal}): Body emphasis — warm charcoal
- **Slate** ({colors.slate}): Secondary text
- **Steel** ({colors.steel}): Tertiary, footer links
- **Stone** ({colors.stone}): Muted labels
- **Muted** ({colors.muted}): Disabled, placeholders
- **On Dark** ({colors.on-dark}): White text on dark surfaces
- **On Dark Muted** ({colors.on-dark-muted}): Reduced-opacity white

### Semantic
- **Success** ({colors.semantic-success}): Confirmation green
- **Warning** ({colors.semantic-warning}): Mid-priority alerts (orange)
- **Error** ({colors.semantic-error}): Validation errors (red)

## Typography

### Font Family
**JioType** (primary): JPSL's brand typeface. Fallbacks: Inter, -apple-system, system-ui, 'Segoe UI', Helvetica, sans-serif. Clean geometric character used across every UI surface.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.hero-display}` | 80px | 600 | 1.05 | -2px | Hero ("Meet the night shift") |
| `{typography.display-lg}` | 56px | 600 | 1.10 | -1px | Section openers |
| `{typography.heading-1}` | 48px | 600 | 1.15 | -0.5px | Page-level headlines ("Try for free") |
| `{typography.heading-2}` | 36px | 600 | 1.20 | -0.5px | Subsection headlines ("Keep work moving 24/7") |
| `{typography.heading-3}` | 28px | 600 | 1.25 | 0 | Card titles |
| `{typography.heading-4}` | 22px | 600 | 1.30 | 0 | Feature tile titles |
| `{typography.heading-5}` | 18px | 600 | 1.40 | 0 | FAQ questions |
| `{typography.subtitle}` | 18px | 400 | 1.50 | 0 | Hero subtitle |
| `{typography.body-md}` | 16px | 400 | 1.55 | 0 | Primary body text |
| `{typography.body-md-medium}` | 16px | 500 | 1.55 | 0 | Body emphasis |
| `{typography.body-sm}` | 14px | 400 | 1.50 | 0 | Secondary body |
| `{typography.body-sm-medium}` | 14px | 500 | 1.50 | 0 | Active sidebar, button labels |
| `{typography.caption-bold}` | 13px | 600 | 1.40 | 0 | Badge labels |
| `{typography.button-md}` | 14px | 500 | 1.30 | 0 | Button labels |

### Principles
- Tight hero leading (1.05) on 80px display
- Negative letter-spacing on display sizes (-2px to -0.5px)
- Generous body leading (1.55) for documentation readability
- 600 weight for headlines + 500 for buttons; 400 body

## Layout

### Spacing System
- **Base unit**: 4px (8px primary increment)
- **Tokens**: `{spacing.xxs}` (4px) through `{spacing.hero}` (120px)
- **Section rhythm**: Marketing pages use `{spacing.section-lg}` (96px); pricing tightens to `{spacing.section}` (64px)

### Grid & Container
- 1280px max-width with 32px gutters
- Pricing: 4-tier card row at desktop with dense comparison table
- Homepage: centered hero with workspace mockup below buttons; alternating colorful feature card sections

### Whitespace Philosophy
Marketing surfaces use generous breathing room between feature card bands. Workspace mockup card on hero gets full-width treatment with deep drop shadow.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 (flat) | No shadow; `{colors.hairline}` border | Default cards, table rows |
| 1 (subtle) | `rgba(15, 15, 15, 0.04) 0px 1px 2px 0px` | Hover-elevated tiles |
| 2 (card) | `rgba(15, 15, 15, 0.08) 0px 4px 12px 0px` | Feature cards |
| 3 (mockup) | `rgba(15, 15, 15, 0.20) 0px 24px 48px -8px` | Hero workspace mockup card |
| 4 (modal) | `rgba(15, 15, 15, 0.16) 0px 16px 48px -8px` | Modals, dropdowns |

### Decorative Depth
- Hero product mockup card uses deep diffuse drop shadow (Level 3) — significant elevation against the black band
- Pastel feature cards carry their own visual weight via tint backgrounds
- Amber-gold dot illustrations and mesh wires add atmospheric decoration to black hero

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Tag chips |
| `{rounded.sm}` | 6px | Type badges |
| `{rounded.md}` | 8px | Buttons, inputs, search-pill |
| `{rounded.lg}` | 12px | Cards, pricing tiers, agent tiles, workspace mockup |
| `{rounded.xl}` | 16px | Larger feature panels |
| `{rounded.xxl}` | 20px | Featured product showcases |
| `{rounded.xxxl}` | 24px | Larger feature cards |
| `{rounded.full}` | 9999px | Status badges, pill tabs (NOT regular buttons) |

Notion's geometry is sober-editorial — `{rounded.md}` (8px) buttons distinguish it from pill-button-everywhere brands.

## Components

> Per the no-hover policy, hover states are NOT documented.

### Buttons

**`button-primary`** — Signature amber-gold rectangular primary CTA, the dominant action.
- Background `{colors.primary}`, text `{colors.on-primary}`, typography `{typography.button-md}`, padding `10px 18px`, rounded `{rounded.md}`.
- Pressed state `button-primary-pressed` deepens to `{colors.primary-pressed}`.
- Disabled state uses `{colors.hairline}` background.
- ⚠️ Always use `{colors.on-primary}` (dark) for text on this button — white text fails WCAG contrast on amber-gold.

**`button-dark`** — Black rectangular CTA on light backgrounds.
- Background `{colors.ink-deep}`, text `{colors.on-dark}`, typography `{typography.button-md}`, padding `10px 18px`, rounded `{rounded.md}`.

**`button-secondary`** — Outlined rectangular for secondary actions ("Request a demo").
- Background transparent, text `{colors.ink}`, border `1px solid {colors.hairline-strong}`, typography `{typography.button-md}`, padding `10px 18px`, rounded `{rounded.md}`.

**`button-on-dark`** — White button on dark hero bands.
- Background `{colors.on-dark}`, text `{colors.ink}`, typography `{typography.button-md}`, padding `10px 18px`, rounded `{rounded.md}`.

**`button-secondary-on-dark`** — Outlined button on dark.
- Background transparent, text `{colors.on-dark}`, border `1px solid {colors.on-dark-muted}`, typography `{typography.button-md}`, padding `10px 18px`, rounded `{rounded.md}`.

**`button-ghost`** — Quieter ghost button.
- Background transparent, text `{colors.ink}`, typography `{typography.button-md}`, padding `8px 12px`, rounded `{rounded.sm}`.

**`button-link`** — Inline gold text link (NOT primary CTA).
- Background transparent, text `{colors.link-blue}`, typography `{typography.body-sm-medium}`, padding `0`.

### Cards & Containers

**`card-base`** — Standard content card.
- Background `{colors.canvas}`, rounded `{rounded.lg}`, padding `{spacing.xl}`, border `1px solid {colors.hairline}`.

**`card-feature`** — Feature card with larger padding.
- Background `{colors.canvas}`, rounded `{rounded.lg}`, padding `{spacing.xxl}`, border `1px solid {colors.hairline}`.

**`card-feature-yellow-bold`** — Bold warm gold feature banner for high-emphasis content.
- Background `{colors.card-tint-yellow-bold}`, text `{colors.charcoal}`, rounded `{rounded.lg}`, padding `{spacing.xxl}`.

**`card-feature-peach`** + **`card-feature-rose`** + **`card-feature-mint`** + **`card-feature-sky`** + **`card-feature-lavender`** + **`card-feature-yellow`** + **`card-feature-cream`** — Pastel-tinted feature cards.
- Each variant uses its corresponding `card-tint-*` color as background, text `{colors.charcoal}`, rounded `{rounded.lg}`, padding `{spacing.xxl}`.

**`card-agent-tile`** — Agent assistant tile.
- Background `{colors.canvas}`, rounded `{rounded.lg}`, padding `{spacing.xl}`, border `1px solid {colors.hairline}`.

**`card-template`** — Template thumbnail card.
- Background `{colors.canvas}`, rounded `{rounded.lg}`, padding `{spacing.lg}`, border `1px solid {colors.hairline}`.

**`card-startup-perk`** — Startup-program perk grid item.
- Background `{colors.canvas}`, rounded `{rounded.lg}`, padding `{spacing.xl}`, border `1px solid {colors.hairline}`.

**`pricing-card`** — Standard pricing tier card.
- Background `{colors.canvas}`, rounded `{rounded.lg}`, padding `{spacing.xxl}`, border `1px solid {colors.hairline}`.

**`pricing-card-featured`** — Featured pricing tier (gold-bordered).
- Background `{colors.surface}`, rounded `{rounded.lg}`, padding `{spacing.xxl}`, border `2px solid {colors.primary}`.

### Inputs & Forms

**`text-input`** — Standard text field.
- Background `{colors.canvas}`, text `{colors.ink}`, border `1px solid {colors.hairline-strong}`, rounded `{rounded.md}`, padding `{spacing.sm} {spacing.md}`, height 44px.

**`text-input-focused`** — Activated state.
- Border switches to `2px solid {colors.primary}` (gold).

**`search-pill`** — Search bar.
- Background `{colors.surface}`, text `{colors.steel}`, typography `{typography.body-md}`, rounded `{rounded.md}`, height 44px, border `1px solid {colors.hairline}`.

### Tabs

**`pill-tab`** + **`pill-tab-active`** — Pill-style tab nav for top-level switching.
- Inactive: text `{colors.steel}`, border `1px solid {colors.hairline}`, padding `{spacing.xs} {spacing.md}`, rounded `{rounded.full}`.
- Active: background `{colors.ink-deep}`, text `{colors.on-dark}`.

**`segmented-tab`** + **`segmented-tab-active`** — Underline-style tab navigation.
- Inactive: text `{colors.steel}`, no border. Active: text `{colors.ink}`, 2px bottom border in `{colors.ink}`.

### Badges & Status

**`badge-gold`** — Gold status badge (matches primary CTA).
- Background `{colors.primary}`, text `{colors.on-primary}`, typography `{typography.caption-bold}`, rounded `{rounded.full}`, padding `4px 10px`.

**`badge-amber`** — Amber accent badge.
- Background `{colors.brand-pink}`, text `{colors.on-primary}`, typography `{typography.caption-bold}`, rounded `{rounded.full}`, padding `4px 10px`.

**`badge-orange`** — Orange accent badge.
- Background `{colors.brand-orange}`, text `{colors.on-primary}`, typography `{typography.caption-bold}`, rounded `{rounded.full}`, padding `4px 10px`.

**`badge-tag-gold`** — Soft-gold feature tag chip.
- Background `{colors.card-tint-lavender}`, text `{colors.brand-purple-800}`, typography `{typography.caption-bold}`, rounded `{rounded.sm}`, padding `2px 8px`.

**`badge-tag-orange`** — Soft-orange feature tag.
- Background `{colors.card-tint-peach}`, text `{colors.brand-orange-deep}`, typography `{typography.caption-bold}`, rounded `{rounded.sm}`, padding `2px 8px`.

**`badge-tag-green`** — Soft-warm feature tag.
- Background `{colors.card-tint-mint}`, text `{colors.brand-green}`, typography `{typography.caption-bold}`, rounded `{rounded.sm}`, padding `2px 8px`.

**`badge-popular`** — "Most Popular" tier indicator.
- Background `{colors.primary}`, text `{colors.on-primary}`, typography `{typography.caption-bold}`, rounded `{rounded.full}`, padding `4px 10px`.

**`promo-banner`** — Light surface promo strip ABOVE the top nav.
- Background `{colors.surface}`, text `{colors.ink}`, typography `{typography.body-sm-medium}`, padding `{spacing.sm} {spacing.md}`. ("Developers: Get a first look at our new Developer Platform on May 13.")

### Tables

**`comparison-table`** — Pricing feature comparison table.
- Background `{colors.canvas}`, text `{colors.ink}`, typography `{typography.body-sm}`, rounded `{rounded.md}`, border `1px solid {colors.hairline}`.

**`comparison-row`** — Individual feature row.
- Background `{colors.canvas}`, text `{colors.ink}`, padding `{spacing.md} {spacing.lg}`, bottom border `1px solid {colors.hairline-soft}`.

### Documentation Components

**`workspace-mockup-card`** — Embedded JPSL product UI mockup on hero band.
- Background `{colors.canvas}`, rounded `{rounded.lg}`, border `1px solid {colors.hairline}`, deep shadow `rgba(15, 15, 15, 0.20) 0px 24px 48px -8px`. Carries actual JPSL product UI mock.

**`testimonial-card`** — Customer testimonial card.
- Background `{colors.canvas}`, rounded `{rounded.lg}`, padding `{spacing.xxl}`, border `1px solid {colors.hairline}`.

**`logo-wall-item`** — Customer logo wordmark cell.
- Background transparent, text `{colors.steel}`, typography `{typography.body-md-medium}`, padding `{spacing.lg}`.

**`faq-accordion-item`** — FAQ panel.
- Background `{colors.canvas}`, rounded `{rounded.md}`, padding `{spacing.xl}`, bottom border `1px solid {colors.hairline}`.

**`stat-row`** — Stats strip with bar chart visualization ("More productivity. Fewer tools.").
- Background `{colors.surface}`, text `{colors.ink}`, rounded `{rounded.lg}`, padding `{spacing.section-sm}`.

**`cta-banner-light`** — Light surface CTA banner.
- Background `{colors.surface}`, text `{colors.ink}`, rounded `{rounded.lg}`, padding `{spacing.section}`.

### Navigation

**Top Navigation (Marketing)** — Sticky white bar.
- Background `{colors.canvas}`, height ~64px, bottom border `1px solid {colors.hairline}`.
- Left: JPSL logo + "Products / Solutions / Pricing / Developers / About" links.
- Right: "Get Started" amber-gold button + "Log in" link.

### Signature Components

**`hero-band-dark`** — Deep black hero band with embedded product mockup and decorative amber dots/wires.
- Background `{colors.brand-navy}`, text `{colors.on-dark}`, padding `{spacing.hero}`.
- Layout: centered headline `{typography.hero-display}`, subtitle, button row (`button-primary` gold + `button-secondary-on-dark`), `workspace-mockup-card` below.
- Atmospheric decoration: scattered warm amber-gold dots and mesh wire illustrations around the hero content (NOT a literal pattern fill — handled per-page via SVG/illustration).

**`footer-region`** — Multi-column light footer.
- Background `{colors.canvas}`, padding `{spacing.section} {spacing.xxl}`, top border `1px solid {colors.hairline}`.
- 6-column link grid (Products / Developers / Resources / Company / Support / Legal).

**`footer-link`** — Individual footer link.
- Background transparent, text `{colors.steel}`, typography `{typography.body-sm}`, padding `{spacing.xxs} 0`.

## Do's and Don'ts

### Do
- Use `{colors.primary}` (amber-gold) as the dominant CTA across all surfaces — it's the brand's recognizable signal
- Pair deep black hero bands ({colors.brand-navy}) with the amber-gold button + decorative warm-toned dots
- Use warm card tints (gold-peach, amber-rose, cream-mint, warm-cream, sand, gold) generously
- Use `{colors.card-tint-yellow-bold}` for high-emphasis banner cards
- Apply `{rounded.md}` (8px) to buttons consistently — Notion uses rectangles, not pills
- Apply `{rounded.lg}` (12px) to all card families
- Maintain JioType across every UI surface
- Use the workspace mockup card on hero bands to show actual product UI
- Use Lucide icons for all iconography — never use emojis as icons or decorative elements

### Don't
- Don't use amber-gold for body text or large background surfaces
- Don't use pill-shaped buttons; Notion's geometry is rectangular-sober
- Don't mix link-gold ({colors.link-blue}) with primary-gold ({colors.primary}) — same hue but differ in visual weight and context
- Don't apply heavy shadows on flat documentation cards
- Don't replace JioType with generic Inter without brand approval
- Don't use white (`{colors.on-dark}`) as text on `{colors.primary}` buttons — use `{colors.on-primary}` (dark) for WCAG compliance

## Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|---|---|---|
| Mobile (small) | < 480px | Single column. Hero 36px. Pricing 1-up. |
| Mobile (large) | 480 – 767px | Feature cards 2-up. Hero 48px. |
| Tablet | 768 – 1023px | 2-column feature grids. Hero 56px. |
| Desktop | 1024 – 1279px | 4-tier pricing card row. Hero 72px. |
| Wide Desktop | ≥ 1280px | Full 80px hero presentation. |

### Touch Targets
- Buttons render at 40–44px effective height
- Form inputs render at 44px height
- Pill tabs ~32px → 44px on mobile

### Collapsing Strategy
- **Promo banner** stays full-width; truncates at < 480px
- **Top nav** below 1024px collapses to hamburger
- **Hero band**: workspace mockup card moves below text/buttons on mobile
- **Pricing tiers**: 4-column → 2-column tablet → 1-column mobile
- **Feature cards**: 3-up desktop → 2-up tablet → 1-up mobile
- **Hero typography**: 80px → 56px → 48px → 36px
- **Footer**: 6-column desktop → 3-column tablet → accordion mobile

### Image Behavior
- Workspace mockup card maintains aspect ratio
- Pastel illustrations inside feature cards scale proportionally
- Customer logo wall: wordmarks at consistent 60–80px height

## Iteration Guide

1. Focus on ONE component at a time
2. Reference component names and tokens directly
3. Run `npx @google/design.md lint DESIGN.md` after edits
4. Add new variants as separate `components:` entries
5. Default to `{typography.body-md}` for body
6. Keep `{colors.primary}` (amber-gold) as the primary CTA — distinct from `{colors.link-blue}` for inline links
7. Use `{rounded.md}` for buttons (rectangles), `{rounded.lg}` for cards, `{rounded.full}` for pill tabs/badges only

## Known Gaps

- Specific dark-mode token values not surfaced beyond hero bands
- Animation/transition timings not extracted; recommend 150–200ms ease
- Form validation success state not explicitly captured
- Warm tint mapping (which feature uses which tint) may need refinement against final JPSL brand library

## CSS Variables

```css
:root {
  --primary: #df9f3a;
  --primary-pressed: #c47f1a;
  --primary-deep: #a86a0e;
  --on-primary: #141414;
  --brand-navy: #000000;
  --brand-navy-deep: #0a0a0a;
  --brand-navy-mid: #1e1e1e;
  --link-blue: #df9f3a;
  --link-blue-pressed: #c47f1a;
  --brand-pink: #e8a020;
  --brand-pink-deep: #b87818;
  --brand-orange: #c85f00;
  --brand-orange-deep: #7a3800;
  --brand-purple: #df9f3a;
  --brand-purple-300: #f5d99a;
  --brand-purple-800: #5a3800;
  --brand-teal: #1a7a6e;
  --brand-green: #2e7d32;
  --brand-yellow: #f5c842;
  --brand-brown: #7a5c38;
  --tint-peach: #fdefd8;
  --tint-rose: #fde8c8;
  --tint-mint: #faf0e0;
  --tint-lavender: #fef7ef;
  --tint-sky: #f5efe0;
  --tint-yellow: #fef7ef;
  --tint-yellow-bold: #fdefd8;
  --tint-cream: #faf8f4;
  --tint-gray: #f3f3f1;
  --canvas: #ffffff;
  --surface: #fef7ef;
  --surface-soft: #faf8f4;
  --hairline: #e6e0d4;
  --hairline-soft: #ede9e0;
  --hairline-strong: #ccc4b0;
  --hairline-dark: rgba(255, 255, 255, 0.16);
  --ink-deep: #000000;
  --ink: #212529;
  --charcoal: #3a3530;
  --slate: #6b6358;
  --steel: #9a8f82;
  --stone: #c0b8ac;
  --muted: #d4cfc7;
  --on-dark: #ffffff;
  --on-dark-muted: rgba(255, 255, 255, 0.65);
  --semantic-success: #2e7d32;
  --semantic-warning: #c85f00;
  --semantic-error: #c62828;
}
```
