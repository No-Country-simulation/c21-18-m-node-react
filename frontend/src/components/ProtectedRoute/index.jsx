/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { isAdmin } from '../../services/auth';

export const ProtectedRoute = ({ children }) => {
	if (!isAdmin()) {
		return <Navigate to='/' />;
	}
	return children;
};
