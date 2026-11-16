import { authorId as scholarId } from '../data/google-scholar.json';

export const profile = {
  name: 'Sakib Mahmud',
  role: 'Research Associate',
  affiliation: 'Qatar University',
  department: 'Department of Electrical Engineering',
  location: 'Doha, Qatar',
  email: 'sakib.mahmud@qu.edu.qa',
  github: 'https://github.com/Sakib1263',
  scholar: `https://scholar.google.com/citations?user=${scholarId}`,
  orcid: 'https://orcid.org/0000-0002-4599-2192',
  focus: 'How reliably can we recover biomedical measurements from images and sensor signals?',
  bio: 'I develop and evaluate machine learning methods for medical imaging, wearable biomechanics, and spectroscopy. I’m particularly interested in how performance varies across people and instruments.',
};

export const cvPdfPath = 'sakib-mahmud-cv.pdf';

export const researchProfiles = [
  { label: 'Google Scholar', href: profile.scholar },
  { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Sakib-Mahmud-7' },
  { label: 'Web of Science', href: 'https://www.webofscience.com/wos/author/record/OIT-8107-2025' },
  { label: 'Scopus', href: 'https://www.scopus.com/authid/detail.uri?authorId=57211999810' },
  { label: 'ORCID', href: profile.orcid },
];

export const navigation = [
  { label: 'Research', path: 'research/' },
  { label: 'Publications', path: 'publications/' },
  { label: 'Software & Data', path: 'software/' },
  { label: 'CV', path: 'cv/' },
];

export function sitePath(path = '') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

export function doiUrl(doi: string) {
  return `https://doi.org/${doi}`;
}
