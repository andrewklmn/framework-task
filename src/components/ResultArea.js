import React from 'react';

import { containerClass } from './../style.css';
import { TopWordsButtons } from './../components/buttons';
import NewsList from './../components/NewsList';

export default function ResultArea(props) {
  const { filterWord, setFilterWord } = props;

  return (
    <>
      <div className={containerClass}>
        <TopWordsButtons filterWord={filterWord} setFilterWord={setFilterWord} />
      </div>
      <div className={containerClass}>
        <NewsList filterWord={filterWord} />
      </div>
    </>
  );
}
