import ErrorWindow from './ErrorWindow';
import GivenDataArea from './GivenDataArea';
import Preloader from './Preloader';
import ResultArea from './ResultArea';

export default function App(dataStore) {
  const { dataIsLoading, error } = dataStore;
  const content = dataIsLoading ? Preloader() : ResultArea(dataStore);

  return (
    <>
      <GivenDataArea dataStore={dataStore} />
      {error && error !== '' ? <ErrorWindow error={error} /> : content}
    </>
  );
}
