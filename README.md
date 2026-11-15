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
| Publication clusters, selection notes, and verified resources | [src/data/papers.ts](src/data/papers.ts) |
| CV date, selected contributions, appointments, and education | [src/data/cv.ts](src/data/cv.ts) |
| Insole release and reproduction commands | [src/data/kinetics.ts](src/data/kinetics.ts) |
| Software and dataset links | [src/pages/software.astro](src/pages/software.astro) |
| Shared styles | [src/styles/site.css](src/styles/site.css) |

Add a publication by copying an existing entry. Use the publisher's title, the published author order in `Family, Given` form, the issue or proceedings year, and the DOI. Add an online publication year when it is known and differs from the issue year. Assign one of the existing topic keys. The publication list, citation text, DOI-based permalinks, and BibTeX download share this data. Add an open full-text URL in `src/data/papers.ts` when the publisher or a repository makes the complete article publicly accessible. To share a filtered view, set the filters and copy the resulting address. For example, `/publications/?topic=imaging&view=selected#bibliography` shows the selected imaging papers.

Project pages use stable slugs. When adding results, record the comparison and the evaluation population or dataset. Give new artwork descriptive alternative text and a figure credit where applicable.

The build generates `sakib-mahmud-cv.pdf` from the web CV data. Update `cvUpdated` when changing the public CV. The research figures include source links on their project pages. The Raman graphical abstract is from Mahmud et al. (2026), DOI [10.1016/j.saa.2025.126931](https://doi.org/10.1016/j.saa.2025.126931), under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The fonts include their respective Open Font Licenses.

## Verify changes

```sh
pnpm build
pnpm check:build
pnpm exec playwright install chromium
pnpm test
```

The build check verifies internal files and anchors, the PDF download, and agreement between the bibliography and publication entries. The browser checks cover automated accessibility scans, the sticky header at phone width, citation copying and navigation, and the CV download.

## Deploy

In the repository's **Settings → Pages**, select **GitHub Actions** as the source. The [Pages workflow](.github/workflows/pages.yml) checks pull requests and deploys updates to `main` after verification passes.

The default canonical origin is `https://sakib1263.github.io`. If moving the site to a different origin or a project subdirectory, configure `SITE_URL` and, when applicable, `SITE_BASE` in the build environment. [Astro deployment guide](https://docs.astro.build/en/guides/deploy/github/)

The Google verification file in `public/` supports Search Console ownership on the current domain. The sitemap for Search Console is available at `/sitemap.xml`.
