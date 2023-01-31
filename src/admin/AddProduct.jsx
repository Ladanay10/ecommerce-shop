import { async } from '@firebase/util';
import React, { useState } from 'react';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import '../styles/add-product.scss';
import { db, storage } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const AddProduct = () => {
	const [enterTitle, setEnterTitle] = useState('');
	const [enterShortDesc, setEnterShortDesc] = useState('');
	const [enterDescription, setEnterDescription] = useState('');
	const [enterCategory, setEnterCategory] = useState('');
	const [enterPrice, setEnterPrice] = useState('');
	const [enterProductImg, setEnterProductImg] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const addProduct = async (e) => {
		e.preventDefault();
		setLoading(true)
		try {
			const docRef = await collection(db, "products");
			const storageRef = ref(storage, `productImages/${Date.now() +
				enterProductImg.name
				}`)
			const uploadTask = uploadBytesResumable(storageRef, enterProductImg);
			uploadTask.on(() => {
				toast.error('images not uoloaded!')
			}, () => {
				getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
					await addDoc(docRef,
						{
							productName: enterTitle,
							shortDesc: enterShortDesc,
							description: enterDescription,
							category: enterCategory,
							price: enterPrice,
							imgUrl: downloadURL,
						}
					)
				})
			})
			setLoading(false)
			toast.success('product succssfully added')
			navigate('/dashboard/all-products')
		} catch (err) {
			setLoading(false)
			toast.error('product not added')
		}
	}
	return (
		<section>
			<Container>
				<Row>
					<Col lg='12'>
						{
							loading ? <h3>Loading ....</h3> : (
								<>
									<h4 className='title'>Add Product</h4>
									<Form onSubmit={addProduct}>

										<FormGroup className='form__group'>
											<span>Product title</span>
											<input
												type="text"
												placeholder='Double Sofa'
												value={enterTitle} onChange={e => setEnterTitle(e.target.value)} />
										</FormGroup>
										<FormGroup className='form__group'>
											<span>Short Description</span>
											<input
												type="text"
												placeholder='lorem...'
												value={enterShortDesc} onChange={e => setEnterShortDesc(e.target.value)}
												required
											/>
										</FormGroup>
										<FormGroup className='form__group'>
											<span>Description</span>
											<input
												type="text"
												placeholder='Description...'
												value={enterDescription} onChange={e => setEnterDescription(e.target.value)}
												required
											/>
										</FormGroup>
										<div className='product__price'>
											<FormGroup className='form__group'>
												<span>Price</span>
												<input
													type="number"
													placeholder='$100'
													value={enterPrice} onChange={e => setEnterPrice(e.target.value)}
													required
												/>
											</FormGroup>
											<FormGroup className='form__group'>
												<span>Category</span>
												<select required value={enterCategory} onChange={e => setEnterCategory(e.target.value)}>
													<option >Select Category</option>
													<option value="chair">Chair</option>
													<option value="sofa">Sofa</option>
													<option value="mobile">Mobile</option>
													<option value="watch">Watch</option>
													<option value="wireless">Wireless</option>
												</select>
											</FormGroup>
										</div>
										<div>
											<FormGroup className='form__group'>
												<span>Product Image</span>
												<input required
													onChange={e => setEnterProductImg(e.target.files[0])}
													type="file" />
											</FormGroup>
										</div>
										<button className=" buy__btn" type='submit'>
											Add product
										</button>
									</Form></>
							)
						}
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default AddProduct
