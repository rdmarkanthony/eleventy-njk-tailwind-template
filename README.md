## Usage Guide

### Requirements

- Node.js `v18` or later
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
