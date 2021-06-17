import React from 'react';

import { contentClass } from '../style.css';
import SearchField from './SearchFiled';
import { ResetSearchButton, RefreshButton } from './buttons';

export default function GivenDataArea() {
  return (
    <div className={contentClass}>
      <SearchField />
      <RefreshButton />
      <ResetSearchButton />
    </div>
  );
}
