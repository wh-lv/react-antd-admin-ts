import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Link, matchPath, RouteComponentProps, withRouter } from 'react-router-dom';
import { IRouter, leftRouter, router } from '../router';

const { SubMenu } = Menu;
const { Sider } = Layout;

interface IState {
    defaultOpenKeys: string[]
    defaultSelectedKeys: string[]
}
interface IProps extends RouteComponentProps {

}

export class LeftBar extends Component<IProps, IState> {

    constructor(props: IProps, context: any) {
        super(props, context);
        this.state = {
            defaultOpenKeys: [],
            defaultSelectedKeys: []
        }
    }

    componentDidMount() {
        this.heightMenu(leftRouter);
    }

    heightMenu = (leftRoutes: IRouter[]) => {
        let path = this.props.location.pathname;
        console.log(path);
        for (let r of leftRoutes) {
            let match = matchPath(path, { path: r.path });
            if (match) {
                if (match.isExact) {
                    this.setState({
                        defaultSelectedKeys: [r.key]
                    });
                } else {
                    this.setState({ defaultOpenKeys: [r.key] });
                }
            }
            if (r.children) {
                this.heightMenu(r.children);
            }
        }
    }

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
                    {
                        this.state.defaultSelectedKeys.length > 0 ?
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={this.state.defaultSelectedKeys}
                                defaultOpenKeys={this.state.defaultOpenKeys}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                {this.generateMenu(router)}
                            </Menu>
                            :
                            null
                    }
                </Sider>
            </>
        )
    };
};

export default withRouter(LeftBar);
