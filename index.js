import { rawNewsData } from './fixtures';
import { containerClass, newsItemClass, newsImageClass } from './style.css';

const newsAPIkey = process.env.SERVICE_API_KEY;
const NUMBER_OF_SHOWED_NEWS_ITEMS = 12;
const notImportantWords = ['chars]', 'ahead'];

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
    ${App()}
  `;
}

function App() {
  return `
    ${Filter(dataStore)}
    ${ResetFilterButton()}
    ${TopThreeWordsButtons(dataStore)}
    <div class="${containerClass}">
      ${NewsList(dataStore)}
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

function NewsList({ news, newsItemsToShow, filterWord }) {
  const list = news.articles
    .filter(article => filterHandler(article, filterWord))
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

function handleFilterChange({ value }) {
  window.dataStore.filterWord = value;
  window.renderApp();
}

window.handleFilterChange = handleFilterChange;

function Filter({ filterWord }) {
  return `
    Filtered by:
    <input onchange="handleFilterChange(this);" value="${filterWord}" name="filter" placeholder="Enter keyword"/>
  `;
}

function getTopThreeWords(text) {
  let regex = '.*[a-zA-Z].*';
  if (text.match(regex)) {
    let wordMap = new Map();
    text.split(' ').forEach(word => {
      if (word) {
        word = word.toLowerCase();
        if (notImportantWords.includes(word) || word.length < 5) {
          return;
        }
        if (wordMap.has(word)) {
          let count = wordMap.get(word);
          count++;
          wordMap.set(word, count);
        } else {
          wordMap.set(word, 1);
        }
      }
    });
    const sortedWordMap = new Map([...wordMap.entries()].sort((a, b) => b[1] - a[1]));

    let result = Array.from(sortedWordMap.keys()).filter((word, index) => index < 3);
    result = result.map(res => {
      res = res.replace(/[/.,]/g, '');
      if (res !== '') {
        return res;
      }
    });
    return result.filter(res => res !== undefined);
  } else {
    return [];
  }
}

function TopThreeWordsButtons({ news, filterWord }) {
  const wholeText = news.articles.reduce((acc, article) => {
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
    <input type="button" onclick="handleFilterChange(this);" value="${word}"/>
  `;
}

function ResetFilterButton() {
  return `
    <input type="button" onclick="handleFilterChange({value: ''});" value="Reset filter"/>
  `;
}
