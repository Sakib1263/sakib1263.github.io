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
| Project summaries, findings, study limits, and figures | [src/data/research.ts](src/data/research.ts) |
| Publications and author order | [src/data/publications.json](src/data/publications.json) |
| Publication topic labels and selected papers | [src/data/papers.ts](src/data/papers.ts) |
| Appointments and education | [src/data/cv.ts](src/data/cv.ts) |
| Software and dataset links | [src/pages/software.astro](src/pages/software.astro) |
| Shared styles | [src/styles/site.css](src/styles/site.css) |

Add a publication by copying an existing entry. Use the publisher's title, the published author order in `Family, Given` form, the issue or proceedings year, and the DOI. Add an online publication year when it is known and differs from the issue year. Use one of the existing topic keys. The publication list and BibTeX download share this data.

Project pages use stable slugs. When adding results, record the comparison and the evaluation population or dataset. Give new artwork descriptive alternative text and a figure credit where applicable.

The CV page includes a print layout for saving a PDF through the browser. The research images and their source information are listed on the corresponding project pages. The Raman graphical abstract is from Mahmud et al. (2026), DOI [10.1016/j.saa.2025.126931](https://doi.org/10.1016/j.saa.2025.126931), under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The fonts include their respective Open Font Licenses.

## Deploy

In the repository's **Settings → Pages**, select **GitHub Actions** as the source. Push to `main` to build and deploy the site through the [Pages workflow](.github/workflows/pages.yml).

The default canonical origin is `https://sakib1263.github.io`. If moving the site to a different origin or a project subdirectory, configure `SITE_URL` and, when applicable, `SITE_BASE` in the build environment. [Astro deployment guide](https://docs.astro.build/en/guides/deploy/github/)
