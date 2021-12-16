import React from "react";
import "./Banner.css";
import bug1 from './../../images/bug1.png';

const Banner = () => {
  	return (
		<div>
			<header id="header" className="header">
				<div className="header-content">
					<div className="container" style={{margin:"auto"}}>
						<div className="row" style={{margin:0}}>
							<div className="col-lg-6 col-xl-5">
								<div className="text-container">
									<h1>Food Panda</h1>
									<p className="p-large">Since 1974</p>
									<p className="p-large-long ">
										Let’s eat some diet food while we wait for the steak to
										cook.
									</p>
								</div>
							</div>
							<div className="col-lg-6 col-xl-7">
								<div className="image-container">
									<div className="img-wrapper">
										<img className="img-fluid" src={bug1} alt="alternative" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</div>
  	);
};

export default Banner;
