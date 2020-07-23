/* global google */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { MarkersIndicator } from '../MarkersIndicator/index';
import { MapWrapper, Map } from './styles';

const MapComponent = ({ data: { center, zoom, markers } }) => {
  const [googleMarkers, setGoogleMarkers] = useState([]);
  const [showMarkers, setShowMarkers] = useState(true);
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
        if (showMarkers) {
          googleMarker.setMap(map.current);
        }
        newGoogleMarkersArray.push(googleMarker);
        setGoogleMarkers(newGoogleMarkersArray);
      });
    };
  }, []);

  useEffect(() => {
    googleMarkers.forEach((googleMarker) => {
      googleMarker.setMap(showMarkers ? map.current : null);
    });
  }, [showMarkers]);

  return (
    <MapWrapper>
      <MarkersIndicator
        markers={markers}
        showMarkers={showMarkers}
        setShowMarkersHandler={(newShowMarkers) => {
          setShowMarkers(newShowMarkers);
        }}
        setCenterHandler={(newPosition) => map.current.setCenter(newPosition)}
        setZoomHandler={(newZoom) => map.current.setZoom(newZoom)}
      />
      <Map ref={mapElement} />
    </MapWrapper>
  );
};

MapComponent.propTypes = {
  data: PropTypes.shape({
    center: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
    zoom: PropTypes.number.isRequired,
    markers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        position: PropTypes.shape({
          lat: PropTypes.number.isRequired,
          lng: PropTypes.number.isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
        visible: PropTypes.bool.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export { MapComponent };
