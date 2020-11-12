import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	* {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		margin: 0;
		padding:0;
		box-sizing: border-box;
	}
  html {
    font-size: 16px;
  }
  body {
   	font-family: Roboto;
  }
`;
