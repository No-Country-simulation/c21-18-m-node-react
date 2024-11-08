import Paw from '../../assets/paw-solid.svg';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import './Navbar.css';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { extractUserDetails, logged } from '../../services/auth';
const  URL = import.meta.env.VITE_BACKEND_URL

export default function Navbar() {
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const user = logged() ? extractUserDetails() : null;
	const isAdmin = user && user.role === "ADMIN";

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className='nav-container'>
			<NavLink to='/' className='logo-link'>
				<img className='logo' src={Paw} alt='Logo' />
			</NavLink>
			<nav>
				{isMobile ? (
					<BurgerMenu />
				) : (
					<div className='desktop-menu'>
						<NavLink
							to='/AllPets'
							className={({ isActive }) =>
								isActive ? 'adopt active' : 'adopt'
							}
						>
							Mascotas
						</NavLink>
						<NavLink
							to='/AboutUs'
							className={({ isActive }) =>
								isActive ? 'contact active' : 'contact'
							}
						>
							Conócenos
						</NavLink>
						{isAdmin && (
							<NavLink
								to='http://localhost:5173/Admin'
								className={({ isActive }) =>
									isActive ? 'admin-panel active' : 'admin-panel'
								}
							>
								Panel Admin
							</NavLink>
						)}
						{!logged() ? (
							<NavLink
								to={`${URL}/api/auth/google`}
								className={({ isActive }) =>
									isActive ? 'login active' : 'login'
								}
							>
								Log in
							</NavLink>
						) : (
							<NavLink
								to={`${URL}/api/auth/logout`}
								className={({ isActive }) =>
									isActive ? 'login active' : 'logout'
								}
							>
								<div className='flex'>
									<img src={user.picture} alt="foto perfil" />
									<div className='flex-name'>
										<div>{user.name}</div>
										<div>Log Out</div>
									</div>
								</div>
							</NavLink>
						)}
					</div>
				)}
			</nav>
		</div>
	);
}
