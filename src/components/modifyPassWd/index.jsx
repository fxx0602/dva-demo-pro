import React from 'react';
import { Modal, Form, Input} from 'antd';

class ModifyPassWd extends React.Component {
    render() {
        const { visible, form, onCancel, onCreate, } = this.props;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
          }
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title="修改密码"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="horizontal">
              <Form.Item label="新密码" {...formItemLayout}>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input the title of collection!' }],
                })(<Input type="password" />)}
              </Form.Item>
              <Form.Item label="确认密码" {...formItemLayout}>
                {getFieldDecorator('confirmPw',{
                    rules: [{ required: true, message: 'Please input the title of collection!' }],
                })(<Input type="password" />)}
              </Form.Item>
            </Form>
          </Modal>
        );
      }
}

export default Form.create()(ModifyPassWd);