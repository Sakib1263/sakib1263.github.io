import { topicDescriptions, topics } from './papers';
import { projects, type ResearchProject } from './research';
import { ccBy, elsevier, sourceArticle, springer } from './figure-credits';
import insoleFbg from '../assets/research/smart-insoles-diabetic-foot/fig4-fbg-insole.jpg';
import insoleTemperature from '../assets/research/smart-insoles-diabetic-foot/fig9-temperature-maps.png';
import gaitPatterns from '../assets/research/gait-pattern-modelling/fig3-vgrf-patterns.png';
import gaitCurves from '../assets/research/gait-pattern-modelling/fig6-roc-pr.png';
import dopplerOverview from '../assets/research/qscare-doppler-flow/fig2-overview.png';
import dopplerRestored from '../assets/research/qscare-doppler-flow/fig7-restored-waveforms.png';
import mhdFramework from '../assets/research/ecg-restoration-during-mri/fig2-framework.png';
import mhdSpectra from '../assets/research/ecg-restoration-during-mri/fig6-psd.png';
import eegSpectra from '../assets/research/eeg-artefact-restoration/fig6-psd.png';
import eegFramework from '../assets/research/eeg-artefact-restoration/fig3-ago-cyclegan.png';
import fetalPeaks from '../assets/research/fetal-ecg-extraction/fig6-r-peaks.png';
import fetalPipeline from '../assets/research/fetal-ecg-extraction/fig1-pipeline.png';
import radarEcg from '../assets/research/contactless-cardiovascular-waveforms/fig5-radar-ecg-rest.png';
import renalFramework from '../assets/research/renal-tumour-modelling/fig1-framework.png';
import renalFeatures from '../assets/research/renal-tumour-modelling/fig9-surgical-features.png';
import liverMasks from '../assets/research/liver-mri-segmentation/fig10-cascade-masks.jpg';
import liverCascade from '../assets/research/liver-mri-segmentation/fig7-cascade.png';
import covidPipeline from '../assets/research/covid-chest-imaging/fig3-pipeline.jpg';
import covidFollowUp from '../assets/research/covid-chest-imaging/fig5b-follow-up.jpg';
import curvaturePipeline from '../assets/research/image-based-curvature-measurement/fig1-pipeline.jpg';
import curvatureEstimates from '../assets/research/image-based-curvature-measurement/fig8-angle-estimates.png';
import ppgExamples from '../assets/research/wearable-cardiac-waveforms/fig8-restoration-examples.png';
import ppgFramework from '../assets/research/wearable-cardiac-waveforms/fig1-ttr-gan.png';
import sepsisWorkflow from '../assets/research/sers-sepsis-recognition/fig1-workflow.png';
import sepsisEmbeddings from '../assets/research/sers-sepsis-recognition/fig5-embeddings.png';
import hipDetection from '../assets/research/hip-implant-mechanics-and-imaging/fig8-implant-detection.jpg';
import hipTrunnion from '../assets/research/hip-implant-mechanics-and-imaging/fig2-trunnion-geometry.png';
import exoventOverview from '../assets/research/exoventq-ventilation/fig1-overview.png';
import exoventTest from '../assets/research/exoventq-ventilation/fig12a-cyclic-test.jpg';
import gearboxConfusion from '../assets/research/gearbox-fault-detection/fig7-confusion-matrix.png';
import occupancyWeek from '../assets/research/smart-meter-load-and-occupancy/fig6-occupancy.png';
import ecmoTrainer from '../assets/research/ecmo-cannulation-simulator/fig1gh-trainer.jpg';
import { dspnApproach, dspnPosterUrl, dspnProgress, dspnReportUrl, dspnVisual, dspnWorkflow } from './dspn-project';

function existing(slug: string) {
  const project = projects.find(item => item.slug === slug);
  if (!project) throw new Error(`Unknown research project: ${slug}`);
  return project;
}

const biomechanics: ResearchProject[] = [
  existing('wearable-foot-kinetics'),
  {
    slug: 'multimodal-wearable-kinetics', area: 'Wearable biomechanics',
    title: 'Multimodal wearable estimation of 3D gait kinetics',
    summary: 'Combining wearable motion and plantar pressure to estimate forces, moments, and centre of pressure across people and sensor layouts.',
    period: 'March 2026–present', status: 'Ongoing research', context: 'Qatar University Collaborative Grant',
    approach: 'Synchronise insole pressures with inertial measurements from the foot and shank. Map the inputs into comparable representations, then compare insole-only, motion-only and combined models against force-platform or instrumented-treadmill references. The evaluation examines held-out participants and the effect of changes in recording hardware and protocol. The main project page sets out each stage in order, with figures and results: the kinematics-only and multimodal benchmarks, KineNeXt++ fusion, and transfer between datasets.',
    contribution: 'I develop the preprocessing and alignment workflows, study how to combine the two modalities, and design model comparisons across participants and datasets.',
    scope: 'This work is in development. Participant-held-out evaluation and transfer between independently collected datasets address different questions about generalisation.',
    relatedProjects: ['wearable-foot-kinetics', 'kinematics-to-3d-kinetics'],
  },
  {
    slug: 'kinematics-to-3d-kinetics', area: 'Wearable biomechanics',
    title: 'Estimating ground reaction forces and moments from foot motion',
    summary: 'Testing whether a small set of foot markers can recover three-dimensional ground reaction forces and moments across gait datasets.',
    doi: '10.1007/s00521-023-09081-z',
    approach: 'An attention-guided MultiResUNet maps trajectories from five shoe-mounted markers to three force and three moment waveforms. The study compared model estimates with laboratory force measurements using two public gait datasets.',
    result: 'The paper reports comparisons across walking and running conditions and evaluates when the motion-based estimates agree with measured force and moment profiles.',
    contribution: 'I contributed to the methodology, model development, cross-dataset evaluation, and writing.',
    scope: 'The study uses optical marker trajectories. The ongoing wearable project evaluates inertial inputs and the alignment needed for those measurements.',
    relatedProjects: ['multimodal-wearable-kinetics', 'wearable-foot-kinetics'],
  },
  {
    slug: 'smart-insoles-diabetic-foot', area: 'Wearable biomechanics',
    title: 'Smart insoles for plantar pressure and temperature',
    summary: 'Building and testing electronic and fibre-optic insoles for plantar monitoring, with follow-up work on graphene temperature sensors.',
    period: '2020–2024', context: 'Qatar University · QNRF Undergraduate Research Experience Program and follow-on work',
    doi: '10.1016/j.sna.2022.114092',
    approach: 'The electronic design uses 16 pressure sensors and eight temperature sensors per insole with wireless data acquisition. The fibre Bragg grating design measures both quantities through an optical sensing system. We evaluated performance during static and walking tasks. Later work characterised laser-induced graphene sensors for plantar temperature mapping.',
    result: 'The fibre-optic insole measured plantar pressure and temperature at the same time with reasonable precision and displayed foot pressure maps, temperature maps and gait-cycle plots in real time. Compared with a commercial plantar pressure system, it used far fewer sensors and cost more than eight times less to develop.',
    contribution: 'I integrated sensors and worked on data acquisition, experiments and analysis for the electronic prototype. I led system development and evaluation for the fibre-optic insole and contributed to testing the graphene temperature sensors.',
    scope: 'These studies evaluate measurement prototypes in controlled experiments. Clinical detection of ulcer onset requires a longitudinal study.',
    related: ['10.3390/s22197599', '10.1109/jsen.2023.3317768'],
    relatedProjects: ['diabetic-foot-thermal-imaging'],
    visual: {
      image: insoleFbg,
      alt: 'Three panels: a rendered 3D model of the insole with a spiral optical fibre, the assembled prototype with its fibre cable, and the optical and electronic insoles placed inside a pair of sneakers.',
      caption: 'Figure 4 from Mahmud et al. (2023). (a) 3D model of the fibre Bragg grating insole, (b) the prototype used for data acquisition, and (c) the optical and electronic insoles side by side in a pair of sneakers.',
      credit: sourceArticle('10.1016/j.sna.2022.114092'),
      licence: elsevier(2022, 'B.V.'),
    },
    figures: [
      {
        section: 'results',
        image: insoleTemperature,
        alt: 'Two pairs of foot temperature heat maps for the left and right foot. The second pair, recorded after one hour, shows warmer regions than the first.',
        caption: 'Figure 9 from Mahmud et al. (2023). Plantar temperature maps at the start of recording (a) and after one hour (b).',
        credit: sourceArticle('10.1016/j.sna.2022.114092'),
        licence: elsevier(2022, 'B.V.'),
      },
    ],
  },
  {
    slug: 'diabetic-neuropathy-gait-emg', area: 'Wearable biomechanics',
    title: 'Wearable gait and EMG analysis for diabetic polyneuropathy',
    summary: 'A low-cost wireless smart insole and machine-learning models that study altered vertical ground reaction forces in diabetic sensorimotor polyneuropathy.',
    question: 'Can a low-cost wireless insole record the changes in foot loading that diabetic sensorimotor polyneuropathy causes, and can machine learning use them to separate healthy, diabetic and ulcer gait?',
    period: '2019–2021',
    context: 'Qatar University BSc senior design project · QNRF UREP23-031-2-014 · QNRF NPRP12S-0227-190164',
    approach: dspnApproach,
    workflow: dspnWorkflow,
    visual: dspnVisual,
    progress: dspnProgress,
    contribution: 'I was first author of the UREP poster. In the senior design project I calibrated the temperature sensors, designed the third and fourth PCB revisions, redesigned the insole with a teammate, and built the machine-learning pipeline: signal segmentation and normalisation, feature extraction, classifier training and evaluation. Under the NPRP project I analysed gait-cycle and EMG data with machine learning.',
    scope: 'The pandemic prevented the team from recording its own participants, so the classifiers were trained and tested on 76 subjects from a published force-plate dataset rather than on insole recordings. With so few subjects per class, the results show feasibility rather than clinical performance. The report’s next steps were to finish the hardware, record at least 500 participants with clinical approval, and move to deep learning.',
    resources: [
      { label: 'UREP poster', href: dspnPosterUrl },
      { label: 'Senior design project report', href: dspnReportUrl },
    ],
  },
  {
    slug: 'gait-pattern-modelling', area: 'Wearable biomechanics',
    title: 'Gait patterns in movement disorders and Tai Chi training',
    summary: 'Using ground reaction force waveforms and gait-cycle features to study movement disorders and training-related differences in walking.',
    doi: '10.1007/s10489-023-04557-w',
    approach: 'NDDNet combined waveform and gait-cycle features in a 64-participant dataset with healthy, Parkinson’s disease, Huntington’s disease and ALS groups. A separate analysis used scaled gait measurements and participant-wise validation in a 57-person longitudinal Tai Chi study.',
    result: 'NDDNet detected the three neurodegenerative diseases with 96.75% average accuracy in the 64-participant dataset. In the Tai Chi study, subject-wise five-fold cross-validation separated Tai Chi masters from controls during single-task walking with 88.17% accuracy and a 93.10% ROC AUC.',
    measures: [
      { value: '96.75%', label: 'Average accuracy across three diseases (NDDNet)' },
      { value: '88.17%', label: 'Tai Chi masters versus controls, single-task walking' },
    ],
    contribution: 'I contributed to gait-data analysis, evaluation of deep and classical models, interpretation, and manuscript review.',
    scope: 'The studies used distinct datasets, labels, and questions. Model performance is specific to each cohort and evaluation protocol.',
    related: ['10.1016/j.compbiomed.2021.105184'],
    visual: {
      image: gaitPatterns,
      alt: 'Four line plots of normalised force over a gait cycle for healthy controls and people with ALS, Huntington’s disease and Parkinson’s disease: the vertical ground reaction force, its first and second derivatives, and its integral. Shaded bands show the spread within each group.',
      caption: 'Figure 3 from Faisal et al. (2023). Vertical ground reaction force patterns (a), their first (b) and second (c) derivatives, and their integral (d) for each group.',
      credit: sourceArticle('10.1007/s10489-023-04557-w'),
      licence: springer(2023),
    },
    figures: [
      {
        section: 'results',
        image: gaitCurves,
        alt: 'Receiver operating characteristic and precision–recall curves for four comparisons with healthy controls. Areas under the ROC curve are 1.00 for ALS, 0.96 for Huntington’s disease, 0.97 for Parkinson’s disease and 0.96 for all three diseases combined.',
        caption: 'Figure 6 from Faisal et al. (2023). ROC (a) and precision–recall (b) curves for NDDNet against healthy controls.',
        credit: sourceArticle('10.1007/s10489-023-04557-w'),
        licence: springer(2023),
      },
    ],
  },
];

const imaging: ResearchProject[] = [
  existing('kidney-stone-segmentation'),
  existing('prenatal-hydronephrosis'),
  {
    slug: 'renal-tumour-modelling', area: 'Medical imaging',
    title: 'Renal tumour classification and surgical approach modelling',
    summary: 'Combining contrast-enhanced CT with clinical information to classify renal tumours and study how surgical approaches can be predicted.',
    doi: '10.3390/cancers15123189', context: 'MSc research at Qatar University',
    approach: 'The study used contrast-enhanced CT and metadata from the public KiTS cohort. It extracted a tumour region, learned imaging features, and combined those features with clinical variables. The study evaluated tumour subtype classification and prediction of partial versus radical nephrectomy as separate tasks.',
    result: 'The paper reports 85.66% accuracy for the combined tumour classification model and 90.63% for surgical approach prediction in the evaluated cohort. Feature ranking identified tumour volume and cancer stage as informative for the surgical task.',
    measures: [
      { value: '85.66%', label: 'Tumour subtype classification accuracy' },
      { value: '90.63%', label: 'Surgical approach prediction accuracy' },
      { value: '300', label: 'Subjects in the KiTS21 cohort' },
    ],
    contribution: 'I contributed to the study design, software, data curation, validation, visualisation and writing as part of my MSc thesis.',
    scope: 'The surgical model predicts approaches recorded in the study data. Prospective clinical validation would be needed before using it to guide care.',
    resources: [{ label: 'Qatar University MSc thesis', href: 'https://qspace.qu.edu.qa/handle/10576/45080' }],
    relatedProjects: ['kidney-stone-segmentation', 'prenatal-hydronephrosis'],
    visual: {
      image: renalFramework,
      alt: 'Pipeline diagram. CT slices are filtered to kidney slices, a YOLO model extracts the tumour region, and image features are combined with selected clinical features to classify tumour subtype and predict partial or radical nephrectomy.',
      caption: 'Figure 1 from Mahmud et al. (2023). CT slices without kidney are removed before a detector extracts the tumour region. Image features and preoperative clinical features then feed the subtype and surgical-approach models.',
      credit: sourceArticle('10.3390/cancers15123189'),
      licence: ccBy,
    },
    figures: [
      {
        section: 'results',
        image: renalFeatures,
        alt: 'Horizontal bar chart of random forest feature importance for surgical approach selection. Radiographic tumour size and cancer stage rank highest, followed by body mass index and age at nephrectomy.',
        caption: 'Figure 9 from Mahmud et al. (2023). Random forest ranking of the clinical features that informed surgical approach prediction.',
        credit: sourceArticle('10.3390/cancers15123189'),
        licence: ccBy,
      },
    ],
  },
  {
    slug: 'diabetic-foot-thermal-imaging', area: 'Medical imaging',
    title: 'SmartWoundCare: AI-assisted diabetic foot assessment from colour and thermal images',
    summary: 'Combining smartphone photographs with radiometric thermal images of the feet to identify diabetic neuropathy and grade foot ulcer severity.',
    question: 'Can paired colour and thermal images of the feet, taken with a smartphone and a handheld thermal camera, support screening for diabetic neuropathy and grading of foot ulcers?',
    period: 'July 2025–present', status: 'Ongoing research',
    context: 'Qatar University High Impact Grant QUHI-CENG-25/26-721',
    approach: 'A colour photograph shows the skin, calluses and wounds, while a thermal image shows how temperature is distributed across the sole, which changes with nerve damage, inflammation and poor circulation. The project pairs the two images for each foot, isolates the foot in both, and tests how best to combine them for two clinical questions: whether a person has diabetic peripheral neuropathy, and how severe a foot ulcer is.',
    workflow: ['Pair colour and thermal images', 'Segment and align each foot', 'Fuse the two and classify'],
    progress: [
      {
        id: 'image-pipeline',
        navLabel: 'Image pipeline',
        title: 'Preparing paired colour and thermal foot images',
        status: 'Data curation and preprocessing',
        paragraphs: [
          'Each examination pairs a smartphone photograph with a radiometric image from a handheld FLIR camera. The pipeline checks and de-identifies the clinical collection, extracts a calibrated temperature map in degrees Celsius from every thermal image, and detects the left and right foot in both images. Several Segment Anything (SAM) family models then outline each foot, their masks are combined into a consensus, and the results are reviewed and corrected by hand.',
        ],
      },
      {
        id: 'neuropathy',
        navLabel: 'Neuropathy identification',
        title: 'Identifying diabetic peripheral neuropathy',
        status: 'Manuscript under review',
        paragraphs: [
          'The first study fuses the segmented colour and thermal images of the sole into a single image and classifies people with clinically confirmed diabetic peripheral neuropathy and controls with a vision transformer model. Evaluation keeps all images from a participant in the same fold. In ablation experiments, the fused images outperformed colour or thermal images alone. Details will follow publication.',
        ],
      },
      {
        id: 'ulcer-severity',
        navLabel: 'Ulcer severity grading',
        title: 'Aligning the two views and grading ulcer severity',
        status: 'Experiments in progress',
        paragraphs: [
          'The thermal camera and the phone see the foot from different positions, so the second study first registers each thermal foot to the same foot in the photograph. It compares box-based, learned and outline-based alignment, including a matcher trained without manual annotation, and measures alignment accuracy against hand-placed anatomical landmarks and mask overlap. The aligned inputs combine absolute temperature, the temperature difference between the two feet and colour. They are used to compare early, feature-level and decision-level fusion for multiclass ulcer severity grading, using severity labels assigned by clinicians.',
        ],
      },
    ],
    contribution: 'I developed the multimodal image pipeline: temperature extraction, foot detection, SAM-based segmentation with consensus masks, and cross-modal registration with its landmark-based evaluation. I also prepare the fused model inputs and run the fusion and classification experiments.',
    scope: 'This is ongoing work, so this page gives an overview only. Results will be added as the studies are published. The models use de-identified clinical images and are research tools, not validated for diagnosis.',
    relatedProjects: ['smart-insoles-diabetic-foot', 'multiphase-liver-ct'],
  },
  {
    slug: 'multiphase-liver-ct', area: 'Medical imaging',
    title: 'LiPIVOT: liver and tumour segmentation across contrast-enhanced CT phases',
    summary: 'Adapting a medical segmentation foundation model to outline the liver and liver tumours on CT across contrast phases and independent cohorts.',
    question: 'Can fine-tuning a segmentation foundation model on liver CT outperform the model used as it is, and stay reliable on hospitals, scanners and contrast phases it was not trained on?',
    period: 'January 2025–present', status: 'Ongoing research', context: 'Qatar University',
    approach: 'Liver tumours are assessed on CT scans taken at several times after a contrast injection, and each phase shows the liver and lesions differently. LiPIVOT starts from MedSAM2, a foundation model that segments 3D scans by propagating a mask from one prompted slice to its neighbours. The portal-venous phase is the anchor: the model is first adapted for the liver on that phase, then extended to tumours and to the other phases, and the phase-specific results are finally brought into a common space and combined.',
    workflow: ['Detect the liver and prompt the model', 'Segment through each CT volume', 'Combine the contrast phases'],
    progress: [
      {
        id: 'liversam',
        navLabel: 'LiverSAM',
        title: 'LiverSAM: adapting MedSAM2 to portal-venous CT',
        status: 'Stage 1 · experiments in progress',
        paragraphs: [
          'The first stage fine-tunes MedSAM2 for the liver on about 600 portal-venous CT scans from eight public datasets. Each dataset is held out in turn, so every test measures performance on a cohort the model has not seen. Untouched MedSAM2 is compared with four fine-tuning settings that unfreeze progressively more of the network, from the mask decoder alone to the image encoder.',
          'The untouched model is already a strong baseline, so the protocol is designed to make the comparison fair. Training follows the same slice-by-slice propagation used at test time and includes slices beyond the liver, so the model learns where the organ ends. Evaluation reports surface-distance measures and mask leakage outside the liver as well as overlap. A YOLO liver detector provides the starting box prompt for scans without reference masks.',
        ],
      },
      {
        id: 'tumours-phases',
        navLabel: 'Tumours and phases',
        title: 'Extending to tumours and other contrast phases',
        status: 'Stages 2 and 3 · data prepared',
        paragraphs: [
          'Next, a tumour model and phase-specific experts will be adapted using further public multiphase liver CT collections. Their segmentations will be mapped into the portal-venous space of each patient and fused into a consensus. An optional final stage will classify tumours from the combined phases.',
        ],
      },
    ],
    contribution: 'I lead the LiPIVOT pipeline: curating and quality-checking the eight-dataset CT collection, the LiverSAM training and leave-one-dataset-out evaluation protocol, automatic prompting, and the metrics used to compare fine-tuned and untouched models.',
    scope: 'This is ongoing work, so this page gives an overview only. Results will be added as the studies are published. Scores that use a box prompt drawn from the reference mask are reported separately from fully automatic results. The published liver MRI project is a separate study.',
    relatedProjects: ['liver-mri-segmentation', 'kidney-stone-segmentation'],
  },
  {
    slug: 'liver-mri-segmentation', area: 'Medical imaging',
    title: 'Liver segmentation in T1-weighted MRI',
    summary: 'Comparing 24 deep learning architectures and testing whether a cascaded model improves whole-liver segmentation.',
    doi: '10.3390/s23218890',
    approach: 'The study benchmarked deep segmentation architectures on T1-weighted MRI and evaluated a cascade that focuses the segmentation stage on the liver region. It also described how model updates could be managed in a cloud-based workflow.',
    result: 'Using 647 T1-weighted in-phase slices from 20 patients in the public CHAOS dataset, the cascaded network reached a 95.15% Dice score and 92.10% IoU. This exceeded the earlier results reported on the same test set.',
    measures: [
      { value: '95.15%', label: 'Liver segmentation Dice' },
      { value: '92.10%', label: 'Liver segmentation IoU' },
      { value: '24', label: 'Segmentation networks compared' },
    ],
    contribution: 'I contributed to data curation, software implementation, and drafting and revising the paper.',
    scope: 'The published endpoint is segmentation of the liver on T1-weighted MRI. Tumour segmentation in multiphase CT is addressed in the ongoing CT project.',
    relatedProjects: ['multiphase-liver-ct'],
    visual: {
      image: liverMasks,
      alt: 'Four axial MRI slices with small liver regions, shown in three rows: the ground-truth liver outline, the outline predicted by the generalised network, and the outline predicted by the specialised network.',
      caption: 'Figure 10 from Hossain et al. (2023). Liver masks from the generalised and specialised networks for MRI slices with little liver content, compared with the ground truth.',
      credit: sourceArticle('10.3390/s23218890'),
      licence: ccBy,
    },
    figures: [
      {
        section: 'approach',
        image: liverCascade,
        alt: 'Diagram of the cascade. Each MRI slice goes to a generalised UNet++ network. If the predicted mask is smaller than a threshold, a specialised network re-segments the slice.',
        caption: 'Figure 7 from Hossain et al. (2023). A generalised network segments every slice. Slices with small predicted masks are passed to a specialised network.',
        credit: sourceArticle('10.3390/s23218890'),
        licence: ccBy,
      },
    ],
  },
  {
    slug: 'covid-chest-imaging', area: 'Medical imaging',
    title: 'COVID-19 localisation and grading from chest images',
    summary: 'Using chest radiographs and CT to outline the lungs, localise infection, and estimate the extent of pulmonary involvement.',
    doi: '10.1016/j.compbiomed.2021.105002',
    approach: 'In the radiograph study, lung segmentation defined the analysis region and infection masks on a separately annotated subset supported localisation and grading. A parallel CT study estimated involvement from segmented lung and infection regions. The subsequent radiograph classification benchmark compared 21 pretrained encoders across four image categories.',
    result: 'In the radiograph study, lung segmentation reached a 97.99% Dice score and infection segmentation 88.21%. COVID-19 detection had sensitivity and specificity above 99%. The team released COVID-QU-Ex, a collection of 33,920 chest radiographs with lung segmentation annotations. The companion paper describes the separate infection-mask subset.',
    measures: [
      { value: '97.99%', label: 'Lung segmentation Dice' },
      { value: '88.21%', label: 'Infection segmentation Dice' },
      { value: '33,920', label: 'Radiographs in COVID-QU-Ex' },
    ],
    contribution: 'I helped curate and evaluate the radiograph benchmark and contributed to analysis, validation, and interpretation across the chest imaging studies.',
    scope: 'The reported evaluations use retrospective image collections. Each study has its own imaging modality, annotation protocol and task.',
    related: ['10.3390/diagnostics11050893', '10.5121/csit.2022.122001'],
    relatedProjects: ['covidcare-remote-monitoring'],
    visual: {
      image: covidPipeline,
      alt: 'Pipeline diagram. A chest radiograph goes to two encoder–decoder networks that produce a lung mask and an infection mask. Superimposing the masks localises the infection, reports 37.6% lung involvement in the example, and gives a COVID-19 positive or negative result.',
      caption: 'Figure 3 from Tahir et al. (2021). Two segmentation networks run in parallel. Combining the lung and infection masks localises and quantifies infection and supports COVID-19 detection.',
      credit: sourceArticle('10.1016/j.compbiomed.2021.105002'),
      licence: ccBy,
    },
    figures: [
      {
        section: 'results',
        image: covidFollowUp,
        alt: 'Three chest radiographs of one patient on consecutive days, with predicted lung outlines in green and infection outlines in red. Estimated lung involvement rises from 27.1% on day 1 to 46.6% on day 2 and 100% on day 3.',
        caption: 'Figure 5b from Tahir et al. (2021), cropped to the follow-up example. Predicted infection extent for one patient over three consecutive days.',
        credit: sourceArticle('10.1016/j.compbiomed.2021.105002'),
        licence: ccBy,
      },
    ],
  },
  {
    slug: 'image-based-curvature-measurement', area: 'Medical imaging',
    title: 'Quantitative curvature measurement from images',
    summary: 'Testing an image-based approach to quantify penile curvature on 3D-printed anatomical models.',
    doi: '10.3389/fped.2023.1149318',
    approach: 'The pipeline localised and segmented each model in the image and used its outline to calculate a curvature angle. Nine 3D models provided a controlled setting to evaluate this measurement workflow.',
    result: 'Across 913 images of the 3D-printed models, with curvature from 18° to 86°, the mean absolute error of the angle estimate was below 5° for both the images and their segmentation masks.',
    measures: [
      { value: '< 5°', label: 'Mean absolute angle error on model images' },
      { value: '913', label: 'Images of nine 3D-printed models' },
    ],
    contribution: 'I assisted with the experiments and helped prepare and revise the manuscript.',
    scope: 'The main evaluation used 3D-printed models. A small set of patient images was compared with a clinical expert’s assessment, and clinical use would require broader validation.',
    visual: {
      image: curvaturePipeline,
      alt: 'Pipeline diagram. A photograph of a 3D-printed model is localised and cropped, the shaft is segmented, key points are detected, and the curvature angle is calculated. A second approach detects key points on the cropped image directly.',
      caption: 'Figure 1 from Baray et al. (2023). Two measurement approaches: key points from the segmented shaft, or key points from the cropped image. Both end in an angle calculation.',
      credit: sourceArticle('10.3389/fped.2023.1149318'),
      licence: ccBy,
    },
    figures: [
      {
        section: 'results',
        image: curvatureEstimates,
        alt: 'Two box plots of predicted against true curvature angles for nine models from 18° to 86°, one from images and one from masks. The mask-based estimates spread less around each true angle.',
        caption: 'Figure 8 from Baray et al. (2023). Estimated angles for each model from the original images (left) and from the segmentation masks (right).',
        credit: sourceArticle('10.3389/fped.2023.1149318'),
        licence: ccBy,
      },
    ],
  },
];

const signals: ResearchProject[] = [
  existing('nabnet'),
  {
    slug: 'contactless-cardiovascular-waveforms', area: 'Physiological signal processing',
    title: 'Cardiovascular waveforms from radar and facial video',
    summary: 'Estimating blood pressure, ECG, and optical pulse waveforms using contactless recordings.',
    doi: '10.1007/s00521-025-11327-x',
    approach: 'One study estimated beat-to-beat arterial pressure from radar in-phase and quadrature channels. Another used a multiresolution network to reconstruct ECG from radar during rest, Valsalva and apnoea. A separate video study used a compact encoder–decoder to recover photoplethysmography from facial recordings and assessed waveform and derived heart-rate agreement.',
    result: 'In the radar ECG study, MultiResLinkNet had the highest spectral correlation with the reference ECG among the compared networks, from 74.66% during apnoea to 82.44% at rest. In the video study, the recovered pulse waveform had a Pearson correlation of 0.862 with the reference, and the derived heart rate had a mean absolute error of 1.51 beats per minute.',
    contribution: 'I proposed applying one-dimensional reconstruction to the radar blood-pressure task and contributed to model development, evaluation and interpretation. I also implemented the video pulse estimation pipeline and contributed to the radar ECG methodology.',
    scope: 'Radar and video were evaluated in separate studies, with different reference signals and recording conditions.',
    related: ['10.1016/j.compbiomed.2024.108555', '10.1016/j.bspc.2023.105687'],
    relatedProjects: ['nabnet', 'wearable-cardiac-waveforms'],
    visual: {
      image: radarEcg,
      alt: 'Five stacked traces at rest: the radar signal, followed by the reference ECG in green and the ECG predicted by FPN, U-Net, LinkNet and MultiResLinkNet in red. The predicted R-peaks line up with the reference beats.',
      caption: 'Figure 5 from Chowdhury et al. (2024), from the radar ECG study. ECG synthesised from radar at rest by FPN (b), U-Net (c), LinkNet (d) and the proposed MultiResLinkNet (e), compared with the reference ECG.',
      credit: sourceArticle('10.1016/j.compbiomed.2024.108555'),
      licence: elsevier(2024),
    },
  },
  {
    slug: 'wearable-cardiac-waveforms', area: 'Physiological signal processing',
    title: 'Wearable pulse restoration and cardiac rhythm analysis',
    summary: 'Recovering pulse morphology from wrist PPG and studying how waveform restoration affects heart rate, variability, and rhythm detection.',
    doi: '10.1016/j.eswa.2024.123167',
    approach: 'A two-stage one-dimensional CycleGAN based on super-operational layers restores noisy wrist PPG and maps it toward finger PPG. A follow-on study evaluated atrial fibrillation detection on restored signals. A separate M2ECG study reconstructed ECG from wearable cardiac vibration and rotation measurements.',
    result: 'The multichannel translator improved wrist-to-finger translation by 35.88% on the study’s PRTX metric. Compared with raw wrist PPG, correlation with ECG-derived heart rate improved by about 10.4% and correlation with heart-rate variability by about 14.7%.',
    measures: [
      { value: '35.88%', label: 'Improvement in wrist-to-finger translation (PRTX)' },
      { value: '+10.4%', label: 'Heart-rate correlation with ECG' },
      { value: '+14.7%', label: 'Heart-rate variability correlation with ECG' },
    ],
    contribution: 'I led the wrist-to-finger restoration workflow and experiments, adapted CycleGAN for the atrial fibrillation study, and contributed to the methodology and evaluation for M2ECG.',
    scope: 'Restoration quality, derived heart rate and variability, and rhythm classification were evaluated as distinct endpoints on the study recordings.',
    related: ['10.1016/j.bspc.2024.107233', '10.1109/access.2024.3353463'],
    visual: {
      image: ppgExamples,
      alt: 'Three example rows. Each shows a noisy wrist PPG segment, the restored wrist PPG, and the translated finger PPG, next to the reference finger PPG and ECG recorded at the same time.',
      caption: 'Figure 8 from Mahmud et al. (2024), cropped to examples a–c. TTR-GAN restores the wrist signal and then translates it to a finger PPG, shown beside the reference finger PPG and ECG.',
      credit: sourceArticle('10.1016/j.eswa.2024.123167'),
      licence: ccBy,
    },
    figures: [
      {
        section: 'approach',
        image: ppgFramework,
        alt: 'Two-part framework diagram. In the first part, separate CycleGANs restore the wrist PPG and its first and second derivatives. In the second part, a multichannel CycleGAN translates the restored wrist signals to finger PPG for heart-rate and variability analysis.',
        caption: 'Figure 1 from Mahmud et al. (2024). Blind restoration of wrist PPG and its derivatives (a), followed by supervised wrist-to-finger translation (b).',
        credit: sourceArticle('10.1016/j.eswa.2024.123167'),
        licence: ccBy,
      },
    ],
  },
  {
    slug: 'qscare-doppler-flow', area: 'Physiological signal processing',
    title: 'QSCare: cerebral blood-flow analysis with transcranial Doppler',
    summary: 'Recovering cerebral flow-velocity waveforms from Doppler audio and evaluating models to identify abnormal patterns.',
    period: 'June 2022–June 2023', context: 'Qatar University High Impact Grant',
    doi: '10.1016/j.bspc.2023.104882',
    approach: 'Extract velocity waveforms from audio from the internal carotid and middle cerebral arteries. Use one-dimensional generative restoration for degraded recordings and compare classifiers for healthy and intensive-care data. The companion publications study abnormal middle cerebral artery flow using enhanced waveforms and attention-based classifiers.',
    contribution: 'I worked on waveform extraction and restoration, classifier development, data curation and analysis, MATLAB implementation, and writing.',
    workflow: ['Extract ICA and MCA flow waveforms', 'Restore degraded recordings', 'Evaluate abnormal-flow classifiers'],
    result: 'In five-fold cross-validation, the two-stream DopplerNet2+ model separated healthy and intensive-care middle cerebral artery waveforms with 99.45% accuracy and an area under the ROC curve of 1.00.',
    measures: [
      { value: '99.45%', label: 'Healthy versus intensive-care accuracy' },
      { value: '1.00', label: 'Area under the ROC curve' },
    ],
    scope: 'The published comparisons use the available retrospective Doppler recordings and study labels.',
    related: ['10.3390/diagnostics13122000'],
    visual: {
      image: dopplerOverview,
      alt: 'Method overview. Transcranial Doppler ultrasound produces a spectrogram, a flow-velocity algorithm extracts the maximal velocity waveform, the waveforms are cleaned and restored with a CycleGAN, and a two-stream DopplerNet2+ classifier labels each recording as healthy or intensive care.',
      caption: 'Figure 2 from Kanti Podder et al. (2023). From Doppler spectrograms to maximal flow-velocity waveforms, CycleGAN restoration and two-stream classification.',
      credit: sourceArticle('10.1016/j.bspc.2023.104882'),
      licence: elsevier(2023),
    },
    figures: [
      {
        section: 'approach',
        image: dopplerRestored,
        alt: 'Four plots of middle cerebral artery waveforms, two from healthy and two from intensive-care recordings. Each overlays the original waveform in blue and the CycleGAN-processed waveform in orange.',
        caption: 'Figure 7 from Kanti Podder et al. (2023). Original and CycleGAN-processed waveforms for the healthy (a, b) and intensive-care (c, d) classes.',
        credit: sourceArticle('10.1016/j.bspc.2023.104882'),
        licence: elsevier(2023),
      },
    ],
  },
  {
    slug: 'ecg-restoration-during-mri', area: 'Physiological signal processing',
    title: 'ECG restoration and R-peak detection during MRI',
    summary: 'Recovering ECG morphology and heartbeat timing when strong magnetic fields distort the measured signal.',
    doi: '10.1016/j.engappai.2024.108483',
    approach: 'The waveform study evaluated two approaches to recover 12-lead ECG and heartbeat timing under magnetohydrodynamic distortion at 1, 3 and 7 tesla. The companion MHDNet study evaluated attention-based R-peak detection on 3- and 7-tesla recordings.',
    contribution: 'I led the waveform restoration study design, data curation, model development, experiments and writing, and contributed to MHDNet development and validation.',
    result: 'Unpaired restoration with MHDGAN improved the spectral correlation of the distorted 12-lead ECG by 92.56%, and the comprehensive MHD2ECGNet restoration by 77.64%. R-peak detection on the MHDGAN output reached a 96.01% F1 score. In the companion MHDNet study, R-peak detection reached 99.83% recall and 99.68% precision at 3 tesla.',
    measures: [
      { value: '92.56%', label: 'Spectral correlation improvement (MHDGAN)' },
      { value: '96.01%', label: 'R-peak detection F1 after restoration' },
    ],
    scope: 'Waveform recovery and R-peak detection are distinct objectives, with performance reported for the evaluated MRI recordings.',
    related: ['10.3390/bioengineering10050542'],
    visual: {
      image: mhdFramework,
      alt: 'Three-phase framework diagram. Phase 1 segments QRS pulse trains from distorted ECG. Phase 2 uses the pulse trains to guide unpaired restoration with a 1D CycleGAN called MHDGAN. Phase 3 trains MHD2ECGNet for general restoration of all 12 leads.',
      caption: 'Figure 2 from Mahmud et al. (2024). QRS pulse-train segmentation (Phase 1), QRS-guided unpaired restoration with MHDGAN (Phase 2) and general 12-lead restoration with MHD2ECGNet (Phase 3).',
      credit: sourceArticle('10.1016/j.engappai.2024.108483'),
      licence: elsevier(2024),
    },
    figures: [
      {
        section: 'results',
        image: mhdSpectra,
        alt: 'Power spectral density plot from 0 to 40 Hz comparing clean ECG, distorted ECG and ECG restored in Phases 2 and 3. The distorted ECG departs from the clean spectrum, with a bump at low frequencies, while the restored signals follow the clean spectrum more closely.',
        caption: 'Figure 6 from Mahmud et al. (2024). Power spectral density of the clean, distorted and restored ECG.',
        credit: sourceArticle('10.1016/j.engappai.2024.108483'),
        licence: elsevier(2024),
      },
    ],
  },
  {
    slug: 'eeg-artefact-restoration', area: 'Physiological signal processing',
    title: 'EEG restoration under motion and physiological artefacts',
    summary: 'Removing motion, eye and muscle artefacts while evaluating preservation of the EEG signal in time and frequency.',
    doi: '10.1016/j.engappai.2023.107514',
    approach: 'Compare one-dimensional reconstruction strategies for motion-corrupted EEG, including a multiresolution pooled network and an attention-guided operational CycleGAN. Related experiments evaluated eye and muscle artefact removal with a multiscale residual U-Net and compared signal recovery with simpler convolutional baselines.',
    contribution: 'I led the MLMRS-Net and AGO-CycleGAN studies, including preprocessing, implementation, evaluation and writing, and contributed to the parallel eye and muscle artefact studies.',
    result: 'On the motion artefact benchmark, AGO-CycleGAN improved signal-to-noise ratio by 26.50 dB, temporal correlation by 87.2% and spectral correlation by 93.5%. In the eye and muscle artefact study, MultiResUNet3+ reduced EOG artefacts by 94.82% in time and 92.84% in frequency.',
    measures: [
      { value: '26.50 dB', label: 'Signal-to-noise improvement (AGO-CycleGAN)' },
      { value: '93.5%', label: 'Spectral correlation improvement' },
    ],
    scope: 'Each benchmark uses its own noise sources, signal construction and evaluation protocol. The papers report waveform and spectral recovery for those conditions.',
    related: ['10.1007/s00521-022-08111-6', '10.3390/bioengineering10050579', '10.5121/csit.2022.122006'],
    visual: {
      image: eegSpectra,
      alt: 'Power spectral density plot from 0 to 40 Hz. The motion-corrupted EEG lies far above the ground truth across all frequencies, while the restored EEG almost overlaps the ground truth.',
      caption: 'Figure 6 from Mahmud et al. (2024). Power spectral density of the ground-truth, motion-corrupted and restored EEG.',
      credit: sourceArticle('10.1016/j.engappai.2023.107514'),
      licence: elsevier(2023),
    },
    figures: [
      {
        section: 'approach',
        image: eegFramework,
        alt: 'CycleGAN framework diagram. A generator restores motion-corrupted EEG from one channel and a second generator maps clean EEG back. Discriminators, cycle-consistency losses and identity losses link the two directions.',
        caption: 'Figure 3 from Mahmud et al. (2024). The AGO-CycleGAN framework for restoring motion-corrupted EEG.',
        credit: sourceArticle('10.1016/j.engappai.2023.107514'),
        licence: elsevier(2023),
      },
    ],
  },
  {
    slug: 'fetal-ecg-extraction', area: 'Physiological signal processing',
    title: 'Fetal ECG extraction from maternal recordings',
    summary: 'Recovering fetal cardiac morphology and timing from abdominal recordings that mix maternal and fetal signals.',
    doi: '10.1016/j.engappai.2023.106414',
    approach: 'The team evaluated a deeply supervised LinkNet++ and a separate one-dimensional CycleGAN. Both studies used public datasets to assess waveform fidelity and fetal timing. The LinkNet++ study used leave-one-subject-out evaluation.',
    result: 'LinkNet++ reproduced the reference fetal ECG with Pearson correlations of 85.58% and 87.60% on two public datasets and detected fetal QRS complexes with F1 scores above 99% on both.',
    measures: [
      { value: '85.58% · 87.60%', label: 'Correlation with reference fetal ECG on two datasets' },
      { value: '> 99%', label: 'Fetal QRS detection F1' },
    ],
    contribution: 'I contributed to model methodology, experiments, quantitative evaluation, interpretation and manuscript preparation.',
    related: ['10.1016/j.eswa.2023.121196'],
    visual: {
      image: fetalPeaks,
      alt: 'Four pairs of plots, each with a ground-truth fetal ECG above the LinkNet++ prediction. Marked R-peaks in each prediction line up with the ground-truth peaks.',
      caption: 'Figure 6 from Rahman et al. (2023). Ground-truth and LinkNet++ fetal ECG with detected R-peaks for Dataset 1 (a, c) and Dataset 2a (b, d).',
      credit: sourceArticle('10.1016/j.engappai.2023.106414'),
      licence: elsevier(2023),
    },
    figures: [
      {
        section: 'approach',
        image: fetalPipeline,
        alt: 'Block diagram. Four-channel abdominal ECG from training subjects is baseline-corrected, filtered, segmented and normalised to train a model against ground-truth fetal ECG. Test recordings pass through the same preprocessing to the trained model, which predicts the fetal ECG.',
        caption: 'Figure 1 from Rahman et al. (2023). Preprocessing, training and prediction for extracting fetal ECG from abdominal recordings.',
        credit: sourceArticle('10.1016/j.engappai.2023.106414'),
        licence: elsevier(2023),
      },
    ],
  },
  {
    slug: 'covidcare-remote-monitoring', area: 'Physiological signal processing',
    title: 'COVIDCARE and remote monitoring from wearable and acoustic signals',
    summary: 'Prototyping wearable vital-sign acquisition and studying how smartwatch and respiratory sounds support retrospective COVID-19 research.',
    period: '2020–2023', context: 'Qatar University Emergency Response Concept Development Grant and related studies',
    approach: 'COVIDCARE developed wearable optical pulse and ECG acquisition for remote vital-sign monitoring. In separate published studies, PCovNet and PCovNet+ modelled resting heart-rate anomalies in smartwatch records around symptom onset, and QUCoughScope compared cough and breath audio and integrated the classifier into an application prototype.',
    contribution: 'I developed wearable acquisition hardware and physiological estimation methods. I also contributed to wearable-data analysis and to technical evaluation of the acoustic pipeline.',
    scope: 'The wearable and audio studies used distinct retrospective cohorts and protocols. Their results describe performance under the evaluated conditions.',
    related: ['10.1016/j.compbiomed.2022.105682', '10.1016/j.engappai.2023.106130', '10.3390/diagnostics12040920'],
    relatedProjects: ['covid-chest-imaging', 'nabnet'],
  },
  {
    slug: 'multimodal-glucose-estimation', area: 'Physiological signal processing',
    title: 'QU-GM: multimodal glucose estimation',
    summary: 'Combining photoplethysmography, blood pressure and demographic variables to study non-invasive glucose estimation.',
    doi: '10.1109/access.2024.3404971',
    approach: 'The study evaluated a machine-learning pipeline on recordings from 139 participants. It treated glucose estimation and diabetes severity classification as separate tasks and used the Clarke Error Grid as one means of assessing estimation error.',
    contribution: 'I contributed to physiological signal analysis, model evaluation, interpretation and manuscript review.',
    scope: 'The evaluation is a research study of glucose estimation. The model was assessed on the study data and protocol.',
  },
];

const spectroscopy: ResearchProject[] = [
  existing('cross-device-raman'),
  {
    slug: 'microbial-sers-validation', area: 'Spectroscopic sensing',
    title: 'Validation practices in label-free microbial SERS',
    summary: 'Reviewing 129 microbial SERS studies to examine how sample preparation, modelling and validation affect generalisability.',
    doi: '10.1016/j.talanta.2026.130241', status: 'Evidence review',
    approach: 'Track six stages from sample preparation and spectral acquisition to validation and deployment. Audit how studies split spectra and biological units, whether evaluation uses external cohorts and devices, and what evidence supports generalisation.',
    result: 'The audit found that 68.2% of studies lacked validation that kept biological samples independent across splits. Only 6.2% reported external or major-domain validation.',
    contribution: 'I designed the review, led the corpus audit and evidence synthesis, and prepared the figures, tables and manuscript.',
    scope: 'The percentages describe the studies in the review corpus and the information those publications reported.',
    relatedProjects: ['cross-device-raman', 'generalizable-microbial-sers', 'sers-sepsis-recognition'],
  },
  {
    slug: 'sers-sepsis-recognition', area: 'Spectroscopic sensing',
    title: 'Sepsis recognition and pathogen identification with SERS',
    summary: 'Evaluating analyte-enriched blood spectra with super-operational neural networks for two distinct classification tasks.',
    doi: '10.1016/j.talanta.2025.129332',
    approach: 'The workflow pairs analyte enrichment and surface-enhanced Raman acquisition with SuperRamanNet, a one-dimensional classifier. The study used 653 blood samples for the primary analysis and an independent external cohort of 70 samples. It evaluated sepsis recognition and pathogen identification as separate tasks.',
    result: 'Five-fold validation kept spectra from each blood sample together. Pathogen typing was also evaluated in the external cohort.',
    measures: [
      { value: '99.67%', label: 'Sepsis recognition accuracy in cross-validation' },
      { value: '98.84%', label: 'Six-class pathogen accuracy in cross-validation' },
      { value: '98.28%', label: 'External pathogen typing accuracy' },
    ],
    contribution: 'I developed the computational workflow from spectra and preprocessing through data splitting, training, evaluation and interpretation, and helped document the experimental protocol.',
    scope: 'The evaluation concerns the sample preparation, acquisition, labels and cohorts described in the paper. Clinical deployment would require further validation.',
    relatedProjects: ['cross-device-raman', 'microbial-sers-validation'],
    visual: {
      image: sepsisWorkflow,
      alt: 'Workflow illustration. Blood from sepsis and control subjects is centrifuged to enrich the analyte, which is placed on silver nanorod slides for SERS acquisition. The spectra are preprocessed and classified to separate control samples from five sepsis-causing bacterial strains.',
      caption: 'Figure 1 from Hassan et al. (2026). Sample collection and analyte enrichment (a), followed by SERS acquisition, preprocessing and classification (b).',
      credit: sourceArticle('10.1016/j.talanta.2025.129332'),
      licence: ccBy,
    },
    figures: [
      {
        section: 'results',
        image: sepsisEmbeddings,
        alt: 'Two scatter plots, t-SNE and UMAP, of SuperRamanNet embeddings. Points form six separate clusters, one for each class: E. coli, K. pneumoniae, P. aeruginosa, S. aureus, S. epidermidis and negative controls.',
        caption: 'Figure 5 from Hassan et al. (2026). t-SNE (a) and UMAP (b) projections of SuperRamanNet embeddings show six well-separated clusters.',
        credit: sourceArticle('10.1016/j.talanta.2025.129332'),
        licence: ccBy,
      },
    ],
  },
  {
    slug: 'generalizable-microbial-sers', area: 'Spectroscopic sensing',
    title: 'Spectral transfer and few-shot microbial recognition',
    summary: 'Studying how spectral mapping and time-series representations transfer to new instruments, classes, and sample conditions.',
    status: 'Ongoing research',
    approach: 'One workstream studies alignment of portable-device spectra to a reference instrument when target analytes are held out. A second benchmarks time-series foundation-model representations for few-shot classification with separated support and query samples.',
    contribution: 'I develop the spectral preprocessing, transfer and classification workflows and design comparisons that account for sample identity and differences between acquisition domains.',
    scope: 'The two workstreams address different questions. Alignment tests recovery of comparable spectra, while few-shot experiments assess how well representations support classification with limited examples.',
    relatedProjects: ['cross-device-raman', 'microbial-sers-validation'],
  },
];

const devices: ResearchProject[] = [
  {
    slug: 'hip-implant-mechanics-and-imaging', area: 'Biomedical devices & simulation',
    title: 'Hip implant mechanics, sensing, and loosening detection',
    summary: 'Studying implant design and loosening through finite element modelling, bench work, and radiograph analysis.',
    doi: '10.1109/access.2022.3173424', period: '2021–2024',
    context: 'Qatar University · Qatar National Research Fund project with clinical collaboration',
    approach: 'Build three-dimensional implant, femur and pelvis models in Fusion 360 and evaluate implant and loading scenarios with ANSYS. The publications examine stem materials, a spiral head–stem interface, and the simulated response of a surface acoustic wave sensor. The HipXNet workstream localises implants in radiographs before classifying aseptic loosening.',
    result: 'HipXNet’s stacked classifier detected aseptic loosening with 96.11% accuracy, and the team released annotated radiograph subsets for localisation and loosening classification. In the trunnion simulations, the spiral design had a predicted wear rate about 10% lower than the smooth design, at 0.039 compared with 0.048 mm³ per million loading cycles. The stem-material studies reported differences in stress transfer, stress shielding and micromovement.',
    measures: [
      { value: '96.11%', label: 'Loosening detection accuracy (HipXNet)' },
      { value: '≈ 10%', label: 'Lower predicted wear with the spiral trunnion' },
    ],
    visual: {
      image: hipDetection,
      alt: 'Six hip radiographs with implants. Red boxes mark the annotated implant regions and orange boxes mark the regions predicted by YOLOv5m, which overlap closely.',
      caption: 'Figure 8 from Rahman et al. (2022). Implant regions predicted by the best localisation model, YOLOv5m, on test radiographs, shown against the annotated regions.',
      credit: sourceArticle('10.1109/access.2022.3173424'),
      licence: ccBy,
    },
    figures: [
      {
        section: 'approach',
        image: hipTrunnion,
        alt: 'Engineering drawing of a hip implant stem with its head–neck dimensions, next to a 3D model. Insets compare the smooth and spiral surfaces of the head–stem taper junction.',
        caption: 'Figure 2a–b from Soliman et al. (2023), Materials. 2D and 3D views of the implant, with insets comparing the smooth and spiral head–stem taper junctions.',
        credit: sourceArticle('10.3390/ma16041466'),
        licence: ccBy,
      },
    ],
    contribution: 'I designed the spiral geometry and reconstructed a commercial implant stem in CAD. I contributed to finite element modelling, the bench-test setup with Hamad Medical Corporation, and development and evaluation of HipXNet.',
    workflow: ['Model the implant and surrounding bone', 'Evaluate materials, loading and sensing', 'Study loosening in radiographs'],
    scope: 'Finite element models compare specified materials, geometries and loads. The separate radiograph study uses retrospective labels. Each workstream has its own validation conditions.',
    related: ['10.1016/j.mtcomm.2024.110932', '10.3390/ma16041466', '10.3390/bios13010079', '10.1039/d3tb01469j', '10.3390/polym14204308'],
  },
  {
    slug: 'ecmo-cannulation-simulator', area: 'Biomedical devices & simulation',
    title: 'ECMO cannulation and circulation simulator',
    summary: 'Building a physical circulation model and sensor-equipped trainer for practising ultrasound-guided cannulation.',
    doi: '10.1109/scored.2019.8896240', period: 'August 2018–October 2019',
    context: 'Qatar University · Undergraduate Research Experience Program',
    approach: 'The prototype circulates fluid through a model of the human vasculature and uses ultrasound-compatible pads for cannulation practice. Sensors and control logic reproduce events such as low flow or problems with guidewire and cannula placement.',
    contribution: 'I helped design, build and test the prototype, wrote Arduino pump-control code, and contributed to technical documentation and publications. Training sessions at Hamad General Hospital and Al-Wakra Hospital provided clinical context for the work.',
    workflow: ['Model pulsatile circulation', 'Build ultrasound-guided cannulation tasks', 'Simulate procedural complications'],
    scope: 'The published work describes simulation and training hardware used for procedural practice.',
    related: ['10.1016/j.ejccm.2018.12.017', '10.5339/qmj.2019.qccc.61'],
    visual: {
      image: ecmoTrainer,
      alt: 'Left: block diagram in which force-sensing resistors and flow sensors feed a microcontroller that drives DC motors and laminar and pulsatile flow pumps. Right: photograph of the improved mannequin trainer with tubing and cannulation pads.',
      caption: 'Figure 1g–h from Mahmoud et al. (2019), Qatar Medical Journal, cropped to the embedded system diagram (g) and the improved prototype simulator (h).',
      credit: sourceArticle('10.5339/qmj.2019.qccc.61'),
      licence: ccBy,
    },
  },
  {
    slug: 'exoventq-ventilation', area: 'Biomedical devices & simulation',
    title: 'ExoventQ portable negative-pressure ventilation',
    summary: 'Building and evaluating a portable prototype with continuous and cyclic negative-pressure modes.',
    doi: '10.1109/access.2024.3390566',
    approach: 'The system applies negative pressure around a chamber and controls it through feedback. The team examined pressure tracking, switching between continuous and cyclic operation, and safety mechanisms for emergency release.',
    result: 'ANSYS stress analysis led to a squircle-shaped polycarbonate vessel designed to withstand up to 50 mbar of vacuum. In full-system tests the prototype tracked set pressures in both cyclic and continuous modes, and a safety switch halts ventilation if the vessel vacuum drops below 40 mbar.',
    contribution: 'I supported engineering analysis and prototype evaluation, interpreted test results, and contributed to the manuscript.',
    scope: 'The paper reports engineering performance of the prototype under its test protocol.',
    visual: {
      image: exoventOverview,
      alt: 'Illustration of the system. A patient lies in a pressure vessel connected through a three-way valve to a vacuum pump. A pressure sensor feeds a control circuit linked to a touchscreen interface.',
      caption: 'Figure 1 from Gaben et al. (2024). The negative-pressure vessel, three-way valve and pump, with pressure feedback to the control circuit and user interface.',
      credit: sourceArticle('10.1109/access.2024.3390566'),
      licence: ccBy,
    },
    figures: [
      {
        section: 'results',
        image: exoventTest,
        alt: 'Photograph of the touchscreen during a cyclic-mode test. It shows a pressure waveform with two breaths and readings of 19.66 cmH₂O inspiratory pressure, 4.54 cmH₂O expiratory pressure, a 1:3 I:E ratio and 20 breaths per minute.',
        caption: 'Figure 12a from Gaben et al. (2024). Interface during a full-system test in cyclic mode. Measured pressures of 19.66 and 4.54 cmH₂O against settings of 20 and 5 cmH₂O.',
        credit: sourceArticle('10.1109/access.2024.3390566'),
        licence: ccBy,
      },
    ],
  },
  {
    slug: 'aortic-wall-shear-stress', area: 'Biomedical devices & simulation',
    title: 'Estimating aortic wall shear stress from vessel geometry',
    summary: 'Using multiple views of abdominal aortic aneurysm shapes to approximate computational fluid dynamics outputs.',
    doi: '10.1007/s11517-025-03311-3',
    approach: 'Represent the geometry from multiple views and train deep models to estimate wall shear stress. The research evaluated predictions against computational fluid dynamics simulations for real and synthetic geometries.',
    contribution: 'I helped implement and integrate the model, evaluated successive versions, and troubleshot the modelling workflow.',
    scope: 'The reference is a computational simulation. Agreement depends on the represented geometries, boundary conditions and simulation assumptions.',
  },
];

const genomics: ResearchProject[] = [
  {
    slug: 'mendelian-rnaseq-outliers', area: 'Genomics & reproducibility',
    title: 'RNA-seq outlier detection in Mendelian disease',
    summary: 'Evaluating variational autoencoders to prioritise genes with unusual expression patterns.',
    period: 'May–July 2023', status: 'Research internship', context: 'Qatar Computing Research Institute, Hamad Bin Khalifa University',
    approach: 'Preprocess RNA sequencing measurements, learn a representation of expression profiles with a variational autoencoder, and examine genes that contribute to unusual patterns. Candidate prioritisation uses the model and expression evidence together.',
    contribution: 'I worked on preprocessing, anomaly analysis, interpretation of candidate genes, and reproducible documentation.',
    scope: 'The work explored a prioritisation method for follow-up. The analysis was part of a research internship.',
  },
  {
    slug: 'cancer-genomics-reproduction', area: 'Genomics & reproducibility',
    title: 'Reproducing selected cancer genomics analyses',
    summary: 'Tracing published analyses from source tables and author workflows in synthetic lethality and renal tumour evolution.',
    status: 'Independent reproduction',
    approach: 'The SYLVER notebook reconstructs selected plots using the original study’s source tables and re-fits selected clinical analyses. The TRACERx Renal work reruns selected author workflows for RNA expression, immune-state comparisons and tumour evolution with the supplied processed objects.',
    contribution: 'I organised the source evidence, implemented notebook workflows, checked agreement with published figures and tables, and documented discrepancies and exploratory sensitivity analyses.',
    scope: 'The linked papers are the original studies by their respective authors. The reproduction covers selected analyses and distinguishes replots, refits and workflows that use supplied processed data.',
    resources: [
      { label: 'Original SYLVER study', href: 'https://www.nature.com/articles/s41588-025-02108-2' },
      { label: 'Original TRACERx Renal study', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11873726/' },
    ],
    relatedProjects: ['renal-tumour-modelling'],
  },
];

const engineering: ResearchProject[] = [
  {
    slug: 'smart-meter-load-and-occupancy', area: 'Energy & applied machine learning',
    title: 'Non-intrusive appliance load and occupancy estimation',
    summary: 'Using aggregate smart-meter signals to recover appliance events and infer when a building is occupied.',
    doi: '10.1016/j.jobe.2025.113731', code: 'https://github.com/Sakib1263/NILOM',
    period: 'July 2023–July 2024', context: 'Qatar University and Iberdrola Innovation Middle East',
    approach: 'The cascaded NILOM framework first estimates appliance use from aggregate multichannel measurements and uses inferred device events for occupancy detection. A second study combines appliance-event, statistical and time-of-day features with ensemble classifiers. Both evaluate methods on the ECO dataset.',
    result: 'In the feature-fusion study, an ensemble of fine-tuned classifiers reached about 91.5% accuracy and a 91.5% F1 score for occupancy on the ECO dataset.',
    contribution: 'I led the study design, data curation, modelling, validation and original drafting for the cascaded and feature-fusion studies as part of the Iberdrola collaboration.',
    workflow: ['Prepare multichannel smart-meter records', 'Infer appliance events', 'Estimate and validate occupancy'],
    scope: 'The results reflect the household, meter and occupancy-label characteristics of the evaluated data. A related study evaluates a separate occupancy model with environmental sensors.',
    related: ['10.1016/j.buildenv.2025.112635', '10.1007/s00521-025-11348-6'],
    visual: {
      image: occupancyWeek,
      alt: 'Four panels, one per household, each comparing the ground-truth occupancy pulse in blue with the estimated occupancy in green over 168 hours. Most of each week is shaded green for correct estimates, with short red false-positive and blue false-negative periods.',
      caption: 'Figure 6 from Mahmud et al. (2025), Building and Environment, from the feature-fusion study. Ground-truth and estimated occupancy over one week in four ECO households. Green shading marks correct estimates, red false positives and blue false negatives.',
      credit: sourceArticle('10.1016/j.buildenv.2025.112635'),
      licence: ccBy,
    },
  },
  {
    slug: 'e-tawfeer-energy-management', area: 'Energy & applied machine learning',
    title: 'E-Tawfeer: edge analytics for residential energy efficiency',
    summary: 'Developing smart-plug analytics and reviewing deep reinforcement learning for energy-system decisions.',
    doi: '10.1016/j.rser.2025.116481',
    period: 'August 2024–June 2025', context: 'Qatar University · Qatar National Research Fund project',
    approach: 'The engineering work investigated smart plugs and distributed analytics for residential energy management, including federated learning. The linked review examines deep reinforcement learning across generation, storage, grid operations and market applications.',
    result: 'The review maps decision problems to reinforcement learning approaches and discusses deployment challenges including safe operation and transfer from simulation.',
    contribution: 'I contributed to smart-plug development and implemented federated-learning concepts. I led the review design, taxonomy, evidence synthesis, visualisation and writing.',
    scope: 'The review synthesises published results. The engineering work documents development activity on the energy platform.',
    relatedProjects: ['smart-meter-load-and-occupancy'],
  },
  {
    slug: 'ev-charging-demand', area: 'Energy & applied machine learning',
    title: 'Electric-vehicle charging demand from smart meters',
    summary: 'Identifying household demand patterns and candidate charging periods to inform distribution network planning.',
    period: 'November 2021–February 2022', context: 'Omdena, Energy Tech Hub and Centre for New Energy Technologies',
    approach: 'The team prepared aggregate meter data, compared hourly consumption patterns and used clustering to identify candidate vehicle charging events. The project compiled results in an Excel tool and dashboard for network operators.',
    contribution: 'I led a smart-meter analysis task covering exploratory analysis, clustering and time-series modelling.',
    resources: [{ label: 'Omdena project and reported outcomes', href: 'https://www.omdena.com/projects/ai-ev-charging' }],
  },
  {
    slug: 'climate-geopolitical-risk', area: 'Energy & applied machine learning',
    title: 'Geospatial analysis for climate and geopolitical risk',
    summary: 'Using satellite imagery and land-cover information in a team project on water and energy infrastructure risk in West and Central Africa.',
    period: 'July–October 2021', context: 'Omdena and Finz',
    approach: 'My workstream processed geospatial inputs and developed a TensorFlow pipeline for multiclass satellite-image segmentation. The wider team used public data, including satellite imagery and land cover, to build climate and geopolitical risk scores.',
    contribution: 'I led a task within the international team and implemented remote-sensing preparation and segmentation workflows.',
    resources: [{ label: 'Omdena project and reported outcomes', href: 'https://www.omdena.com/projects/geopolitical-risks' }],
  },
  {
    slug: 'gearbox-fault-detection', area: 'Applied machine learning',
    title: 'GearFaultNet vibration-based fault detection',
    summary: 'A lightweight one-dimensional classifier for detecting gearbox faults from multichannel vibration measurements.',
    doi: '10.1109/access.2024.3412274',
    approach: 'The study classified faults from four vibration channels and evaluated a compact network against ResNet baselines. The comparison examined fault recognition and model complexity on the study recordings.',
    result: 'GearFaultNet reached 94.04% overall accuracy, correctly classifying 92% of broken-gear windows and 96% of healthy windows.',
    contribution: 'I contributed to model evaluation, quantitative analysis, interpretation and manuscript review.',
    visual: {
      image: gearboxConfusion,
      alt: 'Two-by-two confusion matrix. 92% of broken-gear windows (3,409) and 96% of healthy windows (3,634) are classified correctly. 8% of broken-gear windows are labelled healthy and 4% of healthy windows are labelled broken.',
      caption: 'Figure 7 from Dutta et al. (2024). Overall confusion matrix for gear fault detection with GearFaultNet.',
      credit: sourceArticle('10.1109/access.2024.3412274'),
      licence: ccBy,
    },
  },
  {
    slug: 'recyclable-waste-classification', area: 'Applied machine learning',
    title: 'Image classification for recyclable waste',
    summary: 'Classifying waste images when scenes contain one type of material or several.',
    doi: '10.1016/j.wasman.2023.12.014',
    approach: 'The GCDN-Net study evaluated single-label and multi-label classification on the 25,000-image GIGO dataset. Score-CAM highlighted image regions that influenced predictions.',
    result: 'GCDN-Net reached 95.77% accuracy for single-label classification. For multi-label classification it reached a mean average precision of 0.69 and a 75.01% F1 score.',
    measures: [
      { value: '95.77%', label: 'Single-label accuracy' },
      { value: '75.01%', label: 'Multi-label F1 score' },
    ],
    contribution: 'I helped develop the framework and contributed to the evaluation, experimental analysis, interpretation and manuscript review.',
  },
  {
    slug: 'rotational-piezoelectric-harvesting', area: 'Engineering',
    title: 'Rotational piezoelectric energy harvesting',
    summary: 'Combining analytical and prototype work to study how magnetic oscillators affect operation across rotation speeds.',
    doi: '10.1007/978-981-97-3302-6_3',
    approach: 'The study pairs a rotational piezoelectric harvester with magnetic oscillators to broaden the operating bandwidth. It evaluates the design using modelling and prototype measurements.',
    contribution: 'I contributed to technical analysis, interpretation and manuscript review.',
  },
  {
    slug: 'vaccine-attitudes-analysis', area: 'Applied machine learning',
    title: 'Survey analysis of COVID-19 vaccine attitudes in Qatar',
    summary: 'Analysing survey responses to identify factors associated with willingness and hesitancy.',
    doi: '10.1080/10911359.2021.1973642',
    context: 'Qatar University MSc course project',
    approach: 'The study used quantitative analysis and machine learning on survey responses from residents in Qatar to examine attitudes to COVID-19 vaccination.',
    contribution: 'I contributed to the quantitative and machine-learning analysis, interpretation, and manuscript preparation.',
    scope: 'The study identifies associations within the survey sample and its collection period.',
  },
  {
    slug: 'super-operational-neural-layers', area: 'Applied machine learning',
    title: 'Super-operational neural network layers',
    summary: 'Developing reusable polynomial layers for one-dimensional signals and two-dimensional images.',
    status: 'Research software', code: 'https://github.com/Sakib1263/SuperONN-Layers',
    approach: 'The library implements polynomial super-operational layers for PyTorch and TensorFlow/Keras. It supports forward and transposed 1D and 2D operations, with fixed or trainable offsets.',
    contribution: 'I maintain the public implementations and document the layer interfaces and examples for use in research models.',
    relatedProjects: ['wearable-cardiac-waveforms', 'eeg-artefact-restoration', 'sers-sepsis-recognition'],
  },
];

export const researchStudyAreas = [
  { id: 'biomechanics', title: topics.biomechanics, description: 'Smart insoles, gait analysis, and estimation of forces and moments from pressure and motion.', projects: biomechanics },
  { id: 'imaging', title: topics.imaging, description: 'Anatomical segmentation and quantitative assessment from CT, MRI, ultrasound, radiographs, and thermal images.', projects: imaging },
  { id: 'signals', title: topics.signals, description: topicDescriptions.signals, projects: signals },
  { id: 'spectroscopy', title: topics.spectroscopy, description: topicDescriptions.spectroscopy, projects: spectroscopy },
  { id: 'devices', title: topics.devices, description: 'Implants, clinical training simulators, ventilation, and computational haemodynamics.', projects: devices },
  { id: 'genomics', title: 'Genomics & reproducibility', description: 'Gene-expression analysis and reproducible cancer genomics workflows.', projects: genomics },
  { id: 'engineering', title: topics.engineering, description: topicDescriptions.engineering, projects: engineering },
] as const;

export const researchStudies = researchStudyAreas.flatMap(group => group.projects);

export const researchStudiesByDoi = new Map<string, ResearchProject[]>();
for (const study of researchStudies) {
  if (!study.doi) continue;
  const doi = study.doi.toLowerCase();
  const matches = researchStudiesByDoi.get(doi) ?? [];
  matches.push(study);
  researchStudiesByDoi.set(doi, matches);
}

export function researchStudyFor(slug: string) {
  const study = researchStudies.find(item => item.slug === slug);
  if (!study) throw new Error(`Unknown research study: ${slug}`);
  return study;
}
