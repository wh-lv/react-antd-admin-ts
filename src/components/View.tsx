import React, { Component, Suspense, ReactNode } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import { router, onAuthRouter, IRouter } from "../router";
import AppLayout from './AppLayout';

export class View extends Component {

    generateRouter = (routerList?: IRouter[] ): ReactNode => {
        return (
            <>
                {
                    routerList?.map(r => {
                        if (r.children) {
                            return (
                                <>
                                    {this.generateRouter(r.children)}
                                </>
                            );
                        } else {
                            return (
                                <Route exact={r.exact} key={r.key} path={r.path}>
                                    {r.component}
                                </Route>
                            );
                        }
                    })
                }
            </>
        );
    }

    render() {
        return (
            <Suspense fallback={<></>}>
                <Router>
                    <Switch>
                        <Route path={"/"} exact>
                            <Redirect to={'/admin/dashboard'} />
                        </Route>
                        <Route path={'/admin'}>
                            <AppLayout>
                                {this.generateRouter(router)}
                            </AppLayout>
                        </Route>
                        {
                            onAuthRouter.map(r => (
                                <Route exact={r.exact} key={r.key} path={r.path}>{r.component}</Route>
                            ))
                        }
                    </Switch>
                </Router>
            </Suspense>
        )
    }
}

export default View
