import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer__container">
				<div className="footer__content">
					<div className="footer__right">
						<Link to="/" className="footer__logo">
							E-commerce
						</Link>
						<p className="footer__desc">
							Outstock is a premium Templates theme with advanced admin module.
							It’s extremely customizable, easy to use and fully responsive and
							retina ready.
						</p>
						<div className="footer__contact">
							<div className="footer__contact-item">
								<ion-icon name="location-outline"></ion-icon>
								<span>
									Add: 1234 Heaven Stress, Beverly Hill, Melbourne, USA.
								</span>
							</div>

							<div className="footer__contact-item">
								<ion-icon name="mail-outline"></ion-icon>
								<span>Email: Contact@basictheme.com</span>
							</div>
							<div className="footer__contact-item">
								<ion-icon name="call-outline"></ion-icon>
								<span>Phone Number: (800) 123 456 789</span>
							</div>
						</div>
					</div>
					<div className="footer__left">
						<div className="footer__info">
							<h3 className="footer__info-title">Information</h3>
							<div className="footer__info-item">About Us</div>
							<div className="footer__info-item">Careers</div>
							<div className="footer__info-item">Delivery Inforamtion</div>
							<div className="footer__info-item">Privacy Policy</div>
							<div className="footer__info-item">Terms & Condition</div>
						</div>
						<div className="footer__service">
							<h3 className="footer__service-title">Information</h3>

							<div className="footer__service-item">Shipping Policy</div>
							<div className="footer__service-item">Help & Contact Us</div>
							<div className="footer__service-item">Returns & Refunds</div>
							<div className="footer__service-item">Online Stores</div>
							<div className="footer__service-item">Terms & Conditions</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
