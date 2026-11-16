export type CitationSnapshot = {
  checkedOn: string;
  totals: { citations: number; hIndex: number; i10Index: number };
  recent?: { since: number; citations: number; hIndex: number; i10Index: number };
  yearly: { year: number; citations: number }[];
};

export const scholarSnapshot: CitationSnapshot = {
  checkedOn: '2026-11-16',
  totals: { citations: 2314, hIndex: 27, i10Index: 46 },
  recent: { since: 2021, citations: 2304, hIndex: 26, i10Index: 46 },
  yearly: [
    { year: 2021, citations: 35 },
    { year: 2022, citations: 148 },
    { year: 2023, citations: 314 },
    { year: 2024, citations: 574 },
    { year: 2025, citations: 641 },
    { year: 2026, citations: 575 },
  ],
};

export const openAlexAuthor = 'https://openalex.org/A5028434107';

export const openAlexSnapshot: CitationSnapshot = {
  checkedOn: '2026-11-16',
  totals: { citations: 1837, hIndex: 24, i10Index: 42 },
  yearly: [
    { year: 2021, citations: 29 },
    { year: 2022, citations: 125 },
    { year: 2023, citations: 285 },
    { year: 2024, citations: 467 },
    { year: 2025, citations: 509 },
    { year: 2026, citations: 419 },
  ],
};

export const metricNumber = new Intl.NumberFormat('en-GB');
export const metricDate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeZone: 'UTC' });
