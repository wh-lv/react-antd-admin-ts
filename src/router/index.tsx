import React, { ReactNode, lazy } from 'react';

const Login  = lazy(() => import('../pages/login'));
const Page404  = lazy(() => import('../pages/Page404'));
const Dashboard = lazy(() => import('../pages/index/Dashboard'));
interface IRouter {
    title: string
    path: string
    key: string
    exact?: boolean
    component?: ReactNode,
    children?: IRouter[]
}

export const router: IRouter[] = [
    {
        path: "/dashboard",
        title: "仪表盘",
        key: "dashboard",
        component: <Dashboard />
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

