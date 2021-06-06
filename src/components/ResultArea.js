/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import { containerClass } from './../style.css';
import { TopWordsButtons } from './../components/buttons';
import NewsList from './../components/NewsList';

export default function ResultArea(props) {
  const { filterWord, setFilterWord } = props;

  return (
    <>
      <div class={containerClass}>
        <TopWordsButtons filterWord={filterWord} setFilterWord={setFilterWord} />
      </div>
      <div class={containerClass}>
        <NewsList filterWord={filterWord} />
      </div>
    </>
  );
}
