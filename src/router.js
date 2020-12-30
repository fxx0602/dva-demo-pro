import React from 'react';
import dynamic from 'dva/dynamic'
import { Router, Route, Switch,routerRedux } from 'dva/router';
//import LoginPage from './routes/loginPage';
// import Topics from './routes/topics';
// import PageTop from './routes/pageTop';
// import VideoWall from './routes/pageTop/videoWall';
// import ParamsConfig from './routes/pageTop/paramsConfig';


function RouterConfig({ history, app }) {
    console.log(app);
    const LoginPage = dynamic({
        app,
        component: () => import('./routes/loginPage')
    })
    const PageTop = dynamic({
        app,
        component: () => import('./routes/pageTop')
    });
    console.log(PageTop);
  return (
      <Router history={history}>
          <Switch>
              <Route path="/" exact component={LoginPage} />
              <Route path="/pageTop" render={() => <PageTop app={app} history={history} />} />
              {/* <Route path="/pageTop" component={PageTop}/> */}
          </Switch>
      </Router>
  )
}


export default RouterConfig;
