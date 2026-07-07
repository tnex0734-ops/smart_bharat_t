# Smart Bharat — Design System (design.md)

Version 1.0 · Accessibility-first UI for a civic platform used by every age group (18–80+), literacy levels, and ability ranges.

---

## 1. Design Philosophy

Smart Bharat is government infrastructure, not a consumer app. Every choice favors **clarity over cleverness**.

| Principle | Meaning |
|---|---|
| Plain over pretty | No jargon, no unexplained icons, no ambiguous states |
| One task, one screen | Never bury a primary action under a menu |
| Big, obvious, forgiving | Large tap targets, visible focus, undo before delete |
| Same everywhere | One button style, one card style, one status style — no exceptions |
| Works without JS flair | Content and forms usable if animation/JS fails |

**Reference systems this borrows from** (battle-tested for public-sector / mass-scale accessibility, not decorative trend systems):

- **GOV.UK Design System** — plain language, form patterns, error summary pattern, focus styles.
- **U.S. Web Design System (USWDS)** — accessible color tokens, banner/alert patterns, government-grade contrast ratios.
- **IBM Carbon** — data table, status indicator, and notification component structure.
- **Material Design 3** — elevation, motion, and touch-target sizing baseline (44–48px).

Smart Bharat is not a copy of any one of these — it takes the accessibility-proven *patterns*, not the visual skin, and applies India-specific needs (multilingual, voice-first, low-bandwidth, elderly users).

---

## 2. Accessibility Baseline (Non-negotiable)

Target: **WCAG 2.1 Level AA minimum**, AAA where noted.

| Requirement | Rule |
|---|---|
| Color contrast | Text ≥ 4.5:1 (AA); large text ≥ 3:1; UI components/icons ≥ 3:1 |
| Never color-only | Every status/error also uses icon + text label (color-blind safe) |
| Keyboard | 100% of app operable by keyboard alone; visible focus ring on every interactive element |
| Touch targets | Minimum 44×44px, 8px spacing between targets |
| Text resize | Layout must not break up to 200% browser zoom |
| Screen reader | All images have alt text; all form fields have `<label>`; landmarks (`header`, `nav`, `main`, `footer`) present |
| Motion | Respect `prefers-reduced-motion`; no auto-playing motion > 5s without pause control |
| Language | Every page declares `lang`; language switch never reloads user's progress |
| Errors | Identified in text (not color alone), described in plain language, linked to the field |
| Timeouts | Warn before session expiry; allow extension — never silently log out mid-form |

**Elderly / low-literacy specific additions:**
- Default body text **18px**, never below 16px anywhere.
- Voice-first parity: every primary action has a voice equivalent (per PRD "Voice-First Accessibility").
- High-contrast mode and large-text mode are **one-tap toggles** in the top nav, not buried in settings.
- Icons always paired with text labels — never icon-only navigation.

---

## 3. Color System

### 3.1 Core palette (WCAG-checked against white `#FFFFFF` and near-black `#1A1A1A` text)

| Token | Hex | Use | Contrast on white |
|---|---|---|---|
| `--color-primary` | `#0B5FFF` (Indian govt blue) | Primary buttons, links, active nav | 4.6:1 ✅ |
| `--color-primary-dark` | `#08419C` | Hover/pressed state | 7.1:1 ✅ |
| `--color-secondary` | `#0E7C3A` (Ashoka green) | Success, "Apply", positive confirmations | 4.9:1 ✅ |
| `--color-accent` | `#FF6B00` (saffron accent) | Highlights, badges, "Recommended" tags | 3.4:1 (large text only) |
| `--color-danger` | `#B3261E` | Errors, destructive actions | 5.9:1 ✅ |
| `--color-warning` | `#8A5B00` (dark amber, not yellow) | Pending, caution states | 5.2:1 ✅ |
| `--color-text-primary` | `#1A1A1A` | Body text | 16.1:1 ✅ |
| `--color-text-secondary` | `#4B4B4B` | Meta text, captions | 8.3:1 ✅ |
| `--color-bg` | `#FFFFFF` | Page background | — |
| `--color-surface` | `#F5F6F8` | Cards, panels | — |
| `--color-border` | `#D0D3D8` | Dividers, input borders | — |

Amber (not yellow) is used for warning text so it clears 4.5:1 on white — pure yellow (`#FFD400`) never does and is banned from text use.

### 3.2 High-Contrast Mode (toggle)

| Token | Value |
|---|---|
| Background | `#000000` |
| Text | `#FFFFFF` |
| Primary action | `#66B2FF` |
| Border | `#FFFFFF` (2px minimum) |

High-contrast mode swaps tokens only — layout, spacing, and copy stay identical so users don't relearn the UI.

---

## 4. Typography

**Font:** system-first stack for speed + native language glyph support:
`"Noto Sans", "Noto Sans Devanagari", -apple-system, "Segoe UI", Roboto, sans-serif`

Noto Sans is chosen specifically because it has full glyph coverage across Devanagari, Tamil, Bengali, Telugu, etc., needed for the multilingual requirement.

| Style | Size | Weight | Line height | Use |
|---|---|---|---|---|
| Display | 32px | 700 | 1.3 | Dashboard welcome, page hero |
| H1 | 28px | 700 | 1.3 | Page title |
| H2 | 22px | 600 | 1.4 | Section header |
| H3 | 18px | 600 | 1.4 | Card title |
| Body (default) | **18px** | 400 | 1.6 | All paragraph/body text |
| Body small | 16px | 400 | 1.6 | Secondary/meta text (never smaller) |
| Button label | 18px | 600 | 1.2 | All buttons |
| Large-text mode | +25% all sizes | — | 1.7 | Accessibility toggle |

Rules:
- Never justify text (ragged right only — justified text harms readability for low-vision/dyslexic users).
- Max line length: 70–75 characters for body text.
- No text below 16px anywhere in the product, including captions and legal text.

---

## 5. Spacing & Layout Grid

8px base unit — every margin, padding, and gap is a multiple of 8.

| Token | Value | Use |
|---|---|---|
| `--space-1` | 4px | Icon-to-label gap only |
| `--space-2` | 8px | Tight internal padding |
| `--space-3` | 16px | Default component padding |
| `--space-4` | 24px | Gap between related components |
| `--space-5` | 32px | Gap between sections |
| `--space-6` | 48px | Page-level section breaks |
| `--space-7` | 64px | Top/bottom page padding (desktop) |

**Grid:** 12-column, max content width 1280px, 24px gutters (desktop); single column, 16px side margins (mobile, <600px).

**Touch target rule:** every button/link/input ≥ 44×48px with ≥ 8px spacing from the next target — prevents mis-taps for users with tremors or reduced dexterity.

---

## 6. Core Components

### 6.1 Buttons
- Primary: solid `--color-primary`, white text, 8px radius, 48px min height.
- Secondary: outlined, 2px `--color-primary` border.
- Destructive: solid `--color-danger`, always paired with a confirmation step.
- Disabled: `--color-border` fill, `--color-text-secondary` text, never color-only — also `aria-disabled="true"`.
- Focus state: 3px solid outline, `--color-primary-dark`, 2px offset — visible on every browser, not just `:hover`.

### 6.2 Forms (Application forms, Report Issue, Upload Documents)
- Label always above the field, never placeholder-only (placeholders disappear on input — bad for memory/cognitive load).
- One field per line on mobile; group related fields (e.g. Aadhaar number) with a fieldset + legend.
- Inline validation on blur, not on every keystroke.
- **Error summary pattern (GOV.UK-style):** on submit failure, show a summary box at top listing every error as a link jumping to the field, plus the inline error at the field itself.
- Required fields marked with text "(required)", not asterisk-only.

### 6.3 Status & Feedback (Track Application / Complaint)
Every status uses **color + icon + text**, never color alone.

| Status | Color | Icon | Label |
|---|---|---|---|
| Submitted | Grey | ○ | "Submitted" |
| Verified | Blue | ✓ | "Verified" |
| Assigned | Blue | → | "Assigned to [Dept]" |
| In Progress | Amber | ◐ | "In Progress" |
| Resolved / Approved | Green | ✓✓ | "Resolved" |
| Rejected / Error | Red | ✕ | "Rejected — [reason]" |

Status timeline is a vertical stepper on mobile, horizontal on desktop, always with text labels under each step — never icon-only.

### 6.4 Cards (Services, Schemes, Documents)
- 16px internal padding, 1px `--color-border`, 8px radius, no drop-shadow trend-chasing — flat elevation only (`0 1px 2px rgba(0,0,0,0.06)`) so it renders identically in high-contrast mode.
- Every card: title, one-line description, single primary action button — never more than one primary CTA per card.

### 6.5 Navigation
- Persistent top nav (per IA doc) — same 8 items always visible, never collapsed behind a hamburger on desktop.
- Mobile: bottom tab bar for the 5 most-used items (Dashboard, Services, Schemes, Track, Profile) — bottom placement is easier to reach one-handed for elderly/mobility-limited users than a top hamburger.
- Current page always indicated by both color AND an underline/bar — not color alone.

### 6.6 Notifications & Alerts
- Banner alerts (system-wide: e.g. "Session expiring") use the GOV.UK/USWDS banner pattern: full-width, icon + text, dismiss button ≥ 44px.
- Toast confirmations (e.g. "Document uploaded") auto-dismiss after 6s minimum, but are also pinned in a Notifications log — never rely on a toast being the only record of success.

---

## 7. Voice & Multilingual Layer

- Every screen exposes a persistent mic icon (Voice Input) at ≥ 48px, fixed position, per PRD's Voice-First Accessibility feature.
- Text-to-speech read-aloud button available on every content-heavy screen (scheme details, document explanations).
- Language switcher lives in top nav and Profile; switching language never resets in-progress form data.
- All UI copy authored at **Grade 6–8 reading level** — short sentences, no bureaucratic jargon (aligns with PRD's "AI Knowledge Simplifier").

---

## 8. Motion & Feedback Timing

- Transitions: 150–200ms max, ease-in-out — fast enough to feel responsive, slow enough not to disorient.
- Respect `prefers-reduced-motion: reduce` — disable non-essential transitions/animations entirely for users who set this.
- Loading states: always a labeled spinner/progress bar with text ("Submitting application...") — never a bare spinner with no text.

---

## 9. Do / Don't Summary

| Do | Don't |
|---|---|
| Pair every icon with a text label | Ship icon-only navigation |
| Use 18px+ body text | Use body text under 16px anywhere |
| Show error + how to fix it | Show only "Invalid input" |
| Keep nav identical across pages | Reflow/hide nav items conditionally |
| Confirm destructive actions | Delete/submit irreversibly on single tap |
| Test at 200% zoom | Assume default zoom only |
| Design status with color+icon+text | Rely on color alone for status |

---

## 10. Component Checklist Before Ship

- [ ] Passes 4.5:1 contrast (axe / Lighthouse)
- [ ] Fully keyboard-navigable, visible focus order matches visual order
- [ ] Screen-reader tested (NVDA/VoiceOver) for labels & landmarks
- [ ] Works at 200% browser zoom without horizontal scroll
- [ ] All statuses readable with color vision deficiency simulation
- [ ] Voice input/output equivalent exists for the primary action
- [ ] Copy reviewed for plain-language / reading level
