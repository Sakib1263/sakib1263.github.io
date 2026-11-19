import records from './publications.json';
import details from './publication-details.json';

export const topics = {
  biomechanics: 'Wearables & biomechanics',
  imaging: 'Medical imaging',
  signals: 'Biosignal AI & health monitoring',
  spectroscopy: 'Raman spectroscopy & biosensing',
  devices: 'Biomedical devices & simulation',
  engineering: 'Energy & applied machine learning',
};

export const topicDescriptions: Record<keyof typeof topics, string> = {
  biomechanics: 'Smart insoles, gait modelling, and estimation of forces and motion.',
  imaging: 'Renal CT and ultrasound, organ segmentation, and chest imaging.',
  signals: 'Machine learning for cardiovascular, neural, and metabolic signals from clinical, wearable, and contactless sensors.',
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

const detailsByDoi: Readonly<Record<string, { summary: string; contribution: string }>> = details;

export function publicationDetails(doi: string) {
  const detail = detailsByDoi[doi];
  if (!detail) throw new Error(`Missing publication summary and contribution: ${doi}`);
  return detail;
}

export function displayAuthor(author: string) {
  const comma = author.indexOf(', ');
  return comma < 0 ? author : `${author.slice(comma + 2)} ${author.slice(0, comma)}`;
}

export function publicationId(doi: string) {
  return `paper-${doi.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

export function bibtexKey(doi: string) {
  return doi.replace(/[^\w]+/g, '-');
}

export type Publication = (typeof publications)[number];

export const openFullText: Readonly<Record<string, string>> = {
  '10.1016/j.saa.2025.126931': 'https://manara.qnl.qa/articles/journal_contribution/Deep_learning-based_cross-device_standardization_of_surface-enhanced_Raman_spectroscopy_for_enhanced_bacterial_recognition/30664580',
  '10.1016/j.talanta.2026.130241': 'https://www.sciencedirect.com/science/article/pii/S0039914026008970',
  '10.1016/j.bspc.2026.109894': 'https://www.sciencedirect.com/science/article/pii/S1746809426004489',
  '10.1016/j.compbiomed.2021.105002': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8556687/',
  '10.3390/bioengineering9110692': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9687508/',
  '10.3390/diagnostics11050893': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8155971/',
  '10.3390/cancers15123189': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10296307/',
  '10.1016/j.rser.2025.116481': 'https://www.sciencedirect.com/science/article/pii/S1364032125011542',
  '10.1007/s11517-025-03311-3': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12204922/',
  '10.3390/s23218890': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10650219/',
  '10.3390/diagnostics13122000': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10297317/',
  '10.3390/bioengineering10050579': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10215884/',
  '10.3390/bioengineering10050542': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10215845/',
  '10.3389/fped.2023.1149318': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10150132/',
  '10.3390/ma16041466': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9962303/',
  '10.1016/j.engappai.2023.106130': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10047244/',
  '10.3390/bios13010079': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9855817/',
  '10.3390/bioengineering9100558': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9598342/',
  '10.3390/polym14204308': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9607025/',
  '10.3390/s22197599': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9572216/',
  '10.1016/j.compbiomed.2022.105682': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9170596/',
  '10.3390/diagnostics12040920': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9028864/',
  '10.3390/s22030919': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8840244/',
};

export const thesisUrl = 'https://qspace.qu.edu.qa/bitstream/handle/10576/45080/Sakib%20Mahmud_%20OGS%20Approved%20Thesis.pdf?isAllowed=n&sequence=1';

export const paperResources: Readonly<Record<string, { label: string; href: string }[]>> = {
  '10.1016/j.eswa.2024.124594': [
    { label: 'Related MSc thesis', href: thesisUrl },
  ],
};

// Code that a paper itself names. Project code on the research pages is added to these on each card.
export const paperCode: Readonly<Record<string, string>> = {
  '10.3390/s22030919': 'https://github.com/Sakib1263/NABNet',
  '10.3390/bioengineering9110692': 'https://github.com/nibtehaz/PPG2ABP',
  '10.1016/j.engappai.2023.106130': 'https://github.com/farhanfuadabir/PCovNet',
};

const datasetLinks = {
  huaweiWang: { label: 'Study dataset (Huawei Wang)', href: 'https://doi.org/10.5281/zenodo.7422031' },
  gaitNdd: { label: 'Gait in Neurodegenerative Disease dataset', href: 'https://physionet.org/content/gaitndd/1.0.0/' },
  taiChi: { label: 'Tai Chi gait dataset', href: 'https://physionet.org/content/taichidb/1.0.1/' },
  kidneyStoneCt: { label: 'Kidney stone CT dataset', href: 'https://doi.org/10.5281/zenodo.6042410' },
  chaos: { label: 'CHAOS dataset', href: 'https://chaos.grand-challenge.org/' },
  kits21: { label: 'KiTS21 dataset', href: 'https://kits-challenge.org/kits21/' },
  radarVitals: { label: 'Clinical radar vital signs dataset', href: 'https://doi.org/10.6084/m9.figshare.12186516' },
  mhdEcg: { label: 'MHD-corrupted ECG dataset', href: 'https://physionet.org/content/mhd-effect-ecg-mri/1.0.0/' },
  maus: { label: 'MAUS dataset', href: 'https://doi.org/10.21227/q4td-yd35' },
  mechanocardiograms: { label: 'Mechanocardiograms with ECG reference dataset', href: 'https://doi.org/10.21227/vfcs-k196' },
  motionArtifact: { label: 'Motion artifact EEG dataset', href: 'https://physionet.org/content/motion-artifact/1.0.0/' },
  ubfc: { label: 'UBFC-rPPG dataset', href: 'https://sites.google.com/view/ybenezeth/ubfcrppg' },
  adfecg: { label: 'Abdominal and direct fetal ECG dataset', href: 'https://physionet.org/content/adfecgdb/1.0.0/' },
  fetalAnnotated: { label: 'Annotated fetal ECG dataset', href: 'https://doi.org/10.6084/m9.figshare.c.4740794' },
  tcd: { label: 'Transcranial Doppler dataset', href: 'https://ieee-dataport.org/open-access/transcranial-doppler-ultrasound-database-philips-cx50-ultrasound-system' },
  eegDenoise: { label: 'EEGdenoiseNet dataset', href: 'https://github.com/ncclabsustech/EEGdenoiseNet' },
  uciBp: { label: 'UCI cuffless blood pressure dataset', href: 'https://archive.ics.uci.edu/dataset/340/cuff+less+blood+pressure+estimation' },
  vortal: { label: 'VORTAL dataset', href: 'https://peterhcharlton.github.io/RRest/vortal_dataset.html' },
  bidmc: { label: 'BIDMC dataset', href: 'https://physionet.org/content/bidmc/1.0.0/' },
  wearables1: { label: 'Stanford wearables data, phase 1 (zip)', href: 'https://storage.googleapis.com/gbsc-gcp-project-ipop_public/COVID-19/COVID-19-Wearables.zip' },
  wearables2: { label: 'Stanford wearables data, phase 2 (zip)', href: 'https://storage.googleapis.com/gbsc-gcp-project-ipop_public/COVID-19-Phase2/COVID-19-Phase2-Wearables.zip' },
  qucoughscope: { label: 'QUCoughScope cough dataset', href: 'https://www.kaggle.com/datasets/tawsifurrahman/qucoughscope-covid19-cough-dataset' },
  gearbox: { label: 'Gearbox fault diagnosis dataset', href: 'https://www.kaggle.com/datasets/brjapon/gearbox-fault-diagnosis' },
  gigo: { label: 'GIGO dataset', href: 'https://doi.org/10.21942/uva.20750044' },
  studentRoom: { label: 'Student room occupancy dataset', href: 'https://doi.org/10.7910/DVN/BIIFAJ' },
  uciOccupancy: { label: 'UCI occupancy detection dataset', href: 'https://archive.ics.uci.edu/dataset/357/occupancy+detection' },
};

// Public datasets each paper used, taken from its dataset description and data availability statement.
export const paperDatasets: Readonly<Record<string, { label: string; href: string }[]>> = {
  '10.1109/jbhi.2025.3605296': [datasetLinks.huaweiWang],
  '10.1007/s10489-023-04557-w': [datasetLinks.gaitNdd],
  '10.1016/j.compbiomed.2021.105184': [datasetLinks.taiChi],
  '10.1016/j.bspc.2026.109894': [datasetLinks.kidneyStoneCt],
  '10.3390/s23218890': [datasetLinks.chaos],
  '10.3390/cancers15123189': [datasetLinks.kits21],
  '10.1007/s00521-025-11327-x': [datasetLinks.radarVitals],
  '10.1016/j.compbiomed.2024.108555': [datasetLinks.radarVitals],
  '10.1016/j.engappai.2024.108483': [datasetLinks.mhdEcg],
  '10.3390/bioengineering10050542': [datasetLinks.mhdEcg],
  '10.1016/j.eswa.2024.123167': [datasetLinks.maus],
  '10.1109/access.2024.3353463': [datasetLinks.mechanocardiograms],
  '10.1016/j.engappai.2023.107514': [datasetLinks.motionArtifact],
  '10.1007/s00521-022-08111-6': [datasetLinks.motionArtifact],
  '10.1016/j.bspc.2023.105687': [datasetLinks.ubfc],
  '10.1016/j.eswa.2023.121196': [datasetLinks.adfecg, datasetLinks.fetalAnnotated],
  '10.1016/j.engappai.2023.106414': [datasetLinks.adfecg, datasetLinks.fetalAnnotated],
  '10.3390/diagnostics13122000': [datasetLinks.tcd],
  '10.1016/j.bspc.2023.104882': [datasetLinks.tcd],
  '10.3390/bioengineering10050579': [datasetLinks.eegDenoise],
  '10.5121/csit.2022.122006': [datasetLinks.eegDenoise],
  '10.1016/j.bspc.2022.104247': [datasetLinks.uciBp],
  '10.3390/bioengineering9110692': [datasetLinks.uciBp],
  '10.3390/s22030919': [datasetLinks.uciBp],
  '10.3390/bioengineering9100558': [datasetLinks.vortal, datasetLinks.bidmc],
  '10.1016/j.compbiomed.2022.105682': [datasetLinks.wearables1],
  '10.1016/j.engappai.2023.106130': [datasetLinks.wearables1, datasetLinks.wearables2],
  '10.3390/diagnostics12040920': [datasetLinks.qucoughscope],
  '10.1109/access.2024.3412274': [datasetLinks.gearbox],
  '10.1016/j.wasman.2023.12.014': [datasetLinks.gigo],
  '10.1007/s00521-025-11348-6': [datasetLinks.studentRoom, datasetLinks.uciOccupancy],
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
