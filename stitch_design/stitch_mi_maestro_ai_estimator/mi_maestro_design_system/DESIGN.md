---
name: Mi Maestro Design System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3e4942'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6e7a72'
  outline-variant: '#bec9c0'
  surface-tint: '#006c49'
  primary: '#006a47'
  on-primary: '#ffffff'
  primary-container: '#21845d'
  on-primary-container: '#f6fff7'
  inverse-primary: '#7cd9ab'
  secondary: '#904d00'
  on-secondary: '#ffffff'
  secondary-container: '#ffa454'
  on-secondary-container: '#713b00'
  tertiary: '#4b5e6f'
  on-tertiary: '#ffffff'
  tertiary-container: '#637788'
  on-tertiary-container: '#fdfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#98f5c6'
  primary-fixed-dim: '#7cd9ab'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77d'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#d0e5f9'
  tertiary-fixed-dim: '#b4c9dc'
  on-tertiary-fixed: '#081d2c'
  on-tertiary-fixed-variant: '#354959'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.03em
  numeric-quote:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1rem
  margin-tablet: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system is engineered for independent tradespeople, construction foremen, master builders, technicians, and contractors who navigate digital tools with varying degrees of tech literacy. The core design philosophy centers on **Pragmatic Humanism**: direct, utilitarian, deeply respectful of the user's practical intelligence, and deliberately devoid of confusing abstractions or ornamental clutter.

The aesthetic blends a clean contemporary mobile foundation with industrial tactile clarity:
- **Immediate Affordance:** Every actionable surface looks decisively touchable. We avoid ambiguous floating icons without labels or hidden gestural triggers.
- **Physical Reassurance:** Visual feedback is instant, grounded, and legible under direct sunlight on outdoor job sites with dirty hands or protective gloves.
- **Empathetic Dignity:** The tone is professional and empowering, treating complex administrative tasks (estimating, invoicing, client communication) as straightforward manual steps rather than bureaucratic hurdles.

## Colors

The palette balances the organic authority of industrial construction materials with high-contrast accessibility standards (WCAG AAA for text and key interactive surfaces).

### Primary & Functional Roles
- **Primary Brand (`#21845D`):** Represents growth, completed work, and approved quotes. Used for primary CTAs, active status chips, and confirmation accents.
- **Primary Dark / Headline Neutral (`#172B3A`):** Deep oceanic charcoal used for maximum contrast typography, high-priority navigation titles, and strong framing.
- **Primary Light / Soft Green (`#E7F3EC`):** Low-saturation tint used for success containers, active selection fills, and comfortable callout backdrops.
- **Background (`#F5F7F6`):** Warm, grounded neutral that prevents outdoor screen glare compared to harsh pure white.
- **Surface (`#FFFFFF`):** High-level elevation for content cards, modals, sheets, and input fields.
- **Secondary / Warning (`#F2994A`):** Warm construction amber/orange for pending payments, material alerts, signature requests, and draft states.
- **Error / Destructive (`#EB5757`):** Direct, punchy coral red for payment disputes, missed deadlines, or destructive deletion confirmations.
- **Border Subtle (`#E2E8F0`):** Precise framing lines that delineate touch boundaries in low-light and high-glare environments.
- **Text Muted (`#64748B`):** Secondary meta-information, timestamps, measurement units, and helper labels.

## Typography

Inter is chosen for its geometric neutrality, unambiguous glyph shapes, and comprehensive OpenType feature support.

### Typographic Rules for Field Trades
- **Tabular Figures (`tnum`):** All financial totals, unit counts ($/m², linear meters, days), and quote line-items MUST force OpenType tabular numbers `font-feature-settings: "tnum" 1` so columns align strictly by decimal points.
- **Reading Comfort:** Body copy defaults to a firm `16px` with generous `24px` line height. Smaller text is strictly limited to secondary metadata (`14px` helper text) and never drops below `12px`.
- **Title Clarity:** Screen headers prioritize high-contrast `#172B3A` between `24px` and `28px` to anchor orientation instantly whenever an app screen is opened.

## Layout & Spacing

The layout is built upon an Android-first fluid 4-column system on mobile (expanding to 8 columns on foldables and tablets).

### Layout Rules
- **Margins & Safe Insets:** Horizontal screen margin is fixed at `16px` (`margin`) to maximize readable area on smaller Android hand devices while preserving sufficient breathing room from display edges and bezel cases.
- **Single-Column Stacking:** Complex side-by-side splits are disallowed on mobile viewport widths below 600dp. Cards, inputs, and conversational prompts stack vertically to avoid cognitive overload.
- **Thumb Reachability:** High-frequency CTAs and input bars pin to the bottom interactive zone (between 56dp and 112dp from the bottom navigation/insets).

## Elevation & Depth

Visual hierarchy combines clean 1px structural boundaries (`#E2E8F0`) with warm, ground-tinted ambient shadows to provide dependable touch cueing even in bright exterior lighting.

- **Level 0 (Base Canvas):** Background `#F5F7F6`, flat, no shadow.
- **Level 1 (Card & Content Container):** Surface `#FFFFFF`, border `1px solid #E2E8F0`, shadow `0 2px 8px rgba(23, 43, 58, 0.04)`.
- **Level 2 (Interactive Floating / Active Card):** Surface `#FFFFFF`, border `1px solid #21845D` (when focused) or `#E2E8F0`, shadow `0 6px 16px rgba(23, 43, 58, 0.08)`.
- **Level 3 (Modal / Persistent Bottom Sheet / Alerts):** Surface `#FFFFFF`, shadow `0 12px 32px rgba(23, 43, 58, 0.16)`.

## Shapes

The design system employs a rounded, friendly, and protective contour geometry:
- **Base Surfaces & Inputs:** `8px` to `12px` roundedness for buttons and field borders.
- **Conversational Cards & Modals:** Large `16px` (`rounded-lg`) up to `24px` (`rounded-xl`) corners, providing an approachable "bubble" format that invites easy reading.
- **Pills / Status Chips:** Fully pill-shaped (`9999px`) to distinguish categorical tags from interactive rectangular cards.

## Components

### 1. Buttons & Touch Targets
- **Dimensions:** Strict minimum touch height of `56px` (range `54px`–`58px`). Full width on mobile screens.
- **Anatomy:** Left-aligned or centered 24px icon + `16px` bold label. Never use standalone icons for primary actions.
- **Primary:** Background `#21845D`, text `#FFFFFF`, radius `12px`. Pressed state scales to `98%` with `#196748`.
- **Secondary / Action Helper:** Background `#E7F3EC`, text `#21845D`, border `1.5px solid #21845D`.

### 2. Conversational Cards & Quotes
- **Radius:** `20px` border radius. Padding `16px` or `20px`.
- **Speech Bubble Hints:** Subtly tailored corners (e.g., bottom-left radius `4px` for assistant prompts) to mimic natural, friendly chat interaction.
- **Pricing Breakdown Box:** Uses a nested `#F5F7F6` container, `16px` text labels paired with `20px`–`24px` tabular bold numbers (`numeric-quote`).

### 3. Inputs & Form Fields
- **Height:** Minimum `56px` input box.
- **Label Structure:** Always-visible persistent floating or stacked label in `#172B3A` (`14px` bold) above the field, never relying solely on disappear-on-typing placeholders.
- **Helper & Voice Dictation:** Dedicated microphone icon button (minimum `48x48px` tap target) placed inside the trailing edge to facilitate direct speech-to-text notes on jobsites.

### 4. Selection Controls (Checkboxes & Radio)
- **Hit Area:** Full-row tap target (minimum `56px` row height).
- **Control Box:** Checkbox/Radio circle sized at `24x24px` with clear `2px` stroke in `#21845D`.

### 5. Chips & Work Status Badges
- **Height:** `36px` to `40px` with generous internal horizontal padding (`14px`).
- **States:** 
  - *Completado/Pagado:* `#E7F3EC` background, `#21845D` text + check icon.
  - *Pendiente/En Espera:* `#FEF3E8` background, `#F2994A` text + clock icon.
  - *Urgente/Revisión:* `#FDE8E8` background, `#EB5757` text + alert icon.

### 6. Offline Status Banner ("Guardado en tu teléfono")
- **Placement:** Persistent docked banner below top app bar or above bottom navigation.
- **Styling:** Background `#172B3A`, text `#FFFFFF` (`14px` bold), leading icon representing local sync/check (in `#21845D` or `#E7F3EC`).
- **Behavior:** Reassures users that no quotes, photos, or client data will be lost when cell signal drops inside basements or rural worksites.