# HomeAll — Vue 3 Implementation

A Vue 3 + Vite build of the **HomeAll** business-marketplace homepage, implemented from the
Figma design: `https://www.figma.com/design/oyjCKjkf9dp5lMvj2RHQ0t/homeall`.

## Tech stack

| Concern            | Choice                                   |
| ------------------- | ----------------------------------------- |
| Framework           | Vue 3 (`<script setup>`, Composition API) |
| Build tool           | Vite                                      |
| Routing              | Vue Router 4                              |
| Styling              | Plain scoped CSS + CSS custom properties (design tokens) — no CSS framework, so it stays easy to hand off to any team |
| Icons                | Small hand-rolled inline SVG set (`IconBase.vue`) — no external icon library needed for 8 glyphs |

No UI framework (Tailwind, Vuetify, etc.) was added, since the design translates cleanly to
scoped component CSS and the task didn't call for one. Swap in Tailwind/UnoCSS later without
touching the component structure if you'd prefer utility classes.

## Getting started

```bash
npm install
npm run dev       # start the dev server at http://localhost:5173
npm run build     # production build to /dist
npm run preview   # preview the production build locally
npm run lint       # eslint --fix
npm run format     # prettier --write
```

## Project structure

```
homeall-vue/
├─ index.html                     # Vite entry HTML
├─ vite.config.js                 # Vite + "@ -> src" alias
├─ public/
│  └─ favicon.svg
└─ src/
   ├─ main.js                     # App bootstrap (createApp, router, global CSS)
   ├─ App.vue                     # Root component — just <RouterView />
   ├─ router/
   │  └─ index.js                 # Vue Router setup (home route today, extend per page)
   ├─ views/
   │  └─ HomeView.vue             # Composes the full homepage from sections
   ├─ components/
   │  ├─ layout/                  # Chrome shared across every page
   │  │  ├─ AppHeader.vue         # Logo, primary nav, search, sign in/register
   │  │  ├─ CategoryNav.vue       # Green "All Categories" bar
   │  │  └─ AppFooter.vue         # Brand blurb, link columns, legal bar
   │  ├─ home/                    # Sections that only appear on the homepage
   │  │  ├─ HeroBanner.vue        # Business Solutions card + image carousel
   │  │  ├─ ServicesSection.vue   # "Explore Our Services" heading + grid
   │  │  ├─ ServiceCard.vue       # One service tile
   │  │  ├─ FeaturedProducts.vue  # "Feature Product" heading + grid
   │  │  ├─ ProductCard.vue       # One product tile (image, price, add-to-cart)
   │  │  └─ AboutSection.vue      # "About Us" callout band
   │  └─ ui/                      # Small, generic, reusable primitives
   │     ├─ BaseButton.vue        # primary / outline / ghost button, button or link
   │     ├─ IconBase.vue          # Inline SVG icon set for service cards
   │     └─ ImagePlaceholder.vue  # Stand-in artwork for product/hero imagery
   ├─ data/                       # Static content, kept out of components
   │  ├─ navLinks.js
   │  ├─ categories.js
   │  ├─ services.js
   │  ├─ products.js
   │  └─ footerLinks.js
   └─ assets/
      └─ styles/
         ├─ tokens.css            # Colors, spacing, radii, type scale as CSS variables
         └─ main.css              # Reset + base element styles + .container layout primitive
```

## Design decisions & best practices

- **Design tokens, not magic numbers.** Every color, spacing value, radius and font size used
  in the Figma file is defined once in `assets/styles/tokens.css` as a CSS custom property
  (`--color-brand`, `--space-6`, ...) and referenced everywhere else. Updating the brand color
  or spacing scale is a one-file change.
- **Components stay small and single-purpose.** Layout chrome (`components/layout`) is separate
  from homepage-only sections (`components/home`), which are separate from generic, reusable
  primitives (`components/ui`). A new page reuses the layout components and its own section
  components without touching the homepage.
- **Content is data, not markup.** Nav links, categories, services and products live in
  `src/data/*.js` as plain arrays/objects, and components loop over them with `v-for`. Adding an
  9th service card is a one-line data change, not a template edit.
- **`<script setup>` + Composition API** throughout, for concise, tree-shakeable components with
  colocated logic.
- **Scoped styles** on every component avoid any global CSS leakage; the only global rules are
  the reset and the `.container` layout primitive in `main.css`.
- **Accessibility basics**: semantic `<header>`/`<nav>`/`<main>`/<footer>` landmarks, an
  `sr-only` label on the search input, `aria-label`s on icon-only buttons and carousel controls,
  and `:focus-visible` styling.
- **Path alias (`@/...`)** configured in both `vite.config.js` and `jsconfig.json` so editors and
  the build tool agree on imports.

## A note on imagery

The Figma file references two licensed raster images (the hero banner photo and a product
photo). Those asset URLs are hosted on `figma.com` and aren't fetchable from this environment's
network sandbox, so `components/ui/ImagePlaceholder.vue` stands in for them with the HomeAll
mark. Swap it out per-slot:

- `HeroBanner.vue` — replace `<ImagePlaceholder />` with an `<img>` pointing at your real banner
  asset(s), one per carousel slide.
- `ProductCard.vue` — already supports this: set `image` on any entry in `src/data/products.js`
  to a real URL and the component renders it automatically (falls back to the placeholder when
  `image` is `null`).

## Extending beyond the homepage

The header's `Product`, `Category`, `About Us` and `New` links, and the footer's link columns,
currently point at routes that don't exist yet (`/products`, `/categories`, `/about`, ...). Add
a `views/<Name>View.vue` per page and register it in `src/router/index.js`; `AppHeader` and
`AppFooter` are already shared layout, so no changes are needed there.
