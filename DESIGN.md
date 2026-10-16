---
name: Lucas Sehnem Portfolio
description: A proof-sheet portfolio for reviewing real product work.
colors:
  ink: "#161513"
  paper: "#f4f0e7"
  paper-soft: "#ebe4d8"
  rule: "#aaa295"
  vermilion: "#d9472d"
  verification-green: "#2d8659"
typography:
  display:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(3.4rem, 7.3vw, 7.6rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.055em"
  body:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.7
  label:
    fontFamily: "IBM Plex Mono, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.04em"
rounded:
  editorial: "0px"
spacing:
  compact: "0.75rem"
  standard: "1.5rem"
  section: "clamp(4.5rem, 8vw, 8rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.editorial}"
    padding: "0 1.5rem"
    height: "2.9rem"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.editorial}"
    padding: "0 1.5rem"
    height: "2.9rem"
---

# Design System: Lucas Sehnem Portfolio

## Overview

**Creative North Star: "The Product Proof Sheet"**

The portfolio reads like an editorial page prepared for a close review: large, decisive statements; hairline rules; source-like labels; and clear evidence placed beside the work it supports. It is warm and physical without pretending to be a scanned document.

Recruiters should be able to identify the role, verified evidence, and the next case to open in a single glance. Product imagery and artifacts carry the page where they exist; interface chrome remains quiet.

**Key Characteristics:**

- Warm paper, near-black ink, and rare vermilion emphasis.
- Flat plates separated by rules rather than floating cards.
- Strong Archivo display type paired with IBM Plex Mono labels.
- Evidence, project role, and status presented as structured editorial credits.

## Colors

The palette is deliberately print-like: warm neutrals bear the reading load, while vermilion marks only evidence and primary moments.

### Primary

- **Vermilion**: reserved for selected actions and meaningful interaction emphasis.
- **Verification Green**: reserved for verified evidence.

### Neutral

- **Ink**: all primary reading, strong borders, and primary actions.
- **Paper**: the page ground and primary surface.
- **Soft Paper**: restrained tonal grouping.
- **Rule**: hairline structure between plates and reading groups.

**The Evidence Accent Rule.** Vermilion must explain a fact or lead a meaningful action; it never decorates empty space.

## Typography

**Display Font:** Archivo, with Arial fallback.
**Body Font:** Archivo, with Arial fallback.
**Label/Mono Font:** IBM Plex Mono, with Consolas fallback.

**Character:** Archivo gives statements a forceful editorial voice; IBM Plex Mono makes metadata and evidence read as source material rather than decoration.

### Hierarchy

- **Display:** bold, tightly tracked, and reserved for route titles and decisive page statements.
- **Headline:** bold display treatment for project names and long-form section leads.
- **Body:** generous line-height with a readable 65–75 character measure.
- **Label:** uppercase or compact mono text for categories, dates, status, and evidence.

**The Statement Rule.** A heading carries its own hierarchy; do not add decorative eyebrows above it.

## Layout

The maximum content width is 1440px. Desktop compositions use ruled editorial grids with intentionally unequal columns; mobile collapses to a single sequential reading path without shrinking label text. Sections have generous vertical separation and are divided by one-pixel rules.

## Elevation & Depth

This is a flat system. Structure comes from paper tone, spacing, crop, and rules rather than shadows or translucent glass.

**The Flat Plate Rule.** A surface may use a one-pixel rule or a tonal shift, but not a generic raised-card shadow.

## Shapes

Most containers are square-cornered (0px radius). The one intentional exception is the circular verification seal, whose round form identifies a reviewable fact rather than a generic UI chip.

## Components

### Buttons

- **Shape:** square corners (0px), mono uppercase labels.
- **Primary:** ink background with paper text; vermilion on hover.
- **Secondary:** transparent with an ink rule.
- **Focus:** a two-pixel vermilion outline with visible offset.

### Chips

- **Style:** compact mono labels, no pill treatment, used only for factual taxonomy.

### Cards / Containers

- **Corner Style:** square.
- **Background:** transparent or paper-toned.
- **Border:** one-pixel rules create the plate grid.
- **Internal Padding:** 1.25–2.25rem according to viewport.

### Navigation

Navigation is a restrained fixed paper strip: name mark, links, language, theme control, and a single action. Active state is ink, not a decorative badge.

### Verification Seal

The seal is circular, green, and slightly rotated. It labels verified evidence; it is never used as a general logo mark.

## Do's and Don'ts

### Do:

- **Do** put the real project artifact or screenshot beside its evidence when it exists.
- **Do** use one-pixel rules to organize a reading sequence.
- **Do** keep claims tied to verified project data and visible paths into cases.
- **Do** use responsive stacks that preserve the editorial reading order.

### Don't:

- **Don't** use rounded floating cards, glass panels, or ambient shadows as the page structure.
- **Don't** use gradient text or decorative technical grids.
- **Don't** turn labels into pills unless they represent a compact control.
- **Don't** use vermilion for non-functional decoration.
