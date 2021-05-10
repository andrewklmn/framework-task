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
];

export function filterArticleByWord(article, word) {
  const searchWord = word ? word.toLowerCase() : '';
  if (
    word == '' ||
    (article.title && article.title.toLowerCase().includes(searchWord)) ||
    (article.description && article.description.toLowerCase().includes(searchWord)) ||
    (article.content && article.content.toLowerCase().includes(searchWord))
  )
    return true;

  return false;
}

export function getTopWords(text, numberOfWords, excludeWord = '') {
  let regex = '.*[a-zA-Zа-яА-Я].*';
  if (text.match(regex)) {
    let wordMap = new Map();
    text.split(' ').forEach(word => {
      if (word) {
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
          word.trim() == '' ||
          word.replace(/[0-9a-z\-]/g, '').length > 0 ||
          word == excludeWord.toLowerCase() ||
          word.length < 4
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
      }
    });
    const sortedWordMap = new Map([...wordMap.entries()].sort((a, b) => b[1] - a[1]));

    let result = Array.from(sortedWordMap.keys()).filter((word, index) => index < numberOfWords);
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

export function isWordInArticle({ title, content, description }, searchWord) {
  if (
    searchWord == '' ||
    (description && description.toLowerCase().includes(searchWord.toLowerCase())) ||
    (content && content.toLowerCase().includes(searchWord.toLowerCase())) ||
    (title &&
      removeArticleMakerSignFromTitle(title).toLowerCase().includes(searchWord.toLowerCase()))
  ) {
    return true;
  }
  return false;
}
