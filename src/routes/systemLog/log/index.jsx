import React from 'react';

import { DatePicker, Select, Row, Col, Table, Card, Breadcrumb,Button,message } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import * as Api  from '../../../services/login';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';





export default class Log extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beginTime: moment(new Date()).subtract(1, 'months'),
            endTime: moment(new Date()),
            endOpen: false,
            logType: '7',
            logData: [],
        }
    }

    componentDidMount(){
        this.queryLog();
    }

    disabledStartDate = startValue => {
        const { endTime } = this.state;
        if (!startValue || !endTime) {
            return false;
        }
        return startValue.valueOf() > endTime.valueOf();
    };

    disabledEndDate = endValue => {
        const { beginTime } = this.state;
        if (!endValue || !beginTime) {
            return false;
        }
        return endValue.valueOf() <= beginTime.valueOf();
    };

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    onStartChange = value => {
        this.onChange('beginTime', value);
    };

    onEndChange = value => {
        this.onChange('endTime', value);
    };

    handleStartOpenChange = open => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };

    handleEndOpenChange = open => {

        this.setState({ endOpen: open });
    };

    handleChange = (value) => {
        this.setState({
            logType: value,
        })
    }

    queryLog =()=> {
        Api.queryLog({
            endTime:moment(this.state.endTime).format('YYYY-MM-DD HH:mm:ss'),
            logType:this.state.logType,
            reqType:'GET',
            startTime:moment(this.state.beginTime).format('YYYY-MM-DD HH:mm:ss'),
            userID:this.props.user.userID,
        }).then(resp => {
              console.log(resp);
            const reqData = resp.data[0];
            const { result = '', data = [] } = reqData;
            if (result === 'SUCCESS') {
                this.setState({
                    logData:data,
                });

            } else {
              message.error(reqData.data[0].reason);
            }
        });

    }

    clearLog =()=> {
      Api.queryLog({
        "userID": this.props.user.userID,
        "reqType": "DELETE",
      }).then(resp => {
        const reqData = resp.data[0];
        const { result = ''} = reqData;
        if (result === 'SUCCESS') {
          message.success('清除成功');

        } else {
          message.error(reqData.data[0].reason);
        }

      });
    }

    exportLog =()=> {
        if (this.state.logData <= 0) {
            alert("请查询到结果再备份！");
            return;
          }
          const exportArr = [];
          for(let i=0;i<this.state.logData.length;i++) {
            let logType = '';
            if (parseInt(this.state.logData[i].logType,0) === 0) {
              logType = '磁盘操作';
            } else if (parseInt(this.state.logData[i].logType,0) === 1) {
              logType = '系统操作';
            } else if (parseInt(this.state.logData[i].logType,0) === 2) {
              logType = '配置操作';
            } else if (parseInt(this.state.logData[i].logType,0) === 3) {
              logType = '报警事件';
            } else if (parseInt(this.state.logData[i].logType,0) === 4) {
              logType = '用户管理';
            } else if (parseInt(this.state.logData[i].logType,0) === 5) {
              logType = '文件操作';
            } else if (parseInt(this.state.logData[i].logType,0) === 6) {
              logType = '连接日志';
            } else {
              logType = '其他';
            }
            const obj = {"序号":(i+1),"日志记录时间":this.state.logData[i].recordTime,"类型":logType,"用户所在组":this.state.logData[i].groupName ,"用户名":this.state.logData[i].userName,"登录IP":this.state.logData[i].loginIP,"内容":this.state.logData[i].text };
            exportArr.push(obj);
          }
          const worksheet = XLSX.utils.json_to_sheet(exportArr);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, '日志备份');

    }

    saveAsExcelFile(buffer, fileName) {
        const data = new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        });
        const date = new Date();
        const dateString = date.getFullYear()+""+(date.getMonth()+1)+""+date.getDate()+""+date.getHours()+""+date.getMinutes()+""+date.getSeconds();
        FileSaver.saveAs(data, fileName + '_' + dateString + '.xlsx');
      }
    render() {
        const { beginTime, endTime, endOpen, logData,logType } = this.state;
        const columns = [
            {
                title: '序号',
                render: (text, record, index) => {
                    return index+1;
                }
            },
            {
                title: '类型',
                dataIndex: 'logType',
                key: 'logType',
                render: (text) => {
                    if (parseInt(text, 0) === 0) {
                        return '磁盘操作';
                    } else if (parseInt(text, 0) === 1) {
                        return '系统操作';
                    } else if (parseInt(text, 0) === 2) {
                        return '配置操作';
                    } else if (parseInt(text, 0) === 3) {
                        return '报警事件';
                    } else if (parseInt(text, 0) === 4) {
                        return '用户管理';
                    } else if (parseInt(text, 0) === 5) {
                        return '文件操作';
                    } else if (parseInt(text, 0) === 6) {
                        return '连接日志';
                    } else {
                        return '其他';
                    }
                },
            },
            {
                title: '记录时间',
                dataIndex: 'recordTime',
                key: 'recordTime',
            },
            {
                title: '组名',
                dataIndex: 'groupName',
                key: 'groupName',
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '登录IP',
                dataIndex: 'loginIP',
                key: 'loginIP',
            },
            {
                title: '内容',
                dataIndex: 'text',
                key: 'text',
            },
        ];
        return (
            <React.Fragment>
                <Row>
                    <Col span={24}>
                    <Breadcrumb separator="">
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Separator>&gt;</Breadcrumb.Separator>
                    <Breadcrumb.Item>系统信息</Breadcrumb.Item>
                    <Breadcrumb.Separator>&gt;</Breadcrumb.Separator>
                    <Breadcrumb.Item>系统日志</Breadcrumb.Item>
                    <Breadcrumb.Separator>&gt;</Breadcrumb.Separator>
                    <Breadcrumb.Item>日志信息</Breadcrumb.Item>
                </Breadcrumb>
                    </Col>
                    </Row>
             
                <Card title="日志信息" extra={ <><Button type="primary" onClick={this.clearLog}>清空</Button><Button type="primary" onClick={this.exportLog}>导出</Button></>}>
                    <Row>
                        <Col span={6}>
                            <DatePicker
                                disabledDate={this.disabledStartDate}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                value={beginTime}
                                locale={locale}
                                placeholder="Start"
                                onChange={this.onStartChange}
                                onOpenChange={this.handleStartOpenChange}
                            />
                        </Col>

                        <Col span={6}>
                            <DatePicker
                                disabledDate={this.disabledEndDate}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                value={endTime}
                                locale={locale}
                                placeholder="End"
                                onChange={this.onEndChange}
                                open={endOpen}
                                onOpenChange={this.handleEndOpenChange}
                            />
                        </Col>

                        <Col span={6}>
                            <Select defaultValue={logType} style={{ width: 120 }} onChange={this.handleChange}>
                                <Select.Option value="7">全部</Select.Option>
                                <Select.Option value="0">磁盘操作</Select.Option>
                                <Select.Option value="1">系统操作</Select.Option>
                                <Select.Option value="2">配置操作</Select.Option>
                                <Select.Option value="3">报警操作</Select.Option>
                                <Select.Option value="4">用户操作</Select.Option>
                                <Select.Option value="5">文件操作</Select.Option>
                                <Select.Option value="6">连接日志</Select.Option>
                            </Select>
                        </Col>
                        <Col span={6}>
                           <Button type="primary" onClick={this.queryLog}>查询</Button>
                        </Col>
                    </Row>
                    <Row style={{marginTop:'10px'}}>
                        <Table columns={columns} dataSource={logData} />
                    </Row>
                </Card>
            </React.Fragment>
        )
    }
}