import renderApp from './../framework/renderApp';
import { validateAndLoadData } from './validateAndLoadData';

export default function performSearch(word) {
  if (window.dataStore.dataIsLoading) return;

  window.dataStore.articles = [];
  window.dataStore.searchWord = word;
  window.dataStore.dataIsLoading = true;
  window.dataStore.error = null;
  window.dataStore.filterWord = '';

  renderApp();
  setTimeout(() => {
    validateAndLoadData()
      .then(data => {
        window.dataStore.articles = data;
      })
      .catch(error => (window.dataStore.error = error))
      .finally(() => {
        window.dataStore.dataIsLoading = false;
        renderApp();
      });
  }, 1000);
}
