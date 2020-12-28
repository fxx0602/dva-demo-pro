import React from 'react';
import { connect } from 'dva';
import md5 from "js-md5";
import LoginView from './loginView';
import * as Api from '../../services/login';
import { Spin } from 'antd';
import style from './login.css';



class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorText:'',
            actived:1, //新用户要修改密码
        };
    }


    componentDidMount() {
      this.props.dispatch({
          type:"login/getVersion",
          payload:{
            reqType: "GET",
            type: "1",
            userID: "123456"
          }
      });
    }

    login = (name,password) => {
        Api.login({
            reqType: "POST",
            userName: name,
            userTextPWD: md5(password),
        }).then(resp => {
            const reqData = resp.data[0];
            const { result = '', data = [] } = reqData;
            if (result === 'SUCCESS') {
                alert('登录成功');
                const{ actived } = data[0];
                this.setState({
                    actived:actived,
                });
                this.props.dispatch({
                    type:'login/updateAuthority',
                    payload:data[0],
                });
                if (parseInt(actived,0) !== 0) {
                  this.props.history.push('/pageTop');
                }
            } else {
                const errorText = resp.data[0].data[0].reason;
                this.setState({
                    errorText:errorText,
                });
            }
        });
    }

    modifyPassword =(username,oldps,newps) => {
      const data ={
        "reqType":"POST",
        "userID":this.props.user.userID.toString(),
        "userName":username,
        "oldPassword":md5(oldps),
        "newPassword":md5(newps),
      };
      Api.modifyPassword(data).then(resp => {
        const reqData = resp.data[0];
                const { result = ''} = reqData;
                if (result === 'SUCCESS') {
                  alert('修改成功');
                } else {
                  alert('修改失败');
                }
      });
    };

    render() {
        const loading = this.props.loading.effects['login/getVersion'];
        console.log("loading"+loading);
        return (
            <React.Fragment>
                 <Spin spinning={loading} wrapperClassName={style.spinHeight}>
                  <LoginView login={this.login} errorText={this.state.errorText} actived={this.state.actived} modifyPassword={this.modifyPassword} />
                </Spin>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        user:state.login,
        loading:state.loading,
    }
}

export default connect(mapStateToProps)(LoginPage);
