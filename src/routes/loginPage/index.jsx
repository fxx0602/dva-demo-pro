import React from 'react';
import { connect } from 'dva';
import md5 from "js-md5";
import LoginView from './loginView';
import * as Api from '../../services/login';



class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }


    componentDidMount() {
        console.log(this.props);
    }

    login = (name,password) => {
        Api.login({
            reqType: "POST",
            userName: name,
            userTextPWD: md5(password),
        }).then(resp => {
            console.log(resp.data);
            const { result = '' } = resp.data[0];
            if (result === 'SUCCESS') {
                alert('登录成功');
            } else {
                alert('登录失败');
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <LoginView login={this.login} />
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        user:state.login
    }
}

export default connect(mapStateToProps)(LoginPage);
