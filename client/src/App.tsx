import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import VacNavbar from './components/vac-navbar';

import VacFooter from './components/vac-footer';

import { AppRoutes } from './app-router/appRouter';
import { routes } from './app-router/routers.config';
const App: React.FC = () => {
	return (
		<div>
			<BrowserRouter>
				<VacNavbar />
				<Switch>
					<AppRoutes routes={routes} />
				</Switch>
				<VacFooter />
			</BrowserRouter>
		</div>
	);
};

export default App;
