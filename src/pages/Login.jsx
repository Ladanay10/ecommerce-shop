import React, { useState } from 'react';
import { Helmet } from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.scss';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate()
	const singIn = async (e) => {
		e.preventDefault();

		setLoading(true);
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;
			setLoading(false)
			toast.success('Successfully login');
			navigate('/checkout')
		} catch (error) {
			setLoading(false);
			toast.error(error.message)
		}
	}
	return (
		<Helmet title='Login'>
			<section>
				<Container>
					<Row>
						{
							loading ? <Col lg='12' className='text-center fw-bold'>Loading</Col> :
								<Col lg='6' className='m-auto text-center '>
									<h3>Login</h3>
									<Form className='auth__form' onSubmit={singIn}>
										<FormGroup className='form__group'>
											<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your email' />
										</FormGroup>
										<FormGroup className='form__group'>
											<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter your password' />
										</FormGroup>
										<button className='buy__btn auth__btn'>
											Login
										</button>
										<p>
											Don't have an account?
											<Link to={'/singup'}>Create an account</Link>
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

export default Login
