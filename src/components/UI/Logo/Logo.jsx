import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/eco-logo.png';
import './logo.scss';
const Logo = ({ footer }) => {
	return (
		<Link to={'/home'} >
			<div className={footer ? "logo footer_logo" : 'logo'}>
				{
					footer ? <>
					</> :
						<img src={logo} alt="logo" />
				}
				<div>
					<h1>Multimart</h1>
				</div>
			</div>
		</Link>
	)
}

export default Logo
