import React from 'react';
import { NavLink } from 'dva/router';


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
      </React.Fragment>
        );
    }
  
}
