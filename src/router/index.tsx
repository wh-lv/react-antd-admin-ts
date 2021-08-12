import React, { ReactNode, lazy } from 'react';
import { UserOutlined, DashboardOutlined } from '@ant-design/icons';

const Login  = lazy(() => import('../pages/login'));
const Page404  = lazy(() => import('../pages/Page404'));
const Dashboard = lazy(() => import('../pages/index/Dashboard'));
const UserList = lazy(() => import('../pages/user/UserList'));
const AdminList = lazy(() => import('../pages/admin/AdminList'));

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
    {
        path: "/admin/admin",
        title: "管理员管理",
        key: "admin",
        icon: <UserOutlined />,
        children: [
            {
                path: "/admin/admin/list",
                title: "管理员列表",
                key: "adminList",
                icon: <UserOutlined />,
                component: <AdminList />,
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

