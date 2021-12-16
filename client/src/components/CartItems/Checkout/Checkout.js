import React from "react";
import "./Checkout.css";

const Checkout = () => {
	return (
		<div className="card checkout-block">
			<div className="item-total">5 Items</div>
			<br />
			<div className="bill-details">
				<div className="sub-total">Item Total</div>
				<div className="sub-total">₹620</div>
			</div>
			<hr />
			<div className="bill-details">
				<div className="sub-total">GST</div>
				<div className="sub-total">+ ₹26</div>
			</div>
			<hr />
			<div className="bill-details">
				<div className="sub-total">Discount</div>
				<div className="sub-total">- ₹7</div>
			</div>
			<hr />
			<div className="bill-details">
				<div className="sub-total">Total</div>
				<div className="sub-total">₹621</div>
			</div>
			<button className="checkout-btn" type="button">
				<div className="checkout">Checkout</div>
				<div className="checkout-amount">₹621</div>
			</button>
		</div>
	);
};

export default Checkout;