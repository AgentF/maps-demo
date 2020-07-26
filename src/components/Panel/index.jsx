import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { PanelToggle, Panel } from './styles';

const PanelComponent = ({ children }) => {
  const [showPanel, setShowPanel] = useState(false);
  return (
    <Panel showPanel={showPanel}>
      <PanelToggle
        type="button"
        showPanel={showPanel}
        onClick={() => setShowPanel(!showPanel)}
      >
        {showPanel ? <FaChevronDown /> : <FaChevronUp />}
      </PanelToggle>
      {showPanel && <>{children}</>}
    </Panel>
  );
};

PanelComponent.propTypes = { children: PropTypes.elementType.isRequired };

export { PanelComponent };
