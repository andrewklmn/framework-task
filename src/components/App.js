/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';
import { useNews } from '../customHooks';
import { AppContext, ArticlesContext, SettersContext } from '../context';

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
    setDataIsLoading,
  } = useNews();

  return (
    <>
      <AppContext.Provider value={searchWord}>
        <ArticlesContext.Provider value={articles}>
          <GivenDataArea
            setSearchWord={setSearchWord}
            filterWord={filterWord}
            setFilterWord={setFilterWord}
            setDataIsLoading={setDataIsLoading}
          />
          {error && error !== '' ? (
            <ErrorWindow error={error} />
          ) : dataIsLoading ? (
            <Preloader />
          ) : (
            <ResultArea filterWord={filterWord} setFilterWord={setFilterWord} />
          )}
        </ArticlesContext.Provider>
      </AppContext.Provider>
    </>
  );
}
