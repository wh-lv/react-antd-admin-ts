import React, { ReactNode, lazy } from 'react';
import { UserOutlined, DashboardOutlined } from '@ant-design/icons';

const Login  = lazy(() => import('../pages/login'));
const Page404  = lazy(() => import('../pages/Page404'));
const Dashboard = lazy(() => import('../pages/index/Dashboard'));
const UserList = lazy(() => import('../pages/user/UserList'));

export interface IRouter {
    title: string
    path: string
    key: string
    icon?: ReactNode
    exact?: boolean
    component?: ReactNode,
    children?: IRouter[]
}

export const router: IRouter[] = [
    {
        path: "/admin/dashboard",
        title: "仪表盘",
        key: "dashboard",
        icon: <DashboardOutlined />,
        component: <Dashboard />
    },
    {
        path: "/admin/user",
        title: "用户管理",
        key: "user",
        icon: <UserOutlined />,
        children: [
            {
                path: "/admin/user/list",
                title: "用户列表",
                key: "list",
                icon: <UserOutlined />,
                component: <UserList />,
            }
        ]
    },
];

export const onAuthRouter: IRouter[] = [
    {
        path: "/login",
        title: "登录",
        key: "login",
        component: <Login />
    },
    {
        path: "*",
        title: "404",
        key: "404",
        component: <Page404 />
    }
];

