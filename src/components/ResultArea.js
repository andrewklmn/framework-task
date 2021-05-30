/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import { containerClass } from './../style.css';
import { TopWordsButtons } from './../components/buttons';
import NewsList from './../components/NewsList';

export default function ResultArea(props) {
  const { articles, searchWord, filterWord, setFilterWord } = props;
  return (
    <>
      <div class={containerClass}>
        <TopWordsButtons
          articles={articles}
          searchWord={searchWord}
          filterWord={filterWord}
          setFilterWord={setFilterWord}
        />
      </div>
      <div class={containerClass}>
        <NewsList articles={articles} filterWord={filterWord} />
      </div>
    </>
  );
}
