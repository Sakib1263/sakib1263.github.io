import { projects } from './research';
import { researchStudies } from './research-catalog';

/** One code repository on the Software & Data page. Project pages link here rather than to the repository. */
export type SoftwareEntry = {
  id: string;
  title: string;
  area: string;
  summary: string;
  code: string;
  /** The research project the code belongs to, if any. */
  project?: string;
  /** The paper the code accompanies, if any. */
  doi?: string;
};

const featured = new Set(projects.map(({ slug }) => slug));
// Featured studies keep their place at the top of the list; the rest follow in research catalogue order.
const studiesWithCode = [
  ...projects,
  ...researchStudies.filter(study => !featured.has(study.slug)),
].filter(study => study.code || study.otherCode?.length);

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const softwareEntries: SoftwareEntry[] = [
  {
    id: 'code-superonn-layers',
    title: 'SuperONN-Layers',
    area: 'Reusable library',
    summary: 'Polynomial 1D and 2D super-operational layers for PyTorch and TensorFlow/Keras, including forward and transposed operations with fixed or trainable offsets.',
    code: 'https://github.com/Sakib1263/SuperONN-Layers',
  },
  ...studiesWithCode.flatMap(study => [
    ...(study.code ? [{
      id: `code-${study.slug}`, title: study.title, area: study.area, summary: study.summary,
      code: study.code, project: study.slug, doi: study.doi,
    }] : []),
    ...(study.otherCode ?? []).map(({ label, href, summary, doi }) => ({
      id: `code-${study.slug}-${slugify(label)}`, title: label, area: study.area, summary,
      code: href, project: study.slug, doi,
    })),
  ]),
];

/** Code entries for one research project, in the order shown on the Software & Data page. */
export const softwareForProject = (slug: string) => softwareEntries.filter(entry => entry.project === slug);
