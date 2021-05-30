import { REFRESH_DELAY_IN_MS } from './../constants';
import newLoadedDataHandler from './newLoadedDataHandler';

export default function readArticlesData(url) {
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
      .then(data => newLoadedDataHandler(data, url));
  }
}
