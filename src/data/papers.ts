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
