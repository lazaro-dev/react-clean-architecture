import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { Login } from '@/presentation/pages'

const Router: React.FC= () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;//não renderiza mais vezes pois não tem estado