import React from 'react';
import PropTypes from 'prop-types';
import { MdLocationOn, MdLocationOff } from 'react-icons/md';
import { BsCaretRightFill } from 'react-icons/bs';
import {
  Panel,
  Header,
  Title,
  MarkersToggleButton,
  MarkersList,
  OptionsWrapper,
  Name,
  Marker,
  Option,
} from './styles';

const MarkersIndicator = ({
  markers,
  showMarkers,
  setShowMarkersHandler,
  setCenterHandler,
  setZoomHandler,
}) => (
  <Panel>
    <Header>
      <Title>Markers</Title>
      <MarkersToggleButton
        type="button"
        title={`${showMarkers ? 'Hide' : 'Show'} All`}
        onClick={() => setShowMarkersHandler(!showMarkers)}
      >
        {showMarkers ? <MdLocationOff /> : <MdLocationOn />}
      </MarkersToggleButton>
    </Header>
    <MarkersList>
      {markers.map(({ title, position }) => (
        <Marker>
          <Name>{title}</Name>
          <OptionsWrapper>
            <Option
              type="button"
              title="Go"
              onClick={() => {
                setCenterHandler(position);
                setZoomHandler(10);
              }}
            >
              <BsCaretRightFill />
            </Option>
          </OptionsWrapper>
        </Marker>
      ))}
    </MarkersList>
  </Panel>
);

MarkersIndicator.propTypes = {
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
  showMarkers: PropTypes.bool.isRequired,
  setShowMarkersHandler: PropTypes.func.isRequired,
  setCenterHandler: PropTypes.func.isRequired,
  setZoomHandler: PropTypes.func.isRequired,
};

export { MarkersIndicator };
