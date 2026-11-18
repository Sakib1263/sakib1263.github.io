import nddForcePatterns from '../assets/research/gait-pattern-modelling/fig3-vgrf-patterns.png';
import nddNetwork from '../assets/research/gait-pattern-modelling/nddnet-fig4-network.png';
import nddConfusion from '../assets/research/gait-pattern-modelling/nddnet-fig5-confusion.png';
import taiChiGaitCycle from '../assets/research/gait-pattern-modelling/taichi-fig3-gait-cycle.png';
import taiChiPipeline from '../assets/research/gait-pattern-modelling/taichi-fig2-pipeline.png';
import taiChiRoc from '../assets/research/gait-pattern-modelling/taichi-fig7-roc.png';
import { elsevier, sourceArticle, springer } from './figure-credits';
import type { ResearchPhase, ResearchProject } from './research';

/** Stage-by-stage content for the gait analysis project, taken from its two papers. */

const taiChiDoi = '10.1016/j.compbiomed.2021.105184';
const nddNetDoi = '10.1007/s10489-023-04557-w';

export const gaitAnalysisVisual: NonNullable<ResearchProject['visual']> = {
  image: taiChiGaitCycle,
  alt: 'Diagram of one gait cycle, from initial contact through the stance and swing phases to terminal swing, above the matching footswitch signal with heel contact, flat-foot contact and toe contact regions.',
  caption: 'Figure 3 from Faisal et al. (2022). The phases of a gait cycle and the corresponding footswitch signal used to extract timing features.',
  credit: sourceArticle(taiChiDoi),
  licence: elsevier(2022),
};

export const gaitAnalysisProgress: ResearchPhase[] = [
  {
    id: 'tai-chi-gait',
    navLabel: 'Tai Chi gait',
    title: 'Distinguishing Tai Chi masters from trainees by gait',
    status: 'Computers in Biology and Medicine · 2022',
    paragraphs: [
      'The study used a public PhysioNet dataset of 27 Tai Chi masters with at least five years of training and 30 people who were new to Tai Chi. The second group was recorded before and after six months of training. Heel and toe footswitches captured ordinary walking and dual-task walking, in which participants also performed mental subtraction.',
      'Footswitch signals were split into gait cycles and converted to 15 timing and stride measures for each foot. These were scaled for BMI and sex, then summarised into 165 statistical features. After redundant features were removed, a hybrid method combined four feature rankings. Six classical classifiers were tuned and tested with five-fold cross-validation on separate people.',
      'The two groups were easiest to separate at the first visit, especially during ordinary walking. Accuracy was lower after six months, which the authors suggest may reflect the effect of training. The hybrid ranking gave higher accuracy than any single ranking method in all four settings.',
    ],
    measures: [
      { value: '88.17%', label: 'Accuracy, ordinary walking at the first visit' },
      { value: '93.10%', label: 'ROC AUC, ordinary walking at the first visit' },
      { value: '57', label: 'Participants' },
    ],
    table: {
      caption: 'Best classifier for each setting with subject-wise five-fold cross-validation, from Tables 3–6 of Faisal et al. (2022).',
      columns: ['Best classifier', 'Accuracy', 'ROC AUC'],
      rows: [
        { label: 'First visit, ordinary walking', cells: ['XGBoost', '88.17%', '93.10%'] },
        { label: 'First visit, dual task', cells: ['Random forest', '82.62%', '84.11%'] },
        { label: 'After 6 months, ordinary walking', cells: ['Random forest', '80.81%', '82.43%'] },
        { label: 'After 6 months, dual task', cells: ['Decision tree', '78.14%', '77.44%'] },
      ],
    },
    figures: [
      {
        image: taiChiPipeline,
        alt: 'Block diagram from raw heel and toe footswitch signals through gait-cycle segmentation, outlier removal, gait-parameter and statistical feature extraction, feature ranking and selection, to machine learning classification.',
        caption: 'Figure 2 from Faisal et al. (2022). The analysis pipeline from raw footswitch signals to classification.',
        credit: sourceArticle(taiChiDoi),
        licence: elsevier(2022),
      },
      {
        image: taiChiRoc,
        alt: 'Two ROC plots with one curve for each of five folds and a dashed mean curve. Mean AUC is 0.93 for ordinary walking with XGBoost and 0.84 for dual-task walking with random forest.',
        caption: 'Figure 7 from Faisal et al. (2022). ROC curves at the first visit for (a) ordinary walking and (b) dual-task walking.',
        credit: sourceArticle(taiChiDoi),
        licence: elsevier(2022),
      },
    ],
  },
  {
    id: 'nddnet',
    navLabel: 'NDDNet',
    title: 'Detecting neurodegenerative disease from gait with NDDNet',
    status: 'Applied Intelligence · 2023',
    paragraphs: [
      'The second study moved from training effects to disease. It used the PhysioNet Gait in Neurodegenerative Disease database, with force-sensor recordings from 16 healthy people, 13 with amyotrophic lateral sclerosis (ALS), 20 with Huntington’s disease and 15 with Parkinson’s disease, each walking for five minutes.',
      'Earlier studies mostly used either force signals or gait measures. NDDNet uses both. Vertical ground reaction force from each foot, with its two derivatives and integral, passes through eight 1D ConvMixer branches, while 15 gait features pass through dense layers. Each model was tested with leave-one-subject-out validation.',
      'Adding gait features raised accuracy in the four binary tasks by an average of 14 percentage points. In the ALS task, every participant was classified correctly. Separating all four groups at once was harder, particularly for Parkinson’s disease, where the F1 score was 0.60.',
    ],
    measures: [
      { value: '96.75%', label: 'Average accuracy across four binary tasks' },
      { value: '+14 points', label: 'Average gain from adding gait features' },
      { value: '239 KB', label: 'Model size' },
    ],
    table: {
      caption: 'Gait-cycle accuracy and participant-level errors with leave-one-subject-out validation, from Tables 1–2 and Figure 5 of Faisal et al. (2023).',
      columns: ['Force signals only', 'NDDNet', 'Participants misclassified'],
      rows: [
        { label: 'ALS vs healthy', cells: ['92%', '100%', '0 of 29'] },
        { label: 'Huntington’s vs healthy', cells: ['79%', '97%', '1 of 36'] },
        { label: 'Parkinson’s vs healthy', cells: ['81%', '94%', '1 of 31'] },
        { label: 'Any disease vs healthy', cells: ['78%', '96%', '2 of 64'] },
        { label: 'All four groups', cells: ['73%', '83%', '11 of 64'] },
      ],
    },
    figures: [
      {
        image: nddForcePatterns,
        alt: 'Four line plots of normalised force over a gait cycle for healthy controls and people with ALS, Huntington’s disease and Parkinson’s disease: the vertical ground reaction force, its first and second derivatives, and its integral. Shaded bands show the spread within each group.',
        caption: 'Figure 3 from Faisal et al. (2023). Vertical ground reaction force (a), its first (b) and second (c) derivatives, and its integral (d) for each group.',
        credit: sourceArticle(nddNetDoi),
        licence: springer(2023),
      },
      {
        image: nddNetwork,
        alt: 'Network diagram. Force signal channels pass through parallel ConvMixer branches, gait-cycle parameters pass through dense layers, and the two sets of features are concatenated before the output layer.',
        caption: 'Figure 4a from Faisal et al. (2023), cropped to the full network. Parallel paths process force signals and gait-cycle features.',
        credit: sourceArticle(nddNetDoi),
        licence: springer(2023),
      },
      {
        image: nddConfusion,
        alt: 'Five participant-level confusion matrices for healthy controls against ALS, Huntington’s disease, Parkinson’s disease and all disease groups combined, and for the four-class task.',
        caption: 'Figure 5 from Faisal et al. (2023). Participant-level confusion matrices, using a majority vote across each person’s gait cycles.',
        credit: sourceArticle(nddNetDoi),
        licence: springer(2023),
      },
    ],
  },
];
