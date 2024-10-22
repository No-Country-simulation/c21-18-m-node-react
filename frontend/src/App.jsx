import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const userCookie = fetch('http://localhost:3000/api/auth/profile', {
	method: 'GET',
	credentials: 'include', // Ensures cookies are sent along with the request
})
	.then((response) => response.json())
	.then((data) => console.log(data))
	.catch((error) => console.error('Error:', error));
console.log(userCookie);

function App() {
	return (
		<div>
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	);
}

export default App;
