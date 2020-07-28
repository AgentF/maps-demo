import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { MapWrapper, Map } from './styles';
import { MapHelper } from '../../helpers/MapHelper';

const MapComponent = ({ data: { center, zoom } }) => {
  const mapElement = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const helper = new MapHelper(
      process.env.REACT_APP_MAPS_APIKEY,
      mapElement.current,
      center,
      zoom,
    );
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
