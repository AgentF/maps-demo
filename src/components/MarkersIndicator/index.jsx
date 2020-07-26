import React from 'react';
import PropTypes from 'prop-types';
import { BsCaretRightFill } from 'react-icons/bs';
import { MdLocationOn, MdLocationOff } from 'react-icons/md';
import {
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
}) => {
  return (
    <>
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
    </>
  );
};

MarkersIndicator.propTypes = {
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
  showMarkers: PropTypes.bool,
  setShowMarkersHandler: PropTypes.func.isRequired,
  setCenterHandler: PropTypes.func.isRequired,
  setZoomHandler: PropTypes.func.isRequired,
};

MarkersIndicator.defaultProps = {
  markers: [],
  showMarkers: false,
};

export { MarkersIndicator };
