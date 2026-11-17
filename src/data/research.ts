import type { ImageMetadata } from 'astro';
import kineticsFramework from '../assets/research/wearable-foot-kinetics/project-framework.png';
import kineticsExplainer from '../assets/research/wearable-foot-kinetics/kinematics-and-kinetics.png';
import ke2keGaitCycle from '../assets/research/wearable-foot-kinetics/ke2ke-fig5-gait-cycle.png';
import ke2keSensorLayout from '../assets/research/wearable-foot-kinetics/ke2ke-fig4-sensor-layout.png';
import km2knReconstruction from '../assets/research/wearable-foot-kinetics/km2kn-reconstruction.png';
import dasetComparison from '../assets/research/wearable-foot-kinetics/daset-unimodal-multimodal.png';
import kinenextReconstruction from '../assets/research/wearable-foot-kinetics/kinenext-reconstruction.png';
import anatomical8Regions from '../assets/research/wearable-foot-kinetics/anatomical8-regions.png';
import transferResults from '../assets/research/wearable-foot-kinetics/transfer-twente-to-lee.png';
import renal from '../assets/renal-ct.png';
import sers from '../assets/sers-graphical-abstract.jpg';
import ramanComparison from '../assets/raman-before-after.jpg';
import insoleShare from '../assets/share/wearable-foot-kinetics.jpg';
import kidneyShare from '../assets/share/kidney-stone-segmentation.jpg';
import ramanShare from '../assets/share/cross-device-raman.jpg';
import ramanCard from '../assets/research/cross-device-raman/card-enwave-rid.jpg';
import ramanBenchmarks from '../assets/research/cross-device-raman/fig6-r2-benchmarks.png';
import kidneyFramework from '../assets/research/kidney-stone-segmentation/fig1-framework.png';
import nabnetWaveforms from '../assets/research/nabnet/fig7a-waveforms.png';
import nabnetPipeline from '../assets/research/nabnet/fig1-pipeline.png';
import nabnetAgreement from '../assets/research/nabnet/fig5-map-agreement.png';
import ahnGrades from '../assets/research/prenatal-hydronephrosis/fig3-sfu-grades.jpg';
import ahnSegmentation from '../assets/research/prenatal-hydronephrosis/fig6-segmentation.jpg';
import { ccBy, elsevier, ieee, sourceArticle } from './figure-credits';
import { kinetics } from './kinetics';
import { ramanSource } from './raman';
import { thesisUrl } from './papers';

type ResearchLink = { label: string; href: string };

/** Reuse terms shown beside a figure, such as CC BY 4.0 or a publisher copyright line. */
export type FigureLicence = { label: string; href?: string };

/** Where a figure comes from. Unpublished project material has a label but no link. */
export type FigureCredit = { label: string; href?: string };

/** A figure from a paper, repository or project material. The caption names the figure, its authors and any changes made. */
export type ResearchFigure = {
  image: ImageMetadata;
  alt: string;
  caption: string;
  credit: FigureCredit;
  licence?: FigureLicence;
};

/** One stage of a running project, shown as its own section in project order. */
export type ResearchPhase = {
  id: string;
  /** Short label for the "On this page" list. */
  navLabel: string;
  title: string;
  /** Publication or development status, such as "Published · …" or "Manuscript under revision". */
  status: string;
  paragraphs: string[];
  measures?: { value: string; label: string }[];
  figures?: ResearchFigure[];
};

export type ResearchProject = {
  slug: string;
  area: string;
  title: string;
  summary: string;
  question?: string;
  doi?: string;
  code?: string;
  period?: string;
  status?: string;
  context?: string;
  approach: string;
  result?: string;
  measures?: { value: string; label: string }[];
  contribution: string;
  evidence?: { label: string; role: string; finding: string; shareImage: ImageMetadata };
  scope?: string;
  ongoing?: string;
  workflow?: string[];
  illustratedExample?: boolean;
  related?: string[];
  relatedProjects?: string[];
  resources?: ResearchLink[];
  resultVisual?: { image: ImageMetadata; alt: string; caption: string; source: ResearchLink; mobileColumns?: [string, string] };
  /** The display figure: shown first on the project page, on homepage cards and as the share image. */
  visual?: {
    image: ImageMetadata;
    alt: string;
    caption: string;
    credit?: FigureCredit;
    licence?: FigureLicence;
    /** A crop for the wide homepage card when the full figure is too detailed at that size. */
    card?: { image: ImageMetadata; alt: string };
  };
  /** Further figures, placed in the Approach or Reported results section. */
  figures?: (ResearchFigure & { section: 'approach' | 'results' })[];
  /** Stages of a running project, rendered after the approach in this order. */
  progress?: ResearchPhase[];
};

export type Project = ResearchProject & { doi: string; code: string };

export const projects: Project[] = [
  {
    slug: kinetics.slug,
    area: 'Wearable biomechanics',
    title: 'Estimating 3D foot kinetics from wearable signals',
    summary: 'Reconstructing 3D forces, moments, and centre of pressure from smart-insole loading and wearable motion sensors.',
    question: 'How much of the 3D force, moment, and centre-of-pressure profile measured by an instrumented treadmill can smart insoles and wearable motion sensors recover?',
    doi: '10.1109/jbhi.2025.3605296',
    code: kinetics.repository,
    status: 'Ongoing research',
    context: 'Qatar University Collaborative Grant with Aspetar, building on the published Ke2Ke study',
    period: '2023–present',
    approach: 'Instrumented treadmills measure the full set of foot–ground kinetics but are fixed and expensive, while smart insoles are portable but mainly record vertical loading. The project trains one-dimensional sequence-reconstruction models that estimate, for each foot, three ground reaction forces, three moments, and the anterior–posterior and mediolateral centre of pressure, which gives 16 waveforms for both feet. The inputs are insole pressure, wearable motion, or both. Every model is evaluated against instrumented-treadmill references with the test participants held out of training. The sections below follow the project in order, from the published insole study to the current fusion and transfer experiments.',
    contribution: 'I lead the project’s modelling work, from the published Ke2Ke study to the current fusion and transfer experiments. This covers preprocessing and harmonising the public datasets, developing Ke2KeNet, Km2KnNet and KineNeXt++, designing the participant-held-out evaluations, and preparing the manuscripts. The wider team is developing the sensing hardware and application.',
    evidence: {
      label: 'Wearable foot kinetics',
      role: 'I lead the modelling work, from the published insole study to multimodal fusion and cross-device transfer.',
      finding: 'In nine healthy participants, average-cycle correlations exceeded 0.95 for all targets except the right-foot vertical moment.',
      shareImage: insoleShare,
    },
    scope: 'Results so far come from public recordings of healthy adults on instrumented treadmills, with test participants held out. The studies report different metrics: Km2Kn and Ke2Ke correlate gait-cycle waveforms, while the conference study scores four-second windows. Numbers are therefore comparable within a study rather than across studies. The integrated wearable prototype has not yet been validated.',
    ongoing: 'Controlled comparisons will test KineNeXt++ and a transformer-based variant, KineFusionFormer, against the U-Net baseline, including how well each copes when sensor streams or channels drop out. The team has drafted two wearable layouts that pair an instrumented insole with a foot and a shank IMU on each leg, and has fabricated a first pressure-sensing element. Its calibration, repeatability and readout electronics come next, followed by an application for synchronised recording, reconstruction and display. After the required ethics approvals, the integrated system will be validated against an instrumented treadmill in at least 30 healthy adults with Aspetar.',
    workflow: ['Insole pressure and wearable motion', 'Reconstruct 16 kinetic waveforms', 'Compare with instrumented-treadmill references'],
    related: ['10.1007/s00521-023-09081-z', '10.3390/s22197599'],
    relatedProjects: ['multimodal-wearable-kinetics', 'kinematics-to-3d-kinetics'],
    visual: {
      image: kineticsFramework,
      alt: 'Overview diagram. Kinematics-only input from 25 Xsens-derived channels, plantar-only input from 16 insole channels per foot, and multimodal input combining both feed a common 1D reconstruction model. The model outputs bilateral 3D ground reaction forces, 3D moments and two centre-of-pressure coordinates per foot. A footer lists nine healthy adults, six walking and three running speeds, 256 Hz signals, four-second windows and held-out subjects.',
      caption: 'Project overview from Mahmud and Bensaali’s talk at the 4th CENG Research Forum (October 2026). Wearable motion, insole loading or both are reconstructed into bilateral 3D forces, moments and centre-of-pressure trajectories.',
      credit: { label: 'CENG Research Forum, October 2026' },
    },
    figures: [
      {
        section: 'approach',
        image: kineticsExplainer,
        alt: 'Two-part explainer. Left, kinematics: a walking sequence with hip, knee and ankle angles over stance and swing, and an example knee flexion curve over the gait cycle. Right, plantar kinetics: a foot with vertical, anterior–posterior and medial–lateral force axes, the three moments, and a centre-of-pressure path from heel to forefoot, with an example vertical force curve over the gait cycle.',
        caption: 'What the models estimate. Kinematics describe how the body moves. Plantar kinetics are the forces and moments at the foot–ground interface and the path of the centre of pressure. From the CENG Research Forum talk (October 2026).',
        credit: { label: 'CENG Research Forum, October 2026' },
      },
    ],
    progress: [
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
            credit: { label: 'CENG Research Forum, October 2026' },
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
            credit: { label: 'Unpublished project result, October 2026' },
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
            credit: { label: 'Unpublished project result, October 2026' },
          },
          {
            image: transferResults,
            alt: 'Three line charts of correlation on held-out Lee and Lee participants for IMU4, Anatomical8 and combined inputs, without retraining and after fine-tuning on one or two participants. For all 12 outputs and for moments, correlation rises steeply after fine-tuning. Forces stay high throughout for inputs that include regional pressure.',
            caption: 'Correlation on ten held-out Lee and Lee participants for models trained on Twente, without retraining (zero-shot) and after fine-tuning on one or two participants. The panels show all 12 compared outputs, forces and moments. From the project presentation of 11 November 2026.',
            credit: { label: 'Unpublished project result, November 2026' },
          },
        ],
      },
    ],
  },
  {
    slug: 'kidney-stone-segmentation',
    area: 'Medical imaging',
    title: 'Kidney stone segmentation in CT',
    summary: 'Finding the CT slices most likely to contain kidney stones before tracing their boundaries.',
    question: 'Can a model delineate small kidney stones more accurately by narrowing the search before segmentation?',
    doi: '10.1016/j.bspc.2026.109894',
    code: 'https://github.com/Sakib1263/Kidney-Stone-Segmentation',
    approach: 'Two classifiers first identify kidney-containing slices and then stone-containing slices. The kidney stone segmentation network, KSSNet, processes the selected images and reuses features learned from kidney tissue segmentation.',
    result: 'Slice selection improved the same KSSNet model. Its stone Dice score rose from 90.13% without scope reduction to 93.10% with kidney-slice selection only and 97.44% with both stages. The slice classifier reached an overall F1 score of 94.45%.',
    measures: [
      { value: '97.44%', label: 'Dice with full scope reduction' },
      { value: '90.13%', label: 'Dice without scope reduction' },
      { value: '259', label: 'Subjects in the source CT cohort' },
    ],
    contribution: 'I designed the successive scope-reduction and feature-transfer approach and led model development, experiments, analysis, and manuscript preparation.',
    evidence: {
      label: 'Kidney stone segmentation',
      role: 'I designed the slice-selection and feature-transfer methods and led evaluation.',
      finding: 'In the single-hospital CT cohort, KSSNet reached 97.44% Dice with full slice selection and 90.13% without it.',
      shareImage: kidneyShare,
    },
    workflow: ['Identify kidney-containing CT slices', 'Select slices containing stones', 'Trace the stone boundary with KSSNet'],
    scope: 'The five folds separate subjects. The scans came from a single hospital, so the reported scores describe that cohort and protocol.',
    related: ['10.3390/cancers15123189', '10.1016/j.eswa.2024.124594'],
    relatedProjects: ['renal-tumour-modelling', 'prenatal-hydronephrosis'],
    visual: {
      image: kidneyFramework,
      alt: 'Pipeline diagram. Abdominal CT volumes are preprocessed, a classifier keeps the slices that contain kidney, a second classifier keeps the slices that contain stones, and a segmentation model outlines the kidney and stones on the remaining slices.',
      caption: 'Figure 1 from Mahmud et al. (2026). Preprocessed CT slices pass through two successive classifiers, which keep kidney slices and then stone slices, before KSSNet segments the remaining slices. Green arrows mark features transferred between the stages.',
      credit: sourceArticle('10.1016/j.bspc.2026.109894'),
      licence: elsevier(2026),
    },
    figures: [
      {
        section: 'approach',
        image: renal,
        alt: 'Axial abdominal CT slice with a class activation overlay.',
        caption: 'A class-activation map from the study repository. The overlay highlights regions that influenced the slice classifier.',
        credit: { label: 'Image source', href: 'https://github.com/Sakib1263/Kidney-Stone-Segmentation/blob/main/Instance-Classification/cam_output.png' },
      },
    ],
  },
  {
    slug: ramanSource.slug,
    area: 'Spectroscopic sensing',
    title: 'Cross-device Raman spectroscopy',
    summary: 'Aligning spectra from portable Raman instruments to a laboratory reference for bacterial analyte classification.',
    question: 'Can spectra recorded on different instruments support more consistent recognition of the same analyte classes?',
    doi: '10.1016/j.saa.2025.126931',
    code: ramanSource.repository,
    context: 'Qatar University · Qatar National Research Fund-supported bacterial diagnostics research',
    approach: 'SERS-D2DNet transforms spectra from four portable devices toward a Renishaw reference. The study then uses SuperRaman to classify the original and transformed spectra across 20 analyte classes, using 50 spectra per class to train the classifiers.',
    result: 'Classification accuracy increased after transformation for all four portable devices, with the largest gains for Enwave and Rapid ID. The transformed spectra also matched the reference more closely than the outputs of five benchmark sequence-to-sequence models, with R² between 98.80% and 99.57%.',
    measures: [
      { value: '97.58% → 99.98%', label: 'Enwave accuracy' },
      { value: '96.54% → 98.87%', label: 'Rapid ID accuracy' },
    ],
    contribution: 'I led the modelling and evaluation of the spectral transformation and recognition workflow, including implementation, generalization analysis, visualization, and writing.',
    evidence: {
      label: 'Cross-device Raman spectroscopy',
      role: 'I led development and evaluation of the spectral alignment and classification workflow.',
      finding: 'Alignment improved classification for all four portable instruments on the prepared analyte dataset. Enwave accuracy rose from 97.58% to 99.98%.',
      shareImage: ramanShare,
    },
    scope: 'The study used prepared analytes across five instruments, including the laboratory reference. The reported comparisons apply to those samples and acquisition conditions. The Zenodo record explains how to request the restricted files.',
    related: ['10.1016/j.talanta.2026.130241', '10.1016/j.talanta.2025.129332'],
    relatedProjects: ['generalizable-microbial-sers', 'microbial-sers-validation'],
    resultVisual: {
      image: ramanComparison,
      alt: 'Four panels compare the original and transformed mean spectra with the Renishaw reference. Shaded bands show one standard deviation.',
      mobileColumns: ['Enwave and Rapid ID', 'Tec5 and First Defender'],
      caption: 'Figure 4a from Mahmud et al. (2026), cropped to the four device-level comparisons. After transformation, the mean spectra follow the Renishaw reference more closely in these comparisons. Green shows the original spectra, red the transformed spectra, and black the reference. Shading shows one standard deviation. Raman shift in cm⁻¹. CC BY 4.0.',
      source: { label: 'Published figure and license', href: 'https://manara.qnl.qa/articles/journal_contribution/Deep_learning-based_cross-device_standardization_of_surface-enhanced_Raman_spectroscopy_for_enhanced_bacterial_recognition/30664580' },
    },
    visual: {
      image: sers,
      alt: 'Graphical abstract showing spectra from portable and reference Raman instruments, device transformation, and bacterial classification.',
      caption: 'Graphical abstract by Mahmud et al., Spectrochimica Acta Part A (2026). Reproduced under CC BY 4.0.',
      credit: sourceArticle('10.1016/j.saa.2025.126931'),
      licence: ccBy,
      card: {
        image: ramanCard,
        alt: 'Mean Raman spectra from the Enwave and Rapid ID instruments before and after transformation, overlaid on the laboratory reference. The transformed spectra follow the reference peaks closely.',
      },
    },
    figures: [
      {
        section: 'results',
        image: ramanBenchmarks,
        alt: 'Bar chart of R² between transformed and reference spectra for four portable devices. For every device, SERS-D2DNet has the highest bar, between 98.80% and 99.57%, above FPN, U-Net, U-Net++, UNet3+ and MultiResUNet. The untransformed spectra score between 63.97% and 87.99%.',
        caption: 'Figure 6 from Mahmud et al. (2026). R² between transformed and reference spectra for SERS-D2DNet and five benchmark sequence-to-sequence models. The black bars compare the untransformed portable spectra with the reference.',
        credit: sourceArticle('10.1016/j.saa.2025.126931'),
        licence: ccBy,
      },
    ],
  },
  {
    slug: 'nabnet',
    area: 'Physiological signal processing',
    title: 'Blood pressure waveform modelling with NABNet',
    summary: 'Reconstructing arterial pressure waveforms from optical pulse and ECG signals, then estimating systolic, diastolic, and mean pressure.',
    question: 'How accurately can arterial pressure waveforms and their pressure components be estimated from synchronized PPG and ECG?',
    doi: '10.1016/j.bspc.2022.104247',
    code: 'https://github.com/Sakib1263/NABNet',
    approach: 'The nested attention-guided BiConvLSTM reconstructs an arterial blood pressure waveform from photoplethysmography and electrocardiography. A component estimation stage supplies pressure values used to recover the waveform scale.',
    result: 'On the UCI waveform benchmark, the combined waveform and pressure pipeline estimated systolic, diastolic and mean arterial pressure with the following mean absolute errors.',
    measures: [
      { value: '2.63 mmHg', label: 'Systolic pressure error' },
      { value: '1.09 mmHg', label: 'Diastolic pressure error' },
      { value: '2.37 mmHg', label: 'Mean arterial pressure error' },
    ],
    contribution: 'I led data preparation, implementation, experiments, analysis, visualization, and manuscript preparation.',
    scope: 'These errors come from retrospective evaluation on intensive-care waveform records. The partition kept records from the same patient together.',
    related: ['10.1007/s00521-025-11327-x', '10.3390/bioengineering9110692', '10.3390/s22030919', '10.3390/bioengineering9100558'],
    visual: {
      image: nabnetWaveforms,
      alt: 'Three stacked signals over about 1,000 samples: a normalised PPG, a normalised ECG, and arterial blood pressure between about 75 and 115 mmHg. The estimated pressure waveform closely follows the measured one.',
      caption: 'Figure 7a from Mahmud et al. (2023), cropped to one example. NABNet estimated the arterial pressure waveform (red) from the PPG and ECG inputs above it. Blue shows the measured arterial pressure.',
      credit: sourceArticle('10.1016/j.bspc.2022.104247'),
      licence: elsevier(2022),
    },
    figures: [
      {
        section: 'approach',
        image: nabnetPipeline,
        alt: 'Flowchart. One to four input channels, drawn from PPG, its derivatives and ECG, train a 1D segmentation network that predicts a normalised arterial pressure waveform. Systolic and diastolic values from a separate prediction pipeline rescale the waveform before evaluation.',
        caption: 'Figure 1 from Mahmud et al. (2023). A segmentation network estimates the normalised pressure waveform from one to four input channels. Systolic and diastolic estimates from a separate pipeline restore its scale.',
        credit: sourceArticle('10.1016/j.bspc.2022.104247'),
        licence: elsevier(2022),
      },
      {
        section: 'results',
        image: nabnetAgreement,
        alt: 'Left: scatter plot of estimated against measured mean arterial pressure from about 60 to 140 mmHg, clustered along the identity line. Right: Bland–Altman plot with most differences in a narrow band around zero.',
        caption: 'Figure 5 from Mahmud et al. (2023). (a) Regression and (b) Bland–Altman plots for the mean arterial pressure estimates.',
        credit: sourceArticle('10.1016/j.bspc.2022.104247'),
        licence: elsevier(2022),
      },
    ],
  },
  {
    slug: 'prenatal-hydronephrosis',
    area: 'Medical imaging',
    title: 'Grading prenatal hydronephrosis from ultrasound',
    summary: 'Combining multiple fetal kidney ultrasound views into one severity grade, with the kidney outlined before classification.',
    question: 'Can a pipeline use segmented kidneys across several ultrasound views to estimate a subject-level severity grade?',
    doi: '10.1016/j.eswa.2024.124594',
    code: 'https://github.com/Sakib1263/AHN-Severity-Stratification',
    period: '2022–2023',
    context: 'Hamad Medical Corporation, Sidra Medicine and Qatar University',
    approach: 'The study collected ultrasound images from 164 subjects. After curation, 2,062 images from 163 subjects were annotated for the kidney region. The workflow locates the region, outlines it with KUSNet, and predicts one of five severity grades with PHCNet. Weighted voting combines grades across ultrasound views at the subject level.',
    result: 'KUSNet segmented the kidney with a 92.1% Dice score. With segmented views, five-grade classification reached 93.9% subject-level accuracy and an 89.0% F1 score. The two tasks were evaluated separately.',
    measures: [
      { value: '92.1%', label: 'Kidney segmentation Dice' },
      { value: '93.9%', label: 'Subject-level grading accuracy' },
      { value: '163', label: 'Subjects in the curated cohort' },
    ],
    contribution: 'I contributed to study design and data curation, developed the methods and software, and wrote the original draft with the research team.',
    scope: 'Segmentation and grading used five subject-independent folds on the retrospective QU–HMC–AHN cohort. The earlier region-detection stage used a separate two-fold evaluation. Reported grading performance reflects the curated views and reference grades in that cohort.',
    illustratedExample: true,
    resources: [{ label: 'Related MSc thesis', href: thesisUrl }],
    related: ['10.1016/j.bspc.2026.109894', '10.3390/cancers15123189'],
    visual: {
      image: ahnGrades,
      alt: 'Five fetal kidney ultrasound images, one for each severity grade from SFU 0 to SFU IV, each shown above its annotated kidney region. The dark, fluid-filled area inside the kidney is larger at higher grades.',
      caption: 'Figure 3 from Mahmud et al. (2024). Ultrasound views from five antenatal subjects, one for each Society for Fetal Urology grade, shown above the annotated kidney regions used for grading.',
      credit: sourceArticle('10.1016/j.eswa.2024.124594'),
      licence: elsevier(2024),
    },
    figures: [
      {
        section: 'results',
        image: ahnSegmentation,
        alt: 'Grid of twelve kidney ultrasound views with the ground-truth kidney mask and the masks predicted by UNet++, UNet3+ and KUSNet beneath each view.',
        caption: 'Figure 6 from Mahmud et al. (2024). Kidney masks predicted by UNet++, UNet3+ and KUSNet, compared with the ground truth for twelve ultrasound views (columns a–l).',
        credit: sourceArticle('10.1016/j.eswa.2024.124594'),
        licence: elsevier(2024),
      },
    ],
  },
];

function projectFor(slug: string) {
  const project = projects.find(candidate => candidate.slug === slug);
  if (!project) throw new Error(`Unknown featured project: ${slug}`);
  return project;
}

export const featuredProjects = ['wearable-foot-kinetics', 'prenatal-hydronephrosis', 'cross-device-raman'].map(projectFor);
export const caseStudyProjects = ['wearable-foot-kinetics', 'kidney-stone-segmentation', 'cross-device-raman'].map(projectFor);

export const currentResearch = [
  {
    area: 'Wearable biomechanics',
    title: 'Combining pressure and motion to estimate gait forces',
    description: 'I am testing whether combining insole pressures with foot and shank motion improves gait force estimates across participants and recording setups.',
    project: 'multimodal-wearable-kinetics',
  },
  {
    area: 'Medical imaging',
    title: 'Segmenting liver and tumours across CT contrast phases',
    description: 'I am adapting segmentation models for liver CT and studying how different contrast phases contribute to tumour delineation across cohorts.',
    project: 'multiphase-liver-ct',
  },
];
