import renderApp from '../framework/renderApp';

export default function filterByKeyword(word) {
  window.dataStore.filterWord = word;
  renderApp();
}
