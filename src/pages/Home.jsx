import React from 'react';
import { MapComponent } from '../components/Map/index';
import { PanelComponent } from '../components/Panel/index';
import { MarkersIndicator } from '../components/MarkersIndicator/index';

export const Home = () => {
  return (
    <>
      <PanelComponent>
        <MarkersIndicator
          setShowMarkersHandler={(newShowMarkers) => newShowMarkers}
          setCenterHandler={(newPosition) => newPosition}
          setZoomHandler={(newZoom) => newZoom}
        />
      </PanelComponent>
      <MapComponent />
    </>
  );
};
