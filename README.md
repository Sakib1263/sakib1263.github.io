# Sakib Mahmud · Research portfolio

The portfolio covers wearable biomechanics, medical imaging, spectroscopy, and physiological signal processing. Astro generates the pages for GitHub Pages.

## Develop locally

Use Node.js 24 and pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm preview
```

## Maintain the content

| Content | Location |
| --- | --- |
| Name, affiliation, and professional links | [src/lib/site.ts](src/lib/site.ts) |
| Project summaries, contribution, figures, and references | [src/data/research.ts](src/data/research.ts) |
| Publications and author order | [src/data/publications.json](src/data/publications.json) |
| Appointments and education | [src/data/cv.ts](src/data/cv.ts) |
| Software and dataset links | [src/pages/software.astro](src/pages/software.astro) |
| Shared styles | [src/styles/site.css](src/styles/site.css) |

Add a publication by copying the structure of an existing entry and entering its title, ordered authors, issue or proceedings year, venue, type, and DOI. The list and BibTeX download read the same data. Keep the newest entries first. Project pages use stable slugs. Give new artwork descriptive alternative text and a figure credit where applicable.

The CV page includes a print layout for saving a PDF through the browser. The research images and their source information are listed on the corresponding project pages. The Raman graphical abstract is from Mahmud et al. (2026), DOI [10.1016/j.saa.2025.126931](https://doi.org/10.1016/j.saa.2025.126931), under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The fonts include their respective Open Font Licenses.

## Deploy

In the repository's **Settings → Pages**, select **GitHub Actions** as the source. Push to `main` to build and deploy the site through the [Pages workflow](.github/workflows/pages.yml).

The default canonical origin is `https://sakib1263.github.io`. If moving the site to a different origin or a project subdirectory, configure `SITE_URL` and, when applicable, `SITE_BASE` in the build environment. [Astro deployment guide](https://docs.astro.build/en/guides/deploy/github/)
