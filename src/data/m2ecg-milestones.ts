import framework from '../assets/research/mechanocardiogram-to-ecg/framework.png';
import heartRate from '../assets/research/mechanocardiogram-to-ecg/heart-rate-correlation.png';
import { ccBy, sourceArticle } from './figure-credits';
import type { ResearchPhase, ResearchProject } from './research';

export const m2ecgDoi = '10.1109/access.2024.3353463';
const credit = sourceArticle(m2ecgDoi);

export const m2ecgVisual: NonNullable<ResearchProject['visual']> = {
  image: framework,
  alt: 'Pipeline diagram. ECG, SCG and GCG signals from a person go through preprocessing: resampling, baseline correction, filtering, segmentation and normalisation. The ground-truth ECG and selected SCG and GCG signals train a U-Net-style model, which outputs a reconstructed ECG used for R-peak detection and heart rate and variability measurement.',
  caption: 'Figure 1 from Tapotee et al. (2024). The M2ECG framework: preprocessing, model training on selected SCG and GCG channels, ECG reconstruction, and heart rate and variability measurement.',
  credit,
  licence: ccBy,
};

export const m2ecgProgress: ResearchPhase[] = [
  {
    id: 'data-and-channels',
    navLabel: 'Data and channels',
    title: 'Choosing mechanocardiogram channels',
    status: 'IEEE Access · 2024',
    paragraphs: [
      'The public Mechanocardiograms with ECG Reference dataset provides lead II ECG with three-axis SCG and GCG from a chest-mounted motion sensor, recorded at 800 Hz. The study used the 29 healthy volunteers, about 260 minutes of recordings.',
      'Signals were band-pass filtered, corrected for baseline drift, resampled and cut into segments of 1,024 samples. Twenty-six volunteers formed the training set, and three held-out volunteers formed the test set.',
      'Of the six motion channels, the SCG z-axis combined with the GCG y-axis gave the lowest reconstruction error, better than all three axes of either sensor or all six channels together.',
    ],
    measures: [
      { value: '29', label: 'Healthy volunteers' },
      { value: '3', label: 'Volunteers held out for testing' },
      { value: '2', label: 'Channels used: SCG z-axis and GCG y-axis' },
    ],
    table: {
      caption: 'Subject-independent split of the 1,024-sample segments. From Table I of the paper.',
      columns: ['Volunteers', 'Segments'],
      rows: [
        { label: 'Training', cells: ['26', '6,214'] },
        { label: 'Test', cells: ['3', '1,503'] },
      ],
    },
  },
  {
    id: 'reconstruction',
    navLabel: 'ECG reconstruction',
    title: 'Reconstructing ECG with a deeply supervised SA-UNet',
    status: 'Model comparison',
    paragraphs: [
      'A 1D spatial-attention U-Net with deep supervision (DS-SA-UNet) mapped the two motion channels to ECG. Outputs from deeper decoder levels added weighted losses during training, and the model was trained with the Adam optimiser at a learning rate of 10⁻⁵ and a batch size of four for 100 epochs.',
      'On the held-out volunteers, reconstructed and reference ECG correlated at 81.76% on average, ahead of SA-MultiResUNet at 76.83% and Self-SA-UNet at 71.14%.',
    ],
    measures: [
      { value: '81.76%', label: 'Mean correlation with the reference ECG' },
      { value: '3', label: '1D segmentation models compared' },
    ],
    table: {
      caption: 'Correlation between reconstructed and reference ECG on the held-out volunteers, mean ± SD. From Table III of the paper.',
      columns: ['Pearson correlation (%)'],
      rows: [
        { label: 'DS-SA-UNet', cells: ['81.76 ± 16.94'] },
        { label: 'SA-MultiResUNet', cells: ['76.83 ± 15.83'] },
        { label: 'Self-SA-UNet', cells: ['71.14 ± 5.36'] },
      ],
    },
  },
  {
    id: 'heart-rate',
    navLabel: 'Heart rate and HRV',
    title: 'Recovering heart rate and its variability',
    status: 'Clinical evaluation',
    paragraphs: [
      'R-peaks were detected in the reconstructed and reference ECGs with the Christov algorithm, and mean heart rate and RMSSD were calculated for each of the 1,503 test segments.',
      'Heart rate from the reconstructed ECG correlated with the reference at 94.17%, compared with 58.57% from SCG alone and 71.92% from GCG alone. For heart rate variability, the correlation rose to 87.07% from 54.75% and 57.53%. For the best test volunteer, the heart rate and variability correlations reached 99.07% and 96.29%.',
    ],
    measures: [
      { value: '94.17%', label: 'Heart rate correlation' },
      { value: '87.07%', label: 'Heart rate variability correlation' },
    ],
    table: {
      caption: 'Correlation of cardiac measures with the reference ECG (%). From Table IV of the paper.',
      columns: ['SCG', 'GCG', 'Reconstructed ECG'],
      rows: [
        { label: 'Heart rate', cells: ['58.57', '71.92', '94.17'] },
        { label: 'Heart rate variability', cells: ['54.75', '57.53', '87.07'] },
      ],
    },
    figures: [
      {
        image: heartRate,
        alt: 'Scatter plot of mean heart rate from the reconstructed ECG against the ground-truth ECG, from about 45 to 115 beats per minute. Points lie tightly along the diagonal, with a few outliers near 50, 90 and 112 beats per minute. The title reports a correlation of 94.167%.',
        caption: 'Figure 9 from Tapotee et al. (2024). Mean heart rate from the reconstructed and ground-truth ECG for all segments of the held-out volunteers.',
        credit,
        licence: ccBy,
      },
    ],
  },
];
