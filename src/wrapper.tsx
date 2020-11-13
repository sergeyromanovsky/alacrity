import React from 'react';

import { ApolloProvider } from '@apollo/client';
import { client } from 'gql/client';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

interface IProps {
  children: React.ReactNode;
}

function AppWrapper({ children }: IProps) {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          draggable
        />
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default AppWrapper;
