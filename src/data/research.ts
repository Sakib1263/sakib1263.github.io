import type { ImageMetadata } from 'astro';
import waveform from '../assets/insole-treadmill-waveform.png';
import renal from '../assets/renal-ct.png';
import sers from '../assets/sers-graphical-abstract.jpg';
import ramanComparison from '../assets/raman-before-after.jpg';
import insoleShare from '../assets/share/wearable-foot-kinetics.jpg';
import kidneyShare from '../assets/share/kidney-stone-segmentation.jpg';
import ramanShare from '../assets/share/cross-device-raman.jpg';
import { kinetics } from './kinetics';
import { ramanSource } from './raman';
import { thesisUrl } from './papers';

type ResearchLink = { label: string; href: string };

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
  visual?: {
    image: ImageMetadata;
    alt: string;
    caption: string;
    credit?: ResearchLink;
    chart?: { title: string; horizontalAxis: string; verticalAxis: string };
  };
};

export type Project = ResearchProject & { doi: string; code: string };

export const projects: Project[] = [
  {
    slug: kinetics.slug,
    area: 'Wearable biomechanics',
    title: 'Estimating 3D foot kinetics from wearable signals',
    summary: 'Estimating forces, moments, and centre of pressure from the vertical loads measured by smart insoles.',
    question: 'How much of the force and moment profile measured by an instrumented treadmill can be recovered from insole signals?',
    doi: '10.1109/jbhi.2025.3605296',
    code: kinetics.repository,
    approach: 'Ke2KeNet uses time series from 16 insole pressure sensors per foot. The study trained separate models for three force components, three moment components, and two centre-of-pressure coordinates, then compared the estimates with treadmill recordings across walking and running speeds.',
    result: 'For the average gait cycles in Table I, the reported Pearson correlation exceeded 0.95 for all target signals except the right-foot vertical moment.',
    measures: [
      { value: '9', label: 'Healthy participants in cross-validation' },
      { value: '5', label: 'Subject-independent folds' },
      { value: '8', label: 'Estimated signals per foot' },
    ],
    contribution: 'I led preprocessing, model development, subject- and speed-wise evaluation, analysis, and manuscript preparation.',
    evidence: {
      label: 'Wearable foot kinetics',
      role: 'I led model development and evaluation against an instrumented treadmill.',
      finding: 'In nine healthy participants, average-cycle correlations exceeded 0.95 for all targets except the right-foot vertical moment.',
      shareImage: insoleShare,
    },
    scope: 'The results come from nine healthy participants under controlled treadmill conditions. The plot illustrates one participant’s walking trials and shows where the estimated moment departs from the reference.',
    ongoing: 'I’m investigating how to combine plantar sensing with inertial measurements from the foot and shank, and how well models transfer across datasets.',
    workflow: ['Smart-insole pressure signals', 'Estimated forces and moments', 'Comparison with treadmill measurements'],
    related: ['10.1007/s00521-023-09081-z', '10.3390/s22197599'],
    relatedProjects: ['multimodal-wearable-kinetics', 'kinematics-to-3d-kinetics'],
    visual: {
      image: waveform,
      alt: 'The estimated moment is above the treadmill mean for most of the right-foot walking cycle, with the largest separation around the middle of the cycle.',
      caption: 'Participant 10, right foot, walking at 0.9–5.4 km/h. The black line is the treadmill mean and the red line is the Ke2KeNet estimate. Shading shows one standard deviation on either side of each mean. This example comes from the archived analysis for Figure 5b and shows a visible mid-cycle discrepancy.',
      chart: { title: 'Mediolateral ground reaction moment', horizontalAxis: 'Gait cycle (%)', verticalAxis: 'Normalized amplitude (unitless)' },
      credit: { label: 'Archived analysis notebook', href: 'https://github.com/Sakib1263/Unimodal-3D-Kinetics-Estimation-from-Insole-or-IMU/blob/2ffdb67e685e50068f79dfad37a7e26693e6a5ea/Combined_Insole_to_GRFM.ipynb' },
    },
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
    result: 'Table 7 shows the effect of adding the two-stage slice selection to the same KSSNet segmentation model.',
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
      image: renal,
      alt: 'Axial abdominal CT slice with a class activation overlay.',
      caption: 'A class-activation map from the study repository. The overlay highlights regions that influenced the slice classifier.',
      credit: { label: 'Image source', href: 'https://github.com/Sakib1263/Kidney-Stone-Segmentation/blob/main/Instance-Classification/cam_output.png' },
    },
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
    result: 'Classification accuracy increased after transformation for all four portable devices in Table 5. The largest gains were for Enwave and Rapid ID.',
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
      credit: { label: 'CC BY 4.0', href: 'https://creativecommons.org/licenses/by/4.0/' },
    },
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
    result: 'Table 5 reports the following mean absolute errors for the combined waveform and pressure estimation pipeline on the UCI waveform benchmark.',
    measures: [
      { value: '2.63 mmHg', label: 'Systolic pressure error' },
      { value: '1.09 mmHg', label: 'Diastolic pressure error' },
      { value: '2.37 mmHg', label: 'Mean arterial pressure error' },
    ],
    contribution: 'I led data preparation, implementation, experiments, analysis, visualization, and manuscript preparation.',
    scope: 'These errors come from retrospective evaluation on intensive-care waveform records. The partition kept records from the same patient together.',
    related: ['10.1007/s00521-025-11327-x', '10.3390/bioengineering9110692', '10.3390/s22030919', '10.3390/bioengineering9100558'],
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
    result: 'The paper reports a 92.1% Dice score for kidney segmentation. For five-grade classification with segmented views, Table 3 reports 93.9% subject-level accuracy and an 89.0% F1 score. The two tasks were evaluated separately.',
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
