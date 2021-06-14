import React from 'react';

import { contentClass } from '../style.css';
import SearchField from '../components/SearchFiled';
import { ResetSearchButton, RefreshButton } from './buttons'; //TODO

export default function GivenDataArea() {
  return (
    <div className={contentClass}>
      <SearchField />
      <RefreshButton />
      <ResetSearchButton />
    </div>
  );
}
