import projectPathway from '../assets/research/wearable-foot-kinetics/project-pathway.png';
import kineticsExplainer from '../assets/research/wearable-foot-kinetics/kinematics-and-kinetics.png';
import ke2keGaitCycle from '../assets/research/wearable-foot-kinetics/ke2ke-fig5-gait-cycle.png';
import ke2keSensorLayout from '../assets/research/wearable-foot-kinetics/ke2ke-fig4-sensor-layout.png';
import km2knReconstruction from '../assets/research/wearable-foot-kinetics/km2kn-reconstruction.png';
import dasetComparison from '../assets/research/wearable-foot-kinetics/daset-unimodal-multimodal.png';
import kinenextReconstruction from '../assets/research/wearable-foot-kinetics/kinenext-reconstruction.png';
import anatomical8Regions from '../assets/research/wearable-foot-kinetics/anatomical8-regions.png';
import transferResults from '../assets/research/wearable-foot-kinetics/transfer-twente-to-lee.png';
import hardwareConcepts from '../assets/research/wearable-foot-kinetics/hardware-concepts.jpg';
import { ieee, sourceArticle } from './figure-credits';
import type { ResearchFigure, ResearchPhase, ResearchProject } from './research';

/** Full content for the AI-powered smart-insole project page, in the order of the project's progress report. */

const forum = { label: 'CENG Research Forum, October 2026' };
const report = { label: 'Unpublished project result, October 2026' };

export const smartInsoleVisual: NonNullable<ResearchProject['visual']> = {
  image: projectPathway,
  alt: 'Project pathway diagram. Smart-insole sensing, with distributed pressure sensors, IMUs and optional temperature sensing, and an instrumented treadmill as the laboratory reference feed data acquisition, synchronisation and preprocessing. That leads to AI model development, with Ke2Ke and Km2Kn as the foundation, DaSET, KineNeXt++ and KineFusionFormer as multimodal progress, and 3D forces, moments and centre of pressure as targets. The pathway continues to an app and visualisation layer and to system integration and deployment, ending in portable gait analysis and AI-estimated 3D plantar kinetics monitoring. A dashed box lists a potential imec contribution: sensor and readout electronics, embedded low-power hardware, prototype integration and scalable system realisation. Status labels note that AI modelling has progressed strongly and that the next phase is translation to an integrated, deployable system.',
  caption: 'Project pathway from smart-insole sensing and treadmill-referenced data to AI reconstruction, an application, and an integrated system for portable 3D plantar kinetics monitoring.',
  credit: { label: 'Project figure, November 2026' },
};

export const smartInsoleApproach = 'Instrumented treadmills measure the full set of foot–ground kinetics but are fixed and expensive, while smart insoles are portable but mainly record vertical loading. The project trains one-dimensional sequence-reconstruction models that estimate, for each foot, three ground reaction forces, three moments, and the anterior–posterior and mediolateral centre of pressure, which gives 16 waveforms for both feet. The inputs are insole pressure, wearable motion, or both. Every model is evaluated against instrumented-treadmill references with the test participants held out of training. Alongside the modelling, the team is developing the insole hardware and the application that will run the models. The sections below follow the project in order.';

export const smartInsoleWorkflow = ['Insole pressure and wearable motion', 'Reconstruct 16 kinetic waveforms', 'Compare with instrumented-treadmill references'];

export const smartInsoleApproachFigures: ResearchFigure[] = [
  {
    image: kineticsExplainer,
    alt: 'Two-part explainer. Left, kinematics: a walking sequence with hip, knee and ankle angles over stance and swing, and an example knee flexion curve over the gait cycle. Right, plantar kinetics: a foot with vertical, anterior–posterior and medial–lateral force axes, the three moments, and a centre-of-pressure path from heel to forefoot, with an example vertical force curve over the gait cycle.',
    caption: 'What the models estimate. Kinematics describe how the body moves. Plantar kinetics are the forces and moments at the foot–ground interface and the path of the centre of pressure. From Mahmud and Bensaali’s talk at the 4th CENG Research Forum (October 2026).',
    credit: forum,
  },
];

export const smartInsoleProgress: ResearchPhase[] = [
  {
    id: 'ke2ke',
    navLabel: 'Insole loading to 3D kinetics',
    title: 'Foundation: smart-insole loading to 3D kinetics',
    status: 'Published · IEEE Journal of Biomedical and Health Informatics, 2026',
    paragraphs: [
      'Ke2KeNet maps the 16 vertical-loading channels of each Moticon insole to eight treadmill-referenced waveforms per foot. Separate one-dimensional models were trained for each output and evaluated with five subject-independent folds on nine healthy participants walking and running on an instrumented treadmill.',
      'For the average gait cycles, Pearson correlation exceeded 0.95 for every output except the right-foot vertical moment, and the estimated vertical force was closer to the treadmill than the summed insole channels. A sensor-relevance analysis then reduced the layout from 16 to eight pressure locations per foot with broadly comparable accuracy, which now guides the prototype layout.',
    ],
    measures: [
      { value: '> 0.95', label: 'Average-cycle correlation, all outputs but one' },
      { value: '16 → 8', label: 'Pressure sensors per foot after layout analysis' },
      { value: '9', label: 'Healthy participants, five subject-independent folds' },
    ],
    figures: [
      {
        image: ke2keGaitCycle,
        alt: 'Two panels of gait-cycle curves, left foot above right. In (a), vertical force, the Ke2KeNet estimate follows the treadmill reference more closely than the summed insole signal through loading, midstance and unloading. In (b), mediolateral moment, the estimate captures the main peaks but departs from the reference during swing. Gait events such as heel strike, foot flat and toe off are labelled.',
        caption: 'Figure 5 from Mahmud et al. (2026). Phase-aligned treadmill reference, summed insole loading and Ke2KeNet estimates for one participant walking at 0.9–5.4 km/h: (a) vertical force and (b) mediolateral moment. Shading shows one standard deviation.',
        credit: sourceArticle('10.1109/jbhi.2025.3605296'),
        licence: ieee(2025),
      },
      {
        image: ke2keSensorLayout,
        alt: 'Insole maps showing which of the 16 Moticon sensor regions are relevant to each kinetic output, a consolidated layout with eight retained sensors per foot highlighted in green, and two variance-inflation matrices before and after channel reduction.',
        caption: 'Figure 4 from Mahmud et al. (2026). The 16-sensor Moticon layout, the sensing regions relevant to each kinetic output, the consolidated eight-sensor layout, and variance-inflation matrices before and after channel reduction.',
        credit: sourceArticle('10.1109/jbhi.2025.3605296'),
        licence: ieee(2025),
      },
    ],
  },
  {
    id: 'datasets',
    navLabel: 'Two public datasets',
    title: 'Harmonising two public gait datasets',
    status: 'Completed · 2026',
    paragraphs: [
      'The funded phase began by bringing two public gait datasets into one format. The University of Twente recordings are used for model development with participants held out. They cover nine adults with 16-cell Moticon insoles, eight Xsens IMUs and a Motek split-belt treadmill. The independent Lee and Lee dataset tests transfer to different equipment and protocols, with 12 adults, 99-cell Pedar insoles, 17 Xsens IMUs and an AMTI treadmill.',
      'Both datasets were filtered, resampled to 256 Hz and cut into four-second windows. The source participant, trial and signal validity are recorded for every window.',
    ],
  },
  {
    id: 'km2kn',
    navLabel: 'Kinematics only',
    title: 'Kinematics only: which body motion carries the kinetics?',
    status: 'Manuscript under revision',
    paragraphs: [
      'Km2Kn asked how much of the foot kinetics wearable motion capture can recover on its own, and which body region matters most. Of the pelvis, lumbar, hip, knee and ankle trajectories, the six bilateral ankle angles gave the best balance of accuracy and compactness. Using all 25 trajectories did not help consistently.',
      'With those six channels, Km2KnNet reached a mean correlation of 98.21% across the eight outputs on held-out participants. That was the highest of the six architectures compared. Removing its full-scale feature fusion caused the largest drop in the ablation study.',
    ],
    measures: [
      { value: '98.21%', label: 'Mean gait-cycle correlation across eight outputs' },
      { value: '6 of 25', label: 'Motion channels needed: bilateral ankle angles' },
    ],
    figures: [
      {
        image: km2knReconstruction,
        alt: 'Eight pairs of gait-cycle curves, one pair per kinetic output with the left foot above the right. The predicted means closely follow the treadmill means for the forces and centre of pressure, with larger gaps for some moments. Gait events are annotated.',
        caption: 'From the Km2Kn manuscript (Mahmud et al., under revision). Gait-cycle reconstructions of the eight outputs from bilateral ankle angles. Black is the treadmill mean and red the Km2KnNet mean, with one standard deviation shaded. The vertical-force panel also shows the insole-derived force in green.',
        credit: { label: 'Km2Kn manuscript, under revision' },
      },
    ],
  },
  {
    id: 'multimodal-benchmark',
    navLabel: 'Pressure, motion or both',
    title: 'Does combining pressure and motion help?',
    status: 'Conference paper under review',
    paragraphs: [
      'The first study of the funded phase compared kinematics-only, plantar-only and combined inputs with everything else fixed: the same presence-aware 1D U-Net, windows, outputs, training budget and held-out participants. The test set had 1,595 windows from nine participants.',
      'Combined input gave the highest correlation and the lowest normalised error for every output type. Across all 16 outputs, normalised RMSE fell to 13.55% for walking and 13.00% for running, which is 7.1% and 2.6% lower than the better single modality. Plantar loading carried vertical force and centre of pressure, while kinematics carried several shear-force and moment components. The vertical moment remained the hardest output.',
    ],
    measures: [
      { value: '13.55%', label: 'Walking NRMSE with combined input (7.1% lower)' },
      { value: '13.00%', label: 'Running NRMSE with combined input (2.6% lower)' },
      { value: '0.971', label: 'Vertical force correlation with combined input' },
    ],
    figures: [
      {
        image: dasetComparison,
        alt: 'Paired bar charts of RMSE and Pearson correlation for eight kinetic outputs with kinematics-only, plantar-only and multimodal input. Multimodal bars have the highest correlation for every output and the lowest RMSE for seven of eight, the exception being the mediolateral moment.',
        caption: 'Summary of the conference study from the CENG Research Forum talk (October 2026). RMSE (left) and Pearson correlation (right) for each output with kinematics-only, plantar-only and combined input. Bars show participant-balanced means and standard deviations.',
        credit: forum,
      },
    ],
  },
  {
    id: 'kinenext',
    navLabel: 'Reliability-aware fusion',
    title: 'KineNeXt++: reliability-aware fusion',
    status: 'In development · manuscript in preparation',
    paragraphs: [
      'KineNeXt++ gives kinematics and plantar loading separate temporal encoders and fuses them at several scales through a learned, presence-aware gate. The model can weigh each stream and keep working when one is missing. A nested decoder reconstructs all 16 bilateral outputs at once. For comparison, the pipeline also implements early fusion of the input channels and late averaging of single-modality predictions.',
      'In internal experiments on the Twente data with participants held out, the fused model’s average walking gait cycles correlated with the measured averages at 0.992 to 1.000 for all 16 outputs. These correlations compare average curves rather than individual windows. Controlled comparisons against the U-Net baseline are under way.',
    ],
    figures: [
      {
        image: kinenextReconstruction,
        alt: 'Sixteen panels of walking gait cycles: forces, moments and centre of pressure for each foot. The predicted mean curves, dashed orange, almost overlap the measured mean curves, solid blue, in every panel. Annotated mean-curve correlations range from 0.992 to 1.000.',
        caption: 'Preliminary KineNeXt++ reconstructions from the project’s October 2026 progress report. Walking gait cycles for all 16 outputs, pooled from participant-held-out folds of nine participants. Shading shows between-participant standard deviation, and r is the correlation between the two mean curves.',
        credit: report,
      },
    ],
  },
  {
    id: 'transfer',
    navLabel: 'Transfer across devices',
    title: 'Transferring to different insoles and sensors',
    status: 'Preliminary results · November 2026',
    paragraphs: [
      'Comparing datasets recorded with different equipment needs a shared input. The project defined two portable inputs. IMU4 is six ankle angles estimated from one foot IMU and one shank IMU per leg. Anatomical8 is eight regional pressures per foot that map both the 16-cell Moticon and the 99-cell Pedar insoles onto the same anatomical regions.',
      'Models trained on Twente were tested on ten held-out Lee and Lee participants. Forces transferred without retraining when regional pressures were included, with a correlation of 0.940 for Anatomical8. Moments did not transfer, staying below 0.2, because the two datasets define moments about different origins. Fine-tuning on one or two participants from the new dataset recovered most of the gap: correlation across all 12 compared outputs rose to 0.953–0.962 with regional pressure input and to 0.898 with IMU4 alone. Adapting only the output layers came within 0.011 of fine-tuning the whole model.',
    ],
    measures: [
      { value: '0.940', label: 'Force correlation without retraining (Anatomical8)' },
      { value: '0.962', label: 'Correlation after fine-tuning on two participants' },
    ],
    figures: [
      {
        image: anatomical8Regions,
        alt: 'Two insole maps. The 16-cell Moticon insole and the 99-cell Pedar insole are coloured by the same eight regions: heel, lateral and medial midfoot, fifth, second-to-fourth and first metatarsal regions, lesser toes, and hallux.',
        caption: 'Anatomical8 mapping of the 16 Moticon cells (A) and 99 Pedar cells (B) onto eight shared regions, from the project’s October 2026 progress report. Colours mark regions, not pressure.',
        credit: report,
      },
      {
        image: transferResults,
        alt: 'Three line charts of correlation on held-out Lee and Lee participants for IMU4, Anatomical8 and combined inputs, without retraining and after fine-tuning on one or two participants. For all 12 outputs and for moments, correlation rises steeply after fine-tuning. Forces stay high throughout for inputs that include regional pressure.',
        caption: 'Correlation on ten held-out Lee and Lee participants for models trained on Twente, without retraining (zero-shot) and after fine-tuning on one or two participants. The panels show all 12 compared outputs, forces and moments. From the project presentation of 11 November 2026.',
        credit: { label: 'Unpublished project result, November 2026' },
      },
    ],
  },
  {
    id: 'hardware',
    navLabel: 'Smart-insole hardware',
    title: 'Smart-insole hardware and sensor development',
    status: 'In progress · 2026',
    paragraphs: [
      'The wearable concept combines resistive plantar sensing with two IMUs per leg, one above the ankle and one on the foot. In the first design, an ankle strap carries the microcontroller and its battery, and the foot IMU sits on the laces. In the second, the microcontroller and foot IMU sit inside the shoe near the side wall. That shortens the sensor wiring while keeping an ankle-mounted power supply and shank IMU. Both designs wire the plantar sensor to the microcontroller. The insole’s channel count and placement will follow the earlier sensor-layout analysis.',
      'With the Qatar University Center for Advanced Materials, the team prepared carbon quantum dots (CQDs) from citric acid and urea by microwave heating and built a layered sensor. It has a silicone base, a lower aluminium-foil electrode, a CQD–silicone sensing layer, a perforated upper foil electrode and a silicone cover. Multimeter checks showed a small change in resistance under load, together with drift over time. Sensitivity, pressure range and repeatability have not yet been quantified.',
      'Next, moulded fabrication will standardise layer thickness and electrode overlap. Controlled loading and unloading will then measure response, hysteresis, recovery, drift and repeated-cycle stability. A measurement circuit and calibration are needed before the microcontroller can read the sensor. The planned electronics include wired and wireless WitMotion IMUs and Raspberry Pi Pico 2 W boards.',
    ],
    figures: [
      {
        image: hardwareConcepts,
        alt: 'Four panels. (a) A shoe with an ankle strap holding the electronics and battery, with the foot IMU on the laces. (b) A shoe with the electronics inside, near the side wall, and an ankle-mounted power supply. (c) A flow chart of the material preparation, from citric acid and urea through microwave treatment, dilution, ultrasonication and filtering, with a photograph of the solution fluorescing under UV light. (d) An exploded diagram of the layered sensor: silicone, aluminium-foil electrode, CQD–silicone sensing layer, perforated foil electrode and silicone cover.',
        caption: 'Wearable concepts and sensor development from the project’s October 2026 progress report: (a) ankle-mounted electronics, (b) electronics inside the shoe, (c) material preparation and UV inspection, and (d) the layered CQD–silicone sensor. Panels a, b and d are design illustrations. The photograph records qualitative fluorescence only.',
        credit: report,
      },
    ],
  },
  {
    id: 'integration',
    navLabel: 'Application and integration',
    title: 'Application and system integration',
    status: 'Requirements defined · implementation next',
    paragraphs: [
      'A mobile, web or desktop application will connect device configuration, synchronised recording, storage, reconstruction and waveform display. It will keep timestamps, sensor and foot identifiers, calibration information and data-quality flags. Recorded streams must follow the selected model’s channel definitions and preprocessing, including the portable IMU4 and Anatomical8 inputs.',
      'The first milestone is an offline or simulated-data demonstrator, followed by connection to the pressure and IMU hardware after bench verification. Integration tests will check synchronisation, missing-input handling, recording integrity and recovery from interrupted transmission. They will also time each step from window buffering and preprocessing through data transfer, inference and display.',
    ],
  },
];

export const smartInsoleNextSteps = 'Controlled comparisons will test KineNeXt++ and a transformer-based variant, KineFusionFormer, against the U-Net baseline, including how well each copes when sensor streams or channels drop out. On the hardware side, calibrated pressure sensing and readout electronics come next, followed by the application demonstrator. After the required ethics approvals, the integrated system will be validated against an instrumented treadmill in at least 30 healthy adults with Aspetar.';
