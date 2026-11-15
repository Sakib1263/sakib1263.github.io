import type { ImageMetadata } from 'astro';
import wearables from '../assets/wearable-imu.png';
import renal from '../assets/renal-ct.png';
import sers from '../assets/sers-graphical-abstract.jpg';

type ResearchLink = { label: string; href: string };

export type Project = {
  slug: string;
  area: string;
  title: string;
  summary: string;
  question: string;
  doi: string;
  code: string;
  approach: string;
  result: string;
  measures: { value: string; label: string }[];
  contribution: string;
  scope: string;
  related: string[];
  resources?: ResearchLink[];
  visual?: {
    image: ImageMetadata;
    alt: string;
    caption: string;
    credit?: ResearchLink;
  };
};

export const projects: Project[] = [
  {
    slug: 'wearable-foot-kinetics',
    area: 'Wearable biomechanics',
    title: 'Estimating 3D foot kinetics from wearable signals',
    summary: 'Estimating forces, moments, and centre of pressure from the vertical loads measured by smart insoles.',
    question: 'How much of the force and moment profile measured by an instrumented treadmill can be recovered from insole signals?',
    doi: '10.1109/jbhi.2025.3605296',
    code: 'https://github.com/Sakib1263/Unimodal-3D-Kinetics-Estimation-from-Insole-or-IMU',
    approach: 'Ke2KeNet uses time series from 16 insole sensors per foot to estimate three force components, three moment components, and two centre-of-pressure coordinates. The study compared estimated waveforms with instrumented treadmill recordings across walking and running speeds.',
    result: 'For the average gait cycles in Table I, the reported Pearson correlation exceeded 0.95 for all target signals except the right-foot vertical moment.',
    measures: [
      { value: '9', label: 'Healthy participants in cross-validation' },
      { value: '5', label: 'Subject-independent folds' },
      { value: '8', label: 'Estimated signals per foot' },
    ],
    contribution: 'I led preprocessing, model development, subject- and speed-wise evaluation, analysis, and manuscript preparation.',
    scope: 'The results come from a small healthy cohort under controlled treadmill conditions. Ongoing work investigates combining plantar sensing with foot and shank inertial measurements and evaluating transfer across datasets.',
    related: ['10.1007/s00521-023-09081-z', '10.3390/s22197599'],
    visual: {
      image: wearables,
      alt: 'Side view of a shoe and lower leg with inertial sensors on the instep and shank.',
      caption: 'Conceptual sensor placement for ongoing IMU work. The published Ke2KeNet experiment used smart-insole signals.',
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
    scope: 'The five folds separate subjects. The scans came from a single hospital, so the reported scores describe that cohort and protocol.',
    related: ['10.3390/cancers15123189', '10.1016/j.eswa.2024.124594'],
    visual: {
      image: renal,
      alt: 'Axial abdominal CT slice with a class activation overlay.',
      caption: 'A class-activation map from the study repository. The overlay highlights regions that influenced the slice classifier.',
      credit: { label: 'Image source', href: 'https://github.com/Sakib1263/Kidney-Stone-Segmentation/blob/main/Instance-Classification/cam_output.png' },
    },
  },
  {
    slug: 'cross-device-raman',
    area: 'Spectroscopic sensing',
    title: 'Cross-device Raman spectroscopy',
    summary: 'Aligning spectra from portable Raman instruments to a laboratory reference for bacterial analyte classification.',
    question: 'Can spectra recorded on different instruments support more consistent recognition of the same analyte classes?',
    doi: '10.1016/j.saa.2025.126931',
    code: 'https://github.com/Sakib1263/SERS-D2DNet-SuperRaman',
    approach: 'SERS-D2DNet transforms spectra from four portable devices toward a Renishaw reference. The study then uses SuperRaman to classify the original and transformed spectra across 20 analyte classes, using 50 spectra per class to train the classifiers.',
    result: 'Classification accuracy increased after transformation for all four portable devices in Table 5. The largest gains were for Enwave and Rapid ID.',
    measures: [
      { value: '97.58% → 99.98%', label: 'Enwave accuracy' },
      { value: '96.54% → 98.87%', label: 'Rapid ID accuracy' },
    ],
    contribution: 'I led the modelling and evaluation of the spectral transformation and recognition workflow, including implementation, generalization analysis, visualization, and writing.',
    scope: 'These comparisons cover the analytes and acquisition conditions tested in the study. The Zenodo record describes the dataset and how to request access to the restricted files.',
    related: ['10.1016/j.talanta.2026.130241', '10.1016/j.talanta.2025.129332'],
    resources: [{ label: 'Dataset record', href: 'https://zenodo.org/records/23372983' }],
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
    related: ['10.1007/s00521-025-11327-x', '10.3390/bioengineering9110692'],
  },
  {
    slug: 'prenatal-hydronephrosis',
    area: 'Medical imaging',
    title: 'Grading prenatal hydronephrosis from ultrasound',
    summary: 'Localizing and segmenting fetal kidneys on ultrasound, then combining image-level predictions into a severity grade per subject.',
    question: 'Can a pipeline use segmented kidneys across several ultrasound views to estimate a subject-level severity grade?',
    doi: '10.1016/j.eswa.2024.124594',
    code: 'https://github.com/Sakib1263/AHN-Severity-Stratification',
    approach: 'The workflow locates the kidney region, segments the kidney with KUSNet, and predicts a severity class with PHCNet. Weighted voting combines predictions from multiple ultrasound views into a subject-level result.',
    result: 'The study evaluated segmentation and severity grading separately. For multiclass grading, the reported subject-level F1 score was 89.0%.',
    measures: [
      { value: '92.1%', label: 'Kidney segmentation Dice' },
      { value: '93.9%', label: 'Subject-level grading accuracy' },
      { value: '163', label: 'Subjects in the curated cohort' },
    ],
    contribution: 'I contributed to study design and data curation, developed the methods and software, and wrote the original draft with the research team.',
    scope: 'The study used the retrospective QU–HMC–AHN cohort. Reported performance reflects the curated images, reference grades, and evaluation described in the paper.',
    related: ['10.1016/j.bspc.2026.109894', '10.3390/cancers15123189'],
  },
];

export const featuredProjects = projects.filter(project => project.visual);
