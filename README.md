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
| Research areas and project case studies | [src/data/research-catalog.ts](src/data/research-catalog.ts) |
| Google Scholar metrics and check date | [src/data/google-scholar.json](src/data/google-scholar.json) |
| Featured project summaries, results, and figures | [src/data/research.ts](src/data/research.ts) |
| Figure credits and reuse terms | [src/data/figure-credits.ts](src/data/figure-credits.ts) |
| Project figure files | `src/assets/research/<project-slug>/` |
| Publications, author order, and citation metadata | [src/data/publications.json](src/data/publications.json) |
| Journal quartiles, impact factors, and source records | [src/data/journal-metrics.json](src/data/journal-metrics.json) |
| Publication clusters, selection notes, and verified resources | [src/data/papers.ts](src/data/papers.ts) |
| CV date, selected contributions, appointments, and education | [src/data/cv.ts](src/data/cv.ts) |
| Insole release and reproduction commands | [src/data/kinetics.ts](src/data/kinetics.ts) |
| Dataset records, DOI links, and contributor credits | [src/data/datasets.ts](src/data/datasets.ts) |
| Research software catalog | [src/pages/software.astro](src/pages/software.astro) |
| Shared styles | [src/styles/site.css](src/styles/site.css) |
| Modern Professional palette | [src/lib/themes.ts](src/lib/themes.ts) |
| Contrast, borders, and focus colors | [src/styles/theme.css](src/styles/theme.css) |

Add a publication by copying an existing entry. Use the publisher's title, the published author order in `Family, Given` form, the issue or proceedings year, and the DOI. Add an online publication year when it is known and differs from the issue year. Assign one of the existing topic keys. The publication list, citation text, DOI-based permalinks, and BibTeX download share this data. Add an open full-text URL in `src/data/papers.ts` when the publisher or a repository makes the complete article publicly accessible. To share a filtered view, set the filters and copy the resulting address. For example, `/publications/?topic=imaging&view=selected#bibliography` shows the selected imaging papers.

In the publication's `bibliography` object, add the publisher and any available ISSN, ISBN, and editors. Use the confirmed publication date in `YYYY-MM` or `YYYY-MM-DD` format. For proceedings, use `eventDate` and `eventVenue` for the dates and city of the conference. Use `articleNumber` for an electronic article number and `pages` for a page range.

Journal metrics are keyed by the publication's ISSN. Use the best subject quartile from the SCImago release based on Scopus data. Use the Journal Impact Factor for the latest release, where available. Record the source, include the year for historical quartiles, and leave unverified fields empty.

Add a project to its research area in `src/data/research-catalog.ts` with a stable slug, a summary, the approach, and your contribution. Link supporting publications by DOI and related projects by slug. When adding results, record the comparison and the evaluation population or dataset.

Each project can have a display figure (`visual`) and further `figures` placed in the Approach or Reported results section. The display figure opens the project page, appears on homepage cards, and serves as the share image. When a wide crop reads better on a card, add `visual.card` with its own alternative text. Every figure needs descriptive alternative text, a caption that names the figure number and authors and states any crop, a `credit` link to the source, and a `licence` from `src/data/figure-credits.ts`. CC BY figures can be cropped with attribution. Use CC BY-NC-ND figures only whole and unmodified. Credit figures from subscription articles with the publisher's copyright line under its author-reuse policy. Don't reuse figures that the source paper itself reproduced from elsewhere. The build check fails when a figure has no source credit.

Replace `public/sakib-mahmud-cv.pdf` to update the downloadable CV. The build serves that file directly. Update `cvUpdated` when changing the web CV. The research figures include source links on their project pages. The Raman graphical abstract is from Mahmud et al. (2026), DOI [10.1016/j.saa.2025.126931](https://doi.org/10.1016/j.saa.2025.126931), under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The site serves [Inter](https://rsms.me/inter/) from local WOFF2 files under the [SIL Open Font License](src/assets/fonts/inter-OFL.txt).

Modern Professional applies across the site. Page styles use shared CSS variables. The theme tests check the exact palette, contrast pairs, and rendering with a dark device preference or a previously saved theme.

## Verify changes

```sh
pnpm build
pnpm check:build
node --test scripts/refresh-google-scholar.test.mjs
pnpm exec playwright install chromium
pnpm test
```

The build check verifies internal files and anchors, figure credits, the PDF download, and agreement between the bibliography and publication entries. The browser checks cover automated accessibility scans, the sticky header at phone width, citation copying and navigation, and the CV download.

## Deploy

In the repository's **Settings → Pages**, select **GitHub Actions** as the source. The [Pages workflow](.github/workflows/pages.yml) checks pull requests and deploys updates to `main` after verification passes.

The default canonical origin is `https://sakib1263.github.io`. If moving the site to a different origin or a project subdirectory, configure `SITE_URL` and, when applicable, `SITE_BASE` in the build environment. [Astro deployment guide](https://docs.astro.build/en/guides/deploy/github/)

The Google verification file in `public/` supports Search Console ownership on the current domain. The sitemap for Search Console is available at `/sitemap.xml`.

## Monthly Google Scholar refresh

1. Create a [free SerpApi account](https://serpapi.com/pricing) and copy its private API key from the [dashboard](https://serpapi.com/manage-api-key).
2. In this repository, open [Actions secrets](https://github.com/Sakib1263/sakib1263.github.io/settings/secrets/actions). Create a repository secret named `SERPAPI_API_KEY` and enter the key there.
3. Open [Deploy GitHub Pages](https://github.com/Sakib1263/sakib1263.github.io/actions/workflows/pages.yml), choose **Run workflow** on `main`, and leave **Refresh Google Scholar before publishing** selected to trigger the first check.

The scheduled run starts on the first day of each month at 9:23 a.m. Qatar time. One [SerpApi author lookup](https://serpapi.com/google-scholar-author-api) supplies the citation metrics and yearly chart values. A successful refresh saves the dated data and builds the site from that revision. If the request fails or the key is missing, the last saved snapshot remains available.
