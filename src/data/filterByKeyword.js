import { render } from '../framework';

export default function filterByKeyword(word) {
  window.dataStore.filterWord = word;
  render();
}
