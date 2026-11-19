import workflow from '../assets/research/recyclable-waste-classification/fig1-workflow.png';
import architecture from '../assets/research/recyclable-waste-classification/fig3-architecture.png';
import scoreCam from '../assets/research/recyclable-waste-classification/fig4-score-cam.png';
import { elsevier, sourceArticle } from './figure-credits';
import type { ResearchPhase, ResearchProject } from './research';

const gcdnDoi = '10.1016/j.wasman.2023.12.014';
const credit = sourceArticle(gcdnDoi);
const licence = elsevier(2023);

export const wasteClassificationVisual: NonNullable<ResearchProject['visual']> = {
  image: workflow,
  alt: 'Workflow diagram. Street images labelled not-garbage, or with several garbage types, are resized to 224 by 224 pixels and normalised. A single-label GCDN-Net separates not-garbage from garbage images. Garbage images then pass to a multi-label GCDN-Net, which predicts labels such as bulky waste, cardboard, garbage bag and litter for each image.',
  caption: 'Figure 1 from Hossen et al. (2024). The two-stage method: images are resized and normalised, a single-label classifier separates garbage from non-garbage images, and a multi-label classifier names the garbage types in each garbage image.',
  credit,
  licence,
};

export const wasteClassificationProgress: ResearchPhase[] = [
  {
    id: 'data-preparation',
    navLabel: 'Data preparation',
    title: 'Cleaning and preparing the street images',
    status: 'Waste Management · 2024',
    paragraphs: [
      'The study used the public GIGO dataset of 25,000 images taken by two car-mounted cameras on city streets: 9,352 with garbage and 15,648 without. Garbage images carry labels for four types, and one image can show several: bulky waste such as sofas and fridges, garbage bags, cardboard and litter.',
      'Faces and number plates in the dataset are hidden by grey or yellow boxes, which a model could mistake for garbage. About 3,000 affected images were removed, leaving 7,410 garbage images, and 8,760 images without garbage were sampled to balance the classes. Each dataset was split 70%, 10% and 20% for training, validation and testing, and every model was evaluated with five-fold cross-validation.',
      'Horizontal flips and rotations of up to 30 degrees raised the training images to about 5,000 per class. Images were resized to 224 × 224 pixels and normalised with the dataset’s mean and standard deviation.',
    ],
    measures: [
      { value: '16,170', label: 'Cleaned images used' },
      { value: '4', label: 'Garbage types labelled' },
      { value: '5-fold', label: 'Cross-validation' },
    ],
    table: {
      caption: 'Images per class for training, validation and testing in one fold, before augmentation. The first two rows form the single-label dataset; the last four are labels in the multi-label dataset. From Table 1 of the paper.',
      columns: ['Training', 'Validation', 'Test'],
      rows: [
        { label: 'Garbage', cells: ['5,187', '741', '1,482'] },
        { label: 'Not garbage', cells: ['6,132', '846', '1,752'] },
        { label: 'Garbage bag', cells: ['1,307', '182', '392'] },
        { label: 'Cardboard', cells: ['2,853', '414', '832'] },
        { label: 'Bulky waste', cells: ['3,249', '466', '933'] },
        { label: 'Litter', cells: ['2,447', '343', '686'] },
      ],
    },
  },
  {
    id: 'garbage-detection',
    navLabel: 'Garbage detection',
    title: 'Fusing two pretrained networks to detect garbage',
    status: 'Single-label classification',
    paragraphs: [
      'Four ImageNet-pretrained networks were compared first: ResNet50, MobileNetV2, DenseNet201 and Inception-v3. DenseNet201 and Inception-v3 performed best, so GCDN-Net combines them. The features from the last layers of both networks are joined before the final classifier.',
      'Three auxiliary outputs add deep supervision. One joins features from the middle of both networks, and the others come from the end of each network. The auxiliary losses get smaller weights the shallower they are, and the model was trained with the Adam optimiser at a learning rate of 0.0001.',
      'GCDN-Net separated garbage from non-garbage images with 95.77% accuracy and 95.54% specificity. Joining the two networks raised accuracy from 91.60% for Inception-v3 alone to 93.15%, one auxiliary output raised it to 94.72%, and three auxiliary outputs gave the final result.',
    ],
    measures: [
      { value: '95.77%', label: 'Accuracy' },
      { value: '95.54%', label: 'Specificity' },
      { value: '4.17 points', label: 'Accuracy gain over Inception-v3 alone' },
    ],
    table: {
      caption: 'Single-label classification, combined over five folds (%). From Table 2 of the paper.',
      columns: ['Accuracy', 'Precision', 'Specificity', 'F1 score'],
      rows: [
        { label: 'MobileNetV2', cells: ['87.61', '87.63', '87.56', '87.62'] },
        { label: 'ResNet50', cells: ['90.38', '90.39', '90.05', '90.37'] },
        { label: 'DenseNet201', cells: ['90.69', '90.69', '90.34', '90.67'] },
        { label: 'Inception-v3', cells: ['91.60', '91.60', '91.42', '91.60'] },
        { label: 'GCDN-Net, no auxiliary output', cells: ['93.15', '93.17', '93.85', '93.14'] },
        { label: 'GCDN-Net, one auxiliary output', cells: ['94.72', '94.73', '94.53', '94.73'] },
        { label: 'GCDN-Net, three auxiliary outputs', cells: ['95.77', '95.78', '95.54', '95.77'] },
      ],
    },
    figures: [
      {
        image: architecture,
        alt: 'Three block diagrams. (a) DenseNet201 with four dense blocks of 6, 12, 48 and 32 layers. (b) Inception-v3 with Inception-A, B and C modules separated by grid-size reductions. (c) GCDN-Net running both pretrained networks on the same input, with auxiliary output 1 joining features after dense block 2 and the first Inception modules, auxiliary outputs 2 and 3 at the end of each network, and the final output joining the last features of both.',
        caption: 'Figure 3 from Hossen et al. (2024). Architectures of (a) DenseNet201 and (b) Inception-v3, and (c) GCDN-Net, which joins both networks and adds three auxiliary outputs.',
        credit,
        licence,
      },
    ],
  },
  {
    id: 'waste-types',
    navLabel: 'Waste types',
    title: 'Naming the types of waste in each image',
    status: 'Multi-label classification',
    paragraphs: [
      'The 7,410 garbage images then went to a multi-label GCDN-Net. A sigmoid output with binary cross-entropy loss treats each of the four types as a separate yes-or-no decision, so one image can receive several labels.',
      'Across the four types, GCDN-Net reached a mean average precision of 0.69 and an F1 score of 75.01%. Bulky waste was recognised best, with a mean average precision of 0.73 and an F1 score of 80.23%. Garbage bags were hardest: they made up only 13.33% of the labels and are often small in the frame. An earlier study on the same dataset reported a mean average precision of 0.47 with a vision transformer.',
      'Score-CAM heatmaps showed which parts of each image drove the predictions. For images with one, two or more waste types, the heatmaps concentrated on the garbage rather than on surrounding buildings, vehicles or trees.',
    ],
    measures: [
      { value: '0.69', label: 'Mean average precision' },
      { value: '75.01%', label: 'F1 score' },
      { value: '80.23%', label: 'F1 score for bulky waste' },
    ],
    table: {
      caption: 'Multi-label classification with GCDN-Net, combined over five folds. Precision, recall and F1 score in %. From Table 3 of the paper.',
      columns: ['Mean average precision', 'Precision', 'Recall', 'F1 score'],
      rows: [
        { label: 'Bulky waste', cells: ['0.73', '73.97', '87.69', '80.23'] },
        { label: 'Cardboard', cells: ['0.73', '73.96', '81.91', '77.69'] },
        { label: 'Litter', cells: ['0.66', '69.74', '72.50', '70.96'] },
        { label: 'Garbage bag', cells: ['0.56', '71.05', '57.05', '63.12'] },
        { label: 'Overall', cells: ['0.69', '72.56', '78.32', '75.01'] },
      ],
    },
    figures: [
      {
        image: scoreCam,
        alt: 'Grid of nine street scenes, each shown above its Score-CAM heatmap. Labels range from a single type, such as cardboard, litter or a garbage bag, to two types, such as bulky waste and litter, and up to all four types. In each heatmap, the warm red and yellow region sits over the piles of waste on the pavement or kerb, while buildings, trees and vehicles stay blue.',
        caption: 'Figure 4 from Hossen et al. (2024). Test images with one label (I, IV, VII), two labels (II, V, VIII) and three or four labels (III, VI, IX), each above its Score-CAM heatmap.',
        credit,
        licence,
      },
    ],
  },
];
