import React from 'react'
import { Col, Container, Row } from 'reactstrap';
import { Helmet } from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection/CommonSection';
import '../styles/cart.scss';
import { motion } from 'framer-motion';
import { cartActions } from '../redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
const Cart = () => {
	const cartItems = useSelector(state => state.cart.cartItems);
	const totalAmount = useSelector(state => state.cart.totalAmount)
	console.log(totalAmount);
	return (
		<Helmet title='Cart'>
			<CommonSection title={'Shopping Cart'} />
			<section>
				<Container>
					<Row>
						<Col lg='9'>
							{
								cartItems.length > 0 ?
									(
										<table className='table bordered'>
											<thead>
												<tr>
													<th>Image</th>
													<th>Title</th>
													<th>Price</th>
													<th>Qty</th>
													<th>Delete</th>
												</tr>
											</thead>
											<tbody>
												{cartItems.map((item, index) => (
													<Tr item={item} key={index} />
												))}
											</tbody>
										</table>
									) : <h2 className='title'>No item added to the cart</h2>
							}
						</Col>
						<Col lg='3'>
							<div className='cart__info'>
								<h6>Subtotal
									<span>${totalAmount}</span>

								</h6>

							</div>
							<p>
								taxes and shipping will calculate in chekcout
							</p>
							<div className='btns'>
								<Link to='/shop'>
									<button className="buy__btn">
										Continue Shopping
									</button>
								</Link>
								<Link to='/checkout'>
									<button className="buy__btn">
										Checkout
									</button>
								</Link>

							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</Helmet>
	)
}
const Tr = ({ item }) => {
	const dispatch = useDispatch();
	const deleteProduct = () => {
		dispatch(cartActions.deleteItem(item.id))
	}
	return (
		<tr >
			<td><img src={item.imgUrl} alt="" /></td>
			<td>{item.productName}</td>
			<td>${item.price}</td>
			<td>{item.quantity}</td>
			<td >
				<motion.i
					whileTap={{ scale: 1.2 }}
					class="ri-delete-bin-line"
				onClick={deleteProduct}
				>
				</motion.i>
			</td>
		</tr>
	)
}

export default Cart
