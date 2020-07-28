import React, { useContext } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import MapContext from '../../Contexts/MapContext';
import {
  Header,
  Title,
  MarkersList,
  Position,
  OptionsWrapper,
  Name,
  Marker,
  Option,
} from './styles';

const MarkersIndicator = () => {
  const { setCenter, setZoom, markers } = useContext(MapContext);
  return (
    <>
      <Header>
        <Title>Markers</Title>
      </Header>
      <MarkersList>
        {markers.map(({ title, position, position: { lat, lng } }) => (
          <Marker>
            {title && <Name>{title}</Name>}
            <Position>{`LAT: ${lat}`}</Position>
            <Position>{`LNG: ${lng}`}</Position>
            <OptionsWrapper>
              <Option
                type="button"
                title="Go"
                onClick={() => {
                  setCenter(position);
                  setZoom(10);
                }}
              >
                <FaMapMarkerAlt />
              </Option>
            </OptionsWrapper>
          </Marker>
        ))}
      </MarkersList>
    </>
  );
};

export { MarkersIndicator };
