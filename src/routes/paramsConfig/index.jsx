import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import PageTop from '../../components/pageTop';
import NetWorkIP from './network/networkIP';
import NetWorkPort from './network/networkPort';
import { Route, NavLink } from 'dva/router';
import style from './style.css';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export default class ParamsConfig extends React.Component {
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    state = {
        collapsed: false,
        openKeys: ['sub1'],
    };

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight - 96;   //height
        const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;      //width
        const height = h - 96;

        return (
            <React.Fragment>
                <PageTop current='参数设置' history={this.props.history} />
                <Layout style={{ height: height + 'px' }}>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}  style={{backgroundColor:'#333e4c'}}>
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" openKeys={this.state.openKeys}
                            onOpenChange={this.onOpenChange} inlineCollapsed={true}
                            style={{backgroundColor:'#333e4c'}}
                            >
                                
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                                style={{float: 'right',marginRight: '10px'}}
                            />
                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
                                        <Icon type="mail" />
                                        <span>Navigation One</span>
                                    </span>
                                }
                                popupClassName={style.SubMenu}

                            >
                                <Menu.Item key="1">Option 1</Menu.Item>
                                <Menu.Item key="2">Option 2</Menu.Item>
                                <Menu.Item key="3">Option 3</Menu.Item>
                                <Menu.Item key="4">Option 4</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                                        <Icon type="appstore" />
                                        <span>Navigation Two</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="5">Option 5</Menu.Item>
                                <Menu.Item key="6">Option 6</Menu.Item>
                                <SubMenu key="sub3" title="Submenu">
                                    <Menu.Item key="7">Option 7</Menu.Item>
                                    <Menu.Item key="8">Option 8</Menu.Item>
                                </SubMenu>
                            </SubMenu>
                            <SubMenu
                                key="sub4"
                                title={
                                    <span>
                                        <Icon type="setting" />
                                        <span>Navigation Three</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="9">Option 9</Menu.Item>
                                <Menu.Item key="10">Option 10</Menu.Item>
                                <Menu.Item key="11">Option 11</Menu.Item>
                                <Menu.Item key="12">Option 12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content
                            style={{
                                background: '#fff',
                                minHeight: 280,
                            }}
                        >
                            <Route path="/params/IP" component={NetWorkIP} />
                            <Route path="/params/Port" component={NetWorkPort} />

                        </Content>
                    </Layout>
                </Layout>

            </React.Fragment>

        );
    }
}