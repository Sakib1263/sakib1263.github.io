import architecture from '../assets/research/gearbox-fault-detection/fig6-architecture.png';
import segmentation from '../assets/research/gearbox-fault-detection/fig3-segmentation.png';
import distributions from '../assets/research/gearbox-fault-detection/fig4-distributions.png';
import confusion from '../assets/research/gearbox-fault-detection/fig7-confusion-matrix.png';
import roc from '../assets/research/gearbox-fault-detection/fig8-roc.png';
import { ccBy, sourceArticle } from './figure-credits';
import type { ResearchPhase, ResearchProject } from './research';

const gearDoi = '10.1109/access.2024.3412274';
const credit = sourceArticle(gearDoi);

export const gearboxFaultVisual: NonNullable<ResearchProject['visual']> = {
  image: architecture,
  alt: 'Block diagram of GearFaultNet. A four-channel input signal is normalised and passes through five blocks of 1D convolution, batch normalisation and tanh activation; the first block also has max pooling. Feature maps change from 4 by 512 at the input to 32, 16, 32, 24 and 16 channels of length 256. Adaptive average pooling reduces them to 16 by 8, and after flattening a small dense network outputs Healthy or Broken.',
  caption: 'Figure 6 from Dutta et al. (2024). GearFaultNet: five small 1D convolutional blocks, adaptive average pooling and a dense classifier that labels each vibration window as healthy or broken.',
  credit,
  licence: ccBy,
};

export const gearboxFaultProgress: ResearchPhase[] = [
  {
    id: 'data-preparation',
    navLabel: 'Data preparation',
    title: 'Preparing four-channel vibration data',
    status: 'IEEE Access · 2024',
    paragraphs: [
      'The study used the public Gear Box Fault Diagnosis dataset, recorded on SpectraQuest’s gearbox fault simulator. Four accelerometers on the gearbox body measured vibration for a healthy gear and a broken gear under ten loading conditions, from 0% to 90% in steps of 10%.',
      'Each channel was cut into windows of 512 samples. Training windows overlapped by half to give the network more examples. Each channel was then standardised to zero mean and unit variance and scaled to a range of −0.2 to 0.2, simple steps that keep preprocessing fast.',
      'The folds were split by load. Each of the ten folds held out one loading condition for testing and trained on the others, so the model was always tested on a load it had not seen. This also avoids the overlap between training and test data that shuffling windows before splitting can create.',
    ],
    measures: [
      { value: '4', label: 'Accelerometer channels' },
      { value: '512', label: 'Samples per window' },
      { value: '10', label: 'Loading conditions, one per test fold' },
    ],
    figures: [
      {
        image: segmentation,
        alt: 'Plot of a vibration signal over 5,000 sample points with amplitudes between about −20 and 20. Rectangles mark 512-sample windows at the start and end of the signal, with each dashed window starting halfway through the previous one.',
        caption: 'Figure 3 from Dutta et al. (2024). Vibration signals were cut into 512-sample windows; training windows overlapped by 50%.',
        credit,
        licence: ccBy,
      },
      {
        image: distributions,
        alt: 'Grid of density plots for four channels at 0% and 30% load, for broken and healthy gears. Raw signals spread across roughly −20 to 20 units. After z-score and min-max normalisation, every channel sits within −0.2 to 0.2.',
        caption: 'Figure 4 from Dutta et al. (2024). Distributions of the four channels before and after normalisation, for broken and healthy gears at 0% and 30% load.',
        credit,
        licence: ccBy,
      },
    ],
  },
  {
    id: 'gearfaultnet',
    navLabel: 'GearFaultNet',
    title: 'Designing a lightweight one-dimensional classifier',
    status: 'Model design',
    paragraphs: [
      'GearFaultNet takes each four-channel window as a 4 × 512 input. Five small blocks of 1D convolution, batch normalisation and tanh activation extract features, with 16 to 32 filters per block. Max pooling in the first block halves the length, and adaptive average pooling reduces the final features to 16 × 8 before a small dense classifier labels the window as healthy or broken.',
      'The loss passed the outputs through a softmax and then a mean squared error. Training used the Adam optimiser on Google Colab, and the learning rate was lowered and training stopped early when validation loss stopped improving.',
    ],
    measures: [
      { value: '5', label: 'Convolutional blocks' },
      { value: '4 × 512', label: 'Input per window' },
      { value: '16 × 8', label: 'Features passed to the classifier' },
    ],
    table: {
      caption: 'Training settings. From Table 1 of the paper.',
      columns: ['Value'],
      rows: [
        { label: 'Batch size', cells: ['4'] },
        { label: 'Maximum epochs', cells: ['200'] },
        { label: 'Learning rate', cells: ['0.0002, reduced by a factor of 0.2 after 10 epochs without improvement'] },
        { label: 'Early stopping', cells: ['After 30 epochs without improvement'] },
        { label: 'Optimiser', cells: ['Adam'] },
        { label: 'Loss function', cells: ['Softmax followed by mean squared error'] },
      ],
    },
  },
  {
    id: 'results',
    navLabel: 'Results',
    title: 'Detecting broken gears under unseen loads',
    status: 'Ten-fold evaluation',
    paragraphs: [
      'Across the ten folds there were 7,488 test windows: 3,697 from the broken gear and 3,791 from the healthy one. GearFaultNet classified 94.06% correctly. It found 3,409 broken-gear windows and missed 288, and it raised 157 false alarms among the healthy windows. Precision was higher for the broken class, at 95.60%, while recall was higher for the healthy class, at 95.86%. Both classes had an area under the ROC curve of 0.98.',
      'Under the same settings, GearFaultNet outperformed a 1D ResNet18 (77.74% accuracy) and Self-ResNet18, a version built with self-organised operational layers (92.74%). Earlier hybrid LSTM methods on the same dataset reported 87.50%. Studies that reported 100% shuffled windows before splitting, whereas the load-based split here keeps each test load out of training.',
    ],
    measures: [
      { value: '94.06%', label: 'Accuracy' },
      { value: '0.98', label: 'Area under the ROC curve' },
      { value: '7,488', label: 'Test windows across ten folds' },
    ],
    table: {
      caption: 'Comparison with two deeper 1D networks under the same settings (%). From Table 3 of the paper.',
      columns: ['Accuracy', 'Precision', 'Sensitivity', 'Specificity', 'F1 score'],
      rows: [
        { label: 'ResNet18', cells: ['77.74', '78.10', '77.74', '77.58', '77.64'] },
        { label: 'Self-ResNet18', cells: ['92.74', '93.20', '92.74', '92.60', '92.71'] },
        { label: 'GearFaultNet', cells: ['94.06', '94.11', '94.06', '94.01', '94.05'] },
      ],
    },
    figures: [
      {
        image: confusion,
        alt: 'Two-by-two confusion matrix. 92% of broken-gear windows (3,409) and 96% of healthy windows (3,634) are classified correctly. 8% of broken-gear windows are labelled healthy and 4% of healthy windows are labelled broken.',
        caption: 'Figure 7 from Dutta et al. (2024). Confusion matrix combined over all ten test folds.',
        credit,
        licence: ccBy,
      },
      {
        image: roc,
        alt: 'ROC curves for the broken class, the healthy class and their micro and macro averages. All four curves rise steeply to a true positive rate above 0.9 at a false positive rate below 0.1, and each has an area of 0.98.',
        caption: 'Figure 8 from Dutta et al. (2024). ROC curves for each class and their micro and macro averages, all with an area of 0.98.',
        credit,
        licence: ccBy,
      },
    ],
  },
];
