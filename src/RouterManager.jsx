import React from 'react';
import { Router } from '@reach/router';
import { GlobalStyle, Wrapper } from './styles/GlobalStyle';
import { Home } from './pages/Home';
import { PanelComponent } from './components/Panel/index';
import { MarkersIndicator } from './components/MarkersIndicator/index';

export const RouterManager = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <PanelComponent>
        <MarkersIndicator
          setShowMarkersHandler={(newShowMarkers) => newShowMarkers}
          setCenterHandler={(newPosition) => newPosition}
          setZoomHandler={(newZoom) => newZoom}
        />
      </PanelComponent>

      <Router basepath="/maps-demo/">
        <Home path="/" />
      </Router>
    </Wrapper>
  );
};
