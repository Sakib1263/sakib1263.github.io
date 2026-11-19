import projectOverview from '../assets/research/smart-insoles-diabetic-foot/project-overview.jpg';
import fbgInsole from '../assets/research/smart-insoles-diabetic-foot/fig4-fbg-insole.jpg';
import fbgTemperature from '../assets/research/smart-insoles-diabetic-foot/fig9-temperature-maps.png';
import fbgPressureMaps from '../assets/research/smart-insoles-diabetic-foot/fbg-fig8-pressure-maps.jpg';
import electronicDiagram from '../assets/research/smart-insoles-diabetic-foot/electronic-block-diagram.png';
import electronicPrototype from '../assets/research/smart-insoles-diabetic-foot/electronic-prototype.jpg';
import ligComponents from '../assets/research/smart-insoles-diabetic-foot/lig-fig2-components.png';
import ligCharacterisation from '../assets/research/smart-insoles-diabetic-foot/lig-fig9-characterisation.png';
import ligMaps from '../assets/research/smart-insoles-diabetic-foot/lig-fig14-temperature-maps.jpg';
import { ccBy, elsevier, ieee, sourceArticle } from './figure-credits';
import type { ResearchPhase, ResearchProject } from './research';

/** Full content for the diabetic-foot smart-insole project: its origin, three sensing approaches in publication order, and a comparison. */

const electronic = sourceArticle('10.3390/s22197599');
const fbg = sourceArticle('10.1016/j.sna.2022.114092');
const graphene = sourceArticle('10.1109/jsen.2023.3317768');
const fbgLicence = elsevier(2022, 'B.V.');

export const diabeticFootVisual: NonNullable<ResearchProject['visual']> = {
  image: projectOverview,
  alt: 'Three photographs, one per sensing approach. Electronic sensors: an insole with round force-sensitive resistors connected to a ribbon cable. Fibre Bragg gratings: an insole with an optical fibre taped along its surface and a blue fibre cable. Laser-induced graphene: two insoles with graphene sensors linked by ribbon cables to controller circuit boards.',
  caption: 'The three insoles. Panels adapted from Figure 12c of Khandakar et al. (2022, CC BY 4.0), Figure 4b of Mahmud et al. (2023, © 2022 Elsevier B.V.) and Figure 13 of Khandakar et al. (2024, © 2023 IEEE), cropped and placed side by side.',
  credit: { label: 'Composite of three study figures' },
  licence: { label: 'CC BY 4.0, Elsevier and IEEE author reuse' },
};

export const diabeticFootApproach = 'Diabetic foot ulcers often follow nerve damage that stops people noticing injury. Two early warning signs are abnormal plantar pressure and a temperature difference between the two feet, and both can be watched at home if an insole measures them continuously. Commercial systems that record pressure and temperature together are scarce and expensive. The project built three insoles for this purpose, each with a different sensing technology: off-the-shelf electronic sensors, fibre Bragg gratings on an optical fibre, and laser-induced graphene. The sections below start with the senior design project the work grew from, describe each insole in order of publication, and then compare the three.';

export const diabeticFootWorkflow = ['Sense plantar pressure and temperature', 'Acquire and transmit in real time', 'Map both feet and compare'];

export const diabeticFootProgress: ResearchPhase[] = [
  {
    id: 'senior-design',
    navLabel: 'Senior design project',
    title: 'Origin: BSc senior design project',
    status: 'BSc Electrical Engineering · Qatar University · 2020',
    paragraphs: [
      'The project began as my BSc senior design project in Electrical Engineering at Qatar University, “Design and Implementation of a Novel Real-time Wearable System for Early Detection of Diabetic Foot Ulcer”, supervised by Dr Muhammad E. H. Chowdhury. The aim was an insole that people with diabetes could wear at home to record plantar pressure and temperature continuously and flag early signs of ulceration.',
      'The work continued through the QNRF Undergraduate Research Experience Program (UREP23-031-2-014, January–May 2020), which supported development of the electronic and photonic insole prototypes.',
      'The prototypes matured into three Q1 journal papers, supported by QNRF NPRP12S-0227-190164 together with grants from Universiti Kebangsaan Malaysia. The electronic and fibre-optic insole papers are direct outcomes of the senior design project.',
    ],
    measures: [
      { value: '3', label: 'Q1 journal papers' },
      { value: '2', label: 'Papers from the senior design project' },
    ],
  },
  {
    id: 'electronic-insole',
    navLabel: 'Electronic sensors',
    title: 'Electronic insole with off-the-shelf sensors',
    status: 'Published · Sensors, 2022',
    paragraphs: [
      'The first prototype used inexpensive, off-the-shelf parts. After characterising three candidate pressure sensors (force-sensitive resistors, piezoelectric discs and a Velostat sheet), the design placed 16 force-sensitive resistors and eight thermistors on each insole. Multiplexers feed the readings to a microcontroller on each foot, and a low-power Bluetooth link sends them to a central device for storage and display.',
      'The insole produced real-time plantar pressure and temperature maps and gait-cycle plots. The components cost about US$170, compared with more than US$20,000 for commercial plantar-pressure systems. The paper sets out the sensors, characterisation circuits and design considerations so that the build can be reproduced.',
      'My role, as second author: I integrated the sensors into the insole and contributed to the methodology, data acquisition, experiments, analysis and manuscript review.',
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
      'My role, as first author: I led system development and experimental evaluation, including data acquisition and analysis, validation against the electronic and commercial systems, and manuscript preparation.',
    ],
    measures: [
      { value: '> 8×', label: 'Lower development cost than the commercial system' },
      { value: '2 in 1', label: 'Pressure and temperature on one optical fibre' },
    ],
    figures: [
      {
        image: fbgInsole,
        alt: 'Three panels: a rendered 3D model of the fibre-optic insole with a spiral optical fibre, the assembled fibre-optic prototype with its cable, and the fibre-optic and electronic insoles placed side by side inside a pair of sneakers.',
        caption: 'Figure 4 from Mahmud et al. (2023). (a) 3D model of the fibre Bragg grating insole, (b) the prototype used for data acquisition, and (c) the fibre-optic and electronic insoles side by side in a pair of sneakers.',
        credit: fbg,
        licence: fbgLicence,
      },
      {
        image: fbgPressureMaps,
        alt: 'Composite figure: grids of sensing points on left and right foot templates, 3D pressure maps of both feet, a row of 2D pressure maps from heel strike to toe off during one gait cycle, and synchronised force-versus-time curves for both feet with gait events annotated.',
        caption: 'Figure 8 from Mahmud et al. (2023). (a) Foot templates, (b) 3D pressure maps, (c) pressure maps across the stance phases of one gait cycle, and (d) gait-cycle plots from both feet.',
        credit: fbg,
        licence: fbgLicence,
      },
      {
        image: fbgTemperature,
        alt: 'Two pairs of foot temperature heat maps for the left and right foot. The second pair, recorded after one hour, shows warmer regions than the first.',
        caption: 'Figure 9 from Mahmud et al. (2023). Plantar temperature maps from the insole’s five temperature-sensing gratings, at the start of recording (a) and after one hour (b).',
        credit: fbg,
        licence: fbgLicence,
      },
    ],
  },
  {
    id: 'graphene-insole',
    navLabel: 'Laser-induced graphene',
    title: 'Laser-induced graphene for plantar temperature mapping',
    status: 'Published · IEEE Sensors Journal, 2024',
    paragraphs: [
      'The third study made the temperature sensors from laser-induced graphene. A 30 W CO₂ laser scribes the sensor pattern into a polyimide (Kapton) sheet and converts it into porous graphene, confirmed by Raman spectroscopy, and copper electroplating adds the contacts. Ten sensors per insole, 20 in total, connect through a 16-channel multiplexer to a TinyPico microcontroller, which sends readings over Bluetooth to an application that draws plantar temperature maps.',
      'Every sensor was calibrated at 20 and 60 °C. Resistance fell linearly with temperature across that range, with a temperature coefficient of −0.0575% per °C (R² = 0.99) and a precision of about 0.1 °C. The response to 20 kPa of pressure and to bending and stretching was negligible, and a change in humidity from 30% to 80% would add at most ±0.8 °C of error. Maps recorded from two healthy volunteers showed the symmetric butterfly pattern expected in healthy feet.',
      'The authors report this as the first insole to use laser-induced graphene for plantar temperature maps. Some wire connections failed under the stress of running, and long-term stability is being tested through daily wear.',
      'My role: I contributed to the experimental and technical assessment of the system, interpretation of the findings and manuscript review.',
    ],
    measures: [
      { value: '−0.0575%/°C', label: 'Linear temperature response (R² = 0.99)' },
      { value: '≈ 0.1 °C', label: 'Temperature measurement precision' },
      { value: '20', label: 'Graphene sensors across both insoles' },
    ],
    figures: [
      {
        image: ligComponents,
        alt: 'System diagram. A shoe sole holds an insole with graphene temperature sensors, connected to a controller board with a battery, multiplexer, voltage divider and TinyPico microcontroller, which sends data over Bluetooth to a computer application showing temperature maps of both feet.',
        caption: 'Figure 2 from Khandakar et al. (2024). Main components of the graphene-sensor insole, from the sensors and controller board to the Bluetooth link and mapping application.',
        credit: graphene,
        licence: ieee(2023),
      },
      {
        image: ligCharacterisation,
        alt: 'Two plots of relative change in sensor resistance. Left: resistance falls in a straight line as temperature rises from 20 to 60 °C, with R² of 0.99. Right: during repeated 20 kPa pressure cycles over about 250 seconds the resistance stays essentially flat.',
        caption: 'Figure 9 from Khandakar et al. (2024). (a) Temperature characterisation and (b) pressure characterisation of the graphene sensors.',
        credit: graphene,
        licence: ieee(2023),
      },
      {
        image: ligMaps,
        alt: 'Four screenshots of the mapping application, each showing temperature maps of a left and right foot for two healthy volunteers in two colour schemes. Each pair forms a symmetric pattern.',
        caption: 'Figure 14 from Khandakar et al. (2024). Plantar temperature maps for two healthy volunteers, each shown in the HSV (a, c) and jet (b, d) colour templates.',
        credit: graphene,
        licence: ieee(2023),
      },
    ],
  },
  {
    id: 'comparison',
    navLabel: 'Comparing the three',
    title: 'Comparing the three sensing approaches',
    status: 'Summary across the three papers',
    paragraphs: [
      'Each insole traded cost, sensor count, precision and robustness differently. The electronic design was the cheapest and easiest to build. The fibre-optic design measured both quantities on a single, electrically safe fibre. The graphene design gave the thinnest and most precise temperature sensing. All three have far fewer sensing points than a commercial pressure insole.',
    ],
    table: {
      caption: 'Summary of the three insoles as reported in each paper.',
      columns: ['Electronic sensors (2022)', 'Fibre Bragg gratings (2023)', 'Laser-induced graphene (2024)'],
      rows: [
        { label: 'Measures', cells: ['Pressure and temperature', 'Pressure and temperature', 'Temperature, with negligible response to pressure, humidity and bending'] },
        { label: 'Sensing elements', cells: ['16 force-sensitive resistors and 8 thermistors per insole', 'Pressure and temperature gratings along one optical fibre, 5 of them for temperature', '10 laser-scribed graphene sensors per insole'] },
        { label: 'Readout', cells: ['Multiplexers, microcontroller and Bluetooth Low Energy', 'Optical interrogator over a wired connection', '16-channel multiplexer, TinyPico microcontroller and Bluetooth'] },
        { label: 'Strengths', cells: ['Off-the-shelf parts for about US$170', 'Both quantities on one electrically safe fibre; development cost more than eight times lower than a commercial system', 'Thin, light and low-cost, with a linear response and about 0.1 °C precision'] },
        { label: 'Limitations', cells: ['Far fewer sensing points than the 960 of a commercial insole', 'Wired interrogator and far fewer sensing points than a commercial insole', 'Wire connections failed during running; long-term stability still under test'] },
      ],
    },
  },
];

export const diabeticFootNextSteps = 'Detecting ulcer onset will need longitudinal studies with people with diabetes.';
