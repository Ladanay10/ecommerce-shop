import React, { useEffect, useState } from 'react'
import { Helmet } from '../components/Helmet/Helmet';
import '../styles/home.scss';
import { Container, Row, Col } from 'reactstrap';
import heroImg from '../assets/images/hero-img.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Services } from '../services/Services';
import { ProductsList } from '../components/UI/ProductList/ProductsList';
import products from '../assets/data/products';
import counterImg from '../assets/images/counter-timer-img.png';
import { Clock } from '../components/UI/Clock/Clock';
import useGetData from '../custom-hooks/useGetData';
import useAuth from '../custom-hooks/useAuth';
const Home = () => {

	const { data: products, loading } = useGetData('products')
	// const [data, setData] = useState(products)
	const [trendingProducts, setTrendingProducts] = useState([])
	const [bestSalesProducts, setBestSalesProducts] = useState([])
	const [mobileProducts, setMobileProducts] = useState([]);
	const [wirelessProducts, setWirelessProducts] = useState([]);
	const [popularProducts, setPopularProducts] = useState([]);
	const { currentUser } = useAuth();
	console.log(currentUser.uid);
	const year = new Date().getFullYear();
	useEffect(() => {
		const filterTrendingProducs = products.filter(item => item.category === 'chair');
		const filterBestSalesProducs = products.filter(item => item.category === 'sofa');
		const filterMobileProducs = products.filter(item => item.category === 'mobile');
		const filterWirelessProducs = products.filter(item => item.category === 'wireless');
		const filterPopularProducs = products.filter(item => item.category === 'watch');

		setTrendingProducts(filterTrendingProducs);
		setBestSalesProducts(filterBestSalesProducs);
		setMobileProducts(filterMobileProducs);
		setWirelessProducts(filterWirelessProducs);
		setPopularProducts(filterPopularProducs);
	}, [products])
	return (
		<Helmet title={'Home'}>
			<section className="hero_section">
				<Container>
					<Row>
						<Col lg='6' md='6'>
							<div className="hero__content">
								<p className="hero__subtitle">
									Trending Product in {year}
								</p>
								<h2>Make your Interior More Minimalistic & Modern</h2>
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab corrupti voluptate minus totam labore impedit reprehenderit nobis maiores asperiores perspiciatis facere corporis, nihil placeat molestias, illo cum aspernatur? Aperiam, quaerat!</p>
								<Link to={'/shop'}>
									<motion.button whileTap={{ scale: 1.2 }} className='buy__btn'>
										SHOP NOW
									</motion.button>
								</Link>

							</div>
						</Col>
						<Col lg='6' md='6'>
							<div className="hero__img">
								<img src={heroImg} alt="img" />
							</div>
						</Col>
					</Row>
				</Container>
			</section>
			<Services />
			<section className="trending__products">
				<Container>
					<Row>
						<Col lg='12' className='text-center'>
							<h2 className="section__title">
								Trending Products
							</h2>
						</Col>
						{
							loading ? <h4>Loading...</h4> :
								<ProductsList data={trendingProducts} />
						}
					</Row>
				</Container>
			</section>

			<section className="best__sales">
				<Container>
					<Row>
						<Col lg='12' className='text-center'>
							<h2 className='section__title'>Best Sales</h2>
						</Col>
						{
							loading ? <h4>Loading...</h4> :
								<ProductsList data={bestSalesProducts} />
						}
					</Row>
				</Container>
			</section>

			<section className="timer__count">
				<Container>
					<Row>
						<Col lg='6' md='6'>
							<div className="clock__top-content">
								<h4 >Limited Offers</h4>
								<h3 >Quality Armchair</h3>
							</div>
							<Clock />
							<Link to={'/shop'}>
								<motion.button whileTap={{ scale: 1.2 }} className='buy__btn store__btn'>
									Visit Store
								</motion.button>
							</Link>
						</Col>
						<Col lg='6' md='6' className='text-end'>
							<img src={counterImg} alt="img" />
						</Col>
					</Row>
				</Container>
			</section>

			<section className="new__arrivals">
				<Container>
					<Row>
						<Col lg='12' className='text-center mb-5'>
							<h2 className='section__title'>
								New Arrivals
							</h2>
						</Col>
						{
							loading ? <h4>Loading...</h4> :
								<ProductsList data={mobileProducts} />
						}
						{
							loading ? <h4>Loading...</h4> :
								<ProductsList data={wirelessProducts} />
						}
					</Row>
				</Container>
			</section>

			<section className="popular__category">
				<Container>
					<Row>
						<Col lg='12' className='text-center mb-5'>
							<h2 className='section__title'>
								Popular in Category
							</h2>
						</Col>
						{
							loading ? <h4>Loading...</h4> :
								<ProductsList data={popularProducts} />
						}
					</Row>
				</Container>
			</section>
		</Helmet>
	)
}

export default Home
