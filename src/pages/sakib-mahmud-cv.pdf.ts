import type { APIRoute } from 'astro';
import { PDFDocument, PDFName, PDFString, StandardFonts, rgb } from 'pdf-lib';
import { cvResearch, cvUpdated, cvUpdatedLabel, education, positions } from '../data/cv';
import { profile, sitePath } from '../lib/site';

export const GET: APIRoute = async ({ site }) => {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`${profile.name} — Curriculum vitae`);
  pdf.setAuthor(profile.name);
  pdf.setCreationDate(new Date(cvUpdated));
  pdf.setModificationDate(new Date(cvUpdated));

  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const serif = await pdf.embedFont(StandardFonts.TimesRoman);
  const ink = rgb(.094, .169, .251);
  const muted = rgb(.27, .34, .43);
  const accent = rgb(.165, .349, .553);
  const width = 595.28;
  const height = 841.89;
  const margin = 48;
  const contentWidth = width - margin * 2;
  let page = pdf.addPage([width, height]);
  let y = height - margin;

  function newPage() {
    page = pdf.addPage([width, height]);
    y = height - margin;
    page.drawText(`${profile.name} · Curriculum vitae`, { x: margin, y, size: 10, font: bold, color: accent });
    y -= 36;
  }

  function write(text: string, size: number, font = regular, color = ink, spacing = 5, url?: string) {
    const lines: string[] = [];
    let current = '';
    for (const word of text.split(' ')) {
      const candidate = current ? `${current} ${word}` : word;
      if (current && font.widthOfTextAtSize(candidate, size) > contentWidth) {
        lines.push(current);
        current = word;
      } else current = candidate;
    }
    lines.push(current);
    for (const line of lines) {
      if (y < 62) newPage();
      page.drawText(line, { x: margin, y, size, font, color });
      if (url) {
        const link = pdf.context.register(pdf.context.obj({
          Type: 'Annot', Subtype: 'Link', Border: [0, 0, 0],
          Rect: [margin, y - 2, margin + font.widthOfTextAtSize(line, size), y + size],
          A: { S: 'URI', URI: PDFString.of(url) },
        }));
        page.node.addAnnot(link);
      }
      y -= size + spacing;
    }
  }

  function heading(title: string) {
    if (y < 142) newPage();
    y -= 7;
    write(title, 20, serif, ink, 8);
  }

  function entry(title: string, detail: string, description: string, url?: string) {
    if (y < 116) newPage();
    write(title, 11, bold, url ? accent : ink, 4, url);
    write(detail, 10, regular, muted, 4);
    if (description) write(description, 10, regular, ink, 4);
    y -= 6;
  }

  const cvUrl = new URL(sitePath('cv/'), site).href;
  write(profile.name, 38, serif, ink, 9);
  write(`${profile.role}, ${profile.affiliation}`, 12, bold);
  write(`${profile.department} · ${profile.location}`, 10, regular, muted, 4);
  write(profile.email, 10, regular, accent, 4, `mailto:${profile.email}`);
  write(`Online CV · Updated ${cvUpdatedLabel}`, 10, regular, accent, 11, cvUrl);

  heading('Selected research contributions');
  for (const project of cvResearch) {
    entry(project.title, `${project.publication.venue} · ${project.publication.year}`, project.contribution,
      new URL(sitePath(`research/${project.slug}/`), site).href);
  }

  heading('Education');
  for (const degree of education) {
    entry(degree.role, `${degree.organization} · ${degree.dates} · CGPA ${degree.gpa}`, degree.summary);
  }

  newPage();
  heading('Research and professional appointments');
  for (const position of positions) {
    const detail = [position.organization, position.dates, position.engagement].filter(Boolean).join(' · ');
    entry(position.role, detail, position.summary);
  }

  const pages = pdf.getPages();
  for (const [index, sheet] of pages.entries()) {
    sheet.drawLine({ start: { x: margin, y: 46 }, end: { x: width - margin, y: 46 }, thickness: .6, color: muted });
    sheet.drawText(`${index + 1} / ${pages.length}`, { x: width - margin - 24, y: 29, size: 9, font: regular, color: muted });
  }
  return new Response(await pdf.save(), { headers: { 'Content-Type': 'application/pdf' } });
};
