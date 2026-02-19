## Usage Guide

### Requirements

-   Node.js `v18` or later
-   pnpm `v10` or later

### Instructions

1. Clone the repository: `git clone https://github.com/rdmarkanthony/eleventy-njk-tailwind-template`
2. Navigate to the project directory: `cd eleventy-njk-tailwind-template`
3. Install dependencies: `pnpm install`
4. Run the development server: `pnpm start`

### Troubleshooting

-   If you encounter any issues, ensure that you're using the recommended versions of Node.js and pnpm.
-   If problems persist, try deleting the `node_modules` folder and the `package-lock.json` or `pnpm-lock.yaml` file, then run `pnpm install` again.

### Output

- Nunjucks templates are in `src/_includes/`.
- Page content is in `src/` (eg. index.njk).
- Raw CSS, JS, and images are in `src/assets/`.
- Built files (HTML, CSS, JS, images) are in `public/`.
