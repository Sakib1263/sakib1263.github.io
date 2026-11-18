import hybridPipeline from '../assets/research/nabnet/fig1-pipeline.png';
import nabnetAgreement from '../assets/research/nabnet/fig5-map-agreement.png';
import nabnetWaveforms from '../assets/research/nabnet/fig7a-waveforms.png';
import nabnetNetwork from '../assets/research/nabnet/nabnet-fig2-network.png';
import ppg2abpPipeline from '../assets/research/nabnet/ppg2abp-fig1-pipeline.png';
import ppg2abpOutput from '../assets/research/nabnet/ppg2abp-fig4-output.png';
import shallowPipeline from '../assets/research/nabnet/shallow-fig4-pipeline.png';
import shallowRegression from '../assets/research/nabnet/shallow-fig7a-regression.png';
import { ccBy, elsevier, sourceArticle } from './figure-credits';
import type { ResearchPhase, ResearchProject } from './research';

/** Stage-by-stage content for the blood pressure project, taken from its three papers. */

const shallowDoi = '10.3390/s22030919';
const ppg2abpDoi = '10.3390/bioengineering9110692';
const nabnetDoi = '10.1016/j.bspc.2022.104247';

export const bloodPressureVisual: NonNullable<ResearchProject['visual']> = {
  image: hybridPipeline,
  alt: 'Flowchart. One to four input channels, drawn from PPG, its derivatives and ECG, train a 1D segmentation network that predicts a normalised arterial pressure waveform. Systolic and diastolic values from a separate prediction pipeline rescale the waveform before evaluation.',
  caption: 'Figure 1 from Mahmud et al. (2023). The combined pipeline uses a segmentation network for the waveform shape and predicted systolic and diastolic values to restore its scale.',
  credit: sourceArticle(nabnetDoi),
  licence: elsevier(2022),
};

export const bloodPressureProgress: ResearchPhase[] = [
  {
    id: 'pressure-prediction',
    navLabel: 'Pressure prediction',
    title: 'Predicting systolic and diastolic pressure with a shallow U-Net',
    status: 'Sensors · 2022',
    paragraphs: [
      'The study used the UCI cuffless blood pressure dataset, with 12,000 records from 942 intensive-care patients containing simultaneous PPG, ECG and arterial pressure. Signals were split into 8.192-second segments and distorted segments were removed. Three parts of the dataset formed the training data, and the fourth part provided 53,043 independent test segments.',
      'A U-Net learned to map PPG, its two derivatives and ECG to the arterial pressure waveform. Its bottleneck supplied 1,024 learned features to a multilayer perceptron, which predicted systolic and diastolic pressure. Performance fell as the encoder became deeper, so the final model used one level and about 0.55 million parameters.',
      'Using all four inputs gave the lowest error. PPG with its two derivatives performed close to PPG with ECG, suggesting a simpler setup without ECG electrodes. The model met the British Hypertension Society (BHS) Grade A and AAMI criteria on the test set, and it also kept low errors on an external dataset of 40 people.',
    ],
    measures: [
      { value: '2.333 mmHg', label: 'Systolic mean absolute error' },
      { value: '0.713 mmHg', label: 'Diastolic mean absolute error' },
      { value: 'Grade A', label: 'BHS grade for both pressures' },
    ],
    table: {
      caption: 'Mean absolute error in mmHg, from Table 6 and the external validation in Mahmud et al. (2022).',
      columns: ['Systolic', 'Diastolic'],
      rows: [
        { label: 'PPG only', cells: ['4.971', '1.361'] },
        { label: 'PPG and ECG', cells: ['2.513', '0.825'] },
        { label: 'PPG and two derivatives', cells: ['2.739', '0.960'] },
        { label: 'All four inputs', cells: ['2.333', '0.713'] },
        { label: 'External dataset of 40 people', cells: ['2.728', '1.166'] },
      ],
    },
    figures: [
      {
        image: shallowPipeline,
        alt: 'Pipeline diagram. One to four input channels train a shallow U-Net autoencoder. Features from its dense bottleneck train a machine learning regressor that predicts systolic and diastolic pressure for evaluation.',
        caption: 'Figure 4 from Mahmud et al. (2022). Features learned by a shallow U-Net are passed to a regressor that predicts blood pressure.',
        credit: sourceArticle(shallowDoi),
        licence: ccBy,
      },
      {
        image: shallowRegression,
        alt: 'Two regression plots of estimated against target pressure. Diastolic and systolic points both lie in a narrow band along the identity line.',
        caption: 'Figure 7a from Mahmud et al. (2022). Predicted against measured diastolic (left) and systolic (right) pressure.',
        credit: sourceArticle(shallowDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'ppg-waveform',
    navLabel: 'PPG to waveform',
    title: 'Translating PPG alone into arterial pressure waveforms',
    status: 'Bioengineering · 2022',
    paragraphs: [
      'PPG2ABP reconstructs the continuous arterial pressure waveform from PPG without ECG. A deeply supervised 1D U-Net first approximates the waveform, and a 1D MultiResUNet then refines it. Systolic, diastolic and mean pressure are read directly from the reconstructed signal, so the network is not trained on those values separately.',
      'The model was evaluated on 127,260 segments from the UCI data, with an independent test part and lower-quality PPG kept in the data. Diastolic and mean pressure met BHS Grade A and the AAMI criteria. Systolic pressure reached Grade B, and its error spread was above the AAMI limit.',
    ],
    measures: [
      { value: '4.604 mmHg', label: 'Waveform mean absolute error' },
      { value: '2.310 mmHg', label: 'Mean arterial pressure error' },
      { value: 'PPG only', label: 'Input signal' },
    ],
    table: {
      caption: 'Pressure values derived from the reconstructed waveform, from Tables 2 and 3 of Ibtehaz et al. (2022).',
      columns: ['Mean absolute error', 'Within 5 / 10 / 15 mmHg', 'BHS grade', 'AAMI'],
      rows: [
        { label: 'Diastolic', cells: ['3.449 mmHg', '82.8% / 92.2% / 95.7%', 'A', 'Met'] },
        { label: 'Mean arterial', cells: ['2.310 mmHg', '87.4% / 95.2% / 97.7%', 'A', 'Met'] },
        { label: 'Systolic', cells: ['5.727 mmHg', '70.8% / 85.3% / 90.9%', 'B', 'Not met'] },
      ],
    },
    figures: [
      {
        image: ppg2abpPipeline,
        alt: 'Four-step diagram: input PPG signal, preprocessed PPG signal, approximate arterial pressure waveform and refined arterial pressure waveform.',
        caption: 'Figure 1 from Ibtehaz et al. (2022). The two-stage PPG2ABP pipeline.',
        credit: sourceArticle(ppg2abpDoi),
        licence: ccBy,
      },
      {
        image: ppg2abpOutput,
        alt: 'Five stacked plots over about eight seconds: input PPG, the approximate network output, the refinement network output, the measured arterial pressure, and an overlay showing the refined waveform closer to the measured signal.',
        caption: 'Figure 4 from Ibtehaz et al. (2022). An example of the input PPG, both network outputs and the measured arterial pressure.',
        credit: sourceArticle(ppg2abpDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'hybrid-waveform',
    navLabel: 'Hybrid reconstruction',
    title: 'Combining pressure prediction with waveform reconstruction',
    status: 'Biomedical Signal Processing and Control · 2023',
    paragraphs: [
      'Segmentation networks learn waveform shape best from normalised signals, but normalisation removes absolute pressure. This study separated the two tasks. The shallow U-Net pipeline predicted systolic and diastolic pressure, a new network estimated the normalised waveform, and a linear transformation restored its scale.',
      'NABNet extends UNet++ with attention-guided bidirectional ConvLSTM blocks in its skip connections, which help it handle timing shifts between PPG, ECG and arterial pressure. It was evaluated with four-fold cross-validation on 191,198 segments, or about 435 hours of signals, against ten other segmentation networks.',
      'The final waveforms kept the prediction accuracy of the first stage, with about 92% of systolic and 99% of diastolic values within 5 mmHg. Compared with PPG2ABP, the pipeline reduced systolic and diastolic error and gave a similar mean pressure error, although it also used ECG.',
    ],
    measures: [
      { value: '2.63 mmHg', label: 'Systolic mean absolute error' },
      { value: '1.09 mmHg', label: 'Diastolic mean absolute error' },
      { value: '2.37 mmHg', label: 'Mean arterial pressure error' },
    ],
    table: {
      caption: 'Selected segmentation networks from Table 3 of Mahmud et al. (2023). Lower waveform error and a higher share within 5 mmHg are better.',
      columns: ['Final waveform error', 'Mean pressure within 5 mmHg'],
      rows: [
        { label: 'NABNet', cells: ['4.778', '87.58%'] },
        { label: 'Attention UNet', cells: ['4.784', '86.46%'] },
        { label: 'BCDUNet', cells: ['4.804', '86.83%'] },
        { label: 'UNet++', cells: ['4.826', '85.71%'] },
        { label: 'UNet', cells: ['4.930', '85.01%'] },
      ],
    },
    figures: [
      {
        image: nabnetNetwork,
        alt: 'Nested network diagram with encoder, middle and decoder nodes linked by attention-guided LSTM blocks, direct skip connections and deep supervision outputs.',
        caption: 'Figure 2 from Mahmud et al. (2023). The NABNet architecture.',
        credit: sourceArticle(nabnetDoi),
        licence: elsevier(2022),
      },
      {
        image: nabnetWaveforms,
        alt: 'Three stacked signals over about 1,000 samples: a normalised PPG, a normalised ECG, and arterial blood pressure between about 75 and 115 mmHg. The estimated pressure waveform closely follows the measured one.',
        caption: 'Figure 7a from Mahmud et al. (2023), cropped to one example. The estimated arterial pressure waveform (red) and measured waveform (blue), with the PPG and ECG inputs above.',
        credit: sourceArticle(nabnetDoi),
        licence: elsevier(2022),
      },
      {
        image: nabnetAgreement,
        alt: 'Left: scatter plot of estimated against measured mean arterial pressure from about 60 to 140 mmHg, clustered along the identity line. Right: Bland–Altman plot with most differences in a narrow band around zero.',
        caption: 'Figure 5 from Mahmud et al. (2023). (a) Regression and (b) Bland–Altman plots for mean arterial pressure.',
        credit: sourceArticle(nabnetDoi),
        licence: elsevier(2022),
      },
    ],
  },
];
