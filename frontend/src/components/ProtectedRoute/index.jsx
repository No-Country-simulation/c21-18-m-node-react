/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom';
import { isAdmin } from '../../services/auth';

// eslint-disable-next-line no-unused-vars
export const ProtectedRoute = ({ children }) => {
	if (!isAdmin()) {
		return <Navigate to='/' />;
	}
	return <Outlet />;
};
