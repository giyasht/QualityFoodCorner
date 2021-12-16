import React,{useState, useEffect} from "react";
import CartItem from "./CartItem/Cartitem";
import "./Cartitems.css";
import { isAuthenticated } from "./../../auth/index";
import Loading from './../../components/Loading/Loading'
const API = process.env.REACT_APP_BACKEND_API

const Cartitems = () => {

	const [isLoading, setLoading ] = useState(true);

	const [cartItems, setCartItems] = useState([])

	useEffect(() => {
		
		const getdata = async () => {
			
			try {

				const { user, token } = isAuthenticated();

				if(user._id === 'undefined'){
					return null
				}else{
					const response = await fetch(`${API}/user/${user._id}`, {
						method: "GET",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					});
					// var tempuser;
					if (response) {
						const tempuser = await response.json();
						setCartItems(tempuser.cartItems);
						setLoading(false)
					}
				}
				
			} catch (error) {
				return console.log(error);
			}
		};
		getdata();
  	}, []);



	return (
		<div className="cart-items">
			{ 	isLoading 	? 	<Loading/> 	
							: 	(	cartItems 	&&	cartItems.map(function (id, i) {
																//console.log("id",id)
																return (<CartItem key={i} id={id} />)
															})
								)
			}
		</div>
	);
};

export default Cartitems;
