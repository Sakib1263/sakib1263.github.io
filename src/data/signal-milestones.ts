import radarFramework from '../assets/research/contactless-cardiovascular-waveforms/abp-fig1-framework.png';
import radarNetwork from '../assets/research/contactless-cardiovascular-waveforms/abp-fig3-network.png';
import radarPressure from '../assets/research/contactless-cardiovascular-waveforms/abp-fig9-combined.png';
import radarEcg from '../assets/research/contactless-cardiovascular-waveforms/fig5-radar-ecg-rest.png';
import rppgReconstruction from '../assets/research/contactless-cardiovascular-waveforms/rppg-fig3-reconstruction.png';
import rppgHeartRate from '../assets/research/contactless-cardiovascular-waveforms/rppg-fig6-heart-rate.png';
import ttrFramework from '../assets/research/wearable-cardiac-waveforms/fig1-ttr-gan.png';
import ttrNetworks from '../assets/research/wearable-cardiac-waveforms/fig4-networks.png';
import ttrEntropy from '../assets/research/wearable-cardiac-waveforms/fig5-entropy.png';
import ttrPulseRate from '../assets/research/wearable-cardiac-waveforms/fig6ef-pulse-rate.png';
import ttrMultipass from '../assets/research/wearable-cardiac-waveforms/fig7-multipass-restoration.png';
import ttrExamples from '../assets/research/wearable-cardiac-waveforms/fig8-restoration-examples.png';
import { ccBy, elsevier, sourceArticle } from './figure-credits';
import type { ResearchPhase, ResearchProject } from './research';

/** Stage-by-stage content for the published physiological signal projects, taken from their papers. */

const rppgDoi = '10.1016/j.bspc.2023.105687';
const radarEcgDoi = '10.1016/j.compbiomed.2024.108555';
const radarPressureDoi = '10.1007/s00521-025-11327-x';
const ttrDoi = '10.1016/j.eswa.2024.123167';

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

export const ttrVisual: NonNullable<ResearchProject['visual']> = {
  image: ttrFramework,
  alt: 'Two-part framework diagram. In the first part, separate CycleGANs learn from good and bad wrist PPG and its first and second derivatives, then restore wrist signals over repeated passes. In the second part, a three-channel CycleGAN translates the restored wrist signals to finger PPG for heart rate and variability analysis.',
  caption: 'Figure 1 from Mahmud et al. (2024). TTR-GAN first restores wrist PPG and its derivatives (a), then translates the restored signals to finger PPG (b).',
  credit: sourceArticle(ttrDoi),
  licence: ccBy,
};

export const ttrProgress: ResearchPhase[] = [
  {
    id: 'wrist-restoration',
    navLabel: 'Stage 1: Restoration',
    title: 'Stage 1: blind restoration of wrist PPG',
    status: 'Unpaired 1D-CycleGANs',
    paragraphs: [
      'The study used MAUS, with about 12 hours 50 minutes of recordings from 22 healthy young adults. A wristwatch recorded wrist PPG while finger PPG and ECG were captured at the same time. Signals were resampled to 125 Hz and split into 512-sample segments. Wrist segments were sorted by hand into 1,876 good, 2,732 mediocre and 4,204 bad, and 164 unusable segments were removed.',
      'A corrupted wrist signal has no clean recording of the same moment, so the CycleGANs learned from unpaired good and bad examples, without being told the type of artefact. Separate restorers handled wrist PPG and its first and second derivatives (VPG and APG). Each generator was a nine-block residual network built from Super-ONN layers and tested with five-fold cross-validation on separate people.',
      'With no clean target to compare against, restoration was measured by the fall in signal entropy, a measure of irregularity. Outputs were passed through the generator up to five times. In most cases performance peaked around the third pass, so third-pass signals moved on to translation. Good-quality signals stayed almost unchanged.',
    ],
    measures: [
      { value: '0.40 → 0.25', label: 'Wrist PPG approximate entropy after three passes' },
      { value: '0.39 → 0.22', label: 'Wrist PPG sample entropy after three passes' },
      { value: '3', label: 'Restoration passes selected for translation' },
    ],
    table: {
      caption: 'Mean entropy before restoration and after the third pass, read from Figure 5 of Mahmud et al. (2024). Lower values indicate a more regular signal.',
      columns: ['Approximate entropy', 'Sample entropy', 'Fuzzy entropy'],
      rows: [
        { label: 'Wrist PPG', cells: ['0.40 → 0.25', '0.39 → 0.22', '0.13 → 0.12'] },
        { label: 'First derivative (VPG)', cells: ['0.39 → 0.22', '0.36 → 0.17', '0.18 → 0.16'] },
        { label: 'Second derivative (APG)', cells: ['0.48 → 0.37', '0.50 → 0.40', '0.27 → 0.25'] },
      ],
    },
    figures: [
      {
        image: ttrMultipass,
        alt: 'Two examples, each with rows for PPG, VPG and APG. From left to right, a noisy unrestored wrist signal becomes smoother over five restoration passes, and the reported approximate entropy falls.',
        caption: 'Figure 7 from Mahmud et al. (2024), cropped to examples a and b. Wrist PPG and its derivatives over five restoration passes.',
        credit: sourceArticle(ttrDoi),
        licence: ccBy,
      },
      {
        image: ttrEntropy,
        alt: 'Three line charts for wrist PPG, VPG and APG. Approximate, sample and fuzzy entropy are plotted from the unrestored signal through five passes. Approximate and sample entropy fall most at the first pass and then level off.',
        caption: 'Figure 5 from Mahmud et al. (2024). Mean entropy of (a) wrist PPG, (b) VPG and (c) APG before restoration and after each pass.',
        credit: sourceArticle(ttrDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'wrist-finger-translation',
    navLabel: 'Stage 2: Translation',
    title: 'Stage 2: translating restored wrist PPG to finger PPG',
    status: 'Three-channel 1D-CycleGAN',
    paragraphs: [
      'Even a clean wrist signal differs from finger PPG in shape and timing, and it carries less of the detail used in clinical analysis. The second CycleGAN therefore learned from 8,812 time-matched pairs of restored wrist and reference finger segments. Its Super-ONN UNet generator received restored wrist PPG, VPG and APG as three input channels.',
      'Ordinary correlation penalised the natural time shift between wrist and finger, so the study introduced PRTX, which combines temporal cross-correlation with signal power ratio. Translation raised PRTX from 0.5867 to 0.9455 against the reference finger PPG. Restoring the wrist signal first gave a better result than translating it directly, and using all three channels added a further gain.',
    ],
    measures: [
      { value: '0.9455', label: 'PRTX of translated finger PPG' },
      { value: '+35.88 points', label: 'PRTX gain over restored wrist PPG' },
    ],
    table: {
      caption: 'Five-fold cross-validated PRTX against reference finger PPG, from Table 1 of Mahmud et al. (2024). Higher is better.',
      columns: ['Single channel', 'Three channels'],
      rows: [
        { label: 'Restored wrist PPG, before translation', cells: ['0.5867', '0.5867'] },
        { label: 'Translated without restoration', cells: ['0.8953', '0.9212'] },
        { label: 'Translated after restoration', cells: ['0.9357', '0.9455'] },
      ],
    },
    figures: [
      {
        image: ttrExamples,
        alt: 'Three example rows. Each shows a noisy wrist PPG segment, the restored wrist PPG, and the translated finger PPG, next to the reference finger PPG and ECG recorded at the same time.',
        caption: 'Figure 8 from Mahmud et al. (2024), cropped to examples a–c. Unrestored wrist PPG, restored wrist PPG and translated finger PPG, beside the reference finger PPG and ECG.',
        credit: sourceArticle(ttrDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'ecg-validation',
    navLabel: 'ECG validation',
    title: 'Checking pulse rate and variability against ECG',
    status: 'Evaluation of the full pipeline',
    paragraphs: [
      'ECG was not used for training. It served only as an independent reference for heart rate and heart rate variability (SDNN). Each stage improved agreement with ECG: restoration gave a first gain and translation a larger one. Measured finger PPG remained the closest match, so the translated signal narrows the gap without replacing a finger sensor.',
    ],
    measures: [
      { value: '0.797 → 0.900', label: 'Pulse rate correlation with ECG heart rate' },
      { value: '0.699 → 0.846', label: 'Pulse rate variability correlation with ECG' },
    ],
    table: {
      caption: 'Pearson correlation with ECG-derived values for the three-channel pipeline, from Table 2 of Mahmud et al. (2024).',
      columns: ['Rate', 'Variability (SDNN)'],
      rows: [
        { label: 'Raw wrist PPG', cells: ['0.7968', '0.6991'] },
        { label: 'Restored wrist PPG', cells: ['0.8304', '0.7438'] },
        { label: 'Translated finger PPG', cells: ['0.9003', '0.8457'] },
        { label: 'Measured finger PPG', cells: ['0.9242', '0.9254'] },
      ],
    },
    figures: [
      {
        image: ttrPulseRate,
        alt: 'Two scatter plots of pulse rate from reference finger PPG. The left plot compares it with wrist PPG and includes outliers above 150 beats per minute, with a correlation of 0.87. The right plot compares it with translated finger PPG, with a correlation of 0.91.',
        caption: 'Figure 6e–f from Mahmud et al. (2024), with the two panels placed closer together. Pulse rate from reference finger PPG against (e) wrist PPG and (f) translated finger PPG.',
        credit: sourceArticle(ttrDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'network-comparison',
    navLabel: 'Network comparison',
    title: 'Comparing CNN, Self-ONN and Super-ONN generators',
    status: 'Performance and computational cost',
    paragraphs: [
      'The same restoration and translation pipeline was built with three neuron types. Super-ONN gave the largest gains but also needed the most parameters and the longest inference time, so a wearable design would have to weigh accuracy against cost.',
    ],
    table: {
      caption: 'Three-channel results from Table 4 of Mahmud et al. (2024). Gains are in percentage points. Parameters and inference time are given for one generator.',
      columns: ['PRTX gain', 'Rate gain', 'Variability gain', 'Restorer', 'Translator'],
      rows: [
        { label: 'CNN', cells: ['32.8', '9.6', '12.6', '0.240 M · 12.9 ms', '0.853 M · 6.61 ms'] },
        { label: 'Self-ONN', cells: ['33.7', '9.8', '12.9', '0.715 M · 18.2 ms', '2.176 M · 15.7 ms'] },
        { label: 'Super-ONN', cells: ['35.9', '10.4', '14.7', '1.048 M · 26.7 ms', '2.184 M · 23.0 ms'] },
      ],
    },
    figures: [
      {
        image: ttrNetworks,
        alt: 'Architecture diagrams of the restoration generator with nine residual blocks, the UNet translation generator built from Super-ONN layers, and the Self-ONN PatchGAN discriminator.',
        caption: 'Figure 4 from Mahmud et al. (2024). (a) Restoration generator, (b) translation generator and (c) discriminator.',
        credit: sourceArticle(ttrDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'af-detection',
    navLabel: 'AF detection',
    title: 'Follow-on study: atrial fibrillation detection',
    status: 'Biomedical Signal Processing and Control · 2025',
    paragraphs: [
      'A related study applied 1D-CycleGAN restoration to wrist PPG before classifying atrial fibrillation. Restoration raised classification accuracy by 2.94 and 5.08 percentage points in two test splits, and the Self-AFNet classifier reached 96.41% and 97.09%. This study used restoration without the finger PPG translation stage.',
    ],
  },
];
