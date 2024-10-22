import Paw from '../../assets/paw-solid.svg';
import BurgerMenu from '../../assets/bars-solid.svg';
import './Navbar.css';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { extractUserDetails, logged } from '../../services/auth';

export default function Navbar() {
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
					<img
						className='burgerMenu'
						src={BurgerMenu}
						alt='Menú de hamburguesa'
					/>
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
						{!logged() ? (
							<NavLink
								to='http://localhost:3000/api/auth/google'
								className={({ isActive }) =>
									isActive ? 'login active' : 'login'
								}
							>
								Log in
							</NavLink>
						) : (
							<NavLink
								to='http://localhost:3000/api/auth/logout'
								className={({ isActive }) =>
									isActive ? 'login active' : 'logout'
								}
							>
								<div className='flex'>
									<div>{extractUserDetails().name}</div>
									<div>Log Out</div>
								</div>
							</NavLink>
						)}
					</div>
				)}
			</nav>
		</div>
	);
}
