import React from 'react';
import PageTop from '../../components/pageTop';
import LeftSlider from '../../components/LeftSlider';
import Log from './log';
import OnlineUser from './onlineUser';
import Version from './version';
import { Layout } from 'antd';
import { Route} from 'dva/router';

const { Content } = Layout;

export default class SystemLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuData:[],
        }
    }

    componentDidMount() {
        const menuData = [{
            pkey:'sysInfo',
            pname:'系统信息',
            icon:'setting',
            children:[{
                key:'version',
                name:'版本信息',
                path:'/log/version'
            },{
                key:'log',
                name:'日志信息',
                path:'/log/log'
            },{
               key:'online',
               name:'在线用户',
               path:'/log/online'
            }]
        }];
        this.setState({
            menuData:menuData
        });
    }
    render() {
        const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight - 96;   //height
        const height = h - 96;
        return(
            <React.Fragment>
                  <PageTop current='系统日志' history={this.props.history} />
                  <Layout style={{ height: height + 'px' }}>
                    <LeftSlider history={this.props.history} menuData={this.state.menuData} />
                    <Layout>
                        <Content
                            style={{
                                background: '#fff',
                                minHeight: 280,
                            }}
                        >
                            <Route path="/log/version" component={Version} />
                            <Route path="/log/log" component={Log} />
                            <Route path="/log/online" component={OnlineUser} />
                        </Content>
                    </Layout>
                </Layout>
            </React.Fragment>
          
        )
    }
}