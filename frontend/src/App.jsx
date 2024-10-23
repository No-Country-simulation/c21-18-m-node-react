import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
// import { isAdmin } from './services/auth';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
	return (
		<div>
			<Navbar />
			<ProtectedRoute>
				<Footer />
			</ProtectedRoute>

			<Outlet />
			<Footer />
		</div>
	);
}

export default App;
