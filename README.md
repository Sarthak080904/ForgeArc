# ForgeArc Technologies — Website

Static marketing website for **ForgeArc Technologies Pvt. Ltd.**, built around the finalized brand mark and the Midnight Navy / Forge Orange design system.

## Structure

```
index.html       Home — hero, services overview, who we serve, process, target market, CTA
services.html    Detailed breakdown of all 8 service lines
about.html       Company story, philosophy, mission, vision, values, purpose
portfolio.html   Methodology + founding-client CTA (pre-launch, no fabricated case studies)
contact.html     Contact form (opens mailto — no backend) + direct contact details
css/style.css    Full design system (tokens, components, layout)
js/script.js     Nav toggle, scroll reveals, tab switching, contact form handling
js/footer.js     Shared footer injected on every page so it stays in sync
assets/          Logo mark (transparent), favicons, original logo file
```

## Running locally

No build step — it's plain HTML/CSS/JS. Just open `index.html` in a browser, or serve the folder:

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

- **Colors / fonts / spacing** — all defined as CSS variables at the top of `css/style.css`.
- **Copy** — every page is plain HTML; edit text directly.
- **Contact form** — currently opens the visitor's email client via `mailto:`. Replace the submit handler in `js/script.js` with a real form backend (Formspree, Netlify Forms, your own API, etc.) when you're ready to collect submissions server-side.
- **Real email/phone** — replace `hello@forgearc.tech` and the placeholder phone number in `js/footer.js` and `contact.html`.
- **Portfolio** — once you ship your first client project, replace the "Coming soon" block in `portfolio.html` with real case studies following the Problem → Research → Solution → Technology → Screens → Outcome structure already laid out there.

## Security note

If a GitHub personal access token was ever pasted into a chat to set up this repo, **rotate it** (GitHub → Settings → Developer settings → Personal access tokens) — tokens shared in plain text should be treated as compromised even after use.
