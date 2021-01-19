import React from 'react';
import {
    Form,
    Select,
    InputNumber,
    Switch,
    Radio,
    Slider,
    Button,
    Upload,
    Icon,
    Rate,
    Checkbox,
    Row,
    Col,
    Input,
    Modal,
    message
} from 'antd';

const { Option } = Select;

class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSingleCard: false,
            ipValue: null,
        }
    }

    componentWillReceiveProps(nextProps) {
        // 表单form的选种值变化时也会执行到这里
        if (nextProps.editRow && nextProps.editRow !== this.props.editRow) {
            //if (nextProps.editRow) {
            if (nextProps.editRow.netMode === 'singleCard') {
                this.setState({
                    isSingleCard: false,
                    ipValue: nextProps.editRow.ipVersion
                });

            } else {
                this.setState({
                    isSingleCard: true,
                    ipValue: nextProps.editRow.ipVersion,
                });
            }
        }
    }



    handleOk = e => {
        console.log(e);
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.netMode !== 'singleCard') {
                    if (values.netcardOf.length < 2) {
                        message.error('网卡组成至少两个');
                        return;
                    }
                }
                this.props.edit(values,false);
            } else {
               message.error('信息输入不规范，请重新输入！');
            }
        }); 
    }

    handleCancel = e => {
        this.props.updateVisible(false);
    }

    handleChangeRadio = (e) => {
        if (e.target.value === 'singleCard') {
            this.setState({
                isSingleCard: false,
            });
        } else {
            this.setState({
                isSingleCard: true,
            });
        }
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <React.Fragment>
                {
                    this.props.visible ? <Modal
                        title="编辑"
                        cancelText="取消"
                        okText="确定"
                        visible={this.props.visible}
                        width={700}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Form {...formItemLayout}>
                            <Form.Item label="网卡名">
                                {
                                    getFieldDecorator('netCardName', {
                                        initialValue: this.props.editRow.netCardName,
                                        rules: [{ required: true, message: 'Please select your country!' }],
                                    })(
                                        <Input type="text" disabled />
                                    )
                                }
                            </Form.Item>

                            <Form.Item label="网络模式">
                                {getFieldDecorator('netMode', {
                                    initialValue: this.props.editRow.netMode,
                                })(
                                    <Radio.Group>
                                        <Radio value="singleCard" disabled={this.state.isSingleCard}>单网卡</Radio>
                                        <Radio value="faultTolerance">容错</Radio>
                                        <Radio value="loadBalance">负载均衡</Radio>
                                    </Radio.Group>
                                )}
                            </Form.Item>
                            <Form.Item label="网卡组成">
                                {getFieldDecorator('netcardOf', {
                                    initialValue: this.props.editRow.netcardOf.split(','),
                                })(
                                    <Checkbox.Group>
                                        
                                                <Checkbox value="网卡一">网卡一</Checkbox>
                                           
                                                <Checkbox value="网卡二">网卡二</Checkbox>
                                            
                                    </Checkbox.Group>,
                                )}
                            </Form.Item>
                            <Form.Item label="IP版本">
                                {
                                    getFieldDecorator('ipVersion', {
                                        initialValue: this.props.editRow.ipVersion
                                    })(
                                        <Select onSelect={(value) => {
                                            this.setState({
                                                ipValue: value,
                                            })
                                        }}>
                                            <Option value={4}>IPV4</Option>
                                            <Option value={6}>IPV6</Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                            <Form.Item label="MAC地址">
                                {
                                    getFieldDecorator('MAC', {
                                        initialValue: this.props.editRow.MAC,
                                    })(<Input type="text" disabled />)
                                }
                            </Form.Item>

                            <Form.Item label="模式" style={{ display: this.state.ipValue === 4 ? '' : 'none' }}>
                                {getFieldDecorator('ipDhcp', {
                                    initialValue: this.props.editRow.ipDhcp
                                })(
                                    <Radio.Group>
                                        <Radio value="static">静态</Radio>
                                        <Radio value="dhcp">DHCP</Radio>
                                    </Radio.Group>,
                                )}
                            </Form.Item>
                            <Form.Item label="IP地址">
                                {
                                    getFieldDecorator('ip', {
                                        initialValue: this.props.editRow.ip,
                                        rules:[{
                                            required:true,
                                            pattern:/^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-4]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/,
                                            message:'IP格式不正确'
                                        }]
                                    })(<Input type="type" />)
                                }
                            </Form.Item>
                            <Form.Item label="子网掩码" style={{ display: this.state.ipValue === 4 ? '' : 'none' }}>
                                {
                                    getFieldDecorator('netMask', {
                                        initialValue: this.props.editRow.netMask,
                                        rules:[{
                                            required:true,
                                            pattern:/^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-4]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/,
                                            message:'IP格式不正确'
                                        }]
                                    })(<Input type="type" />)
                                }
                            </Form.Item>
                            <Form.Item label='默认网关'>
                                {
                                    getFieldDecorator('gateWay', {
                                        initialValue: this.props.editRow.gateWay,
                                        rules:[{
                                            required:true,
                                            pattern:/^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-4]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/,
                                            message:'IP格式不正确'
                                        }]
                                    })(<Input type="type" />)
                                }
                            </Form.Item>

                            <Form.Item label='MTU'>
                                {
                                    getFieldDecorator('MTU', {
                                        initialValue: this.props.editRow.MTU,
                                        rules:[
                                            {
                                                required:true,
                                                message:'不能为空'
                                            },
                                            {
                                            validator:function(rule, value, callback) {
                                                if (value < 0 || value > 3000) {
                                                    callback("MTU的范围为0~3000");
                                                } else { //必须写这个
                                                    callback();
                                                }
                                            }
                                        }]
                                    })(<Input type="type" />)
                                }
                            </Form.Item>

                            <Form.Item label='首选DNS'>
                                {
                                    getFieldDecorator('firstDNS', {
                                        initialValue: this.props.editRow.firstDNS,
                                    })(<Input type="type" />)
                                }
                            </Form.Item>
                            <Form.Item label='备选DNS'>
                                {
                                    getFieldDecorator('secondDNS', {
                                        initialValue: this.props.editRow.secondDNS,
                                    })(<Input type="type" />)
                                }
                            </Form.Item>

                            <Form.Item label="拉流网卡">
                                {
                                    getFieldDecorator('streamNet', {
                                        initialValue: this.props.editRow.streamNet
                                    })(
                                        <Select>
                                            <Option value={1}>是</Option>
                                            <Option value={0}>否</Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Form>
                    </Modal> : ''
                }


            </React.Fragment>





        )
    }

}

export default Form.create()(EditForm);
