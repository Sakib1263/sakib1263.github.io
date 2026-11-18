import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';

const flagship = '/research/wearable-foot-kinetics/';
const gaitProject = '/research/projects/smart-insole-3d-gait-kinetics/';
const paperId = 'paper-10-1109-jbhi-2025-3605296';

for (const path of ['/', '/research/', gaitProject, flagship, '/research/cross-device-raman/', '/research/prenatal-hydronephrosis/', '/research/nabnet/', '/publications/', '/cv/', '/software/']) {
  test(`checks accessibility at ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready.then(() => true));
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(violations).toEqual([]);
  });
}

test('mobile navigation stays visible and the flagship fits at 320 pixels', async ({ page, request }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto(flagship);
  await expect(page.getByRole('img', { name: /^Two panels of gait-cycle curves/ })).toBeVisible();
  await page.getByRole('heading', { name: 'Work with the study data' }).scrollIntoViewIfNeeded();
  expect(await page.locator('.site-header').evaluate(header => header.getBoundingClientRect().top)).toBe(0);
  const viewport = await page.evaluate(() => ({ width: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
  expect(viewport.content).toBeLessThanOrEqual(viewport.width);
  const record = await page.getByRole('link', { name: 'demo verification record' }).getAttribute('href');
  const response = await request.get(record!);
  expect(response.ok()).toBe(true);
  expect(await response.json()).toMatchObject({
    release: 'v0.1.0',
    status_json: { status: 'complete', folds_completed: [1] },
    summary_checks: { synthetic_only: true },
    predictions: { shape_each: [8, 64, 1], all_values_finite: true },
  });
});

test('research areas lead to project details, supporting publications, and ongoing work', async ({ page, context }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/research/');
  const researchAreas = page.getByRole('navigation', { name: 'Research areas', exact: true });
  await expect(researchAreas.getByRole('link')).toHaveCount(7);
  await expect(page.locator('[data-research-project-row]')).toHaveCount(30);
  await researchAreas.getByRole('link', { name: 'Biomedical devices & simulation' }).click();
  await expect(page).toHaveURL('/research/#devices');
  await page.getByRole('link', { name: 'Hip implant mechanics, sensing, and loosening detection', exact: true }).click();
  await expect(page).toHaveURL('/research/hip-implant-mechanics-and-imaging/');
  await expect(page.getByRole('heading', { name: 'My contribution', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Dataset details', exact: true })).toHaveAttribute('href', '/software/#hip-implant-xray');
  await expect(page.getByRole('link', { name: 'Read the paper', exact: true })).toHaveAttribute('target', '_blank');
  await page.getByRole('link', { name: 'All research' }).click();
  await expect(page).toHaveURL('/research/#hip-implant-mechanics-and-imaging');
  await page.getByRole('link', { name: 'AI-powered smart insoles for 3D gait kinetics', exact: true }).click();
  await expect(page).toHaveURL(gaitProject);
  await expect(page.getByRole('img', { name: /^Project pathway diagram/ })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Project sections' }).getByRole('link')).toContainText([
    'Insole loading to 3D kinetics', 'Two public datasets', 'Kinematics only', 'Pressure, motion or both',
    'Reliability-aware fusion', 'Transfer across devices', 'Smart-insole hardware', 'Application and integration',
  ]);
  const stages = page.getByRole('region', { name: 'Research stages and outputs' });
  await expect(stages.getByRole('heading', { level: 3 })).toHaveText([
    'Foot motion as a predictor of forces and moments',
    'Reconstructing 3D kinetics from smart-insole loading',
    'Combining plantar loading with inertial motion',
  ]);
  await expect(stages.getByRole('link', { name: /^Publication for/ })).toHaveCount(2);
  await expect(page.getByRole('region', { name: 'Scope and validation' })).toContainText('validation of the integrated prototype are planned');
  await page.getByRole('link', { name: 'Details for Combining plantar loading with inertial motion' }).click();
  await expect(page).toHaveURL('/research/multimodal-wearable-kinetics/');
  await expect(page.getByText('Wearable biomechanics · Ongoing research')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Reported results' })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Reconstructing 3D kinetics from smart-insole loading' })).toHaveAttribute('href', flagship);
  await page.getByRole('link', { name: 'Project overview' }).click();
  await expect(page).toHaveURL(`${gaitProject}#multimodal-wearable-kinetics`);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  expect(context.pages()).toEqual([page]);
});

test('wider text spacing keeps navigation and section targets visible at 320 pixels', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/');
  await page.addStyleTag({ content: `
    * { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; }
    p { margin-bottom: 2em !important; }
  ` });
  const navigation = page.getByRole('navigation', { name: 'Main navigation' });
  const cv = navigation.getByRole('link', { name: 'CV', exact: true });
  await expect(cv).toBeInViewport({ ratio: 1 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  await expect.poll(() => page.evaluate(() => {
    const header = document.querySelector('.site-header')!;
    return parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) - header.getBoundingClientRect().height;
  })).toBeGreaterThanOrEqual(9);
  await page.getByRole('link', { name: 'Explore research' }).click();
  await expect(page).toHaveURL('/#current-research');
  const header = await page.locator('.site-header').boundingBox();
  const target = await page.locator('#current-research').boundingBox();
  expect(target!.y).toBeGreaterThan(header!.y + header!.height);
});

test('research search matches methods, updates areas, and restores the catalogue', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/research/#project-catalog');
  const form = page.getByRole('form', { name: 'Filter research projects' });
  const search = form.getByRole('searchbox', { name: 'Search projects' });
  const areas = page.getByRole('navigation', { name: 'Research areas', exact: true });
  await expect(form.getByRole('status')).toHaveText('30 entries');
  await search.fill('Instrumented treadmill');
  await expect(page.locator('#smart-insole-3d-gait-kinetics')).toBeVisible();
  await search.fill('five shoe-mounted markers');
  await expect(page.locator('#smart-insole-3d-gait-kinetics')).toBeVisible();
  await search.fill('Döppler');
  await expect(page.locator('#qscare-doppler-flow')).toBeVisible();
  await expect(page.locator('#microbial-raman-biosensing')).toBeHidden();
  await expect(form.getByRole('status')).toHaveText('1 of 30 entries');
  await expect(areas.getByRole('link', { name: /Raman/ })).toHaveCount(0);
  await search.fill('no such research project xyz');
  await expect(form.getByRole('status')).toHaveText('0 of 30 entries');
  await expect(page.getByText('Try a different project name, method, or modality.')).toBeVisible();
  await form.getByRole('button', { name: 'Clear search' }).click();
  await expect(form.getByRole('status')).toHaveText('30 entries');
  await expect(search).toBeFocused();
  await page.locator('#microbial-raman-biosensing').getByRole('heading').getByRole('link').click();
  await expect(page).toHaveURL('/research/projects/microbial-raman-biosensing/');
});

test('the research profile displays its saved Google Scholar metrics and yearly chart', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  const saved = JSON.parse(readFileSync(new URL('../src/data/google-scholar.json', import.meta.url), 'utf8'));
  const number = new Intl.NumberFormat('en-GB');
  await page.goto('/research/');
  const snapshot = page.getByRole('region', { name: 'Research profile', exact: true });
  const scholar = snapshot.getByLabel('Google Scholar all-time metrics');
  await expect(scholar.locator('strong')).toHaveText(Object.values(saved.totals).map(value => number.format(Number(value))));
  await expect(scholar.locator('small').first()).toHaveText(`${number.format(saved.recent.citations)} since ${saved.recent.since}`);
  await expect(snapshot.getByRole('link', { name: 'Google Scholar', exact: true })).toHaveAttribute('target', '_blank');
  await expect(snapshot.locator('time')).toHaveAttribute('datetime', saved.checkedOn);
  const history = snapshot.getByRole('figure', { name: 'Google Scholar yearly citation counts' });
  await expect(history.locator('.citation-year')).toHaveText(saved.yearly.map(({ year }) => String(year)));
  await expect(history.locator('.citation-count')).toHaveText(saved.yearly.map(({ citations }) => `${number.format(citations)} citations`));
  await expect(page.getByText(/OpenAlex|Live citation metrics/)).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
});

test('the research catalogue retains the case studies and their distinct share cards', async ({ page, request }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/research/');
  await expect(page.getByRole('navigation', { name: 'Featured research shortcuts' })).toHaveCount(0);
  await expect(page.getByText(/I’m now testing gait models/)).toHaveCount(0);
  const slugs = ['wearable-foot-kinetics', 'kidney-stone-segmentation', 'cross-device-raman'];
  await page.goto('/research/#wearable-foot-kinetics');
  await expect(page.locator('#smart-insole-3d-gait-kinetics')).toBeInViewport();
  await expect(page.locator('#plantar-sensing-for-diabetic-foot')).toHaveCount(1);
  await expect(page.getByRole('region', { name: 'Additional studies and software' })
    .getByRole('link', { name: 'GearFaultNet', exact: false })).toHaveAttribute('href', '/research/gearbox-fault-detection/');
  const images = new Set<string>();
  for (const slug of slugs) {
    await page.goto(`/research/${slug}/`);
    await expect(page.getByText('What I led', { exact: true })).toBeInViewport();
    await expect(page.getByText('What the study found', { exact: true })).toBeInViewport();
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200');
    const image = await page.locator('meta[property="og:image"]').getAttribute('content');
    const url = new URL(image!);
    expect((await request.get(url.pathname)).ok()).toBe(true);
    images.add(url.pathname);
  }
  expect(images.size).toBe(3);
  const disclosure = page.getByRole('region', { name: 'Code and reproduction', exact: true });
  await expect(disclosure).toContainText('61.5 million parameters');
  await expect(disclosure.getByRole('link', { name: 'Synthetic demo notebook' })).toHaveAttribute('href', /52285ba\w+\/notebooks\/00_control_center\.ipynb$/);
  const panels = page.getByRole('group', { name: /compare the original and transformed mean spectra/ });
  await expect(panels).toBeVisible();
  await expect(panels.getByRole('img')).toHaveCount(2);
  const fullSize = page.getByRole('link', { name: 'View full-size figure' }).last();
  const fullSizeUrl = await fullSize.getAttribute('href');
  expect((await request.get(fullSizeUrl!)).headers()['content-type']).toMatch(/^image\//);
});

test('homepage contact links open the supplied profiles', async ({ page }) => {
  await page.goto('/#contact');
  const profiles = page.getByRole('navigation', { name: 'Professional and research profiles' });
  for (const [name, href] of [
    ['LinkedIn', 'https://www.linkedin.com/in/sakib1263/'],
    ['ResearchGate', 'https://www.researchgate.net/profile/Sakib-Mahmud-7/research'],
  ]) {
    const link = profiles.getByRole('link', { name, exact: true });
    await expect(link).toHaveAttribute('href', href);
    await expect(link).toHaveAttribute('target', '_blank');
  }
});

test('project and paper links round-trip and the citation copies', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto(flagship);
  await page.getByRole('link', { name: 'Citation', exact: true }).click();
  await expect(page).toHaveURL(`/publications/#${paperId}`);
  const paper = page.locator(`#${paperId}`);
  await paper.getByRole('button', { name: /copy citation/i }).click();
  await expect(paper.getByRole('status')).toHaveText('Citation copied.');
  const citation = await page.evaluate(() => navigator.clipboard.readText());
  expect(citation).toContain('Mahmud');
  expect(citation).toContain('https://doi.org/10.1109/jbhi.2025.3605296');
  await page.getByRole('combobox', { name: 'Topic', exact: true }).selectOption('imaging');
  await expect(paper).toBeHidden();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await paper.getByRole('link', { name: 'Research details', exact: true }).click();
  await expect(page).toHaveURL(flagship);
});

test('the homepage links to all research and all papers', async ({ page, request }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Research summary', exact: true })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'More selected papers', exact: true })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'All research', exact: true })).toHaveAttribute('href', '/research/');
  await page.getByRole('link', { name: 'All papers', exact: true }).click();
  await expect(page).toHaveURL('/publications/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  expect(await (await request.get('/sitemap.xml')).text()).not.toContain('research/summary');
});

test('both gait papers link to their shared research project', async ({ page }) => {
  await page.goto('/publications/');
  for (const doi of ['10.1016/j.compbiomed.2021.105184', '10.1007/s10489-023-04557-w']) {
    await expect(page.locator(`[data-doi="${doi}"]`).getByRole('link', { name: 'Research details', exact: true }))
      .toHaveAttribute('href', '/research/gait-pattern-modelling/');
  }
  await page.goto('/research/gait-pattern-modelling/');
  await expect(page.getByRole('navigation', { name: 'Project sections' }).getByRole('link')).toContainText(['Approach', 'Tai Chi gait', 'NDDNet']);
});

test('the blood pressure papers link to their shared research project', async ({ page }) => {
  await page.goto('/publications/');
  for (const doi of ['10.3390/s22030919', '10.3390/bioengineering9110692', '10.1016/j.bspc.2022.104247']) {
    await expect(page.locator(`[data-doi="${doi}"]`).getByRole('link', { name: 'Research details', exact: true }))
      .toHaveAttribute('href', '/research/nabnet/');
  }
  await page.goto('/research/nabnet/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cuffless blood pressure and arterial waveform estimation from PPG and ECG');
  await expect(page.getByRole('navigation', { name: 'Project sections' }).getByRole('link')).toContainText(['Approach', 'Pressure prediction', 'PPG to waveform', 'Hybrid reconstruction']);
});

test('the glucose monitoring project shows its system and results stages', async ({ page }) => {
  await page.goto('/research/multimodal-glucose-estimation/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('QU-GM');
  await expect(page.getByRole('navigation', { name: 'Project sections' }).getByRole('link')).toContainText(['Approach', 'Wearable system', 'Clinical data', 'Glucose estimation', 'Severity classification']);
});

test('the MRI ECG project presents detection and restoration stages', async ({ page }) => {
  await page.goto('/research/ecg-restoration-during-mri/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Deep learning for 12-lead ECG restoration and R-peak detection during MRI');
  await expect(page.getByRole('navigation', { name: 'Project sections' }).getByRole('link')).toContainText(['Approach', 'R-peak detection', 'Phase 1: QRS guidance', 'Phase 2: MHDGAN', 'Phase 3: MHD2ECGNet', 'Cardiac evaluation']);
});

test('both fetal ECG papers link to their shared research project', async ({ page }) => {
  await page.goto('/publications/');
  for (const doi of ['10.1016/j.engappai.2023.106414', '10.1016/j.eswa.2023.121196']) {
    await expect(page.locator(`[data-doi="${doi}"]`).getByRole('link', { name: 'Research details', exact: true }))
      .toHaveAttribute('href', '/research/fetal-ecg-extraction/');
  }
  await page.goto('/research/fetal-ecg-extraction/');
  await expect(page.getByRole('navigation', { name: 'Project sections' }).getByRole('link')).toContainText(['Approach', 'LinkNet++ extraction', '1D-CycleGAN', 'Heart-rate evaluation']);
});

test('site navigation and section links stay in the current tab', async ({ page, context }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Explore research' }).click();
  await expect(page).toHaveURL('/#current-research');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Publications' }).click();
  await expect(page).toHaveURL('/publications/');
  expect(context.pages()).toEqual([page]);
  await expect(page.getByRole('link', { name: 'ORCID' }).first()).toHaveAttribute('target', '_blank');
});

test('dataset records link to their release and companion paper', async ({ page, context }) => {
  await page.goto('/software/');
  await expect(page.getByRole('link', { name: 'Browse datasets' })).toHaveCount(0);
  const sections = page.getByRole('navigation', { name: 'Software & Data sections' });
  await sections.getByRole('link', { name: 'Datasets', exact: true }).click();
  await expect(page).toHaveURL('/software/#datasets');
  const listing = page.getByRole('region', { name: 'Datasets', exact: true });
  await expect(listing.getByRole('article')).toHaveCount(3);
  await expect(listing.getByText('Processed treadmill and insole recordings')).toHaveCount(0);
  await expect(listing.getByText('Access by request')).toBeVisible();
  for (const license of ['CC BY 4.0', 'CC BY-SA 4.0', 'CC0 1.0']) {
    await expect(listing.getByRole('link', { name: license, exact: true })).toBeVisible();
  }

  const covid = page.locator('#covid-qu-ex');
  const archive = covid.getByRole('link', { name: 'Kaggle record for COVID-QU-Ex Dataset' });
  await expect(archive).toHaveAttribute('href', 'https://doi.org/10.34740/kaggle/dsv/3122958');
  await expect(archive).toHaveAttribute('target', '_blank');
  await expect(listing.getByRole('link', { name: 'Kaggle record for Aseptic Loose Hip Implant X-Ray Database' }))
    .toHaveAttribute('href', 'https://doi.org/10.34740/kaggle/dsv/3078704');
  await covid.getByRole('link', { name: 'Related paper for COVID-QU-Ex Dataset' }).click();
  const paper = page.locator('#paper-10-1016-j-compbiomed-2021-105002');
  await expect(paper).toBeVisible();
  await paper.getByRole('link', { name: 'Dataset details' }).click();
  await expect(page).toHaveURL('/software/#covid-qu-ex');
  await expect(covid).toBeInViewport();
  expect(context.pages()).toEqual([page]);
});

test('CV download works from the homepage', async ({ page, request }) => {
  await page.goto('/');
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download CV' }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe('sakib-mahmud-cv.pdf');
  const response = await request.get('/sakib-mahmud-cv.pdf');
  expect(response.ok()).toBe(true);
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
});

test('the homepage portrait and contact are easy to find on narrow screens', async ({ page, context }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/');
  await expect(page.getByText('Department of Electrical Engineering · Doha, Qatar', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'MSc and BSc (Hons.) in Electrical Engineering' })).toHaveAttribute('href', '/cv/#education-title');
  const portrait = page.getByRole('img', { name: 'Portrait of Sakib Mahmud' });
  await expect(portrait).toBeVisible();
  await expect(portrait).toHaveAttribute('srcset', /\b768w\b/);
  const portraitBounds = (await portrait.boundingBox())!;
  const introBounds = (await page.locator('.home-bio').boundingBox())!;
  expect(portraitBounds.width).toBeGreaterThan(80);
  expect(portraitBounds.width).toBeLessThan(125);
  expect(portraitBounds.y + portraitBounds.height).toBeLessThan(introBounds.y);
  await expect.poll(() => portrait.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await expect(page.getByRole('region', { name: 'Featured research' }).getByRole('article')).toHaveCount(3);
  // Homepage cards are the research catalogue's projects: same titles and the same project pages.
  const featured = page.getByRole('region', { name: 'Featured research' });
  for (const [title, href] of [
    ['AI-powered smart insoles for 3D gait kinetics', gaitProject],
    ['Deep learning for kidney disease imaging', '/research/projects/kidney-disease-imaging/'],
    ['Machine learning for microbial Raman biosensing', '/research/projects/microbial-raman-biosensing/'],
  ]) {
    await expect(featured.getByRole('link', { name: title, exact: true })).toHaveAttribute('href', href);
  }
  const ongoing = page.getByRole('region', { name: 'Ongoing research' });
  await expect(ongoing.getByRole('article')).toHaveCount(3);
  for (const [title, href] of [
    ['SmartWoundCare: AI-assisted diabetic foot assessment from colour and thermal images', '/research/diabetic-foot-thermal-imaging/'],
    ['LiPIVOT: liver and tumour segmentation across contrast-enhanced CT phases', '/research/multiphase-liver-ct/'],
  ]) {
    await expect(ongoing.getByRole('link', { name: title, exact: true })).toHaveAttribute('href', href);
  }

  await page.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page).toHaveURL('/#contact');
  const contact = page.getByRole('region', { name: 'Contact' });
  await expect(contact.getByRole('link', { name: 'sakib.mahmud@qu.edu.qa' })).toHaveAttribute('href', /^mailto:sakib\.mahmud@qu\.edu\.qa/);
  await expect(contact.getByRole('link', { name: 'Google Scholar' })).toHaveAttribute('target', '_blank');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  expect(context.pages()).toEqual([page]);
});

test('the CV highlights education and provides a navigable experience timeline on mobile', async ({ page, context }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/cv/');
  await expect(page.locator('main h2').nth(1)).toHaveText('Education');
  await expect(page.getByRole('link', { name: 'Education & coursework' })).toHaveCount(0);
  await expect(page.getByText('Print this page', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Download CV (PDF)' })).toBeVisible();
  const sections = page.getByRole('navigation', { name: 'CV sections' });
  await expect(sections.getByRole('link')).toHaveText([
    'Education', 'Experience', 'Technical skills', 'Certifications', 'Awards & distinctions', 'Languages',
  ]);
  await sections.getByRole('link', { name: 'Education', exact: true }).click();
  await expect(page).toHaveURL('/cv/#education-title');
  const msc = page.locator('#msc-electrical-engineering');
  await expect(msc.getByText('CGPA 3.31 / 4.00')).toBeVisible();
  await expect(msc.getByText('Applied Statistical Analysis')).toBeVisible();
  await expect(msc.locator('.cv-course-list li')).toHaveCount(8);
  await expect(msc.getByRole('link', { name: 'Deep Learning Techniques for Kidney Disease Detection' }))
    .toHaveAttribute('href', 'https://qspace.qu.edu.qa/handle/10576/45080');
  const bsc = page.locator('#bsc-electrical-engineering');
  await expect(bsc.getByText('Artificial Neural Networks')).toBeVisible();
  await expect(bsc.locator('.cv-course-list li')).toHaveCount(20);
  for (const degree of [msc, bsc]) {
    const supervisor = degree.getByRole('link', { name: 'Muhammad E. H. Chowdhury', exact: true });
    await expect(supervisor).toHaveAttribute('href', 'https://scholar.google.com/citations?user=BrBVR_UAAAAJ&hl=en');
    await expect(supervisor).toHaveAttribute('target', '_blank');
  }

  await sections.getByRole('link', { name: 'Experience', exact: true }).click();
  await expect(page).toHaveURL('/cv/#positions-title');
  const experience = page.getByRole('region', { name: 'Research and professional experience' });
  await expect(experience.getByRole('article')).toHaveCount(12);
  await expect(experience.getByRole('heading', { name: 'Administrative Assistant', exact: true })).toBeVisible();
  await expect(experience.getByRole('heading', { name: 'Earlier internships and apprenticeships' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Selected research contributions' })).toHaveCount(0);

  await sections.getByRole('link', { name: 'Certifications', exact: true }).click();
  await expect(page).toHaveURL('/cv/#certifications-title');
  const credentials = page.getByRole('region', { name: 'Certifications & specializations' });
  await expect(credentials.getByRole('listitem')).toHaveCount(9);
  await expect(credentials.getByRole('link')).toHaveCount(8);
  await expect(credentials.locator('a[target="_blank"][rel="noopener"]')).toHaveCount(8);
  await expect(credentials.getByRole('link', { name: 'Google Data Analytics Professional Certificate', exact: true }))
    .toHaveAttribute('href', 'https://coursera.org/verify/professional-cert/ZFM267WNWX6N');
  await expect(credentials.getByText('Azure Fundamentals (AZ-900), Azure Data Fundamentals (DP-900), and Azure AI Fundamentals (AI-900)')).toBeVisible();
  await expect(page.getByRole('region', { name: 'Technical skills' }).getByRole('listitem')).toHaveCount(9);
  await expect(page.getByRole('region', { name: 'Awards & distinctions' }).getByRole('listitem')).toHaveCount(8);
  await expect(page.getByRole('region', { name: 'Languages' }).getByText('Limited working proficiency')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  expect(context.pages()).toEqual([page]);
});

test('the publications page downloads the complete BibTeX file', async ({ page }) => {
  await page.goto('/publications/');
  const downloaded = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download all publications (BibTeX)' }).click();
  const file = await downloaded;
  expect(file.suggestedFilename()).toBe('publications.bib');
  const downloadStream = await file.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of downloadStream) chunks.push(chunk);
  const bibliography = Buffer.concat(chunks).toString('utf8');
  expect(bibliography.match(/^@\w+\{/gm)).toHaveLength(61);
  expect(bibliography).toContain('isbn = {978-981-97-3302-6}');
  expect(bibliography).toContain('editor = {Yang, Xin-She and Sherratt, Simon and Dey, Nilanjan and Joshi, Amit}');
  expect(bibliography).toContain('eid = {130241}');
});

test('filtered BibTeX contains the exact visible result set', async ({ page }) => {
  await page.goto('/publications/?topic=imaging&author=first&sort=newest#bibliography');
  const filtered = page.getByRole('button', { name: 'Download filtered results (BibTeX)' });
  await expect(filtered).toBeEnabled();
  await expect(page.getByRole('heading', { name: 'Newest by issue date' })).toBeVisible();
  const rows = await page.locator('[data-publication]:visible').evaluateAll(matches =>
    matches.map(match => (match as HTMLElement).dataset.doi),
  );
  expect(rows.length).toBeGreaterThan(0);
  expect(rows.length).toBeLessThan(61);
  const event = page.waitForEvent('download');
  await filtered.click();
  const download = await event;
  expect(download.suggestedFilename()).toBe('publications-filtered.bib');
  const contents = readFileSync((await download.path())!, 'utf8');
  expect([...contents.matchAll(/^  doi = \{([^}]+)\},$/gm)].map(match => match[1])).toEqual(rows);
  await page.getByRole('searchbox', { name: 'Search' }).fill('xyzy-no-paper-here');
  await expect(filtered).toBeHidden();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(filtered).toBeHidden();
});

test('publication topics and selected filters remain shareable', async ({ page }) => {
  await page.goto('/publications/');
  await expect(page.getByRole('navigation', { name: 'Publication research areas' }).getByRole('link')).toHaveCount(6);
  await expect(page.locator('[data-publication]:visible')).toHaveCount(61);
  await page.getByRole('navigation', { name: 'Publication research areas' }).getByRole('link', { name: /medical imaging/i }).click();
  await expect(page).toHaveURL(/\?topic=imaging#cluster-imaging$/);
  await expect(page.locator('[data-publication-group]:visible')).toHaveCount(1);
  await page.getByRole('checkbox', { name: 'Selected papers only' }).check();
  await expect(page).toHaveURL(/view=selected/);
  await page.reload();
  await expect(page.getByRole('combobox', { name: 'Topic', exact: true })).toHaveValue('imaging');
  await expect(page.getByRole('checkbox', { name: 'Selected papers only' })).toBeChecked();
  await expect(page.locator('[data-publication]:visible')).toHaveCount(5);
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.locator('[data-publication]:visible')).toHaveCount(61);
  await expect(page).toHaveURL('/publications/#bibliography');

  await page.goto('/publications/?view=selected');
  await expect(page.locator('[data-publication]:visible')).toHaveCount(10);
});

test('a paper link wins over an incompatible filter', async ({ page }) => {
  await page.goto(`/publications/?topic=imaging#${paperId}`);
  await expect(page.locator(`#${paperId}`)).toBeVisible();
  await expect(page).toHaveURL(`/publications/#${paperId}`);
});

test('publication search accepts pasted DOIs and punctuation in ordinary searches', async ({ page }) => {
  await page.goto('/publications/');
  const search = page.getByRole('searchbox', { name: 'Search', exact: true });
  const results = page.locator('[data-publication]:visible');
  for (const query of [
    '10.1109/JBHI.2025.3605296',
    ' DOI: 10.1109/JBHI.2025.3605296. ',
    'https://dx.doi.org/10.1109%2FJBHI.2025.3605296?ref=profile',
  ]) {
    await search.fill(query);
    await expect(results).toHaveCount(1);
    await expect(results).toHaveAttribute('id', paperId);
  }
  await search.fill('  KIDNEY–STONE,   SEGMENTATION  ');
  await expect(results).toHaveCount(1);
  await expect(results).toHaveAttribute('id', 'paper-10-1016-j-bspc-2026-109894');
  await search.press('Enter');
  await expect(results).toHaveCount(1);
  await search.fill('   ');
  await expect(results).toHaveCount(61);
  expect(new URL(page.url()).searchParams.has('query')).toBe(false);
});

test('publication facets combine with search and restore on back and forward', async ({ page }) => {
  await page.goto('/publications/');
  const search = page.getByRole('searchbox', { name: 'Search', exact: true });
  const topic = page.getByRole('combobox', { name: 'Topic', exact: true });
  const year = page.getByRole('combobox', { name: 'Issue year', exact: true });
  const type = page.getByRole('combobox', { name: 'Type', exact: true });
  const selected = page.getByRole('checkbox', { name: 'Selected papers only' });
  const results = page.locator('[data-publication]:visible');
  const empty = page.locator('[data-publication-empty]');

  await topic.selectOption('biomechanics');
  await type.selectOption('Journal article');
  await selected.check();
  await year.selectOption('2026');
  await search.fill('https://doi.org/10.1109/jbhi.2025.3605296');
  await expect(results).toHaveAttribute('id', paperId);
  await year.selectOption('2025');
  await expect(results).toHaveCount(0);
  await expect(page.locator('[data-publication-group]:visible')).toHaveCount(0);
  await expect(page.locator('[data-publication-count]')).toHaveText('0 of 61 publications');
  await expect(empty).toBeVisible();

  await page.goBack();
  await expect(year).toHaveValue('2026');
  await expect(topic).toHaveValue('biomechanics');
  await expect(type).toHaveValue('Journal article');
  await expect(selected).toBeChecked();
  await expect(results).toHaveAttribute('id', paperId);
  await page.goForward();
  await expect(year).toHaveValue('2025');
  await expect(empty).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(search).toHaveValue('');
  await expect(selected).not.toBeChecked();
  await expect(empty).toBeHidden();
  await expect(results).toHaveCount(61);
  await expect(page).toHaveURL('/publications/');
});

test('shared publication links handle invalid filters and hidden topic anchors', async ({ page }) => {
  await page.goto('/publications/?topic=biomechanics&topic=imaging&year=never&type=unknown&view=other&ref=cv#cluster-imaging');
  await expect(page).toHaveURL('/publications/?topic=biomechanics&ref=cv#bibliography');
  await expect(page.getByRole('combobox', { name: 'Topic', exact: true })).toHaveValue('biomechanics');
  await expect(page.getByRole('combobox', { name: 'Issue year', exact: true })).toHaveValue('');
  await expect(page.getByRole('combobox', { name: 'Type', exact: true })).toHaveValue('');
  await expect(page.getByRole('checkbox', { name: 'Selected papers only' })).not.toBeChecked();
  await expect(page.locator('[data-publication]:visible')).toHaveCount(7);
  await expect(page.locator('#cluster-biomechanics')).toBeVisible();
});

test('the publication list fits a narrow screen and can search contributions', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/publications/');
  await expect(page.getByRole('navigation', { name: 'Research profiles' }).getByRole('link')).toHaveCount(5);
  await expect(page.locator('[data-publication] .publication-summary')).toHaveCount(61);
  await expect(page.locator('[data-publication] .publication-contribution')).toHaveCount(61);
  await expect(page.locator(`#${paperId} .journal-metrics`)).toContainText('Q1');
  await expect(page.locator(`#${paperId} .journal-metrics`)).toContainText('Impact Factor 7.7');
  await expect(page.locator('[data-type="Conference paper"] .journal-metrics')).toHaveCount(0);
  await expect(page.getByText(/OpenAlex/)).toHaveCount(0);
  await page.getByRole('searchbox', { name: 'Search', exact: true }).fill('Arduino control code');
  await expect(page.locator('[data-publication]:visible')).toHaveCount(1);
  const paper = page.locator('[data-publication]:visible');
  await expect(paper.locator('.publication-contribution')).toBeHidden();
  await paper.getByText('My contribution', { exact: true }).click();
  await expect(paper.locator('.publication-contribution')).toContainText('Arduino control code');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
});

test('first-author and cross-topic date views combine and retain a single copy of each paper', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/publications/');
  const filters = page.getByRole('form', { name: 'Filter publications' });
  await expect(filters.getByRole('combobox', { name: 'Topic' })).toBeHidden();
  await filters.getByText('More filters', { exact: true }).click();
  await expect(filters.getByRole('combobox', { name: 'Topic' })).toBeVisible();
  await filters.getByRole('checkbox', { name: 'First author only' }).check();
  await expect(page.locator('[data-publication]:visible')).toHaveCount(16);
  await filters.getByRole('combobox', { name: 'Display order' }).selectOption('newest');
  await expect(page).toHaveURL(/author=first&sort=newest|sort=newest&author=first/);
  await page.reload();
  await expect(page.locator('[data-publication-chronological] [data-publication]:visible')).toHaveCount(16);
  const years = await page.locator('[data-publication]:visible').evaluateAll(rows => rows.map(row => Number(row.getAttribute('data-year'))));
  expect(years).toEqual([...years].sort((left, right) => right - left));
  await expect(page.locator('[data-publication]')).toHaveCount(61);
  await filters.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.locator('[data-publication-group]:visible')).toHaveCount(6);
  await expect(page.locator('[data-publication]:visible')).toHaveCount(61);
});

test.describe('publication navigation without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('a topic link lands on its own group', async ({ page }) => {
    await page.goto('/publications/');
    await page.getByRole('navigation', { name: 'Publication research areas' }).getByRole('link', { name: /medical imaging/i }).click();
    await expect(page).toHaveURL(/#cluster-imaging$/);
    await expect(page.locator('#cluster-imaging')).toBeInViewport();
    const paper = page.locator('#paper-10-1016-j-bspc-2026-109894');
    await expect(paper.locator('.publication-contribution')).toContainText('feature-transfer');
    await expect(paper.locator('.publication-contribution')).toBeVisible();
  });
});
