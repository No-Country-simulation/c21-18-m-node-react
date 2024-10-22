import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { extractUserDetails } from './services/auth';
const userSession = extractUserDetails();

function App() {
	return (
		<div>
			<Navbar />
			{userSession.role === 'ADMIN' ? <h1>hola</h1> : null}
			{/* Muestra para conditional routing*/}
			<Outlet />
			<Footer />
		</div>
	);
}

export default App;
