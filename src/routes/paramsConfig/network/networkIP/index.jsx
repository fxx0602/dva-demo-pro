import React from 'react';
import { Row, Col, Table, Card, Breadcrumb, Button, message, Icon, Spin } from 'antd';
import EditForm from './editForm';

import * as Api from '../../../../services/login';

export default class NetWorkIP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ipData: [],
            visible: false,
            editRow: null,
            editIP: '',
            loading: false,
        }
    }



    componentDidMount() {
        this.queryIPList();
    }

    queryIPList() {
        this.setState({
            loading: true,
        });
        Api.ipOperator({
            reqType: "GET",
            userID: this.props.user.userID
        }).then(resp => {
            const respData = resp.data[0];
            const { result, data } = respData;
            if (result === 'SUCCESS') {
                if (data.length === 1) {
                    data[0].netCardName = data[0].netCardName + '绑定';
                }
                this.setState({
                    ipData: data,
                    loading: false,
                });
            } else {
                message.error(respData.data[0].reason);
            }
        });
    }

    editIP(record, e) {
        e.preventDefault();
        this.setState({
            visible: true,
            editRow: record,
            editIP: record.ip,
        });
    }

    edit = (values, visible) => {
        console.log(window.location.host);
        this.setState({
            loading:true,
            visible: visible,
        });
        const data = {
            userID: this.props.user.userID,
            reqType: 'POST',
            netCardName: values.netCardName.indexOf('绑定') === -1 ? values.netCardName.indexOf('绑定') === -1 : values.netCardName.substring(0, 3),
            ip: values.ip,
            netMode: values.netMode,
            netcardOf: values.netcardOf.join(','),
            netCardBind: values.netMode !== 'singleCard' ? '1' : '0',
            ipVersion: values.ipVersion,
            ipDhcp: values.ipDhcp,
            gateWay: values.gateWay,
            netMask: values.netMask,
            MTU: values.MTU,
            mac: values.MAC,
            firstDNS: values.firstDNS,
            secondDNS: values.secondDNS,
            streamNet: values.streamNet,
        }
        if (window.location.host.indexOf(this.state.editIP) === -1) {
            Api.ipOperator(data)
                .then(resp => {
                    const respData = resp.data[0];
                    const { result, data } = respData;
                    if (result === 'SUCCESS') {
                        message.success('修改成功');
                        this.setState({
                            visible: visible,
                            loading:false,
                        });
                        this.queryIPList();
                    } else {
                        this.setState({
                            loading:false,
                        });
                        message.error(respData.data[0].reason);
                    }
                });
        } else {
            Api.ipOperator(data)
                .then(resp => {
                    const respData = resp.data[0];
                    const { result, data } = respData;
                    if (result === 'SUCCESS') {
                        message.success('修改成功');
                        this.setState({
                            visible: visible,
                            loading:false,
                        });
                        this.queryIPList();
                    } else {
                        this.setState({
                            loading:false,
                        });
                        message.error(respData.data[0].reason);
                    }
                });
            setTimeout(function () {
                window.location.href = 'http://' + values.ip;
            }, 10000);
        }
    }

    updateVisible = (flag) => {
        this.setState({
            visible: flag,
        });
    }

    render() {
        const columns = [
            {
                title: '网卡名',
                dataIndex: 'netCardName',
                key: 'netCardName',
            }, {
                title: 'IP地址',
                dataIndex: 'ip',
                key: 'ip',
            }, {
                title: '网络模式',
                dataIndex: 'netMode',
                key: 'netMode',
                render: (text) => {
                    if (text === 'faultTolerance') {
                        return '容错';
                    } else if (text === 'singleCard') {
                        return '单网卡';
                    } else if (text === 'loadBalance') {
                        return '负载均衡';
                    }
                }

            }, {
                title: '网卡组成',
                dataIndex: 'netcardOf',
                key: 'netcardOf',
            }, {
                title: '默认网关',
                dataIndex: 'gateWay',
                key: 'gateWay',
            }, {
                title: 'MAC地址',
                dataIndex: 'MAC',
                key: 'MAC',
            }, {
                title: '子网掩码',
                dataIndex: 'netMask',
                key: 'netMask',
            }, {
                title: '模式',
                dataIndex: 'ipDhcp',
                key: 'ipDhcp',
                render: (text) => {
                    if (text === 'static') {
                        return '静态';
                    } else if (text === 'dhcp') {
                        return 'DHCP';
                    }
                }
            }, {
                title: 'MTU',
                dataIndex: 'MTU',
                key: 'MTU',
            }, {
                title: '首选DNS',
                dataIndex: 'firstDNS',
                key: 'firstDNS',
            }, {
                title: '备选DNS',
                dataIndex: 'secondDNS',
                key: 'secondDNS',
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Icon type="edit" onClick={(e) => this.editIP(record, e)} />
                    </span>
                ),
            }
        ]
        return (
            <React.Fragment>
                <Spin spinning={this.state.loading}>
                    <Row>
                        <Col span={24}>
                            <Breadcrumb separator="">
                                <Breadcrumb.Item>首页</Breadcrumb.Item>
                                <Breadcrumb.Separator>&gt;</Breadcrumb.Separator>
                                <Breadcrumb.Item>参数设置</Breadcrumb.Item>
                                <Breadcrumb.Separator>&gt;</Breadcrumb.Separator>
                                <Breadcrumb.Item>网络设置</Breadcrumb.Item>
                                <Breadcrumb.Separator>&gt;</Breadcrumb.Separator>
                                <Breadcrumb.Item>TCP/IP</Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                    </Row>

                    <Card title="TCP/IP" extra={<><Button type="primary" >刷新</Button></>}>
                        <Table columns={columns} dataSource={this.state.ipData} rowKey="netCardName" />
                    </Card>

                    <EditForm visible={this.state.visible} editRow={this.state.editRow} updateVisible={this.updateVisible} edit={this.edit} />
                </Spin>
            </React.Fragment>
        )
    }
}