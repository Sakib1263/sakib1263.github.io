import { sitePath } from '../lib/site';
import { publicationFor, publicationId } from './papers';
import { projects } from './research';

export const cvUpdated = '2026-11-16';
export const cvUpdatedLabel = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(cvUpdated));

const selectedProjectSlugs = ['wearable-foot-kinetics', 'kidney-stone-segmentation', 'cross-device-raman', 'prenatal-hydronephrosis'];
export const cvResearch = selectedProjectSlugs.map(slug => {
  const project = projects.find(item => item.slug === slug);
  if (!project) throw new Error(`Unknown CV project: ${slug}`);
  return { ...project, publication: publicationFor(project.doi) };
});

type CvLink = { label: string; href: string };

const chowdhury: CvLink = {
  label: 'Muhammad E. H. Chowdhury',
  href: 'https://scholar.google.com/citations?user=BrBVR_UAAAAJ&hl=en',
};

function paperLink(label: string, doi: string): CvLink {
  return { label, href: sitePath(`publications/#${publicationId(doi)}`) };
}

type Appointment = {
  id: string;
  role: string;
  organization: string;
  dates: string;
  engagement?: string;
  summary: string;
  highlights?: string[];
  links?: CvLink[];
};

export const positions: Appointment[] = [
  {
    id: 'qatar-university-research-associate',
    role: 'Research Associate',
    organization: 'Qatar University',
    dates: 'July 2023–present',
    engagement: 'Full-time',
    summary: 'Coordinate bioengineering research across medical imaging, wearable sensing, physiological signals, and biomechanics.',
    highlights: [
      'Design studies and develop models from data collection through evaluation. Current work includes estimating three-dimensional foot forces and moments from smart-insole and motion data.',
      'Developed an imaging workflow for diabetic-foot ulcer severity research that aligns thermal and visible images, segments the foot, and compares ways of combining both image types.',
      'Contributed to smart-plug research and privacy-preserving energy analytics using federated learning. Led a review of deep reinforcement learning for energy systems.',
      'Prepare analysis-ready imaging, waveform, and wearable datasets through preprocessing, annotation, and quality checks.',
      'Develop research proposals and work plans. Prepare study protocols, ethics submissions, data-management documents, and technical materials for invention disclosures.',
      'Write manuscripts, figures, progress reports, and reviewer responses with clinical, engineering, and external collaborators.',
    ],
    links: [
      { label: 'Wearable kinetics project', href: sitePath('research/wearable-foot-kinetics/') },
      { label: 'Cross-device Raman project', href: sitePath('research/cross-device-raman/') },
      paperLink('Reinforcement learning review', '10.1016/j.rser.2025.116481'),
    ],
  },
  {
    id: 'iberdrola-data-scientist',
    role: 'Data Scientist',
    organization: 'Iberdrola Innovation Middle East',
    dates: 'July 2023–July 2024',
    engagement: 'Contract',
    summary: 'Developed methods for estimating appliance electricity use and building occupancy from multichannel smart-meter data in a Qatar University–Iberdrola collaboration.',
    highlights: [
      'Curated meter data and built a two-stage model that estimated appliance loads and inferred occupancy from device events.',
      'Developed an occupancy model combining learned event, statistical, and time-of-day features with ensemble classification.',
      'Led method development, evaluation, visualisation, and manuscript drafting for two first-author papers from the project.',
    ],
    links: [
      paperLink('Joint load and occupancy study', '10.1016/j.jobe.2025.113731'),
      paperLink('Occupancy feature-fusion study', '10.1016/j.buildenv.2025.112635'),
    ],
  },
  {
    id: 'qcri-bioinformatics-intern',
    role: 'Summer Research Intern',
    organization: 'Qatar Computing Research Institute, HBKU',
    dates: 'May–July 2023',
    engagement: 'Bioinformatics',
    summary: 'Investigated abnormal gene expression in RNA sequencing data from Mendelian disease studies.',
    highlights: [
      'Preprocessed RNA-seq data and evaluated variational autoencoders for identifying unusual expression patterns and prioritising genes.',
      'Interpreted candidate anomalies and documented the analysis so the workflow could be repeated.',
    ],
  },
  {
    id: 'hamad-medical-corporation-research-assistant',
    role: 'Research Assistant',
    organization: 'Hamad Medical Corporation',
    dates: 'January 2022–August 2023',
    engagement: 'Part-time',
    summary: 'Co-developed a prenatal kidney ultrasound benchmark with Hamad Medical Corporation, Sidra Medicine, and Qatar University.',
    highlights: [
      'Organised cases, checked image quality, and prepared clinically guided labels and regions of interest for the HMC–QU–AHN dataset.',
      'Used YOLO to locate regions of interest and convolutional models to segment kidney and fluid boundaries. Developed a workflow to grade prenatal hydronephrosis from multiple ultrasound views.',
      'Contributed to ethics submissions, protocols, and data-governance documents. Prepared figures and manuscript material for the clinical collaboration.',
    ],
    links: [{ label: 'Prenatal hydronephrosis project', href: sitePath('research/prenatal-hydronephrosis/') }],
  },
  {
    id: 'omdena-machine-learning',
    role: 'Machine Learning Engineer',
    organization: 'Omdena',
    dates: 'July 2021–February 2022',
    engagement: 'Contract · Remote',
    summary: 'Led technical tasks across two international projects in smart-meter analytics and geospatial modelling.',
    highlights: [
      'Lead Machine Learning Engineer, November 2021–February 2022. Led a smart-meter analysis task for Energy Tech Hub and C4NET, using exploratory analysis, clustering, and time-series modelling to characterise electric-vehicle charging and household demand.',
      'Junior Machine Learning Engineer and Task Leader, July–October 2021. Used geospatial tools and built a TensorFlow pipeline for multiclass satellite-image segmentation in a project on climate and geopolitical risks in West and Central Africa.',
    ],
    links: [
      { label: 'Electric-vehicle charging project', href: 'https://www.omdena.com/projects/ai-ev-charging' },
      { label: 'Climate and geopolitical risk project', href: 'https://www.omdena.com/projects/geopolitical-risks' },
    ],
  },
  {
    id: 'qatar-university-research-assistant-full-time',
    role: 'Research Assistant',
    organization: 'Qatar University',
    dates: 'June 2020–June 2023',
    engagement: 'Full-time',
    summary: 'Developed and evaluated machine learning and signal-processing methods for biomedical images, waveforms, and wearable measurements.',
    highlights: [
      'Extracted cerebral blood-flow waveforms from transcranial Doppler audio, restored low-quality signals with one-dimensional CycleGAN models, and developed classifiers for healthy and intensive-care recordings.',
      'Designed hip implant, femur, and pelvis models in Fusion 360 and simulated gait loading in ANSYS. Contributed to X-ray models for detecting implant loosening and helped set up bench tests with Hamad Medical Corporation.',
      'Developed wearable optical pulse and ECG acquisition hardware and deep-learning methods for estimating physiological parameters. Also worked on EEG and ECG waveform reconstruction.',
      'Developed fibre Bragg grating insoles for simultaneous plantar pressure and temperature measurement. Contributed to diabetic sensorimotor polyneuropathy research using gait and electromyography data.',
      'Supported project proposals, ethics documentation, experimental planning, manuscript preparation, and reproducible analysis with clinical and engineering teams.',
    ],
    links: [
      paperLink('HipXNet study', '10.1109/access.2022.3173424'),
      paperLink('Blood-pressure study', '10.3390/s22030919'),
      paperLink('Doppler waveform study', '10.1016/j.bspc.2023.104882'),
    ],
  },
  {
    id: 'qatar-university-undergraduate-research-assistant',
    role: 'Undergraduate Research Assistant',
    organization: 'Qatar University',
    dates: 'August 2018–May 2020',
    engagement: 'Part-time',
    summary: 'Built prototypes for diabetic-foot monitoring and clinical simulation while completing undergraduate studies.',
    highlights: [
      'Integrated electronic pressure and temperature sensors into a wearable insole. Prepared sensor recordings and evaluated classical machine learning methods in MATLAB for diabetes severity classification.',
      'Contributed to an extracorporeal membrane oxygenation (ECMO) cannulation simulator for clinical training. Attended hands-on ECMO training at Hamad General Hospital and Al-Wakra Hospital.',
    ],
    links: [paperLink('ECMO simulator paper', '10.1109/scored.2019.8896240')],
  },
  {
    id: 'qatar-university-academic-advising',
    role: 'Administrative Assistant',
    organization: 'Academic Advising Office, Qatar University',
    dates: 'May 2018–March 2019',
    engagement: 'Part-time',
    summary: 'Analysed advising data, prepared visual summaries, and automated recurring spreadsheet work with Excel and VBA for academic advisers.',
  },
];

export const internships: Appointment[] = [
  {
    id: 'sparks-foundation-intern',
    role: 'IoT and Computer Vision Intern',
    organization: 'The Sparks Foundation',
    dates: 'December 2021–January 2022',
    summary: 'Completed mentored projects in Internet of Things applications and computer vision.',
  },
  {
    id: 'zaka-microsoft-apprentice',
    role: 'Artificial Intelligence Intern',
    organization: 'Zaka and Microsoft',
    dates: 'March–June 2021',
    summary: 'Built TensorFlow workflows for image classification, sentiment analysis, and speech recognition. Completed Microsoft Azure fundamentals certifications in cloud, data, and AI.',
  },
  {
    id: 'data-glacier-intern',
    role: 'Data Science Intern',
    organization: 'Data Glacier',
    dates: 'February–May 2021',
    summary: 'Completed two Python data analysis and modelling projects. Practised file ingestion and schema validation, and deployed models through Flask and cloud APIs.',
  },
  {
    id: 'engineering-consultants-group-intern',
    role: 'Electrical Structural Engineering Intern',
    organization: 'Engineering Consultants Group, Qatar',
    dates: 'April–June 2019',
    summary: 'Trained on building electrical systems, extra-low-voltage systems, and construction documentation. Used DIALux for lighting design and AutoCAD for electrical distribution, and prepared an HVAC single-line diagram as the final project.',
  },
];

type Degree = {
  id: string;
  role: string;
  organization: string;
  dates: string;
  gpa: string;
  summary: string;
  projectLabel: string;
  projectTitle: string;
  projectUrl?: string;
  supervisor: CvLink;
  coursework: { title: string; courses: string[] }[];
  honours?: string[];
  links: CvLink[];
};

export const education: Degree[] = [
  {
    id: 'msc-electrical-engineering',
    role: 'MSc in Electrical Engineering',
    organization: 'Qatar University',
    dates: '2021–2023',
    gpa: '3.31 / 4.00',
    summary: 'Studied deep learning for renal tumour classification, kidney-stone segmentation, and prenatal hydronephrosis grading using CT and ultrasound.',
    projectLabel: 'Master’s thesis',
    projectTitle: 'Deep Learning Techniques for Kidney Disease Detection',
    projectUrl: 'https://qspace.qu.edu.qa/handle/10576/45080',
    supervisor: chowdhury,
    coursework: [
      { title: 'Research and quantitative methods', courses: ['Applied Research Methodology', 'Applied Numerical Analysis', 'Applied Statistical Analysis'] },
      { title: 'Signals, communications, and control', courses: ['Digital Signal Processing', 'Digital Communications', 'Wireless Communications', 'Communication and Information Theory', 'Power System Dynamics and Control'] },
    ],
    links: [
      paperLink('Renal tumour classification', '10.3390/cancers15123189'),
      paperLink('Kidney stone segmentation', '10.1016/j.bspc.2026.109894'),
      paperLink('Prenatal hydronephrosis grading', '10.1016/j.eswa.2024.124594'),
    ],
  },
  {
    id: 'bsc-electrical-engineering',
    role: 'BSc in Electrical Engineering, Honours',
    organization: 'Qatar University',
    dates: '2016–2020',
    gpa: '3.51 / 4.00',
    summary: 'Developed a wearable prototype for diabetic-foot monitoring. Related studies evaluated electronic and fibre-optic smart insoles that measure plantar pressure and temperature.',
    projectLabel: 'Senior design project',
    projectTitle: 'Design and Implementation of a Novel Real-time Wearable System for Early Detection of Diabetic Foot Ulcer',
    supervisor: chowdhury,
    coursework: [
      { title: 'Mathematics and engineering foundations', courses: ['Advanced Calculus', 'Linear Algebra', 'Probability and Statistics', 'Numerical Methods', 'Engineering Economics'] },
      { title: 'Circuits, electronics, and power', courses: ['Electric Circuits', 'Fundamentals of Electronics', 'Power Systems Analysis', 'Power Electronics', 'Electric Machines', 'Electromagnetics'] },
      { title: 'Signals, communications, and control', courses: ['Signals and Systems', 'Communication Engineering', 'Control Systems', 'Signal Processing and Filtering'] },
      { title: 'Embedded systems and biomedical engineering', courses: ['Digital Systems Design', 'Embedded Systems', 'Sensors and Instrumentation', 'Artificial Neural Networks', 'Biomedical Engineering'] },
    ],
    honours: ['Graduated with distinction', 'Qatar University Honors Program', 'Distinguished Student Award'],
    links: [
      paperLink('Electronic insole study', '10.3390/s22197599'),
      paperLink('Fibre-optic insole study', '10.1016/j.sna.2022.114092'),
    ],
  },
];

export const certifications: { title: string; provider: string; href?: string; details?: string }[] = [
  {
    title: 'Biomedical (Biomed) Comprehensive',
    provider: 'CITI Program',
    href: 'https://www.citiprogram.org/verify/?w441ecacb-e659-447f-9fb8-27a4f3da45c8-76515150',
  },
  {
    title: 'Google Advanced Data Analytics Professional Certificate',
    provider: 'Coursera',
    href: 'https://coursera.org/verify/professional-cert/SPL2KOZ2XWU0',
  },
  {
    title: 'Google Data Analytics Professional Certificate',
    provider: 'Coursera',
    href: 'https://coursera.org/verify/professional-cert/ZFM267WNWX6N',
  },
  {
    title: 'IBM AI Engineering Professional Certificate',
    provider: 'Coursera',
    href: 'https://coursera.org/verify/professional-cert/6NMAXZD7R27R',
  },
  {
    title: 'Google AI Essentials',
    provider: 'Coursera',
    href: 'https://coursera.org/verify/OTF4ZX9GWBHC',
  },
  {
    title: 'Excel Skills for Business Specialization',
    provider: 'Coursera',
    href: 'https://coursera.org/verify/specialization/5X9U6H8PY8R8',
  },
  {
    title: 'The Complete SQL Bootcamp: Go from Zero to Hero',
    provider: 'Udemy',
    href: 'https://www.udemy.com/certificate/UC-06cd2690-e220-4322-aaad-b76c35484e84/',
  },
  {
    title: 'Microsoft Azure fundamentals certifications',
    provider: 'Microsoft',
    details: 'Azure Fundamentals (AZ-900), Azure Data Fundamentals (DP-900), and Azure AI Fundamentals (AI-900)',
  },
  {
    title: 'Circular Economy – Sustainable Materials Management',
    provider: 'Coursera',
    href: 'https://www.coursera.org/account/accomplishments/certificate/VMJXU2U78ZU2',
  },
];

export const awards = [
  { dates: '2026–2027', title: 'Qatar University Internal Grant', details: 'Grant QUCG-CENG-26/27-942' },
  { dates: '2022', title: 'Qatar National AI Competition', details: 'Participant in the IDEA category' },
  { dates: '2021', title: '13th Annual QNRF–UREP Competition', details: 'Nomination for project UREP23-031-2-014' },
  { dates: '2020', title: '12th Annual UREP Competition', details: 'Third place for project UREP22-003-2-001' },
  { dates: '2020', title: 'Qatar University Honors Program and Distinguished Student Award', details: 'Completed the Honors Program and graduated with honours.' },
  { dates: '2018', title: 'Qatar University College of Business Poster Competition', details: 'First place' },
  { dates: '2018', title: 'Qatar University Mathematics Championship, Level 2', details: 'Fourth place' },
  { dates: '2016–2018', title: 'Dean’s Award', details: 'Received in six semesters' },
];

export const technicalSkills = [
  {
    title: 'Bioengineering & healthcare',
    details: 'Biomedical instrumentation, biosensors, wearable devices, physiological signals, medical imaging, image registration, computational biomechanics, diabetic-foot technologies, finite-element modelling, research translation, and digital health prototyping.',
  },
  {
    title: 'Research development, governance & IP',
    details: 'Competitive grant writing and multimillion-QAR proposals, IRB and ethics submissions, study protocols, biomedical dataset governance, patent and invention disclosure documentation, manuscripts, book chapters, technical reports, and multidisciplinary project coordination.',
  },
  {
    title: 'AI & machine learning',
    details: 'PyTorch, TensorFlow, and scikit-learn. Classical machine learning, deep learning, convolutional neural networks, generative models, time-series learning, computer vision, segmentation, and multimodal learning.',
  },
  {
    title: 'Programming & data',
    details: 'Python, MATLAB, R, C++, SQL, PostgreSQL, NumPy, SciPy, and pandas. Statistical analysis and data analytics.',
  },
  {
    title: 'Signal & image processing',
    details: 'Python and MATLAB for biomedical and electrical signals, medical imaging, image processing, signal restoration, and feature engineering.',
  },
  {
    title: 'Embedded systems & instrumentation',
    details: 'Arduino, ESP32, Raspberry Pi, NI ELVIS II+, and LabVIEW. Sensors, instrumentation, and Internet of Things prototyping.',
  },
  {
    title: 'Engineering modelling',
    details: 'ANSYS, COMSOL, Fusion 360, Blender, and MATLAB/Simulink. Finite-element analysis, 3D modelling, and physics-based simulation.',
  },
  {
    title: 'Visualisation & productivity',
    details: 'Matplotlib, Tableau, Power BI, R, Microsoft Word, Excel, PowerPoint, Visio, Teams, OneDrive, and LaTeX/Overleaf.',
  },
  {
    title: 'Cloud & development',
    details: 'Microsoft Azure, Google Cloud Platform, Visual Studio Code, and PyCharm. Git-based workflows and basic web and API deployment.',
  },
];

export const languages = [
  { names: 'Bangla', proficiency: 'Native' },
  { names: 'English', proficiency: 'Bilingual' },
  { names: 'Arabic, Urdu, and Hindi', proficiency: 'Limited working proficiency' },
];
