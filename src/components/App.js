/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';
import { useNews } from '../customHooks';

import ErrorWindow from './ErrorWindow';
import GivenDataArea from './GivenDataArea';
import Preloader from './Preloader';
import ResultArea from './ResultArea';

export default function App() {
  const {
    dataIsLoading,
    error,
    searchWord,
    setSearchWord,
    articles,
    filterWord,
    setFilterWord,
  } = useNews();

  const content = dataIsLoading ? (
    Preloader()
  ) : (
    <ResultArea
      articles={articles}
      searchWord={searchWord}
      filterWord={filterWord}
      setFilterWord={setFilterWord}
    />
  );

  return (
    <>
      <GivenDataArea
        setFilterWord={setFilterWord}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
      />
      {error && error !== '' ? <ErrorWindow error={error} /> : content}
    </>
  );
}
