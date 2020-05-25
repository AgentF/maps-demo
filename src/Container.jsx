import React from 'react';
import Map from './Map';
import { center, markers } from './testData.json';
import './Container.css';

function Container() {
  return (
    <div className="container">
      <Map center={center} zoom={6} markers={markers} />
    </div>
  );
}

export default Container;
