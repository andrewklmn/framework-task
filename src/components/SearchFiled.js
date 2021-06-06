import React from 'react';

import { useAppContext, useSettersContext } from '../context';

export default function SearchField() {
  const searchWord = useAppContext();
  const { setSearchWord, setDataIsLoading } = useSettersContext();

  const handleChange = e => {
    setDataIsLoading(true);
    setSearchWord(e.target.value);
  };

  return (
    <span>
      <span>Search by:</span>
      <input
        onChange={handleChange}
        value={searchWord ? searchWord : ''}
        placeholder="Enter word or phrase"
      />
    </span>
  );
}
