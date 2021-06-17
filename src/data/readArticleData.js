import { REFRESH_DELAY_IN_MS } from '../constants';
import newLoadedDataHandler from './newLoadedDataHandler';

export default function readArticlesData(url) {
  const lastReadAt = localStorage.getItem(encodeURI(url + '-lastReadAt'));

  if (lastReadAt && Date.now() - lastReadAt < REFRESH_DELAY_IN_MS) {
    const storedArticles = JSON.parse(localStorage.getItem(encodeURI(url)));
    return Promise.resolve([...storedArticles]);
  }

  return fetch(url)
    .then(response => response.json())
    .then(data => newLoadedDataHandler(data, url));
}
