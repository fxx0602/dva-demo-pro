import React from 'react';
import dynamic from 'dva/dynamic'
import { Router, Route, Switch,} from 'dva/router';
//import LoginPage from './routes/loginPage';
// import Topics from './routes/topics';
// import PageTop from './routes/pageTop';
import VideoWall from './routes/videoWall';
import ParamsConfig from './routes/paramsConfig';
import SequenceConfig from './routes/sequenceConfig';
import SystemLog from './routes/systemLog';


function RouterConfig({ history, app }) {

    const LoginPage = dynamic({
        app,
        component: () => import('./routes/loginPage')
    })
    const PageTop = dynamic({
        app,
        component: () => import('./components/pageTop')
    });
  return (
      <Router history={history}>
          <Switch>
              <Route path="/" exact component={LoginPage} />
              {/* <Route path="/pageTop" render={() => <PageTop app={app} history={history} />} /> */}
              {/* <Route path="/pageTop" component={PageTop}/> */}
              <Route path="/wall" component={VideoWall} />
             <Route path="/params" component={ParamsConfig} />
             <Route path="/seq" component={SequenceConfig} />
              <Route path="/sys" component={SystemLog} />
          </Switch>
      </Router>
  )
}


export default RouterConfig;
