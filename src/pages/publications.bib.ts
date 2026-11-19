import type { APIRoute } from 'astro';
import { publications } from '../data/papers';
import { bibtexEntry } from '../lib/bibtex';

export const GET: APIRoute = () => new Response(publications.map(bibtexEntry).join('\n\n') + '\n', {
  headers: { 'Content-Type': 'text/plain; charset=utf-8' },
});
