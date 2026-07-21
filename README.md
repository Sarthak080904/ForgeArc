# ForgeArc Technologies — Website

Static marketing website for **ForgeArc Technologies Pvt. Ltd.**, built on the "Obsidian Ember" dark design system: near-black navy canvas, ember-orange accent, glassmorphism cards.

## Structure

```
index.html       Home — hero, capability marquee, services (bento), problem/solution tabs, process, industries teaser, CTA
services.html    Detailed breakdown of all 6 service lines
industries.html  12 industry sectors as icon cards
pricing.html     Launch / Scale / Enterprise tiers (Scale featured)
about.html       Company story, philosophy, mission, vision, values, purpose
portfolio.html   Methodology + founding-client launch pipeline (pre-launch, no fabricated case studies)
contact.html     Contact form (opens mailto — no backend) + direct contact details
css/style.css    Full design system: tokens, glass cards, mesh gradients, bento grid, marquee, pricing
js/script.js     Nav shrink-on-scroll, scroll reveals, count-up stats, hero spotlight/parallax, tabs, contact form
js/footer.js     Shared footer injected on every page so it stays in sync
assets/          Logo mark (transparent), favicons, original logo file
```

## Theme tokens (css/style.css :root)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0A0F1E` | Base canvas |
| `--surface` / `--surface-2` | `#141B2E` / `#1E2740` | Cards, glass panels |
| `--ink` | `#0F1B3D` | Brand deep navy accents |
| `--ember` | `#F2820D` | CTAs, highlights |
| `--ember-soft` | `#F5A94A` | Gradients, glows |
| `--fg` | `#F5F7FA` | Body text |
| `--muted` | `#8A94A6` | Secondary text |
| `--border` | `rgba(255,255,255,0.08)` | Hairlines |

Headings use Space Grotesk (600–700, -0.02em tracking); body uses Inter.

## Running locally

No build step — plain HTML/CSS/JS. Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploying with GitHub Pages

1. Push this repo to GitHub (already done if you're reading this on GitHub).
2. Go to **Settings → Pages**.
3. Under **Source**, choose the `main` branch and `/ (root)` folder.
4. Save — your site will be live at `https://<username>.github.io/<repo>/` within a few minutes.

## To customize

- **Colors / fonts / spacing** — CSS variables at the top of `css/style.css`.
- **Copy** — every page is plain HTML; edit text directly.
- **Pricing tiers** — edit the three `.pricing-card` blocks in `pricing.html`.
- **Contact form** — currently opens the visitor's email client via `mailto:`. Swap the submit handler in `js/script.js` for a real backend (Formspree, Netlify Forms, your own API) when ready to collect submissions server-side.
- **Real email/phone** — replace `hello@forgearc.tech` and the placeholder phone number in `js/footer.js` and `contact.html`.
- **Portfolio** — once you ship a client project, replace the launch-pipeline cards in `portfolio.html` with real case studies following the Problem → Research → Solution → Technology → Screens → Outcome structure already laid out there.

## Security note

If a GitHub personal access token was ever pasted into a chat to set up this repo, **rotate it** (GitHub → Settings → Developer settings → Personal access tokens) — tokens shared in plain text should be treated as compromised even after use.
