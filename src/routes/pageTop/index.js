import React from 'react';
import dynamic from 'dva/dynamic'
import { NavLink, Route } from 'dva/router';
import style from './style.css'


import logopath from '../../assets/img/解码器.png';

export default class PageTop extends React.Component {
  render() {

    const { app } = this.props;
  
    const VideoWall = dynamic({
      app,
      component: () => import('./videoWall')
    });


    const ParamsConfig = dynamic({
      app,
      component: () => import('./paramsConfig')
    });

    const SequenceConfig = dynamic({
      app,
      component:() => import('./sequenceConfig')
    })

    const SystemLog = dynamic({
      app,
      component:() => import('./systemLog')
    })


    return (
      <React.Fragment>
        <div className={style.navbar} id="contentTitle">
          <div className={style.pageLogo} style={{ paddingTop: '5px' }}>
            <a id="logo">
              <img src={logopath} alt="logo" style={{ marginLeft: '-10px' }} />
            </a>
          </div>

          <div className={style.topMenu}>
            <ul className={style.navbarNav}>
              <li id="header_notification_bar">
                <a>
                  <label style={{ color: '#D6E9C6', fontFamily: '微软雅黑' }}>admin</label>
                </a>
              </li>
              <li id="header_inbox_bar">
                <a>
                  <label style={{ fontFamily: '微软雅黑', color: '#D6E9C6' }}>退出</label>
                </a>
              </li>
            </ul>
          </div>
        </div>


          <div className={style.navbarCollapse}>
              <div className="horMenu" style={{ marginLeft: 'auto', marginRight: 'auto', width: '550px', height: '50px' }}>
                <NavLink to={`/pageTop/wall`} activeStyle={{ fontWeight: 'bold', color: '#ffffff' }} style={{textDecoration:'none',paddingLeft:'10px',paddingRight:'10px',color:'#b4bcc8'}}>电视墙</NavLink>
                <NavLink to={`/pageTop/seq`} activeStyle={{ fontWeight: 'bold', color: '#ffffff' }}  style={{textDecoration:'none',paddingLeft:'10px',paddingRight:'10px',color:'#b4bcc8'}}>序列配置</NavLink>
                <NavLink to={`/pageTop/params`} activeStyle={{ fontWeight: 'bold', color: '#ffffff' }}  style={{textDecoration:'none',paddingLeft:'10px',paddingRight:'10px',color:'#b4bcc8'}}>参数设置 </NavLink>
                <NavLink to={`/pageTop/log`} activeStyle={{ fontWeight: 'bold', color: '#ffffff' }}  style={{textDecoration:'none',paddingLeft:'10px',paddingRight:'10px',color:'#b4bcc8'}}>系统日志</NavLink>
              </div>
          </div>
       

       <div id="content">
          <Route path="/pageTop/wall" render={() => <VideoWall />} />
          <Route path="/pageTop/params" render={() => <ParamsConfig />} />
          <Route path="/pageTop/seq" render={() => <SequenceConfig />} />
          <Route path="/pageTop/log" render={() => <SystemLog />} />
       </div>
      </React.Fragment >
    );
  }

}
