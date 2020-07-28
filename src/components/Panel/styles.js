import styled from 'styled-components';
import { IconButton } from '../../styles/GlobalStyle';

export const Panel = styled.div`
  --size: 3rem;
  background-color: var(--backgroundColor);
  border: 1px solid #dadce0;
  border-radius: var(--borderRadius);
  left: 0;
  margin: 1rem auto;
  height: ${({ showPanel }) =>
    showPanel ? 'calc(100% - 2rem)' : 'var(--size)'};
  overflow: auto;
  position: absolute;
  right: 0;
  transition: 0.3s all ease-in-out;
  top: ${({ showPanel }) => (showPanel ? '0%' : 'calc(100% - var(--size))')};
  width: ${({ showPanel }) => (showPanel ? 'calc(100% - 1rem)' : '3rem')};
  z-index: 1;

  @media (min-width: 600px) {
    width: ${({ showPanel }) => (showPanel ? '300px' : '3rem')};
  }
`;

export const PanelToggle = styled(IconButton)`
  border: none;
  left: 0;
  margin: 0 auto;
  padding: 0.5rem;
  right: 0;
  width: ${({ showPanel }) => (showPanel ? '100%' : 'initial')};
  &svg {
    height: 1.5rem;
    width: 1.5rem;
  }
`;
