import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { IRouter, router } from '../router';

const { SubMenu } = Menu;
const { Sider } = Layout;

export class LeftBar extends Component {

    generateMenu = (routerList?: IRouter[]) => {
        return (
            <>
                {
                    routerList?.map(r => {
                        if (r.children) {
                            return (
                                <SubMenu key={r.key} title={r.title}>
                                    {
                                        this.generateMenu(r.children)
                                    }
                                </SubMenu>
                            );
                        } else {
                            return (
                                <Menu.Item key={r.key} icon={r.icon}>
                                    <Link to={r.path}>{r.title}</Link>
                                </Menu.Item>
                            );
                        }
                    })
                }
            </>
        );
    }

    render() {
        return (
            <>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['dashboard']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        {this.generateMenu(router)}
                    </Menu>
                </Sider>
            </>
        )
    };
};

export default LeftBar;
