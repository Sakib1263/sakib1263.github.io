import { researchStudyAreas, researchStudyFor, researchStudies } from './research-catalog';
import type { ResearchFigure, ResearchPhase, ResearchProject } from './research';
import {
  smartInsoleApproach, smartInsoleApproachFigures, smartInsoleNextSteps, smartInsoleProgress,
  smartInsoleVisual, smartInsoleWorkflow,
} from './smart-insole-project';
import {
  kidneyApproach, kidneyApproachFigures, kidneyNextSteps, kidneyProgress, kidneyVisual, kidneyWorkflow,
} from './kidney-project';

interface Stage {
  title: string;
  period: string;
  description: string;
  study?: string;
  doi?: string;
}

export interface Collection {
  slug: string;
  title: string;
  /** Research area shown on the homepage card. */
  area: string;
  period: string;
  context: string;
  summary: string;
  contribution: string;
  stages: Stage[];
  scope?: string;
  related?: string[];
  resources?: { label: string; href: string }[];
  /** Display figure for the project page, homepage card and share image. */
  visual?: ResearchProject['visual'];
  /** Optional full project narrative, rendered before the list of studies. */
  approach?: string;
  workflow?: string[];
  approachFigures?: ResearchFigure[];
  progress?: ResearchPhase[];
  ongoing?: string;
}

// Group studies by documented project history. Funding on a stage does not extend to other stages.
const gait: Collection = {
  slug: 'smart-insole-3d-gait-kinetics',
  area: 'Wearable biomechanics',
  title: 'AI-powered smart insoles for 3D gait kinetics',
  period: '2023–present',
  context: 'Published feasibility studies and a Qatar University Collaborative Grant begun in March 2026',
  summary: 'Reconstructing 3D forces, moments, and centre of pressure from smart-insole loading and wearable motion sensors.',
  contribution: 'I contributed to the motion-based study and led the preprocessing, model development, evaluation, and writing for the insole study. In the current project I develop synchronisation and sensor-fusion methods and evaluate how estimates transfer across participants, datasets, and sensor configurations.',
  scope: 'The published studies and current benchmarks use existing gait recordings. The project has also begun bench development of the sensing element. New synchronised treadmill recordings and validation of the integrated prototype are planned.',
  stages: [
    {
      title: 'Foot motion as a predictor of forces and moments',
      period: '2024 issue · Online 2023',
      description: 'Used an attention-guided MultiResUNet to estimate three forces and three moments from trajectories of five shoe-mounted markers. Two public gait datasets provided laboratory reference measurements for walking and running.',
      study: 'kinematics-to-3d-kinetics',
    },
    {
      title: 'Reconstructing 3D kinetics from smart-insole loading',
      period: '2026 issue · Online 2025',
      description: 'Ke2KeNet reconstructed forces, moments, and centre of pressure using 16 vertical-loading channels per insole. The study used instrumented-treadmill references and held out participants during evaluation. This work established the pressure-only baseline before the collaborative grant began.',
      study: 'wearable-foot-kinetics',
    },
    {
      title: 'Combining plantar loading with inertial motion',
      period: 'March 2026–present',
      description: 'The funded phase harmonised two public gait datasets, then compared loading-only, motion-only and fused inputs using a common 1D U-Net and held-out participants. Fusion lowered normalised error by 7.1% for walking and 2.6% for running. Current work develops reliability-aware fusion (KineNeXt++) and tests transfer to different insoles and sensors through compact portable inputs. The target is eight outputs per foot.',
      study: 'multimodal-wearable-kinetics',
    },
  ],
  related: ['plantar-sensing-for-diabetic-foot', 'diabetic-neuropathy-gait-emg'],
  visual: smartInsoleVisual,
  approach: smartInsoleApproach,
  workflow: smartInsoleWorkflow,
  approachFigures: smartInsoleApproachFigures,
  progress: smartInsoleProgress,
  ongoing: smartInsoleNextSteps,
};

const insoles: Collection = {
  slug: 'plantar-sensing-for-diabetic-foot',
  area: 'Wearable biomechanics',
  title: 'Smart insoles for diabetic-foot monitoring',
  period: '2020–2024',
  context: 'Undergraduate senior design, QNRF UREP, and a Qatar University Concept Development Grant',
  summary: 'Building and evaluating electronic and fibre-optic insoles that measure plantar pressure and temperature during standing and walking.',
  contribution: 'I integrated sensors and worked on acquisition, experiments, and analysis for the electronic prototype. I led development and evaluation of the fibre-optic insole and contributed to testing graphene temperature sensors.',
  scope: 'The prototypes were evaluated in controlled measurement studies. Detecting ulcer onset would require longitudinal clinical validation.',
  stages: [
    {
      title: 'Electronic pressure and temperature sensing',
      period: 'January–May 2020 · QNRF UREP',
      description: 'Developed a wireless insole with electronic pressure and temperature sensors. The publication evaluated plantar measurements and machine-learning classification of diabetes groups.',
      doi: '10.3390/s22197599',
    },
    {
      title: 'Fibre Bragg grating insole',
      period: 'June–November 2020 · QU Concept Development Grant',
      description: 'Developed an optical sensing system to measure temperature and pressure together. The study compared the fibre-optic and electronic prototypes with a commercial plantar-pressure system.',
      study: 'smart-insoles-diabetic-foot',
    },
    {
      title: 'Graphene sensing for temperature mapping',
      period: '2024 issue · Online 2023',
      description: 'Follow-on work characterised laser-induced graphene sensors for mapping plantar temperature.',
      doi: '10.1109/jsen.2023.3317768',
    },
  ],
  related: ['smart-insole-3d-gait-kinetics', 'diabetic-foot-thermal-imaging'],
};

const kidney: Collection = {
  slug: 'kidney-disease-imaging',
  visual: kidneyVisual,
  area: 'Medical imaging',
  title: 'Deep learning for kidney disease imaging',
  period: '2021–2026',
  context: 'Qatar University MSc research and the HMC–QU–Sidra collaboration, published in three first-author Q1 journal papers',
  summary: 'Classifying renal tumours and segmenting kidney stones on CT, and grading prenatal hydronephrosis on ultrasound.',
  contribution: 'All three are first-author papers. The renal tumour study came from my MSc thesis, and I covered its conceptualisation, methodology, software, validation, analysis, data curation, visualisation and writing. The kidney stone study grew from the same thesis research: I designed the successive scope-reduction and feature-transfer pipeline and led model development, experiments, validation, analysis and writing. The hydronephrosis study came from the HMC–QU–Sidra collaboration. As its research assistant I coordinated ethics approval and data acquisition, curated the ultrasound benchmark, developed the detection, segmentation and grading pipeline with KUSNet and PHCNet, and drafted the manuscript.',
  scope: 'The three studies address different clinical questions and use different cohorts and endpoints. The hydronephrosis study was supported by a separate HMC internal grant and also contributed to my MSc thesis.',
  stages: [
    {
      title: 'Renal tumour classification and surgical approach modelling',
      period: '2023 issue',
      description: 'Combined contrast-enhanced CT features and clinical variables from the KiTS cohort to classify renal tumour types and model the surgical approaches recorded in the dataset.',
      study: 'renal-tumour-modelling',
    },
    {
      title: 'Prenatal hydronephrosis detection and severity grading',
      period: '2024',
      description: 'Hamad Medical Corporation, Qatar University, and Sidra Medicine contributed to the clinical collaboration. The study used the QU–HMC–AHN ultrasound benchmark and evaluated kidney-region detection, kidney segmentation, and severity grading.',
      study: 'prenatal-hydronephrosis',
    },
    {
      title: 'Successive scope reduction for kidney stone segmentation',
      period: '2026 issue',
      description: 'Narrowed abdominal CT scans to kidney regions and candidate stones, with feature transfer between stages to support segmentation of small targets. The paper appeared after the MSc was completed.',
      study: 'kidney-stone-segmentation',
    },
  ],
  resources: [{ label: 'Read the MSc thesis', href: 'https://qspace.qu.edu.qa/handle/10576/45080' }],
  approach: kidneyApproach,
  workflow: kidneyWorkflow,
  approachFigures: kidneyApproachFigures,
  progress: kidneyProgress,
  ongoing: kidneyNextSteps,
  related: ['multiphase-liver-ct'],
};

const raman: Collection = {
  slug: 'microbial-raman-biosensing',
  visual: researchStudyFor('cross-device-raman').visual,
  area: 'Spectroscopic sensing',
  title: 'Machine learning for microbial Raman biosensing',
  period: '2025–present',
  context: 'Research line across instrument transfer, diagnostic modelling, and validation',
  summary: 'Studying how surface-enhanced Raman spectroscopy (SERS) models recognise microbes across instruments, samples, and acquisition conditions.',
  contribution: 'I led the modelling and evaluation for the cross-device work, built the computational pipeline for the sepsis study, and led the evidence audit of microbial SERS validation practices.',
  scope: 'The sepsis study uses blood samples prepared under its own protocol. Instrument transfer and few-shot recognition address different questions, and each requires an appropriate held-out evaluation.',
  stages: [
    {
      title: 'Standardising spectra across instruments',
      period: '2026 issue · Online 2025',
      description: 'Mapped spectra from portable devices to a reference instrument and tested how that affected bacterial classification. The public dataset covers five instruments.',
      study: 'cross-device-raman',
    },
    {
      title: 'Sepsis and pathogen recognition from blood spectra',
      period: '2026 issue · Online 2025',
      description: 'Developed a separate workflow using analyte-enriched blood spectra and super-operational neural networks for sepsis recognition and pathogen typing. The pathogen typing analysis included an external cohort.',
      study: 'sers-sepsis-recognition',
    },
    {
      title: 'Evaluating validation practices in the literature',
      period: '2026',
      description: 'Reviewed 129 studies for sample-level independence, external evaluation, and reporting across the workflow from sample preparation to modelling.',
      study: 'microbial-sers-validation',
    },
    {
      title: 'Transfer to unseen analytes and few-shot recognition',
      period: 'Ongoing',
      description: 'Investigating held-out analytes in instrument alignment and testing whether time-series representations support recognition with few labelled examples.',
      study: 'generalizable-microbial-sers',
    },
  ],
};

export const collections = [gait, insoles, kidney, raman];
/** Projects shown on the homepage. Each card links to the same project page as the research catalogue. */
export const featuredCollections = [gait, kidney, raman];
export const collectionPath = (slug: string) => `research/projects/${slug}/`;

const collectionBySlug = new Map(collections.map(collection => [collection.slug, collection]));
export const collectionByStudy = new Map<string, Collection>();
for (const collection of collections) {
  for (const stage of collection.stages) {
    if (!stage.study) continue;
    const study = researchStudyFor(stage.study);
    if (collectionByStudy.has(study.slug)) throw new Error(`Multiple project collections for ${study.slug}`);
    collectionByStudy.set(study.slug, collection);
  }
}

const selections = {
  biomechanics: [gait.slug, insoles.slug, 'diabetic-neuropathy-gait-emg'],
  imaging: ['diabetic-foot-thermal-imaging', 'multiphase-liver-ct', kidney.slug],
  signals: ['qscare-doppler-flow', 'covidcare-remote-monitoring'],
  spectroscopy: [raman.slug],
  devices: ['hip-implant-mechanics-and-imaging', 'exoventq-ventilation', 'ecmo-cannulation-simulator'],
  genomics: ['cancer-genomics-reproduction', 'mendelian-rnaseq-outliers'],
  engineering: ['e-tawfeer-energy-management', 'smart-meter-load-and-occupancy', 'ev-charging-demand', 'climate-geopolitical-risk'],
};

function studySearchText(study: ReturnType<typeof researchStudyFor>) {
  return [study.title, study.summary, study.question, study.approach, study.scope, study.doi, ...(study.related ?? [])];
}

export const projectAreas = researchStudyAreas.map(({ id, title, description }) => ({
  id, title, description,
  entries: selections[id].map(slug => {
    const collection = collectionBySlug.get(slug);
    if (collection) {
      return {
        ...collection,
        path: collectionPath(slug),
        aliases: collection.stages.flatMap(({ study }) => study ? [study] : []),
        searchText: [
          collection.context, collection.contribution, collection.scope,
          ...collection.stages.flatMap(stage => [
            stage.title, stage.description, stage.doi,
            ...(stage.study ? studySearchText(researchStudyFor(stage.study)) : []),
          ]),
        ].join(' '),
      };
    }
    const study = researchStudyFor(slug);
    return {
      slug, title: study.title, summary: study.summary, period: study.period,
      context: study.context ?? study.status, path: `research/${slug}/`,
      aliases: [], searchText: studySearchText(study).join(' '),
    };
  }),
}));

const selectedSlugs = new Set(projectAreas.flatMap(area => area.entries.flatMap(({ slug, aliases }) => [slug, ...aliases])));
export const additionalStudies = researchStudies.filter(study => !selectedSlugs.has(study.slug));
