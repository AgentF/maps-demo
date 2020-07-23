/* eslint-disable no-unused-vars */
import { useState } from 'react';
import testData from '../testData.json';

export const useLocationsData = () => {
  const [locationsData, setLocationsData] = useState(testData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return [locationsData, loading, error, setLocationsData];
};
