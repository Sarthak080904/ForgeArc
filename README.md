# ForgeArc Technologies — Website

Static marketing website for **ForgeArc Technologies Pvt. Ltd.**, built on a light "Fresh" design system: real photography of Indian shops and workplaces, white pages with soft mint, sky and peach tints, frosted-glass cards and rounded shapes. Brand saffron (`#F2820D`) is used for buttons and highlights, and a fresh green marks progress and "done" states. Type comes from Mumbai's Ek Type foundry: Anek Latin for headings, Mukta for text, Anek Devanagari for the Marathi line in the hero. There is no dark theme.

## Structure

```
index.html       Home — photo hero, saffron "what changes" band, starting-point tabs, services, process, industries, founding-client offer, FAQ, CTA
services.html    The 6 service lines with photos, plus why ForgeArc
industries.html  12 industry sectors; each card opens the contact form pre-filled for that industry
pricing.html     Launch / Scale / Enterprise tiers (Scale featured)
about.html       Story, philosophy, mission and vision, values, team
portfolio.html   Case-study framework + founding-client launch pipeline (pre-launch, no fabricated case studies)
contact.html     Contact form (opens mailto — no backend) + direct contact details
css/style.css    Full design system: tokens and every component
js/layout.js     Shared header and footer, injected on every page so they stay in sync
js/script.js     Mobile nav, tabs, scroll reveals, contact form
js/schema.js     JSON-LD structured data
assets/          Logo mark, wordmark, favicons
assets/photos/   Hero, home industry cards, Services (svc-*) and About photos, from Unsplash (free licence, no attribution required)
```

## Theme tokens (css/style.css :root)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | Page background |
| `--bg-alt` / `--bg-sky` / `--peach` | `#F0F8F5` / `#EEF5FD` / `#FFF1E4` | Soft tinted bands and gradients |
| `--ink` | `#13233F` | Text (brand navy, never a background) |
| `--muted` | `#596577` | Secondary text |
| `--saffron` / `--saffron-ink` | `#F2820D` / `#A9520A` | Brand: buttons, highlights; the ink shade for small text |
| `--mint` / `--mint-ink` | `#12A37F` / `#0A7259` | Fresh accent: icons, ticks, progress; the ink shade for text |
| `--glass` | `rgba(255,255,255,.72)` | Frosted-glass cards over tinted backgrounds |

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
- **Pricing tiers** — edit the three `.tier` blocks in `pricing.html`.
- **Contact form** — currently opens the visitor's email client via `mailto:`. Swap the submit handler in `js/script.js` for a real backend (Formspree, Netlify Forms, your own API) when ready to collect submissions server-side.
- **Real email/phone** — replace `hello@forgearc.tech` and the phone number in `js/layout.js` and `contact.html`.
- **Portfolio** — once you ship a client project, replace the launch-pipeline cards in `portfolio.html` with real case studies following the Problem → Research → Solution → Technology → Screens → Outcome structure already laid out there.

## Security note

If a GitHub personal access token was ever pasted into a chat to set up this repo, **rotate it** (GitHub → Settings → Developer settings → Personal access tokens) — tokens shared in plain text should be treated as compromised even after use.
