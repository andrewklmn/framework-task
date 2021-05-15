import { dataStore } from './data/dataStore';
import performSearch from './data/performSearch';

if (module.hot) {
  module.hot.accept();
}

// initialize store
window.dataStore = dataStore;
window.performSearch = performSearch;

// start App by starting first search
performSearch();
