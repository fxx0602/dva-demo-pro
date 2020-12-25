import React from 'react';
import { connect } from 'dva';
//import styles from './login.css';
import { Button } from 'antd';
import { Input } from 'antd';
import * as loginApi from '../services/login';


class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:''
    };
  }


  clickHandler =() => {
    loginApi.login({
      reqType: "POST",
      userName: this.state.username,
      userTextPWD: "96e79218965eb72c92a549dd5a330112",
    }).then(resp => {

      console.log(resp.data);
      const { result = '' }  = resp.data[0];
      if (result === 'SUCCESS') {
        alert('登录成功');
      } else {
        alert('登录失败');
      }
    });
  }

  onChangeHandler(e){
    this.setState({
      [e.target.name]:e.target.value,
    });
  }


  render() {
    return(
      <div>
        <Input placeholder="Basic usage" name="username" onChange={this.onChangeHandler.bind(this)}/>
        <Input placeholder="Basic usage" name="password" onChange={this.onChangeHandler.bind(this)}/>
         <Button type="primary" onClick={this.clickHandler}>登录</Button>
      </div>

    );
  }
}


export default connect()(LoginPage);
