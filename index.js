import { rawNewsData } from './fixtures';
import { containerClass, newsItemClass, newsImageClass } from './style.css';

const newsAPIkey = 'c66d33daf75d4760b60252aef3f48983';
const NUMBER_OF_SHOWED_NEWS_ITEMS = 12;

if (module.hot) {
  module.hot.accept();
}

window.dataStore = {
  news: rawNewsData,
  newsItemsToShow: NUMBER_OF_SHOWED_NEWS_ITEMS,
  filterWord: '',
};

window.renderApp = renderApp;
renderApp();

function renderApp() {
  document.querySelector('.root').innerHTML = `
    ${app()}
  `;
}

function app() {
  return `
    ${filter(dataStore)}
    <div class="${containerClass}">
      ${newsList(dataStore)}
    </div>
  `;
}

function filterHandler({ title, content }, filterWord) {
  if (
    filterWord != '' &&
    (content.toLowerCase().includes(filterWord.toLowerCase()) ||
      title.toLowerCase().includes(filterWord.toLowerCase()))
  ) {
    return true;
  }
  if (filterWord == '') return true;

  return false;
}

function newsList({ news, newsItemsToShow, filterWord }) {
  const list = news.articles
    .filter(article => filterHandler(article, filterWord))
    .splice(0, newsItemsToShow);
  let resultHTML = '';
  list.forEach(
    article =>
      (resultHTML += `
        ${newsItem(article)}
    `),
  );
  return resultHTML;
}

function newsItem({ title, urlToImage, content, url }) {
  return `
    <div class="${newsItemClass}">
      <h3>${title}</h3>
      ${urlToImage ? `<img class="${newsImageClass}" src="${urlToImage}"/>` : ''}      
      <p>${content}</p>
      Source is here <a target="_blank" href="${url}">${url}</a>
    </div>
  `;
}

function handleFilterChange({ value }) {
  window.dataStore.filterWord = value;
  window.renderApp();
}

function filter({ filterWord }) {
  return `
    <input onchange="(${handleFilterChange})(this)" value="${filterWord}" name="filter" placeholder="Enter keyword"/>
  `;
}
