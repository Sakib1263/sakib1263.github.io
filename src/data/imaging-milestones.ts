import liverWorkflow from '../assets/research/liver-mri-segmentation/fig1-workflow.png';
import liverCascade from '../assets/research/liver-mri-segmentation/fig7-cascade.png';
import covidAnnotation from '../assets/research/covid-chest-imaging/fig2-stage2-annotation.png';
import covidFollowUp from '../assets/research/covid-chest-imaging/fig5b-follow-up.jpg';
import covidCtMasks from '../assets/research/covid-chest-imaging/ct-fig7-external-masks.jpg';
import curvatureKeyPoints from '../assets/research/image-based-curvature-measurement/fig4-key-points.jpg';
import curvatureEstimates from '../assets/research/image-based-curvature-measurement/fig8-angle-estimates.png';
import { ccBy, sourceArticle } from './figure-credits';
import type { ResearchPhase, ResearchProject } from './research';

/** Stage-by-stage content for the published medical imaging projects, taken from their papers. */

const liverDoi = '10.3390/s23218890';
const covidXrayDoi = '10.1016/j.compbiomed.2021.105002';
const covidCtDoi = '10.3390/diagnostics11050893';
const curvatureDoi = '10.3389/fped.2023.1149318';

export const liverApproachFigures: NonNullable<ResearchProject['figures']> = [
  {
    section: 'approach',
    image: liverWorkflow,
    alt: 'Flow diagram with four panels: retrieving 20 abdominal MRI scans from the CHAOS database, preprocessing with mask conversion, fold creation, augmentation and image enhancement, deep learning segmentation with model training and selection, and deployment as a cloud application linked to MRI, a doctor station, PACS and Android devices.',
    caption: 'Figure 1 from Hossain et al. (2023). The study workflow, from data retrieval and preprocessing to model selection and cloud deployment.',
    credit: sourceArticle(liverDoi),
    licence: ccBy,
  },
];

export const liverProgress: ResearchPhase[] = [
  {
    id: 'network-benchmark',
    navLabel: 'Network benchmark',
    title: 'Benchmarking 24 segmentation networks',
    status: 'Five-fold cross-validation on CHAOS',
    paragraphs: [
      'The study used T1-weighted in-phase MRI from the public CHAOS challenge: 647 slices from 20 people, with liver masks annotated by certified radiologists. In-phase T1 images were chosen because fat appears brighter, which gives the networks more contrast to work with. MRI also lacks the fixed intensity scale that makes CT easier to preprocess.',
      'UNet, UNet++ and Feature Pyramid Networks were each paired with eight dense, residual and inception encoders, giving 24 networks. Each was tested on the original slices and on three-channel and gamma-corrected versions. UNet++ with a DenseNet201 encoder performed best on the original images. The enhancement methods slightly lowered performance overall, because they did not help slices where the liver was small.',
    ],
    measures: [
      { value: '24', label: 'Network and encoder combinations compared' },
      { value: '647', label: 'T1-weighted slices from 20 people' },
      { value: '94.30%', label: 'Best single-network Dice (UNet++ with DenseNet201)' },
    ],
  },
  {
    id: 'cascaded-network',
    navLabel: 'Cascaded network',
    title: 'A cascade for slices with little liver',
    status: 'Main result',
    paragraphs: [
      'The best single network scored above 93% on slices through the middle and upper liver, but only 78–83% across folds on slices through its lower part, where little liver is visible. The cascade addresses this directly. A generalised network segments every slice. If it finds no liver the slice is left empty, if it finds more than 750 liver pixels its mask is kept, and otherwise a specialised network trained on small-liver slices produces the final mask.',
      'A shallow UNet with a ResNet18 encoder was the strongest specialised network. The full cascade reached a Dice score of 95.15%, higher than every earlier result the paper compared on the same test set, the closest being 93.60% with nnU-Net.',
    ],
    measures: [
      { value: '95.15%', label: 'Liver Dice with the cascade' },
      { value: '92.10%', label: 'Liver IoU with the cascade' },
    ],
    table: {
      caption: 'Results reported by Hossain et al. (2023). The first two rows cover slices with little liver; the last two cover all slices.',
      columns: ['Dice', 'IoU'],
      rows: [
        { label: 'Small-liver slices, best generalised network', cells: ['80.88%', '70.74%'] },
        { label: 'Small-liver slices, specialised UNet with ResNet18', cells: ['86.22%', '77.00%'] },
        { label: 'All slices, UNet++ with DenseNet201', cells: ['94.30%', '91.00%'] },
        { label: 'All slices, cascaded network', cells: ['95.15%', '92.10%'] },
      ],
    },
    figures: [
      {
        image: liverCascade,
        alt: 'Diagram of the cascade. Each MRI slice goes to a generalised UNet++ network. If the predicted mask is smaller than a threshold, a specialised network re-segments the slice.',
        caption: 'Figure 7 from Hossain et al. (2023). A generalised network segments every slice. Slices with small predicted masks are passed to a specialised network.',
        credit: sourceArticle(liverDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'cloud-prototype',
    navLabel: 'Cloud prototype',
    title: 'A cloud application prototype',
    status: 'Demonstration software',
    paragraphs: [
      'The model was deployed on a Google Cloud server with a database for the images, a browser interface and an Android application. A scheduler was built to retrain the deployed model as users add data, and the design allows a later connection to a hospital picture archiving system.',
    ],
  },
];

export const covidProgress: ResearchPhase[] = [
  {
    id: 'ct-severity',
    navLabel: 'CT severity grading',
    title: 'Segmenting infection and grading severity on CT',
    status: 'Diagnostics · 2021',
    paragraphs: [
      'The CT system works in cascade: one network outlines the lungs, a second finds infection inside them, and the ratio of the two gives the percentage of lung involved. UNet and Feature Pyramid Networks with DenseNet and ResNet encoders were compared on public CT sets with expert masks, using cross-validation.',
      'The percentage of infected lung then assigns each patient to a severity grade: below 25% is mild, 25–50% moderate, 50–75% severe and 75% or more critical. This was tested on MosMedData, an independent set of 1,110 patients and 46,411 slices. Grading was strongest for healthy and mild cases. Moderate and severe cases were harder to separate, and only two patients were in the critical group.',
    ],
    measures: [
      { value: '97.19%', label: 'Lung segmentation Dice' },
      { value: '94.13%', label: 'Infection segmentation Dice' },
      { value: '99.64%', label: 'COVID-19 detection sensitivity (98.72% specificity)' },
    ],
    table: {
      caption: 'Severity grading on the 1,110 MosMedData patients, from the confusion matrix and Table 8 of Qiblawey et al. (2021).',
      columns: ['Patients', 'Correctly graded', 'Sensitivity'],
      rows: [
        { label: 'Healthy', cells: ['254', '242', '95.28%'] },
        { label: 'Mild', cells: ['684', '676', '98.83%'] },
        { label: 'Moderate', cells: ['125', '89', '71.20%'] },
        { label: 'Severe', cells: ['45', '35', '77.78%'] },
        { label: 'Critical', cells: ['2', '2', '100%'] },
      ],
    },
    figures: [
      {
        image: covidCtMasks,
        alt: 'Three axial chest CT slices from different patients. Green outlines mark the predicted lung borders and red outlines mark predicted infection regions in the lower and outer lungs.',
        caption: 'Figure 7 from Qiblawey et al. (2021). Predicted lung (green) and infection (red) outlines on the independent MosMedData set.',
        credit: sourceArticle(covidCtDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'covid-qu-ex',
    navLabel: 'COVID-QU-Ex dataset',
    title: 'Building the COVID-QU-Ex chest X-ray benchmark',
    status: 'Public dataset · 2021',
    paragraphs: [
      'Most early COVID-19 X-ray studies relied on a few hundred positive images. The team compiled 33,920 frontal chest X-rays from public sources and removed duplicates and very poor images, leaving 11,956 COVID-19, 11,263 other lung infection and 10,701 normal images.',
      'Drawing lung outlines by hand at this scale was not practical, so masks were built through human–machine collaboration. Networks trained on 704 existing masks proposed outlines for a 3,000-image subset. Researchers accepted, corrected, referred or excluded each one, and the network was retrained as the set grew. Six networks trained on those masks then proposed outlines for the remaining 30,920 images, researchers selected among them, and physicians verified the final masks.',
    ],
    measures: [
      { value: '33,920', label: 'Chest X-rays with lung masks' },
      { value: '11,956', label: 'COVID-19 images' },
    ],
    figures: [
      {
        image: covidAnnotation,
        alt: 'Flow diagram of the second annotation stage. A segmentation network predicts lung masks on unannotated chest X-rays. Researchers accept a mask, reject and modify it, mark it unsure for physicians to assess and modify, or exclude a poor image. Selected masks join the repository and the network is retrained on the larger set.',
        caption: 'Figure 2 from Tahir et al. (2021), cropped to Stage II. Researchers review each predicted lung mask, and accepted or corrected masks are used to retrain the network.',
        credit: sourceArticle(covidXrayDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'xray-localisation',
    navLabel: 'X-ray localisation',
    title: 'Localising and quantifying infection on chest X-ray',
    status: 'Computers in Biology and Medicine · 2021',
    paragraphs: [
      'Two networks run in parallel on each X-ray, one for the lungs and one for infection. Overlaying their masks shows where the infection is and what share of each lung it covers, and any predicted infection marks the image as COVID-19 positive. U-Net, U-Net++ and Feature Pyramid Networks were compared with five encoders. Infection models used 2,913 COVID-19 images with expert infection masks from QaTa-Cov19, balanced by the same number of negative images.',
      'Repeating the measurement on a patient’s successive X-rays can follow how the disease progresses, as in the example below.',
    ],
    measures: [
      { value: '97.99%', label: 'Lung segmentation Dice' },
      { value: '88.21%', label: 'Infection segmentation Dice' },
      { value: '99.31%', label: 'COVID-19 detection sensitivity (99.14% specificity)' },
    ],
    figures: [
      {
        image: covidFollowUp,
        alt: 'Three chest radiographs of one patient on consecutive days, with predicted lung outlines in green and infection outlines in red. Estimated lung involvement rises from 27.1% on day 1 to 46.6% on day 2 and 100% on day 3.',
        caption: 'Figure 5b from Tahir et al. (2021), cropped to the follow-up example. Predicted infection extent for one patient over three consecutive days.',
        credit: sourceArticle(covidXrayDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'pneumonia-classification',
    navLabel: 'Pneumonia classification',
    title: 'Separating COVID-19 from other pneumonia',
    status: 'Conference paper · 2022',
    paragraphs: [
      'A follow-on study assembled QU-MLG-COV, a set of 16,712 chest X-rays, and compared 21 pretrained encoders for sorting images into COVID-19, viral pneumonia, bacterial pneumonia and normal. CheXNet gave the best results, with class accuracies of 98.89% for COVID-19, 97.87% for bacterial pneumonia, 97.55% for viral pneumonia and 99.09% for normal images.',
    ],
    measures: [
      { value: '16,712', label: 'Chest X-rays in QU-MLG-COV' },
      { value: '21', label: 'Pretrained encoders compared' },
    ],
  },
];

export const curvatureProgress: ResearchPhase[] = [
  {
    id: 'measurement-pipeline',
    navLabel: 'Measurement pipeline',
    title: 'From a photograph to a curvature angle',
    status: 'Three deep learning stages',
    paragraphs: [
      'YOLOv5 first finds and crops the penile region. A UNet-based network then segments the shaft, and an HRNet model places four key points that mark the mid-axes of the distal and proximal shaft. The curvature is the angle between those two axes.',
      'An earlier pipeline calculated the angle directly from the mask with hard-coded geometry, which failed on irregular shapes and near 90°. Key points avoid this and work for both hinge-type and arc-type curvature. Localisation reached 99.4% mAP at 0.5 overlap, and the best segmentation model, an ensemble UNet with a DenseNet121 encoder, reached a Dice score of 94.50%.',
    ],
    measures: [
      { value: '99.4%', label: 'Localisation mAP at 0.5 overlap' },
      { value: '94.50%', label: 'Shaft segmentation Dice' },
    ],
    figures: [
      {
        image: curvatureKeyPoints,
        alt: 'Four columns showing a 3D-printed model and its segmentation mask: the input, three marked zones for the distal shaft, curvature and proximal shaft, the mid-axis of the distal and proximal shaft, and the four resulting key points.',
        caption: 'Figure 4 from Baray et al. (2023). Four key points are defined from the distal and proximal zones of the shaft, on both the cropped image and its mask.',
        credit: sourceArticle(curvatureDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'model-evaluation',
    navLabel: 'Evaluation on models',
    title: 'Accuracy on 3D-printed models',
    status: '913 images · nine models · 18°–86°',
    paragraphs: [
      'Nine 3D-printed models with known angles provided a reference that is difficult to obtain from patients. Key-point detection used nine-fold cross-validation, holding out one model at a time so that each was tested by a network not trained on it. Measuring from segmentation masks was more accurate and more consistent than measuring from the original images, and more than halved the error of the earlier pipeline on the same dataset.',
    ],
    measures: [
      { value: '3.81°', label: 'Mean absolute error from segmentation masks' },
      { value: '913', label: 'Images of nine 3D-printed models' },
    ],
    table: {
      caption: 'Mean absolute error of the estimated angle across the nine models, from Baray et al. (2023).',
      columns: ['Mean absolute error'],
      rows: [
        { label: 'Earlier pipeline (Abbas et al.)', cells: ['8.53°'] },
        { label: 'Key points from images', cells: ['4.52°'] },
        { label: 'Key points from masks', cells: ['3.81°'] },
      ],
    },
    figures: [
      {
        image: curvatureEstimates,
        alt: 'Two box plots of predicted against true curvature angles for nine models from 18° to 86°, one from images and one from masks. The mask-based estimates spread less around each true angle.',
        caption: 'Figure 8 from Baray et al. (2023). Estimated angles for each model from the original images (left) and from the segmentation masks (right).',
        credit: sourceArticle(curvatureDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'patient-comparison',
    navLabel: 'Patient comparison',
    title: 'First comparison with a clinical expert',
    status: 'Four patient images',
    paragraphs: [
      'The model trained on 3D-printed models was then applied to shaft masks drawn by hand from four patient images. Its angles were compared with a clinical expert’s measurements made with a mobile angle application, and differed by 1.7° to 6.1°.',
    ],
    table: {
      caption: 'Curvature angles for the four patient images, from Table 5 of Baray et al. (2023). The difference is calculated from the two reported values.',
      columns: ['Model estimate', 'Clinical expert', 'Difference'],
      rows: [
        { label: 'Patient 1', cells: ['17.75°', '23.82°', '6.07°'] },
        { label: 'Patient 2', cells: ['28.30°', '29.99°', '1.69°'] },
        { label: 'Patient 3', cells: ['64.43°', '69.79°', '5.36°'] },
        { label: 'Patient 4', cells: ['42.73°', '44.93°', '2.20°'] },
      ],
    },
  },
];
