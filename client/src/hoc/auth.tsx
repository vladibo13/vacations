import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUser } from '../redux/actions/authAction';
import VacLoader from '../components/vac-loader';

export const withAuth = (WrappedComponent: any, isadmin?: boolean) => {
	return function(props: any) {
		useEffect(() => {
			const verify = async () => {
				try {
					await dispatch(verifyUser());
					setIsLoadingStatus(false);
				} catch (ex) {
					setIsLoadingStatus(true);
				}
			};
			verify();
		}, []);

		const dispatch = useDispatch();
		const status = useSelector((state: any) => state.auth.status);
		const user = useSelector((state: any) => state.auth.user);
		const [ isLoading, setIsLoadingStatus ] = useState<boolean>(true);

		if (isLoading) return <VacLoader />;
		if (!status) return <Redirect to="/login" />;
		if (isadmin && user.role !== 'admin' && user.role === 'member') return <Redirect to="/main" />;
		if (!isadmin && user.role !== 'member' && user.role === 'admin') return <Redirect to="/admin" />;
		return <WrappedComponent {...props} />;
	};
};
