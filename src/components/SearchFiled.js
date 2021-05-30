/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import performSearch from '../data/performSearch';

export default function SearchField(props) {
  const { searchWord, setSearchWord } = props;

  return (
    <>
      <span>Search by:</span>
      <input
        onchange={e => setSearchWord(e.target.value)}
        value={searchWord ? searchWord : ''}
        placeholder="Enter word or phrase"
      />
    </>
  );
}
