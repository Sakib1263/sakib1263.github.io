import radarFramework from '../assets/research/contactless-cardiovascular-waveforms/abp-fig1-framework.png';
import radarNetwork from '../assets/research/contactless-cardiovascular-waveforms/abp-fig3-network.png';
import radarPressure from '../assets/research/contactless-cardiovascular-waveforms/abp-fig9-combined.png';
import radarEcg from '../assets/research/contactless-cardiovascular-waveforms/fig5-radar-ecg-rest.png';
import rppgReconstruction from '../assets/research/contactless-cardiovascular-waveforms/rppg-fig3-reconstruction.png';
import rppgHeartRate from '../assets/research/contactless-cardiovascular-waveforms/rppg-fig6-heart-rate.png';
import { ccBy, elsevier, sourceArticle } from './figure-credits';
import type { ResearchPhase, ResearchProject } from './research';

/** Stage-by-stage content for the published physiological signal projects, taken from their papers. */

const rppgDoi = '10.1016/j.bspc.2023.105687';
const radarEcgDoi = '10.1016/j.compbiomed.2024.108555';
const radarPressureDoi = '10.1007/s00521-025-11327-x';

export const contactlessVisual: NonNullable<ResearchProject['visual']> = {
  image: radarFramework,
  alt: 'Two-part diagram. On the left, a person lies on a tilt table beneath a 24 GHz six-port radar while a Task Force Monitor records reference signals. On the right, radar and arterial pressure signals are resampled, segmented, filtered, baseline-corrected and normalised, split into training, validation and test sets, and passed to a one-dimensional segmentation network that outputs arterial blood pressure.',
  caption: 'Figure 1 from F.A. Chowdhury et al. (2025). The radar recording setup and the processing pipeline used to reconstruct arterial pressure waveforms from raw radar signals.',
  credit: sourceArticle(radarPressureDoi),
  licence: ccBy,
};

export const contactlessProgress: ResearchPhase[] = [
  {
    id: 'facial-video-pulse',
    navLabel: 'Facial video pulse',
    title: 'Recovering the pulse waveform from facial video',
    status: 'Biomedical Signal Processing and Control · 2024 (online 2023)',
    paragraphs: [
      'Remote photoplethysmography (rPPG) reads the slight skin-colour changes caused by blood flow. It could stand in for a finger sensor when contact is unsuitable, for example with burns, premature babies or sensitive skin. Most earlier studies reported only heart rate. This one also measured how closely the recovered waveform matched a finger sensor.',
      'The study used UBFC-RPPG, with one-minute webcam videos of 42 people playing a timed maths game and a finger pulse oximeter as the reference. Faces were detected, skin was segmented and the Local Group Invariance (LGI) method produced an initial pulse signal. LGI-rPPG-Net, a shallow encoder–decoder, then refined it. Training, validation and test sets contained 26, 8 and 8 different people.',
      'Three levels, 128 starting filters and a kernel size of 7 gave the best result, and a deeper network performed worse. Reconstruction reduced the waveform error from 0.492 for the LGI input to 0.148. LGI was also the strongest input, ahead of CHROM (correlation 0.801), POS (0.759) and the green channel alone (0.711). Performance fell on PURE, an independent dataset the model had not seen.',
    ],
    measures: [
      { value: '0.862', label: 'Waveform correlation with finger PPG' },
      { value: '0.984', label: 'Heart-rate correlation' },
      { value: '1.51 bpm', label: 'Heart-rate mean absolute error' },
    ],
    table: {
      caption: 'Test results on UBFC-RPPG and external validation on four PURE recording conditions, from M.H. Chowdhury et al. (2024).',
      columns: ['UBFC-RPPG test set', 'PURE external test'],
      rows: [
        { label: 'Waveform correlation', cells: ['0.862', '0.70'] },
        { label: 'Waveform RMSE', cells: ['0.148', '0.202'] },
        { label: 'Dynamic time warping distance', cells: ['0.699', '0.901'] },
        { label: 'Heart-rate correlation', cells: ['0.984', '0.77'] },
        { label: 'Heart-rate RMSE', cells: ['2.91 bpm', '16.36 bpm'] },
        { label: 'Heart-rate mean absolute error', cells: ['1.51 bpm', '8.83 bpm'] },
      ],
    },
    figures: [
      {
        image: rppgReconstruction,
        alt: 'Two plots over about four seconds. In the upper plot the reconstructed rPPG closely follows the finger PPG peaks. In the lower plot the LGI input is visibly out of step with the finger PPG.',
        caption: 'Figure 3 from M.H. Chowdhury et al. (2024). One of the best reconstructions, with a correlation of 0.968: (a) estimated rPPG over finger PPG, and (b) the LGI input over finger PPG.',
        credit: sourceArticle(rppgDoi),
        licence: elsevier(2023),
      },
      {
        image: rppgHeartRate,
        alt: 'Scatter plot of estimated heart rate against reference heart rate from about 60 to 135 beats per minute. The points and fitted trend line lie close to the ideal diagonal.',
        caption: 'Figure 6 from M.H. Chowdhury et al. (2024). Heart rate estimated from rPPG against heart rate from the finger sensor.',
        credit: sourceArticle(rppgDoi),
        licence: elsevier(2023),
      },
    ],
  },
  {
    id: 'radar-ecg',
    navLabel: 'Radar ECG',
    title: 'Generating ECG waveforms from radar',
    status: 'Computers in Biology and Medicine · 2024',
    paragraphs: [
      'Radar can sense small chest movements from a distance, but earlier Doppler methods mainly estimated heart rate or beat intervals. They did not recover the P wave, QRS complex and T wave that make up an ECG. This study used a public dataset from a 24 GHz six-port radar with synchronised clinical ECG, recorded from healthy adults at rest (30 people), during the Valsalva manoeuvre (27) and during apnoea (24).',
      'MultiResLinkNet builds on LinkNet, with multiresolution blocks, residual paths between encoder and decoder, and deep supervision. It took a single radar channel derived from the in-phase and quadrature signals. FPN, UNet and LinkNet of matched size served as comparisons, with five-fold cross-validation on separate people, for each condition and for all three combined.',
      'MultiResLinkNet had the highest spectral correlation in every setting, and the highest temporal correlation except during apnoea. FPN had the lowest absolute and squared error on the combined data. Mean heart rate from the generated ECG was within 2 beats per minute of the reference in each condition. Beat-to-beat variability was less faithful, with RMSSD about 1.8 to 2.4 times the reference value.',
    ],
    measures: [
      { value: '79.96%', label: 'Spectral correlation, three conditions combined' },
      { value: '61.86%', label: 'Temporal correlation, three conditions combined' },
      { value: '0.939', label: 'R-peak detection F1 score, combined' },
    ],
    table: {
      caption: 'MultiResLinkNet results from F.A. Chowdhury et al. (2024). The comparison column gives the highest value reached by FPN, UNet or LinkNet for each measure.',
      columns: ['Temporal correlation', 'Spectral correlation', 'Best other network (temporal / spectral)', 'R-peak F1'],
      rows: [
        { label: 'Rest', cells: ['66.10%', '82.44%', '64.35% / 74.68%', '0.955'] },
        { label: 'Valsalva', cells: ['60.14%', '77.05%', '58.38% / 68.79%', '0.944'] },
        { label: 'Apnoea', cells: ['55.33%', '74.66%', '56.22% / 70.35%', '0.888'] },
        { label: 'All three combined', cells: ['61.86%', '79.96%', '59.63% / 70.91%', '0.939'] },
      ],
    },
    figures: [
      {
        image: radarEcg,
        alt: 'Five stacked traces at rest: the radar signal, followed by the reference ECG in green and the ECG predicted by FPN, U-Net, LinkNet and MultiResLinkNet in red. The predicted R-peaks line up with the reference beats.',
        caption: 'Figure 5 from F.A. Chowdhury et al. (2024). ECG generated from radar at rest by (b) FPN, (c) UNet, (d) LinkNet and (e) MultiResLinkNet, compared with the reference ECG.',
        credit: sourceArticle(radarEcgDoi),
        licence: elsevier(2024),
      },
    ],
  },
  {
    id: 'radar-arterial-pressure',
    navLabel: 'Radar arterial pressure',
    title: 'Reconstructing arterial pressure waveforms from raw radar',
    status: 'Neural Computing and Applications · 2025',
    paragraphs: [
      'Cuffs give intermittent readings, and continuous clinical monitoring usually relies on an arterial catheter. This study returned to the same radar dataset and added tilt-up and tilt-down to rest, Valsalva and apnoea. Raw in-phase and quadrature signals went directly into a two-channel network, with continuous arterial pressure from a Task Force Monitor as the reference.',
      'Signals were resampled to 125 Hz and split into 1,024-sample segments. MultiResLinkNet was again compared with FPN, UNet and LinkNet using five-fold cross-validation on separate people. It led on every measure at rest, during Valsalva and during tilt-up, and had the highest correlations when all five conditions were combined. UNet and LinkNet were stronger during apnoea and had slightly higher correlations during tilt-down.',
      'Agreement was much higher than for radar ECG from the same dataset, at 90.09% against 66.10% temporal correlation at rest. The two studies used different radar inputs and did not test the reason directly. The output is a normalised waveform, so it describes the shape of the pressure pulse and not systolic or diastolic values in mmHg.',
    ],
    measures: [
      { value: '85.05%', label: 'Temporal correlation, five conditions combined' },
      { value: '93.99%', label: 'Spectral correlation, five conditions combined' },
      { value: '90.09%', label: 'Temporal correlation at rest' },
    ],
    table: {
      caption: 'MultiResLinkNet results from F.A. Chowdhury et al. (2025). The comparison column gives the highest value reached by FPN, UNet or LinkNet for each measure.',
      columns: ['Temporal correlation', 'Spectral correlation', 'Best other network (temporal / spectral)'],
      rows: [
        { label: 'Rest', cells: ['90.09%', '96.61%', '89.18% / 96.25%'] },
        { label: 'Valsalva', cells: ['86.20%', '94.09%', '84.31% / 93.27%'] },
        { label: 'Apnoea', cells: ['71.99%', '86.58%', '79.35% / 91.32%'] },
        { label: 'Tilt-up', cells: ['71.74%', '87.35%', '70.78% / 86.49%'] },
        { label: 'Tilt-down', cells: ['86.32%', '94.48%', '86.76% / 94.88%'] },
        { label: 'All five combined', cells: ['85.05%', '93.99%', '84.82% / 93.91%'] },
      ],
    },
    figures: [
      {
        image: radarNetwork,
        alt: 'Architecture diagram of MultiResLinkNet. Two radar input channels pass through an encoder and decoder joined by residual paths, with arterial pressure outputs at several decoder levels. Enlarged panels show the multi-residual block and the residual path.',
        caption: 'Figure 3 from F.A. Chowdhury et al. (2025). (a) MultiResLinkNet, (b) the multi-residual block and (c) the residual path.',
        credit: sourceArticle(radarPressureDoi),
        licence: ccBy,
      },
      {
        image: radarPressure,
        alt: 'Five stacked plots over 1,024 samples: the radar in-phase and quadrature signals, then reference and predicted arterial pressure waveforms for FPN, UNet, LinkNet and MultiResLinkNet. The predicted pulses closely follow the reference.',
        caption: 'Figure 9 from F.A. Chowdhury et al. (2025). An example from the combined data: (a) radar signals, then reference and predicted pressure from (b) FPN, (c) UNet, (d) LinkNet and (e) MultiResLinkNet.',
        credit: sourceArticle(radarPressureDoi),
        licence: ccBy,
      },
    ],
  },
];
