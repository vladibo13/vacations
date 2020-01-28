import { Route } from 'react-router-dom';
import React from 'react';

export const AppRoutes = (props: any) => {
	const { routes } = props;
	const result = routes.map((route: object, i: number) => <Route key={i} {...route} />);
	return result;
};
