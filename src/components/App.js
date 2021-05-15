/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import ErrorWindow from './ErrorWindow';
import GivenDataArea from './GivenDataArea';
import Preloader from './Preloader';
import ResultArea from './ResultArea';

export default function App() {
  const { dataIsLoading, error } = window.dataStore;
  const content = dataIsLoading ? Preloader() : <ResultArea dataStore={dataStore} />;

  return (
    <>
      <GivenDataArea dataStore={dataStore} />
      {error && error !== '' ? <ErrorWindow error={error} /> : content}
    </>
  );
}
