import styled from 'styled-components';
import { IconButton } from '../../styles/GlobalStyle';

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

export const Marker = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.25rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const Name = styled.h4``;

export const Position = styled.span``;

export const OptionsWrapper = styled.div`
  display: flex;
  align-self: flex-end;
`;

export const Option = styled(IconButton)`
  svg {
    --size: 1.5rem;
    height: var(--size);
    width: var(--size);
    color: #ea4335;
  }
`;
