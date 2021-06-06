/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';

import { contentClass } from './../style.css';
import SearchField from './../components/SearchFiled';
import { ResetSearchButton, RefreshButton } from './../components/buttons';

export default function GivenDataArea(props) {
  const { filterWord } = props;
  return (
    <div class={contentClass}>
      <SearchField />
      <RefreshButton />
      <ResetSearchButton />
    </div>
  );
}
