import type { FigureLicence } from './research';

/** Credit helpers for figures reused from published articles. */

export const sourceArticle = (doi: string) => ({ label: 'Source article', href: `https://doi.org/${doi}` });

export const ccBy: FigureLicence = { label: 'CC BY 4.0', href: 'https://creativecommons.org/licenses/by/4.0/' };

export const ccByNcNd: FigureLicence = { label: 'CC BY-NC-ND 4.0', href: 'https://creativecommons.org/licenses/by-nc-nd/4.0/' };

/** Elsevier lets authors of subscription articles reuse their own figures in new works with acknowledgement. */
export const elsevier = (year: number, entity: 'Ltd' | 'B.V.' = 'Ltd'): FigureLicence => ({
  label: `© ${year} Elsevier ${entity} · author reuse`,
  href: 'https://www.elsevier.com/about/policies-and-standards/copyright',
});

/** Springer Nature lets authors reuse their own material when the journal is credited with first publication. */
export const springer = (year: number): FigureLicence => ({
  label: `© ${year} Springer Nature · author reuse`,
  href: 'https://www.springernature.com/gp/partners/rights-permissions-third-party-distribution',
});
