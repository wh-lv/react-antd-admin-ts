import React, { Component, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import router from "../router";

export class View extends Component {
    render() {
        return (
            <Suspense fallback={<></>}>
                <Router>
                    {
                        router.map(r => (<Route exact={true} key={r.key} path={r.path}>{r.component}</Route>))
                    }
                </Router>
            </Suspense>
        )
    }
}

export default View
