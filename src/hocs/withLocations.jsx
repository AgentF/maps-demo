import React from 'react';
import { useLocationsData } from '../hooks/useLocationsData';
import { ErrorLoadingData } from '../components/ErrorLoadingData';

export const withLocations = (Component) => () => {
  const [data, loading, error] = useLocationsData();
  return (
    <ErrorLoadingData
      loading={loading}
      error={error}
      DataRender={() => <Component data={data} />}
    />
  );
};
