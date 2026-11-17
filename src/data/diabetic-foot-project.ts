import fbgInsole from '../assets/research/smart-insoles-diabetic-foot/fig4-fbg-insole.jpg';
import fbgTemperature from '../assets/research/smart-insoles-diabetic-foot/fig9-temperature-maps.png';
import fbgBlockDiagram from '../assets/research/smart-insoles-diabetic-foot/fbg-fig2-block-diagram.png';
import fbgPressureMaps from '../assets/research/smart-insoles-diabetic-foot/fbg-fig8-pressure-maps.jpg';
import electronicDiagram from '../assets/research/smart-insoles-diabetic-foot/electronic-block-diagram.png';
import electronicPrototype from '../assets/research/smart-insoles-diabetic-foot/electronic-prototype.jpg';
import { ccBy, elsevier, sourceArticle } from './figure-credits';
import type { ResearchPhase, ResearchProject } from './research';

/** Full content for the diabetic-foot smart-insole project: three sensing approaches to the same goal, in publication order. */

const electronic = sourceArticle('10.3390/s22197599');
const fbg = sourceArticle('10.1016/j.sna.2022.114092');

export const diabeticFootVisual: NonNullable<ResearchProject['visual']> = {
  image: fbgInsole,
  alt: 'Three panels: a rendered 3D model of the fibre-optic insole with a spiral optical fibre, the assembled fibre-optic prototype with its cable, and the fibre-optic and electronic insoles placed side by side inside a pair of sneakers.',
  caption: 'Figure 4 from Mahmud et al. (2023). (a) 3D model of the fibre Bragg grating insole, (b) the prototype used for data acquisition, and (c) the fibre-optic and electronic insoles side by side in a pair of sneakers.',
  credit: fbg,
  licence: elsevier(2022, 'B.V.'),
};

export const diabeticFootApproach = 'Diabetic foot ulcers often follow nerve damage that stops people noticing injury. Two early warning signs are abnormal plantar pressure and a temperature difference between the two feet, and both can be watched at home if an insole can measure them continuously. Commercial systems that record pressure and temperature together are scarce and expensive. This project began as my undergraduate senior design project and built three insoles for the same purpose, each with a different sensing technology: off-the-shelf electronic sensors, fibre Bragg gratings on an optical fibre, and laser-induced graphene. The studies are described below in order of publication, with the trade-offs each one explored in cost, sensor count, precision and robustness.';

export const diabeticFootWorkflow = ['Sense plantar pressure and temperature', 'Acquire and transmit in real time', 'Map both feet and compare'];

export const diabeticFootProgress: ResearchPhase[] = [
  {
    id: 'electronic-insole',
    navLabel: 'Electronic sensors',
    title: 'Electronic insole with off-the-shelf sensors',
    status: 'Published · Sensors, 2022',
    paragraphs: [
      'The first prototype used inexpensive, off-the-shelf parts. After characterising three candidate pressure sensors (force-sensitive resistors, piezoelectric discs and a Velostat sheet), the design placed 16 force-sensitive resistors and eight thermistors on each insole. Multiplexers feed the readings to a microcontroller on each foot, and a low-power Bluetooth link sends them to a central device for storage and display.',
      'The insole produced real-time plantar pressure and temperature maps and gait-cycle plots. The components for the system cost about US$170, compared with more than US$20,000 for commercial plantar-pressure systems. The paper sets out the sensors, characterisation circuits and design considerations so that the build can be reproduced.',
    ],
    measures: [
      { value: '16 + 8', label: 'Pressure and temperature sensors per insole' },
      { value: '≈ US$170', label: 'Estimated cost, against > US$20,000 commercially' },
    ],
    figures: [
      {
        image: electronicDiagram,
        alt: 'Block diagram of two insoles. On each foot, 16 pressure sensors and eight temperature sensors feed multiplexers and buffers connected to a microcontroller with a rechargeable battery and a Bluetooth Low Energy output.',
        caption: 'System block diagram from Khandakar et al. (2022). Each insole has 16 pressure and eight temperature sensors, read through multiplexers by a battery-powered microcontroller that transmits over Bluetooth Low Energy.',
        credit: electronic,
        licence: ccBy,
      },
      {
        image: electronicPrototype,
        alt: 'Four photographs of the electronic insole: the front with round force-sensitive resistors and temperature sensors, the wired underside, and two finished insoles connected to ribbon cables.',
        caption: 'Figure 12 from Khandakar et al. (2022). (a) Force-sensitive resistors and temperature sensors on the insole, (b) its wired underside, and (c, d) the completed insoles with their ribbon-cable connections.',
        credit: electronic,
        licence: ccBy,
      },
    ],
  },
  {
    id: 'fbg-insole',
    navLabel: 'Fibre Bragg gratings',
    title: 'Fibre Bragg grating insole for pressure and temperature together',
    status: 'Published · Sensors and Actuators A: Physical, 2023',
    paragraphs: [
      'The second prototype replaced the electronic sensors with fibre Bragg gratings: reflectors written into a single optical fibre whose reflected wavelength shifts with strain and temperature. One spiral fibre routed through the insole carries both pressure and temperature sensing points, read by an optical interrogator. The gratings were characterised against applied force and reference temperature sensors, and the fitted responses were close to linear.',
      'Tested during standing and walking, the insole measured plantar pressure and temperature at the same time with reasonable precision. It displayed pressure maps, temperature maps and gait-cycle plots in real time. The study compared it with the electronic insole and with a commercial F-Scan system, which has 960 sensing cells per insole. The fibre-optic insole used far fewer sensors, is electronically safer, and cost more than eight times less to develop than the commercial system.',
    ],
    measures: [
      { value: '> 8×', label: 'Lower development cost than the commercial system' },
      { value: '2 in 1', label: 'Pressure and temperature on one optical fibre' },
    ],
    figures: [
      {
        image: fbgBlockDiagram,
        alt: 'Diagram of the right insole with a spiral optical fibre carrying pressure and temperature sensing points, connected through a protected cable to an interrogator, then to a vendor application and a LabVIEW interface that processes the data and stores it in a local database.',
        caption: 'Figure 2 from Mahmud et al. (2023). Data acquisition for the fibre Bragg grating insole, from the sensing fibre through the interrogator to processing and storage.',
        credit: fbg,
        licence: elsevier(2022, 'B.V.'),
      },
      {
        image: fbgPressureMaps,
        alt: 'Composite figure: grids of sensing points on left and right foot templates, 3D pressure maps of both feet, a row of 2D pressure maps from heel strike to toe off during one gait cycle, and synchronised force-versus-time curves for both feet with gait events annotated.',
        caption: 'Figure 8 from Mahmud et al. (2023). (a) Foot templates, (b) 3D pressure maps, (c) pressure maps across the stance phases of one gait cycle, and (d) gait-cycle plots from both feet.',
        credit: fbg,
        licence: elsevier(2022, 'B.V.'),
      },
      {
        image: fbgTemperature,
        alt: 'Two pairs of foot temperature heat maps for the left and right foot. The second pair, recorded after one hour, shows warmer regions than the first.',
        caption: 'Figure 9 from Mahmud et al. (2023). Plantar temperature maps from the insole’s five temperature-sensing gratings, at the start of recording (a) and after one hour (b).',
        credit: fbg,
        licence: elsevier(2022, 'B.V.'),
      },
    ],
  },
  {
    id: 'graphene-insole',
    navLabel: 'Laser-induced graphene',
    title: 'Laser-induced graphene for plantar temperature mapping',
    status: 'Published · IEEE Sensors Journal, 2024',
    paragraphs: [
      'The third study made temperature sensors from laser-induced graphene, a conductive carbon pattern written directly into a polymer sheet by a laser. It reported the first use of laser-induced graphene in an insole for real-time plantar temperature mapping. The result is a lightweight, low-cost sensing layer whose sensitivity, detection range, response time and recovery time were comparable with alternative temperature sensors.',
    ],
  },
];

export const diabeticFootNextSteps = 'Plantar pressure and temperature mapping continue in two directions. The SmartWoundCare project combines thermal and colour images of the foot to assess ulcer severity. The AI-powered smart-insole project uses distributed insole loading to estimate full 3D foot kinetics.';
