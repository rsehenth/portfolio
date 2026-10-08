# Portfolio Theme System

## Instructions for AI Coding Agents

Before creating or modifying any page, layout, or visual component in this portfolio, read this document and preserve compatibility with both Light and Night themes.

- Do not create an independent theme system or replace `.dark` with `data-theme`.
- Do not add a second `ThemeToggle` or a theme script to an individual page.
- Do not hardcode `bg-white`, `text-black`, or equivalent screen surfaces without validating both themes.
- Use the existing semantic tokens and test Light and Night modes before finalizing work.
- Update this document only when the theme architecture itself changes.

## Architecture

The site uses Astro and Tailwind. Tailwind is configured with `darkMode: 'class'`; Night Mode is active only when `<html>` has the `dark` class. `src/styles/global.css` is the source of truth for color tokens and theme-specific values.

`src/layouts/BaseLayout.astro` is the global theme entry point. It imports the global CSS, resolves the initial theme in the document head, renders the shared `#bg-canvas`, and wraps the site content in the single application stacking layer. New pages must use `BaseLayout` directly or use a compatible layout such as `CaseLayout`, which already composes it.

`src/components/ThemeToggle.astro` is the only interactive theme control. `Header.astro` renders it once for every standard page.

## Theme Resolution

The resolver uses this order:

1. Manual saved preference.
2. Operating-system `prefers-color-scheme` preference.
3. Light Mode fallback.

When no manual preference exists, the toggle listener follows system preference changes during the session. Once a visitor chooses a theme, that manual choice takes precedence.

## Persistence

The preference is stored in `localStorage` under `portfolio-theme`.

- `light` enables Light Mode by removing `.dark` from `<html>`.
- `dark` enables Night Mode by adding `.dark` to `<html>`.

Storage failures are non-fatal: the current session still follows the system preference and the toggle remains usable.

## Anti-Flash

`BaseLayout.astro` contains a small inline resolver in `<head>`, before the page can paint meaningfully. It reads the saved value or system preference and synchronously updates `document.documentElement.classList`. Do not move this resolver into a hydrated component or page-level script.

## Global Background

`#bg-canvas` is a decorative, fixed, pointer-event-free element rendered once by `BaseLayout`. It provides the off-white/charcoal base and broad radial gradients while staying outside document flow.

The body isolates the document stacking context, and the application shell is the only shared content layer above the canvas. Do not add z-index values to ordinary components solely to sit above the background. Header, skip-link, and existing component overlays retain their own established stacking where needed.

Desktop uses two broad, low-contrast radial gradients. Small screens use one softer top gradient to keep dense text clear. The implementation deliberately avoids `background-attachment: fixed`, `will-change`, canvas, noise, or continuously animated gradients.

## Semantic Tokens

`global.css` owns the values for these token families:

- `background`, `foreground`, `muted`, `muted-foreground`, `border`
- `accent`, `accent-foreground`, `card`, `card-foreground`
- `bg-base`, `bg-soft`, `bg-tint`
- shadow and status/callout colors

Use the Tailwind semantic utilities backed by those tokens: `bg-background`, `bg-card`, `bg-muted`, `text-foreground`, `text-muted-foreground`, `text-accent`, and `border-border`. Do not duplicate token values in components.

## Rules for New Pages

1. Use `BaseLayout` or a layout that composes it.
2. Do not implement theme resolution, `.dark`, or a background canvas in the page.
3. Do not add another ThemeToggle.
4. Prefer semantic token utilities over hardcoded colors.
5. Do not use `bg-white` or `text-black` as a primary screen surface without an intentional, tested theme counterpart.
6. Validate Light and Night modes, direct URLs, and both PT-BR and EN routes where applicable.

## Rules for New Components

- Use semantic tokens for surfaces, text, borders, hover, and focus states.
- Ensure normal text and interactive states meet appropriate contrast in both themes.
- Use a real button for controls, include accessible labels, and preserve keyboard/focus-visible support.
- Respect `prefers-reduced-motion`; do not use `transition: all` or animate layout and large background gradients.
- Prefer `currentColor` for interface SVGs. Preserve official brand colors when required.

## Images and Diagrams

Do not invert images or SVGs globally. Screenshots and branded graphics preserve their original pixels. If a light asset is too strong in Night Mode, adapt its container with semantic surface, border, padding, or shadow tokens instead.

## Accessibility

Check contrast for foreground, muted text, captions, tags, links, buttons, borders that communicate state, and focus rings. The theme toggle supplies an updated localized `aria-label`, `aria-pressed`, keyboard support, and a 44px touch target.

## i18n

Theme visuals are shared between PT-BR and EN. Only accessible toggle labels are localized through `src/i18n/ui.ts`. New global controls must follow the same i18n pattern rather than hardcoding language in shared components.

## Testing Checklist

- [ ] Light Mode with no stored preference
- [ ] Night Mode with no stored preference
- [ ] Manual Light override while the system is dark
- [ ] Manual Dark override while the system is light
- [ ] Toggle persistence after reload and direct URL navigation
- [ ] PT-BR and EN locale navigation preserves the theme
- [ ] Home, About, Projects, and representative case-study pages
- [ ] Desktop and mobile widths
- [ ] Keyboard focus and toggle labels
- [ ] Contrast, card separation, image treatment, and reduced motion
- [ ] No incorrect-theme flash on initial load
