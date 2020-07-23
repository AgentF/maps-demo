import styled from 'styled-components';

export const Button = styled.button`
  cursor: pointer;
  transition: ease-in-out 300ms;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: var(--highlightColor);
  border: 1px solid #dadce0;
  border-radius: 2px;
  padding: 0.1rem 0.2rem;
  margin: 0.1rem 0.2rem;
`;

export const IconButton = styled(Button)`
  color: rgb(170, 170, 170);
  &:hover {
    color: rgba(0, 0, 0, 0.87);
    border-color: rgba(0, 0, 0, 0.87);
  }
`;

export const Panel = styled.div`
  --padding: 1rem;
  position: absolute;
  padding: var(--padding) 0;
  height: calc(100% - 2px - var(--padding) * 2);
  width: 200px;
  background-color: var(--backgroundColor);
  border: 1px solid #dadce0;
  border-radius: 0 var(--borderRadius) var(--borderRadius) 0;
  z-index: 1;
  overflow: auto;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #333;
`;

export const Title = styled.h1`
  color: var(--color);
`;

export const MarkersToggleButton = styled(IconButton)`
  svg {
    --size: 2rem;
    height: var(--size);
    width: var(--size);
  }
`;

export const MarkersList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  li:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

export const OptionsWrapper = styled.div`
  display: flex;
`;

export const Name = styled.h4``;

export const Marker = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const Option = styled(IconButton)`
  svg {
    --size: 1.5rem;
    height: var(--size);
    width: var(--size);
  }
`;
