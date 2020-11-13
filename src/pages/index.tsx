import React from 'react';
import Home from './Home';

import { Route, Switch } from 'react-router-dom';
import { Wrapper } from './styled';

function App() {
  return (
    <Wrapper>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Wrapper>
  );
}

export default App;
