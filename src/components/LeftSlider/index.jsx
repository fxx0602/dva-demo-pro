import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { NavLink } from 'dva/router';
import style from './style.less'


const { Sider } = Layout;
const { SubMenu } = Menu;


export default class LeftSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            openKeys: [],
            selectedKeys: [],
            rootSubmenuKeys: [],
        }
    }



    componentWillReceiveProps(nextProps) {
        const { menuData } = nextProps;
        if (JSON.stringify(menuData) !== JSON.stringify(this.props.menuData)) {
            if (menuData.length > 0) {
                const rootSubmenuKeys = [];
                for (let i = 0; i < menuData.length; i++) {
                    rootSubmenuKeys.push(menuData[i].pkey);
                }
                this.setState({
                    openKeys: [menuData[0].pkey],
                    selectedKeys: [menuData[0].children[0].key],
                    rootSubmenuKeys: rootSubmenuKeys,
                });
                this.props.history.push(menuData[0].children[0].path);
            }
        }
    
    }

    
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);

        if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }


    onClickSubMenu = (obj) => {
        const { key } = obj;
        const one = this.props.menuData.find((currentValue, index, arr) => {
            return currentValue.pkey === key;
        });

    
        this.setState({
            selectedKeys:one.children[0].key,
        });
        this.props.history.push(one.children[0].path);
    }

    clickItem = (obj) => {
        const { key } = obj;
        this.setState({
            selectedKeys: [key],
        });
    }


    render() {
        return (
            <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{ backgroundColor: '#333e4c' }}>
                <div className="logo" />

                <Icon
                        className="trigger"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                        style={{ float: 'right', marginRight: '10px',color:'white' }}
                    />

                <Menu theme="dark" mode="inline" openKeys={this.state.openKeys}
                    selectedKeys={this.state.selectedKeys}
                    onOpenChange={this.onOpenChange}
                    style={{ backgroundColor: '#333e4c',clear:'both' }}
                    onClick={this.clickItem}
                >
                   
                  
                    {
                        this.props.menuData.map((ele, index) => {
                            return (
                                <SubMenu key={ele.pkey}
                                    title={<span>
                                        <Icon type={ele.icon} />
                                        <span>{ele.pname}</span>
                                    </span>}
                                    popupClassName={style.SubMenu}
                                    onTitleClick={this.onClickSubMenu}
                                >
                                    {
                                        ele.children.map((element, i) => {
                                            return (
                                                <Menu.Item key={element.key}>
                                                    <NavLink to={element.path}>
                                                        {element.name}
                                                    </NavLink>
                                                </Menu.Item>
                                            )
                                        })
                                    }


                                </SubMenu>
                            )
                        })
                    }
                </Menu>
            </Sider>

        );
    }
}