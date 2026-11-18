import type { ImageMetadata } from 'astro';
import renal from '../assets/renal-ct.png';
import sers from '../assets/sers-graphical-abstract.jpg';
import ramanComparison from '../assets/raman-before-after.jpg';
import insoleShare from '../assets/share/wearable-foot-kinetics.jpg';
import kidneyShare from '../assets/share/kidney-stone-segmentation.jpg';
import ramanShare from '../assets/share/cross-device-raman.jpg';
import ramanCard from '../assets/research/cross-device-raman/card-enwave-rid.jpg';
import ramanBenchmarks from '../assets/research/cross-device-raman/fig6-r2-benchmarks.png';
import kidneyFramework from '../assets/research/kidney-stone-segmentation/fig1-framework.png';
import ahnGrades from '../assets/research/prenatal-hydronephrosis/fig3-sfu-grades.jpg';
import ahnSegmentation from '../assets/research/prenatal-hydronephrosis/fig6-segmentation.jpg';
import { bloodPressureProgress, bloodPressureVisual } from './blood-pressure-milestones';
import { ccBy, elsevier, sourceArticle } from './figure-credits';
import { smartInsoleProgress } from './smart-insole-project';
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
  /** A side-by-side comparison, such as alternative sensing approaches. */
  table?: { caption: string; columns: string[]; rows: { label: string; cells: string[] }[] };
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
    title: 'Reconstructing 3D kinetics from smart-insole loading',
    summary: 'Estimating 3D forces, moments, and centre of pressure from the vertical loads measured by smart insoles.',
    question: 'How much of the force and moment profile measured by an instrumented treadmill can be recovered from insole signals?',
    doi: '10.1109/jbhi.2025.3605296',
    code: kinetics.repository,
    approach: 'Ke2KeNet maps the 16 vertical-loading channels of each Moticon insole to eight treadmill-referenced waveforms per foot: three forces, three moments, and the anterior–posterior and mediolateral centre of pressure. Separate one-dimensional models were trained for each output and compared with instrumented-treadmill recordings across walking and running speeds. A sensor-relevance analysis then tested whether all 16 pressure channels were needed.',
    result: 'For the average gait cycles, Pearson correlation exceeded 0.95 for every output except the right-foot vertical moment, and the estimated vertical force was closer to the treadmill than the summed insole channels. Reducing the layout from 16 to eight pressure locations per foot gave broadly comparable accuracy.',
    measures: [
      { value: '> 0.95', label: 'Average-cycle correlation, all outputs but one' },
      { value: '16 → 8', label: 'Pressure sensors per foot after layout analysis' },
      { value: '9', label: 'Healthy participants, five subject-independent folds' },
    ],
    contribution: 'I led preprocessing, model development, subject- and speed-wise evaluation, analysis, and manuscript preparation.',
    evidence: {
      label: 'Wearable foot kinetics',
      role: 'I led model development and evaluation against an instrumented treadmill.',
      finding: 'In nine healthy participants, average-cycle correlations exceeded 0.95 for all targets except the right-foot vertical moment.',
      shareImage: insoleShare,
    },
    scope: 'The results come from nine healthy participants under controlled treadmill conditions. Performance varied across participants and speeds, particularly for some moments.',
    ongoing: 'This study is the foundation of the AI-powered smart-insole project, which now combines plantar loading with wearable motion, tests transfer across devices and develops the insole hardware. The project overview sets out each stage.',
    workflow: ['Smart-insole pressure signals', 'Estimated forces, moments and centre of pressure', 'Comparison with treadmill measurements'],
    related: ['10.1007/s00521-023-09081-z', '10.3390/s22197599'],
    relatedProjects: ['multimodal-wearable-kinetics', 'kinematics-to-3d-kinetics'],
    visual: smartInsoleProgress[0].figures![0],
    figures: [{ ...smartInsoleProgress[0].figures![1], section: 'results' }],
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
    title: 'Cuffless blood pressure and arterial waveform estimation from PPG and ECG',
    summary: 'Deep learning methods that estimate systolic and diastolic pressure and reconstruct continuous arterial blood pressure waveforms from PPG and ECG signals.',
    question: 'Can non-invasive PPG and ECG signals provide accurate blood pressure values and a continuous arterial pressure waveform?',
    context: 'Qatar National Research Fund NPRP12S-0227-190164 · Qatar University IRCC-2021-001 and QUST-2-CENG-2022-711',
    doi: '10.1016/j.bspc.2022.104247',
    code: 'https://github.com/Sakib1263/NABNet',
    resources: [
      { label: 'PPG2ABP code', href: 'https://github.com/nibtehaz/PPG2ABP' },
      { label: 'UCI dataset', href: 'https://archive.ics.uci.edu/dataset/340/cuff+less+blood+pressure+estimation' },
    ],
    approach: 'Cuffs provide intermittent readings, while a continuous arterial pressure waveform usually requires an arterial catheter. This project used PPG and ECG to estimate blood pressure without either limitation. The work first predicted systolic and diastolic values, then reconstructed the waveform from PPG alone, and finally combined pressure prediction with waveform reconstruction.',
    workflow: ['Prepare PPG and ECG', 'Predict pressure values', 'Reconstruct the waveform'],
    progress: bloodPressureProgress,
    contribution: 'For the shallow U-Net study, I led conceptualisation, methodology, software, formal analysis, investigation, data curation, validation, visualisation and manuscript preparation. For PPG2ABP, I contributed to data curation, formal analysis, methodology, investigation, validation and manuscript drafting and revision, and worked with the first author to rework the study for publication. For the combined pipeline, I led development and evaluation of NABNet, including data preparation, implementation, experiments, analysis, visualisation and manuscript preparation.',
    scope: 'All three studies were developed on the same public intensive-care dataset of clinical finger PPG, and distorted or extreme signals were excluded in two of them. Only the shallow U-Net study tested an external dataset, with 40 people. Motion artefacts from wearable sensors were not resolved, and PPG2ABP is not intended for wrist PPG. Prospective validation is needed before clinical use.',
    related: ['10.3390/s22030919', '10.3390/bioengineering9110692'],
    relatedProjects: ['contactless-cardiovascular-waveforms', 'wearable-cardiac-waveforms'],
    visual: bloodPressureVisual,
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

export const caseStudyProjects = ['wearable-foot-kinetics', 'kidney-stone-segmentation', 'cross-device-raman'].map(projectFor);

/** Ongoing projects shown on the homepage, by research-catalogue slug. Titles and descriptions come from the catalogue. */
export const currentResearchSlugs = ['multimodal-wearable-kinetics', 'diabetic-foot-thermal-imaging', 'multiphase-liver-ct'];
