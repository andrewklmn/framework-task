/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

export default function SearchField({ searchWord }) {
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
