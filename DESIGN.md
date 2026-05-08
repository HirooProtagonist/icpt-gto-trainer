# ICPT - GTO Trainer Design Brief

**Purpose:** Premium poker GTO training tool — dark, minimalist, poker-focused. No clutter. Bold action buttons.

## Palette

| Token | OKLCH | Hex | Usage |
|-------|-------|-----|-------|
| Background | 0.10 0 0 | #0a0a0f | Page, table felt |
| Card Surface | 0.15 0.02 280 | #12121a | Cards, modals, surfaces |
| Foreground | 0.92 0 0 | #eae6e1 | Text, primary |
| Accent (Green) | 0.62 0.22 142 | #00d4aa | Bet actions, highlights |
| Destructive (Red) | 0.60 0.28 25 | #e63946 | Fold, mistakes, warnings |
| Border | 0.22 0.02 280 | #2a2a3e | Dividers, subtle structure |

## Typography

| Layer | Font | Scale | Weight |
|-------|------|-------|--------|
| Display | GeneralSans | 32–48px | 600 |
| Body | GeneralSans | 14–16px | 400 |
| Mono | GeistMono | 12–14px | 500 |

## Structural Zones

| Zone | Background | Border | Depth |
|------|-----------|--------|-------|
| Header / Nav | 0.12 0 0 | bottom solid 0.22 0.02 280 | Elevated |
| Content | 0.10 0 0 | none | Base |
| Card / Spot | 0.15 0.02 280 | subtle 0.22 0.02 280 | Elevated |
| Sidebar | 0.12 0.01 280 | right solid 0.22 0.02 280 | Overlaid |
| Table / Felt | 0.10 0 0 | none | Base |
| Footer | 0.12 0 0 | top solid 0.22 0.02 280 | Base |

## Component Patterns

Action buttons: state-driven coloring (FOLD=red, CHECK=gray, CALL=blue, RAISE=amber, ALL-IN=gold+red gradient). Range matrix: 13×13 heatmap with color-coded frequencies (green=bet, blue=call, red=fold, gray=mixed). Cards: 4-color deck (red hearts, green clubs, blue diamonds, black spades) with white symbols. Spot cards: dark surface with compact info + hover elevation.

## Motion

Card dealing: `pulse` animation (0.4s ease). EV reveals: fade-in + slide-up (0.3s cubic-bezier). Button transitions: smooth opacity + color on hover/active. Range matrix: hover cell highlight (0.15s). Timer bar: linear fill (20s → red blink at <5s).

## Constraints

Minimalist — no decoration, no gradients except action buttons. High contrast for readability on dark felt. Poker terminology in English; action buttons always English regardless of UI language. Mobile-first responsive (sm:, md:, lg: breakpoints). No shadows beyond `shadow-sm` for card elevation.

## Signature Detail

Action buttons use bold, saturated colors (not muted) against the deep black background — instant visual hierarchy and state clarity. 4-color deck with pure white symbols creates poker-game authenticity. Range matrix heatmap bridges data density and visual clarity — the core pedagogical interface.
