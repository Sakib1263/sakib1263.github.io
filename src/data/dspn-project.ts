import posterSystem from '../assets/research/diabetic-neuropathy-gait-emg/poster-fig1-system.jpg';
import posterClassification from '../assets/research/diabetic-neuropathy-gait-emg/poster-classification-system.jpg';
import hardware from '../assets/research/diabetic-neuropathy-gait-emg/hardware.jpg';
import vgrfClasses from '../assets/research/diabetic-neuropathy-gait-emg/vgrf-classes.png';
import type { ResearchPhase, ResearchProject } from './research';

/** Content for the diabetic sensorimotor polyneuropathy (DSPN) wearable project, from its UREP poster and senior design report. */

export const dspnPosterUrl = 'https://www.researchgate.net/publication/361173091_Design_and_Implementation_of_a_Wearable_Smart_Insole_for_Studying_Altered_Vertical_Ground_Reaction_Forces_VGRFs_in_Diabetic_Sensorimotor_Polyneuropathy_DSPN';
export const dspnReportUrl = 'https://www.researchgate.net/publication/371256872_Design_and_Implementation_of_a_Novel_Real-time_Wearable_System_for_Early_Detection_of_Diabetic_Foot_Ulcer_DFU';

const poster = { label: 'UREP poster (2021)', href: dspnPosterUrl };
const report = { label: 'Senior design project report (2020)', href: dspnReportUrl };

export const dspnVisual: NonNullable<ResearchProject['visual']> = {
  image: posterSystem,
  alt: 'System diagram. A shoe holds a pressure and temperature sensor array and a control circuit. The footwear subsystem passes sensor signals through a filter, switching matrix, multiplexer, analogue-to-digital converter and data buffer to a microcontroller with a power management unit, and sends data over Bluetooth Low Energy to a computer with a classification interface showing foot maps and a severity scale. On the right, two insoles each carry 16 pressure and eight temperature sensors read through multiplexers by battery-powered microcontrollers.',
  caption: 'Figure 1 of the UREP poster (Mahmud et al., 2021). The footwear subsystem and the classification subsystem with its smart display, with a detailed view of the insole sensor layout and readout.',
  credit: poster,
};

export const dspnProgress: ResearchPhase[] = [
  {
    id: 'wearable-design',
    navLabel: 'Wearable system design',
    title: 'Designing a low-cost wireless insole',
    status: 'BSc senior design project · Qatar University · 2019–2020',
    paragraphs: [
      'The system was my BSc senior design project in Electrical Engineering, with teammates Abdulrahman Al-Ansari and Ghazi Abusamaha, supervised by Dr Muhammad E. H. Chowdhury and Prof. Farid Touati. Its goal was a portable insole for continuous home monitoring of people with diabetes, recording plantar loading and temperature so that changes linked to neuropathy and ulceration could be caught early.',
      'After comparing force-sensitive resistors, piezoelectric discs and a Velostat sheet, each insole used 16 force-sensitive resistors to record vertical ground reaction force and eight flexible thermistors, both calibrated before assembly. Bluetooth Low Energy was chosen over Wi-Fi and ZigBee for its low power use. An ESP32-based TinyPICO microcontroller reads the sensors through multiplexers and buffers on a compact two-sided PCB that went through four design revisions. A lithium-polymer battery powers the board, and a 3D-printed enclosure straps it to the leg.',
      'The design targets included a wireless range of at least 15 m, about 2.5 ms latency, at least 20 Hz sampling per sensor, under 1 Wh power use, and a board no larger than 5 × 5 cm weighing under 200 g with its case. The components cost about QAR 1,600, around 65% of it for the force sensors, against more than US$20,000 for commercial systems.',
    ],
    measures: [
      { value: '16 + 8', label: 'Force and temperature sensors per insole' },
      { value: '≈ QAR 1,600', label: 'Estimated component cost' },
      { value: '≥ 20 Hz', label: 'Sampling rate per sensor (design target)' },
    ],
    figures: [
      {
        image: hardware,
        alt: 'Three panels: a green PCB layout labelled with the TinyPICO microcontroller, a multiplexer and a buffer; the assembled black PCB with the microcontroller and a red motion-sensor board; and a rendered black 3D-printed enclosure.',
        caption: 'From the senior design project report (Mahmud, Al-Ansari and Abusamaha, 2020): the PCB layout, the assembled PCB and the rendered enclosure that straps the electronics to the leg.',
        credit: report,
      },
    ],
  },
  {
    id: 'data-logging',
    navLabel: 'Logging and display',
    title: 'Real-time data logging and display',
    status: 'Senior design project · 2020',
    paragraphs: [
      'A Python data logger receives the Bluetooth stream from the central device, saves it to Excel or CSV files in a local database, and handles missing or null values with basic preprocessing. The display draws 2D and 3D pressure heat maps of both feet and shows how loading moves through the stance and swing phases of the gait cycle. The same pipeline can pass logged or external data to a trained model to classify a new subject in near real time.',
    ],
    figures: [
      {
        image: posterClassification,
        alt: 'Left: 2D and 3D foot pressure maps of both feet, and a row of pressure maps from heel strike through foot flat, midstance, heel-off and toe-off to swing. Right: a flowchart from the Bluetooth central device through a serial port and Python to an Excel spreadsheet and local database, and a machine-learning workflow from the data logger through preprocessing, training and testing to classified data.',
        caption: 'From the UREP poster (Mahmud et al., 2021): foot pressure maps across the gait cycle, the data-logger flowchart and the machine-learning workflow.',
        credit: poster,
      },
    ],
  },
  {
    id: 'classification',
    navLabel: 'Classifying gait',
    title: 'Classifying control, diabetic and ulcer gait',
    status: 'QNRF UREP23-031-2-014 · 2020–2021',
    paragraphs: [
      'The COVID-19 lockdown in 2020 stopped data collection in hospitals and clinics, so the classifiers were developed on published force-plate recordings from Akashi et al. (2008, Clinical Biomechanics). Those recordings cover vertical ground reaction force and EMG from 76 people: 21 controls, 21 with diabetes but no ulcer, and 34 with current or previous foot ulcers. The force signals were segmented into steps and normalised, and 33 statistical, spectral and wavelet features were extracted for each subject.',
      'MATLAB’s Classification Learner was trained with five-fold cross-validation, holding out 20% of subjects in each fold. Fine k-nearest neighbours and quadratic, medium Gaussian and cubic support vector machines performed best. Controls were recognised most reliably and diabetic subjects without ulcers least reliably, with a recall of 70%.',
      'The project was supported by the QNRF Undergraduate Research Experience Program (UREP23-031-2-014). It was nominated at the 13th Annual QNRF–UREP Competition in 2021, where the team presented this poster.',
    ],
    measures: [
      { value: '76', label: 'Subjects: 21 control, 21 diabetic, 34 ulcer' },
      { value: '94.8%', label: 'Average accuracy for the control class' },
      { value: '33', label: 'Features extracted from each force signal' },
    ],
    table: {
      caption: 'Per-class performance averaged across the four classifiers and five test folds, with the best single classifier for each measure, as reported on the UREP poster.',
      columns: ['Control', 'Diabetic', 'Ulcer'],
      rows: [
        { label: 'Accuracy', cells: ['94.8%', '89.6%', '87.0%'] },
        { label: 'Precision', cells: ['92.0%', '94.2%', '81.2%'] },
        { label: 'Recall', cells: ['91.6%', '70.0%', '94.4%'] },
        { label: 'F1 score', cells: ['91.6%', '76.8%', '86.0%'] },
        { label: 'Best classifier', cells: ['Fine kNN for every measure', 'Fine kNN; medium Gaussian SVM for precision', 'Fine kNN for accuracy; quadratic SVM for the rest'] },
      ],
    },
    figures: [
      {
        image: vgrfClasses,
        alt: 'Grid of normalised vertical ground reaction force curves over a step. Left column: individual curves for control subjects in green, diabetic subjects in blue and ulcer subjects in red. Right column: the mean curve and standard deviation band for each group.',
        caption: 'From the senior design project report (2020): segmented, normalised vertical ground reaction force curves per class (left) and their mean and standard deviation (right). Green shows controls, blue diabetic subjects and red ulcer subjects.',
        credit: report,
      },
    ],
  },
  {
    id: 'gait-emg',
    navLabel: 'Gait and EMG analysis',
    title: 'Gait-cycle and EMG analysis',
    status: 'QNRF NPRP12S-0227-190164 · April–June 2021',
    paragraphs: [
      'In 2021 the work continued within a Qatar National Research Fund project on wearable monitoring of diabetic sensorimotor polyneuropathy. I used machine learning to analyse gait-cycle measurements together with electromyography, the electrical activity of the leg muscles during walking, to study wearable markers of distal symmetric polyneuropathy.',
    ],
  },
];

export const dspnApproach = 'Diabetic sensorimotor polyneuropathy damages the nerves of the feet, so people lose sensation, load their feet abnormally and may not notice wounds that can become ulcers. These changes show up in the vertical ground reaction force, the force the foot presses into the ground during each step. The project built a low-cost wireless insole to record that force and plantar temperature at home, a real-time logger and display, and machine-learning models that separate healthy, diabetic and ulcer groups from their gait.';

export const dspnWorkflow = ['Record plantar force and temperature', 'Log and display in real time', 'Classify gait with machine learning'];
