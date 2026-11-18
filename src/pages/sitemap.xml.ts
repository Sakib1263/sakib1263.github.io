import type { APIRoute } from 'astro';
import { researchStudies } from '../data/research-catalog';
import { collectionPath, collections } from '../data/research-projects';
import { navigation, sitePath } from '../lib/site';

export const GET: APIRoute = ({ site }) => {
  const pages = [
    '', ...navigation.map(page => page.path),
    ...collections.map(project => collectionPath(project.slug)),
    ...researchStudies.map(project => `research/${project.slug}/`),
  ];
  const entries = pages.map(path => `  <url><loc>${new URL(sitePath(path), site).href}</loc></url>`);
  return new Response([
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
  ].join('\n') + '\n', { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
