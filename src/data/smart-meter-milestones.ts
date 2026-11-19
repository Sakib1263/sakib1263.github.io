import occupancyWeek from '../assets/research/smart-meter-load-and-occupancy/fig6-occupancy.png';
import fusionFramework from '../assets/research/smart-meter-load-and-occupancy/be-fig1-framework.png';
import loadEventPulses from '../assets/research/smart-meter-load-and-occupancy/be-fig2-load-events.png';
import ldNetArchitecture from '../assets/research/smart-meter-load-and-occupancy/jobe-fig2-ldnet.png';
import cascadedConfusion from '../assets/research/smart-meter-load-and-occupancy/jobe-fig8-confusion.png';
import { ccBy, sourceArticle } from './figure-credits';
import type { ResearchPhase, ResearchProject } from './research';

const fusionDoi = '10.1016/j.buildenv.2025.112635';
const cascadedDoi = '10.1016/j.jobe.2025.113731';

export const smartMeterVisual: NonNullable<ResearchProject['visual']> = {
  image: occupancyWeek,
  alt: 'Four panels, one per household, each comparing the ground-truth occupancy pulse in blue with the estimated occupancy in green over 168 hours. Most of each week is shaded green for correct estimates, with short red false-positive and blue false-negative periods.',
  caption: 'Figure 6 from Mahmud et al. (2025), Building and Environment. Ground-truth and estimated occupancy over one week in four ECO households. Green shading marks correct estimates, red false positives and blue false negatives.',
  credit: sourceArticle(fusionDoi),
  licence: ccBy,
};

export const smartMeterProgress: ResearchPhase[] = [
  {
    id: 'load-disaggregation',
    navLabel: 'Load disaggregation',
    title: 'Reconstructing appliance load profiles from aggregate meter data',
    status: 'Under revision',
    paragraphs: [
      'Appliances leave very different traces in a household meter. Fridges and freezers cycle continuously, kettles and microwaves draw short bursts of high power, and laptops, lamps and entertainment systems use little power for long periods. Low-power devices are the hardest to separate because larger loads mask them, yet they are often closely linked to whether someone is at home.',
      'The first study, SM-DAGG, reconstructs the continuous power profile of each appliance with its own one-dimensional sequence-to-sequence network. The inputs are the total power and the phase power and current channels most correlated with the target appliance. Its DAGG-Net architecture adds full-scale connections between encoder stages to nested skip pathways and deep supervision, so deeper layers combine patterns from several time scales.',
      'The study also proposes the Jaccard of Energies of Interest (JEOI). It combines overlapping, missing and extra energy into one score and complements standard error and correlation measures. Methods were compared across 14 appliances from six ECO households.',
    ],
    measures: [
      { value: '14', label: 'Appliance types' },
      { value: '6', label: 'Households' },
      { value: '3', label: 'Meter input channels per model' },
    ],
    table: {
      caption: 'Appliance groups in the ECO data, as described by Mahmud et al. (2025), Journal of Building Engineering.',
      columns: ['Appliances', 'Disaggregation challenge'],
      rows: [
        { label: 'High-energy', cells: ['Dishwasher, kettle, stove, dryer, kitchen appliances, washing machine, microwave', 'Distinct signatures, but short and irregular use'] },
        { label: 'Cyclic', cells: ['Fridge, freezer', 'Regular cycles that continue whether or not anyone is home'] },
        { label: 'Low-power', cells: ['Air exhaust, entertainment, lamp, laptop, PC and router', 'Weak signatures masked by larger loads, but closely tied to occupant activity'] },
      ],
    },
  },
  {
    id: 'feature-fusion',
    navLabel: 'Feature fusion',
    title: 'Fusing appliance events, load statistics and time for occupancy detection',
    status: 'Building and Environment · 2025',
    paragraphs: [
      'The second study, MMF-NIOM, used DAGG-Net to disaggregate the meter signal, then turned each reconstructed appliance profile into an on/off event pulse. Merging the pulses of all devices in a home gave one household activity signal. A deep classifier, NIOM-Net, used this signal to detect occupancy and to produce 256 learned features.',
      'Appliance events alone do not show how much power is drawn or when. The framework therefore added 243 statistical, spectral and entropy features from the aggregate meter data and eight date and time features such as season, month, day and hour. After redundant features were removed and the most informative ones selected with a genetic algorithm, an ensemble of classical classifiers made the final decision.',
      'Reconstruction quality varied by appliance. DAGG-Net reached JEOI scores of 0.961 for the dryer and 0.903 for the dishwasher, but 0.410 for the low-power air exhaust. In occupancy detection, the dishwasher and the entertainment system were the most informative single devices. Removing the lamp and the PC and router, whose use was less tied to presence, improved every metric.',
    ],
    measures: [
      { value: '91.51%', label: 'Occupancy accuracy' },
      { value: '91.99%', label: 'Specificity' },
      { value: '507', label: 'Fused features before selection' },
    ],
    table: {
      caption: 'Occupancy detection on the ECO dataset reported by Mahmud et al. (2025), Building and Environment. Fused results use a stacked ensemble.',
      columns: ['Accuracy', 'F1 score', 'Specificity'],
      rows: [
        { label: 'Load-event features, nine devices', cells: ['85.75%', '85.74%', '86.32%'] },
        { label: 'Fused features, nine devices', cells: ['88.47%', '88.48%', '89.00%'] },
        { label: 'Load-event features, seven devices', cells: ['88.22%', '88.21%', '88.96%'] },
        { label: 'Fused features, seven devices', cells: ['91.51%', '91.52%', '91.99%'] },
      ],
    },
    figures: [
      {
        image: fusionFramework,
        alt: 'Flowchart. Aggregated smart-meter data, appliance data and timestamps are preprocessed. A sequence-to-sequence model disaggregates appliance loads, which become load event pulses and feed a sequence-to-point classifier that outputs occupancy labels and deep features. Classical features from the meter data and datetime features from metadata are fused with the deep features, engineered and passed to an ensemble of classifiers.',
        caption: 'Figure 1 from Mahmud et al. (2025), Building and Environment. The MMF-NIOM framework, with the appliance-event pipeline shaded in yellow.',
        credit: sourceArticle(fusionDoi),
        licence: ccBy,
      },
      {
        image: loadEventPulses,
        alt: 'Stacked daily plots for one household. Appliance load states and event pulses are shown for the dishwasher, air exhaust, entertainment system, kettle, lamp, laptop and stove. Below them, the merged household load event pulse rises during the same periods, and the bottom plot shows the occupancy label, which is unoccupied only between about samples 40,000 and 46,000.',
        caption: 'Figure 2 from Mahmud et al. (2025), Building and Environment. Appliance load states and event pulses for one day in house H02, the merged household event pulse and the matching occupancy label.',
        credit: sourceArticle(fusionDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'cascaded-framework',
    navLabel: 'Cascaded framework',
    title: 'One framework for appliance loads and occupancy',
    status: 'Journal of Building Engineering · 2025',
    paragraphs: [
      'The third study, NILOM, joined the two tasks in one cascaded deep learning framework. Its first network, LD-Net, reconstructs appliance load profiles. Its second, OD-Net, classifies occupancy in 30-minute windows from the household event pulse, so the same meter data yields both appliance use and occupancy.',
      'LD-Net uses an inverse-pyramid encoder built from multi-resolution pooling blocks, with nested and full-scale decoder connections. It outperformed UNet, UNet++, UNet3+ and PSP-Net trained under the same settings, particularly for low-power devices such as laptops and PCs. The study also introduced the Dice of Energies of Interest (DEOI), a Dice-based counterpart to JEOI, which exposed load mismatches that correlation alone missed.',
      'Disaggregating first made a large difference. Classifying occupancy directly from the aggregate meter signal reached 61.35% accuracy, whereas every single-appliance event pulse did better, up to 93.49% for the dishwasher. Combining several devices is more robust to varied routines than relying on one appliance. Keeping only devices with at least 5% correlation to occupancy raised accuracy from 85.72% to 89.62% on held-out households.',
    ],
    measures: [
      { value: '89.62%', label: 'Occupancy accuracy on held-out households' },
      { value: '5,805', label: 'Hours of labelled data evaluated' },
      { value: '47 ms', label: 'Reported inference time for both networks' },
    ],
    table: {
      caption: 'Occupancy detection reported by Mahmud et al. (2025), Journal of Building Engineering. Single-signal rows come from the study’s appliance-wise ablation.',
      columns: ['Accuracy', 'F1 score', 'Specificity'],
      rows: [
        { label: 'Aggregate meter signal, no disaggregation', cells: ['61.35%', '60.88%', '62.68%'] },
        { label: 'All selected appliances', cells: ['85.72%', '85.63%', '86.89%'] },
        { label: 'Appliances with at least 5% occupancy correlation', cells: ['89.62%', '89.45%', '90.86%'] },
        { label: 'Best single appliance (dishwasher)', cells: ['93.49%', '93.34%', '92.82%'] },
      ],
    },
    figures: [
      {
        image: ldNetArchitecture,
        alt: 'Network diagram in four panels. Panel a shows five encoder blocks along a shaded inverse-pyramid backbone connected to a grid of nested decoder blocks with dense skip connections and deep supervision. Panel b expands a multi-resolution pooling block with parallel feature augmentation layers and a scope-merging block of 3, 5 and 7 kernel convolutions. Panel c expands a feature augmentation layer that combines max and average pooling before upsampling. Panel d is a glossary.',
        caption: 'Figure 2 from Mahmud et al. (2025), Journal of Building Engineering. LD-Net architecture, its multi-resolution pooling block and deep feature augmentation layer.',
        credit: sourceArticle(cascadedDoi),
        licence: ccBy,
      },
      {
        image: cascadedConfusion,
        alt: 'Confusion matrix. 88% of occupied windows (5,106) and 91% of unoccupied windows (5,298) are classified correctly. 672 occupied windows are predicted as unoccupied and 533 unoccupied windows as occupied.',
        caption: 'Figure 8 from Mahmud et al. (2025), Journal of Building Engineering. Occupancy classification using appliances with at least 5% correlation to occupancy, where 1 is occupied and 0 is unoccupied.',
        credit: sourceArticle(cascadedDoi),
        licence: ccBy,
      },
    ],
  },
];
