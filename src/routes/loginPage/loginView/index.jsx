import React from 'react';
import style from './style.css';
import { Form, Icon, Input, Button, Alert,message } from 'antd';
import ModifyPassWd from '../../../components/modifyPassWd';

import logo from '../../../assets/img/login_logo.png';

class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            visible: false,
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.errorText !== '') {
            this.setState({
                isError: true,
            });
        }
        if (nextProps.actived !== this.props.actived) {
          this.setState({
            visible:parseInt(nextProps.actived,0) === 0,
          });
        }
    }


    onClose = e => {
        console.log(e, 'I was closed.');
    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values.username, values.password);
            }
        });
    }

    showModal = () => {
        this.setState({ visible: true });
    }

    handleCancel = () => {
        this.setState({ visible: false });
      }
    
      handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
          const { confirmPw,password} = values;
          if (confirmPw !== password) {
              message.warn('两次密码不一样')
              return;
          }
          form.resetFields();
          this.setState({ visible: false });
          const formValues = this.props.form.getFieldsValue();
          this.props.modifyPassword(formValues.username,formValues.password,values.password);
        });
      }
    
      saveFormRef = formRef => {
        this.formRef = formRef;
      }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isError } = this.state;
        return (
            <React.Fragment>
                <div className={style.login}>
                    <div className={style.logo}>
                        <a>
                            <img src={logo} alt="logo" />
                        </a>
                    </div>
                    <div className={style.content}>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <h3 style={{ marginTop: '30px', marginBottom: '25px' }}>登录</h3>
                            {
                                isError ?
                                    <Alert
                                        style={{ marginBottom: '10px' }}
                                        description={this.props.errorText}
                                        type="error"
                                        closable
                                        onClose={this.onClose}
                                    /> : ''
                            }

                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '用户名不能为空' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                        style={{ height: '40px' }}
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
                                        style={{ height: '40px' }}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%', backgroundColor: '#44b6ae', height: '40px' }}>
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
                <ModifyPassWd 
                 wrappedComponentRef={this.saveFormRef}
                 visible={this.state.visible}
                 onCancel={this.handleCancel}
                 onCreate={this.handleCreate}
                 />
            </React.Fragment>

        );
    }
}

export default Form.create()(LoginView);
