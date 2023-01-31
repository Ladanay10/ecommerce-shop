import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import ProductDetails from '../pages/ProductDetails'
import Chekout from '../pages/Checkout'
import Login from '../pages/Login'
import SingUp from '../pages/SingUp'
import ProtectedRout from './ProtectedRout';
import AddProduct from '../admin/AddProduct';
import AdminNav from '../admin/AdminNav';
import AllProduct from '../admin/AllProduct';
import Dashboard from '../admin/Dashboard';
import Users from '../admin/Users';
const Routers = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigate to={'home'} />}></Route>
			<Route path='home' element={<Home />} />
			<Route path='shop' element={<Shop />} />
			<Route path='shop/:id' element={<ProductDetails />} />
			<Route path='cart' element={<Cart />} />
			<Route path='/*' element={<ProtectedRout />}>
				<Route path='checkout' element={<Chekout />} />
				<Route path='dashboard' element={<Dashboard />} />
				<Route path='dashboard/all-products' element={<AllProduct />} />
				<Route path='dashboard/add-product' element={<AddProduct />} />
				<Route path='dashboard/users' element={<Users />} />
			</Route>
			<Route path='login' element={<Login />} />
			<Route path='singUp' element={<SingUp />} />
		</Routes>
	)
}

export default Routers
