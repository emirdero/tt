# ttadv – Boutique Law & Advisory Website

Static, lightweight marketing site for the small law firm ttadv (Attorney: Tormod Torvanger). Built with plain HTML/CSS/JS for portability and easy hosting (GitHub Pages, Netlify, Vercel, simple VPS, S3, etc.).

## Structure

```
index.html       # Landing page
about.html       # Firm overview & positioning
contact.html     # Contact details + form (front-end only demo)
css/styles.css   # Global styles, responsive layout, components
js/script.js     # Mobile nav + basic form handler placeholder
assets/favicon.svg
```

## Customization

- Branding colors: Adjust CSS variables in `css/styles.css` under `:root`.
- Practice areas / copy: Edit corresponding `<section>` blocks in `index.html` and `about.html`.
- Contact details: Update all occurrences of `tt@ttadv.no` and phone number across pages.
- Favicon / logo: Replace `assets/favicon.svg` (keep dimensions ~64x64 viewBox).

## Contact Form Notes

Currently no backend submission. `script.js` simulates handling and logs form data. To enable real sending you can:

1. Use a serverless form service (e.g. Formspree, Basin, GetForm) – replace JS submit handler with a `fetch()` POST.
2. Deploy a tiny server (Node/Express, Python/FastAPI) to accept JSON and send email via SMTP or API (SendGrid, Mailgun, SES).
3. Integrate Netlify Forms or Vercel Edge functions (requires attribute adjustments).

Example (Formspree minimal):

```
<form action="https://formspree.io/f/yourid" method="POST">
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

Remove the custom JS handler for that approach.

## Accessibility & Performance

- Semantic headings and landmarks (header / main / footer / nav / sections) used.
- Mobile-first responsive layout via CSS grid and flex.
- Minimal blocking resources (single CSS + deferred JS).
- Color contrast meets WCAG for primary palette.

## Deployment

Serve as static files. Examples:

### Python (quick local preview)

```bash
python3 -m http.server 8080
# Visit http://localhost:8080
```

### GitHub Pages

1. Commit & push repository.
2. In repo settings enable Pages from root (`/`), branch `main`.
3. Access at `https://<user>.github.io/<repo>/`.

### Netlify (drag & drop)

1. Zip project or connect repo.
2. No build command needed.
3. Publish directory: root.

### Vercel

1. `vercel deploy` (no build step).
2. Output is root.

## Dark Mode

A theme toggle is included. Behavior:

- Auto-detects system preference on first load (no stored choice).
- User selection (Dark/Light) stored in `localStorage` key `ttadv-theme`.
- Toggle button text shows the mode you will switch to.
- Uses CSS variable theming on `:root[data-theme]`.

If you want to force only light mode: remove the toggle button in each HTML file and delete the dark-specific variable blocks in `css/styles.css`.

## GitHub Pages Deployment (With Action)

Create a workflow file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy static site
on:
  push:
    branches: [main]
  workflow_dispatch: {}
permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

After merging to `main`, go to Settings > Pages and confirm the build is active ("GitHub Actions").

## 404 Page

A custom `404.html` is included. GitHub Pages will automatically serve this file for unknown routes at the site root. For local testing of unknown routes with a simple Python server you will only see directory listings or built-in 404; to simulate, directly open `404.html`.

If you add client-side routing later, keep `404.html` lightweight and optionally inject redirect logic.

## Suggested Next Enhancements

- Add Open Graph / Twitter meta tags for richer sharing.
- Add structured data (JSON-LD) for LocalBusiness / LegalService.
- Add a privacy & terms page.
- Integrate real form backend + spam protection (hCaptcha / honeypot).
- Add testimonial / case study section.
- Add Norwegian language toggle if targeting local audience.

## License / Ownership

All content placeholders; replace with verified firm-approved text before production.

---

Feel free to ask for enhancements (dark mode, deployment workflow, form backend, etc.).
