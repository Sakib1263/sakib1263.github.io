import sentinelSegmentation from '../assets/research/climate-geopolitical-risk/sentinel2-segmentation.png';
import relabellingLoop from '../assets/research/climate-geopolitical-risk/relabelling-loop.png';
import type { ResearchPhase, ResearchProject } from './research';

const taskReport = { label: 'Task 4 report, Omdena–Finz challenge (2021)' };
const copernicus = {
  label: 'Contains modified Copernicus Sentinel data',
  href: 'https://sentinels.copernicus.eu/documents/247904/690755/Sentinel_Data_Legal_Notice',
};

export const climateRiskVisual: NonNullable<ResearchProject['visual']> = {
  image: sentinelSegmentation,
  alt: 'Four panels for one Sentinel-2 test scene: the input band in false colour, with a no-data strip along the right edge; the model\'s predicted pixel values in greyscale; the mask after thresholding, with white marking pixels assigned to the class; and the polygons traced from that mask.',
  caption: 'One Sentinel-2 test scene processed by the trained model: the input band, the predicted pixel values, the mask after thresholding and the polygons traced from it. From the Task 4 report.',
  credit: taskReport,
  licence: copernicus,
};

export const climateRiskProgress: ResearchPhase[] = [
  {
    id: 'dataset-selection',
    navLabel: 'Dataset selection',
    title: 'Choosing a labelled satellite dataset',
    status: 'Task lead · July 2021',
    paragraphs: [
      'The pipeline needed satellite images labelled with several classes at once, so that one model could map buildings, roads, vegetation and water around a site. About 30 public aerial and satellite datasets were compared by size, platform, number and resolution of images, label type and classes. Many covered a single class, such as buildings, ships or trees, or came from drones.',
      'Five datasets were shortlisted, and the Dstl Satellite Imagery Feature Detection dataset fitted best. Its WorldView-3 scenes each cover 1 km × 1 km and come as RGB images and as 16-band images, with eight multispectral bands from 400 to 1,040 nm and eight short-wave infrared bands from 1,195 to 2,365 nm. Ten classes are labelled as polygons.',
    ],
    measures: [
      { value: 'About 30', label: 'Datasets compared' },
      { value: '10', label: 'Labelled classes' },
      { value: '16', label: 'Spectral bands per image' },
    ],
    table: {
      caption: 'Classes labelled in the Dstl dataset, grouped by type.',
      columns: ['Classes and what they include'],
      rows: [
        { label: 'Buildings and structures', cells: ['Residential, non-residential and large buildings, fuel storage and fortified buildings, plus other man-made structures'] },
        { label: 'Transport routes', cells: ['Roads, and tracks such as dirt tracks and footpaths'] },
        { label: 'Vegetation', cells: ['Trees, from woodland to single trees, and crops, including grain and row crops'] },
        { label: 'Water', cells: ['Waterways and standing water'] },
        { label: 'Vehicles', cells: ['Large vehicles such as lorries and buses, and small vehicles such as cars and motorbikes'] },
      ],
    },
  },
  {
    id: 'pipeline',
    navLabel: 'Pipeline',
    title: 'Building an end-to-end segmentation pipeline',
    status: 'Task lead · August 2021',
    paragraphs: [
      'The pipeline runs from raw images and polygon labels to predicted masks and polygons in one notebook. Polygon labels were converted into a mask for each class. Tests showed that some multispectral bands outside red, green and blue picked out vegetation more clearly, so the multispectral images were used for training.',
      'Memory on Google Colab limited the input size. Each image was resized to 512 × 512 pixels and split into 16 patches of 128 × 128, which kept enough detail in each patch without creating too many patches per image. About a quarter of the training data was held out for validation. Test images went through the same steps, and their predicted patches were stitched back together.',
      'Predicted masks were turned into binary masks with a threshold set for each class, for example about 0.1 to 0.15 for buildings and 0.4 to 0.5 for crops. The masks were then traced into polygons in the same format as the labels.',
    ],
    measures: [
      { value: '128 × 128', label: 'Pixels per training patch' },
      { value: '16', label: 'Patches per resized image' },
      { value: 'About 25%', label: 'Training data held out for validation' },
    ],
  },
  {
    id: 'model-comparison',
    navLabel: 'Model comparison',
    title: 'Comparing U-Net variants',
    status: 'Task lead · August–September 2021',
    paragraphs: [
      'Five architectures from the U-Net family were built from scratch in TensorFlow-Keras, with configurable depth, width and kernel size: U-Net, an ensembled U-Net, U-Net+, U-Net++ and MultiResUNet. Each used four levels, 128 filters in the first layer and 3 × 3 kernels, a balance between model size and patch size found by experiment. A second version of each model replaced upsampling in the decoder with transposed convolution.',
      'The models were scored with the Jaccard index, or intersection over union, between predicted and labelled masks. The original U-Net scored highest overall, at 0.727. The denser models did not improve on it, probably because they overfitted the available data.',
    ],
    measures: [
      { value: '0.727', label: 'Best overall intersection over union (U-Net)' },
      { value: '5', label: 'Architectures' },
      { value: '10', label: 'Model versions compared' },
    ],
    table: {
      caption: 'Overall intersection over union for each architecture and decoder type, from the Task 4 report.',
      columns: ['Upsampling decoder', 'Transposed-convolution decoder'],
      rows: [
        { label: 'U-Net', cells: ['0.727', '0.724'] },
        { label: 'Ensembled U-Net', cells: ['0.692', '0.706'] },
        { label: 'U-Net+', cells: ['0.692', '0.696'] },
        { label: 'U-Net++', cells: ['0.706', '0.711'] },
        { label: 'MultiResUNet', cells: ['0.706', '0.723'] },
      ],
    },
  },
  {
    id: 'sentinel-and-risk',
    navLabel: 'Sentinel-2 and risk',
    title: 'Testing on Sentinel-2 images and linking to risk scores',
    status: 'Final report · 2021',
    paragraphs: [
      'Finz planned to work with Sentinel-2 images, so the trained models were also run on Sentinel-2 scenes, where they marked trees, crops and water bodies. A separate task team wrote scripts to fetch and store Sentinel-2 tiles for Togo, Côte d\'Ivoire and Cameroon.',
      'To grow the training data later, the pipeline can also label new images. A trained model proposes polygons, a person refines them, and the new labels are added to the database for retraining.',
      'Within the wider project, segmentation was meant to add local detail to the team\'s risk models. The share of a scene covered by a class follows from its pixel count: in a 512 × 512 image of 1 km², 100,000 water pixels would cover about 0.38 km², or 38% of the area. More water nearby, for example, could raise the weight given to flood risk. Combining these shares with the flood and geopolitical scores was left for follow-on work.',
    ],
    table: {
      caption: 'Main outputs of the challenge and what each provides.',
      columns: ['What it provides'],
      rows: [
        { label: 'Flood risk map for Togo', cells: ['Five risk levels from a hazard map (rainfall, slope, drainage density and soil) and a vulnerability map (land cover, population density and distance to rivers)'] },
        { label: 'Geopolitical risk score', cells: ['Mean and maximum risk for a location in Côte d\'Ivoire from conflict events recorded since 1997, weighted by time, distance and event type'] },
        { label: 'Segmentation pipeline', cells: ['Share of a 1 km² area covered by buildings, vegetation, water and other classes'] },
        { label: 'Resources library', cells: ['210 datasets, articles, videos and tutorials gathered by the team'] },
      ],
    },
    figures: [
      {
        image: relabellingLoop,
        alt: 'Flowchart of a labelling loop. A new image goes into the trained model, which produces new labels. The labels are refined by hand and saved as polygon labels for each class, which are added to the database. The database is then used to retrain the model.',
        caption: 'Labelling loop for growing the training set: a trained model labels a new image, the labels are refined by hand and added to the database for retraining. From the Task 4 report.',
        credit: taskReport,
      },
    ],
  },
];
