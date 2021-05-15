import contentClass from './../style.css';
import SearchField from './../components/SearchFiled';
import { ResetSearchButton, RefreshButton } from './../components/buttons';

export default function GivenDataArea(dataStore) {
  return (
    <div class="${contentClass}">
      <SearchField dataStore={dataStore} />
      <RefreshButton />
      <ResetSearchButton />
    </div>
  );
}
