import React, { Component, ReactNode } from 'react'
import { Breadcrumb } from 'antd';
import { IRouter, router } from '../router';
import { matchPath, RouteComponentProps, withRouter } from 'react-router-dom';

interface IProps extends RouteComponentProps {

}
export class SubTitle extends Component<IProps> {
    generate = (routerList: IRouter[]): ReactNode => {
        let path = this.props.location.pathname;
        return (
            <>
                {
                    routerList.map(r => {
                        let match = matchPath(path, { path: r.path });
                        if (match) {
                            return (
                                <>
                                    <Breadcrumb.Item>{r.title}</Breadcrumb.Item>
                                    {
                                        r.children ?
                                            this.generate(r.children) :
                                            null
                                    }
                                </>
                            )
                        }
                        return null;
                    })
                }
            </>
        )
    }
    render() {
        return (
            <Breadcrumb style={{ margin: '16px 0' }}>
                {
                    this.generate(router)
                }
            </Breadcrumb>
        )
    }
}

export default withRouter(SubTitle);
