import React from "react";
import Navbar from "./../../components/Navbar/Navbar";
import Footer from "./../../components/Footer/Footer";
import CartItems from "../../components/CartItems/Cartitems";
import CheckoutBox from "./../../components/CartItems/Checkout/Checkout";
import "./MyCart.css";

const MyCart = () => {
  return (
    <>
		<Navbar />
			<div className="cartpage">
				<div className="row">
					<div className="col-md-8">
						<CartItems />
					</div>
					<div className="col-md-4">
						<CheckoutBox />
					</div>
				</div>
			</div>
		<Footer />
    </>
  );
};

export default MyCart;