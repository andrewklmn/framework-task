/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from './framework/element';

import { dataStore } from './data/dataStore';
import performSearch from './data/performSearch';
import { render } from './framework';
import App from './components/App';

if (module.hot) {
  module.hot.accept();
}

// initialize store
window.dataStore = dataStore;

render(App, document.getElementById('app-root'));

// start first search
performSearch();
