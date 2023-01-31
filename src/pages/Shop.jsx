import React, { useEffect, useState } from 'react'
import CommonSection from '../components/UI/CommonSection/CommonSection'
import { Helmet } from '../components/Helmet/Helmet'
import { Col, Container, Row } from 'reactstrap';
import '../styles/shop.scss';

import { ProductsList } from '../components/UI/ProductList/ProductsList';
import useGetData from '../custom-hooks/useGetData';
const Shop = () => {
	const { data: products } = useGetData('products');
	const [productsData, setProductsData] = useState([]);
	useEffect(() => {
		setProductsData(products)
	}, [products])
	const handleFilter = e => {
		const filterValue = e.target.value;
		if (filterValue) {
			const filteredProduct = products.filter((item) => item.category === filterValue);
			setProductsData(filteredProduct);
		} if (filterValue === 'all') {
			setProductsData(products)
		}
	}
	const handleSearch = (e) => {
		const searchTerm = e.target.value;
		const searchedProducts = products.filter(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))
		setProductsData(searchedProducts);
	}
	return (
		<Helmet title='Shop'>
			<CommonSection title={'Products'} />

			<section>
				<Container>
					<Row>
						<Col lg='3' md='6'>
							<div className="filter__widget">
								<select onChange={handleFilter}>
									<option value={'all'}>Filter By Category</option>
									<option value="sofa">Sofa</option>
									<option value="mobile">Mobile</option>
									<option value="chair">Chair</option>
									<option value="watch">Watch</option>
									<option value="wireless">Wireless</option>
								</select>
							</div>
						</Col>
						<Col lg='3' md='6'>
							<div className="filter__widget">
								<select>
									<option>Sort By </option>
									<option value="ascending">Ascending</option>
									<option value="descending">Descending</option>
								</select>
							</div>
						</Col>
						<Col lg='6' md='12'>
							<div className="search__box">
								<input
									type="text"
									placeholder='Search...'
									onChange={handleSearch} />
								<span><i class="ri-search-line"></i></span>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
			<section className='pt-0'>
				<Container>
					<Row>
						{
							productsData.length === 0 ? <h1>No products are found!</h1> :
								<ProductsList data={productsData} />
						}
					</Row>
				</Container>
			</section>
		</Helmet>
	)
}

export default Shop
