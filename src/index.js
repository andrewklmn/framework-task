/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from './framework/element';

import { dataStore } from './data/dataStore';
import performSearch from './data/performSearch';
import filterByKeyword from './data/filterByKeyword';
import renderApp from './framework/renderApp';
import App from './components/App';

if (module.hot) {
  module.hot.accept();
}

// initialize store
window.dataStore = dataStore;
window.performSearch = performSearch;
window.filterByKeyword = filterByKeyword;

renderApp(App, document.getElementById('app-root'));

// start first search
performSearch();
