/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';

import { contentClass } from './../style.css';
import SearchField from './../components/SearchFiled';
import { ResetSearchButton, RefreshButton } from './../components/buttons';

export default function GivenDataArea(props) {
  const { filterWord, setFilterWord, setSearchWord, setDataIsLoading } = props;
  return (
    <div class={contentClass}>
      <SearchField setSearchWord={setSearchWord} setDataIsLoading={setDataIsLoading} />
      <RefreshButton setSearchWord={setSearchWord} setFilterWord={setFilterWord} />
      <ResetSearchButton
        setSearchWord={setSearchWord}
        filterWord={filterWord}
        setFilterWord={setFilterWord}
        setDataIsLoading={setDataIsLoading}
      />
    </div>
  );
}
