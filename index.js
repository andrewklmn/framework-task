import { rawNewsData } from './fixtures';

const newsAPIkey = 'c66d33daf75d4760b60252aef3f48983';
const NUMBER_OF_SHOWED_NEWS_ITEMS = 10;

if (module.hot) {
  module.hot.accept();
}

window.dataStore = {
  news: rawNewsData,
  newsItemShow: NUMBER_OF_SHOWED_NEWS_ITEMS,
};

window.renderApp = renderApp;
renderApp();

function renderApp() {
  document.querySelector('.root').innerHTML = `
        ${app()}
    `;
}

function app() {
  return `<div class="container">
  ${newsList(dataStore)}
</div>`;
}

function newsList({ news, newsItemShow }) {
  return news.articles.splice(0, newsItemShow).reduce((acc, currentArticle) => {
    return (acc += `
      <div class="news-item">
        <h3>${currentArticle.title}</h3>
        <img class="news-img" src="${currentArticle.urlToImage}"/>
        <p>${currentArticle.content}</p>
        Source is here <a target="_blank" href="${currentArticle.url}">${currentArticle.url}</a>
      </div>
    `);
  }, '');
}
