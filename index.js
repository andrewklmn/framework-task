import {
  NEWS_API_KEY,
  REFRESH_DELAY_IN_MS,
  NUMBER_OF_SHOWED_NEWS_ITEMS,
  NUMBER_OF_TOP_WORDS,
  defaultCountry,
  defaultWord,
} from './constants';

import { ResetSearchButton, TopWordsButtons, RefreshButton } from './components/buttons';
import { ErrorWindow } from './components/errorWindow';

import { filterArticleByWord } from './utils';
import { containerClass, newsItemClass, newsImageClass, contentClass } from './style.css';

import preloaderImage from './img/preloader.gif';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = {
  newsAPIkey: NEWS_API_KEY,
  newsItemsToShow: NUMBER_OF_SHOWED_NEWS_ITEMS,
  articles: [],
  country: defaultCountry,
  searchWord: defaultWord,
  filterWord: '',
  dataIsLoading: false,
  errors: null,
  lastReadAt: null,
};

window.renderApp = renderApp;
window.performSearch = performSearch;
window.validateData = validateAndLoadData;
window.filterByKeyword = filterByKeyword;

// start App with default search
performSearch();

function renderApp() {
  document.querySelector('.root').innerHTML = `
    ${App()}
  `;
}

function catchErrorInAnswer(data, url) {
  if (data.status === 'error') {
    return Promise.reject(data.message);
  }
  localStorage.setItem(encodeURI(url), JSON.stringify(data.articles));
  localStorage.setItem(encodeURI(url + '-lastReadAt'), Date.now());
  return data.articles;
}

function readArticlesData(url) {
  /* load time of last reading from NewsAPI */
  const lastReadAt = localStorage.getItem(encodeURI(url + '-lastReadAt'));

  if (lastReadAt && Date.now() - lastReadAt < REFRESH_DELAY_IN_MS) {
    /* load cached data from localStorage */
    const storedArticles = JSON.parse(localStorage.getItem(encodeURI(url)));
    return Promise.resolve([...storedArticles]);
  } else {
    /* fetch new data from NewsAPI */
    return fetch(url)
      .then(response => response.json())
      .then(data => catchErrorInAnswer(data, url));
  }
}

function validateAndLoadData() {
  const { country, searchWord, newsAPIkey } = window.dataStore;

  let url = `https://litos.kiev.ua/top_news_gate.php?country=${country}&apiKey=${newsAPIkey}`;
  if (!searchWord || searchWord === '') {
    // if no search word was added
    window.dataStore.searchWord = '';
    return readArticlesData(url);
  }
  url = `https://litos.kiev.ua/news_gate.php?q=${encodeURI(searchWord)}&apiKey=${newsAPIkey}`;
  return readArticlesData(url);
}

function performSearch(word) {
  if (window.dataStore.dataIsLoading) return;

  window.dataStore.articles = [];
  window.dataStore.searchWord = word;
  window.dataStore.dataIsLoading = true;
  window.dataStore.error = null;
  window.dataStore.filterWord = '';

  renderApp();
  setTimeout(() => {
    validateAndLoadData()
      .then(data => {
        window.dataStore.articles = data;
      })
      .catch(error => (window.dataStore.error = error))
      .finally(() => {
        window.dataStore.dataIsLoading = false;
        window.renderApp();
      });
  }, 1000);
}

function filterByKeyword(word) {
  window.dataStore.filterWord = word;
  renderApp();
}

function GivenDataArea(dataStore) {
  return `
    <div class="${contentClass}">
      ${SearchField(dataStore)}
      ${RefreshButton()}
      ${ResetSearchButton()}
    </div>
  `;
}

function ResultArea(dataStore) {
  return `
    <div class="${containerClass}">
      ${TopWordsButtons(dataStore)}
    </div>
    <div class="${containerClass}">
      ${NewsList(dataStore)}
    </div>
  `;
}

function App() {
  const { dataIsLoading, error } = window.dataStore;
  const content = dataIsLoading ? Preloader() : ResultArea(dataStore);

  return `
    ${GivenDataArea(dataStore)}
  
    ${error && error !== '' ? ErrorWindow(error) : content}
  `;
}

function Preloader() {
  return `
    <div class="${contentClass}" style="padding-top: 50px;">
      <img src=${preloaderImage} />
    </div>    
  `;
}

function NewsList({ articles, filterWord, newsItemsToShow }) {
  const list = articles
    .filter(article => filterArticleByWord(article, filterWord))
    .splice(0, newsItemsToShow)
    .map(article => `${NewsItem(article)}`)
    .join('');

  return `
    ${list}
  `;
}

function NewsItem({ title, urlToImage, description, url }) {
  return `
    <div class="${newsItemClass}">
      <h3>${title}</h3>
      ${urlToImage ? `<img class="${newsImageClass}" src="${urlToImage}"/>` : ''}      
      <p>${description}</p>
      <a target="_blank" href="${url}">Read more ... </a>
    </div>
  `;
}

function SearchField({ searchWord }) {
  return `
    Search by:
    <input onchange="performSearch(this.value);" value="${
      searchWord ? searchWord : ''
    }" placeholder="Enter keyword"/>
  `;
}
