---
name: Lucas Sehnem Portfolio
description: A portfolio where real product screens carry the page, on a calm cool ground with dark stages.
colors:
  ink: "#162126"
  ground: "#eef1ef"
  ground-soft: "#e2e8e5"
  line: "#c3ccc9"
  muted: "#4a5b62"
  petrol: "#1f6a8c"
  stage: "#0d1a1f"
  stage-text: "#edf2f0"
  stage-muted: "#a9b9bd"
  stage-accent: "#8cc0dc"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.375rem, 5.8vw, 5.75rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
  code:
    fontFamily: "IBM Plex Mono, ui-monospace, Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
rounded:
  none: "0px"
spacing:
  section: "clamp(5rem, 9vw, 8.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.none}"
    padding: "0 1.5rem"
    height: "3rem"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 1.5rem"
    height: "3rem"
---

# Design System: Lucas Sehnem Portfolio

Source of truth for tokens: `src/styles/site.css`. If this file and the code disagree, the code wins; fix this file.

## Overview

**Creative North Star: "The work, first."**

A recruiter should see real products before they read a claim. Every public page leads with a screen, a diagram or a game frame taken from the actual project, set large on a dark stage, with the case summary beside it. The interface around it stays quiet: one typeface, flat surfaces, square corners, no decorative marks.

**Key characteristics**

- Cool mineral ground, near-black ink, one petrol-blue accent.
- Dark "stages" (`.field-ink`) alternate with light sections and carry the product imagery. The Home opens on one in the hero, then the projects, then the contact and footer.
- Big Archivo statements, two lines at most, tight tracking.
- Real covers only (16:10). Where a project has no screenshot yet, a flat emblem (`ProjectPlate`) holds the slot: one geometric mark per project in the page ink plus its status tone. It never imitates an interface.
- `/projects` opens on the dark stage: title, then the featured pair at once. Each section's layout follows its size (one wide row, two columns, a wide lead plus two, a 2×2 block, three columns), wide rows alternate sides, and sections alternate page ground and soft ground.

## Colors

- **Ink** `#162126`: text, primary buttons. **Ground** `#eef1ef`: page. **Ground soft** `#e2e8e5`: one tonal step for grouped sections ("Como trabalho", status block, chips).
- **Petrol** `#1f6a8c`: links, the status word on a case row, the one-pixel process line. 5.3:1 on the ground.
- **Stage** `#0d1a1f` (and `#081014` in dark theme): dark sections. `.field-ink` re-maps the same rgb tokens, so any utility inside it adapts.
- Status tones (`--tone-active/development/functional/discovery/archived`) colour a status word, never a dot or a pill, and all pass 4.5:1 on their ground.
- Dark theme: ground `#101a1e`, accent `#8cc0dc`.

Rule: surfaces separate by tone step, not by lines. One-pixel rules are allowed only where they are a real list or table (the verified-facts index, the timeline, the case meta row).

## Typography

One family, **Archivo** 400/700, self-hosted. Mono (`IBM Plex Mono`) stays loaded for code only; it is not used for labels or buttons.

- Display: `clamp(2.375rem, 5.8vw, 5.75rem)`, 700, line-height .98, tracking −0.04em, balanced. Hero is two lines on desktop (PT and EN).
- Section titles: `clamp(2.25rem, 4.6vw, 4.25rem)`. Case titles with a cover: `clamp(2.5rem, 4.4vw, 4.25rem)`.
- Body 17px / 1.6–1.7, measure ≤ 46rem. Minimum rendered size 12px (13px for metadata).
- Buttons and labels: sentence case, 700, no uppercase tracking.

## Layout

Container 1440px, gutters 16/24/32px. The Home hero stage bleeds to the right viewport edge. Featured case rows alternate image left/right at ≥ 900px. Case pages put the title and promise left and the cover on a stage right; the meta row (Year, Role, Stage, Product, Focus) sits below as a quiet grid. About uses a 4/8 split with sticky section titles.

## Elevation & Depth

Flat. The only shadow is on the second Home hero image, which genuinely floats over the stage.

## Shapes

Square (0px) everywhere. Small round markers (flow-step numbers, carousel controls) are the only circles.

## Components

- **Buttons:** flat, 48px, 700 sentence case. Primary = ink fill, petrol on hover. Secondary = 1px inset ink at 38%. Inside a stage the primary becomes the light button automatically.
- **Case row / Project card:** cover (16:10) → status word + year → title → description → figures → link. The whole card is one stretched link; focus draws a petrol outline around the card.
- **Segmented controls** (case view, language): square, ink-filled active segment.
- **Navigation:** solid bar, name + role at left, three links, language, theme, LinkedIn, one "Contact" action.

## Motion

One authored moment per page: the masked hero lines. Everything else is a single fade-up on enter (`[data-reveal]`), a slow image scale on hover and an arrow nudge. The process line fills as the steps enter. `prefers-reduced-motion` keeps content and state change and drops the travel.

## Do's and Don'ts

**Do**

- Put a real project image beside every claim that has one.
- Keep headlines to two lines; cut words before shrinking type.
- Add new project covers as `public/projects/<slug>/cover.webp` at 16:10 and reference them in both MDX files.

**Don't**

- Don't add eyebrows, numbered labels, uppercase mono, pills, gradients, glass or shadows to resting surfaces.
- Don't reintroduce a second accent colour.
- Don't invent screenshots. A tile with the logo is better than a mock.
