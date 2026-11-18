import systemOverview from '../assets/research/ecmo-cannulation-simulator/ejccm-fig1-system.png';
import blockDiagram from '../assets/research/ecmo-cannulation-simulator/scored-fig1-block-diagram.png';
import padMold from '../assets/research/ecmo-cannulation-simulator/scored-fig3-pad-mold.png';
import connector from '../assets/research/ecmo-cannulation-simulator/scored-fig5-connector.png';
import mannequin from '../assets/research/ecmo-cannulation-simulator/scored-fig8-mannequin.jpg';
import improvedPrototype from '../assets/research/ecmo-cannulation-simulator/qmj-fig1-prototype.png';
import { ccBy, ccByNcNd, ieee, sourceArticle } from './figure-credits';
import type { ResearchPhase, ResearchProject } from './research';

const designDoi = '10.1016/j.ejccm.2018.12.017';
const prototypeDoi = '10.1109/scored.2019.8896240';
const improvedDoi = '10.5339/qmj.2019.qccc.61';

export const ecmoVisual: NonNullable<ResearchProject['visual']> = {
  image: systemOverview,
  alt: 'Block diagram of the ECMO training system and cannulation trainer. The trainer contains cannulation pads, arterial and venous circuits, a heart model, pulsatile and laminar flow pumps, tanks of blood-like liquid and a microprocessor.',
  caption: 'Figure 1 from Khurshid et al. (2018). The ECMO training eco-system (a) and proposed cannulation trainer (b).',
  credit: sourceArticle(designDoi),
  licence: ccByNcNd,
};

export const ecmoProgress: ResearchPhase[] = [
  {
    id: 'system-design',
    navLabel: 'System design',
    title: 'Designing the trainer around clinical needs',
    status: 'The Egyptian Journal of Critical Care Medicine · 2018',
    paragraphs: [
      'ECMO teams must monitor many variables and respond quickly to emergencies, so hands-on training is essential. With ECMO clinicians at Hamad Medical Corporation, the team defined a lower-cost cannulation trainer to work alongside a separate ECMO machine simulator.',
      'The design used a closed circulation system with arterial and venous networks, thermochromic blood-like fluid and silicone cannulation pads. It was planned to support guidewire insertion, vessel dilation, cannula placement and ultrasound-guided positioning, with sensors for procedural emergencies.',
    ],
    measures: [
      { value: '2', label: 'Connected simulator subsystems' },
      { value: '3', label: 'ECMO configurations planned' },
      { value: '3', label: 'Cannulation approaches planned' },
    ],
    table: {
      caption: 'Training capabilities planned by Khurshid et al. (2018).',
      columns: ['Design target'],
      rows: [
        { label: 'ECMO configurations', cells: ['VA, VV and VV-A'] },
        { label: 'Cannulation approaches', cells: ['Femoro-femoral, femoro-jugular and dual-lumen jugular'] },
        { label: 'Circulation', cells: ['Pulsatile arterial flow and laminar venous flow'] },
        { label: 'Emergency scenarios', cells: ['Flow pressure changes and cannula migration alarms'] },
      ],
    },
  },
  {
    id: 'first-prototype',
    navLabel: 'First prototype',
    title: 'Building the first cannulation prototype',
    status: 'IEEE SCOReD · 2019',
    paragraphs: [
      'The prototype connected venous and arterial loops inside a mannequin. It included incorrect paths, such as a simulated renal vein, and ultrasound-compatible access pads based on femoral anatomy, with the artery above the larger vein and a superficial artery as a possible wrong route.',
      'Pads were cast in designed moulds from silicone rubber, and a 3D-printed Y-connector allowed two large cannulas to meet in the venous path. A force-sensing resistor detected guidewire entry into the renal vein and triggered an LED. The team then integrated the subsystems into the mannequin and tested cannula insertion through the femoral arterial pad.',
    ],
    measures: [
      { value: '2', label: 'Interconnected circulation loops' },
      { value: '2 hours', label: 'Pad solidification time' },
      { value: '60°', label: 'Sensor screw angle in the Y-connector' },
    ],
    table: {
      caption: 'Prototype features described by Mahmoud et al. (2019), IEEE SCOReD.',
      columns: ['Implementation'],
      rows: [
        { label: 'Arterial and venous flow', cells: ['Pulsatile arterial loop and laminar venous loop'] },
        { label: 'Access training', cells: ['Ultrasound-compatible, anatomically arranged silicone pads'] },
        { label: 'Wrong-path training', cells: ['Simulated renal vein and superficial artery'] },
        { label: 'Bleeding event', cells: ['Flow drop in the closed loop alerts the instructor'] },
        { label: 'Guidewire error', cells: ['Force-sensing resistor detects renal vein entry'] },
      ],
    },
    figures: [
      {
        image: blockDiagram,
        alt: 'Diagram of a human torso with red arterial and blue venous circuits, femoral access pads, renal and hepatic veins, sensors, pumps, tanks and a microcontroller.',
        caption: 'Figure 1 from Mahmoud et al. (2019), IEEE SCOReD. Block diagram of the proposed cannulation simulator.',
        credit: sourceArticle(prototypeDoi),
        licence: ieee(2019),
      },
      {
        image: padMold,
        alt: 'Three views of the cannulation pad mould with red and blue channels representing the artery and vein.',
        caption: 'Figure 3 from Mahmoud et al. (2019), IEEE SCOReD. Cannulation pad mould design from different angles.',
        credit: sourceArticle(prototypeDoi),
        licence: ieee(2019),
      },
      {
        image: connector,
        alt: 'A 3D model of the Y-connector beside the 3D-printed connector.',
        caption: 'Figure 5 from Mahmoud et al. (2019), IEEE SCOReD. Y-connector 3D model (left) and 3D-printed part (right).',
        credit: sourceArticle(prototypeDoi),
        licence: ieee(2019),
      },
      {
        image: mannequin,
        alt: 'Two photographs of the training mannequin, showing the implemented system and a cannula inserted through the left femoral pad.',
        caption: 'Figure 8 from Mahmoud et al. (2019), IEEE SCOReD. Mannequin with the implemented system (a) and cannula inserted in the left femoral pad (b).',
        credit: sourceArticle(prototypeDoi),
        licence: ieee(2019),
      },
    ],
  },
  {
    id: 'improved-prototype',
    navLabel: 'Improved prototype',
    title: 'Improving anatomy, circulation and error detection',
    status: 'Qatar Medical Journal · 2019',
    paragraphs: [
      'The improved simulator added a closed loop linking jugular and femoral access points, with a pump and tank to regulate flow. A pump created pulsatile arterial flow, while venous flow remained laminar. The inferior vena cava junction allowed two cannulas to pass and included an alternative path representing the renal vein.',
      'Testing focused on recalibrating the force sensor in liquid and adjusting pulsatile flow for realistic pressure. With jugular and femoral access, the simulator could support training for veno-arterial and veno-venous ECMO.',
    ],
    measures: [
      { value: '2', label: 'Access regions: jugular and femoral' },
      { value: 'VA and VV', label: 'ECMO training modes supported' },
      { value: '3', label: 'Main prototype limitations identified' },
    ],
    table: {
      caption: 'Testing focus and limitations reported by Mahmoud et al. (2019), Qatar Medical Journal.',
      columns: ['Outcome'],
      rows: [
        { label: 'Force sensor', cells: ['Recalibrated in the presence of liquid'] },
        { label: 'Pulsatile flow', cells: ['Optimised for pressure realism'] },
        { label: 'Current limitations', cells: ['Tube flexibility, sensor measurement limits and rigid 3D-printing material'] },
      ],
    },
    figures: [
      {
        image: improvedPrototype,
        alt: 'Composite figure showing the pad mould, printed mould with silicone, finished access pad, inferior vena cava connector parts, Y-connector, embedded system diagram and improved mannequin simulator.',
        caption: 'Figure 1 from Mahmoud et al. (2019), Qatar Medical Journal. Fabricated parts, embedded system and improved prototype.',
        credit: sourceArticle(improvedDoi),
        licence: ccBy,
      },
    ],
  },
];
