import { publicationFor } from './papers';
import { researchStudyAreas, researchStudyFor, researchStudies } from './research-catalog';
import { currentResearchSlugs, type ResearchFigure, type ResearchPhase, type ResearchProject } from './research';
import {
  smartInsoleApproach, smartInsoleApproachFigures, smartInsoleNextSteps, smartInsoleProgress,
  smartInsoleVisual, smartInsoleWorkflow,
} from './smart-insole-project';
import {
  kidneyApproach, kidneyApproachFigures, kidneyNextSteps, kidneyProgress, kidneyVisual, kidneyWorkflow,
} from './kidney-project';
import {
  diabeticFootApproach, diabeticFootNextSteps, diabeticFootProgress, diabeticFootVisual, diabeticFootWorkflow,
} from './diabetic-foot-project';
import { ramanApproach, ramanNextSteps, ramanProgress, ramanWorkflow } from './raman-project';

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
  context: 'BSc senior design project and QNRF UREP, continued under QNRF NPRP12S-0227-190164 with Universiti Kebangsaan Malaysia · three Q1 journal papers',
  summary: 'Building insoles that measure plantar pressure and temperature with three sensing technologies: electronic sensors, fibre Bragg gratings, and laser-induced graphene.',
  contribution: 'As second author of the electronic insole study, I integrated the sensors and worked on the methodology, data acquisition, experiments, analysis and manuscript review. I led the fibre Bragg grating insole as first author, covering system development, data acquisition and analysis, validation against the electronic and commercial systems, and manuscript preparation. Both of these studies came from my senior design project. For the laser-induced graphene study I contributed to the experimental and technical assessment, interpretation of the findings and manuscript review.',
  scope: 'Each prototype was tested in controlled bench experiments and with healthy volunteers. Detecting ulcer onset would require longitudinal clinical validation with people with diabetes.',
  stages: [
    {
      title: 'Electronic pressure and temperature sensing',
      period: 'January–May 2020 · QNRF UREP',
      description: 'Developed a wireless insole with 16 force-sensitive resistors and eight thermistors per foot, built from off-the-shelf parts for about US$170, with real-time pressure and temperature maps.',
      doi: '10.3390/s22197599',
    },
    {
      title: 'Fibre Bragg grating insole',
      period: '2020–2022 · QNRF NPRP12S-0227-190164',
      description: 'Developed an optical sensing system to measure temperature and pressure together. The study compared the fibre-optic and electronic prototypes with a commercial plantar-pressure system.',
      study: 'smart-insoles-diabetic-foot',
    },
    {
      title: 'Graphene sensing for temperature mapping',
      period: '2024 issue · Online 2023',
      description: 'Laser-scribed graphene temperature sensors, ten per insole, mapped plantar temperature with a linear response and about 0.1 °C precision.',
      doi: '10.1109/jsen.2023.3317768',
    },
  ],
  visual: diabeticFootVisual,
  approach: diabeticFootApproach,
  workflow: diabeticFootWorkflow,
  progress: diabeticFootProgress,
  ongoing: diabeticFootNextSteps,
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
};

const raman: Collection = {
  slug: 'microbial-raman-biosensing',
  visual: researchStudyFor('cross-device-raman').visual,
  area: 'Spectroscopic sensing',
  title: 'Generalisable deep learning for microbial SERS',
  period: '2025–present',
  context: 'Two research papers, one evidence review and ongoing work on spectral transfer',
  summary: 'Standardising surface-enhanced Raman spectra across instruments, recognising sepsis pathogens from blood, and examining how well microbial SERS models are validated.',
  contribution: 'I led the cross-device study, including model development, experiments, generalisation analysis, visualisation and manuscript preparation. For the sepsis study, I developed the deep learning pipeline from raw spectra through preprocessing, data splitting, training, evaluation and interpretation. I also led the design, corpus audit and synthesis of the 129-study review, and I am developing PRISM-SERS.',
  scope: 'The cross-device study and PRISM-SERS use prepared analytes rather than clinical specimens. The sepsis study drew its primary samples from one hospital and tested a 70-sample external cohort, so prospective multi-site validation is still needed. The review percentages describe the 129 studies in its corpus, and PRISM-SERS has no published results yet.',
  stages: [
    {
      title: 'Standardising spectra across instruments',
      period: '2026 issue · Online 2025',
      description: 'Mapped spectra from four portable devices to a laboratory reference and tested how that affected classification across 20 analyte classes.',
      study: 'cross-device-raman',
    },
    {
      title: 'Sepsis and pathogen recognition from blood spectra',
      period: '2026 issue · Online 2025',
      description: 'Developed SuperRamanNet for sepsis recognition and pathogen identification from analyte-enriched blood, with an independent external cohort.',
      study: 'sers-sepsis-recognition',
    },
    {
      title: 'Evaluating validation practices in the literature',
      period: 'Online 2026',
      description: 'Reviewed 129 studies for biological independence, external evaluation and reporting across the workflow from sample preparation to modelling.',
      study: 'microbial-sers-validation',
    },
    {
      title: 'PRISM-SERS and transfer to unseen analytes',
      period: 'Ongoing',
      description: 'Developing class-independent spectral mapping for analytes held out of training. A manuscript is in preparation, and a second workstream studies few-shot recognition.',
      study: 'generalizable-microbial-sers',
    },
  ],
  approach: ramanApproach,
  workflow: ramanWorkflow,
  progress: ramanProgress,
  ongoing: ramanNextSteps,
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

/** Ongoing projects with the catalogue's own title, summary and page, so the homepage and research pages always match. */
export const currentResearch = currentResearchSlugs.map(slug => {
  const study = researchStudyFor(slug);
  const collection = collectionByStudy.get(slug);
  return {
    slug,
    area: study.area,
    title: study.title,
    summary: study.summary,
    href: collection ? `${collectionPath(collection.slug)}#${slug}` : `research/${slug}/`,
  };
});

const selections = {
  biomechanics: [gait.slug, insoles.slug, 'gait-pattern-modelling', 'diabetic-neuropathy-gait-emg'],
  imaging: [
    'diabetic-foot-thermal-imaging', 'multiphase-liver-ct', kidney.slug,
    'liver-mri-segmentation', 'image-based-curvature-measurement', 'covid-chest-imaging',
  ],
  // Newest first: latest year, then latest start year, from project dates or paper years.
  signals: [
    'wearable-cardiac-waveforms', 'contactless-cardiovascular-waveforms', 'multimodal-glucose-estimation',
    'ecg-restoration-during-mri', 'fetal-ecg-extraction', 'eeg-artefact-restoration',
    'qscare-doppler-flow', 'nabnet',
  ],
  spectroscopy: [raman.slug],
  devices: ['aortic-wall-shear-stress', 'exoventq-ventilation', 'hip-implant-mechanics-and-imaging', 'ecmo-cannulation-simulator'],
  genomics: ['cancer-genomics-reproduction', 'mendelian-rnaseq-outliers'],
  engineering: ['e-tawfeer-energy-management', 'rotational-piezoelectric-harvesting', 'smart-meter-load-and-occupancy', 'ev-charging-demand'],
};

const monthName = /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/;

/** Shows a date range by year only, e.g. "August 2024–June 2025" becomes "2024–2025". Any detail after " · " is kept. */
export function periodYears(period: string) {
  const [range, ...detail] = period.split(' · ');
  if (!monthName.test(range)) return period;
  const years = [...new Set(range.match(/\d{4}/g) ?? [])];
  const end = /present/i.test(range) ? ['present'] : [];
  return [[...years, ...end].join('–'), ...detail].join(' · ');
}

/** A study without project dates is dated by the publication years of its papers, e.g. "2023–2024". */
export function studyPeriod(study: ReturnType<typeof researchStudyFor>) {
  if (study.period) return study.period;
  const years = [study.doi, ...(study.papers ?? [])].flatMap(doi => doi ? [publicationFor(doi).year] : []);
  if (!years.length) return undefined;
  const first = Math.min(...years), last = Math.max(...years);
  return first === last ? `${first}` : `${first}–${last}`;
}

function studySearchText(study: ReturnType<typeof researchStudyFor>) {
  return [study.title, study.summary, study.question, study.approach, study.scope, study.doi, ...(study.papers ?? [])];
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
      slug, title: study.title, summary: study.summary, period: studyPeriod(study),
      context: study.context ?? study.status, path: `research/${slug}/`,
      aliases: [], searchText: studySearchText(study).join(' '),
    };
  }),
}));

const selectedSlugs = new Set(projectAreas.flatMap(area => area.entries.flatMap(({ slug, aliases }) => [slug, ...aliases])));
export const miscellaneousStudies = researchStudies.filter(study => !selectedSlugs.has(study.slug));
