import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import LoginPage from './routes/loginPage';
import Topics from './routes/topics';
import PageTop from './routes/pageTop';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/topics" component={Topics}/>
        <Route path="/pageTop" component={PageTop}></Route>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
