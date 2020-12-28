import React from 'react';
import { Route, NavLink } from 'dva/router';
import VideoWall from './videoWall';
import SequenceConfig from './sequenceConfig';
import SystemLog from './systemLog';
import ParamsConfig from './paramsConfig';


export default class PageTop extends React.Component {
    render() {
        return(
      <React.Fragment>
          <div>
              tOP页面
          </div>
          <NavLink  to={`${this.props.match.path}/wall`} activeStyle={{fontWeight: 'bold',color: 'red'}}>电视墙</NavLink>
          <NavLink to={`${this.props.match.path}/seq`} activeStyle={{fontWeight: 'bold',color: 'red'}}>序列配置</NavLink>
          <NavLink  to={`${this.props.match.path}/params`} activeStyle={{fontWeight: 'bold',color: 'red'}}>参数设置 </NavLink>
          <NavLink  to={`${this.props.match.path}/log`} activeStyle={{fontWeight: 'bold',color: 'red'}}>系统日志</NavLink>

          <Route path={`${this.props.match.url}/wall`} component={VideoWall}/>
          <Route path={`${this.props.match.url}/seq`} component={SequenceConfig}/>
          <Route path={`${this.props.match.url}/params`} component={ParamsConfig}/>
          <Route path={`${this.props.match.url}/log`} component={SystemLog}/>
      </React.Fragment>
        );
    }
  
}
