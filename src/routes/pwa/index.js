import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import settings from './settings';

export default ({ match }) => (
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/settings`} />
        <Route path={`${match.url}/settings`} component={settings} />
        <Redirect to="/error" />
    </Switch>
);