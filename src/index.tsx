import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/';
import { GlobalStyle } from './globalStyles';
import AppWrapper from 'wrapper';

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper>
      <App />
    </AppWrapper>
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root')
);
