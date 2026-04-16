# Design Brief

## Direction

**Premium Financial Clarity** — Modern fintech dashboard designed for trust, clarity, and confident data-driven decisions. Inspired by Stripe, Revolut, Mercury.

## Tone

Professional, data-focused, approachable—strong geometric typography paired with refined spacing. Trustworthy without sterility, premium without excess. Cool color foundation signals financial stability; warm accent signals positive outcomes and growth.

## Differentiation

Dashboard cards with color-coded status indicators (green for surplus/income, red for deficit/expenses, neutral for neutral values) + soft-elevated hierarchy. Monthly charts integrated seamlessly with atmospheric subtle gradients. High data density with breathing room maintained through intentional sectioning.

## Color Palette

| Token      | OKLCH          | Role                                   |
| ---------- | -------------- | -------------------------------------- |
| background | 0.99 0.002 230 | Light neutral backdrop, trust          |
| foreground | 0.16 0.01 230  | Text, deep cool grey                   |
| card       | 1.0 0 0        | Pure white elevated surfaces           |
| primary    | 0.42 0.16 245  | Deep ocean blue—trust, confidence      |
| accent     | 0.72 0.18 70   | Warm amber—positive, growth, alerts    |
| muted      | 0.93 0.01 230  | Subtle section backgrounds             |
| destructive| 0.55 0.22 25   | Red—expenses, warnings                 |

## Typography

- Display: **Space Grotesk** — geometric, modern, premium-tech aesthetic, headings and labels
- Body: **DM Sans** — clean, highly readable, financial data and descriptions
- Scale: h1 `text-4xl md:text-5xl font-bold tracking-tight`, h2 `text-2xl md:text-3xl font-bold`, label `text-sm font-semibold tracking-widest`, body `text-base leading-relaxed`

## Elevation & Depth

Cards on white with soft shadows (0 2px 8px) create subtle depth. Primary interactive elements (buttons, active sections) use blue primary. Surface hierarchy: background (muted) → card (white) → elevated (primary/accent). No drop shadows on text, minimal motion.

## Structural Zones

| Zone    | Background           | Border                  | Notes                          |
| ------- | -------------------- | ----------------------- | ------------------------------ |
| Header  | card (white)         | border-b subtle         | Brand, auth, minimal           |
| Sidebar | sidebar (off-white)  | sidebar-border (subtle) | Navigation, collapsible mobile |
| Content | background (muted)   | —                       | Alternating card (white) sections |
| Chart   | card (white)         | border subtle           | Data visualization area        |
| Footer  | muted                | border-t subtle         | Links, legal, minimal           |

## Spacing & Rhythm

Generous spacing (gap-6 between sections) maintains breathing room. Cards use padding-6. Micro-interactions: hover scale +2%, focus ring 2px solid primary. Section separators via subtle borders, not color blocks. Consistent 0.5rem (8px) radius for cohesion.

## Component Patterns

- **Cards**: white, `shadow-card`, `rounded-lg`, `p-6`, subtle `border border-border`
- **Buttons**: primary (blue bg, white text), secondary (muted bg), destructive (red), hover scale 102%, focus ring primary
- **Badges**: inline status indicators (success/warning/destructive), small text, pill shaped
- **Transaction list**: alternating rows with subtle `hover:bg-muted`, truncate text, right-align amounts

## Motion

- **Entrance**: page fade-in 300ms on load, cards stagger 50ms each
- **Hover**: button scale +2%, `transition-smooth` 300ms. Chart highlights on hover
- **Interactions**: form validation errors pulse (200ms), success toast slides up 200ms

## Constraints

- No gradients except atmospheric chart backgrounds (subtle 0.1 opacity)
- Primary blue sparingly—reserved for CTAs, active states, chart primary series
- Warm amber accent only for income/positive/alerts to maintain semantic clarity
- Max 2 font families: Space Grotesk + DM Sans (no serif unless intentional)
- Fixed radius 8px—no inconsistent roundness across components

## Signature Detail

Color-coded transaction badges (green for income, red for expenses, blue for transfers) paired with financial data—instantly readable account health at a glance. Status indicators connect visual cues to financial meaning without jargon.
