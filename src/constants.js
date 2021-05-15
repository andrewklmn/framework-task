const GATE_URL = `https://litos.kiev.ua/api_gate.php`;
const URL_FOR_TOP_NEWS = 'https://newsapi.org/v2/top-headlines';
const URL_FOR_SEARCH_IN_NEWS = 'https://newsapi.org/v2/everything';

export const NEWS_API_KEY = process.env.SERVICE_API_KEY;
export const REFRESH_DELAY_IN_MS = 1000 * 60 * 60;
export const NUMBER_OF_SHOWED_NEWS_ITEMS = 30;
export const NUMBER_OF_TOP_WORDS = 7;
export const defaultCountry = 'gb';
export const defaultWord = '';
