import records from './publications.json';

export const topics = {
  biomechanics: 'Biomechanics & devices',
  imaging: 'Medical imaging',
  signals: 'Physiological signals',
  spectroscopy: 'Spectroscopy',
  engineering: 'Other engineering',
};

export const publications = [...records].sort((left, right) =>
  right.year - left.year || (right.onlineYear ?? right.year) - (left.onlineYear ?? left.year),
);

const byDoi = new Map(publications.map(publication => [publication.doi, publication]));

export function publicationFor(doi: string) {
  const publication = byDoi.get(doi.toLowerCase());
  if (!publication) throw new Error(`Missing publication: ${doi}`);
  return publication;
}

export function displayAuthor(author: string) {
  const comma = author.indexOf(', ');
  return comma < 0 ? author : `${author.slice(comma + 2)} ${author.slice(0, comma)}`;
}

export function publicationId(doi: string) {
  return `paper-${doi.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

type Publication = (typeof publications)[number];

export function citationText(publication: Publication) {
  const authors = publication.authors.map(displayAuthor).join(', ');
  const volume = publication.volume ? `, ${publication.volume}${publication.issue ? `(${publication.issue})` : ''}` : '';
  const locator = publication.articleNumber ? `Article ${publication.articleNumber}` : publication.pages;
  return `${authors} (${publication.year}). ${publication.title}. ${publication.venue}${volume}${locator ? `, ${locator}` : ''}. https://doi.org/${publication.doi}`;
}

export const openFullText: Readonly<Record<string, string>> = {
  '10.1016/j.saa.2025.126931': 'https://manara.qnl.qa/articles/journal_contribution/Deep_learning-based_cross-device_standardization_of_surface-enhanced_Raman_spectroscopy_for_enhanced_bacterial_recognition/30664580',
  '10.1016/j.eswa.2024.124594': 'https://www.sciencedirect.com/science/article/pii/S0957417424014611',
  '10.1016/j.talanta.2026.130241': 'https://www.sciencedirect.com/science/article/pii/S0039914026008970',
};

export const selectedPapers = [
  {
    publication: publicationFor('10.1016/j.talanta.2026.130241'),
    context: 'A review of 129 studies on label-free microbial spectroscopy and machine learning, with an emphasis on biological independence and external validation.',
  },
  {
    publication: publicationFor('10.1016/j.eswa.2024.124594'),
    context: 'A renal ultrasound pipeline that combines kidney segmentation with patient-level severity grading in a retrospective cohort.',
  },
  {
    publication: publicationFor('10.1016/j.bspc.2022.104247'),
    context: 'A signal reconstruction study that estimates arterial blood pressure waveforms and pressure components from PPG and ECG.',
  },
];
