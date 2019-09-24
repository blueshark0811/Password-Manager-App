import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import settings from './settings';

export default ({ match }) => (
    <Switch>
        <Route path={`${match.url}/`} component={settings} />
        <Redirect to="/error" />
    </Switch>
);