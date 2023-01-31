import React, { useRef, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Logo from '../components/UI/Logo/Logo';
import useAuth from '../custom-hooks/useAuth';
import '../styles/admin-nav.scss';
import { Link, NavLink } from 'react-router-dom';
const admin__nav = [
	{
		display: 'Dashboard',
		path: '/dashboard'
	},
	{
		display: 'All-Products',
		path: '/dashboard/all-products'
	},
	{
		display: 'Orders',
		path: '/dashboard/orders'
	},
	{
		display: 'Users',
		path: '/dashboard/users'
	},
]
const AdminNav = () => {
	const { currentUser } = useAuth();
	const settingRef = useRef();
	const [isSettingActive, setIsSettingActive] = useState(false);
	return (
		<>
			<header className='admin__header'>
				<div className="admin__nav-top">
					<Container>
						<div className="admin__nav-wrapper-top">
							<Logo footer />

							<div className="search__box">
								<input type="text" placeholder='Search...' />
							</div>
							<div className="admin__nav-top-right">
								<span>
									<i class="ri-notification-line"></i>
								</span>
								<span onClick={() => setIsSettingActive(!isSettingActive)}>
									<i class="ri-settings-2-line"></i>
								</span>
								<div onClick={() => setIsSettingActive(false)} className={isSettingActive ? 'setting  setting_active' : 'setting'}>
									<Link to={'/dashboard/add-product'}>Add Product </Link>
								</div>

								<img src={currentUser && currentUser.photoURL} alt="" />
							</div>
						</div>
					</Container>
				</div>
			</header>
			<section className='admin__menu'>
				<Container>
					<Row>
						<div className="admin__nav">
							<ul className="admin__menu-list">
								{
									admin__nav.map(item =>
										<NavLink className={navClass => navClass.isActive ? 'active__admin-menu' : ''} to={item.path} key={item.display}>
											<li className='admin__menu-item'>
												{item.display}
											</li>
										</NavLink>
									)
								}
							</ul>
						</div>
					</Row>
				</Container>
			</section>
		</>
	)
}

export default AdminNav
