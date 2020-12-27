import React from 'react';
import style from './style.css';
import { Form, Icon, Input, Button } from 'antd';

import logo from '../../../assets/img/login_logo.png';

class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values.username,values.password);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className={style.login}>
                <div className={style.logo}>
                    <a>
                        <img src={logo} alt="logo" />
                    </a>
                </div>
                <div className={style.content}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <h3 style={{marginTop:'30px',marginBottom:'25px'}}>登录</h3>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '用户名不能为空' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                    style={{height:'40px'}}
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '密码不能为空' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                    style={{height:'40px'}}
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%',backgroundColor:'#44b6ae',height:'40px'}}>
                                登录
                            </Button>
                        </Form.Item>
                        <div className={style.create_account}>
                            <p>
                                Copyright©2017 HISOME Digital Equipment Co.,LTD.<br />
                                All right reserved
                            </p>
                        </div>
                    </Form>
                </div>
            </div>

        );
    }
}

export default Form.create()(LoginView);