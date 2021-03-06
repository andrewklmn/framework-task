import { NUMBER_OF_TOP_WORDS, MIN_LENGTH_OF_KEYWORD } from './constants';

const notImportantWords = [
  'chars]',
  'ahead',
  'after',
  'before',
  'again',
  'could',
  'might',
  'will',
  'would',
  'must',
  'shall',
  'should',
  'ought',
  'null',
  'there',
];

export const debounce = (fn, waitTimeMs) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), waitTimeMs);
  };
};

export function filterArticleByWord(article, word) {
  const searchWord = word ? word.toLowerCase() : '';
  if (
    word === '' ||
    (article.title && article.title.toLowerCase().includes(searchWord)) ||
    (article.description && article.description.toLowerCase().includes(searchWord)) ||
    (article.content && article.content.toLowerCase().includes(searchWord))
  )
    return true;

  return false;
}

export function getTopWords(text, excludeWord = '') {
  let regex = /.*[a-zA-Zа-яА-Я].*/;
  if (text.match(regex)) {
    let wordMap = new Map();
    text.split(' ').forEach(word => {
      word = word
        .toLowerCase()
        .replace(
          `
`,
          '',
        )
        .trim();
      if (
        notImportantWords.includes(word) ||
        word.trim() === '' ||
        word.replace(/[0-9a-zа-яїєіґ\-]/g, '').length > 0 ||
        word === excludeWord.toLowerCase() ||
        word.replace(/^[\W\-]/g, '').length < MIN_LENGTH_OF_KEYWORD
      ) {
        return;
      }
      if (wordMap.has(word)) {
        let count = wordMap.get(word);
        count++;
        wordMap.set(word, count);
      } else {
        wordMap.set(word, 1);
      }
    });
    const sortedWordMap = new Map([...wordMap.entries()].sort((a, b) => b[1] - a[1]));

    let result = Array.from(sortedWordMap.keys()).filter(
      (word, index) => index < NUMBER_OF_TOP_WORDS,
    );
    result = result.map(res => {
      res = res.replace(/[/.,]/g, '');
      if (res !== '') {
        return res;
      }
    });
    return result.filter(res => Boolean(res));
  }
  return [];
}

export function removeArticleMakerSignFromTitle(title) {
  if (title && title !== '' && title.includes(' - ')) {
    const result = title.split(' - ');
    if (result.length > 1) {
      result.pop();

      return result.join(' - ');
    }
  }
  return title;
}

export function isWordInArticle({ title, content }, searchWord) {
  if (
    searchWord === '' ||
    (content && content.toLowerCase().includes(searchWord.toLowerCase())) ||
    (title &&
      removeArticleMakerSignFromTitle(title).toLowerCase().includes(searchWord.toLowerCase()))
  ) {
    return true;
  }
  return false;
}

export function prepareUrlForFetch(url, data) {
  let resultUrl = url;
  if (!data) return url;
  let params = Object.entries(data);
  if (params && params.length) {
    resultUrl = resultUrl + '?';
    params = params.map(([key, value]) => `${key}=${encodeURI(value)}`);
  }
  return resultUrl + params.join('&');
}

const isEmptyStr = str => str === '';
