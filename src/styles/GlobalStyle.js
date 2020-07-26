import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
    width: 100%;
  }

  #root {
    --backgroundColor: #fff;
    --color: rgba(0, 0, 0, 0.87);
    --highlightColor: #1a73e8;
    --borderColor: #dadce0;
    --borderRadius: 4px;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

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
