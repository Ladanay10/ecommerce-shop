import React, { useState } from 'react';
import { Helmet } from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/login.scss';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { storage } from '../firebase.config';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const SingUp = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('');
	const [userName, setUserName] = useState('');
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate()
	const singup = async (e) => {
		e.preventDefault();
		setLoading(true)
		try {
			const userCredetial = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredetial.user; const storageRef = ref(storage, ` images/${Date.now() + userName}`);
			const uploadTask = uploadBytesResumable(storageRef, file)
			uploadTask.on((error) => {
				toast.error(error.message)
			}, () => {
				getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
					await updateProfile(user, {
						displayName: userName,
						photoURL: downloadURL,
					});

					await setDoc(doc(db, 'users', user.uid), {
						uid: user.uid,
						displayName: userName,
						email,
						photoURL: downloadURL
					})
				});
			})
			setLoading(false);
			toast.success('Account created')
			navigate('/login');
		} catch (error) {
			setLoading(false);
			toast.error('something went wrong')
		}
	}
	return (
		<Helmet title='SingUp'>
			<section>
				<Container>
					<Row>
						{
							loading ? <Col lg='12' className='text-center fw-bold'>Loading..</Col> :
								<Col lg='6' className='m-auto text-center '>
									<h3>Singup</h3>
									<Form className='auth__form' onSubmit={singup}>
										<FormGroup className='form__group'>
											<input
												value={userName}
												onChange={(e) => setUserName(e.target.value)}
												type="text"
												placeholder='Enter your name' />
										</FormGroup>
										<FormGroup className='form__group'>
											<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your email' />
										</FormGroup>
										<FormGroup className='form__group'>
											<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter your password' />
										</FormGroup>
										<FormGroup className='form__group'>
											<input

												onChange={(e) => setFile(e.target.files[0])}
												type="file"
												placeholder='Enter your password' />
										</FormGroup>
										<button className='buy__btn auth__btn'>
											Create an Account
										</button>
										<p>
											Allready have an account?
											<Link to={'/login'}>Create an account</Link>
										</p>
									</Form>
								</Col>
						}
					</Row>
				</Container>
			</section>
		</Helmet>
	)
}

export default SingUp
