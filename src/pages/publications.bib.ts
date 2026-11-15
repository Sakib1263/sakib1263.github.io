import type { APIRoute } from 'astro';
import publications from '../data/publications.json';

const types = {
  'Journal article': 'article',
  Review: 'article',
  'Conference paper': 'inproceedings',
  'Book chapter': 'incollection',
};

const escaped = (text: string) => text.replace(/[{}]/g, character => `\\${character}`);

export const GET: APIRoute = () => {
  const entries = publications.map(publication => {
    const type = types[publication.type as keyof typeof types];
    const venueField = type === 'article' ? 'journal' : 'booktitle';
    const key = publication.doi.replace(/[^\w]+/g, '-');
    return [
      `@${type}{${key},`,
      `  title = {{${escaped(publication.title)}}},`,
      `  author = {${publication.authors.map(escaped).join(' and ')}},`,
      `  year = {${publication.year}},`,
      `  ${venueField} = {${escaped(publication.venue)}},`,
      `  doi = {${publication.doi}}`,
      '}',
    ].join('\n');
  });

  return new Response(entries.join('\n\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
