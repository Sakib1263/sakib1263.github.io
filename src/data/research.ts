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
  doi: string;
  code: string;
  approach: string;
  contribution: string;
  scope: string;
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
    summary: 'Reconstructing ground reaction forces, moments, and centre of pressure from distributed smart-insole measurements.',
    doi: '10.1109/jbhi.2025.3605296',
    code: 'https://github.com/Sakib1263/Unimodal-3D-Kinetics-Estimation-from-Insole-or-IMU',
    approach: 'The published study uses spatially distributed vertical ground reaction forces from smart insoles to estimate three-dimensional foot kinetics. Its one-dimensional domain transformation maps insole time series to forces, moments, and centre of pressure measured by an instrumented treadmill.',
    contribution: 'I led preprocessing, model development, evaluation across participants and walking speeds, analysis, and manuscript preparation.',
    scope: 'The publication reports the unimodal insole study. Ongoing work examines foot and shank inertial measurements and ways to combine them with plantar sensing across datasets.',
    visual: {
      image: wearables,
      alt: 'Side view of a shoe and lower leg with inertial sensors on the instep and shank.',
      caption: 'Conceptual placement of foot and shank inertial sensors on one leg for ongoing wearable methods work.',
    },
  },
  {
    slug: 'kidney-stone-segmentation',
    area: 'Medical imaging',
    title: 'Kidney stone segmentation in CT',
    summary: 'A model that narrows its search from the abdominal CT to the kidney region before delineating small stones.',
    doi: '10.1016/j.bspc.2026.109894',
    code: 'https://github.com/Sakib1263/Kidney-Stone-Segmentation',
    approach: 'The pipeline first reduces the region searched for stones. The segmentation stage then processes the smaller candidate region and transfers features within the framework to better represent small targets.',
    contribution: 'I designed the successive scope-reduction and feature-transfer approach and led model development, experiments, analysis, and manuscript preparation.',
    scope: 'The paper reports research performance on an abdominal CT cohort. See the study for the dataset, split, and evaluation conditions.',
    visual: {
      image: renal,
      alt: 'Axial abdominal CT slice with a class activation overlay.',
      caption: 'Example of classifier localization from the published code repository.',
      credit: { label: 'Image source', href: 'https://github.com/Sakib1263/Kidney-Stone-Segmentation/blob/main/Instance-Classification/cam_output.png' },
    },
  },
  {
    slug: 'cross-device-raman',
    area: 'Spectroscopic sensing',
    title: 'Cross-device Raman spectroscopy',
    summary: 'Standardizing spectra across instruments for more consistent bacterial recognition in experiments.',
    doi: '10.1016/j.saa.2025.126931',
    code: 'https://github.com/Sakib1263/SERS-D2DNet-SuperRaman',
    approach: 'SERS-D2DNet maps spectra from portable devices toward a laboratory reference. The SuperRaman model then classifies bacterial spectra after the transformation.',
    contribution: 'I led the modelling and evaluation of the spectral transformation and recognition workflow, including implementation, generalization analysis, visualization, and writing.',
    scope: 'The reported experiments concern the instruments and analyte classes described in the paper. The Zenodo landing page documents access to the restricted data files.',
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
    summary: 'Reconstructing arterial blood pressure waveforms and estimating pressure components using PPG and ECG.',
    doi: '10.1016/j.bspc.2022.104247',
    code: 'https://github.com/Sakib1263/NABNet',
    approach: 'The hybrid pipeline reconstructs arterial blood pressure waveforms from photoplethysmography and electrocardiography. A component estimation stage recovers pressure values alongside the reconstructed waveform.',
    contribution: 'I led data preparation, implementation, experiments, analysis, visualization, and manuscript preparation.',
    scope: 'The article describes the retrospective evaluation used for the reported results.',
  },
];

export const featuredProjects = projects.filter(project => project.visual);
