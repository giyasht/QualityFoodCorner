import React from "react";
import Carousel from "react-elastic-carousel";
import bug1 from "./../../images/offer.jfif";
import "./Carousal.css";

const Carousal = () => {
	let offers = [
		{
			name: "Diwali Bonanza",
			features: ["Minimum order Rs 699", "coke 500ml FREE"],
		},
		{
			name: "Cricket Mania",
			features: ["Watch cricket with your family", "Choclate Muffin FREE"],
		},
		{
			name: "Chilling Sunday",
			features: ["Minimum order Rs 999", "Mustard-Mayo Dip FREE"],
		},
		{
			name: "Winter welcome",
			features: ["Welcome winter with hot deal", "coke 1 lit FREE"],
		},
		{
			name: "Classic Deal",
			features: ["Give your Family a treat", "Flat 499Rs off"],
		},
  	];

	const breakPoints = [
		{ width: 1, itemsToShow: 1 },
		{ width: 768, itemsToShow: 2 },
		{ width: 1200, itemsToShow: 3 },
	];

  	return (
		<div className="bodyy">
			<div className="py-4">
				<h2 className="text-center text-uppercase pb-4" style={{color:"var(--darkyellow)"}}>Deals of the day</h2>
				<div className="carousel">
					<Carousel
						breakPoints={breakPoints}
						disableArrowsOnEnd={true}
						pagination={true}
						showArrows={true}
						enableAutoPlay={true}
						autoPlaySpeed={3000}
						enableSwipe={false}
					>
						{offers.map((offer, i) => (
						<div key={i}>
							<div className="p-3 m-2 rounded border">
								<div>
									<div>
										<img
											style={{
											width: "350px",
											height: "150px",
											padding: "10px",
											borderRadius: "6px",
											}}
											src={bug1}
											alt="offerImg"
										/>
									</div>
									<div className="pl-3">
									<h5 className="text-center heading py-2">{offer.name}</h5>
										<ul className="pl-3 lists ">
											<li>{offer.features[0]}</li>
											<li>{offer.features[1]}</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						))}
					</Carousel>
				</div>
			</div>
		</div>
	);
};

export default Carousal;
