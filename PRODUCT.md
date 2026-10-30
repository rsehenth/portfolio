# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary visitors are recruiters and hiring managers evaluating Lucas Sehnem for Technical Product Manager and AI Products roles. They need to quickly establish his product judgment, technical range, verified evidence, and the depth of the work behind selected projects.

## Product Purpose

A bilingual, static professional portfolio that presents Lucas Sehnem's work across AI, product, and engineering, and routes visitors to real project cases, LinkedIn, email, and downloadable CVs.

## Positioning

The portfolio shows a Technical Product Manager who works from discovery and prioritization through hands-on implementation, using cases and only verified product evidence rather than generic capability claims.

## Operating Context

Visitors arrive on desktop or mobile, often with limited time, and compare the homepage with project cases, the About page, LinkedIn, and a downloadable CV. Portuguese is the default language; English is a parallel route structure.

## Capabilities and Constraints

- Astro static site deployed to Cloudflare Pages, with Tailwind CSS and TypeScript.
- PT-BR and English use duplicated route files; do not introduce `astro:i18n` or locale parameter routes.
- Project content is source-controlled MDX; only verified metrics are published.
- The redesign must preserve real content, project routes, LinkedIn, email reveal, CV download, accessibility expectations, responsive behavior, and relevant functions.

## Brand Commitments

Use Lucas Sehnem's real name, profile information, cases, verified claims, project assets, and Portuguese-first voice. No page may imply invented clients, outcomes, metrics, screenshots, or product claims.

## Evidence on Hand

- Published project MDX pairs in `src/content/projects/`.
- Homepage editorial and verified presentation data in `src/i18n/ui.ts`.
- Profile, external links, avatar, and CV assets in `src/data/profile.ts` and `public/`.
- Project images and logos in `public/projects/`.

## Product Principles

1. Make the evidence of work legible before the biography.
2. Preserve factual precision and publish only verified claims.
3. Connect product judgment and technical execution rather than treating them as separate disciplines.
4. Let a busy evaluator reach projects and contact paths quickly.
5. Maintain parity and clarity across Portuguese and English routes.

## Accessibility & Inclusion

Preserve semantic navigation, keyboard-visible focus, readable contrast, reduced-motion support, responsive layouts, and content that remains usable without nonessential animation.
