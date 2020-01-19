import React from 'react';
import VacLogin from '../components/vac-login';
import VacRegister from '../components/vac-register';
import VacHome from '../components/vac-home';
import VacMain from '../components/vac-main';
import VacAdmin from '../components/vac-admin';
import VacChart from '../components/vac-chart';
import { withAuth } from '../hoc/auth';

export const routes = [
	{ exact: true, isVisible: true, title: 'Log In', path: '/login', component: VacLogin },
	{ exact: true, isVisible: true, title: 'Register', path: '/register', component: VacRegister },
	{
		exact: true,
		isVisible: true,
		title: 'Home',
		path: '/',
		component: (props: any) => {
			const HomeWithAuth = withAuth(VacHome);
			return <HomeWithAuth {...props} />;
		}
	},
	{
		exact: true,
		isVisible: true,
		title: 'Main Page',
		path: '/main',
		component: (props: any) => {
			const MainWithAuth = withAuth(VacMain);
			return <MainWithAuth {...props} />;
		}
	},
	{
		exact: true,
		isVisible: true,
		title: 'Admin Page',
		path: '/admin',
		component: (props: any) => {
			const AdminWithAuth = withAuth(VacAdmin, true);
			return <AdminWithAuth {...props} />;
		}
	},
	{
		exact: true,
		isVisible: true,
		title: 'Chart Page',
		path: '/chart',
		component: (props: any) => {
			const ChartWithAuth = withAuth(VacChart, true);
			return <ChartWithAuth {...props} />;
		}
	}
];
