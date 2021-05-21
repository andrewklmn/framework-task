import {
  NEWS_API_KEY,
  NUMBER_OF_SHOWED_NEWS_ITEMS,
  defaultCountry,
  defaultWord,
} from './../constants';

export const dataStore = {
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
