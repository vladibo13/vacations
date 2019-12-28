import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import VacNavbar from './components/vac-navbar';
import VacRegister from './components/vac-register';
import VacFooter from './components/vac-footer';
import VacLogin from './components/vac-login';
const App: React.FC = () => {
	return (
		<div>
			<BrowserRouter>
				<VacNavbar />

				<Switch>
					<Route exact path="/register" component={VacRegister} />
					<Route exact path="/login" component={VacLogin} />
				</Switch>

				<VacFooter />
			</BrowserRouter>
		</div>
	);
};

export default App;
