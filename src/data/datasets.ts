type Dataset = {
  id: string;
  title: string;
  year: number;
  platform: 'Zenodo' | 'Kaggle';
  doi: string;
  studyDoi: string;
  access: 'Access by request' | 'Public dataset';
  facts: string[];
  summary: string;
  contribution: string;
  credit?: string;
};

export const datasets: Dataset[] = [
  {
    id: 'multi-instrument-sers',
    title: 'Multi-Instrument SERS Dataset',
    year: 2026,
    platform: 'Zenodo',
    doi: '10.5281/zenodo.23372983',
    studyDoi: '10.1016/j.saa.2025.126931',
    access: 'Access by request',
    facts: ['29,545 spectra', '20 analyte classes', '5 instruments', 'Version 1.0.0'],
    summary: 'Surface-enhanced Raman spectra from four portable instruments and one laboratory reference. The recordings support research on spectral alignment and analyte classification across devices. See the Zenodo record to request the files.',
    contribution: 'I published the Zenodo record and led model development and evaluation for the accompanying cross-device study.',
  },
  {
    id: 'covid-qu-ex',
    title: 'COVID-QU-Ex Dataset',
    year: 2022,
    platform: 'Kaggle',
    doi: '10.34740/kaggle/dsv/3122958',
    studyDoi: '10.1016/j.compbiomed.2021.105002',
    access: 'Public dataset',
    facts: ['33,920 chest radiographs', '11,956 COVID-19 images', 'Lung segmentation masks'],
    summary: 'Chest X-rays from COVID-19, other infections, and normal cases. The companion study used lung masks to outline the lungs and a separately annotated subset to localise infection and grade severity.',
    contribution: 'I co-curated the chest X-ray benchmark and contributed to model evaluation, interpretation, and manuscript review.',
  },
  {
    id: 'hip-implant-xray',
    title: 'Aseptic Loose Hip Implant X-Ray Database',
    year: 2022,
    platform: 'Kaggle',
    doi: '10.34740/kaggle/dsv/3078704',
    studyDoi: '10.1109/access.2022.3173424',
    access: 'Public dataset',
    facts: ['200 images for implant localisation', '206 images for loosening classification'],
    summary: 'Hip implant radiographs for two tasks in the HipXNet study. One subset has expert annotations for locating the implant. The other supports classification of aseptic loosening.',
    contribution: 'I helped develop and evaluate the HipXNet pipeline and contributed to data analysis, interpretation, and writing.',
    credit: 'The Kaggle release credits Tawsifur Rahman, Muhammad E. H. Chowdhury, Amith Khandakar, and Yazan Qiblawey as dataset creators.',
  },
];

export const datasetsByStudy = new Map(datasets.map(dataset => [dataset.studyDoi, dataset]));
