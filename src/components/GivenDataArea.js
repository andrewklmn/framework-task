/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';
import { useAppContext } from '../context';

import { contentClass } from './../style.css';
import SearchField from './../components/SearchFiled';
import { ResetSearchButton, RefreshButton } from './../components/buttons';

export default function GivenDataArea(props) {
  const { setSearchWord, setFilterWord, setDataIsLoading } = props;
  const searchWord = useAppContext();

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
