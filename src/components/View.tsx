import React, { Component, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import { router, onAuthRouter } from "../router";

export class View extends Component {
    render() {
        return (
            <Suspense fallback={<></>}>
                <Router>
                    <Switch>
                        <Route path={"/"} exact>
                            <Redirect to={'/dashboard'} />
                        </Route>
                        {
                            router.map(r => (
                                <Route exact={r.exact} key={r.key} path={r.path}>{r.component}</Route>
                            ))
                        }
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
