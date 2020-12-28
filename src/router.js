import React from 'react';
import dynamic from 'dva/dynamic'
import { Router, Route, Switch,routerRedux } from 'dva/router';
//import LoginPage from './routes/loginPage';
//import Topics from './routes/topics';
//import PageTop from './routes/pageTop';


const { ConnectedRouter } = routerRedux;
function RouterConfig({ history,app }) {
  const routes = [{
     path:'/',
     name:'Login',
     models:() => [import('./models/login')],
     component: () => import('./routes/loginPage')
  },{
    path:'/pageTop',
    name:'PageTop',
    component:() => import('./routes/pageTop')
  },{
    path:'/pageTop/wall',
    name:'wall',
    component:() => import('./routes/pageTop/videoWall')
  },{
    path:'/pageTop/seq',
    name:'seq',
    component:() => import('./routes/pageTop/sequenceConfig')
  },{
    path:'/pageTop/params',
    name:'params',
    component:() => import('./routes/pageTop/paramsConfig')
  },{
    path:'/pageTop/log',
    name:'systemlog',
    component:() => import('./routes/pageTop/systemLog')
  }]



  return (
    <ConnectedRouter history={history}>
      <Switch>
       {
         routes.map(({path,name,...dynamics}) => {
           if (path === '/') {
            return (
              <Route path={path} key={name} exact component={dynamic({app, ...dynamics})} />
            );
           } else {
            return (
              <Route path={path} key={name} component={dynamic({app, ...dynamics})} />
            );
           }
           
         })
       }
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
