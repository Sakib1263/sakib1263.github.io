import { datasets } from './datasets';
import { publicationFor, publicationId } from './papers';
import { softwareForProject } from './software';
import { sitePath } from '../lib/site';

export type ProjectLink = { title: string; detail?: string; href: string; citation?: boolean };
export type ProjectLinkGroup = { id: 'project-publications' | 'project-code' | 'project-data' | 'project-resources'; label: string; items: ProjectLink[] };

/**
 * The closing sections of every research page. Papers, code and datasets link to their entries on this site,
 * where the external records are; only other resources, such as a thesis, link out directly.
 */
export function projectLinks({ dois, projects, resources = [], citationDoi }: {
  /** The project's own papers, main paper first. Never other projects' papers. */
  dois: (string | undefined)[];
  /** Research project slugs whose code belongs on this page. */
  projects: string[];
  resources?: { label: string; href: string }[];
  /** The main paper, whose entry the build check matches against the publications page. */
  citationDoi?: string;
}) {
  const ownDois = [...new Set(dois.filter((doi): doi is string => Boolean(doi)).map(doi => doi.toLowerCase()))];
  const publications = ownDois.map(doi => {
    const paper = publicationFor(doi);
    return {
      title: paper.title,
      detail: `${paper.venue} · ${paper.year}${paper.onlineYear ? ` (online ${paper.onlineYear})` : ''}`,
      href: sitePath(`publications/#${publicationId(paper.doi)}`),
      citation: citationDoi?.toLowerCase() === doi,
    };
  });
  const code = [...new Set(projects)].flatMap(softwareForProject).map(entry => ({
    // Named by repository, e.g. "NDDNet", since the project title is already the page heading.
    title: entry.code.replace(/\/+$/, '').split('/').pop() ?? entry.title,
    detail: 'Research software and repository details',
    href: sitePath(`software/#${entry.id}`),
  }));
  const data = datasets.filter(dataset => ownDois.includes(dataset.studyDoi.toLowerCase())).map(dataset => ({
    title: dataset.title, detail: `${dataset.platform} dataset`, href: sitePath(`software/#${dataset.id}`),
  }));
  const other = resources.map(({ label, href }) => ({ title: label, href }));
  const groups: ProjectLinkGroup[] = [
    { id: 'project-publications', label: 'Publications', items: publications },
    { id: 'project-code', label: 'Code', items: code },
    { id: 'project-data', label: 'Data', items: data },
    { id: 'project-resources', label: 'Resources', items: other },
  ];
  const shown = groups.filter(group => group.items.length);
  return { groups: shown, sections: shown.map(({ id, label }) => ({ id, label })) };
}
