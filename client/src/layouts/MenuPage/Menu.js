import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import Navbar from "./../../components/Navbar/Navbar";
import Footer from "./../../components/Footer/Footer";
import Product from "./../../components/Product/Product";
import Error404 from './../../components/Error404/Error404'
import "./Menu.css";
import Loading from "../../components/Loading/Loading";
import ReactPaginate from 'react-paginate';

function Items({ currentItems }) {
	return (
	  <>
		{ currentItems 	&& 	currentItems.map( function(product, i) {

								const productProps = {
									_id:product._id,
									name:product.name, 
									description:product.description, 
									price:product.price, 
									sold:product.sold, 
									stock:product.stock,
									photo:product.photo,
									photoUrl:product.photoUrl
								}

								return(<Product key={i} {...productProps}/>)

							})
		
		}
	  </>
	);
}



const Menu = () => {

	let params = useParams();
	console.log(params.category);

	const [data, setData] = useState([]);

	const [isLoading , setLoading] = useState(true);

	useEffect(() => {

		const getData = async () => {

			try {

				var datanow;
	
				if(params.category === "all"){
	
					const response = await fetch(`http://127.0.0.1:8000/api/products` , {
						method: "GET",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
						},
					})

					if(response){
						datanow = await response.json()
					}
	
					!datanow.error ? setData(datanow) : setData([])
	
				} else {
	
					console.log(params.category);
					const response = await fetch(`http://127.0.0.1:8000/api/products/${params.category}` , {
						method: "GET",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
						},
					})		
	
					if(response){
						datanow = await response.json()
					}
	
					console.log(datanow);

					!datanow.error ? setData(datanow) : setData([])
				}
				
				setLoading(false)
				
			} catch (error) {
				return console.log(error);
			}
		
		}

		// setLoading(params.loading)

		getData()

	}, [params])
	
	
	// Pagination
	const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 6;

	useEffect(() => {
		// Fetch items from another resources.
		const endOffset = itemOffset + itemsPerPage;
		console.log(`Loading items from ${itemOffset} to ${endOffset}`);
		setCurrentItems(data.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(data.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, data]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % data.length;
		console.log(
			`User requested page number ${event.selected}, which is offset ${newOffset}`
		);
		setItemOffset(newOffset);
	};

    return (
        <>
			<Navbar />

			<div className="menubody" style={{display:"flex"}}>
				<div className="sidebar">
					<nav className="navv">
						<ul>
							<li>
								<NavLink to="/" className='sidebar-heading' onClick={ () => {
									setLoading(true)
									setItemOffset(0)
								}}>Q.F.C</NavLink>
							</li>
							<li>
								<NavLink to="/menu/burger" onClick={ () => {
									setLoading(true)
									setItemOffset(0)
								}}>Burger</NavLink>
							</li>
							<li>
								<NavLink to="/menu/pizza" onClick={ () => {
									setLoading(true)
									setItemOffset(0)
								}}>Pizza</NavLink>
							</li>
							<li>
								<NavLink to="/menu/south indian" onClick={ () => {
									setLoading(true)
									setItemOffset(0)
								}}>South Indian</NavLink>
							</li>
							<li>
								<NavLink to="/menu/chinese" onClick={ () => {
									setLoading(true)
									setItemOffset(0)
								}}>chinese</NavLink>
							</li>
							<li>
								<NavLink to="/menu/beverages" onClick={ () => {
									setLoading(true)
									setItemOffset(0)
								}}>Beverages</NavLink>
							</li>
						</ul>
					</nav>
				</div>

				<div className="row prod-row" style={{backgroundColor:"var(--lightblack)"}}>
					{

						isLoading 	? 	<Loading/>	
									
									: 	((!data.error && data.length !== 0)  
									    
										?  	<>
												{/* {console.log(data[0]._id)} */}
												<Items currentItems={currentItems} />
												<ReactPaginate
													breakLabel="..."
													nextLabel="Next >"
													onPageChange={handlePageClick}
													pageRangeDisplayed={5}
													pageCount={pageCount}
													previousLabel="< Previous"
													renderOnZeroPageCount={null}
													breakClassName={'page-item'}
													breakLinkClassName={'page-link'}
													containerClassName={'pagination'}
													pageClassName={'page-item'}
													pageLinkClassName={'page-link'}
													previousClassName={'page-item'}
													previousLinkClassName={'page-link'}
													nextClassName={'page-item'}
													nextLinkClassName={'page-link'}
													activeClassName={'active'}
												/>
											</>
										: 	( <Error404/> ))
					}
				</div>
			</div>
			<Footer />
        </>
    );
};

export default Menu;
