import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getProductByName } from "../../admin/Helper/Product";
import Navbar from "./../../components/Navbar/Navbar"
import Product from "./../../components/Product/Product";
import Error404 from './../../components/Error404/Error404'
import Loading from "../../components/Loading/Loading";

const DisplayProductOnSearch = () => {

    let params = useParams();

    const { productName } = params

	const [product, setProduct] = useState([]);
	const [isLoading , setLoading] = useState(true);

    useEffect(() => {

		const getProductData = async () => {

			const response = await getProductByName(productName);

			if(response && !response.error){
				setProduct(response)
                setLoading(false)
			}

			if(response.error){
				setLoading(false)
			}
		}

		getProductData()

	}, [productName])


    return (
        <>
			<Navbar/>
            <div className="menubody" style={{display:"flex"}}>
				<div className="sidebar">
					<nav className="navv">
						<ul>
							<li>
								<NavLink to="/" className='sidebar-heading' onClick={ () => {
									setLoading(true)
								}}>Q.F.C</NavLink>
							</li>
							<li>
								<NavLink to="/menu/south indian" onClick={ () => {
									setLoading(true)
								}}>South Indian</NavLink>
							</li>
							<li>
								<NavLink to="/menu/indian main course" onClick={ () => {
									setLoading(true)
								}}>Indian Main Course</NavLink>
							</li>
							<li>
								<NavLink to="/menu/indian breads" onClick={ () => {
									setLoading(true)
								}}>Indian Breads</NavLink>
							</li>
							<li>
								<NavLink to="/menu/desserts" onClick={ () => {
									setLoading(true)
								}}>Desserts</NavLink>
							</li>
							<li>
								<NavLink to="/menu/beverages" onClick={ () => {
									setLoading(true)
								}}>Beverages</NavLink>
							</li>
						</ul>
					</nav>
				</div>
                <div className="row prod-row" style={{backgroundColor:"var(--lightblack)"}}>
                {
                    isLoading 	? 	<Loading/>	
                                        
                                : 	((!product.error && product.length !== 0)  	?  	<>
																						<div style={{marginTop:'auto'}}></div>
                                                                                        	<Product {...product} />
																						<div style={{marginBottom:'auto'}}></div>
                                                                                    </>
                                                                                : 	( <Error404/> ))
                }   
                </div>
			</div>
            
        </>
    )
}

export default DisplayProductOnSearch;
