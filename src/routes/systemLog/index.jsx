import React from 'react';
import { connect } from 'dva';
import PageTop from '../../components/pageTop';
import LeftSlider from '../../components/LeftSlider';
import Log from './log';
import OnlineUser from './onlineUser';
import Version from './version';
import { Layout } from 'antd';
import { Route} from 'dva/router';

const { Content } = Layout;

class SystemLog extends React.Component {
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
                path:'/sys/version'
            },{
                key:'log',
                name:'日志信息',
                path:'/sys/log'
            },{
               key:'online',
               name:'在线用户',
               path:'/sys/online'
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
                            <Route path="/sys/version" component={Version} />
                            <Route path="/sys/log" render={() => <Log user={this.props.user} />} />
                            <Route path="/sys/online" component={OnlineUser} />
                        </Content>
                    </Layout>
                </Layout>
            </React.Fragment>
          
        )
    }
}

function mapStateToProps(state) {
    return {
        user:state.login,
        loading:state.loading,
    }
}

export default connect(mapStateToProps)(SystemLog);