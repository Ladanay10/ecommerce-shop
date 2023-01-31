import React, { useState, useRef, useEffect } from 'react';

import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
// import products from '../assets/data/products';
import { Helmet } from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection/CommonSection';
import '../styles/products-details.scss';
import { motion } from 'framer-motion';
import { ProductsList } from '../components/UI/ProductList/ProductsList';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { db } from '../firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import useGetData from '../custom-hooks/useGetData';
const ProductDetails = () => {

	const [tab, setTab] = useState('desc');
	const [product, setProduct] = useState({})
	const [rating, setRating] = useState(null);
	const reviewUser = useRef('');
	const reviewMsg = useRef('')
	const dispatch = useDispatch()
	const { id } = useParams();
	const { data: products } = useGetData('products')
	const docRef = doc(db, 'products', id);
	useEffect(() => {
		const getProduct = async () => {
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setProduct(docSnap.data())
			} else {
				console.log('no product');
			}
		}
		getProduct()
	}, [])
	const { imgUrl, productName, price, category, description, shortDesc } = product;
	const relatedProducts = products.filter(item => item.category === category)
	const submitHandler = (e) => {
		e.preventDefault()
		const reviewUserName = reviewUser.current.value;
		const reviewUserMesg = reviewMsg.current.value;
		const reviewObj = {
			userName: reviewUserName,
			text: reviewUserMesg,
			rating,
		}
		console.log(reviewObj);
		toast.success('Review submitted');
	}
	const addToCart = () => {
		dispatch(cartActions.addItem({
			id,
			image: imgUrl,
			productName,
			price,

		}))
		toast.success('Product added succsessfully')
	}
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [product])
	return (

		<Helmet tilte={productName}>
			<CommonSection title={productName} />
			<section className='pt-0'>
				<Container>
					<Row>
						<Col lg='6'>
							<img src={imgUrl} alt="" />
						</Col>
						<Col lg='6'>
							<div className="product__details">
								<h2>{productName}</h2>
								<div className="product__rating">
									<div>
										<span >
											<i class="ri-star-s-fill"></i>
										</span>
										<span >
											<i class="ri-star-s-fill"></i>
										</span>
										<span >
											<i class="ri-star-s-fill"></i>
										</span>
										<span >
											<i class="ri-star-s-fill"></i>
										</span>
										<span >
											<i class="ri-star-half-s-line"></i>
										</span>
									</div>
									<p>
										{/* (<span>{avgRating}</span> ratings) */}
									</p>

								</div>
								<div className='product__info'>
									<span className='product__price'>${price}</span>
									<span className='product__price'>Categoty: {category}</span>
								</div>
								<p className='product__desc'>{shortDesc}</p>
								<motion.button onClick={addToCart} whileTap={{ scale: 1.2 }} className='buy__btn'>Add to Cart</motion.button>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			<section>
				<Container>
					<Row>
						<Col lg='12'>
							<div className="tab__wrapper">
								<h6 className={`${tab === 'desc' ? 'active__tab' : ''}`} onClick={() => setTab('desc')}>Desc</h6>
								{/* <h6 className={`${tab === 'rev' ? 'active__tab' : ''}`} onClick={() => setTab('rev')}>Reviews ({reviews.length})</h6> */}
							</div>
							{
								tab === 'desc' ? (
									<div className="tab__content">
										{description}
									</div>
								) : <div className='product__review'>
									<div className="review__wrapper">
										{/* <ul>
											{
												reviews.map((item) => (
													<li key={item.id}>
														<h6>Jhon Doe</h6>
														<span>{item.rating}(rating)</span>
														<p>{item.text}</p>
													</li>
												))
											}
										</ul> */}
										<div className="review__form">
											<h4>Leave your expirience</h4>
											<form onSubmit={submitHandler} action="">
												<div className="form__group">
													<input
														type="text"
														placeholder='Enter name'
														ref={reviewUser}
													/>
												</div>
												<div className="form__group">
													<motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(1)}>1<i class="ri-star-fill"></i></motion.span>
													<motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(2)}>2<i class="ri-star-fill"></i></motion.span>
													<motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(3)}>3<i class="ri-star-fill"></i></motion.span>
													<motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(4)}>4<i class="ri-star-fill"></i></motion.span>
													<motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(5)}>5<i class="ri-star-fill"></i></motion.span>
												</div>
												<div className="form__group">
													<textarea
														ref={reviewMsg}
														rows={4}
														type="text"
														placeholder='Review message' />
												</div>
												<button type='submit' className="buy__btn">
													Submit
												</button>
											</form>
										</div>
									</div>
								</div>
							}

						</Col>
						<Col lg='12' className='mt-5'>
							<h2 className="related__title">
								You might also like
							</h2>
						</Col>
						<ProductsList data={relatedProducts} />
					</Row>
				</Container>
			</section>
		</Helmet >
	)
}

export default ProductDetails
