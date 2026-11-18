import { topicDescriptions, topics } from './papers';
import { projects, type ResearchProject } from './research';
import { ccBy, elsevier, sourceArticle } from './figure-credits';
import insoleFbg from '../assets/research/smart-insoles-diabetic-foot/fig4-fbg-insole.jpg';
import insoleTemperature from '../assets/research/smart-insoles-diabetic-foot/fig9-temperature-maps.png';
import renalFramework from '../assets/research/renal-tumour-modelling/fig1-framework.png';
import renalFeatures from '../assets/research/renal-tumour-modelling/fig9-surgical-features.png';
import liverMasks from '../assets/research/liver-mri-segmentation/fig10-cascade-masks.jpg';
import covidPipeline from '../assets/research/covid-chest-imaging/fig3-pipeline.jpg';
import curvaturePipeline from '../assets/research/image-based-curvature-measurement/fig1-pipeline.jpg';
import sepsisWorkflow from '../assets/research/sers-sepsis-recognition/fig1-workflow.png';
import sepsisEmbeddings from '../assets/research/sers-sepsis-recognition/fig5-embeddings.png';
import gearboxConfusion from '../assets/research/gearbox-fault-detection/fig7-confusion-matrix.png';
import occupancyWeek from '../assets/research/smart-meter-load-and-occupancy/fig6-occupancy.png';
import { dspnApproach, dspnPosterUrl, dspnProgress, dspnReportUrl, dspnVisual, dspnWorkflow } from './dspn-project';
import { covidProgress, curvatureProgress, liverApproachFigures, liverProgress } from './imaging-milestones';
import { aorticWssProgress, aorticWssVisual } from './aortic-wss-milestones';
import { exoventqProgress, exoventqVisual } from './exoventq-milestones';
import { hipImplantProgress, hipImplantVisual } from './hip-implant-milestones';
import { ecmoProgress, ecmoVisual } from './ecmo-milestones';
import { gaitAnalysisProgress, gaitAnalysisVisual } from './gait-milestones';
import { contactlessProgress, contactlessVisual, dopplerFlowProgress, dopplerFlowVisual, eegRestorationProgress, eegRestorationVisual, fetalEcgProgress, fetalEcgVisual, mriEcgProgress, mriEcgVisual, quGmProgress, quGmVisual, ttrProgress, ttrVisual } from './signal-milestones';

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
    title: 'Machine learning for gait analysis: Tai Chi training and neurodegenerative disease detection',
    summary: 'Using foot-sensor recordings and machine learning to separate Tai Chi masters from trainees, then to detect ALS, Huntington’s disease and Parkinson’s disease from walking patterns.',
    question: 'What can walking patterns from foot sensors reveal about long-term training and neurodegenerative disease?',
    context: 'Qatar National Research Fund NPRP12S-0227-190164 · Qatar University IRCC-2021-001',
    doi: '10.1007/s10489-023-04557-w',
    code: 'https://github.com/atick-faisal/NDDNet',
    approach: 'Walking depends on coordination between the nervous system, muscles and joints, so small changes in stride timing and foot loading can carry useful information. This project analysed public foot-sensor recordings in two studies, always testing on people held out from training. The first used interpretable gait features and classical machine learning to study Tai Chi experience. The second combined force signals and gait features in a deep network to detect neurodegenerative disease.',
    workflow: ['Record walking with foot sensors', 'Extract gait signals and features', 'Test on unseen participants'],
    progress: gaitAnalysisProgress,
    contribution: 'In the Tai Chi study, I contributed to gait-data analysis, classical machine learning evaluation, interpretation of the findings and manuscript review. For NDDNet, I contributed to gait-data analysis, deep learning evaluation, interpretation of the findings and manuscript review and revision.',
    scope: 'Both studies are retrospective analyses of public datasets without an external test cohort. The Tai Chi study shows gait differences between experienced and newly trained people, but it does not prove that training caused every difference, and footswitches record timing rather than force. The NDDNet groups contain 13 to 20 people and differ in age and sex balance, so larger clinical cohorts are needed before diagnostic use.',
    related: ['10.1016/j.compbiomed.2021.105184'],
    relatedProjects: ['diabetic-neuropathy-gait-emg'],
    visual: gaitAnalysisVisual,
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
    title: 'Cascaded deep learning for liver segmentation from T1-weighted MRI',
    summary: 'Benchmarking 24 deep networks and building a cascaded model that handles MRI slices with little visible liver, reaching a 95.15% Dice score.',
    question: 'Why do liver segmentation networks struggle on some MRI slices, and can a cascade of general and specialised networks fix it?',
    context: 'Qatar University High Impact Grant QUHI-CENG-23/24-216',
    doi: '10.3390/s23218890',
    approach: 'Outlining the liver on MRI supports the assessment of liver disease, but the organ changes size and shape from slice to slice and sits close to the kidneys and spleen. MRI also has no fixed intensity scale like CT. This study compared a wide range of segmentation networks on T1-weighted scans, identified where the best of them failed, designed a cascade around that weakness, and deployed the model in a cloud prototype.',
    workflow: ['Prepare T1-weighted slices', 'Benchmark 24 networks', 'Cascade general and specialised models'],
    figures: liverApproachFigures,
    progress: liverProgress,
    contribution: 'I contributed to the software implementation and data curation, helped draft the original manuscript, and took part in reviewing and editing it.',
    scope: 'The study used one public dataset of 20 people without liver disease and evaluated 2D slices with cross-validation, so performance on liver lesions, other scanners and independent cohorts remains to be tested. Multiphase liver and tumour segmentation on CT is the focus of LiPIVOT.',
    relatedProjects: ['multiphase-liver-ct'],
    visual: {
      image: liverMasks,
      alt: 'Four axial MRI slices with small liver regions, shown in three rows: the ground-truth liver outline, the outline predicted by the generalised network, and the outline predicted by the specialised network.',
      caption: 'Figure 10 from Hossain et al. (2023). Liver masks from the generalised and specialised networks for MRI slices with little liver content, compared with the ground truth.',
      credit: sourceArticle('10.3390/s23218890'),
      licence: ccBy,
    },
  },
  {
    slug: 'covid-chest-imaging', area: 'Medical imaging',
    title: 'COVID-19 detection, localisation and severity grading from chest X-ray and CT',
    summary: 'Building the COVID-QU-Ex benchmark of 33,920 chest X-rays and deep learning systems that outline the lungs, localise infection and grade its severity on X-ray and CT.',
    question: 'Beyond detecting COVID-19, can chest images show where the infection is and how much of the lung it affects?',
    context: 'Qatar University COVID-19 Emergency Response Grant QUERG-CENG-2020-1 · QNRF UREP28-144-3-046',
    doi: '10.1016/j.compbiomed.2021.105002',
    approach: 'During the pandemic, many imaging models only labelled an image as positive or negative, often after training on a few hundred COVID-19 cases. This work took a broader approach: segment the lungs, segment the infection within them, and use the two masks to detect disease, show its location and measure its extent. It was developed on CT and on chest X-ray, the faster and more widely available test, supported by a large public X-ray benchmark.',
    workflow: ['Curate images and lung masks', 'Segment lungs and infection', 'Detect, localise and grade'],
    progress: covidProgress,
    contribution: 'This was one of my earliest research-assistant projects. I contributed substantially to data curation while we assembled the large X-ray benchmark, and to the evaluation and interpretation of the X-ray localisation and severity models. For the CT study I worked on validation, investigation and data curation, and for the pneumonia study on model evaluation and analysis. I also contributed to preparing or reviewing all three manuscripts.',
    scope: 'These are retrospective studies of public image collections, each with its own annotation protocol and task. X-ray severity was shown as the measured extent of infection, and the CT critical group held only two patients. Clinical use would require prospective validation.',
    related: ['10.3390/diagnostics11050893', '10.5121/csit.2022.122001'],
    visual: {
      image: covidPipeline,
      alt: 'Pipeline diagram. A chest radiograph goes to two encoder–decoder networks that produce a lung mask and an infection mask. Superimposing the masks localises the infection, reports 37.6% lung involvement in the example, and gives a COVID-19 positive or negative result.',
      caption: 'Figure 3 from Tahir et al. (2021). Two segmentation networks run in parallel. Combining the lung and infection masks localises and quantifies infection and supports COVID-19 detection.',
      credit: sourceArticle('10.1016/j.compbiomed.2021.105002'),
      licence: ccBy,
    },
  },
  {
    slug: 'image-based-curvature-measurement', area: 'Medical imaging',
    title: 'Automated penile curvature measurement with deep learning',
    summary: 'Measuring penile curvature from 2D images with a localisation, segmentation and key-point pipeline, tested on 3D-printed models and compared with a clinical expert.',
    question: 'Can deep learning measure penile curvature from an ordinary image more consistently than visual assessment and manual tools?',
    context: 'Qatar University and Sidra Medicine · Hamad Medical Corporation Medical Research Center grant 20841',
    doi: '10.3389/fped.2023.1149318',
    approach: 'Congenital penile curvature often accompanies hypospadias, which affects about 1 in 300 newborn boys, and the degree of curvature influences the choice of surgical repair. It is usually judged by eye, with a goniometer or with a phone application, and these measurements vary between observers. This study built an automated pipeline that measures the angle from a 2D image, replacing an earlier hard-coded angle calculation with learned anatomical key points.',
    workflow: ['Localise and crop', 'Segment the shaft', 'Detect key points and calculate the angle'],
    progress: curvatureProgress,
    contribution: 'I assisted with the experimental work on automated curvature measurement and contributed to preparing and revising the manuscript.',
    scope: 'The main evaluation used 3D-printed models under controlled conditions. The patient comparison covered four images with hand-drawn masks, and camera angle, image quality and surgical field conditions can affect the result. Clinical use would need a larger patient dataset and a segmentation step validated on real anatomy.',
    visual: {
      image: curvaturePipeline,
      alt: 'Pipeline diagram. A photograph of a 3D-printed model is localised and cropped, the shaft is segmented, key points are detected, and the curvature angle is calculated. A second approach detects key points on the cropped image directly.',
      caption: 'Figure 1 from Baray et al. (2023). Two measurement approaches: key points from the segmented shaft, or key points from the cropped image. Both end in an angle calculation.',
      credit: sourceArticle('10.3389/fped.2023.1149318'),
      licence: ccBy,
    },
  },
];

const signals: ResearchProject[] = [
  existing('nabnet'),
  {
    slug: 'contactless-cardiovascular-waveforms', area: 'Physiological signal processing',
    title: 'Contactless cardiovascular waveforms from facial video and radar',
    summary: 'Using deep learning to reconstruct pulse, ECG and arterial pressure waveforms from facial video and 24 GHz radar, with no sensor touching the body.',
    question: 'Can deep learning recover pulse, ECG and arterial pressure waveforms from a camera or radar, with no sensor touching the body?',
    context: 'Qatar University High Impact Grant QUHI-CENG-23/24-216 · Prince Sattam Bin Abdulaziz University project PSAU/2024/R/1445',
    period: '2023–2025',
    doi: '10.1007/s00521-025-11327-x',
    approach: 'Continuous cardiovascular monitoring usually depends on finger sensors, adhesive electrodes, cuffs or arterial lines. These can irritate the skin, restrict movement or suit only clinical settings. This work trains one-dimensional encoder–decoder networks to turn a contactless recording into a reference waveform captured at the same time, then tests them on people held out from training. It began with the optical pulse from facial video and moved to radar, first for ECG and then for arterial pressure.',
    workflow: ['Record facial video or radar', 'Reconstruct the waveform with a 1D network', 'Compare with reference sensors'],
    progress: contactlessProgress,
    contribution: 'For the facial video study, I prepared the deep learning pipeline, contributed to data preprocessing and to video and signal analysis, and supported evaluation, validation and manuscript preparation. For radar ECG, I contributed to the methodology, model development, quantitative evaluation and original draft. For radar arterial pressure, I first proposed exploring one-dimensional reconstruction from raw radar signals, then contributed to the methodology, model implementation, evaluation, interpretation and manuscript review.',
    scope: 'Both radar studies used one public dataset of 30 healthy adults recorded in a controlled clinical setup. Their outputs are normalised waveforms, so they do not provide calibrated blood pressure or a diagnostic ECG. The video model was trained on 26 people and lost accuracy on an independent dataset. Larger and more varied cohorts, including patients, are needed before clinical use.',
    related: ['10.1016/j.compbiomed.2024.108555', '10.1016/j.bspc.2023.105687'],
    relatedProjects: ['nabnet', 'wearable-cardiac-waveforms'],
    visual: contactlessVisual,
  },
  {
    slug: 'wearable-cardiac-waveforms', area: 'Physiological signal processing',
    title: 'Cascaded 1D-CycleGANs for an improved cardiovascular monitoring via wearable wrist PPGs',
    summary: 'A two-stage 1D-CycleGAN pipeline that restores noisy wrist PPG, translates it to finger PPG and improves agreement with ECG-derived heart rate and variability.',
    question: 'Can noisy wrist PPG from a wearable be restored and then translated into finger PPG that follows the heart more closely?',
    context: 'Qatar National Research Fund NPRP12S-0227-190164 · Prince Sattam Bin Abdulaziz University project PSAU/2023/R/1444',
    doi: '10.1016/j.eswa.2024.123167',
    approach: 'Wrist-worn sensors make long-term pulse monitoring practical, but movement, changing skin contact and noise distort their signals, and wrist PPG carries less detail than clinical finger PPG. Translation Through Restoration GAN (TTR-GAN) handles these as two separate problems. The first 1D-CycleGAN stage removes artefacts from the wrist signal. The second converts the restored signal into finger PPG. Heart rate and variability from ECG then provide an independent check.',
    workflow: ['Restore wrist PPG', 'Translate to finger PPG', 'Validate against ECG'],
    progress: ttrProgress,
    contribution: 'I led the development and evaluation of TTR-GAN, including the Super-ONN-based 1D-CycleGAN methodology, the experiments, the quantitative and qualitative analysis and the manuscript. For the atrial fibrillation study, I developed the 1D-CycleGAN implementation used for wrist PPG restoration and contributed to conceptualisation, formal analysis and writing. I also contributed to the methodology and evaluation of M2ECG, a related wearable signal study.',
    scope: 'TTR-GAN was developed on one dataset of 22 healthy young adults and was not tested on an independent cohort. Restoration was judged by entropy because no clean reference exists for a corrupted wrist segment. Rare arrhythmic segments from one participant were harder to reproduce, and on-device performance was not reported. Patient data and testing on wearable hardware are the next requirements.',
    related: ['10.1016/j.bspc.2024.107233', '10.1109/access.2024.3353463'],
    relatedProjects: ['contactless-cardiovascular-waveforms'],
    visual: ttrVisual,
  },
  {
    slug: 'qscare-doppler-flow', area: 'Physiological signal processing',
    title: 'Deep learning for cerebral blood-flow analysis using transcranial Doppler',
    summary: 'Deep learning methods that restore transcranial Doppler flow-velocity waveforms and distinguish healthy volunteers from patients in neurocritical care.',
    question: 'Can middle cerebral artery flow-velocity waveforms distinguish healthy volunteers from patients in neurocritical care?',
    context: 'QSCare · Qatar University High Impact Grant QUHI-CENG-22/23-548',
    doi: '10.1016/j.bspc.2023.104882',
    approach: 'The brain depends on a constant blood supply, and transcranial Doppler can monitor flow velocity in its major arteries without radiation or surgery. Signal quality depends heavily on the operator, so recordings often contain noise and motion artefacts. This project extracted maximum flow-velocity waveforms from the middle cerebral artery, restored low-quality segments with a 1D-CycleGAN, and developed Self-ONN classifiers for healthy and intensive-care recordings.',
    workflow: ['Extract flow-velocity waveforms', 'Clean and restore segments', 'Classify healthy and ICU signals'],
    progress: dopplerFlowProgress,
    contribution: 'Across the two studies, I worked on waveform extraction and CycleGAN restoration, classifier development, data curation and preprocessing, MATLAB software, analysis, visualisation, and manuscript writing.',
    scope: 'Both studies used one public dataset from 6 healthy volunteers and 12 patients, with testing separated by recording session. The patient class combined several neurocritical conditions, and signal-quality labels were assigned manually. Larger and more diverse cohorts, condition-specific labels and automated quality assessment are needed before clinical use.',
    related: ['10.3390/diagnostics13122000'],
    relatedProjects: ['wearable-cardiac-waveforms', 'eeg-artefact-restoration'],
    visual: dopplerFlowVisual,
  },
  {
    slug: 'ecg-restoration-during-mri', area: 'Physiological signal processing',
    title: 'Deep learning for 12-lead ECG restoration and R-peak detection during MRI',
    summary: 'Deep learning methods that detect heartbeats and restore 12-lead ECG distorted by the magnetohydrodynamic effect in 1 T, 3 T and 7 T MRI scanners.',
    question: 'Can deep learning recover ECG morphology and heartbeat timing when an MRI magnetic field distorts the signal?',
    context: 'Qatar National Research Fund NPRP12S-0227-190164 · Prince Sattam Bin Abdulaziz University PSAU/2024/R/1445 · Qatar University QUST-1-CENG-2023941',
    doi: '10.1016/j.engappai.2024.108483',
    approach: 'Inside an MRI scanner, blood flowing through the static magnetic field creates a magnetohydrodynamic voltage that overlaps the ECG. This can hide important waveform features and make cardiac gating and patient monitoring difficult. The work began with accurate R-peak detection, then developed a three-phase framework that uses QRS guidance, unpaired restoration and a general 12-lead model.',
    workflow: ['Locate QRS complexes', 'Restore each ECG lead', 'Generalise to all 12 leads'],
    progress: mriEcgProgress,
    contribution: 'For the 12-lead restoration study, I led conceptualisation, data curation, methodology and software development, formal analysis, experiments and manuscript preparation. For Self-Attention MHDNet, I contributed to the investigation, methodology, software, validation and manuscript drafting and revision.',
    scope: 'The recordings came from young healthy volunteers while the scanners were not acquiring images, so gradient and radio-frequency artefacts were not addressed. Only one 1 T session was available, and low-amplitude P and T waves remained harder to restore. Studies with patients and active MRI scans are needed before clinical use.',
    related: ['10.3390/bioengineering10050542'],
    relatedProjects: ['wearable-cardiac-waveforms', 'eeg-artefact-restoration'],
    visual: mriEcgVisual,
  },
  {
    slug: 'eeg-artefact-restoration', area: 'Physiological signal processing',
    title: 'Deep learning restoration of motion-corrupted EEG',
    summary: 'Deep learning methods that remove motion artefacts from single-channel EEG while preserving the signal in time and frequency.',
    question: 'Can clean EEG be recovered from a single channel corrupted by electrode motion?',
    context: 'Qatar National Research Fund NPRP12S-0227-190164 · Qatar University IRCC-2021-001',
    doi: '10.1016/j.engappai.2023.107514',
    approach: 'Head and electrode movement can add artefacts far stronger than the EEG itself, which limits recording outside controlled settings. This project first developed MLMRS-Net, a multi-resolution network for reconstructing clean EEG. It then developed AGO-CycleGAN, an attention-guided operational CycleGAN that restores corrupted EEG and recovers its frequency content.',
    workflow: ['Record motion-corrupted EEG', 'Restore the EEG waveform', 'Evaluate time and frequency recovery'],
    progress: eegRestorationProgress,
    contribution: 'I led the MLMRS-Net and AGO-CycleGAN studies, including model development, implementation, experiments, quantitative and qualitative analysis, and manuscript preparation. I also contributed to related studies on eye and muscle artefact removal.',
    scope: 'Both studies used the same public dataset of 23 single-channel prefrontal recordings, with motion created by tapping one electrode and a nearby electrode providing the reference. Validation during natural movement, on multi-channel EEG and without a clean reference is still needed.',
    related: ['10.1007/s00521-022-08111-6', '10.3390/bioengineering10050579', '10.5121/csit.2022.122006'],
    relatedProjects: ['ecg-restoration-during-mri', 'wearable-cardiac-waveforms'],
    visual: eegRestorationVisual,
  },
  {
    slug: 'fetal-ecg-extraction', area: 'Physiological signal processing',
    title: 'Deep learning for non-invasive fetal ECG extraction',
    summary: 'Deep learning methods that recover fetal ECG waveforms and heartbeat timing from abdominal recordings containing maternal ECG and noise.',
    question: 'Can fetal ECG morphology and heartbeat timing be recovered from electrodes placed on the mother’s abdomen?',
    context: 'Qatar National Research Fund NPRP 10-0123-170222 · Qatar University QUHI-CENG-22/23-548',
    doi: '10.1016/j.eswa.2023.121196',
    approach: 'Fetal scalp electrodes provide a clear ECG, but they are invasive and can only be used around delivery. Abdominal electrodes are non-invasive, although the weak fetal signal overlaps with the stronger maternal ECG and noise. This project first used a deeply supervised segmentation network to extract fetal ECG, then used a 1D-CycleGAN to better preserve waveform morphology and estimate fetal heart measures.',
    workflow: ['Record abdominal maternal ECG', 'Reconstruct fetal ECG', 'Evaluate waveforms and heartbeats'],
    progress: fetalEcgProgress,
    contribution: 'For LinkNet++, I contributed substantially to the methodology, model development, experiments, analysis and validation, and manuscript writing and revision. For the 1D-CycleGAN study, I contributed to the deep learning methodology, model assessment, result analysis and interpretation, and manuscript review.',
    scope: 'Both studies used small public datasets from late pregnancy and labour, with limited variation in recording conditions. Scalp ECG and expert annotations provided the references. Validation across more participants, earlier gestation, different devices and fetal heart conditions is needed before clinical use.',
    related: ['10.1016/j.engappai.2023.106414'],
    relatedProjects: ['ecg-restoration-during-mri', 'wearable-cardiac-waveforms'],
    visual: fetalEcgVisual,
  },
  {
    slug: 'multimodal-glucose-estimation', area: 'Physiological signal processing',
    title: 'QU-GM: IoT-based glucose monitoring from wrist PPG, blood pressure and demographic data',
    summary: 'A wearable and cloud-connected system that uses machine learning to estimate blood glucose and classify glucose severity without a finger-prick input.',
    question: 'Can wrist PPG, blood pressure and demographic information support real-time glucose estimation without a blood sample?',
    context: 'Qatar National Research Fund NPRP13S-0205-200270 · Qatar Diabetic Society',
    doi: '10.1109/access.2024.3404971',
    approach: 'Finger-prick meters require repeated blood samples, and continuous glucose monitors use a sensor placed under the skin. QU-GM explores a less invasive route by combining a custom PPG wristband with blood pressure, demographic information and machine learning. The complete system links the wearable, an Android application and cloud-hosted models for glucose estimation and severity classification.',
    workflow: ['Record wrist PPG and user data', 'Estimate glucose and severity', 'Return results to the application'],
    progress: quGmProgress,
    contribution: 'I contributed to the machine learning and physiological signal analysis for the glucose monitoring framework, including technical evaluation and manuscript review.',
    scope: 'The models were developed on 139 participants recorded at rest, so larger and more diverse cohorts are needed. Blood pressure is currently measured separately and entered in the application. Severity classification used stratified cross-validation across samples, and longer-term testing during daily use is still required before clinical use.',
    relatedProjects: ['wearable-cardiac-waveforms', 'nabnet'],
    visual: quGmVisual,
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
    title: 'PRISM-SERS and few-shot microbial recognition',
    summary: 'Developing spectral mapping for analytes unseen during training and studying few-shot recognition across instruments and sample conditions.',
    status: 'Ongoing research · Manuscript in preparation',
    approach: 'PRISM-SERS studies how portable-device spectra can be mapped to a laboratory reference when target analytes are held out of training, using unpaired data and no class labels at inference. A second workstream benchmarks time-series foundation-model representations for few-shot classification with separated support and query samples.',
    contribution: 'I develop the spectral preprocessing, transfer and classification workflows and design comparisons that account for sample identity and differences between acquisition domains.',
    scope: 'This work is ongoing, and no results have been published yet. The two workstreams address different questions: spectral mapping tests recovery of comparable spectra, while few-shot experiments assess classification from limited examples.',
    relatedProjects: ['cross-device-raman', 'microbial-sers-validation'],
  },
];

const devices: ResearchProject[] = [
  {
    slug: 'hip-implant-mechanics-and-imaging', area: 'Biomedical devices & simulation',
    title: 'Computational and AI methods for total hip implants',
    summary: 'Finite element modelling, implant sensing, biomaterial and design reviews, and deep learning for detecting aseptic loosening in total hip replacement.',
    question: 'How can computational modelling and AI improve implant design, monitoring and detection of failure after total hip replacement?',
    doi: '10.1109/access.2022.3173424', period: '2021–2024',
    context: 'Qatar National Research Fund NPRP11S-0102-180178 · Qatar University, Universiti Kebangsaan Malaysia and clinical collaborators',
    approach: 'Hip implants can fail through loosening, wear, stress shielding and poor load transfer. This project addressed those problems from several directions: detecting loosening on X-rays, reviewing materials and implant designs, simulating an implantable sensor, designing a spiral head–stem junction, and comparing stem materials in the implanted femur.',
    workflow: ['Detect loosening on X-rays', 'Review materials and designs', 'Model sensing, wear and load transfer'],
    progress: hipImplantProgress,
    contribution: 'For HipXNet, I contributed to the deep learning pipeline, evaluation, data analysis, interpretation and manuscript preparation. In the finite element work, I designed the spiral head–stem model in Fusion 360, reconstructed a commercial implant stem in CAD, and contributed to methodology, software and formal analysis, including the stem-material study. I contributed to the sensor feasibility analysis, the bench-test setup with Hamad Medical Corporation, and the two reviews, including figure preparation for the biomaterials review.',
    scope: 'The finite element and sensor results come from simulations under specified geometries, materials and loads. HipXNet used a small retrospective image collection and five-fold validation. The reviews summarise published evidence, and clinical testing would be needed before any proposed design or method is used in patient care.',
    related: ['10.3390/polym14204308', '10.3390/bios13010079', '10.3390/ma16041466', '10.1039/d3tb01469j', '10.1016/j.mtcomm.2024.110932'],
    relatedProjects: ['aortic-wall-shear-stress'],
    visual: hipImplantVisual,
  },
  {
    slug: 'ecmo-cannulation-simulator', area: 'Biomedical devices & simulation',
    title: 'Low-cost ECMO cannulation simulator for clinical training',
    summary: 'A mannequin-based training system with simulated circulation, ultrasound-compatible access pads and sensors for cannulation errors.',
    question: 'Can a lower-cost simulator recreate the anatomy, circulation and errors that matter during ECMO cannulation training?',
    doi: '10.1109/scored.2019.8896240', period: 'August 2018–October 2019',
    context: 'Qatar National Research Fund UREP22-003-2-001 · Qatar University and Hamad Medical Corporation',
    approach: 'ECMO cannulation is a high-risk procedure, and many training simulators are expensive or represent only part of the circulation. Working with ECMO clinicians, the project developed a mannequin-based trainer with arterial and venous flow, ultrasound-compatible access pads and sensors that respond to procedural errors.',
    workflow: ['Define clinical training needs', 'Build pads and circulation loops', 'Add sensors and test errors'],
    progress: ecmoProgress,
    contribution: 'I helped design, build and test the simulator and wrote the Arduino control code for the pump motor used to reproduce pulsatile flow. I also contributed to technical documentation and manuscript preparation, and attended hands-on ECMO training at Hamad General Hospital and Al-Wakra Hospital. The SCOReD presentation received the Best Paper Presentation Award for its presenting author, and the UREP project placed third in the 12th Annual UREP Competition in 2020.',
    scope: 'These papers describe simulator design and prototype testing. They do not report a formal study of trainee learning or clinical outcomes. Further testing by ECMO clinicians and improvements to tubing, sensing and printed materials were still needed.',
    related: ['10.1016/j.ejccm.2018.12.017', '10.5339/qmj.2019.qccc.61'],
    relatedProjects: ['exoventq-ventilation'],
    visual: ecmoVisual,
  },
  {
    slug: 'exoventq-ventilation', area: 'Biomedical devices & simulation',
    title: 'ExoventQ: a low-cost portable negative-pressure ventilator',
    summary: 'A student-led respiratory support prototype with continuous and cyclic negative-pressure modes, closed-loop pressure control and safety alarms.',
    question: 'Can a portable negative-pressure ventilator be built from affordable, readily available components?',
    context: 'BSc Electrical Engineering senior design project, 2020–2021 · Qatar University QUST-1-CENG-2023-796 · Prince Sattam Bin Abdulaziz University PSAU/2024/R/1445',
    doi: '10.1109/access.2024.3390566',
    approach: 'The COVID-19 pandemic exposed global shortages of mechanical ventilators. ExoventQ began as a final-year engineering project to explore a lower-cost alternative that applies negative pressure around the chest instead of delivering positive pressure through the airway. The team designed the pressure vessel, pumping system, control electronics and clinician interface, then tested the integrated prototype.',
    workflow: ['Design the pressure vessel', 'Build pumping and control', 'Test modes and safety'],
    progress: exoventqProgress,
    contribution: 'ExoventQ was developed by a student group as their final-year BSc Electrical Engineering senior design project. I supported the project through engineering analysis, prototype evaluation and interpretation of the test results, contributed to other project tasks, and helped prepare and revise the manuscript.',
    scope: 'This is an engineering prototype and was not tested on people. Mannequins were used to evaluate the neck and torso seals, but their effect on vessel pressure was not examined in depth. Detailed risk analysis, long-term reliability, user training and clinical studies are needed before patient use.',
    relatedProjects: ['ecmo-cannulation-simulator'],
    visual: exoventqVisual,
  },
  {
    slug: 'aortic-wall-shear-stress', area: 'Biomedical devices & simulation',
    title: 'Rapid wall shear stress prediction for abdominal aortic aneurysms',
    summary: 'A deep learning surrogate that predicts time-averaged wall shear stress on abdominal aortic aneurysms from 3D vessel geometry.',
    question: 'Can deep learning provide a fast alternative to CFD for mapping wall shear stress on aortic aneurysms?',
    context: 'Qatar University IRCC-2020-002 · Qatar National Research Fund NPRP13S-0108-200024',
    doi: '10.1007/s11517-025-03311-3',
    code: 'https://github.com/atick-faisal/MultiViewUNet-Aneurysm',
    approach: 'Low wall shear stress is linked with aneurysm progression and rupture risk, but computational fluid dynamics (CFD) is too time-consuming for rapid clinical use. This study built patient and synthetic aneurysm geometries, generated CFD references, converted each 3D shape into multiple 2D views, and trained MultiViewUNet to predict the wall shear stress pattern.',
    workflow: ['Build geometries and run CFD', 'Render multi-view images', 'Predict wall shear stress'],
    progress: aorticWssProgress,
    contribution: 'I helped implement and integrate the deep learning model, evaluated successive versions, and troubleshot the modelling workflow with the core team.',
    scope: 'CFD was the reference, so agreement depends on the geometries, boundary conditions and simulation assumptions used. The dataset was relatively small, and errors were larger in disturbed flow. The model outputs 256 × 256 images rather than a reconstructed 3D surface, and other haemodynamic measures remain future work.',
    relatedProjects: ['ecmo-cannulation-simulator'],
    visual: aorticWssVisual,
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
const addStudyPaper = (doi: string, study: ResearchProject) => {
  const key = doi.toLowerCase();
  const matches = researchStudiesByDoi.get(key) ?? [];
  if (!matches.includes(study)) matches.push(study);
  researchStudiesByDoi.set(key, matches);
};
// A paper links to its main project. Papers without one link to the projects that list them as related work.
for (const study of researchStudies) if (study.doi) addStudyPaper(study.doi, study);
const mainProjectPapers = new Set(researchStudiesByDoi.keys());
for (const study of researchStudies) {
  study.related?.filter(doi => !mainProjectPapers.has(doi.toLowerCase())).forEach(doi => addStudyPaper(doi, study));
}

export function researchStudyFor(slug: string) {
  const study = researchStudies.find(item => item.slug === slug);
  if (!study) throw new Error(`Unknown research study: ${slug}`);
  return study;
}
