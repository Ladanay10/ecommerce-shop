import React from 'react'
import { motion } from 'framer-motion';
import './product-card.scss';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../redux/slices/cartSlice';
export const ProductCard = ({ item }) => {
	const dispatch = useDispatch()

	const addToCart = () => {
		dispatch(cartActions.addItem({
			id: item.id,
			productName: item.productName,
			price: item.price,
			imgUrl: item.imgUrl,
		}))
		toast.success('Product added successfully')
	}
	return (
		<Col lg='3' md='4' className='mb-2'>
			<div className='product__item'>
				<div className="product__img">
					<motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt="img" />
				</div>
				<div className="product__info">
					<Link to={`/shop/${item.id}`}>
						<h3 className="product__name">
							{item.productName}
						</h3>
					</Link>
					<span >{item.category}</span>
				</div>
				<div className="product__card-bottom">
					<span className='price'>${item.price}</span>
					<motion.span onClick={addToCart} whileTap={{ scale: 1.2 }}><i class="ri-add-line"></i></motion.span>
				</div>
			</div>
		</Col>
	)
}
