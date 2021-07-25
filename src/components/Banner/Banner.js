import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const Banner = () => {
	return (
		<section className="banner">
			<div className="banner__container">
				<Link className="banner__link" to="/shop">
					Shop now
				</Link>
			</div>
		</section>
	);
};

export default Banner;
