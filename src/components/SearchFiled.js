/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import performSearch from '../data/performSearch';

export default function SearchField({ dataStore }) {
  const { searchWord } = dataStore;

  return (
    <>
      <span>Search by:</span>
      <input
        onchange={e => performSearch(e.target.value)}
        value={searchWord ? searchWord : ''}
        placeholder="Enter word or phrase"
      />
    </>
  );
}
