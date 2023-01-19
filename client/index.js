import React from 'react';

// ReactDOM has been deprecated instead use createRoot...
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes, Link, Switch } from 'react-router-dom';
import history from './history';

import store from './store';
//Components:
import App from './components/App';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
	<Provider store={store}>
		<BrowserRouter history={history}>
			<App />
		</BrowserRouter>
	</Provider>
);
