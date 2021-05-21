/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import { contentClass } from './../style.css';
import SearchField from './../components/SearchFiled';
import { ResetSearchButton, RefreshButton } from './../components/buttons';

export default function GivenDataArea() {
  const { dataStore } = window;

  return (
    <div className={contentClass} attr="attr">
      <SearchField dataStore={dataStore} />
      <RefreshButton />
      <ResetSearchButton />
    </div>
  );
}
