import React, { useState } from 'react';

import { useNews } from '../customHooks';
import { AppContext, ArticlesContext, SettersContext } from '../context';

import ErrorWindow from './ErrorWindow';
import GivenDataArea from './GivenDataArea';
import Preloader from './Preloader';
import ResultArea from './ResultArea';
import ThemeSelector from './ThemeSelector';

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

  const setters = { setFilterWord, setSearchWord, setDataIsLoading };

  return (
    <AppContext.Provider value={searchWord}>
      <ArticlesContext.Provider value={articles}>
        <SettersContext.Provider value={setters}>
          <ThemeSelector />
          <GivenDataArea />
          {error && error !== '' ? (
            <ErrorWindow error={error} />
          ) : dataIsLoading ? (
            <Preloader />
          ) : (
            <ResultArea filterWord={filterWord} setFilterWord={setFilterWord} />
          )}
        </SettersContext.Provider>
      </ArticlesContext.Provider>
    </AppContext.Provider>
  );
}
