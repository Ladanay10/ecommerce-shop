import React, { useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import { motion } from 'framer-motion';
import userIcon from '../../assets/images/user-icon.png';
import './header.scss';
import Logo from '../UI/Logo/Logo';
import { useSelector } from 'react-redux';
import useAuth from '../../custom-hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';

const nav__link = [
	{
		path: 'home',
		dispay: 'Home'
	},
	{
		path: 'shop',
		dispay: 'Shop'
	},
	{
		path: 'cart',
		dispay: 'Cart'
	},
]

const Header = () => {
	const totalQuantity = useSelector(state => state.cart.totalQuantity)
	const headerRef = useRef(null);
	const menuRef = useRef();
	const profileActionsRef = useRef()
	const navigate = useNavigate();
	const { currentUser } = useAuth()
	const AdminId = 'xQXELYnQvhT4WRlDK8XoH9bw7ys2';
	const stickyHeaderFunc = () => {
		window.addEventListener('scroll', () => {
			if (
				document.body.scrollTop > 80 ||
				document.documentElement.scrollTop > 80
			) {
				headerRef.current.classList.add('sticky__header')
			} else {
				headerRef.current.classList.remove('sticky__header')
			}
		})
	}

	const logout = () => {
		signOut(auth).then(() => {
			toast.success('Logged out')
			navigate('/home');
		}).catch(err => {
			toast.error(err.message)
		})
	}
	useEffect(() => {
		stickyHeaderFunc()
		return () => window.removeEventListener('scroll', stickyHeaderFunc)
	})
	const menuToggle = () => menuRef.current.classList.toggle('active__menu')
	const navigateToCart = () => {
		navigate('/cart')
	}
	const toggleProfileActions = () => {
		profileActionsRef.current.classList.toggle('show_profileActions')
	}
	return (
		<header className="header" ref={headerRef}>
			<Container>
				<Row>
					<div className="nav__wrapper">

						<Logo />

						<nav className="nav" ref={menuRef} onClick={menuToggle}>
							<ul className='menu' >
								{
									nav__link.map((item, index) => (
										<li key={index} className="nav__item">
											<NavLink
												className={(navClass) => navClass.isActive ? 'nav__active' : ''}
												to={item.path}>
												{item.dispay}
											</NavLink>
										</li>
									))
								}
							</ul>
						</nav>
						<div className="nav__icons">
							<span className='fav__icon'>
								<i class="ri-heart-line"></i>
								<span className='badge'>1</span>
							</span>
							<span className='cart__icon' onClick={navigateToCart}>
								<i class="ri-shopping-bag-line"></i>
								<span className='badge'>{totalQuantity}</span>
							</span>
							<div className='profile'>
								<motion.img onClick={toggleProfileActions} whileTap={{ scale: 1.2 }} src={currentUser ? currentUser.photoURL : userIcon} alt="icon" />
								<div className='profile__actions'
									onClick={toggleProfileActions}
									ref={profileActionsRef}
								>
									{
										currentUser

											? <div>
												{
													currentUser.uid === AdminId &&
													<Link to={'/dashboard'}>Dashboard</Link>
												}
												<span onClick={logout}>Logout</span>
											</div>
											:
											<div >
												<Link to={'/singup'}>SingUp</Link>
												<Link to={'/login'}>Login</Link>
											</div>
									}
								</div>
							</div>
						</div>
						<div className="mobile__menu" onClick={menuToggle}>
							<span>
								<i class="ri-menu-line"></i>
							</span>
						</div>
					</div>
				</Row>
			</Container>
		</header>
	)
}

export default Header
