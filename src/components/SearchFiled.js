/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import performSearch from '../data/performSearch';

export default function SearchField(props) {
  const { searchWord, setSearchWord, setDataIsLoading } = props;

  const handleChange = e => {
    setDataIsLoading(true);
    setSearchWord(e.target.value);
  };

  return (
    <>
      <span>Search by:</span>
      <input
        onchange={handleChange}
        value={searchWord ? searchWord : ''}
        placeholder="Enter word or phrase"
      />
    </>
  );
}
