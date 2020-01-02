import Button from '@material-ui/core/Button';
import { Link, Route } from 'react-router-dom';
import React from 'react';

// export const AppLinks = (props:any) => {
//     const { routes } = props
//     return routes.filter((route:any) => route.isVisible).map((route: any) => <Button color="inherit">
//         <Link style={{ color: "white" }} to={route.path}>{route.title}</Link>
//     </Button>)
// }

export const AppRoutes = (props: any) => {
	const { routes } = props;
	const result = routes.map((route: any) => <Route {...route} />);
	return result;
};
