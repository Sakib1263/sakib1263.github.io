import hourlyConsumption from '../assets/research/ev-charging-demand/hourly-consumption.png';
import consumptionProfiles from '../assets/research/ev-charging-demand/consumption-profiles.png';
import eveningPeaks from '../assets/research/ev-charging-demand/evening-peaks.png';
import chargingDashboard from '../assets/research/ev-charging-demand/charging-dashboard.png';
import type { ResearchPhase, ResearchProject } from './research';

const finalReport = { label: 'Omdena EnergyHub team, final report (2022)' };
const finalPresentation = { label: 'Omdena EnergyHub team, final presentation (2022)' };

export const evChargingVisual: NonNullable<ResearchProject['visual']> = {
  image: hourlyConsumption,
  alt: 'Bar chart of average half-hourly consumption by hour of day for households without (blue) and with (orange) an electric vehicle. Households with a vehicle use more at every hour, rising from about 0.25 kWh overnight lows to about 0.57 kWh at 19:00 and 20:00, compared with about 0.33 kWh at the evening peak for other households.',
  caption: 'Average consumption by hour of day for households without (0) and with (1) an electric vehicle. From the team’s final report.',
  credit: finalReport,
};

export const evChargingProgress: ResearchPhase[] = [
  {
    id: 'resources',
    navLabel: 'Resources',
    title: 'Building a shared evidence base',
    status: 'Task co-lead',
    paragraphs: [
      'Before modelling, the team needed a shared picture of how charging had been detected from meter data in earlier work. I co-led the resources task, which collected published studies and data sources in a shared library with short summaries.',
      'By the third week the library listed 25 published studies, including work on detecting charging from hourly smart-meter data and on machine learning for charging-infrastructure planning. References were sorted into essential and supporting reading so the other task teams knew where to start, and open datasets used in earlier studies were noted for further exploration.',
    ],
  },
  {
    id: 'data-exploration',
    navLabel: 'Data exploration',
    title: 'Comparing households with and without electric vehicles',
    status: 'Team analysis',
    paragraphs: [
      'The partner data covered about 14 months of half-hourly consumption, five-minute power-quality measurements and a list of households with electric vehicles, including their car models. The team merged consumption and power-quality data at a common half-hourly resolution, checked data quality and engineered summary features.',
      'Households with an electric vehicle used more electricity at every hour on average, and almost twice as much as other households between 18:00 and 05:00, which fits charging after work and overnight. Consumption also rose in winter, from May to October. When households were grouped by consumption quartile, 58% of those with a vehicle fell in the highest group, compared with 20% of other households.',
      'Not every night-time spike pointed to a vehicle. About 15% of households showed a sharp peak at 23:00 or midnight, which moved by an hour with daylight saving. The partner suggested timed hot-water systems as the likely cause. Most households with a vehicle had fewer than 50 such peaks a year, whereas the hot-water group had roughly 100 to 300, so these regular peaks could be separated from charging.',
    ],
    measures: [
      { value: '5.6%', label: 'Households with an electric vehicle' },
      { value: 'Almost 2×', label: 'Use by vehicle households between 18:00 and 05:00' },
      { value: '93%', label: 'Vehicle households in the medium or high consumption groups' },
    ],
    table: {
      caption: 'Household groups identified in the exploratory analysis, from the team’s final report.',
      columns: ['Share of households', 'What the analysis showed'],
      rows: [
        { label: 'Electric vehicle owners', cells: ['5.6%', 'Higher use at every hour, especially from 18:00 to 05:00'] },
        { label: 'Regular late-night peaks', cells: ['15.3%', 'Fixed-time peaks most likely from hot-water systems rather than charging'] },
        { label: 'Electricity generators', cells: ['15.5%', 'Produced electricity at some point in the period'] },
        { label: 'Long periods without consumption', cells: ['6.5%', 'Not explained by holiday or weekend-only use'] },
      ],
    },
    figures: [
      {
        image: consumptionProfiles,
        alt: 'Grouped bar chart of the percentage of households in low, medium and high consumption groups. Without a vehicle: about 23% low, 56% medium and 20% high. With a vehicle: about 7% low, 35% medium and 58% high.',
        caption: 'Share of households without (0) and with (1) an electric vehicle in each consumption group. Low is the first quartile, high the fourth and medium the range between. From the team’s final report.',
        credit: finalReport,
      },
      {
        image: eveningPeaks,
        alt: 'Two histograms of how many late-evening consumption peaks each household had in a year, with a zoomed lower panel. Households with a vehicle (orange) all have fewer than about 60 peaks, while a separate group of households without a vehicle (green) has between about 80 and 290 peaks, clustering near 170 to 180.',
        caption: 'Number of consumption peaks at 23:00 or midnight per household in one year, for households without (0) and with (1) an electric vehicle. The lower panel zooms in on the upper one. From the team’s final report.',
        credit: finalReport,
      },
    ],
  },
  {
    id: 'charging-detection',
    navLabel: 'Charging detection',
    title: 'Flagging likely charging periods',
    status: 'Delivered to project partners · February 2022',
    paragraphs: [
      'For households with electric vehicles, a clustering approach grouped half-hourly readings into low, medium and high consumption. It used three features: energy use, its rolling three-hour average, and current from the meter. Spikes in both consumption and current were flagged as likely charging.',
      'The results were delivered as a flat file with a cluster and charging flag for every half-hour of each vehicle household, and as an Excel dashboard that filters by meter, vehicle make and model, month and day. In one example household, charging was flagged for about three and a half hours in the early evening, when consumption rose to about 4 kWh per half-hour.',
      'The approach finds consumption spikes but cannot confirm on its own that a vehicle caused them. Grouping households by summary statistics was also tried but was not conclusive. The team proposed follow-on work to identify households with electric vehicles, estimate charging power and recognise vehicle types.',
    ],
    measures: [
      { value: '3', label: 'Consumption clusters: low, medium and high' },
      { value: '3', label: 'Input features per half-hour' },
    ],
    table: {
      caption: 'Main outputs of the challenge and their purpose.',
      columns: ['Purpose'],
      rows: [
        { label: 'Resources library', cells: ['Gives every task team a common set of studies and data sources'] },
        { label: 'Merged dataset', cells: ['Aligns consumption and power-quality measurements at half-hourly resolution'] },
        { label: 'Clustering model', cells: ['Flags consumption and current spikes that suggest charging'] },
        { label: 'Flat file and Excel dashboard', cells: ['Let network operators review flagged periods by meter, vehicle and date'] },
      ],
    },
    figures: [
      {
        image: chargingDashboard,
        alt: 'Line chart of one household’s half-hourly consumption over a day, with a second line for the charging flag. Consumption stays below about 1.3 kWh until late afternoon, jumps to about 4 kWh for about three and a half hours while the flag is 1, then falls back below 1 kWh.',
        caption: 'Dashboard view for one household with an electric vehicle on a day in October: half-hourly consumption in kWh (blue) and the charging flag (orange). From the team’s final presentation, cropped to remove the meter ID and filter settings.',
        credit: finalPresentation,
      },
    ],
  },
];
