import { dataStore } from './data/dataStore';
import performSearch from './data/performSearch';
import filterByKeyword from './data/filterByKeyword';

if (module.hot) {
  module.hot.accept();
}

// initialize store
window.dataStore = dataStore;
window.performSearch = performSearch;
window.filterByKeyword = filterByKeyword;

// start App by starting first search
performSearch();
