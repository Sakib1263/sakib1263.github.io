import overview from '../assets/research/exoventq-ventilation/fig1-overview.png';
import polycarbonateVessel from '../assets/research/exoventq-ventilation/fig6-polycarbonate-vessel.png';
import controlSystem from '../assets/research/exoventq-ventilation/fig7-control-system.png';
import butterflyValve from '../assets/research/exoventq-ventilation/fig8-butterfly-valve.png';
import cyclicPressure from '../assets/research/exoventq-ventilation/fig10-cyclic-pressure.png';
import cnepPressure from '../assets/research/exoventq-ventilation/fig11-cnep-pressure.png';
import fullSystemTests from '../assets/research/exoventq-ventilation/fig12-full-system-tests.png';
import alarmTests from '../assets/research/exoventq-ventilation/fig13-alarm-tests.png';
import { ccBy, sourceArticle } from './figure-credits';
import type { ResearchPhase, ResearchProject } from './research';

const doi = '10.1109/access.2024.3390566';
const venue = 'IEEE Access · 2024';

export const exoventqVisual: NonNullable<ResearchProject['visual']> = {
  image: overview,
  alt: 'Illustration of the system. A patient lies in a pressure vessel connected through a three-way valve to a vacuum pump. A pressure sensor feeds a control circuit linked to a touchscreen interface.',
  caption: 'Figure 1 from Gaben et al. (2024). The negative-pressure vessel, three-way valve and pump, with pressure feedback to the control circuit and user interface.',
  credit: sourceArticle(doi),
  licence: ccBy,
};

export const exoventqProgress: ResearchPhase[] = [
  {
    id: 'pressure-vessel',
    navLabel: 'Pressure vessel',
    title: 'Designing and building the pressure vessel',
    status: venue,
    paragraphs: [
      'The team first built a wooden prismatic vessel to test operation and sealing, then developed a transparent polycarbonate vessel for the final prototype. ANSYS stress analysis compared semi-cylindrical and rectangular designs and identified a squircle-faced semi-cylinder as the most suitable shape for limiting structural failure.',
      'Polycarbonate was chosen over acrylic because acrylic is more likely to crack during drilling or impact. Neoprene neck and torso seals were selected over latex for their flexibility and lower allergy risk, and the squircle shape avoids tilting the suction tube and valve.',
    ],
    measures: [
      { value: '50 mbar', label: 'Vessel vacuum design limit' },
      { value: '3 mm', label: 'Polycarbonate wall thickness' },
      { value: '75–90 kg', label: 'Adult male design range' },
    ],
    table: {
      caption: 'Vessel prototypes described in Section III-C of Gaben et al. (2024).',
      columns: ['Wooden test vessel', 'Polycarbonate vessel'],
      rows: [
        { label: 'Length', cells: ['0.90 m', '0.90 m'] },
        { label: 'Width', cells: ['0.64 m', '0.76 m'] },
        { label: 'Height', cells: ['0.415 m', '0.415 m'] },
        { label: 'Main wall', cells: ['12 mm plywood', '3 mm polycarbonate'] },
        { label: 'Support', cells: ['Battens and 25 mm girder', 'Galvanised steel frame'] },
      ],
    },
    figures: [
      {
        image: polycarbonateVessel,
        alt: 'A 3D model of the rounded, squircle-faced vessel above a photograph of the assembled transparent polycarbonate vessel with its supporting frame.',
        caption: 'Figure 6 from Gaben et al. (2024). 3D model (a) and implemented polycarbonate vessel (b).',
        credit: sourceArticle(doi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'pressure-control',
    navLabel: 'Pumping and control',
    title: 'Generating and controlling negative pressure',
    status: venue,
    paragraphs: [
      'A 200 W vacuum-cleaner motor-blower provided suction, with a maximum vacuum of 15 kPa and airflow of about 13 L/s. A 3D-printed three-way butterfly valve, moved by a servo motor, regulated the air drawn from the vessel.',
      'An Arduino Uno read a pressure sensor checked against a 2 m water manometer and adjusted the valve whenever vessel pressure moved more than 0.5 cmH₂O from its target. A DHT22 sensor monitored temperature, and a Raspberry Pi touchscreen provided the settings, readings and live pressure waveform.',
    ],
    measures: [
      { value: '±0.5 cmH₂O', label: 'Pressure correction threshold' },
      { value: '15 kPa', label: 'Maximum pump vacuum' },
      { value: '~13 L/s', label: 'Pump airflow' },
    ],
    table: {
      caption: 'Clinician-adjustable settings described in Section III of Gaben et al. (2024).',
      columns: ['Range'],
      rows: [
        { label: 'Inspiration pressure', cells: ['15–35 cmH₂O'] },
        { label: 'Expiration pressure', cells: ['0–15 cmH₂O'] },
        { label: 'Respiratory rate', cells: ['10–30 breaths per minute'] },
        { label: 'Inspiration-to-expiration ratio', cells: ['1:1 to 1:4'] },
        { label: 'Continuous negative pressure', cells: ['5–15 mbar vacuum'] },
      ],
    },
    figures: [
      {
        image: controlSystem,
        alt: 'Control system diagram. A clinician uses the interface connected to a control circuit, which drives the motor and valve actuator while a pressure sensor feeds back the vessel pressure.',
        caption: 'Figure 7 from Gaben et al. (2024). Layout of the control system.',
        credit: sourceArticle(doi),
        licence: ccBy,
      },
      {
        image: butterflyValve,
        alt: 'A 3D model of the three-way butterfly valve above two photographs of the 3D-printed valve, including one connected to the vacuum hose.',
        caption: 'Figure 8 from Gaben et al. (2024). 3D model (a) and 3D-printed three-way butterfly valve (b, c).',
        credit: sourceArticle(doi),
        licence: ccBy,
      },
    ],
  },
  {
    id: 'system-testing',
    navLabel: 'System testing',
    title: 'Testing ventilation modes and safety features',
    status: venue,
    paragraphs: [
      'The prototype was tested in cyclic negative-pressure ventilation and continuous negative extrathoracic pressure modes. Pressure curves were recorded while changing the target pressures, respiratory rate and inspiration-to-expiration ratio, and the full system was then checked through the touchscreen interface.',
      'A moderate alarm turns the interface button orange when pressure deviates by about 5 units from the setting. A severe alarm, at about 10 units, turns it red and sounds a buzzer. A relay-based safety switch stops the motor if the vessel vacuum falls below 40 mbar.',
    ],
    measures: [
      { value: '2', label: 'Ventilation modes tested' },
      { value: '19.66 cmH₂O', label: 'Measured inspiration pressure at a 20 cmH₂O setting' },
      { value: '40 mbar', label: 'Safety cut-off threshold' },
    ],
    table: {
      caption: 'Interface readings shown in Figures 12 and 13 of Gaben et al. (2024).',
      columns: ['Set pressure', 'Displayed pressure'],
      rows: [
        { label: 'Cyclic inspiration', cells: ['20 cmH₂O', '19.66 cmH₂O'] },
        { label: 'Cyclic expiration', cells: ['5 cmH₂O', '4.54 cmH₂O'] },
        { label: 'Continuous mode', cells: ['5 cmH₂O', '4.91 cmH₂O'] },
        { label: 'Moderate alarm test', cells: ['25 cmH₂O', '20.43 cmH₂O'] },
        { label: 'Severe alarm test', cells: ['30 cmH₂O', '19.75 cmH₂O'] },
      ],
    },
    figures: [
      {
        image: cyclicPressure,
        alt: 'Three pressure-time plots showing repeating inspiration and expiration waves under different pressure, respiratory rate and timing settings.',
        caption: 'Figure 10 from Gaben et al. (2024). Cyclic pressure curves for different settings.',
        credit: sourceArticle(doi),
        licence: ccBy,
      },
      {
        image: cnepPressure,
        alt: 'Two pressure-time plots in continuous mode. Pressure rises quickly and then stays close to 5 cmH₂O in one plot and 10 cmH₂O in the other.',
        caption: 'Figure 11 from Gaben et al. (2024). Continuous-mode pressure curves at two expiration pressure settings.',
        credit: sourceArticle(doi),
        licence: ccBy,
      },
      {
        image: fullSystemTests,
        alt: 'Two photographs of the touchscreen interface during testing, one showing a cyclic pressure waveform and the other a nearly constant pressure trace.',
        caption: 'Figure 12 from Gaben et al. (2024). Full-system tests in cyclic (a) and continuous (b) modes.',
        credit: sourceArticle(doi),
        licence: ccBy,
      },
      {
        image: alarmTests,
        alt: 'Two photographs of the touchscreen during alarm tests. The alarm button is orange in the moderate condition and red in the severe condition.',
        caption: 'Figure 13 from Gaben et al. (2024). Moderate (a) and severe (b) alarm tests.',
        credit: sourceArticle(doi),
        licence: ccBy,
      },
    ],
  },
];
