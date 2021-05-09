import { getTopThreeWords, isWordInArticle } from './utils';
import { containerClass, newsItemClass, newsImageClass } from './style.css';

const NEWS_API_KEY = process.env.SERVICE_API_KEY;
const NUMBER_OF_SHOWED_NEWS_ITEMS = 12;
const defaultCountry = 'ua';
const defaultWord = 'Ukraine';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = {
  newsAPIkey: NEWS_API_KEY,
  newsItemsToShow: NUMBER_OF_SHOWED_NEWS_ITEMS,
  dataIsLoading: true,
  country: defaultCountry,
  filterWord: defaultWord,
  articles: [],
};

window.renderApp = renderApp;
window.performSearch = performSearch;
window.validateData = validateAndLoadData;

performSearch(defaultWord);

function renderApp() {
  document.querySelector('.root').innerHTML = `
    ${App()}
  `;
}

function validateAndLoadData() {
  const { defaultCountry, filterWord, newsAPIkey } = window.dataStore;
  const topNewsLink = `https://newsapi.org/v2/top-headlines?country=${defaultCountry}&apiKey=${newsAPIkey}`;
  let url;
  if (!filterWord || filterWord === '') {
    url = topNewsLink;
  } else {
    url = `https://newsapi.org/v2/everything?q=${encodeURI(filterWord)}&apiKey=${newsAPIkey}`;
  }

  return fetch(url)
    .then(response => response.json())
    .then(data => data.articles);
  //.catch(error => {throw new Error(errot)});
}

function performSearch(word) {
  window.dataStore.filterWord = word.trim();

  validateAndLoadData()
    .then(data => {
      // eslint-disable-next-line no-console
      console.log('DATA = ' + JSON.stringify(data));
      window.dataStore.articles = data;
    })
    //.catch(error => console.log)
    .finally(window.renderApp);
}

function GivenDataArea(dataStore) {
  return `
    ${SearchField(dataStore)}
    ${ResetSearchButton()}
  `;
}

function ResultArea(dataStore) {
  return `
    ${TopThreeWordsButtons(dataStore)}
    <div class="${containerClass}">
      ${NewsList(dataStore)}
    </div>
  `;
}

// initial state
// data loading state
// result state
// error state

function App() {
  return `
    ${GivenDataArea(dataStore)}
    ${ResultArea(dataStore)}
  `;
}

function NewsList({ articles, newsItemsToShow, filterWord }) {
  const list = articles
    //.filter(article => isWordInArticle(article, filterWord))
    .splice(0, newsItemsToShow)
    .map(article => `${NewsItem(article)}`)
    .join('');

  return `
    ${list}
  `;
}

function NewsItem({ title, urlToImage, content, url }) {
  return `
    <div class="${newsItemClass}">
      <h3>${title}</h3>
      ${urlToImage ? `<img class="${newsImageClass}" src="${urlToImage}"/>` : ''}      
      <p>${content}</p>
      Source is here <a target="_blank" href="${url}">${url}</a>
    </div>
  `;
}

function SearchField({ filterWord }) {
  return `
    Filtered by:
    <input onchange="performSearch(this.value);" value="${filterWord}" name="filter" placeholder="Enter keyword"/>
  `;
}

function TopThreeWordsButtons({ articles, filterWord }) {
  if (!articles) {
    return '';
  }
  const wholeText = articles.reduce((acc, article) => {
    const { content, title } = article;
    return (acc += `${content} ${title} `);
  }, '');
  const threeWord = getTopThreeWords(wholeText);

  return `
    <span>
      Most common words in news:
      ${threeWord.map(word => `${KeyWordButton(word)}`).join('')}
    </span>
  `;
}

function KeyWordButton(word) {
  return `
    <input type="button" onclick="performSearch(this.value);" value="${word}"/>
  `;
}

function ResetSearchButton() {
  return `
    <input type="button" onclick="performSearch('');" value="Reset filter"/>
  `;
}
