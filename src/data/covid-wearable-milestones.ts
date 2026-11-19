import infectionPeriods from '../assets/research/presymptomatic-covid-wearables/infection-periods.png';
import trainingSequence from '../assets/research/presymptomatic-covid-wearables/training-sequence.png';
import embeddingEffect from '../assets/research/presymptomatic-covid-wearables/lstm-embedding-effect.png';
import { elsevier, sourceArticle } from './figure-credits';
import type { ResearchPhase, ResearchProject } from './research';

export const pcovNetDoi = '10.1016/j.compbiomed.2022.105682';
export const pcovNetPlusDoi = '10.1016/j.engappai.2023.106130';
const plusCredit = sourceArticle(pcovNetPlusDoi);
const plusLicence = elsevier(2023);

export const covidWearableVisual: NonNullable<ResearchProject['visual']> = {
  image: infectionPeriods,
  alt: 'Timeline from day −30 to day 30 around symptom onset at day 0, divided into four periods: baseline before day −20, non-infectious from day −20 to −10, infectious from day −7 to day 21, and recovery after day 21.',
  caption: 'Figure 3 from Abir et al. (2023). The four periods around symptom onset. Each person’s model learns from the baseline period, and heart rate in the infectious period is treated as anomalous.',
  credit: plusCredit,
  licence: plusLicence,
};

export const covidWearableProgress: ResearchPhase[] = [
  {
    id: 'pcovnet',
    navLabel: 'PCovNet',
    title: 'A personalised LSTM variational autoencoder',
    status: 'Computers in Biology and Medicine · 2022',
    paragraphs: [
      'Resting heart rate was derived from minute-level heart rate and step counts, keeping only minutes that followed 12 minutes without steps. It was then smoothed over 6 hours 40 minutes and resampled hourly to remove short-lived rises from daily activity.',
      'Each of 25 people with COVID-19 had a separate model, trained only on their own baseline more than 20 days before symptom onset. Seven time-series augmentations enlarged these small training sets. An LSTM variational autoencoder reconstructed 8-hour windows, and windows it could not reconstruct well were flagged as anomalous.',
      'Two thresholds traded precision against early warning. Using the largest training loss gave a precision of 0.946. A lower threshold, three standard deviations above the mean training loss, flagged 20 of the 25 people before their symptoms began and missed none.',
    ],
    measures: [
      { value: '25', label: 'People with COVID-19' },
      { value: '80%', label: 'Flagged before symptom onset (sensitive threshold)' },
      { value: '0.946', label: 'Precision (strict threshold)' },
    ],
    table: {
      caption: 'How each period around symptom onset was used.',
      columns: ['Days from symptom onset', 'Use in the study'],
      rows: [
        { label: 'Baseline', cells: ['Before day −20', 'Training data for each person’s model'] },
        { label: 'Non-infectious', cells: ['Day −20 to −10', 'Test data treated as normal'] },
        { label: 'Infectious', cells: ['Day −7 to 21', 'Test data treated as anomalous'] },
        { label: 'Recovery', cells: ['After day 21', 'Test data; heart rate can stay raised'] },
      ],
    },
  },
  {
    id: 'pcovnet-plus',
    navLabel: 'PCovNet+',
    title: 'Convolutional autoencoder with LSTM embeddings',
    status: 'Engineering Applications of Artificial Intelligence · 2023',
    paragraphs: [
      'PCovNet+ extended the evaluation to 68 people with COVID-19 by adding the second phase of the Stanford University study. A convolutional variational autoencoder encoded each window, and an LSTM network learned how these encodings change over time, so the decoder rebuilt each window from embeddings that carried its recent history.',
      'Many people had only a short baseline before infection, so both networks were first pre-trained on healthy participants and then fine-tuned on each person’s own baseline. The framework was also set out so that a model could keep updating as new smartwatch data arrive.',
      'Across the 68 people, PCovNet+ reached a precision of 0.993, a recall of 0.534 and an F1 score of 0.693, and flagged infection in 74% of them: 47% before symptom onset and 27% after. Adding the LSTM embeddings raised recall and F1 in both phases of the study.',
    ],
    measures: [
      { value: '68', label: 'People with COVID-19' },
      { value: '0.993', label: 'Precision' },
      { value: '47%', label: 'Flagged before symptom onset' },
    ],
    table: {
      caption: 'The two frameworks compared. From Table 3 of the PCovNet+ paper.',
      columns: ['People', 'Precision', 'Recall', 'F1 score', 'Before onset', 'After onset', 'Missed'],
      rows: [
        { label: 'PCovNet, strict threshold', cells: ['25', '0.946', '0.234', '0.375', '44%', '44%', '12%'] },
        { label: 'PCovNet, sensitive threshold', cells: ['25', '0.904', '0.274', '0.421', '80%', '20%', '0%'] },
        { label: 'PCovNet+', cells: ['68', '0.993', '0.534', '0.693', '47%', '27%', '26%'] },
      ],
    },
    figures: [
      {
        image: trainingSequence,
        alt: 'Four-step diagram. Step 1 trains a CNN encoder and decoder on heart-rate windows and sets a VAE threshold from the loss. Step 2 passes windows through the trained encoder to produce LSTM embeddings. Step 3 trains an LSTM network to predict the next embedding. Step 4 chains the trained encoder, LSTM and decoder and sets the final threshold from the reconstruction loss.',
        caption: 'Figure 7 from Abir et al. (2023). The PCovNet+ training sequence: the CNN-VAE, the LSTM embeddings and the combined threshold.',
        credit: plusCredit,
        licence: plusLicence,
      },
      {
        image: embeddingEffect,
        alt: 'Three stacked plots for one participant from January to early April. (a) Resting heart rate between about 53 and 62 beats per minute, with symptom onset on 6 March. (b) Reconstruction loss of the CNN-VAE alone: the only anomalies fall in late February outside the infectious period, giving precision and recall of 0. (c) Loss with LSTM embeddings: anomalies cover late February into the shaded infectious period, with precision 0.98 and recall 0.76.',
        caption: 'Figure 9 from Abir et al. (2023). For one participant, (a) resting heart rate and the anomalies found (b) without and (c) with LSTM embeddings. The shaded band marks the infectious period.',
        credit: plusCredit,
        licence: plusLicence,
      },
    ],
  },
];
