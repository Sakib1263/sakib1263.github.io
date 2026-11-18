import d2dNetwork from '../assets/research/cross-device-raman/fig2-sers-d2dnet.png';
import d2dBenchmarks from '../assets/research/cross-device-raman/fig6-r2-benchmarks.png';
import d2dProcessing from '../assets/research/cross-device-raman/fig9-processing-effect.png';
import sepsisWorkflow from '../assets/research/sers-sepsis-recognition/fig1-workflow.png';
import sepsisEmbeddings from '../assets/research/sers-sepsis-recognition/fig5-embeddings.png';
import sepsisSaliency from '../assets/research/sers-sepsis-recognition/fig6-saliency.png';
import { ccBy, sourceArticle } from './figure-credits';
import type { ResearchPhase } from './research';

const crossDeviceDoi = '10.1016/j.saa.2025.126931';
const sepsisDoi = '10.1016/j.talanta.2025.129332';

/** Full content for the microbial SERS project page, in publication order, followed by ongoing work. */
export const ramanApproach = 'Surface-enhanced Raman spectroscopy (SERS) can detect microbial signatures quickly, but spectra change with the instrument, substrate, sample and acquisition conditions. Strong results can also be misleading when spectra from one biological sample appear in both training and testing. This project addresses those problems by standardising spectra across instruments, testing sepsis and pathogen recognition on blood-derived samples, auditing validation practice across the field, and extending spectral mapping to analytes unseen during training.';

export const ramanWorkflow = ['Acquire and standardise spectra', 'Recognise analytes and pathogens', 'Test independence and transfer'];

export const ramanNextSteps = 'Complete the multi-fold PRISM-SERS evaluation and prepare the manuscript for submission.';

export const ramanProgress: ResearchPhase[] = [
  {
    id: 'cross-device-standardisation',
    navLabel: 'Cross-device standardisation',
    title: 'Standardising SERS spectra across instruments',
    status: 'Spectrochimica Acta Part A · 2026 · Online 2025',
    paragraphs: [
      'Spectra from 20 bacterial and reference analyte classes were recorded on silver nanorod substrates with four portable Raman instruments and a laboratory Renishaw reference. SERS-D2DNet, a one-dimensional sequence-to-sequence network, learned to transform portable spectra toward the reference using 50 training spectra per class.',
      'SuperRaman, a lightweight Super-ONN classifier, then identified the analyte classes before and after transformation. Agreement with the reference improved on all four instruments, and classification accuracy rose on each one. The combined framework uses 6.6 million parameters and takes 3.27 ms per inference.',
    ],
    measures: [
      { value: '>98%', label: 'R² with the reference after transformation' },
      { value: '99.98%', label: 'Enwave accuracy after transformation' },
      { value: '20', label: 'Analyte classes' },
    ],
    table: {
      caption: 'R² against the Renishaw reference (Figure 6) and 20-class SuperRaman accuracy (Table 5), from Mahmud et al. (2026).',
      columns: ['R² before', 'R² after', 'Accuracy before', 'Accuracy after'],
      rows: [
        { label: 'Enwave', cells: ['72.03%', '99.44%', '97.58%', '99.98%'] },
        { label: 'Tec5', cells: ['63.97%', '99.54%', '99.95%', '99.98%'] },
        { label: 'Rapid ID', cells: ['81.70%', '98.80%', '96.54%', '98.87%'] },
        { label: 'First Defender', cells: ['87.99%', '99.57%', '99.82%', '100.00%'] },
      ],
    },
    figures: [
      {
        image: d2dNetwork,
        alt: 'SERS-D2DNet architecture with encoder and decoder blocks joined by full-scale skip connections, beside enlarged views of its multi-resolution blocks and feature layers.',
        caption: 'Figure 2 from Mahmud et al. (2026). The SERS-D2DNet architecture and its main building blocks.',
        credit: sourceArticle(crossDeviceDoi),
        licence: ccBy,
      },
      {
        image: d2dBenchmarks,
        alt: 'Bar chart of R² between transformed and reference spectra for four portable devices. SERS-D2DNet has the highest bar for every device, between 98.80% and 99.57%, above five benchmark models. The untransformed spectra score between 63.97% and 87.99%.',
        caption: 'Figure 6 from Mahmud et al. (2026). R² for SERS-D2DNet and five benchmark models. The black bars compare untransformed portable spectra with the reference.',
        credit: sourceArticle(crossDeviceDoi),
        licence: ccBy,
      },
      {
        image: d2dProcessing,
        alt: 'Bar chart of classification accuracy for four portable devices under four processing conditions. Accuracy rises with baseline correction and filtering, and domain transformation gives between 98.87% and 100%.',
        caption: 'Figure 9 from Mahmud et al. (2026). Effect of baseline correction, filtering and domain transformation on classification accuracy.',
        credit: sourceArticle(crossDeviceDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'sepsis-recognition',
    navLabel: 'Sepsis recognition',
    title: 'Recognising sepsis and its causative pathogens from blood',
    status: 'Talanta · 2026 · Online 2025',
    paragraphs: [
      'The study collected SERS spectra from 653 analyte-enriched blood samples at a tertiary hospital in Qatar, comprising 271 sepsis-positive and 382 control samples. A separate external cohort added 70 samples. The tasks were binary sepsis recognition and six-class identification of control samples and five sepsis-causing bacteria.',
      'SuperRamanNet is a compact one-dimensional Super-ONN classifier with about 0.65 million parameters. Cross-validation kept all spectra from each blood sample in the same fold, and augmentation was applied only to training data. Augmentation raised external pathogen accuracy from 66.67% to 98.28%, and saliency maps highlighted the 740–760 cm⁻¹ region across classes.',
    ],
    measures: [
      { value: '99.67%', label: 'Sepsis recognition accuracy' },
      { value: '98.84%', label: 'Six-class pathogen accuracy' },
      { value: '98.28%', label: 'External pathogen accuracy' },
    ],
    table: {
      caption: 'SuperRamanNet results from Table 1 of Hassan et al. (2026).',
      columns: ['Accuracy', 'Precision', 'Recall', 'F1 score', 'Specificity'],
      rows: [
        { label: 'Sepsis recognition, five-fold', cells: ['99.67%', '99.64%', '100.00%', '99.82%', '95.50%'] },
        { label: 'Pathogen identification, five-fold', cells: ['98.84%', '98.83%', '98.83%', '98.82%', '99.05%'] },
        { label: 'Pathogen identification, external', cells: ['98.28%', '98.31%', '98.28%', '98.26%', '99.45%'] },
      ],
    },
    figures: [
      {
        image: sepsisWorkflow,
        alt: 'Workflow illustration. Blood from sepsis and control subjects is centrifuged to enrich the analyte, which is placed on silver nanorod slides for SERS acquisition. The spectra are preprocessed and classified to separate control samples from five sepsis-causing bacterial strains.',
        caption: 'Figure 1 from Hassan et al. (2026). Sample collection and analyte enrichment (a), followed by SERS acquisition, preprocessing and classification (b).',
        credit: sourceArticle(sepsisDoi),
        licence: ccBy,
      },
      {
        image: sepsisEmbeddings,
        alt: 'Two scatter plots, t-SNE and UMAP, of SuperRamanNet embeddings. Points form six separate clusters, one for each class: E. coli, K. pneumoniae, P. aeruginosa, S. aureus, S. epidermidis and negative controls.',
        caption: 'Figure 5 from Hassan et al. (2026). t-SNE (a) and UMAP (b) projections of SuperRamanNet embeddings.',
        credit: sourceArticle(sepsisDoi),
        licence: ccBy,
      },
      {
        image: sepsisSaliency,
        alt: 'Six mean SERS spectra, one for controls and one for each of five bacteria, coloured by importance. Arrows mark the spectral bands that contributed most to each class.',
        caption: 'Figure 6 from Hassan et al. (2026). Saliency maps showing the spectral regions that contributed most to each class.',
        credit: sourceArticle(sepsisDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'validation-review',
    navLabel: 'Validation review',
    title: 'Auditing validation across microbial SERS studies',
    status: 'Talanta · Online 2026',
    paragraphs: [
      'This PRISMA-guided review covered 129 experimental studies of label-free SERS with machine learning across bacterial, viral, fungal and cross-domain applications. It followed the full workflow, from target and matrix definition through sample handling, SERS platform design, spectral acquisition and preprocessing, modelling and interpretation, to validation.',
      'The audit found that large spectral datasets often reflected repeated measurements from few biological samples. It concluded that deployable methods need biologically independent evaluation, leakage-safe preprocessing, reproducible substrates, calibration across instruments and matrices, and prospective multi-batch, multi-site validation.',
    ],
    measures: [
      { value: '129', label: 'Studies reviewed' },
      { value: '68.2%', label: 'Without biological-unit-aware validation' },
      { value: '6.2%', label: 'With external or major-domain validation' },
    ],
    table: {
      caption: 'Corpus-level findings from the abstract of Mahmud et al. (2026).',
      columns: ['Share of studies'],
      rows: [
        { label: 'Controlled-development datasets', cells: ['68.2%'] },
        { label: 'No more than 25 independent biological units', cells: ['62.0%'] },
        { label: 'No biological-unit-aware predictive validation', cells: ['68.2%'] },
        { label: 'External or major-domain validation', cells: ['6.2%'] },
      ],
    },
  },
  {
    id: 'prism-sers',
    navLabel: 'PRISM-SERS',
    title: 'PRISM-SERS: mapping spectra for unseen analytes',
    status: 'Ongoing research · Manuscript in preparation',
    paragraphs: [
      'PRISM-SERS (Platform-to-Reference, class-Independent Spectral Mapping) is my current work on a harder form of cross-device standardisation. It aims to translate portable-instrument spectra into the laboratory reference domain for analyte classes the model has never seen, using unpaired data and no class labels at inference.',
      'Each analyte class is held out in turn, with its portable and reference spectra excluded from training, validation and model selection. The full evaluation is under way, and results will be reported once the multi-fold analysis is complete.',
    ],
    measures: [
      { value: '29,545', label: 'Spectra in the public dataset' },
      { value: '20', label: 'Analyte classes held out in turn' },
      { value: '5', label: 'Raman instruments' },
    ],
  },
];
