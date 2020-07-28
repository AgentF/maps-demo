import React, {
  createContext,
  useState,
  useReducer,
  useRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { MarkersReducer } from './MarkersReducer';
import { MapHelper } from '../helpers/MapHelper';

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(6);
  const [state, dispatch] = useReducer(MarkersReducer, {
    type: 'RESET_DATA',
    data: [],
  });
  const mapHelper = useRef(null);

  useEffect(() => {
    mapHelper.current.setCenter(center);
  }, [center]);

  useEffect(() => {
    mapHelper.current.setZoom(zoom);
  }, [zoom]);

  const markers = state.data;
  const addMarker = (data) => dispatch({ type: 'ADD_MARKER', data });
  const removeMarker = (data) => dispatch({ type: 'REMOVE_MARKER', data });

  return (
    <MapContext.Provider
      value={{
        initMap: (mapElement) => {
          mapHelper.current = new MapHelper(
            process.env.REACT_APP_MAPS_APIKEY,
            mapElement,
            center,
            setCenter,
            zoom,
            setZoom,
            addMarker,
            removeMarker,
          );
        },
        center,
        setCenter,
        zoom,
        setZoom,
        markers,
        addMarker,
        removeMarker,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

MapProvider.propTypes = {
  children: PropTypes.elementType.isRequired,
};

export default MapContext;
