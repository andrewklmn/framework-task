/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import { containerClass } from './../style.css';
import { TopWordsButtons } from './../components/buttons';
import NewsList from './../components/NewsList';

export default function ResultArea({ dataStore }) {
  return (
    <>
      <div class={containerClass}>
        <TopWordsButtons dataStore={dataStore} />
      </div>
      <div class={containerClass}>
        <NewsList dataStore={dataStore} />
      </div>
    </>
  );
}
