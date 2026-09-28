## Usage Guide

### Requirements

- Node.js `v20` or later
- pnpm `v10` or later

### Instructions

1. Clone the repository:
   `git clone https://github.com/rdmarkanthony/eleventy-njk-tailwind-template.git`
2. Navigate to the project directory:
   `cd eleventy-njk-tailwind-template`
3. Install dependencies:
   `pnpm install`
4. Start the development server:
   `pnpm start`
5. Build for production:
   `pnpm build`

### Troubleshooting

- If you encounter any issues, ensure that you're using the recommended versions of Node.js and pnpm.
- If problems persist, try deleting the `node_modules` folder and the `pnpm-lock.yaml` file, then run `pnpm install` again.

### Output

- Source Nunjucks templates are in `src/_includes/`.
- Page content is in `src/` (e.g. `index.njk`).
- Raw CSS, JS, and images are in `src/assets/`.
- Compiled HTML, CSS, JS, and images are output to `public/`.
- `pnpm build` clears `public/` first, so removed pages never linger in the output.

### Page slots

Pages use `layout: base.njk` in front matter. To add page-specific markup to the layout, use these paired shortcodes anywhere in the page:

- `{% styles %}...{% endstyles %}` – rendered in `<head>` after the main stylesheet
- `{% headerscript %}...{% endheaderscript %}` – rendered at the end of `<head>`
- `{% popup %}...{% endpopup %}` – rendered after `<main>`
- `{% footerscript %}...{% endfooterscript %}` – rendered after the main script

### SEO

Set `url` in `src/_data/site.json` (e.g. `https://example.com`) to enable `og:image`, `og:url` and the canonical link. Pages can set `pageDescription`, `pageKeywords`, `pageImage` and `pageURL` in front matter.

### Environment variables

Variables in `.env` prefixed with `PUBLIC_` are available in `src/assets/js` as `process.env.PUBLIC_*`. Other variables are never bundled.
