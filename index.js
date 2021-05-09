import { getTopWords } from './utils';
import {
  containerClass,
  newsItemClass,
  newsImageClass,
  keywordClass,
  contentClass,
} from './style.css';

import preloaderImage from './img/preloader.gif';

const NEWS_API_KEY = process.env.SERVICE_API_KEY;
const REFRESH_DELAY_IN_MS = 1000 * 60 * 60;
const NUMBER_OF_SHOWED_NEWS_ITEMS = 12;
const NUMBER_OF_TOP_WORDS = 5;
const defaultCountry = 'gb';
const defaultWord = '';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = {
  newsAPIkey: NEWS_API_KEY,
  newsItemsToShow: NUMBER_OF_SHOWED_NEWS_ITEMS,
  articles: [],
  country: defaultCountry,
  searchWord: defaultWord,
  dataIsLoading: false,
  errors: null,
  cache: [],
  lastReadAt: null,
};

window.renderApp = renderApp;
window.performSearch = performSearch;
window.validateData = validateAndLoadData;

performSearch();

function renderApp() {
  document.querySelector('.root').innerHTML = `
    ${App()}
  `;
}

function catchErrorInAnswer(data) {
  if (data.status === 'error') {
    window.dataStore.lastReadAt = null;
    return Promise.reject(data.message);
  }
  window.dataStore.cache = [...data.articles];
  return data.articles;
}

function validateAndLoadData() {
  const { country, searchWord, newsAPIkey, lastReadAt, articles } = window.dataStore;
  if (!searchWord || searchWord === '') {
    window.dataStore.searchWord = '';
    if (lastReadAt && Date.now() - lastReadAt < REFRESH_DELAY_IN_MS) {
      return Promise.resolve([...window.dataStore.cache]);
    } else {
      window.dataStore.lastReadAt = Date.now();

      return fetch(
        `https://litos.kiev.ua/top_news_gate.php?country=${country}&apiKey=${newsAPIkey}`,
      )
        .then(response => response.json())
        .then(catchErrorInAnswer);
    }
  }

  return fetch(
    `https://litos.kiev.ua/news_gate.php?q=${encodeURI(searchWord)}&apiKey=${newsAPIkey}`,
  )
    .then(response => response.json())
    .then(catchErrorInAnswer);
}

function performSearch(word) {
  if (window.dataStore.dataIsLoading) return;

  window.dataStore.articles = [];
  window.dataStore.searchWord = word;
  window.dataStore.dataIsLoading = true;
  window.dataStore.error = null;
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

function ErrorWindow(text) {
  return `
    <div class="${contentClass}" style="color: red;">
      ${text}
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

function NewsList({ articles, newsItemsToShow }) {
  const list = articles
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

function TopWordsButtons({ articles, searchWord }) {
  if (!articles) {
    return '';
  }
  const wholeText = articles.reduce((acc, article) => {
    const { description, title } = article;
    return (acc += `${description} ${title} `);
  }, '');
  const threeWord = getTopWords(wholeText, NUMBER_OF_TOP_WORDS, searchWord);

  return `
    <div class="${contentClass}">
      Most common words in news:<br/>
      ${threeWord.map(word => `${KeyWordButton(word)}`).join('')}
    </div>
  `;
}

function KeyWordButton(word) {
  return `
    <input class="${keywordClass}" type="button" onclick="performSearch(this.value);" value="${word}"/>
  `;
}

function RefreshButton() {
  return `
    <input type="button" onclick="performSearch(window.dataStore.searchWord);" value="Refresh"/>
  `;
}

function ResetSearchButton() {
  return `
    <input type="button" onclick="performSearch('');" value="Reset search"/>
  `;
}
