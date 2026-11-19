import energyInternet from '../assets/research/e-tawfeer-energy-management/rser-fig4-energy-internet.png';
import drlTaxonomy from '../assets/research/e-tawfeer-energy-management/rser-fig2-taxonomy.png';
import bodNetArchitecture from '../assets/research/e-tawfeer-energy-management/nca-fig1-bodnet.png';
import occupancyConfusion from '../assets/research/e-tawfeer-energy-management/nca-fig3a-confusion.png';
import { ccBy, sourceArticle } from './figure-credits';
import type { ResearchPhase, ResearchProject } from './research';

const occupancyDoi = '10.1007/s00521-025-11348-6';
const reviewDoi = '10.1016/j.rser.2025.116481';

export const energyAiVisual: NonNullable<ResearchProject['visual']> = {
  image: energyInternet,
  alt: 'Illustrated energy network linking power plants, a factory, office buildings, houses, wind turbines, solar panels, battery storage, electric vehicles and a grid control centre. Labels list deep reinforcement learning applications in generation, transmission, distribution, storage, markets and local energy management.',
  caption: 'Figure 4 from Mahmud et al. (2026). Deep reinforcement learning applications across key components of the energy internet.',
  credit: sourceArticle(reviewDoi),
  licence: ccBy,
};

export const energyAiProgress: ResearchPhase[] = [
  {
    id: 'occupancy-sensing',
    navLabel: 'Occupancy sensing',
    title: 'Compact occupancy detection from environmental sensors',
    status: 'Neural Computing and Applications · 2025',
    paragraphs: [
      'Knowing when a room is occupied helps buildings avoid wasted energy, but cameras and wearables raise cost, usability and privacy concerns. This study used environmental measurements such as temperature, humidity, light and carbon dioxide. Each short time window was converted into a small greyscale image for a convolutional network.',
      'BOD-Net adapts MobileNetV2 inverted residual blocks and adds a global skip connection that joins early and late features. It was evaluated with fivefold cross-validation on three public datasets. Accuracy improved over the earlier image-based CNN on every dataset, with the largest gains on the student-room and living-room data.',
      'The network has about 0.26 million parameters, compared with 2.2 million for MobileNetV2, and its reported inference time was 4.5 ms, compared with 129 ms. On the imbalanced living-room data, oversampling raised sensitivity from 92.58% to 96.88%, and XGBoost remained a strong alternative.',
    ],
    measures: [
      { value: '99.05%', label: 'Accuracy on UCI-ODD' },
      { value: '262,866', label: 'Model parameters' },
      { value: '4.5 ms', label: 'Reported inference time' },
    ],
    table: {
      caption: 'Occupancy detection accuracy reported by Sayed et al. (2025).',
      columns: ['Encoded samples', 'Earlier CNN', '1D-CNN', 'BOD-Net'],
      rows: [
        { label: 'Student room (SRD)', cells: ['30,733', '95.56%', '98.02%', '98.45%'] },
        { label: 'Office room (UCI-ODD)', cells: ['20,560', '99.00%', '98.91%', '99.05%'] },
        { label: 'Living room (LRD)', cells: ['29,750', '95.73%', '96.91%', '97.32%'] },
      ],
    },
    figures: [
      {
        image: bodNetArchitecture,
        alt: 'Network diagram. A 32 by 32 greyscale input passes through a stem convolution and four levels of inverted residual blocks. A max-pooled skip connection is concatenated with their output before further convolution, adaptive pooling, a dense layer and a log-sigmoid output. Lower panels show the block structures.',
        caption: 'Figure 1 from Sayed et al. (2025). BOD-Net architecture, inverted residual settings and block structures.',
        credit: sourceArticle(occupancyDoi),
        licence: ccBy,
      },
      {
        image: occupancyConfusion,
        alt: 'Three confusion matrices. Vacant and occupied samples are correctly classified at 0.91 and 0.99 for LRD, 0.98 and 0.98 for SRD, and 0.99 and 1.00 for UCI.',
        caption: 'Figure 3a from Sayed et al. (2025), cropped from the full figure. Confusion matrices for vacant (0) and occupied (1) rooms, combined across five folds.',
        credit: sourceArticle(occupancyDoi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'edge-privacy',
    navLabel: 'Edge and privacy',
    title: 'Smart plugs and privacy-preserving analytics',
    status: 'Project development · August 2024–June 2025',
    paragraphs: [
      'Appliance and occupancy data can reveal daily routines, so sending every measurement to a central server creates a privacy risk. The project therefore explored keeping more of the analysis close to where household data is produced.',
      'I contributed to smart-plug design and development and to AI methods for residential energy management. I also implemented federated-learning concepts, in which devices train on local data and share model updates rather than raw measurements.',
    ],
    table: {
      caption: 'Engineering focus of this project stage.',
      columns: ['Purpose'],
      rows: [
        { label: 'Smart plugs', cells: ['Bring energy sensing and control to individual appliances'] },
        { label: 'Edge analytics', cells: ['Process residential data close to its source'] },
        { label: 'Federated learning', cells: ['Learn across devices without pooling raw data'] },
      ],
    },
  },
  {
    id: 'drl-review',
    navLabel: 'DRL review',
    title: 'Mapping deep reinforcement learning across the energy internet',
    status: 'Renewable and Sustainable Energy Reviews · 2026',
    paragraphs: [
      'Modern energy systems must coordinate renewable generation, storage, flexible demand and markets under constant uncertainty. Deep reinforcement learning can learn sequential decisions in these settings, but earlier surveys usually focused on one part of the system. This review connects the full chain, from centralised generation to local energy management, security and privacy.',
      'It organises methods by algorithmic foundations, learning paradigms, representation learning, exploration, multi-agent learning, advanced techniques and optimisation strategies, then links them to practical energy tasks. Reported gains include lower costs, reduced emissions and better operating efficiency, but they often depend on data quality, reward design and the chosen benchmark.',
      'The main barriers are scarce or biased data, weak generalisation across assets and seasons, computational cost, safety constraints and the gap between simulation and field deployment. Promising directions include hierarchical and hybrid methods, graph-based multi-agent learning, transfer learning, and federated approaches that keep sensitive energy data local.',
    ],
    measures: [
      { value: '500+', label: 'Peer-reviewed studies synthesised' },
      { value: '2020–2026', label: 'Publication window' },
      { value: '8', label: 'Energy application domains' },
    ],
    table: {
      caption: 'Examples from the review. Each result is reported by the cited study under its own test conditions.',
      columns: ['Decision problems', 'Example reported finding'],
      rows: [
        { label: 'Generation', cells: ['Solar and wind power tracking, turbine control, reservoir operation', 'A DQN framework increased annual hydropower production by 15% (Xu et al.)'] },
        { label: 'Distributed resources', cells: ['Hybrid scheduling, microgrid resources, virtual power plants', 'MATD3 bidding increased virtual power plant revenue by 65% (Jiang et al.)'] },
        { label: 'Transmission', cells: ['Dynamic line rating, optimal power flow, HVDC control', 'Emergency frequency control reduced generator tripping on a modified IEEE 39-bus system (Li et al.)'] },
        { label: 'Distribution', cells: ['Load management, voltage and frequency control, vehicle-to-everything, microgrids', 'Distributed load scheduling cut peak-to-average ratio by 12% and load variance by 11% (Chung et al.)'] },
        { label: 'Energy storage', cells: ['Hybrid storage, renewable integration, arbitrage, degradation', 'Grid-scale arbitrage achieved a 2.4-fold profit increase and 30% less on-peak grid use (Han et al.)'] },
        { label: 'Energy markets', cells: ['Trading, bidding, dynamic pricing, energy sharing', 'PPO-based dynamic pricing improved demand-response aggregator profit by 35% (Fraija et al.)'] },
        { label: 'Local energy management', cells: ['Building and home energy systems, storage, demand-side control', 'Online transfer learning achieved 20–40% cost savings in building energy control (Coraci et al.)'] },
        { label: 'Security and privacy', cells: ['Cyber-attack defence, resilient control, private data use', 'Adversarial learning strengthened inverter-based microgrids against cyberattacks on an IEEE 123-bus system (Wang et al.)'] },
      ],
    },
    figures: [
      {
        image: drlTaxonomy,
        alt: 'Tree diagram of deep reinforcement learning for the energy internet, branching into algorithmic foundations, learning paradigms, representation learning, exploration strategies, multi-agent learning, advanced techniques and optimisation strategies.',
        caption: 'Figure 2 from Mahmud et al. (2026). Taxonomy of deep reinforcement learning used in the review.',
        credit: sourceArticle(reviewDoi),
        licence: ccBy,
      },
    ],
  },
];
