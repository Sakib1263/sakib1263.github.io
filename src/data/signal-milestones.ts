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
import quGmArchitecture from '../assets/research/multimodal-glucose-estimation/fig1-architecture.png';
import quGmDevice from '../assets/research/multimodal-glucose-estimation/fig2-device.png';
import quGmPipeline from '../assets/research/multimodal-glucose-estimation/fig3-ml-pipeline.png';
import quGmApp from '../assets/research/multimodal-glucose-estimation/fig7-mobile-app.png';
import quGmRegression from '../assets/research/multimodal-glucose-estimation/fig9-regression.png';
import quGmClarke from '../assets/research/multimodal-glucose-estimation/fig11-clarke-grid.png';
import quGmFeatures from '../assets/research/multimodal-glucose-estimation/fig12-severity-features.png';
import mriNetwork from '../assets/research/ecg-restoration-during-mri/fig4-mhd2ecgnet.png';
import mriFramework from '../assets/research/ecg-restoration-during-mri/fig2-framework.png';
import mriQrsExamples from '../assets/research/ecg-restoration-during-mri/fig5-qrs-examples.png';
import mriSpectra from '../assets/research/ecg-restoration-during-mri/fig6-psd.png';
import mriGanExamples from '../assets/research/ecg-restoration-during-mri/fig7-mhdgan-examples.png';
import mriGeneralExamples from '../assets/research/ecg-restoration-during-mri/fig10-mhd2ecgnet-examples.png';
import mriHeartRate from '../assets/research/ecg-restoration-during-mri/fig12-heart-rate.png';
import mriPeakNetwork from '../assets/research/ecg-restoration-during-mri/sa-mhdnet-fig5-network.png';
import fetalPipeline from '../assets/research/fetal-ecg-extraction/fig1-pipeline.png';
import fetalLinkNet from '../assets/research/fetal-ecg-extraction/fig4-linknet.png';
import fetalPeaks from '../assets/research/fetal-ecg-extraction/fig6-r-peaks.png';
import fetalHeartRate from '../assets/research/fetal-ecg-extraction/fig7a-heart-rate.png';
import fetalGenerator from '../assets/research/fetal-ecg-extraction/cyclegan-fig8b-generator.png';
import fetalCycleExample from '../assets/research/fetal-ecg-extraction/cyclegan-fig9c-example.png';
import fetalCyclePeaks from '../assets/research/fetal-ecg-extraction/cyclegan-fig10a-r-peaks.png';
import eegMlmrsFramework from '../assets/research/eeg-artefact-restoration/mlmrs-fig1-framework.png';
import eegMlmrsNetwork from '../assets/research/eeg-artefact-restoration/mlmrs-fig2-network.png';
import eegMlmrsExamples from '../assets/research/eeg-artefact-restoration/mlmrs-fig7-examples.png';
import eegCycleFramework from '../assets/research/eeg-artefact-restoration/fig3-ago-cyclegan.png';
import eegCycleBlocks from '../assets/research/eeg-artefact-restoration/fig4-building-blocks.png';
import eegCycleExamples from '../assets/research/eeg-artefact-restoration/fig5-restored-examples.png';
import eegSpectra from '../assets/research/eeg-artefact-restoration/fig6-psd.png';
import eegTopography from '../assets/research/eeg-artefact-restoration/fig7-topographic-maps.png';
import dopplerOverview from '../assets/research/qscare-doppler-flow/fig2-overview.png';
import dopplerQuality from '../assets/research/qscare-doppler-flow/fig3-signal-quality.png';
import dopplerCycleGan from '../assets/research/qscare-doppler-flow/fig5-cyclegan.png';
import dopplerRestored from '../assets/research/qscare-doppler-flow/fig7-restored-waveforms.png';
import dopplerTwoStream from '../assets/research/qscare-doppler-flow/fig9-dopplernet2-plus.png';
import dopplerPerformance from '../assets/research/qscare-doppler-flow/fig12-performance.png';
import dopplerAttentionNetwork from '../assets/research/qscare-doppler-flow/diagnostics-fig6-attention-network.png';
import dopplerAttentionPerformance from '../assets/research/qscare-doppler-flow/diagnostics-fig9-performance.png';
import { ccBy, elsevier, sourceArticle } from './figure-credits';
import type { ResearchPhase, ResearchProject } from './research';

/** Stage-by-stage content for the published physiological signal projects, taken from their papers. */

const rppgDoi = '10.1016/j.bspc.2023.105687';
const radarEcgDoi = '10.1016/j.compbiomed.2024.108555';
const radarPressureDoi = '10.1007/s00521-025-11327-x';
const ttrDoi = '10.1016/j.eswa.2024.123167';
const quGmDoi = '10.1109/access.2024.3404971';
const mriRestorationDoi = '10.1016/j.engappai.2024.108483';
const mriPeakDoi = '10.3390/bioengineering10050542';
const fetalLinkNetDoi = '10.1016/j.engappai.2023.106414';
const fetalCyclePreprint = '10.48550/arXiv.2310.03759';
const eegMlmrsDoi = '10.1007/s00521-022-08111-6';
const eegCycleDoi = '10.1016/j.engappai.2023.107514';
const dopplerTwoStreamDoi = '10.1016/j.bspc.2023.104882';
const dopplerAttentionDoi = '10.3390/diagnostics13122000';

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
      'The atrial fibrillation study applied 1D-CycleGAN restoration to wrist PPG before classifying atrial fibrillation. Restoration raised classification accuracy by 2.94 and 5.08 percentage points in two test splits, and the Self-AFNet classifier reached 96.41% and 97.09%. This study used restoration without the finger PPG translation stage.',
    ],
  },
];

export const quGmVisual: NonNullable<ResearchProject['visual']> = {
  image: quGmArchitecture,
  alt: 'Two-part diagram. The conventional method uses a lancet prick, a blood sample and a glucometer. The proposed method sends wrist PPG from a sensor and TinyPICO board over Bluetooth to an Android application, which exchanges data with machine learning models on Amazon Web Services.',
  caption: 'Figure 1 from Shuzan et al. (2024). (a) Conventional finger-prick measurement and (b) the proposed QU-GM system.',
  credit: sourceArticle(quGmDoi),
  licence: ccBy,
};

export const quGmProgress: ResearchPhase[] = [
  {
    id: 'wearable-system',
    navLabel: 'Wearable system',
    title: 'Building the wristband and connected system',
    status: 'Hardware, mobile application and cloud',
    paragraphs: [
      'The wristband measures about 30 × 42 mm and combines a 609 nm pulse sensor, a TinyPICO ESP32 microcontroller and a 250 mAh battery that can last up to 24 hours. It samples PPG at 125 Hz and streams the signal to an Android application over Bluetooth.',
      'The application combines PPG with blood pressure and demographic details, then sends the data to models hosted on Amazon Web Services. Estimated glucose and severity return to the phone every 10 seconds, and the design includes alerts for abnormal values.',
    ],
    measures: [
      { value: '30 × 42 mm', label: 'Wristband size' },
      { value: '125 Hz', label: 'PPG sampling rate' },
      { value: '10 s', label: 'Result update interval' },
    ],
    figures: [
      {
        image: quGmDevice,
        alt: 'Circuit diagrams of the device in work and charging modes, an exploded model of the wristband enclosure, and photographs of the finished device worn on the wrist.',
        caption: 'Figure 2 from Shuzan et al. (2024). The prototype in (a) work and (b) charging modes, (c) its enclosure model and (d) the device worn on the wrist.',
        credit: sourceArticle(quGmDoi),
        licence: ccBy,
      },
      {
        image: quGmApp,
        alt: 'Three Android application screens: selecting the paired PPG sensor, entering demographic information while PPG is displayed, and viewing the glucose estimate with blood pressure fields.',
        caption: 'Figure 7 from Shuzan et al. (2024). The Android application for connecting the device, entering user details and viewing the glucose estimate.',
        credit: sourceArticle(quGmDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'clinical-data',
    navLabel: 'Clinical data',
    title: 'Collecting clinical data and engineering features',
    status: 'Qatar Diabetic Society · 139 participants',
    paragraphs: [
      'Three minutes of resting wrist PPG were recorded from each of 139 participants, with finger-prick glucose from an Accu-Chek meter and blood pressure and heart rate from an Omron monitor. The study had ethical approval from Hamad Medical Corporation, and all participants gave written informed consent.',
      'Signals were filtered, cleaned with variational mode decomposition and divided into 4.096-second segments. The pipeline extracted 139 time-domain, statistical, Mel-frequency cepstral, demographic and clinical features. Removing highly correlated features left 78 for model selection.',
    ],
    table: {
      caption: 'Participant summary from Table 1 of Shuzan et al. (2024). Ranges are shown with the median in brackets.',
      columns: ['Value'],
      rows: [
        { label: 'Participants', cells: ['139'] },
        { label: 'With diabetes', cells: ['49.65%'] },
        { label: 'Female', cells: ['41.84%'] },
        { label: 'Age', cells: ['13–87 years (43)'] },
        { label: 'Body mass index', cells: ['16.61–45.99 kg/m² (26.67)'] },
        { label: 'Blood glucose', cells: ['66–600 mg/dL (118)'] },
      ],
    },
    figures: [
      {
        image: quGmPipeline,
        alt: 'Flow diagram. Raw data passes through preprocessing and feature ranking into training, validation and test sets to select the best model. New data from the device follows the same feature steps to produce glucose and severity predictions.',
        caption: 'Figure 3 from Shuzan et al. (2024). Model development and validation for glucose prediction and severity classification.',
        credit: sourceArticle(quGmDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'glucose-estimation',
    navLabel: 'Glucose estimation',
    title: 'Estimating blood glucose on unseen participants',
    status: 'Regression with separate test participants',
    paragraphs: [
      'Participants were divided into separate training, validation and test groups in a 60:20:20 ratio. Three feature selection methods were compared with Gaussian process regression, decision trees and bagged ensemble trees. Bagged ensemble trees with 44 features selected by minimum redundancy maximum relevance gave the best result.',
      'Demographic and clinical variables ranked among the most important features, alongside PPG-derived measures. On the Clarke Error Grid, 61.88% of predictions fell in zone A and 38.12% in zone B, with none in zones C, D or E.',
    ],
    measures: [
      { value: '0.90', label: 'Correlation with measured glucose' },
      { value: '22.90 mg/dL', label: 'Mean absolute error' },
      { value: '100%', label: 'Predictions in Clarke zones A and B' },
    ],
    table: {
      caption: 'Selected regression results from Table 3 of Shuzan et al. (2024).',
      columns: ['Features', 'Correlation', 'Mean absolute error', 'RMSE'],
      rows: [
        { label: 'Bagged trees with MRMR', cells: ['44', '0.90', '22.90 mg/dL', '30.74 mg/dL'] },
        { label: 'Bagged trees with ReliefF', cells: ['52', '0.88', '24.34 mg/dL', '32.15 mg/dL'] },
        { label: 'Bagged trees with CFS', cells: ['53', '0.87', '23.70 mg/dL', '32.56 mg/dL'] },
        { label: 'Gaussian process with ReliefF', cells: ['48', '0.81', '30.11 mg/dL', '40.77 mg/dL'] },
        { label: 'Decision tree with MRMR', cells: ['56', '0.76', '35.73 mg/dL', '49.44 mg/dL'] },
      ],
    },
    figures: [
      {
        image: quGmRegression,
        alt: 'Scatter plot of estimated against measured glucose from about 90 to 350 mg/dL, with the fitted trend line close to the ideal diagonal.',
        caption: 'Figure 9 from Shuzan et al. (2024). Estimated against measured blood glucose.',
        credit: sourceArticle(quGmDoi),
        licence: ccBy,
      },
      {
        image: quGmClarke,
        alt: 'Clarke Error Grid plotting predicted against reference glucose. All points lie within zones A and B.',
        caption: 'Figure 11 from Shuzan et al. (2024). Clarke Error Grid analysis of the glucose estimates.',
        credit: sourceArticle(quGmDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'severity-classification',
    navLabel: 'Severity classification',
    title: 'Classifying glucose severity',
    status: 'Three-class classification',
    paragraphs: [
      'A second model placed each sample into normal, warning or dangerous groups using measured glucose ranges. K-nearest neighbours, support vector machines and decision trees were compared with stratified five-fold cross-validation on 12,399 samples. K-nearest neighbours with 17 selected features performed best, using time-domain, statistical, Mel-frequency and demographic information.',
    ],
    measures: [
      { value: '98.12%', label: 'Accuracy' },
      { value: '98.12%', label: 'F1 score' },
      { value: '0.998', label: 'ROC AUC' },
    ],
    table: {
      caption: 'Severity groups from Table 2 of Shuzan et al. (2024).',
      columns: ['Blood glucose range'],
      rows: [
        { label: 'Normal', cells: ['66–109.8 mg/dL'] },
        { label: 'Warning', cells: ['109.8–140.4 mg/dL'] },
        { label: 'Dangerous', cells: ['140.4 mg/dL and above'] },
      ],
    },
    figures: [
      {
        image: quGmFeatures,
        alt: 'Horizontal bar chart of the 17 features selected for severity classification. Weight, diabetes status and signal standard deviation have the highest relative importance.',
        caption: 'Figure 12 from Shuzan et al. (2024). Features selected for severity classification, ranked by importance.',
        credit: sourceArticle(quGmDoi),
        licence: ccBy,
      },
    ],
  },
];

export const mriEcgVisual: NonNullable<ResearchProject['visual']> = {
  image: mriFramework,
  alt: 'Three-phase framework diagram. Phase 1 segments QRS pulse trains from distorted ECG. Phase 2 uses the pulse trains to guide unpaired restoration with a 1D CycleGAN called MHDGAN. Phase 3 trains MHD2ECGNet for general restoration of all 12 leads.',
  caption: 'Figure 2 from Mahmud et al. (2024). QRS pulse-train segmentation (Phase 1), QRS-guided unpaired restoration with MHDGAN (Phase 2) and general 12-lead restoration with MHD2ECGNet (Phase 3).',
  credit: sourceArticle(mriRestorationDoi),
  licence: elsevier(2024),
};

export const mriEcgProgress: ResearchPhase[] = [
  {
    id: 'r-peak-detection',
    navLabel: 'R-peak detection',
    title: 'Detecting R-peaks in ECG distorted inside MRI',
    status: 'Bioengineering · 2023',
    paragraphs: [
      'Accurate R-peaks are needed to synchronise cardiac MRI with the heartbeat, but the magnetohydrodynamic (MHD) effect distorts the ECG inside the scanner. This study used public 3 T and 7 T recordings and treated R-peak detection as a 1D segmentation task.',
      'Self-Attention MHDNet converts three ECG channels into a pulse map of R-peak locations. It combines Self-ONN layers with attention blocks in an encoder–decoder network and was evaluated with five-fold cross-validation that kept each person’s data in one fold.',
    ],
    measures: [
      { value: '99.76%', label: 'F1 score at 3 T' },
      { value: '99.82%', label: 'F1 score at 7 T' },
    ],
    table: {
      caption: 'R-peak detection and segmentation results from M.H. Chowdhury et al. (2023).',
      columns: ['Recall', 'Precision', 'F1 score', 'Dice'],
      rows: [
        { label: '3 T', cells: ['99.83%', '99.68%', '99.76%', '99.01%'] },
        { label: '7 T', cells: ['99.87%', '99.78%', '99.82%', '98.36%'] },
      ],
    },
    figures: [
      {
        image: mriPeakNetwork,
        alt: 'Encoder–decoder network taking a three-channel distorted ECG and producing a map of R-peak pulses. Self-ONN layers, pooling, upsampling, concatenation and attention blocks are marked.',
        caption: 'Figure 5 from M.H. Chowdhury et al. (2023). The Self-Attention MHDNet architecture.',
        credit: sourceArticle(mriPeakDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'qrs-guidance',
    navLabel: 'Phase 1: QRS guidance',
    title: 'Phase 1: locating heartbeats from distorted 12-lead ECG',
    status: 'Engineering Applications of Artificial Intelligence · 2024',
    paragraphs: [
      'The restoration study used a public PhysioNet dataset from 23 healthy volunteers across 29 sessions in 1 T open-bore and 3 T and 7 T closed-bore scanners. The first phase turned distorted 12-lead ECG into QRS pulse trains that could guide restoration.',
      'Five segmentation networks were compared with session-independent five-fold cross-validation on 15 sessions from nine people. UNet3+ performed best and found 10,776 of 10,780 annotated R-peaks within ±75 ms. It also performed well on the 1 T session after training on 3 T and 7 T data.',
    ],
    measures: [
      { value: '99.96%', label: 'R-peak recall' },
      { value: '98.45%', label: 'R-peak F1 score' },
      { value: '4', label: 'Missed R-peaks out of 10,780' },
    ],
    table: {
      caption: 'R-peak detection with UNet3+, from Table 5 of Mahmud et al. (2024).',
      columns: ['Precision', 'Recall', 'F1 score'],
      rows: [
        { label: 'All scanners', cells: ['96.98%', '99.96%', '98.45%'] },
        { label: '1 T', cells: ['98.88%', '100%', '99.44%'] },
        { label: '3 T', cells: ['97.72%', '99.98%', '98.84%'] },
        { label: '7 T', cells: ['94.91%', '99.93%', '97.36%'] },
      ],
    },
    figures: [
      {
        image: mriQrsExamples,
        alt: 'Three examples showing distorted lead II ECG above matching reference and predicted QRS pulse trains from 1 T and 3 T recordings.',
        caption: 'Figure 5 from Mahmud et al. (2024), cropped to examples a–c. Distorted lead II ECG with reference and predicted QRS pulse trains.',
        credit: sourceArticle(mriRestorationDoi),
        licence: elsevier(2024),
      },
    ],
  },
  {
    id: 'mhdgan',
    navLabel: 'Phase 2: MHDGAN',
    title: 'Phase 2: unpaired restoration with MHDGAN',
    status: 'QRS-guided 1D-CycleGAN',
    paragraphs: [
      'A clean ECG cannot be recorded at the same moment as a distorted one because the scanner’s static field is always present. MHDGAN therefore learned from unpaired clean and distorted ECG from the same sessions. An inverted QRS pulse train was supplied with each distorted signal to keep the restored heartbeats aligned.',
      'Separate models were trained for each of the 12 leads and two groups of body orientation, giving 24 models. Evaluation used 2,389 segments from 10 sessions in two session-independent folds. Spectral agreement with clean ECG rose from 92.68% to 99.50%, and spectral error fell from 0.0524 to 0.0310.',
    ],
    measures: [
      { value: '92.56%', label: 'Spectral correlation improvement' },
      { value: '99.50%', label: 'Spectral correlation after restoration' },
      { value: '24', label: 'Lead and orientation models' },
    ],
    table: {
      caption: 'Spectral performance of MHDGAN against clean ECG, from Table 3 of Mahmud et al. (2024).',
      columns: ['Before', 'After', 'Improvement', 'Spectral error'],
      rows: [
        { label: 'All data', cells: ['92.68%', '99.50%', '92.56%', '0.0524 → 0.0310'] },
        { label: '1 T', cells: ['94.32%', '98.31%', '58.79%', '0.0477 → 0.0379'] },
        { label: '3 T', cells: ['93.07%', '99.34%', '88.79%', '0.0505 → 0.0314'] },
        { label: '7 T', cells: ['92.07%', '99.46%', '92.71%', '0.0541 → 0.0318'] },
        { label: 'Head-first supine', cells: ['91.68%', '99.30%', '90.54%', '0.0450 → 0.0261'] },
        { label: 'Feet-first supine or head-first prone', cells: ['93.68%', '99.69%', '94.58%', '0.0599 → 0.0358'] },
      ],
    },
    figures: [
      {
        image: mriGanExamples,
        alt: 'Three examples for ECG leads I, II and III. Each shows an unpaired clean ECG, the distorted ECG, an inverse QRS pulse train and the restored QRS-aligned ECG.',
        caption: 'Figure 7 from Mahmud et al. (2024), cropped to examples a–c. Clean, distorted and restored ECG with the QRS guide signal.',
        credit: sourceArticle(mriRestorationDoi),
        licence: elsevier(2024),
      },
      {
        image: mriSpectra,
        alt: 'Power spectral density plot from 0 to 40 Hz comparing clean ECG, distorted ECG and ECG restored in Phases 2 and 3. The distorted ECG departs from the clean spectrum, with a bump at low frequencies, while the restored signals follow the clean spectrum more closely.',
        caption: 'Figure 6 from Mahmud et al. (2024). Power spectral density of the clean, distorted and restored ECG.',
        credit: sourceArticle(mriRestorationDoi),
        licence: elsevier(2024),
      },
    ],
  },
  {
    id: 'mhd2ecgnet',
    navLabel: 'Phase 3: MHD2ECGNet',
    title: 'Phase 3: one model for all 12 leads',
    status: 'Supervised 1D segmentation',
    paragraphs: [
      'Running 24 separate models is impractical during a scan, especially when patient orientation changes. Phase 3 used the aligned MHDGAN outputs as training targets for one network that restores all 12 leads together, without needing a QRS input or separate orientation models.',
      'MHD2ECGNet combines a nested UNet++ structure with recurrent residual units and modified guided attention. It has 2.647 million parameters, compared with 3.936 million across the 24 MHDGAN generators, and it gave the strongest results among the six compared networks.',
    ],
    measures: [
      { value: '77.64%', label: 'Spectral correlation improvement' },
      { value: '90.14%', label: 'Correlation with Phase 2 output' },
      { value: '1', label: 'Model for all 12 leads' },
    ],
    table: {
      caption: 'General 12-lead restoration compared with the Phase 2 output, from Table 4 of Mahmud et al. (2024).',
      columns: ['Correlation', 'Mean absolute error', 'Spectral improvement'],
      rows: [
        { label: 'MHD2ECGNet', cells: ['90.14%', '0.076', '77.64%'] },
        { label: 'UNet++', cells: ['90.03%', '0.077', '74.46%'] },
        { label: 'UNet', cells: ['89.85%', '0.078', '66.66%'] },
        { label: 'Attention-UNet', cells: ['89.82%', '0.078', '64.11%'] },
        { label: 'UNet3+', cells: ['87.96%', '0.082', '39.46%'] },
        { label: 'MultiResUNet', cells: ['87.77%', '0.082', '32.63%'] },
      ],
    },
    figures: [
      {
        image: mriNetwork,
        alt: 'Nested MHD2ECGNet architecture with encoder and decoder nodes, modified guided attention blocks and deep supervision, beside an enlarged recurrent residual unit.',
        caption: 'Figure 4 from Mahmud et al. (2024), cropped to panels a and b. (a) MHD2ECGNet and (b) its recurrent residual unit.',
        credit: sourceArticle(mriRestorationDoi),
        licence: elsevier(2024),
      },
      {
        image: mriGeneralExamples,
        alt: 'Distorted ECG, Phase 2 restored ECG and Phase 3 restored ECG for leads I, II, III and aVR from a 3 tesla recording. Both restored signals show clearer heartbeat patterns.',
        caption: 'Figure 10 from Mahmud et al. (2024), cropped to four leads. Distorted ECG with the Phase 2 and Phase 3 restorations from a 3 T session.',
        credit: sourceArticle(mriRestorationDoi),
        licence: elsevier(2024),
      },
    ],
  },
  {
    id: 'cardiac-evaluation',
    navLabel: 'Cardiac evaluation',
    title: 'Checking R-peaks, heart rate and variability',
    status: 'Comparison with expert annotations',
    paragraphs: [
      'Restored signals were assessed with an independent R-peak detector and compared with expert annotations. Mean heart rate was 62.40 beats per minute in the reference, 62.63 after MHDGAN and 63.26 after MHD2ECGNet. Heart rate variability (SDNN) was 119.76 ms in the reference, 120.54 ms after MHDGAN and 127.98 ms after MHD2ECGNet.',
    ],
    measures: [
      { value: '96.01%', label: 'MHDGAN R-peak F1 score' },
      { value: '94.85%', label: 'MHD2ECGNet R-peak F1 score' },
      { value: '0.93', label: 'Heart-rate correlation with MHDGAN' },
    ],
    table: {
      caption: 'R-peak detection after restoration, from Table 5 of Mahmud et al. (2024).',
      columns: ['Precision', 'Recall', 'F1 score'],
      rows: [
        { label: 'MHDGAN, all leads', cells: ['98.14%', '94.12%', '96.01%'] },
        { label: 'MHDGAN, lead II', cells: ['99.98%', '98.89%', '99.43%'] },
        { label: 'MHD2ECGNet, all leads', cells: ['97.12%', '92.43%', '94.85%'] },
        { label: 'MHD2ECGNet, lead II', cells: ['99.40%', '98.06%', '98.73%'] },
      ],
    },
    figures: [
      {
        image: mriHeartRate,
        alt: 'Line plots of heart rate and heart rate variability across recording sessions for Phase 2 and Phase 3, beside scatter plots of estimated against reference heart rate with correlations of 0.93 and 0.80.',
        caption: 'Figure 12 from Mahmud et al. (2024). Heart rate and variability trends, with heart-rate correlation for Phases 2 and 3.',
        credit: sourceArticle(mriRestorationDoi),
        licence: elsevier(2024),
      },
    ],
  },
];

export const fetalEcgVisual: NonNullable<ResearchProject['visual']> = {
  image: fetalPipeline,
  alt: 'Block diagram. Four abdominal maternal ECG channels and a reference fetal ECG are preprocessed and used to train a model. Test recordings pass through the same preprocessing and the trained model to predict fetal ECG.',
  caption: 'Figure 1 from Rahman et al. (2023). Training and prediction pipeline for extracting fetal ECG from abdominal maternal recordings.',
  credit: sourceArticle(fetalLinkNetDoi),
  licence: elsevier(2023),
};

export const fetalEcgProgress: ResearchPhase[] = [
  {
    id: 'linknet-extraction',
    navLabel: 'LinkNet++ extraction',
    title: 'Extracting fetal ECG with deeply supervised LinkNet++',
    status: 'Engineering Applications of Artificial Intelligence · 2023',
    paragraphs: [
      'The study used two public datasets of four-channel abdominal ECG. Dataset 1 contains recordings from five women at 38 to 41 weeks of pregnancy, and Dataset 2a contains recordings from 12 women during labour, both with fetal scalp ECG as the reference. Dataset 2b adds recordings from 10 women with expert-marked fetal heartbeats.',
      'LinkNet++ combines LinkNet’s residual encoder and feature addition with dense skip pathways and deep supervision. It was compared with U-Net, UNet variants and LinkNet using leave-one-subject-out validation. LinkNet++ gave the highest waveform correlation, improving on LinkNet by 3.56 points on Dataset 1 and 2.58 points on Dataset 2a.',
      'Fetal QRS complexes detected from the extracted signal reached F1 scores above 99% on all three datasets. Heart rate from the extracted signal also correlated with the reference at more than 0.9.',
    ],
    measures: [
      { value: '87.60%', label: 'Best waveform correlation (Dataset 2a)' },
      { value: '99.6%', label: 'Best fetal QRS F1 score (Dataset 1)' },
      { value: '27', label: 'Women across the three datasets' },
    ],
    table: {
      caption: 'LinkNet++ results from Tables 1 and 2 of Rahman et al. (2023). Dataset 2b has no continuous reference fetal ECG.',
      columns: ['Waveform correlation', 'Mean absolute error', 'QRS precision', 'QRS sensitivity', 'QRS F1'],
      rows: [
        { label: 'Dataset 1', cells: ['85.58%', '0.068', '99.7%', '99.5%', '99.6%'] },
        { label: 'Dataset 2a', cells: ['87.60%', '0.061', '99.5%', '99.3%', '99.4%'] },
        { label: 'Dataset 2b', cells: ['Not available', 'Not available', '99.4%', '99.6%', '99.5%'] },
      ],
    },
    figures: [
      {
        image: fetalLinkNet,
        alt: 'LinkNet++ architecture with encoder and decoder levels joined by dense convolution blocks and deep supervision outputs, beside enlarged encoder and decoder blocks.',
        caption: 'Figure 4 from Rahman et al. (2023). The LinkNet++ architecture.',
        credit: sourceArticle(fetalLinkNetDoi),
        licence: elsevier(2023),
      },
      {
        image: fetalPeaks,
        alt: 'Four pairs of plots, each with a ground-truth fetal ECG above the LinkNet++ prediction. Marked R-peaks in each prediction line up with the ground-truth peaks.',
        caption: 'Figure 6 from Rahman et al. (2023). Reference and LinkNet++ fetal ECG with detected R-peaks for Dataset 1 (a, c) and Dataset 2a (b, d).',
        credit: sourceArticle(fetalLinkNetDoi),
        licence: elsevier(2023),
      },
      {
        image: fetalHeartRate,
        alt: 'Bland–Altman plot and regression plot comparing heart rate from reference and extracted fetal ECG for Dataset 1. Most differences lie near zero and the points follow the regression line.',
        caption: 'Figure 7a from Rahman et al. (2023), cropped to Dataset 1. Agreement between heart rate from extracted and reference fetal ECG.',
        credit: sourceArticle(fetalLinkNetDoi),
        licence: elsevier(2023),
      },
    ],
  },
  {
    id: 'cyclegan-morphology',
    navLabel: '1D-CycleGAN',
    title: 'Preserving fetal ECG morphology with 1D-CycleGAN',
    status: 'Expert Systems with Applications · 2024',
    paragraphs: [
      'The second study focused on the full waveform, including features such as P waves, ST segments and T waves. A 1D-CycleGAN learned to map four-channel maternal ECG to fetal ECG using the two PhysioNet datasets with scalp reference signals. Preprocessing included zero-lag filtering to avoid shifting the waveform.',
      'A weighted loss added spectral, temporal and power terms to the adversarial loss, increasing waveform correlation by almost 10%. Among U-Net, ResNet and Self-FPN generators, a 13-block ResNet generator with a standard PatchGAN discriminator gave the best result. The full network has 0.762 million parameters.',
    ],
    measures: [
      { value: '88.4%', label: 'Average waveform correlation' },
      { value: '89.4%', label: 'Average spectral correlation' },
      { value: '13', label: 'ResNet blocks in the best generator' },
    ],
    table: {
      caption: 'Five-fold results for the best model, from Table 2 of Basak et al. (2024) in its arXiv version. The final row gives the mean across folds.',
      columns: ['Waveform correlation', 'Spectral correlation', 'RMSE', 'Mean absolute error'],
      rows: [
        { label: 'Fold 1', cells: ['0.89', '0.90', '0.106', '0.069'] },
        { label: 'Fold 2', cells: ['0.88', '0.88', '0.109', '0.073'] },
        { label: 'Fold 3', cells: ['0.89', '0.90', '0.103', '0.068'] },
        { label: 'Fold 4', cells: ['0.89', '0.90', '0.102', '0.069'] },
        { label: 'Fold 5', cells: ['0.87', '0.89', '0.115', '0.077'] },
        { label: 'Mean', cells: ['0.884', '0.894', '0.107', '0.071'] },
      ],
    },
    figures: [
      {
        image: fetalGenerator,
        alt: 'Generator diagram with a four-channel input, one-dimensional convolution layers, residual blocks, transposed convolution layers and a single output.',
        caption: 'Figure 8b from the arXiv version of Basak et al. (2024). The 1D-CycleGAN generator.',
        credit: sourceArticle(fetalCyclePreprint),
        licence: ccBy,
      },
      {
        image: fetalCycleExample,
        alt: 'Two plots of fetal ECG over about 2,000 samples. The estimated signal closely follows the ground-truth beats and smaller waveform features.',
        caption: 'Figure 9c from the arXiv version of Basak et al. (2024). Reference fetal ECG (top) and the extracted signal (bottom).',
        credit: sourceArticle(fetalCyclePreprint),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'fetal-heart-metrics',
    navLabel: 'Heart-rate evaluation',
    title: 'Measuring fetal heartbeats from the extracted signal',
    status: 'Expert Systems with Applications · 2024',
    paragraphs: [
      'Fetal QRS complexes were detected from the 1D-CycleGAN output with a tolerance of 31.25 ms. Mean heart rate and beat interval closely matched the reference, showing that the extracted signal preserved fetal timing. Short-term variation in heart rate was harder to reproduce.',
    ],
    measures: [
      { value: '96.4%', label: 'Fetal QRS F1 score' },
      { value: '97.6%', label: 'Fetal QRS precision' },
      { value: '0.25%', label: 'Mean heart-rate error' },
    ],
    table: {
      caption: 'Average heart-rate measures across five folds, from Table 5 of Basak et al. (2024) in its arXiv version.',
      columns: ['Reference', 'Extracted', 'Error'],
      rows: [
        { label: 'Mean R-R interval', cells: ['473.19 ms', '474.46 ms', '0.27%'] },
        { label: 'Mean heart rate', cells: ['128.52 bpm', '128.85 bpm', '0.25%'] },
        { label: 'Heart-rate standard deviation', cells: ['14.14 bpm', '18.24 bpm', '29%'] },
        { label: 'SDNN/RMSSD', cells: ['0.70', '0.70', '0.57%'] },
        { label: 'pNN50', cells: ['40.45%', '41.39%', '2.32%'] },
      ],
    },
    figures: [
      {
        image: fetalCyclePeaks,
        alt: 'Reference and extracted fetal ECG plots with vertical markers showing R-peak locations aligned across both signals.',
        caption: 'Figure 10a from the arXiv version of Basak et al. (2024). R-peaks detected from reference and extracted fetal ECG.',
        credit: sourceArticle(fetalCyclePreprint),
        licence: ccBy,
      },
    ],
  },
];

export const eegRestorationVisual: NonNullable<ResearchProject['visual']> = {
  image: eegMlmrsFramework,
  alt: 'Block diagram. Motion-corrupted and reference EEG are preprocessed and divided into training, validation and test sets. Deep learning models are trained and tuned, and the best model predicts clean EEG for performance evaluation.',
  caption: 'Figure 1 from Mahmud et al. (2023). Framework for correcting motion artefacts in EEG with deep learning.',
  credit: sourceArticle(eegMlmrsDoi),
  licence: ccBy,
};

export const eegRestorationProgress: ResearchPhase[] = [
  {
    id: 'mlmrs-net',
    navLabel: 'MLMRS-Net',
    title: 'Removing motion artefacts with MLMRS-Net',
    status: 'Neural Computing and Applications · 2023',
    paragraphs: [
      'The study used a public PhysioNet dataset of 23 single-channel prefrontal EEG recordings. In each 9-minute recording, two electrodes sat 30 mm apart. One stayed undisturbed as the reference, and the other was tapped for 10 to 25 seconds about every two minutes. Signals were resampled to 256 Hz, baseline-corrected, notch-filtered at 50 Hz and split into 1,024-sample segments.',
      'MLMRS-Net is a five-level, one-dimensional U-shaped network with multi-resolution pooling blocks in its encoder and decoder, and deep supervision at each decoder level. It was compared with 10 other 1D networks, testing each recording in turn on a model trained with the other 22. MLMRS-Net gave the highest artefact reduction and the lowest reconstruction error, while signal-to-noise gains were close across all networks.',
      'EEG alone reached 89.32% artefact reduction. Adding three-axis accelerometer signals raised this to 90.52%, so strong restoration remained possible without extra motion sensors.',
    ],
    measures: [
      { value: '90.52%', label: 'Motion artefact reduction' },
      { value: '26.64 dB', label: 'Signal-to-noise improvement' },
      { value: '0.056', label: 'Mean absolute error' },
    ],
    table: {
      caption: 'Selected networks from Table 1 of Mahmud et al. (2023), each using EEG and three-axis accelerometer inputs. Results are averaged across 23 test folds.',
      columns: ['Signal-to-noise improvement', 'Artefact reduction', 'Mean absolute error'],
      rows: [
        { label: 'FPN', cells: ['26.489 dB', '86.197%', '0.069'] },
        { label: 'U-Net', cells: ['26.568 dB', '88.817%', '0.064'] },
        { label: 'U-Net++', cells: ['26.703 dB', '89.956%', '0.059'] },
        { label: 'Attention U-Net++', cells: ['26.632 dB', '90.191%', '0.058'] },
        { label: 'MLMRS-Net', cells: ['26.641 dB', '90.516%', '0.056'] },
      ],
    },
    figures: [
      {
        image: eegMlmrsNetwork,
        alt: 'U-shaped network diagram. A four-channel input of corrupted EEG and three accelerometer axes passes through five encoder levels and matching decoder levels, with a deep supervision output at each decoder level.',
        caption: 'Figure 2 from Mahmud et al. (2023). The MLMRS-Net architecture.',
        credit: sourceArticle(eegMlmrsDoi),
        licence: ccBy,
      },
      {
        image: eegMlmrsExamples,
        alt: 'Six groups of EEG plots, each showing the reference, input and MLMRS-Net output. In four groups the corrupted input is heavily distorted and the output follows the reference. In two clean groups all three signals match closely.',
        caption: 'Figure 7 from Mahmud et al. (2023). Reference, input and restored EEG for motion-corrupted segments (a–d) and clean segments (e, f).',
        credit: sourceArticle(eegMlmrsDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'ago-cyclegan',
    navLabel: 'AGO-CycleGAN',
    title: 'Restoring EEG with an attention-guided operational CycleGAN',
    status: 'Engineering Applications of Artificial Intelligence · 2024',
    paragraphs: [
      'The second study used the same recordings and restored EEG directly from the corrupted channel. Baseline correction was applied to the reference channel, so the model learned to remove baseline drift together with motion artefacts.',
      'AGO-CycleGAN uses attention-guided Feature Pyramid Network generators and PatchGAN discriminators built with Self-ONN layers. Among six CycleGAN variants, this design gave the best temporal correlation, spectral correlation and signal-to-noise improvement. Only the restoration generator is needed after training, with 2.245 million parameters.',
      'Motion-corrupted segments moved close to the reference after restoration, while clean segments stayed almost unchanged.',
    ],
    measures: [
      { value: '26.50 dB', label: 'Signal-to-noise improvement' },
      { value: '87.2%', label: 'Temporal correlation improvement' },
      { value: '0.071', label: 'Mean absolute error' },
    ],
    table: {
      caption: 'CycleGAN variants from Table 2 of Mahmud et al. (2024). Correlations compare restored EEG with the reference, and parameters cover the full CycleGAN.',
      columns: ['Parameters', 'Temporal correlation', 'Spectral correlation', 'Signal-to-noise improvement'],
      rows: [
        { label: 'CNN U-Net', cells: ['2.058 M', '0.848', '0.918', '25.619 dB'] },
        { label: 'CNN FPN', cells: ['2.062 M', '0.857', '0.921', '25.210 dB'] },
        { label: 'CNN attention FPN', cells: ['2.076 M', '0.869', '0.933', '26.328 dB'] },
        { label: 'Self-ONN U-Net', cells: ['5.402 M', '0.865', '0.926', '25.873 dB'] },
        { label: 'Self-ONN FPN', cells: ['5.408 M', '0.876', '0.938', '26.302 dB'] },
        { label: 'AGO-CycleGAN', cells: ['5.540 M', '0.880', '0.943', '26.497 dB'] },
      ],
    },
    figures: [
      {
        image: eegCycleFramework,
        alt: 'CycleGAN framework diagram. One generator restores motion-corrupted EEG and a second generator maps clean EEG to corrupted EEG. Two discriminators, cycle-consistency losses and identity losses link the two directions.',
        caption: 'Figure 3 from Mahmud et al. (2024). The AGO-CycleGAN training framework.',
        credit: sourceArticle(eegCycleDoi),
        licence: elsevier(2023),
      },
      {
        image: eegCycleBlocks,
        alt: 'Architecture diagrams of the Self-ONN generator with attention gates on its skip connections, the PatchGAN discriminator, and the guided attention block.',
        caption: 'Figure 4 from Mahmud et al. (2024). The generator, discriminator and guided attention block.',
        credit: sourceArticle(eegCycleDoi),
        licence: elsevier(2023),
      },
      {
        image: eegCycleExamples,
        alt: 'Six groups of EEG plots, each showing the reference, input and AGO-CycleGAN output. Corrupted inputs with motion and baseline drift are restored towards the reference, and clean inputs remain nearly unchanged.',
        caption: 'Figure 5 from Mahmud et al. (2024). Reference, input and restored EEG for corrupted segments (a–d) and clean segments (e, f).',
        credit: sourceArticle(eegCycleDoi),
        licence: elsevier(2023),
      },
    ],
  },
  {
    id: 'spectral-recovery',
    navLabel: 'Spectral recovery',
    title: 'Recovering the EEG frequency profile',
    status: 'Engineering Applications of Artificial Intelligence · 2024',
    paragraphs: [
      'Motion artefacts added strong low-frequency power. The delta band rose from 10.7% to 60.1% of total EEG power, while the alpha band fell from 53.2% to 19.1%. After restoration, delta and alpha returned to 11.9% and 50.4%, close to the reference.',
      'Spectral correlation with the reference increased from 0.128 to 0.943. Power spectra and topographic maps showed the same recovery across the EEG frequency bands.',
    ],
    measures: [
      { value: '93.5%', label: 'Spectral correlation improvement' },
      { value: '0.943', label: 'Spectral correlation after restoration' },
      { value: '11.9%', label: 'Restored delta power (reference 10.7%)' },
    ],
    table: {
      caption: 'Share of EEG power in each frequency band across the dataset, from Table 1 of Mahmud et al. (2024).',
      columns: ['Delta', 'Theta', 'Alpha', 'Beta', 'Gamma'],
      rows: [
        { label: 'Reference', cells: ['0.1070', '0.2070', '0.5317', '0.1115', '0.0430'] },
        { label: 'Motion-corrupted', cells: ['0.6011', '0.1204', '0.1913', '0.0584', '0.0290'] },
        { label: 'Restored', cells: ['0.1188', '0.2059', '0.5040', '0.1172', '0.0542'] },
      ],
    },
    figures: [
      {
        image: eegSpectra,
        alt: 'Power spectral density plot from 0 to 40 Hz. The motion-corrupted EEG lies far above the reference across all frequencies, while the restored EEG almost overlaps the reference.',
        caption: 'Figure 6 from Mahmud et al. (2024). Power spectral density of reference, motion-corrupted and restored EEG.',
        credit: sourceArticle(eegCycleDoi),
        licence: elsevier(2023),
      },
      {
        image: eegTopography,
        alt: 'Grid of scalp topographic maps for the whole spectrum and five EEG bands. Maps of motion-corrupted EEG show strong prefrontal power, especially in the delta band, while restored maps resemble the reference maps.',
        caption: 'Figure 7 from Mahmud et al. (2024). Topographic maps of reference, motion-corrupted and restored EEG across frequency bands.',
        credit: sourceArticle(eegCycleDoi),
        licence: elsevier(2023),
      },
    ],
  },
];

export const dopplerFlowVisual: NonNullable<ResearchProject['visual']> = {
  image: dopplerOverview,
  alt: 'Method overview. Transcranial Doppler ultrasound produces a spectrogram, a flow-velocity algorithm extracts the maximal velocity waveform, the waveforms are cleaned and restored with a CycleGAN, and a two-stream DopplerNet2+ classifier labels each recording as healthy or intensive care.',
  caption: 'Figure 2 from Kanti Podder et al. (2023). From Doppler spectrograms to maximal flow-velocity waveforms, CycleGAN restoration and two-stream classification.',
  credit: sourceArticle(dopplerTwoStreamDoi),
  licence: elsevier(2023),
};

export const dopplerFlowProgress: ResearchPhase[] = [
  {
    id: 'cyclegan-restoration',
    navLabel: 'CycleGAN restoration',
    title: 'Restoring low-quality flow-velocity waveforms',
    status: 'Biomedical Signal Processing and Control · 2023',
    paragraphs: [
      'The study used a public dataset recorded over the middle cerebral artery with a portable ultrasound system and a 1.75 MHz transducer. It contains 16 recordings from 6 healthy volunteers and 29 recordings from 12 patients in neurocritical care with hydrocephalus, traumatic brain injury, or intraparenchymal or subarachnoid haemorrhage. The maximum flow-velocity waveform was extracted from each Doppler spectrogram and split into 1,024-sample segments.',
      'Trained annotators labelled each segment by signal quality. A 1D-CycleGAN with ResNet generators and PatchGAN discriminators then learned to map low-quality segments to high-quality waveforms. It reduced baseline drift and distortion in low-quality signals, while high-quality signals changed very little.',
    ],
    measures: [
      { value: '18', label: 'Participants' },
      { value: '3,243', label: 'Segments kept after cleaning' },
      { value: '1,760', label: 'Low-quality training segments after 75% overlap' },
    ],
    table: {
      caption: 'Signal-quality labels from Figure 4 of Kanti Podder et al. (2023).',
      columns: ['Segments', 'Use'],
      rows: [
        { label: 'High quality', cells: ['2,803', 'Kept'] },
        { label: 'Low quality', cells: ['440', 'Kept and restored'] },
        { label: 'Mediocre', cells: ['2,061', 'Removed'] },
        { label: 'Corrupted', cells: ['164', 'Removed'] },
      ],
    },
    figures: [
      {
        image: dopplerQuality,
        alt: 'Four flow-velocity waveform plots. The high-quality signal has regular pulses, the low-quality signal is distorted but recognisable, the mediocre signal contains abrupt drops, and the corrupted signal has no clear pulse pattern.',
        caption: 'Figure 3 from Kanti Podder et al. (2023). Examples of high-quality, low-quality, mediocre and corrupted signals.',
        credit: sourceArticle(dopplerTwoStreamDoi),
        licence: elsevier(2023),
      },
      {
        image: dopplerCycleGan,
        alt: 'CycleGAN diagram. One generator converts bad-quality waveforms to good quality and a second converts good-quality waveforms to bad quality. Two discriminators, cycle-consistency losses and identity losses link the two directions.',
        caption: 'Figure 5 from Kanti Podder et al. (2023). The 1D-CycleGAN used to restore middle cerebral artery waveforms.',
        credit: sourceArticle(dopplerTwoStreamDoi),
        licence: elsevier(2023),
      },
      {
        image: dopplerRestored,
        alt: 'Four plots of middle cerebral artery waveforms, two from healthy and two from intensive-care recordings. Each overlays the original waveform in blue and the CycleGAN-processed waveform in orange.',
        caption: 'Figure 7 from Kanti Podder et al. (2023). Original and CycleGAN-processed waveforms for the healthy (a, b) and intensive-care (c, d) classes.',
        credit: sourceArticle(dopplerTwoStreamDoi),
        licence: elsevier(2023),
      },
    ],
  },
  {
    id: 'dopplernet2-plus',
    navLabel: 'DopplerNet2+',
    title: 'Two-stream classification with DopplerNet2+',
    status: 'Biomedical Signal Processing and Control · 2023',
    paragraphs: [
      'DopplerNet is a one-dimensional Self-ONN classifier built from inverted residual blocks and pool-wise dense connections. DopplerNet2+ extends it with two parallel streams, one for the original waveform and one for the CycleGAN-processed waveform, and combines their features before classification.',
      'Models were tested with five-fold cross-validation separated by recording session. The two-stream model gave the best result, correctly identifying 98.86% of healthy segments and 99.96% of intensive-care segments.',
    ],
    measures: [
      { value: '99.45%', label: 'Accuracy' },
      { value: '99.37%', label: 'Specificity' },
      { value: '1.00', label: 'Area under the ROC curve' },
    ],
    table: {
      caption: 'Best result for each input and model design, from Table 4 of Kanti Podder et al. (2023).',
      columns: ['Parameters', 'Accuracy', 'F1 score', 'Specificity'],
      rows: [
        { label: 'Original waveform', cells: ['199,666', '97.71%', '97.71%', '97.61%'] },
        { label: 'CycleGAN-processed waveform', cells: ['587,378', '95.55%', '95.54%', '95.36%'] },
        { label: 'Both as two input channels', cells: ['587,666', '96.64%', '96.64%', '96.43%'] },
        { label: 'DopplerNet2+ with two streams', cells: ['1,174,754', '99.45%', '99.45%', '99.37%'] },
      ],
    },
    figures: [
      {
        image: dopplerTwoStream,
        alt: 'DopplerNet2+ architecture. The original waveform and the CycleGAN-processed waveform pass through separate streams of Self-ONN blocks. Features from both streams are concatenated and sent to a classifier that outputs healthy or ICU.',
        caption: 'Figure 9 from Kanti Podder et al. (2023). The two-stream DopplerNet2+ architecture.',
        credit: sourceArticle(dopplerTwoStreamDoi),
        licence: elsevier(2023),
      },
      {
        image: dopplerPerformance,
        alt: 'Confusion matrix with 2,432 healthy and 2,814 intensive-care segments classified correctly, 28 healthy segments misclassified and 1 intensive-care segment misclassified, beside a ROC curve reaching an area of 1.00.',
        caption: 'Figure 12 from Kanti Podder et al. (2023). Confusion matrix (a) and ROC curves (b) for DopplerNet2+.',
        credit: sourceArticle(dopplerTwoStreamDoi),
        licence: elsevier(2023),
      },
    ],
  },
  {
    id: 'self-resattentionet',
    navLabel: 'Self-ResAttentioNet18',
    title: 'Attention-based classification of clear waveforms',
    status: 'Diagnostics · 2023',
    paragraphs: [
      'The second study classified clear waveform segments directly, without generative restoration. Segments were annotated as clear or corrupted, leaving 1,501 healthy and 1,742 intensive-care segments of 1,024 samples at 217 Hz.',
      'Self-ResNet18 replaces the convolutional layers of ResNet18 with Self-ONN layers, and Self-ResAttentioNet18 adds four multi-head attention layers. Each design was tested at three Self-ONN orders using five-fold validation separated by recording session. Self-ResAttentioNet18 at order 1 performed best, correctly identifying 96.63% of healthy segments and 95.51% of intensive-care segments.',
    ],
    measures: [
      { value: '96.05%', label: 'Accuracy' },
      { value: '96.09%', label: 'Specificity' },
      { value: '0.99', label: 'Area under the ROC curve' },
    ],
    table: {
      caption: 'Model comparison from Table 4 of Nisha et al. (2023). Q1, Q3 and Q5 are the Self-ONN orders.',
      columns: ['Accuracy', 'Precision', 'F1 score', 'Specificity'],
      rows: [
        { label: 'Self-ResNet18 Q1', cells: ['93.46%', '93.48%', '93.46%', '93.39%'] },
        { label: 'Self-ResNet18 Q3', cells: ['94.91%', '94.92%', '94.91%', '94.88%'] },
        { label: 'Self-ResNet18 Q5', cells: ['93.31%', '93.32%', '93.30%', '93.26%'] },
        { label: 'Self-ResAttentioNet18 Q1', cells: ['96.05%', '96.06%', '96.06%', '96.09%'] },
        { label: 'Self-ResAttentioNet18 Q3', cells: ['95.31%', '95.34%', '95.31%', '95.37%'] },
        { label: 'Self-ResAttentioNet18 Q5', cells: ['92.97%', '93.01%', '92.97%', '93.03%'] },
      ],
    },
    figures: [
      {
        image: dopplerAttentionNetwork,
        alt: 'Self-ResAttentioNet18 architecture. A one-dimensional input passes through Self-ONN residual blocks with four multi-head attention layers, followed by flattening, a fully connected layer and a log-softmax output.',
        caption: 'Figure 6 from Nisha et al. (2023). The Self-ResAttentioNet18 architecture.',
        credit: sourceArticle(dopplerAttentionDoi),
        licence: ccBy,
      },
      {
        image: dopplerAttentionPerformance,
        alt: 'Confusion matrix with 1,519 healthy and 1,596 intensive-care segments classified correctly, 53 healthy and 75 intensive-care segments misclassified, beside ROC curves with an area of 0.99.',
        caption: 'Figure 9 from Nisha et al. (2023). Confusion matrix (a) and ROC curves (b) for Self-ResAttentioNet18 at order 1.',
        credit: sourceArticle(dopplerAttentionDoi),
        licence: ccBy,
      },
    ],
  },
];
