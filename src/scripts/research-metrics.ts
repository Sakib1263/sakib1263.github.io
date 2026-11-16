import { metricDate, metricNumber } from '../data/research-metrics';

type OpenAlexRecord = {
  id?: string;
  orcid?: string;
  cited_by_count?: unknown;
  summary_stats?: { h_index?: unknown; i10_index?: unknown };
  counts_by_year?: { year?: unknown; cited_by_count?: unknown }[];
};

function isCount(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
}

async function refreshMetrics(panel: HTMLDetailsElement) {
  const { openalexAuthor, orcid } = panel.dataset;
  if (!openalexAuthor || !orcid) return;

  const authorId = new URL(openalexAuthor).pathname.split('/').pop();
  const endpoint = new URL(`https://api.openalex.org/authors/${authorId}`);
  endpoint.searchParams.set('select', 'id,orcid,cited_by_count,summary_stats,counts_by_year');

  try {
    const response = await fetch(endpoint, { credentials: 'omit', signal: AbortSignal.timeout(6000) });
    if (!response.ok) return;

    const record: OpenAlexRecord = await response.json();
    if (record?.id !== openalexAuthor || record.orcid !== orcid || !Array.isArray(record.counts_by_year)) return;

    const totals = {
      citations: record.cited_by_count,
      hIndex: record.summary_stats?.h_index,
      i10Index: record.summary_stats?.i10_index,
    };
    if (!Object.values(totals).every(isCount)) return;

    const date = new Date();
    const checkedOn = new Intl.DateTimeFormat('sv-SE', { dateStyle: 'short', timeZone: 'Asia/Qatar' }).format(date);
    const currentYear = Number(checkedOn.slice(0, 4));
    const points = [...panel.querySelectorAll('[data-citation-point]')];
    const yearly = record.counts_by_year.flatMap(row => {
      if (!isCount(row?.year) || !isCount(row.cited_by_count) || row.year < 1900 || row.year > currentYear) return [];
      return [{ year: row.year, citations: row.cited_by_count }];
    }).sort((a, b) => a.year - b.year).slice(-points.length);
    if (yearly.length !== points.length || new Set(yearly.map(({ year }) => year)).size !== points.length) return;

    for (const metric of panel.querySelectorAll<HTMLElement>('[data-metric]')) {
      const count = totals[metric.dataset.metric as keyof typeof totals];
      if (isCount(count)) metric.textContent = metricNumber.format(count);
    }
    const maximum = Math.max(1, ...yearly.map(({ citations }) => citations));
    points.forEach((point, index) => {
      const { year, citations } = yearly[index];
      const yearLabel = point.querySelector('[data-citation-year]');
      const countLabel = point.querySelector('[data-citation-count]');
      const bar = point.querySelector<HTMLElement>('[data-citation-bar]');
      if (yearLabel) yearLabel.textContent = String(year);
      if (countLabel) countLabel.textContent = metricNumber.format(citations);
      bar?.style.setProperty('--citation-height', `${citations / maximum * 100}%`);
    });

    const status = panel.querySelector('[data-metric-status]');
    const time = panel.querySelector<HTMLTimeElement>('[data-metric-date]');
    if (status) status.textContent = 'Retrieved live on';
    if (time) {
      time.dateTime = checkedOn;
      time.textContent = metricDate.format(new Date(checkedOn));
    }
  } catch {
    // The dated snapshot is already rendered and remains available if refreshing fails.
  }
}

const panel = document.querySelector<HTMLDetailsElement>('[data-openalex-author]');
if (panel) {
  const refreshWhenOpened = () => {
    if (!panel.open) return;
    panel.removeEventListener('toggle', refreshWhenOpened);
    void refreshMetrics(panel);
  };
  panel.addEventListener('toggle', refreshWhenOpened);
  refreshWhenOpened();
}
