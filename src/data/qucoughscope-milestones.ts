import methodology from '../assets/research/qucoughscope-covid-audio/methodology.png';
import application from '../assets/research/qucoughscope-covid-audio/application.png';
import { ccBy, sourceArticle } from './figure-credits';
import type { ResearchPhase, ResearchProject } from './research';

export const quCoughScopeDoi = '10.3390/diagnostics12040920';
const credit = sourceArticle(quCoughScopeDoi);

export const quCoughScopeVisual: NonNullable<ResearchProject['visual']> = {
  image: methodology,
  alt: 'Two parallel pipelines, one for coughing and one for breathing, each for people with symptoms, without symptoms and healthy people. Sounds are converted to spectrograms, split into five folds and augmented, passed to three CNN base learners, and combined by a logistic regression meta-learner that outputs COVID-19 or healthy.',
  caption: 'Figure 1 from Rahman et al. (2022). The cough and breath pipelines: spectrogram conversion, five-fold splitting and augmentation, three CNN base learners and a logistic regression meta-learner.',
  credit,
  licence: ccBy,
};

export const quCoughScopeProgress: ResearchPhase[] = [
  {
    id: 'recordings',
    navLabel: 'Recordings',
    title: 'Combining public and crowdsourced recordings',
    status: 'Diagnostics · 2022',
    paragraphs: [
      'The University of Cambridge COVID-19 Sounds dataset, shared on request, provided cough and breath recordings from 582 healthy people and 141 people with COVID-19. The team added recordings collected anonymously through the QUCoughScope application from 245 healthy people and 96 with COVID-19.',
      'Participants reported their symptoms, so each group was divided into people with a cough and people without symptoms. This gave four experiments: cough or breath sounds, for people with or without symptoms.',
      'Each recording was converted into a spectrogram with the short-time Fourier transform. The spectrogram images were augmented and evaluated with five-fold cross-validation, using 80% for training and 20% for testing in each fold.',
    ],
    measures: [
      { value: '1,064', label: 'Participants across both datasets' },
      { value: '237', label: 'People with COVID-19' },
      { value: '4', label: 'Experiments by sound and symptom group' },
    ],
    table: {
      caption: 'Participants by dataset and group. From Table 1 of the paper.',
      columns: ['Healthy, with cough', 'Healthy, no symptoms', 'COVID-19, with cough', 'COVID-19, no symptoms'],
      rows: [
        { label: 'University of Cambridge', cells: ['264', '318', '54', '87'] },
        { label: 'QUCoughScope application', cells: ['32', '213', '18', '78'] },
      ],
    },
  },
  {
    id: 'stacking',
    navLabel: 'Stacking model',
    title: 'Stacking CNNs on sound spectrograms',
    status: 'Model development',
    paragraphs: [
      'Eight pretrained CNNs, including ResNet, DenseNet201, Inception-v3, MobileNetV2 and EfficientNet-B0 and B7, were trained on the spectrograms. For each experiment the three best became base learners, and a logistic regression meta-learner combined their predictions.',
      'The stacked model outperformed every single CNN. Cough sounds separated people with COVID-19 from healthy people more reliably than breath sounds: accuracy reached 96.5% for people with symptoms and 98.85% for those without, compared with 91.03% and 80.01% from breath.',
    ],
    measures: [
      { value: '98.85%', label: 'Accuracy from cough, no symptoms' },
      { value: '96.5%', label: 'Accuracy from cough, with symptoms' },
      { value: '8', label: 'CNNs compared as base learners' },
    ],
    table: {
      caption: 'Results of the stacked model, averaged over five folds (%). From the paper.',
      columns: ['Accuracy', 'Sensitivity', 'Specificity'],
      rows: [
        { label: 'Cough, with symptoms', cells: ['96.5', '96.42', '95.47'] },
        { label: 'Cough, no symptoms', cells: ['98.85', '97.01', '99.6'] },
        { label: 'Breath, with symptoms', cells: ['91.03', '88.9', '91.5'] },
        { label: 'Breath, no symptoms', cells: ['80.01', '72.04', '82.67'] },
      ],
    },
  },
  {
    id: 'application',
    navLabel: 'Application',
    title: 'Screening through a web and mobile application',
    status: 'Deployed prototype',
    paragraphs: [
      'The application, built with Flutter for the web, Android and iOS, asks for basic demographic details and symptoms, then records cough and breath sounds through the device microphone. Recordings are sent over HTTPS to a backend running on Google cloud computing, converted into spectrograms and classified by the pipeline that matches the reported symptoms.',
      'The screening result is returned to the user and stored in a cloud database. The same application collected the new recordings used in the study. As a next step, the team planned a check so that only cough and breath sounds would be accepted.',
    ],
    figures: [
      {
        image: application,
        alt: 'Diagram of the application. A smartphone running QUCoughScope records cough and breath sounds, shown as an audio waveform. Audio and symptoms travel over the internet to a data storage and AI server, which sends a screening result back to the phone.',
        caption: 'Figure 7 from Rahman et al. (2022). The QUCoughScope application: recordings and symptoms go to the AI server, which returns a screening result.',
        credit,
        licence: ccBy,
      },
    ],
  },
];
