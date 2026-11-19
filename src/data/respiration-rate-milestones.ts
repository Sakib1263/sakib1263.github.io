import methodology from '../assets/research/ppg-respiration-rate/methodology.png';
import vortalResults from '../assets/research/ppg-respiration-rate/vortal-results.png';
import { ccBy, sourceArticle } from './figure-credits';
import type { ResearchPhase, ResearchProject } from './research';

export const respirationRateDoi = '10.3390/bioengineering9100558';
const credit = sourceArticle(respirationRateDoi);

export const respirationRateVisual: NonNullable<ResearchProject['visual']> = {
  image: methodology,
  alt: 'Flow diagram. The public VORTAL and BIDMC datasets are preprocessed by resampling to 125 Hz, noise removal, motion artefact removal and signal segmentation. The data then feed three evaluations: intra-dataset training and cross-validation, training and cross-validation on the combined dataset, and inter-dataset fine-tuning on a small subset of new data with evaluation on the rest.',
  caption: 'Figure 1 from Chowdhury et al. (2022). Preprocessing of the two public PPG datasets and the three evaluation settings.',
  credit,
  licence: ccBy,
};

export const respirationRateProgress: ResearchPhase[] = [
  {
    id: 'model-comparison',
    navLabel: 'Model comparison',
    title: 'Estimating respiration rate end to end',
    status: 'Bioengineering · 2022',
    paragraphs: [
      'Two public datasets provided PPG with reference respiration rate: VORTAL, with 39 healthy volunteers at rest, and BIDMC, with 53 intensive care patients. Signals were resampled to 125 Hz, low-pass filtered, cleaned of motion artefacts with variational mode decomposition and cut into 16-second windows with 50% overlap.',
      'Five 1D networks were compared with five-fold cross-validation: ResNet18, Inception-v1, MobileNet-v1, DenseNet121 and ConvMixer. ConvMixer, which mixes signal patches with depthwise and pointwise convolutions, was clearly the most accurate, with a mean absolute error of 1.27 breaths per minute on VORTAL and 0.77 on BIDMC.',
    ],
    measures: [
      { value: '1.27', label: 'Mean absolute error on VORTAL (breaths/min)' },
      { value: '0.77', label: 'Mean absolute error on BIDMC (breaths/min)' },
      { value: '0.92', label: 'Correlation with the reference on both datasets' },
    ],
    table: {
      caption: 'Five networks on VORTAL with five-fold cross-validation. From Table 2 of the paper.',
      columns: ['Correlation (R)', 'MAE (breaths/min)', 'RMSE (breaths/min)'],
      rows: [
        { label: 'ResNet18', cells: ['0.646', '2.69', '3.43'] },
        { label: 'Inception-v1', cells: ['0.824', '1.87', '2.55'] },
        { label: 'MobileNet-v1', cells: ['0.735', '2.43', '3.17'] },
        { label: 'DenseNet121', cells: ['0.749', '2.23', '2.98'] },
        { label: 'ConvMixer', cells: ['0.921', '1.27', '1.75'] },
      ],
    },
    figures: [
      {
        image: vortalResults,
        alt: 'Two plots for ConvMixer on VORTAL. (a) Estimated against target respiration rate from about 5 to 30 breaths per minute, with points clustered along the ideal line and a red trendline close to it. (b) Bland–Altman plot of the error against the average, with a mean of −0.06 and limits of agreement from −3.48 to 3.35 breaths per minute.',
        caption: 'Figure 3 from Chowdhury et al. (2022). ConvMixer on VORTAL: (a) estimated against target respiration rate and (b) Bland–Altman plot with 95% limits of agreement.',
        credit,
        licence: ccBy,
      },
    ],
  },
  {
    id: 'across-datasets',
    navLabel: 'Across datasets',
    title: 'Transferring to a new population',
    status: 'Cross-dataset evaluation',
    paragraphs: [
      'A model trained on one dataset did poorly on the other. Root mean square error rose to 4.98 breaths per minute from BIDMC to VORTAL and 5.78 in the other direction, reflecting the gap between healthy volunteers and intensive care patients. Training on both datasets together restored a correlation of 0.92.',
      'Fine-tuning on only 10% of the new dataset, with another 10% for validation, cut the error to 2.66 and 1.74 breaths per minute, with correlations of 0.80 and 0.81.',
    ],
    measures: [
      { value: '10%', label: 'Of the new dataset used for fine-tuning' },
      { value: '4.98 → 2.66', label: 'Error after fine-tuning, BIDMC to VORTAL (breaths/min)' },
      { value: '5.78 → 1.74', label: 'Error after fine-tuning, VORTAL to BIDMC (breaths/min)' },
    ],
    table: {
      caption: 'All evaluation settings for ConvMixer. From Table 3 of the paper.',
      columns: ['Correlation (R)', 'RMSE (breaths/min)', 'MAE (breaths/min)'],
      rows: [
        { label: 'Five-fold, VORTAL', cells: ['0.921', '1.75', '1.27'] },
        { label: 'Five-fold, BIDMC', cells: ['0.916', '1.20', '0.77'] },
        { label: 'Five-fold, both datasets', cells: ['0.918', '1.52', '1.04'] },
        { label: 'BIDMC model fine-tuned on VORTAL', cells: ['0.802', '2.66', '2.02'] },
        { label: 'VORTAL model fine-tuned on BIDMC', cells: ['0.812', '1.74', '1.18'] },
      ],
    },
  },
];
