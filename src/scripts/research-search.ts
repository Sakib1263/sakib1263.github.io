import { normalizeSearch } from './search';

const form = document.querySelector<HTMLFormElement>('[data-research-search]');
const search = form?.querySelector<HTMLInputElement>('input[type="search"]');
const clear = form?.querySelector<HTMLButtonElement>('button[type="reset"]');
const count = form?.querySelector<HTMLElement>('[data-research-count]');
const catalog = document.querySelector<HTMLElement>('[data-research-catalog]');
const areas = catalog?.querySelector<HTMLElement>('[data-research-areas]');
const empty = catalog?.querySelector<HTMLElement>('[data-research-empty]');

if (form && search && clear && count && catalog && areas && empty) {
  const areaById = new Map([...areas.querySelectorAll<HTMLElement>('[data-research-area]')]
    .map(item => [item.dataset.researchArea, item]));
  const groups = [...catalog.querySelectorAll<HTMLElement>('[data-research-group]')].map(section => {
    const area = areaById.get(section.dataset.researchGroup);
    return {
      section,
      area,
      areaCount: area?.querySelector('[data-area-count]'),
      rows: [...section.querySelectorAll<HTMLElement>('[data-research-project-row]')].map(row => ({
        row,
        text: normalizeSearch([
          row.querySelector('h3')?.textContent,
          row.querySelector('.research-summary')?.textContent,
          row.dataset.methods,
        ].join(' ')),
      })),
    };
  });
  const total = groups.reduce((sum, group) => sum + group.rows.length, 0);

  const applySearch = () => {
    const words = normalizeSearch(search.value).split(' ').filter(Boolean);
    let matches = 0;
    for (const { section, area, areaCount, rows } of groups) {
      let visible = 0;
      for (const { row, text } of rows) {
        row.hidden = !words.every(word => text.includes(word));
        if (!row.hidden) visible++;
      }
      section.hidden = visible === 0;
      if (area) area.hidden = section.hidden;
      if (areaCount) areaCount.textContent = String(visible);
      matches += visible;
    }
    areas.hidden = matches === 0;
    empty.hidden = matches !== 0;
    clear.hidden = !search.value;
    count.textContent = matches === total ? `${total} projects` : `${matches} of ${total} projects`;
  };

  search.addEventListener('input', applySearch);
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('reset', event => {
    event.preventDefault();
    search.value = '';
    applySearch();
    search.focus();
  });
  window.addEventListener('pageshow', applySearch);
  form.hidden = false;
  applySearch();
}
