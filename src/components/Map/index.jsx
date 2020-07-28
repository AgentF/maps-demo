import React, { useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import MapContext from '../../Contexts/MapContext';
import { MapWrapper, Map } from './styles';

const MapComponent = () => {
  const { initMap } = useContext(MapContext);
  const mapElement = useRef(null);

  useEffect(() => {
    initMap(mapElement.current);
  }, []);

  return (
    <MapWrapper>
      <Map ref={mapElement} />
    </MapWrapper>
  );
};

MapComponent.propTypes = {
  data: PropTypes.shape({
    center: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    zoom: PropTypes.number,
    markers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        position: PropTypes.shape({
          lat: PropTypes.number,
          lng: PropTypes.number,
        }),
        title: PropTypes.string,
        visible: PropTypes.bool,
      }),
    ),
  }),
};

MapComponent.defaultProps = {
  data: {
    center: { lat: 0, lng: 0 },
    zoom: 6,
    markers: [],
  },
};

export { MapComponent };
