import gender from '../assets/research/vaccine-attitudes-analysis/fig5-gender.png';
import age from '../assets/research/vaccine-attitudes-analysis/fig6-age.png';
import classifiers from '../assets/research/vaccine-attitudes-analysis/fig11-classifiers.png';
import knnNeighbours from '../assets/research/vaccine-attitudes-analysis/fig12-knn-neighbours.png';
import rocConfusion from '../assets/research/vaccine-attitudes-analysis/fig13-roc-confusion.png';
import topFeatures from '../assets/research/vaccine-attitudes-analysis/fig15-top-features.png';
import { ccByNcNd, sourceArticle } from './figure-credits';
import type { ResearchPhase, ResearchProject } from './research';

const vaccineDoi = '10.1080/10911359.2021.1973642';
const credit = sourceArticle(vaccineDoi);
const licence = ccByNcNd;

export const vaccineAttitudesVisual: NonNullable<ResearchProject['visual']> = {
  image: classifiers,
  alt: 'Four bar charts comparing twelve classifiers under five-fold cross-validation. K-nearest neighbours leads on accuracy (80.00%), precision (81.07%), recall (84.43%) and F1 score (80.26%). Random forest, extra trees and XGBoost follow on accuracy and precision but have recall near or below 52%. AdaBoost scores lowest on every metric.',
  caption: 'Figure 11 from Hafizh et al. (2021). Testing (a) accuracy, (b) precision, (c) recall and (d) F1 score of twelve classifiers for the four attitude classes, averaged over five folds.',
  credit,
  licence,
};

export const vaccineAttitudesProgress: ResearchPhase[] = [
  {
    id: 'survey',
    navLabel: 'Survey',
    title: 'Surveying residents of Qatar',
    status: 'Journal of Human Behavior in the Social Environment · 2022',
    paragraphs: [
      'A short pilot with three participants and open-ended questions shaped the survey. A high health risk and the wish to travel favoured vaccination, while unknown long-term side effects held people back. One participant wanted clearer public information and to see leaders vaccinated first.',
      'The main survey ran on Google Forms in English and Arabic, took 5 to 10 minutes and collected no identifying information. It asked about background, willingness and hesitancy on seven-point scales, and beliefs about past vaccines, religion, public figures, restrictions and the Ehteraz contact-tracing app. Of 175 respondents, 59 (33.71%) had already been vaccinated.',
      'Willingness and hesitancy scores above 3 counted as willing or hesitant. Combining the two gave four attitude classes: willing and not hesitant, willing but hesitant, not willing and hesitant, and not willing and not hesitant.',
    ],
    measures: [
      { value: '175', label: 'Respondents' },
      { value: '33.71%', label: 'Already vaccinated' },
      { value: '19', label: 'Survey answers used as predictors' },
    ],
    table: {
      caption: 'Weighted mean response on the seven-point scale, by vaccination status. From Table 2 of the paper.',
      columns: ['Vaccinated', 'Not vaccinated'],
      rows: [
        { label: 'I am willing to take the vaccine', cells: ['7', '5'] },
        { label: 'I have some doubts or hesitations about taking the vaccine', cells: ['4', '3'] },
        { label: 'Past vaccines make me concerned about the COVID-19 vaccine', cells: ['3', '3'] },
        { label: 'Taking the vaccine should be a personal choice if I follow safety procedures', cells: ['6', '6'] },
        { label: 'Seeing public figures take the vaccine increases my willingness', cells: ['5', '4'] },
        { label: 'My religious background makes me unwilling to take the vaccine', cells: ['2', '2'] },
        { label: 'More willing if lockdown restrictions are reduced', cells: ['6', '5'] },
        { label: 'More willing if Ehteraz shows a special colour for vaccinated people', cells: ['6', '4'] },
        { label: 'More willing if I no longer have to use Ehteraz', cells: ['6', '4'] },
        { label: 'More willing if I avoid home quarantine after travelling', cells: ['7', '5'] },
      ],
    },
  },
  {
    id: 'group-differences',
    navLabel: 'Group differences',
    title: 'Comparing attitudes across groups',
    status: 'Descriptive statistics, ANOVA and t-tests',
    paragraphs: [
      'Willingness was high and hesitancy low for both women and men, and two-way ANOVA found no significant difference between them at the 95% confidence level. Younger respondents were the most willing and least hesitant.',
      'Splitting respondents at age 45 showed that willingness differed significantly between those aged 18 to 44 and those 45 and over (two-tailed p < 0.001), while hesitancy did not (p = 0.87). Past flu vaccination showed no significant interaction with attitude, and religious affiliation was not linked to hesitancy.',
      'These tests look at one factor at a time and cannot rank how much each answer contributes. That question was taken up with machine learning and dominance analysis.',
    ],
    measures: [
      { value: 'p < 0.001', label: 'Willingness, ages 18–44 vs 45 and over' },
      { value: 'p = 0.87', label: 'Hesitancy, same age groups' },
      { value: '95%', label: 'Confidence level for all tests' },
    ],
    figures: [
      {
        image: gender,
        alt: 'Two grouped bar charts of the share of respondents at each level from 1 to 7, for women and men. Willingness peaks at level 7, with 23.43% for each gender. Hesitancy peaks at level 1, with 17.14% of women and 16.00% of men.',
        caption: 'Figure 5 from Hafizh et al. (2021). (a) Willingness and (b) hesitancy levels for women and men.',
        credit,
        licence,
      },
      {
        image: age,
        alt: 'Two grouped bar charts of the share of respondents at each level from 1 to 7, for five age groups from 18–24 to 55 and over. Willingness is concentrated at level 7 in every group, highest for ages 35–44 at 12.00%. Hesitancy is most common at level 1, led by ages 18–24 at 8.00%.',
        caption: 'Figure 6 from Hafizh et al. (2021). (a) Willingness and (b) hesitancy levels by age group.',
        credit,
        licence,
      },
    ],
  },
  {
    id: 'prediction',
    navLabel: 'Prediction',
    title: 'Predicting attitude from survey answers',
    status: 'Machine learning',
    paragraphs: [
      'The 19 answers were encoded as 68 dummy variables, and twelve classifiers were compared in Python with five-fold cross-validation and an 80:20 split. The task was to predict each respondent\'s attitude class. Ensemble and tree-based methods were the most stable, and random forest gave the lowest mean absolute error, 0.2057.',
      'K-nearest neighbours had the best average across the four testing metrics, with 80.00% accuracy and 84.43% recall, while many other models had much lower recall. It worked best with two neighbours, which suggests the responses do not form large clusters.',
      'Predicting the seven-level scores directly was harder, and hesitancy was harder to predict than willingness. Random forest again performed best, with a mean absolute error of 0.35 for willingness and 0.71 for hesitancy.',
    ],
    measures: [
      { value: '80.00%', label: 'Accuracy with k-nearest neighbours' },
      { value: '12', label: 'Classifiers compared' },
      { value: '0.2057', label: 'Lowest mean absolute error (random forest)' },
    ],
    table: {
      caption: 'Testing results for selected classifiers, averaged over five folds (%). Values from Figure 11 of the paper.',
      columns: ['Accuracy', 'Precision', 'Recall', 'F1 score'],
      rows: [
        { label: 'K-nearest neighbours', cells: ['80.00', '81.07', '84.43', '80.26'] },
        { label: 'Random forest', cells: ['77.71', '77.78', '52.17', '77.39'] },
        { label: 'Extra trees', cells: ['76.57', '76.80', '51.61', '76.19'] },
        { label: 'XGBoost', cells: ['74.29', '78.71', '37.29', '76.09'] },
        { label: 'Multilayer perceptron', cells: ['71.43', '75.31', '78.33', '72.61'] },
        { label: 'Logistic regression', cells: ['65.71', '69.46', '73.61', '66.84'] },
      ],
    },
    figures: [
      {
        image: knnNeighbours,
        alt: 'Line chart with a data table of k-nearest-neighbour accuracy, precision, recall and F1 score for 1 to 11 neighbours. All four metrics peak at two neighbours, with accuracy 0.8286, precision 0.8579, recall 0.8389 and F1 score 0.8317, then fall as more neighbours are used. Recall drops most, to about 0.35 to 0.50.',
        caption: 'Figure 12 from Hafizh et al. (2021). Performance of k-nearest neighbours for 1 to 11 neighbours.',
        credit,
        licence,
      },
      {
        image: rocConfusion,
        alt: 'Left: multi-class ROC curves for k-nearest neighbours, with areas of 0.84 for the micro average, 0.77 for class 0, 0.54 for class 1 and 1.00 for class 2; class 3 has no curve. Right: confusion matrices for k-nearest neighbours with two neighbours, which correctly classifies 22, 6 and 1 respondents in classes 0 to 2, and for XGBoost, which correctly classifies 19 and 7 in classes 0 and 1.',
        caption: 'Figure 13 from Hafizh et al. (2021). (a) Multi-class ROC curves for k-nearest neighbours; confusion matrices for (b) k-nearest neighbours with two neighbours and (c) XGBoost.',
        credit,
        licence,
      },
    ],
  },
  {
    id: 'key-factors',
    navLabel: 'Key factors',
    title: 'Ranking what drives willingness and hesitancy',
    status: 'Dominance analysis',
    paragraphs: [
      'Dominance analysis measured how much each answer explains, on its own, alongside all others and across subsets of them, and ranked the top 15 answers for willingness and for hesitancy.',
      'Willingness was driven most by practical gains: avoiding home quarantine after travel, fewer lockdown restrictions and a special Ehteraz colour for vaccinated people, followed by seeing public figures vaccinated. Hesitancy was swayed most by seeing public figures vaccinated, followed by whether respondents had been vaccinated in Qatar, the view that vaccination should be a personal choice, and sex. Only a few of the many questions carried most of the weight.',
      'Retraining on only the ten top-ranked answers lowered the willingness error for several models, including gradient boosting (0.53 to 0.31) and random forest (0.35 to 0.31).',
    ],
    measures: [
      { value: '23.4%', label: 'Relative importance of avoiding quarantine for willingness' },
      { value: '31.1%', label: 'Relative importance of public figures for hesitancy' },
      { value: '15', label: 'Top factors ranked for each attitude' },
    ],
    table: {
      caption: 'Top four factors from dominance analysis, with relative importance. From the dominance analysis tables in the paper.',
      columns: ['Willingness', 'Hesitancy'],
      rows: [
        { label: '1', cells: ['Avoiding home quarantine after travel (23.4%)', 'Seeing public figures vaccinated (31.1%)'] },
        { label: '2', cells: ['Fewer lockdown restrictions (14.1%)', 'Whether vaccinated in Qatar (13.5%)'] },
        { label: '3', cells: ['Special Ehteraz colour for vaccinated people (13.8%)', 'Vaccination as a personal choice (10.6%)'] },
        { label: '4', cells: ['Seeing public figures vaccinated (12.1%)', 'Biological sex (8.2%)'] },
      ],
    },
    figures: [
      {
        image: topFeatures,
        alt: 'Two grouped bar charts of mean absolute error for twelve classifiers using all answers or only the ten top-ranked answers. For willingness, the top-ten version lowers error for several models, such as gradient boosting from 0.53 to 0.31, random forest from 0.35 to 0.31 and XGBoost from 0.71 to 0.49. For hesitancy, errors are higher overall and change in both directions.',
        caption: 'Figure 15 from Hafizh et al. (2021). Mean absolute error with all answers and with the ten top-ranked answers, for (a) willingness and (b) hesitancy.',
        credit,
        licence,
      },
    ],
  },
];
