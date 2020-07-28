/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { RouterManager } from './RouterManager';
import { MapProvider } from './Contexts/MapContext';

ReactDOM.render(
  <MapProvider>
    <RouterManager />
  </MapProvider>,
  document.getElementById('root'),
);
