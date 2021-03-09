import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

type Props = {
  makeLogin: React.FC
}

const Router: React.FC<Props>= ({makeLogin}: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={makeLogin}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;//não renderiza mais vezes pois não tem estado