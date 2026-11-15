import { publicationFor } from './papers';
import { projects } from './research';

export const cvUpdated = '2026-11-16';
export const cvUpdatedLabel = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(cvUpdated));

const selectedProjectSlugs = ['wearable-foot-kinetics', 'kidney-stone-segmentation', 'cross-device-raman', 'prenatal-hydronephrosis'];
export const cvResearch = selectedProjectSlugs.map(slug => {
  const project = projects.find(item => item.slug === slug);
  if (!project) throw new Error(`Unknown CV project: ${slug}`);
  return { ...project, publication: publicationFor(project.doi) };
});

export const positions = [
  {
    role: 'Research Associate',
    organization: 'Qatar University',
    dates: 'July 2023–present',
    summary: 'Conduct and coordinate bioengineering research in machine learning, medical imaging, wearable sensing, and computational biomechanics. My work spans study design, dataset development, and model evaluation.',
  },
  {
    role: 'Data Scientist (contract)',
    organization: 'Iberdrola Innovation Middle East',
    dates: 'July 2023–July 2024',
    summary: 'Developed and evaluated machine learning methods for inferring electricity use and building occupancy from multichannel smart-meter data.',
  },
  {
    role: 'Research Assistant (part-time)',
    organization: 'Hamad Medical Corporation',
    dates: 'January 2022–August 2023',
    summary: 'Co-developed the prenatal hydronephrosis ultrasound dataset and worked on kidney localization, segmentation, and severity grading.',
  },
  {
    role: 'Summer Research Intern',
    organization: 'Qatar Computing Research Institute, HBKU',
    dates: 'May–July 2023',
    summary: 'Explored variational autoencoders for finding abnormal gene expression in RNA sequencing data from Mendelian disease studies.',
  },
  {
    role: 'Research Assistant',
    organization: 'Qatar University',
    dates: 'August 2018–May 2020 (part-time), June 2020–June 2023 (full-time)',
    summary: 'Developed electronic and photonic smart-insole prototypes, collected plantar pressure and temperature measurements, and contributed to biomedical signal and image analysis.',
  },
];

export const education = [
  {
    role: 'MSc in Electrical Engineering',
    organization: 'Qatar University',
    dates: '2021–2023',
    summary: 'Thesis on deep learning techniques for kidney disease detection.',
  },
  {
    role: 'BSc in Electrical Engineering, Honours',
    organization: 'Qatar University',
    dates: '2016–2020',
    summary: '',
  },
];
