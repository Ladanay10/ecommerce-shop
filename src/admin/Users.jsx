import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import useGetData from '../custom-hooks/useGetData';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify'
const Users = () => {
	const { data: userData, loading } = useGetData('users');
	const deleteUser = async (id) => {
		await deleteDoc(doc(db, 'users', id));
		toast.success('user deleted')
	}
	return (
		<section>
			<Container>
				<Row>
					<Col lg='12'>
						<h4 className='title'>Users</h4>
					</Col>
					<Col lg='12'>
						<table className='table'>
							<thead>
								<tr>
									<th>Image</th>
									<th>UserName</th>
									<th>Email</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{
									loading ? <h5>Loadimg...</h5> :
										userData.map((user) => (
											<tr>
												<td><img src={user.photoURL} alt="" /></td>
												<td>{user.displayName}</td>
												<td>{user.email}</td>
												<td><button onClick={() => deleteUser(user.id)} className='btn btn-danger'>
													Delete
												</button>
												</td>
											</tr>
										))
								}
							</tbody>
						</table>
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default Users
