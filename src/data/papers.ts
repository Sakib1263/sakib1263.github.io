import records from './publications.json';

export const topics = {
  biomechanics: 'Wearables & biomechanics',
  imaging: 'Medical imaging',
  signals: 'Physiological signals & monitoring',
  spectroscopy: 'Raman spectroscopy & biosensing',
  devices: 'Biomedical devices & simulation',
  engineering: 'Energy & applied machine learning',
};

export const topicDescriptions: Record<keyof typeof topics, string> = {
  biomechanics: 'Smart insoles, gait modelling, and estimation of forces and motion.',
  imaging: 'Renal CT and ultrasound, organ segmentation, and chest imaging.',
  signals: 'Cardiovascular and neural waveforms, physiological sensing, and monitoring.',
  spectroscopy: 'Microbial sensing, cross-instrument alignment, and validation of Raman models.',
  devices: 'Implants, simulation, ventilation, and computational haemodynamics.',
  engineering: 'Smart buildings, energy systems, and machine learning for other applied problems.',
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
  '10.1016/j.talanta.2026.130241': 'https://www.sciencedirect.com/science/article/pii/S0039914026008970',
  '10.1016/j.bspc.2026.109894': 'https://www.sciencedirect.com/science/article/pii/S1746809426004489',
  '10.1016/j.compbiomed.2021.105002': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8556687/',
  '10.3390/bioengineering9110692': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9687508/',
  '10.3390/diagnostics11050893': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8155971/',
  '10.3390/cancers15123189': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10296307/',
  '10.1016/j.rser.2025.116481': 'https://www.sciencedirect.com/science/article/pii/S1364032125011542',
};

export const thesisUrl = 'https://qspace.qu.edu.qa/bitstream/handle/10576/45080/Sakib%20Mahmud_%20OGS%20Approved%20Thesis.pdf?isAllowed=n&sequence=1';

export const paperResources: Readonly<Record<string, { label: string; href: string }[]>> = {
  '10.1109/jbhi.2025.3605296': [
    { label: 'Open dataset', href: 'https://doi.org/10.5281/zenodo.7422031' },
  ],
  '10.1016/j.saa.2025.126931': [
    { label: 'Dataset access request', href: 'https://zenodo.org/records/23372983' },
  ],
  '10.1016/j.eswa.2024.124594': [
    { label: 'Related MSc thesis', href: thesisUrl },
  ],
  '10.3390/bioengineering9110692': [
    { label: 'Original implementation', href: 'https://github.com/nibtehaz/PPG2ABP' },
    { label: 'UCI dataset', href: 'https://archive.ics.uci.edu/dataset/340/cuff+less+blood+pressure+estimation' },
  ],
  '10.1016/j.compbiomed.2021.105002': [
    { label: 'Radiography dataset used in the study', href: 'https://www.kaggle.com/datasets/tawsifurrahman/covid19-radiography-database/data' },
  ],
};

const readingNotes = {
  '10.1109/jbhi.2025.3605296': 'Reconstructs 3D foot kinetics from smart-insole pressures and checks the estimates against an instrumented treadmill in participant-held-out folds.',
  '10.1016/j.eswa.2024.124594': 'Combines kidney segmentation and grading across ultrasound views to produce a subject-level severity estimate.',
  '10.1016/j.talanta.2026.130241': 'Reviews 129 microbial SERS studies, with an emphasis on biological independence and external validation.',
  '10.1016/j.bspc.2026.109894': 'Narrows the search to kidney and stone slices before delineating small stones in CT scans.',
  '10.1016/j.saa.2025.126931': 'Aligns spectra from four portable instruments to a laboratory reference and evaluates how the alignment changes classification.',
  '10.3390/cancers15123189': 'Combines contrast-enhanced CT and clinical metadata to classify renal tumours and study surgical approach selection.',
  '10.1016/j.compbiomed.2021.105002': 'Segments lung and infection regions on chest radiographs to localize and grade COVID-19 pneumonia.',
  '10.3390/bioengineering9110692': 'Reconstructs arterial blood pressure waveforms from photoplethysmography using two cascaded networks.',
  '10.3390/diagnostics11050893': 'Segments lungs and infection regions on chest CT, then grades severity from the extent of involvement.',
  '10.1016/j.rser.2025.116481': 'Reviews deep reinforcement learning for generation, storage, grid operations, and energy markets, with attention to evaluation and deployment.',
};

export const selectedPapers = Object.entries(readingNotes).map(([doi, context]) => ({ publication: publicationFor(doi), context }));
export const readingNotesByDoi = new Map(selectedPapers.map(({ publication, context }) => [publication.doi, context]));
export const citedPaperNotes: Readonly<Record<string, number>> = {
  '10.1016/j.compbiomed.2021.105002': 221,
  '10.3390/bioengineering9110692': 186,
  '10.3390/diagnostics11050893': 134,
  '10.3390/cancers15123189': 86,
};
