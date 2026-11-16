const form = document.querySelector<HTMLFormElement>('[data-publication-filters]');
const count = document.querySelector<HTMLElement>('[data-publication-count]');
const empty = document.querySelector<HTMLElement>('[data-publication-empty]');
if (form && count && empty) initializeFilters(form, count, empty);

function initializeFilters(form: HTMLFormElement, count: HTMLElement, empty: HTMLElement) {
  const fields = [...form.querySelectorAll<HTMLInputElement | HTMLSelectElement>('[name]')];
  const normalize = (text: string) => text.normalize('NFKD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  const groups = [...document.querySelectorAll<HTMLElement>('[data-publication-group]')].map(section => ({
    section,
    papers: [...section.querySelectorAll<HTMLElement>('[data-publication]')].map(row => ({
      row,
      searchable: normalize([
        row.querySelector('[data-paper-title]')?.textContent,
        row.querySelector('[data-paper-title]')?.getAttribute('href'),
        row.querySelector('.publication-authors')?.textContent,
        row.querySelector('.publication-venue')?.textContent,
      ].join(' ')),
    })),
  }));
  const total = groups.reduce((sum, group) => sum + group.papers.length, 0);

  function applyFilters() {
    const filters = new FormData(form);
    const words = normalize(String(filters.get('query') ?? '')).trim().split(/\s+/).filter(Boolean);
    const topic = filters.get('topic');
    const year = filters.get('year');
    const type = filters.get('type');
    const selectedOnly = filters.has('view');
    let matches = 0;
    for (const { section, papers } of groups) {
      let visible = 0;
      for (const { row, searchable } of papers) {
        const show = (!topic || row.dataset.topic === topic)
          && (!year || row.dataset.year === year)
          && (!type || row.dataset.type === type)
          && (!selectedOnly || row.dataset.selected === 'true')
          && words.every(word => searchable.includes(word));
        row.hidden = !show;
        if (show) visible++;
      }
      section.hidden = visible === 0;
      matches += visible;
    }
    count.textContent = matches === total ? `${total} publications` : `${matches} of ${total} publications`;
    empty.hidden = matches > 0;
  }

  function writeUrl(clearResultAnchor = false) {
    const url = new URL(location.href);
    const data = new FormData(form);
    for (const { name } of fields) {
      const value = String(data.get(name) ?? '').trim();
      if (value) url.searchParams.set(name, value);
      else url.searchParams.delete(name);
    }
    if (clearResultAnchor && /^#(?:paper|cluster)-/.test(url.hash)) url.hash = 'bibliography';
    if (url.href !== location.href) history.replaceState(history.state, '', url);
  }

  function revealPaperAnchor() {
    const anchor = location.hash.slice(1);
    if (!anchor.startsWith('paper-')) return;
    const paper = document.getElementById(anchor);
    if (!paper?.hidden) return;
    for (const field of fields) {
      if (field instanceof HTMLInputElement && field.type === 'checkbox') field.checked = false;
      else field.value = '';
    }
    applyFilters();
    writeUrl();
    paper.scrollIntoView();
  }

  function restoreUrl() {
    const params = new URLSearchParams(location.search);
    for (const field of fields) {
      const value = params.get(field.name) ?? '';
      if (field instanceof HTMLInputElement && field.type === 'checkbox') field.checked = value === field.value;
      else if (field instanceof HTMLSelectElement && ![...field.options].some(option => option.value === value)) field.value = '';
      else field.value = value;
    }
    applyFilters();
    revealPaperAnchor();
  }

  function filtersChanged() {
    applyFilters();
    writeUrl(true);
  }

  form.hidden = false;
  form.addEventListener('input', filtersChanged);
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('reset', () => requestAnimationFrame(filtersChanged));
  window.addEventListener('popstate', restoreUrl);
  window.addEventListener('hashchange', revealPaperAnchor);
  restoreUrl();
}

document.querySelectorAll<HTMLButtonElement>('[data-citation]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', async () => {
      const row = button.closest('article');
      const fallback = row?.querySelector<HTMLLabelElement>('.citation-fallback');
      const textarea = fallback?.querySelector('textarea');
      const status = row?.querySelector<HTMLElement>('.citation-status');
      if (!fallback || !textarea || !status) return;
      const citation = button.dataset.citation ?? '';
      status.textContent = '';
      try {
        await navigator.clipboard.writeText(citation);
        fallback.hidden = true;
        status.textContent = 'Citation copied.';
      } catch {
        textarea.value = citation;
        fallback.hidden = false;
        textarea.focus();
        textarea.select();
      }
    });
  });
