import React from 'react';
import { connect } from 'dva';
import style from './style.css';
import { message } from 'antd';
import * as loginApi from '../../services/login';


import logopath from '../../assets/img/m.png';

class PageTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topMenu: [{
        path: '/wall',
        name: '电视墙',
        isActive: false,
      }, {
        path: '/seq',
        name: '序列配置',
        isActive: false,
      }, {
        path: '/params',
        name: '参数设置',
        isActive: false,
      }, {
        path: '/log',
        name: '系统日志',
        isActive: false,
      }],
    }
  }

  componentDidMount() {
    const currrent = this.props.current;
    const topMenu = this.state.topMenu;
    topMenu.forEach(function (value) {
      if (value.name === currrent) {
        value.isActive = true;
      } else {
        value.isActive = false;
      }
    });
    this.setState({
      topMenu: topMenu
    });
  }


  changeTopMenu(name) {
    const topMenu = this.state.topMenu;
    let nextPath = '';
    topMenu.forEach(function (value) {
      if (value.name === name) {
        value.isActive = true;
        nextPath = value.path;
      } else {
        value.isActive = false;
      }
    });
    this.setState({
      topMenu: topMenu
    });
    this.props.history.push(nextPath);
  }

  quitLogin = () => {
    loginApi.login({
      reqType: "DELETE",
      userID: this.props.user.userID.toString(),
    }).then(resp => {
      const reqData = resp.data[0];
      const { result = '' } = reqData;
      if (result === 'SUCCESS') {

        this.props.dispatch({
          type: 'login/updateAuthority',
          payload: {
            userID: '',
            userName: ''
          },
        });
        this.props.history.push('/');

      } else {
        const errorText = resp.data[0].data[0].reason;
        message.error(errorText);
      }
    });
  }

  render() {
    const { userName } = this.props.user;
    const { topMenu } = this.state;
    console.log(logopath);
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
                  <label style={{ color: '#D6E9C6', fontFamily: '微软雅黑' }}>{userName}</label>
                </a>
              </li>
              <li id="header_inbox_bar">
                <a>
                  <label style={{ fontFamily: '微软雅黑', color: '#D6E9C6' }} onClick={this.quitLogin}>退出</label>
                </a>
              </li>
            </ul>
          </div>
        </div>


        <div className={style.navbarCollapse}>
          <div className={style.containerFluid}>

            <ul className={style.nav}>
              {
                topMenu.map((ele, index) => {
                  return (
                    <li key={index} className={ele.isActive ? style.isActive : ''} onClick={this.changeTopMenu.bind(this, ele.name)}>{ele.name}</li>
                  )
                })
              }
            </ul>

          </div>
        </div>
      </React.Fragment >
    );
  }

}


export default connect((state) => ({
  user: state.login,
  loading: state.loading,
}))(PageTop);
