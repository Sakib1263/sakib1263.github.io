import curvature from '../assets/research/aortic-wall-shear-stress/fig3-curvature.png';
import multiviewImages from '../assets/research/aortic-wall-shear-stress/fig4-multiview-images.png';
import network from '../assets/research/aortic-wall-shear-stress/fig6-multiviewunet.png';
import patientPredictions from '../assets/research/aortic-wall-shear-stress/fig9-patient-predictions.png';
import syntheticPredictions from '../assets/research/aortic-wall-shear-stress/fig10-synthetic-predictions.png';
import difficultCases from '../assets/research/aortic-wall-shear-stress/fig11-difficult-cases.png';
import { ccBy, sourceArticle } from './figure-credits';
import type { ResearchPhase, ResearchProject } from './research';

const doi = '10.1007/s11517-025-03311-3';
const venue = 'Medical & Biological Engineering & Computing · 2025';

export const aorticWssVisual: NonNullable<ResearchProject['visual']> = {
  image: multiviewImages,
  alt: 'A three-dimensional aorta coloured by time-averaged wall shear stress is rotated around its vertical axis in 30-degree steps, producing twelve images from 0 to 330 degrees.',
  caption: 'Figure 4 from Faisal et al. (2025), cropped from the article page. A 3D aortic geometry is converted into 12 rendered views.',
  credit: sourceArticle(doi),
  licence: ccBy,
};

export const aorticWssProgress: ResearchPhase[] = [
  {
    id: 'geometries-and-cfd',
    navLabel: 'Geometries and CFD',
    title: 'Building the aneurysm dataset and CFD reference',
    status: venue,
    paragraphs: [
      'CT scans from 23 patients with abdominal aortic aneurysm, provided by Hamad General Hospital, were segmented into 3D aortic geometries. With guidance from clinicians, 10 synthetic variants were created from each patient geometry, giving 253 geometries in total.',
      'Transient CFD simulations in ANSYS CFX covered three cardiac cycles, and the third cycle was used to calculate time-averaged wall shear stress (TAWSS). Each synthetic geometry took about one hour, and the synthetic set required 230 hours and 8 TB of storage.',
    ],
    measures: [
      { value: '253', label: 'Aortic geometries' },
      { value: '23', label: 'Patient geometries, all held for testing' },
      { value: '~1 h', label: 'CFD time per synthetic geometry' },
    ],
    table: {
      caption: 'Training and test split described in Section 2.8 of Faisal et al. (2025).',
      columns: ['Training', 'Testing', 'Total'],
      rows: [
        { label: 'Patient geometries', cells: ['0', '23', '23'] },
        { label: 'Synthetic geometries', cells: ['190', '40', '230'] },
        { label: 'All geometries', cells: ['190', '63', '253'] },
      ],
    },
  },
  {
    id: 'multi-view-representation',
    navLabel: 'Multi-view representation',
    title: 'Turning 3D geometry into image pairs',
    status: venue,
    paragraphs: [
      'Each geometry was rendered from 12 angles by rotating it around its vertical axis in 30-degree steps, and the images were resized to 256 × 256 pixels. This turned a geometry-to-geometry problem into image-to-image translation and removed the need for every aorta to have the same number of mesh nodes.',
      'Surface curvature was added to the input as a colour map because it describes aneurysm shape directly. Compared with shaded geometry alone, curvature reduced the normalised absolute error and raised the effective peak signal-to-noise ratio by more than 6 dB.',
    ],
    measures: [
      { value: '12', label: 'Rendered views per geometry' },
      { value: '30°', label: 'Rotation between views' },
      { value: '256 × 256', label: 'Image size used by the model' },
    ],
    table: {
      caption: 'Results for the two input representations, from Section 3 of Faisal et al. (2025).',
      columns: ['NMAE', 'NMSE', 'NRMSE', 'EPSNR'],
      rows: [
        { label: 'Shaded geometry', cells: ['0.402%', '0.086%', '1.316%', '23.67 dB'] },
        { label: 'Geometry with curvature', cells: ['0.362%', '0.021%', '0.643%', '29.79 dB'] },
      ],
    },
    figures: [
      {
        image: curvature,
        alt: 'A plain 3D aorta passes through a curvature calculation and colour mapping step, producing the same aorta coloured by surface curvature.',
        caption: 'Figure 3 from Faisal et al. (2025), cropped from the article page. Surface curvature is added to the raw geometry as a colour map.',
        credit: sourceArticle(doi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'multiviewunet',
    navLabel: 'MultiViewUNet',
    title: 'Predicting wall shear stress with MultiViewUNet',
    status: venue,
    paragraphs: [
      'MultiViewUNet is a five-level image-to-image network that combines full-scale connections between its encoder and decoder with additional connections inside each path. It was trained with a loss calculated only over pixels belonging to the aorta, so the white background did not affect learning.',
      'On the 63 held-out geometries, it gave the lowest image-based errors among the compared models. Predictions closely followed CFD on patient and synthetic geometries, with the largest differences in regions of disturbed flow.',
    ],
    measures: [
      { value: '0.362%', label: 'Normalised mean absolute error' },
      { value: '29.79 dB', label: 'Effective peak signal-to-noise ratio' },
      { value: '11.85 ms', label: 'Inference time on an NVIDIA T4 GPU' },
    ],
    table: {
      caption: 'Model comparison from Table 1 of Faisal et al. (2025). PointNet metrics were calculated directly from 3D geometry, so they are not fully comparable with the image-based models.',
      columns: ['NMAE', 'NMSE', 'NRMSE', 'EPSNR', 'Inference time'],
      rows: [
        { label: 'U-Net', cells: ['0.414%', '0.086%', '1.305%', '23.67 dB', '8.02 ms'] },
        { label: 'Pix2Pix', cells: ['0.379%', '0.032%', '0.805%', '27.3 dB', '8.13 ms'] },
        { label: 'PointNet', cells: ['4.52%', '0.573%', '7.57%', '18.3 dB', '6.45 ms'] },
        { label: 'MultiViewUNet', cells: ['0.362%', '0.021%', '0.643%', '29.79 dB', '11.85 ms'] },
      ],
    },
    figures: [
      {
        image: network,
        alt: 'MultiViewUNet diagram with five encoder levels and four decoder levels joined by dense curved skip connections inside and across the encoder and decoder paths.',
        caption: 'Figure 6 from Faisal et al. (2025), cropped from the article page. The MultiViewUNet architecture.',
        credit: sourceArticle(doi),
        licence: ccBy,
      },
      {
        image: patientPredictions,
        alt: 'Seven patient aortic geometries shown twice. CFD wall shear stress maps in the top row closely resemble the model predictions in the bottom row.',
        caption: 'Figure 9 from Faisal et al. (2025), cropped from the article page. CFD reference (top) and predicted wall shear stress (bottom) on patient geometries.',
        credit: sourceArticle(doi),
        licence: ccBy,
      },
      {
        image: syntheticPredictions,
        alt: 'Seven synthetic aortic geometries shown twice. CFD wall shear stress maps in the top row closely resemble the model predictions in the bottom row.',
        caption: 'Figure 10 from Faisal et al. (2025), cropped from the article page. CFD reference (top) and predicted wall shear stress (bottom) on synthetic geometries.',
        credit: sourceArticle(doi),
        licence: ccBy,
      },
      {
        image: difficultCases,
        alt: 'Seven aortic geometries comparing CFD and predicted wall shear stress, with red arrows marking regions where the prediction differs from the reference.',
        caption: 'Figure 11 from Faisal et al. (2025), cropped from the article page. Less accurate cases, with differences marked by red arrows.',
        credit: sourceArticle(doi),
        licence: ccBy,
      },
    ],
  },
];
