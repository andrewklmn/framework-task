import { render } from './../framework';
import { validateAndLoadData } from './validateAndLoadData';

export default function performSearch(word) {
  if (window.dataStore.dataIsLoading) return;

  window.dataStore.articles = [];
  window.dataStore.searchWord = word;
  window.dataStore.dataIsLoading = true;
  window.dataStore.error = null;
  window.dataStore.filterWord = '';

  render();
  setTimeout(() => {
    validateAndLoadData()
      .then(data => {
        window.dataStore.articles = data;
      })
      .catch(error => (window.dataStore.error = error))
      .finally(() => {
        window.dataStore.dataIsLoading = false;
        render();
      });
  }, 1000);
}
