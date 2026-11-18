import hipSystem from '../assets/research/hip-implant-mechanics-and-imaging/polymers-fig1-hip-system.png';
import hipxMethodology from '../assets/research/hip-implant-mechanics-and-imaging/hipxnet-fig1-methodology.png';
import hipxDetection from '../assets/research/hip-implant-mechanics-and-imaging/fig8-implant-detection.jpg';
import hipxConfusion from '../assets/research/hip-implant-mechanics-and-imaging/hipxnet-fig10-confusion.png';
import hipxScoreCam from '../assets/research/hip-implant-mechanics-and-imaging/hipxnet-fig11-scorecam.jpg';
import feModels from '../assets/research/hip-implant-mechanics-and-imaging/polymers-fig6-fe-models.png';
import wearRates from '../assets/research/hip-implant-mechanics-and-imaging/polymers-fig9-wear-rates.png';
import sensorPositions from '../assets/research/hip-implant-mechanics-and-imaging/saw-fig14-sensor-positions.png';
import sensorVoltage from '../assets/research/hip-implant-mechanics-and-imaging/saw-fig15-voltage.png';
import trunnionGeometry from '../assets/research/hip-implant-mechanics-and-imaging/fig2-trunnion-geometry.png';
import slidingDistance from '../assets/research/hip-implant-mechanics-and-imaging/spiral-fig13-sliding-distance.png';
import gruenZones from '../assets/research/hip-implant-mechanics-and-imaging/stem-fig5-gruen-zones.png';
import stressDistribution from '../assets/research/hip-implant-mechanics-and-imaging/stem-fig7-stress-distribution.png';
import stressShielding from '../assets/research/hip-implant-mechanics-and-imaging/stem-fig12-stress-shielding.png';
import microMovement from '../assets/research/hip-implant-mechanics-and-imaging/stem-fig13-micromovement.png';
import { ccBy, elsevier, sourceArticle } from './figure-credits';
import type { ResearchPhase, ResearchProject } from './research';

const hipxDoi = '10.1109/access.2022.3173424';
const polymersDoi = '10.3390/polym14204308';
const sawDoi = '10.3390/bios13010079';
const spiralDoi = '10.3390/ma16041466';
const stemDoi = '10.1016/j.mtcomm.2024.110932';

export const hipImplantVisual: NonNullable<ResearchProject['visual']> = {
  image: hipSystem,
  alt: 'Illustration of the pelvis and femurs with a total hip implant, showing the acetabular shell, acetabular liner, femoral head and hip stem.',
  caption: 'Figure 1 from Soliman et al. (2022), Polymers. Main components of a total hip implant system.',
  credit: sourceArticle(polymersDoi),
  licence: ccBy,
};

export const hipImplantProgress: ResearchPhase[] = [
  {
    id: 'loosening-detection',
    navLabel: 'Loosening detection',
    title: 'Detecting aseptic loosening from hip X-rays',
    status: 'IEEE Access · 2022',
    paragraphs: [
      'Reading hip radiographs for implant loosening depends on experienced clinicians and can vary between readers. HipXNet first located the implant with YOLOv5, then classified the cropped implant region as loose or control. The study released the Aseptic Loose Hip Implant X-Ray Database, with 200 images for localisation and 206 images for classification, including 112 loose and 94 control cases.',
      'All four YOLOv5 variants reached 100% precision, recall and mAP0.5, and YOLOv5m gave the best mAP0.5–0.95 at 87.8%. DenseNet201 was the best single classifier, while a stacking model with a Random Forest meta-learner raised five-fold accuracy to 96.11%. Score-CAM maps were used to examine the image regions behind each decision.',
    ],
    measures: [
      { value: '96.11%', label: 'Loosening detection accuracy' },
      { value: '100%', label: 'Implant localisation mAP0.5' },
      { value: '206', label: 'Loose and control X-rays classified' },
    ],
    table: {
      caption: 'Selected five-fold results from Table 4 and the abstract of Rahman et al. (2022).',
      columns: ['Accuracy', 'Precision', 'Sensitivity', 'F1 score', 'Specificity'],
      rows: [
        { label: 'ResNet50', cells: ['93.69%', '93.70%', '93.69%', '93.69%', '93.68%'] },
        { label: 'DenseNet201', cells: ['94.66%', '94.66%', '94.66%', '94.66%', '94.50%'] },
        { label: 'Extra Trees stacking', cells: ['95.55%', '95.56%', '95.55%', '95.55%', '95.60%'] },
        { label: 'Random Forest stacking', cells: ['96.11%', '96.42%', '96.42%', '96.42%', '96.74%'] },
      ],
    },
    figures: [
      {
        image: hipxMethodology,
        alt: 'Two-stage pipeline. YOLOv5 models detect the implant in a hip X-ray, the stem region is cropped, and several CNN base learners feed a machine learning meta-learner that classifies the implant as loose or control.',
        caption: 'Figure 1 from Rahman et al. (2022). Implant detection followed by stacked loosening classification.',
        credit: sourceArticle(hipxDoi),
        licence: ccBy,
      },
      {
        image: hipxDetection,
        alt: 'Six hip radiographs with implants. Red boxes mark the annotated implant regions and orange boxes mark the regions predicted by YOLOv5m, which overlap closely.',
        caption: 'Figure 8 from Rahman et al. (2022). Implant regions predicted by YOLOv5m on test radiographs, shown against the annotations.',
        credit: sourceArticle(hipxDoi),
        licence: ccBy,
      },
      {
        image: hipxConfusion,
        alt: 'Two confusion matrices. DenseNet201 correctly classifies 107 loose and 88 control images, while the stacking model correctly classifies 108 loose and 90 control images.',
        caption: 'Figure 10 from Rahman et al. (2022). Confusion matrices for DenseNet201 (A) and the Random Forest stacking model (B).',
        credit: sourceArticle(hipxDoi),
        licence: ccBy,
      },
      {
        image: hipxScoreCam,
        alt: 'Heat maps over hip implant X-rays. Correctly classified loose implants show attention near the marked loosening regions, while misclassified images show attention elsewhere.',
        caption: 'Figure 11 from Rahman et al. (2022). Score-CAM maps for correctly classified (A) and misclassified (B) loose implants.',
        credit: sourceArticle(hipxDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'biomaterials-review',
    navLabel: 'Biomaterials review',
    title: 'Reviewing implant biomaterials and performance measures',
    status: 'Polymers · 2022',
    paragraphs: [
      'This review connected biomaterial choice with common causes of implant failure, including stress shielding, dislocation, aseptic loosening, reduced bone remodelling and tissue reactions to wear debris. It brought together pre-clinical finite element analysis with in vitro, in vivo and clinical evidence.',
      'The finite element evidence was organised around four mechanical measures: von Mises stress and deformation, micromotion, wear and fatigue. Across the joint material pairs compared, ceramic-on-ceramic bearings had the lowest overall wear rate.',
    ],
    measures: [
      { value: '4', label: 'Mechanical performance areas' },
      { value: '10–15 years', label: 'Reported period when most implants fail' },
      { value: 'Ceramic-on-ceramic', label: 'Lowest overall wear among compared pairs' },
    ],
    table: {
      caption: 'Pre-clinical performance areas discussed by Soliman et al. (2022).',
      columns: ['What it helps assess'],
      rows: [
        { label: 'Von Mises stress and deformation', cells: ['Load transfer and structural response'] },
        { label: 'Micromotion', cells: ['Stability at the bone–implant contact'] },
        { label: 'Wear', cells: ['Debris generation at joint surfaces'] },
        { label: 'Fatigue', cells: ['Failure risk under repeated loading'] },
      ],
    },
    figures: [
      {
        image: feModels,
        alt: 'Finite element setups for a hip implant alone and for an implant inside a femur, with fixed supports, applied force and moment marked.',
        caption: 'Figure 6 from Soliman et al. (2022), Polymers. Finite element models with ISO 7206-4 and ISO 7206-8 boundary conditions.',
        credit: sourceArticle(polymersDoi),
        licence: ccBy,
      },
      {
        image: wearRates,
        alt: 'Stacked bar chart of wear rate by hip joint material pair. Metal-on-polymer and ceramic-on-polymer pairs are highest, and ceramic-on-ceramic is lowest.',
        caption: 'Figure 9 from Soliman et al. (2022), Polymers. Wear rate per million cycles for different joint material pairs.',
        credit: sourceArticle(polymersDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'saw-sensing',
    navLabel: 'Implant sensing',
    title: 'Testing surface acoustic wave sensing on an implant',
    status: 'Biosensors · 2023',
    paragraphs: [
      'This simulation study examined whether a two-port surface acoustic wave sensor could support implant-loosening monitoring. The lithium niobate device was designed for 872 MHz and analysed in COMSOL, with a maximum insertion loss of −8.79 dB at 864 MHz.',
      'The sensor was then placed at two positions on a hip implant and studied under three upper- and lower-body loading conditions. Stresses stayed below yield limits, and Position B produced the higher maximum voltage. The authors identified dynamic loading and vibro-acoustic behaviour as the next steps for long-term monitoring.',
    ],
    measures: [
      { value: '872 MHz', label: 'Sensor operating frequency' },
      { value: '17.88 V', label: 'Maximum simulated voltage' },
      { value: '2', label: 'Sensor positions on the implant' },
    ],
    table: {
      caption: 'Maximum voltage comparison from Table 6 of Hafizh et al. (2023). Comparison values were estimated through impedance matching.',
      columns: ['Substrate', 'Young’s modulus', 'Maximum voltage'],
      rows: [
        { label: 'This study', cells: ['LiNbO₃', '70 GPa', '17.88 V'] },
        { label: 'Lange and Kluess (2021)', cells: ['PZT ceramic', '52.4 GPa', '7.64 V'] },
        { label: 'Lange et al. (2020)', cells: ['PZT ceramic', '52.4 GPa', '2.88 V'] },
      ],
    },
    figures: [
      {
        image: sensorPositions,
        alt: 'Two views of a hip implant stem showing the sensor at Position A near the neck and Position B further down the stem.',
        caption: 'Figure 14 from Hafizh et al. (2023). Sensor positions on the hip implant.',
        credit: sourceArticle(sawDoi),
        licence: ccBy,
      },
      {
        image: sensorVoltage,
        alt: 'Bar chart of maximum and average sensor output. Position B has a much higher maximum voltage than Position A.',
        caption: 'Figure 15 from Hafizh et al. (2023). Simulated sensor voltage at the two implant positions.',
        credit: sourceArticle(sawDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'spiral-trunnion',
    navLabel: 'Spiral trunnion',
    title: 'Designing a spiral head–stem trunnion',
    status: 'Materials · 2023',
    paragraphs: [
      'Fretting wear at the head–stem junction can contribute to hip implant failure. This study introduced a spiral trunnion and compared it with a smooth design using finite element analysis under walking and jogging loads. Wear was estimated with the Archard model.',
      'Average contact pressure was nearly the same for both designs, while the spiral design gave more uniform contact and shorter sliding distances. These changes supported stronger fixation and lower predicted wear.',
    ],
    measures: [
      { value: '0.039 mm³', label: 'Predicted spiral wear per million cycles' },
      { value: '≈10%', label: 'Lower predicted wear than the smooth trunnion' },
      { value: '≈10%', label: 'Shorter summed sliding distance' },
    ],
    table: {
      caption: 'Main comparison reported by Soliman et al. (2023), Materials.',
      columns: ['Smooth trunnion', 'Spiral trunnion'],
      rows: [
        { label: 'Predicted wear', cells: ['0.048 mm³ per million cycles', '0.039 mm³ per million cycles'] },
        { label: 'Summed sliding distance', cells: ['Reference', 'About 10% shorter'] },
        { label: 'Average contact pressure', cells: ['Nearly the same', 'Nearly the same'] },
        { label: 'Fixation', cells: ['Reference', 'Stronger'] },
      ],
    },
    figures: [
      {
        image: trunnionGeometry,
        alt: 'Engineering drawing of a hip implant stem with its head–neck dimensions, next to a 3D model. Insets compare the smooth and spiral surfaces of the head–stem taper junction.',
        caption: 'Figure 2a–b from Soliman et al. (2023), Materials. Implant geometry with smooth and spiral head–stem junctions.',
        credit: sourceArticle(spiralDoi),
        licence: ccBy,
      },
      {
        image: slidingDistance,
        alt: 'Bar chart of summed sliding distance during walking and jogging. The spiral trunnion is lower than the smooth trunnion in both conditions.',
        caption: 'Figure 13 from Soliman et al. (2023), Materials. Sliding distance for smooth and spiral trunnions.',
        credit: sourceArticle(spiralDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'design-review',
    navLabel: 'Design review',
    title: 'Mapping new stem and joint designs',
    status: 'Journal of Materials Chemistry B · 2023',
    paragraphs: [
      'This review examined how implant geometry affects stress distribution, micromotion, wear, dislocation and stability. It covered porous and functionally graded stems, femoral resurfacing, short and collared stems, and newer joint geometries.',
      'From the research gaps, the authors proposed two design directions: a collared stem with a porous functionally graded structure, and a spiral or gear-shaped tapered joint to reduce wear and improve stability.',
    ],
    measures: [
      { value: '10–20%', label: 'Implants reported to need revision within 1–10 years' },
      { value: '2', label: 'Design directions proposed' },
    ],
    table: {
      caption: 'Design themes summarised from Soliman et al. (2023), Journal of Materials Chemistry B.',
      columns: ['Main aim or finding'],
      rows: [
        { label: 'Porous lattice and graded stems', cells: ['More uniform stress transfer while preserving strength and bone growth'] },
        { label: 'Resurfacing, short and collared stems', cells: ['Better load transfer, with mechanical stability still a challenge'] },
        { label: 'Dual-mobility and reverse joints', cells: ['Reduced dislocation limits'] },
        { label: 'Unidirectional femoral head–liner joints', cells: ['Lower wear than traditional ball-and-socket joints'] },
      ],
    },
  },
  {
    id: 'stem-materials',
    navLabel: 'Stem materials',
    title: 'Comparing stem materials in the implanted femur',
    status: 'Materials Today Communications · 2024',
    paragraphs: [
      'A 3D Summit hip implant was placed in an adult femur model and simulated with six stem materials: Inconel 718, 316 stainless steel, Ti6Al7Nb, Ti6Al4V, TMZF and Ti-33.6Nb-4Sn (TNS). Walking, standing-up and sitting-down loads were applied, with peak resultant forces of 1,859 N, 1,582 N and 1,351 N.',
      'Less stiff materials transferred more stress to most Gruen zones and reduced stress shielding, although zone 3 needed further attention. They also increased overall micro-movement, but TNS remained within the range considered suitable for osteointegration and was identified as the strongest option among the materials tested.',
    ],
    measures: [
      { value: '6', label: 'Stem materials compared' },
      { value: '7', label: 'Gruen zones analysed' },
      { value: '25.5 µm', label: 'Highest micro-movement, with TNS' },
    ],
    table: {
      caption: 'Peak-walking micro-movement values reported in Section 3.3 of Soliman et al. (2024). Materials are listed from stiffer to less stiff.',
      columns: ['Maximum', 'Average'],
      rows: [
        { label: 'Inconel 718', cells: ['18 µm', '2.2 µm'] },
        { label: '316 stainless steel', cells: ['18.1 µm', '2.39 µm'] },
        { label: 'TMZF', cells: ['21 µm', '2.7 µm'] },
        { label: 'TNS', cells: ['25.5 µm', '2.71 µm'] },
      ],
    },
    figures: [
      {
        image: gruenZones,
        alt: 'Intact and implanted femurs divided into seven numbered Gruen zones.',
        caption: 'Figure 5 from Soliman et al. (2024). Gruen zones in intact (a) and implanted (b) femurs.',
        credit: sourceArticle(stemDoi),
        licence: elsevier(2024),
      },
      {
        image: stressDistribution,
        alt: 'Colour stress maps for an intact femur and implanted femurs with six stem materials, with the matching stress maps of each implant.',
        caption: 'Figure 7 from Soliman et al. (2024). Stress distribution in intact and implanted femurs across stem materials.',
        credit: sourceArticle(stemDoi),
        licence: elsevier(2024),
      },
      {
        image: stressShielding,
        alt: 'Bar charts of stress shielding by Gruen zone, material and activity. Values generally fall from stiffer alloys to less stiff alloys in most zones.',
        caption: 'Figure 12 from Soliman et al. (2024). Stress shielding across Gruen zones and loading activities.',
        credit: sourceArticle(stemDoi),
        licence: elsevier(2024),
      },
      {
        image: microMovement,
        alt: 'Colour maps of micro-movement over the bone–implant contact surface for six stem materials under peak walking load.',
        caption: 'Figure 13 from Soliman et al. (2024). Micro-movement across the bone–implant contact surface at peak walking load.',
        credit: sourceArticle(stemDoi),
        licence: elsevier(2024),
      },
    ],
  },
];
