type Dataset = {
  id: string;
  title: string;
  year: number;
  platform: 'Zenodo' | 'Kaggle';
  doi: string;
  studyDoi: string;
  /** The research page that describes the study. */
  project: string;
  access: 'Access by request' | 'Public dataset';
  facts: string[];
  summary: string;
  contribution: string;
  credit?: string;
  license: { label: string; href: string };
  files: string;
  evaluation: { text: string; label: string; href: string };
};

export const datasets: Dataset[] = [
  {
    id: 'multi-instrument-sers',
    title: 'Multi-Instrument SERS Dataset',
    year: 2026,
    platform: 'Zenodo',
    doi: '10.5281/zenodo.23372983',
    studyDoi: '10.1016/j.saa.2025.126931',
    project: 'cross-device-raman',
    access: 'Access by request',
    facts: ['29,545 spectra', '20 analyte classes', '5 instruments', 'Version 1.0.0'],
    summary: 'Surface-enhanced Raman spectra from four portable instruments and one laboratory reference. The recordings support research on spectral alignment and analyte classification across devices. See the Zenodo record to request the files.',
    contribution: 'I published the Zenodo record and led model development and evaluation for the accompanying cross-device study.',
    license: { label: 'CC BY 4.0', href: 'https://creativecommons.org/licenses/by/4.0/' },
    files: 'The public record gives instrument counts, preprocessing details and the citation. Use the Zenodo access request to obtain the spectra.',
    evaluation: {
      text: 'The classification experiment used 50 training spectra per analyte class. The study describes the device-to-reference comparison and evaluation protocol.',
      label: 'Study methods and Table 5',
      href: 'https://manara.qnl.qa/articles/journal_contribution/Deep_learning-based_cross-device_standardization_of_surface-enhanced_Raman_spectroscopy_for_enhanced_bacterial_recognition/30664580',
    },
  },
  {
    id: 'covid-qu-ex',
    title: 'COVID-QU-Ex Dataset',
    year: 2022,
    platform: 'Kaggle',
    doi: '10.34740/kaggle/dsv/3122958',
    studyDoi: '10.1016/j.compbiomed.2021.105002',
    project: 'covid-chest-imaging',
    access: 'Public dataset',
    facts: ['33,920 chest radiographs', '11,956 COVID-19 images', 'Lung segmentation masks'],
    summary: 'Chest X-rays from COVID-19, other infections, and normal cases. The companion study used lung masks to outline the lungs and a separately annotated subset to localise infection and grade severity.',
    contribution: 'I co-curated the chest X-ray benchmark and contributed to model evaluation, interpretation, and manuscript review.',
    credit: 'Dataset citation credits Anas M. Tahir, Muhammad E. H. Chowdhury, Yazan Qiblawey, Amith Khandakar, Tawsifur Rahman, Serkan Kiranyaz, Uzair Khurshid, Nabil Ibtehaz, Sakib Mahmud and Maymouna Ezeddin.',
    license: { label: 'CC BY-SA 4.0', href: 'https://creativecommons.org/licenses/by-sa/4.0/' },
    files: 'Kaggle v7 provides chest X-rays with lung masks. The infection subset pairs COVID-positive images with masks from QaTa-Cov19 for infection localisation.',
    evaluation: {
      text: 'The paper reports five folds with an 80/20 training and test split. One fifth of the training data was reserved for validation in each fold.',
      label: 'Experimental setup and Table 1',
      href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8556687/#tbl1',
    },
  },
  {
    id: 'hip-implant-xray',
    title: 'Aseptic Loose Hip Implant X-Ray Database',
    year: 2022,
    platform: 'Kaggle',
    doi: '10.34740/kaggle/dsv/3078704',
    studyDoi: '10.1109/access.2022.3173424',
    project: 'hip-implant-mechanics-and-imaging',
    access: 'Public dataset',
    facts: ['200 images for implant localisation', '206 images for loosening classification'],
    summary: 'Hip implant radiographs for two tasks in the HipXNet study. One subset has expert annotations for locating the implant. The other supports classification of aseptic loosening.',
    contribution: 'I helped develop and evaluate the HipXNet pipeline and contributed to data analysis, interpretation, and writing.',
    credit: 'The dataset DOI lists Tawsifur Rahman, Muhammad E. H. Chowdhury, Amith Khandakar, and Yazan Qiblawey as creators. The Kaggle description also credits the wider study team, including me.',
    license: { label: 'CC0 1.0', href: 'https://creativecommons.org/publicdomain/zero/1.0/' },
    files: 'The study describes expert-annotated implant radiographs for localisation and radiographs labelled fixed or loose for classification.',
    evaluation: {
      text: 'The paper describes five-fold evaluation with an 80/20 image split for training and testing.',
      label: 'HipXNet methods',
      href: 'https://doi.org/10.1109/ACCESS.2022.3173424',
    },
  },
];

export const datasetsByStudy = new Map(datasets.map(dataset => [dataset.studyDoi, dataset]));
