import { useEffect, useState } from 'react';

import {
  NEWS_API_KEY,
  NUMBER_OF_SHOWED_NEWS_ITEMS,
  defaultCountry,
  defaultWord,
} from './constants';

import { GATE_URL, URL_FOR_SEARCH_IN_NEWS, URL_FOR_TOP_NEWS } from './constants';
import { prepareUrlForFetch } from './utils';
import readArticlesData from './data/readArticleData';

export const useNews = () => {
  const [searchWord, setSearchWord] = useState(defaultWord);
  const [articles, setArticles] = useState([]);
  const [filterWord, setFilterWord] = useState('');
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastReadAt, setLastReadAt] = useState(null);

  useEffect(() => {
    let params = {
      url: URL_FOR_TOP_NEWS,
      country: defaultCountry,
      apiKey: NEWS_API_KEY,
    };

    if (searchWord) {
      params = {
        url: URL_FOR_SEARCH_IN_NEWS,
        q: searchWord,
        sortBy: 'popularity',
        apiKey: NEWS_API_KEY,
      };
    }
    readArticlesData(prepareUrlForFetch(GATE_URL, params))
      .then(articles => {
        setError(null);
        setFilterWord('');
        setArticles(articles);
      })
      .catch(err => {
        setError(err.toString());
      })
      .finally(() => {
        setDataIsLoading(false);
      });
  }, [searchWord]);

  return {
    newsItemsToShow: NUMBER_OF_SHOWED_NEWS_ITEMS,
    articles,
    setArticles,
    searchWord,
    setSearchWord,
    filterWord,
    setFilterWord,
    dataIsLoading,
    setDataIsLoading,
    error,
    setError,
    lastReadAt,
    setLastReadAt,
  };
};
