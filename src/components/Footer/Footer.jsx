import React from 'react';
import './footer.scss';


import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import Logo from '../UI/Logo/Logo';
import { Link } from 'react-router-dom';
const Footer = () => {
	const year = new Date().getFullYear()
	return (
		<footer className='footer'>
			<Container>
				<Row>
					<Col lg='4'>
						<Logo footer/>
						<p className='footer__text'>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi alias perferendis cupiditate iste animi ipsam ipsum impedit earum voluptatibus velit tempora, explicabo suscipit vero rem, non mollitia libero. Recusandae, quibusdam.
						</p>
					</Col>
					<Col lg='3'>
						<div className="footer__quick-links">
							<h4 className="quick__links-title">
								Top Categories
							</h4>
							<ListGroup className='mb-3'>
								<ListGroupItem className='ps-0 border-0'>
									<Link to='#'>
										Mobile Phones
									</Link>
								</ListGroupItem>
								<ListGroupItem className='ps-0 border-0'>
									<Link to='#'>
										Modern Sofa
									</Link>
								</ListGroupItem>
								<ListGroupItem className='ps-0 border-0'>
									<Link to='#'>
										Arm Chair
									</Link>
								</ListGroupItem>
								<ListGroupItem className='ps-0 border-0'>
									<Link to='#'>
										Smart Watches
									</Link>
								</ListGroupItem>
							</ListGroup>
						</div>
					</Col>
					<Col lg='2'>
						<div className="footer__quick-links">
							<h4 className="quick__links-title">
								Useful Link
							</h4>
							<ListGroup className='mb-3'>
								<ListGroupItem className='ps-0 border-0'>
									<Link to='/shop'>
										Shop
									</Link>
								</ListGroupItem>
								<ListGroupItem className='ps-0 border-0'>
									<Link to='/cart'>
										Cart
									</Link>
								</ListGroupItem>
								<ListGroupItem className='ps-0 border-0'>
									<Link to='/login'>
										Login
									</Link>
								</ListGroupItem>
								<ListGroupItem className='ps-0 border-0'>
									<Link to='#'>
										Privacy Policy
									</Link>
								</ListGroupItem>
							</ListGroup>
						</div>
					</Col>
					<Col lg='3'>
						<div className="footer__quick-links">
							<h4 className="quick__links-title">
								Contact
							</h4>
							<ListGroup className='footer__contact'>
								<ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
									<span>
										<i class="ri-map-pin-line"></i>
									</span>
									<p>123, ZindaBazar, SylHet, Bandgladesh </p>
								</ListGroupItem>
								<ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
									<span>
										<i class="ri-phone-line"></i>
									</span>
									<p>+032352123123</p>
								</ListGroupItem>
								<ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
									<span>
										<i class="ri-mail-line"></i>
									</span>
									<p>email@gmail.com</p>
								</ListGroupItem>
							</ListGroup>
						</div>
					</Col>
					<Col lg='12'>
						<p className="footer__copyright">
							Copyright {year} developed by Ladanay Andriy.
							All rigth reserved.
						</p>
					</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer
