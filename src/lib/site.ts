export const profile = {
  name: 'Sakib Mahmud',
  role: 'Research Associate',
  affiliation: 'Qatar University',
  department: 'Department of Electrical Engineering',
  location: 'Doha, Qatar',
  email: 'sakib.mahmud@qu.edu.qa',
  github: 'https://github.com/Sakib1263',
  scholar: 'https://scholar.google.com/citations?user=jFVg8REAAAAJ',
  orcid: 'https://orcid.org/0000-0002-4599-2192',
  focus: 'How reliably can we recover biomedical measurements from images and sensor signals?',
  bio: 'I develop and evaluate machine learning methods for medical imaging, wearable biomechanics, and spectroscopy. I’m particularly interested in how performance varies across people and instruments.',
};

export const cvPdfPath = 'sakib-mahmud-cv.pdf';

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
