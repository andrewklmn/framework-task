/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';

import { contentClass } from './../style.css';
import SearchField from './../components/SearchFiled';
import { ResetSearchButton, RefreshButton } from './../components/buttons';

export default function GivenDataArea(props) {
  const { searchWord, setSearchWord, setFilterWord, setDataIsLoading } = props;

  return (
    <div class={contentClass}>
      <SearchField
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        setDataIsLoading={setDataIsLoading}
      />
      <RefreshButton
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        setFilterWord={setFilterWord}
        setDataIsLoading={setDataIsLoading}
      />
      <ResetSearchButton
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        setFilterWord={setFilterWord}
        setDataIsLoading={setDataIsLoading}
      />
    </div>
  );
}
