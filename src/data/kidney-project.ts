import projectOverview from '../assets/research/kidney-disease-imaging/project-overview.png';
import renalScoreCam from '../assets/research/kidney-disease-imaging/renal-fig5-scorecam.jpg';
import ahnFramework from '../assets/research/kidney-disease-imaging/ahn-fig1-framework.png';
import stoneTransfer from '../assets/research/kidney-disease-imaging/stone-fig4-feature-transfer.png';
import stoneSegmentation from '../assets/research/kidney-disease-imaging/stone-fig6-segmentation.jpg';
import renalFramework from '../assets/research/renal-tumour-modelling/fig1-framework.png';
import renalFeatures from '../assets/research/renal-tumour-modelling/fig9-surgical-features.png';
import ahnGrades from '../assets/research/prenatal-hydronephrosis/fig3-sfu-grades.jpg';
import ahnSegmentation from '../assets/research/prenatal-hydronephrosis/fig6-segmentation.jpg';
import stoneFramework from '../assets/research/kidney-stone-segmentation/fig1-framework.png';
import { ccBy, elsevier, sourceArticle } from './figure-credits';
import type { ResearchFigure, ResearchPhase, ResearchProject } from './research';

/** Full content for the kidney disease imaging project page: three separate studies, in publication order. */

const renal = sourceArticle('10.3390/cancers15123189');
const hydronephrosis = sourceArticle('10.1016/j.eswa.2024.124594');
const stones = sourceArticle('10.1016/j.bspc.2026.109894');

export const kidneyVisual: NonNullable<ResearchProject['visual']> = {
  image: projectOverview,
  alt: 'Three panels, one per study. Renal tumours: an axial CT slice with a heat map concentrated on both kidneys. Prenatal hydronephrosis: two fetal kidney ultrasound views of grades SFU-III and SFU-IV above their segmented kidneys, with a large dark fluid-filled area. Kidney stones: three consecutive CT slices with bright stones in one kidney, above segmentation masks of the kidneys and stones.',
  caption: 'The three kidney conditions studied. Panels adapted from Figure 5 of Mahmud et al. (2023, CC BY 4.0), Figure 3d–e of Mahmud et al. (2024, © 2024 Elsevier Ltd) and Figure 6c of Mahmud et al. (2026, © 2026 Elsevier Ltd), cropped and placed side by side.',
  credit: { label: 'Composite of three study figures' },
  licence: { label: 'CC BY 4.0 and Elsevier author reuse' },
};

export const kidneyApproach = 'The project applies deep learning to three separate kidney conditions, each with its own imaging modality, cohort and clinical question: renal tumours on contrast-enhanced CT, prenatal hydronephrosis on ultrasound, and kidney stones on unenhanced CT. The studies share one design idea. A full scan contains far more than the structure of interest, so each pipeline first narrows the image to the kidney, then segments or extracts the relevant region, and only then classifies, grades or measures. The three studies are described below in order of publication. Each was evaluated with patients kept separate between training and testing.';

export const kidneyWorkflow = ['Narrow the scan to the kidney', 'Segment the kidney, tumour or stone', 'Classify, grade or measure'];

export const kidneyApproachFigures: ResearchFigure[] = [];

export const kidneyProgress: ResearchPhase[] = [
  {
    id: 'renal-tumours',
    navLabel: 'Renal tumours (CT)',
    title: 'Renal tumour subtype and surgical approach from CT',
    status: 'Published · Cancers, 2023',
    paragraphs: [
      'Choosing between partial and radical nephrectomy for a kidney tumour is often unclear. Removing too little risks leaving cancer behind, while removing the whole kidney unnecessarily can lead to lifelong dialysis. The study asked whether combining CT images with clinical data could classify four tumour types and predict the surgical approach. The four types are clear cell, chromophobe and papillary renal cell carcinoma, and oncocytoma.',
      'The public KiTS21 dataset provided contrast-enhanced CT and clinical records for 300 patients. Of 64,603 CT slices, about 64.5% contained no kidney, so a modified DenseNet201 classifier with auxiliary outputs, DenseAUXNet201, first removed non-kidney slices. A YOLO detector then extracted tumour regions, and deep image features from those regions were combined with selected clinical variables in the final classifiers. Patients were split into five subject-wise folds.',
      'The combined model reached 85.66% accuracy and an 84.92% F1 score for tumour type, despite a marked class imbalance. For malignant tumours, it predicted the recorded surgical approach with 90.63% accuracy. Feature ranking identified tumour size and cancer stage as the most informative clinical variables for the surgical decision.',
    ],
    measures: [
      { value: '85.66%', label: 'Four-class tumour type accuracy' },
      { value: '90.63%', label: 'Surgical approach prediction accuracy' },
      { value: '300', label: 'Patients in the KiTS21 cohort' },
    ],
    figures: [
      {
        image: renalFramework,
        alt: 'Pipeline diagram. CT slices are filtered to kidney slices, a YOLO model extracts the tumour region, and image features are combined with selected clinical features to classify tumour subtype and predict partial or radical nephrectomy.',
        caption: 'Figure 1 from Mahmud et al. (2023). Scope reduction, tumour-region extraction and classification from combined image and clinical features.',
        credit: renal,
        licence: ccBy,
      },
      {
        image: renalScoreCam,
        alt: 'Four axial CT slices with Score-CAM heat maps. In the three kidney slices the heat concentrates on the kidneys; in the non-kidney slice it falls elsewhere in the abdomen.',
        caption: 'Figure 5 from Mahmud et al. (2023). Score-CAM maps from the DenseAUXNet201 scope-reduction classifier for three kidney slices (a–c) and one non-kidney slice (d).',
        credit: renal,
        licence: ccBy,
      },
      {
        image: renalFeatures,
        alt: 'Horizontal bar chart of random forest feature importance for surgical approach selection. Radiographic tumour size and cancer stage rank highest, followed by body mass index and age at nephrectomy.',
        caption: 'Figure 9 from Mahmud et al. (2023). Random forest ranking of the clinical features that informed surgical approach prediction.',
        credit: renal,
        licence: ccBy,
      },
    ],
  },
  {
    id: 'hydronephrosis',
    navLabel: 'Prenatal hydronephrosis (ultrasound)',
    title: 'Grading prenatal hydronephrosis from ultrasound',
    status: 'Published · Expert Systems with Applications, 2024',
    paragraphs: [
      'Prenatal hydronephrosis, a swelling of the fetal kidney, is usually benign but can cause lasting damage in severe cases. It is graded from ultrasound on the five-level Society for Fetal Urology (SFU) scale, and that grading varies between clinicians. The study asked whether an automated pipeline could grade severity consistently and support decisions about surgery.',
      'The QU–HMC–AHN dataset was curated with Hamad Medical Corporation, Sidra Medicine and Qatar University from about 5,600 ultrasound images of 164 subjects. After curation, 2,062 images from 163 subjects were used. Two radiologists outlined the kidneys, and two senior radiologists and three senior urologists assigned SFU grades. The pipeline detects the kidney region with YOLOv5x, segments the kidney with the proposed KUSNet, and grades severity with PHCNet, which fuses DenseNet201 and InceptionV3. Weighted voting combines the views of each subject into one grade.',
      'KUSNet segmented the kidney with a 92.1% Dice score. Grading the segmented kidneys reached 93.9% subject-level accuracy and an 89.0% F1 score, and segmenting first improved grading compared with using whole ultrasound images. A separate classifier used the segmented kidneys to separate subjects who went on to surgery from those who did not.',
    ],
    measures: [
      { value: '92.1%', label: 'Kidney segmentation Dice' },
      { value: '93.9%', label: 'Subject-level five-grade accuracy' },
      { value: '163', label: 'Subjects in the curated cohort' },
    ],
    figures: [
      {
        image: ahnFramework,
        alt: 'Framework diagram. Raw ultrasound images are sorted, a YOLO model crops the kidney region, a segmentation model outlines the kidney, and classifiers grade severity per image and per subject and predict whether surgery is needed, with expert annotations and majority voting feeding the labels.',
        caption: 'Figure 1 from Mahmud et al. (2024). Region detection, kidney segmentation, image-wise and subject-wise severity grading, and surgery classification.',
        credit: hydronephrosis,
        licence: elsevier(2024),
      },
      {
        image: ahnGrades,
        alt: 'Five fetal kidney ultrasound images, one for each severity grade from SFU 0 to SFU IV, each shown above its annotated kidney region. The dark, fluid-filled area inside the kidney is larger at higher grades.',
        caption: 'Figure 3 from Mahmud et al. (2024). Ultrasound views from five antenatal subjects, one for each SFU grade, shown above the annotated kidney regions used for grading.',
        credit: hydronephrosis,
        licence: elsevier(2024),
      },
      {
        image: ahnSegmentation,
        alt: 'Grid of twelve kidney ultrasound views with the ground-truth kidney mask and the masks predicted by UNet++, UNet3+ and KUSNet beneath each view.',
        caption: 'Figure 6 from Mahmud et al. (2024). Kidney masks predicted by UNet++, UNet3+ and KUSNet, compared with the ground truth for twelve ultrasound views (columns a–l).',
        credit: hydronephrosis,
        licence: elsevier(2024),
      },
    ],
  },
  {
    id: 'kidney-stones',
    navLabel: 'Kidney stones (CT)',
    title: 'Segmenting kidney stones in CT by successive scope reduction',
    status: 'Published · Biomedical Signal Processing and Control, 2026',
    paragraphs: [
      'Kidney stones recur, so patients often need periodic CT monitoring of stone size and position. Stones occupy a tiny fraction of an abdominal CT scan, which makes direct segmentation unreliable. Saliency maps only give a rough location without the stone’s size, shape or exact position. The study asked whether narrowing the search in two steps would let a model outline stones accurately.',
      'The public dataset contains unenhanced CT from 259 subjects collected in 2018–2020 at the First Affiliated Hospital of Guangzhou Medical University. Successive scope reduction first keeps the 27.55% of the 64,988 slices that contain a kidney, then keeps those with stones. Both steps use SSRNet, which fuses DenseNet201 and Inception-ResNetV2 with auxiliary outputs. Features learned by the classifiers are transferred to initialise KSSNet, a MultiResUNet-based segmentation network. Evaluation used five subject-independent folds.',
      'SSRNet reached a 94.45% F1 score for scope reduction. On the reduced slices, KSSNet segmented stones with a 97.44% Dice score and a 95.01% Jaccard index. The same model reached 90.13% Dice without scope reduction and 93.10% with kidney-slice selection alone. Ablation studies confirmed the contribution of each stage.',
    ],
    measures: [
      { value: '97.44%', label: 'Stone Dice with full scope reduction' },
      { value: '90.13%', label: 'Stone Dice without scope reduction' },
      { value: '94.45%', label: 'Scope-reduction F1 score (SSRNet)' },
    ],
    figures: [
      {
        image: stoneFramework,
        alt: 'Pipeline diagram. Abdominal CT volumes are preprocessed, a classifier keeps the slices that contain kidney, a second classifier keeps the slices that contain stones, and a segmentation model outlines the kidney and stones on the remaining slices.',
        caption: 'Figure 1 from Mahmud et al. (2026). Preprocessing, successive scope reduction and segmentation, with features transferred between the stages.',
        credit: stones,
        licence: elsevier(2026),
      },
      {
        image: stoneTransfer,
        alt: 'Two-part diagram. (a) The kidney instance classifier initialises the stone instance classifier through complete feature transfer. (b) Selected features from the stone classifier, built from Inception-ResNetV2 and DenseNet201 branches, initialise the encoder of the KSSNet segmentation model.',
        caption: 'Figure 4 from Mahmud et al. (2026). Complete feature transfer between the two classifiers (a) and selective feature transfer into the segmentation model (b).',
        credit: stones,
        licence: elsevier(2026),
      },
      {
        image: stoneSegmentation,
        alt: 'Grid of CT slices from twelve subjects with ground-truth kidney and stone masks and the masks predicted by FPN, U-Net, U-Net++, UNet3+, MultiResUNet and KSSNet, with arrows marking false positives and false negatives. Below, consecutive slices from two subjects show consistent KSSNet segmentation.',
        caption: 'Figure 6 from Mahmud et al. (2026). (a) Predicted kidney and stone masks from baseline models and KSSNet for twelve subjects, with red arrows marking false positives and green arrows false negatives. (b, c) Consecutive slices from two challenging subjects.',
        credit: stones,
        licence: elsevier(2026),
      },
    ],
  },
];

export const kidneyNextSteps = 'The segment-first approach continues in ongoing work on liver and tumour segmentation across contrast-enhanced CT phases. Further validation of the kidney models on multi-centre cohorts and acquisition protocols would be needed before clinical use.';
