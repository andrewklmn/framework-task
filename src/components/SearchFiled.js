import React from 'react';

import { useAppContext, useSettersContext } from '../context';
import { debounce } from '../utils';

export default function SearchField() {
  const searchWord = useAppContext();
  const { setSearchWord, setDataIsLoading } = useSettersContext();
  const DEBOUNCE_TIME_MS = 1000;

  const setFunction = elem => {
    setSearchWord(elem.value);
    setDataIsLoading(true);
  };

  const handleChange = debounce(setFunction, DEBOUNCE_TIME_MS);

  return (
    <span key={searchWord}>
      <span>Search by:</span>
      <input
        type="text"
        onChange={({ currentTarget }) => handleChange(currentTarget)}
        defaultValue={searchWord && searchWord !== '' ? searchWord : ''}
        placeholder="Enter word or phrase"
      />
    </span>
  );
}
