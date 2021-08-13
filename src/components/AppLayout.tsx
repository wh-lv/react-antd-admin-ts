import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import LeftBar from './LeftBar';
import SubTitle from './SubTitle'

const { Header, Content } = Layout;

export class AppLayout extends Component {
    render() {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <LeftBar />
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <SubTitle />
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    };
};

export default AppLayout;

