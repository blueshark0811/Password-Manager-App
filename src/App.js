import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from 'Containers/App';
import { configureStore } from 'Redux/store';
import {ToastsContainer, ToastsStore} from 'react-toasts';

const MainApp = () => (
	<Provider store={configureStore()}>
			<Router>
				<Switch>
					<Route path="/" component={App} />
				</Switch>
			</Router>

	</Provider>
);

export default  ReactDOM.render(
	<MainApp />,
	document.getElementById("root")
);