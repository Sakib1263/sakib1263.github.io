import type { APIRoute } from 'astro';
import { bibtexKey, publications } from '../data/papers';
import { doiUrl } from '../lib/site';

const types = {
  'Journal article': 'article',
  Review: 'article',
  'Conference paper': 'inproceedings',
  'Conference abstract': 'article',
  'Book chapter': 'incollection',
};

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const texCharacters: Readonly<Record<string, string>> = {
  '\\': '\\textbackslash{}',
  '~': '\\textasciitilde{}',
  '^': '\\textasciicircum{}',
  '&': '\\&',
  '%': '\\%',
  '$': '\\$',
  '#': '\\#',
  '_': '\\_',
  '{': '\\{',
  '}': '\\}',
};

const escapeText = (text: string) => text.replace(/[\\~^&%$#_{}]/g, character => texCharacters[character]);
const literal = (value?: string) => value ? '{' + value + '}' : undefined;
const textField = (value?: string) => value ? literal(escapeText(value)) : undefined;

type BibliographicDetails = {
  publisher: string;
  date?: string;
  issn?: string;
  isbn?: string;
  bookSubtitle?: string;
  editors?: string[];
  series?: string;
  address?: string;
  eventTitle?: string;
  eventDate?: string;
  eventVenue?: string;
  issueTitle?: string;
};

export const GET: APIRoute = () => {
  const entries = publications.map(publication => {
    const type = types[publication.type as keyof typeof types];
    const key = bibtexKey(publication.doi);
    const details: BibliographicDetails = publication.bibliography;
    const month = months[Number(details.date?.slice(5, 7)) - 1];
    const bookTitle = [publication.venue, details.bookSubtitle].filter(Boolean).join(': ');
    const fields = {
      title: literal(textField(publication.title)),
      author: textField(publication.authors.join(' and ')),
      editor: textField(details.editors?.join(' and ')),
      journal: type === 'article' ? textField(publication.venue) : undefined,
      booktitle: type !== 'article' ? textField(bookTitle) : undefined,
      series: textField(details.series),
      issuetitle: textField(details.issueTitle),
      publisher: textField(details.publisher),
      address: textField(details.address),
      year: literal(String(publication.year)),
      month,
      date: literal(details.date),
      volume: textField(publication.volume),
      number: textField(publication.issue),
      pages: literal(publication.pages?.replace(/(?<=\d)[-–](?=\d)/g, '--')),
      eid: literal(publication.articleNumber),
      issn: literal(details.issn),
      isbn: literal(details.isbn),
      eventtitle: textField(details.eventTitle),
      eventdate: literal(details.eventDate),
      venue: textField(details.eventVenue),
      note: publication.type === 'Conference abstract' ? textField('Conference abstract') : undefined,
      doi: literal(publication.doi),
      url: literal(doiUrl(publication.doi)),
    };
    return [
      '@' + type + '{' + key + ',',
      ...Object.entries(fields).filter(([, value]) => value !== undefined)
        .map(([name, value]) => '  ' + name + ' = ' + value + ','),
      '}',
    ].join('\n');
  });

  return new Response(entries.join('\n\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
