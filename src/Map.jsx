/* global google */
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import './Map.css';

// Create the script tag, set the appropriate attributes
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_APIKEY}&callback=initMap`;
script.defer = true;
script.async = true;

// Attach your callback function to the `window` object

// Append the 'script' element to 'head'
document.head.appendChild(script);

function Map({ center, zoom, markers }) {
  const [mapElement, setMapElement] = useState(null);
  const [map, setMap] = useState(null);
  const [googleMarkers, setGoogleMarkers] = useState([]);
  const [showMarkers, setShowMarkers] = useState(true);
  const [showPanel, setShowPanel] = useState(true);
  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    setMapElement(document.getElementById('map'));
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else if (!mapElement) {
      console.error('No map element!');
    } else {
      window.initMap = () => {
        const initialMap = new google.maps.Map(mapElement, {
          center,
          zoom,
        });
        setMap(initialMap);
        markers.forEach(({ position, title }) => {
          const newGoogleMarkersArray = googleMarkers;
          const googleMarker = new google.maps.Marker({ position, title });
          if (showMarkers) {
            googleMarker.setMap(initialMap);
          }
          newGoogleMarkersArray.push(googleMarker);
          setGoogleMarkers(newGoogleMarkersArray);
        });
      };
    }
  }, [mapElement, center, zoom, markers]);

  useEffect(() => {
    googleMarkers.forEach((googleMarker) => {
      googleMarker.setMap(showMarkers ? map : null);
    });
  }, [showMarkers]);

  return (
    <div className="map-container">
      <button
        className="panel-button"
        type="button"
        style={{ '--showButton': showPanel ? 1 : 0 }}
        onClick={() => setShowPanel(!showPanel)}
      >
        {showPanel ? (
          <span className="material-icons">keyboard_arrow_left</span>
        ) : (
          <span className="material-icons">keyboard_arrow_right</span>
        )}
      </button>
      {showPanel && (
        <div
          className="left-panel"
          style={{ '--showButton': showPanel ? 1 : 0 }}
        >
          <div className="left-panel-header">
            <h2 className="panel-header-title">Markers</h2>
            <button
              className="panel-header-button"
              type="button"
              title="Hide All"
              onClick={() => setShowMarkers(!showMarkers)}
            >
              {showMarkers ? (
                <span className="material-icons marker-off">location_off</span>
              ) : (
                <span className="material-icons marker-on">location_on</span>
              )}
            </button>
          </div>
          <ul className="markers-display">
            {markers.map(({ title, position }) => (
              <li className="marker-display">
                {title}
                <div className="marker-options">
                  <button
                    className="marker-option"
                    type="button"
                    title="Go"
                    onClick={() => {
                      map.setCenter(position);
                      map.setZoom(10);
                    }}
                  >
                    <span className="material-icons">keyboard_arrow_right</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div id="map" />
    </div>
  );
}

Map.propTypes = {
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
};

export default Map;
