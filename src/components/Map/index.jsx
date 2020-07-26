/* global google */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { MapWrapper, Map } from './styles';

const MapComponent = ({ data: { center, zoom, markers } }) => {
  const [googleMarkers, setGoogleMarkers] = useState([]);
  const mapElement = useRef(true);
  const map = useRef(true);

  useEffect(() => {
    // Create the script tag, set the appropriate attributes
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_APIKEY}&callback=initMap`;
    script.defer = true;
    script.async = true;

    // Attach your callback function to the `window` object

    // Append the 'script' element to 'head'
    document.head.appendChild(script);

    window.initMap = () => {
      map.current = new google.maps.Map(mapElement.current, {
        center,
        zoom,
      });

      markers.forEach(({ position, title }) => {
        const newGoogleMarkersArray = googleMarkers;
        const googleMarker = new google.maps.Marker({ position, title });
        // if (showMarkers) {
        //   googleMarker.setMap(map.current);
        // }
        newGoogleMarkersArray.push(googleMarker);
        setGoogleMarkers(newGoogleMarkersArray);
      });

      const recursive = () => {
        const button = document.querySelector(`button.dismissButton`);
        if (button) {
          button.click();
        } else {
          recursive();
        }
      };
      setTimeout(recursive, 5 * 1000);
    };
  }, []);

  // useEffect(() => {
  //   googleMarkers.forEach((googleMarker) => {
  //     googleMarker.setMap(showMarkers ? map.current : null);
  //   });
  // }, [showMarkers]);

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
