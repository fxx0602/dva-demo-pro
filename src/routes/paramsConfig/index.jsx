import React from 'react';
import { Layout } from 'antd';
import PageTop from '../../components/pageTop';
import NetWorkIP from './network/networkIP';
import NetWorkPort from './network/networkPort';
import SystemAutoMain from './system/automain';
import SystemCommon from './system/common';
import LeftSlider from '../../components/LeftSlider';
import { Route, } from 'dva/router';
import style from './style.css';
import { connect } from 'dva';
const { Content } = Layout;


class ParamsConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuData:[],
        }
    }



    componentDidMount() {
    
        const menuData = [{
            pkey:'network',
            pname:'网络管理',
            icon:'global',
            children:[{
                key:'IP',
                name:'TCP/IP',
                path:'/params/IP'
            },{
                key:'Domain',
                name:'端口',
                path:'/params/domain'
            }]
        },{
            pkey:'system',
            pname:'系统管理',
            icon:'environment',
            children:[{
                key:'common',
                name:'普通设置',
                path:'/params/common'
            },{
                key:'auto',
                name:'自动维护',
                path:'/params/auto'
            }]
        }];
       
        this.setState({
            menuData:menuData,
        });
    }

  


    render() {
        const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight - 96;   //height
        const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;      //width
        const height = h - 96;

        return (
            <React.Fragment>
                <PageTop current='参数设置' history={this.props.history} />
                <Layout style={{ height: height + 'px' }}>
                    <LeftSlider history={this.props.history} menuData={this.state.menuData} />
                    <Layout>
                        <Content
                            style={{
                                background: '#fff',
                                minHeight: 280,
                            }}
                        >
                            <Route path="/params/IP" render={() => <NetWorkIP user={this.props.user}/>} />
                            <Route path="/params/domain" component={NetWorkPort} />
                            <Route path="/params/common" component={SystemCommon} />
                            <Route path="/params/auto" component={SystemAutoMain} />
                        </Content>
                    </Layout>
                </Layout>

            </React.Fragment>

        );
    }
}

function mapStateToProps(state) {
    return {
        user:state.login,
        loading:state.loading,
    }
}

export default connect(mapStateToProps)(ParamsConfig);