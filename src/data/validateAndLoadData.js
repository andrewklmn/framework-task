const GATE_URL = `https://litos.kiev.ua/api_gate.php`;
const URL_FOR_TOP_NEWS = 'https://newsapi.org/v2/top-headlines';
const URL_FOR_SEARCH_IN_NEWS = 'https://newsapi.org/v2/everything';

import { prepareUrlForFetch } from './../utils';
import readArticlesData from './readArticleData';

export function validateAndLoadData() {
  const { country, searchWord, newsAPIkey } = window.dataStore;

  if (!searchWord || searchWord === '') {
    // if no search word was added
    window.dataStore.searchWord = '';

    return readArticlesData(
      prepareUrlForFetch(GATE_URL, {
        url: URL_FOR_TOP_NEWS,
        country,
        apiKey: newsAPIkey,
      }),
    );
  }

  return readArticlesData(
    prepareUrlForFetch(GATE_URL, {
      url: URL_FOR_SEARCH_IN_NEWS,
      q: searchWord,
      sortBy: 'popularity',
      apiKey: newsAPIkey,
    }),
  );
}
