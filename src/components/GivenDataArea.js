/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';

import { contentClass } from './../style.css';
import SearchField from './../components/SearchFiled';
import { ResetSearchButton, RefreshButton } from './../components/buttons';

export default function GivenDataArea(props) {
  const { searchWord, setSearchWord, setFilterWord } = props;

  return (
    <div class={contentClass}>
      <SearchField searchWord={searchWord} setSearchWord={setSearchWord} />
      <RefreshButton setSearchWord={setSearchWord} setFilterWord={setFilterWord} />
      <ResetSearchButton setSearchWord={setSearchWord} setFilterWord={setFilterWord} />
    </div>
  );
}
