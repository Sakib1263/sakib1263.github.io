const form = document.querySelector<HTMLFormElement>('[data-publication-filters]');
const count = document.querySelector<HTMLElement>('[data-publication-count]');
const empty = document.querySelector<HTMLElement>('[data-publication-empty]');
if (form && count && empty) initializeFilters(form, count, empty);

function normalizeSearch(text: string) {
  return text.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

function findDoi(query: string, dois: Set<string>) {
  let decoded = query;
  try {
    decoded = decodeURIComponent(query);
  } catch {
    // A stray percent sign in a search is ordinary text.
  }
  const doi = decoded.trim().toLowerCase()
    .replace(/^[[(<"“]+\s*/, '')
    .replace(/^doi\s*:\s*/, '')
    .replace(/^(?:https?:\/\/)?(?:dx\.)?doi\.org\//, '');
  if (dois.has(doi)) return doi;
  const unwrapped = doi.split(/[?#]/, 1)[0].replace(/[\s).,;:\]>"”]+$/, '');
  return dois.has(unwrapped) ? unwrapped : undefined;
}

function initializeFilters(form: HTMLFormElement, count: HTMLElement, empty: HTMLElement) {
  const fields = [...form.querySelectorAll<HTMLInputElement | HTMLSelectElement>('[name]')];
  const search = form.querySelector<HTMLInputElement>('[name="query"]');
  const topicLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-topic-link]')];
  const groups = [...document.querySelectorAll<HTMLElement>('[data-publication-group]')].map(section => ({
    section,
    papers: [...section.querySelectorAll<HTMLElement>('[data-publication]')].map(row => ({
      row,
      doi: row.dataset.doi?.toLowerCase() ?? '',
      searchable: normalizeSearch([
        row.querySelector('[data-paper-title]')?.textContent,
        row.dataset.doi,
        row.querySelector('.publication-authors')?.textContent,
        row.querySelector('.publication-venue cite')?.textContent,
        row.querySelector('.publication-summary')?.textContent,
        row.querySelector('.publication-contribution')?.textContent,
      ].join(' ')),
    })),
  }));
  const total = groups.reduce((sum, group) => sum + group.papers.length, 0);
  const dois = new Set(groups.flatMap(group => group.papers.map(paper => paper.doi)).filter(Boolean));
  let searchHistoryEntry = false;

  function applyFilters() {
    const filters = new FormData(form);
    const query = String(filters.get('query') ?? '');
    const doiMatch = findDoi(query, dois);
    const words = normalizeSearch(query).split(' ').filter(Boolean);
    const topic = filters.get('topic');
    const year = filters.get('year');
    const type = filters.get('type');
    const selectedOnly = filters.has('view');
    let matches = 0;
    for (const { section, papers } of groups) {
      let visible = 0;
      for (const { row, doi, searchable } of papers) {
        const show = (!topic || row.dataset.topic === topic)
          && (!year || row.dataset.year === year)
          && (!type || row.dataset.type === type)
          && (!selectedOnly || row.dataset.selected === 'true')
          && (doiMatch ? doi === doiMatch : words.every(word => searchable.includes(word)));
        row.hidden = !show;
        if (show) visible++;
      }
      section.hidden = visible === 0;
      matches += visible;
    }
    count.textContent = matches === total ? `${total} publications` : `${matches} of ${total} publications`;
    empty.hidden = matches > 0;
    for (const link of topicLinks) {
      if (link.dataset.topicLink === topic) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  }

  function writeUrl(mode: 'push' | 'replace', clearResultAnchor = false) {
    const url = new URL(location.href);
    const data = new FormData(form);
    for (const { name } of fields) {
      const value = String(data.get(name) ?? '').trim();
      const current = url.searchParams.getAll(name);
      if (value && (current.length !== 1 || current[0] !== value)) url.searchParams.set(name, value);
      if (!value && current.length) url.searchParams.delete(name);
    }
    if (clearResultAnchor && /^#(?:paper|cluster)-/.test(url.hash)) url.hash = 'bibliography';
    if (url.href === location.href) return false;
    if (mode === 'push') history.pushState(history.state, '', url);
    else history.replaceState(history.state, '', url);
    return true;
  }

  function setFields(params: URLSearchParams) {
    for (const field of fields) {
      const value = params.get(field.name) ?? '';
      if (field instanceof HTMLInputElement && field.type === 'checkbox') field.checked = value === field.value;
      else if (field instanceof HTMLSelectElement && ![...field.options].some(option => option.value === value)) field.value = '';
      else field.value = value;
    }
  }

  function restoreUrl() {
    searchHistoryEntry = false;
    setFields(new URLSearchParams(location.search));
    applyFilters();
    const anchor = location.hash.slice(1);
    const target = document.getElementById(anchor);
    if (anchor.startsWith('paper-') && target?.hidden) {
      setFields(new URLSearchParams());
      applyFilters();
      target.scrollIntoView();
    }
    const hiddenCluster = anchor.startsWith('cluster-') && (!target || Boolean(target.closest('[hidden]')));
    writeUrl('replace', hiddenCluster);
    if (hiddenCluster) document.getElementById('bibliography')?.scrollIntoView();
  }

  function filtersChanged(mode: 'push' | 'replace') {
    applyFilters();
    return writeUrl(mode, true);
  }

  form.hidden = false;
  search?.addEventListener('input', () => {
    // Keep the state before the search without adding a history entry per character.
    const changed = filtersChanged(searchHistoryEntry ? 'replace' : 'push');
    searchHistoryEntry ||= changed;
  });
  search?.addEventListener('blur', () => { searchHistoryEntry = false; });
  form.addEventListener('change', event => {
    if (event.target !== search) filtersChanged('push');
  });
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('reset', event => {
    event.preventDefault();
    searchHistoryEntry = false;
    setFields(new URLSearchParams());
    filtersChanged('push');
  });
  window.addEventListener('popstate', restoreUrl);
  window.addEventListener('hashchange', restoreUrl);
  window.addEventListener('pageshow', event => { if (event.persisted) restoreUrl(); });
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
