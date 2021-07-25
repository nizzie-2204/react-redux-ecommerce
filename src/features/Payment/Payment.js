import { nanoid } from "nanoid";
import React, { useState } from "react";
import Confetti from "react-confetti";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { db } from "../../firebase/firebase";
import { formatCurrency, totalPriceInCart } from "../../helper/helper";
import { emptyCart } from "../Cart/CartSlice";
import "./style.scss";

const Payment = () => {
	const dispatch = useDispatch();
	const [showConfetti, setShowConfetti] = useState(false);

	const user = useSelector((state) => state.user.user);
	const cart = useSelector((state) => state.cart);

	const handleSubmit = (e) => {
		e.preventDefault();

		const paymentId = nanoid();
		const createdDate = new Date().toLocaleString();

		db.collection("user")
			.doc(user.uid)
			.collection("orders")
			.doc(paymentId)
			.set({
				cart: cart,
				total: totalPriceInCart(cart),
				created: createdDate,
			});

		const action = emptyCart();
		dispatch(action);

		Swal.fire({
			title: "Payment successfully",
			text: "Go to your order management",
			icon: "success",
			showConfirmButton: false,
			padding: "2rem 0 3rem 0",
			timer: 4000,
			customClass: {
				title: "alert__title",
				htmlContainer: "alert__html",
			},
		});

		setShowConfetti(true);
		setTimeout(() => {
			setShowConfetti(false);
		}, 4000);
	};

	return (
		<div className="payment">
			<div className="payment__container">
				{cart.length <= 0 ? (
					<h2 className="payment__empty">Nothing to pay</h2>
				) : (
					<>
						<h3 className="payment__title">
							{`Checkout (${cart.length} ${
								cart.length > 1 ? "items" : "item"
							})`}
						</h3>

						<div className="payment__info">
							<div className="payment__address">
								<div className="payment__address-title">
									<h5>Delivery address</h5>
								</div>
								<div className="payment__address-desc">
									{user && <p>{user.email}</p>}
									<p>123 ReactJS</p>
									<p>California</p>
								</div>
							</div>

							<div className="payment__items">
								<div className="payment__items-title">
									<h5>Review items</h5>
								</div>

								<div className="payment__items-container">
									{cart &&
										cart?.map((product) => {
											return (
												<div className="payment__items-item" key={product.id}>
													<img src={product.image} alt={product.title} />
													<div>
														<h5>{product.title}</h5>
														<p>
															{formatCurrency(product.price)} x{" "}
															{product.quantity}
														</p>
													</div>
												</div>
											);
										})}
								</div>
							</div>

							<div className="payment__method">
								<div className="payment__method-title">
									<h5>Payment</h5>
								</div>
								<div className="payment__method-form">
									<form onSubmit={handleSubmit}>
										<div className="payment__method-buy">
											<h5>Total: {formatCurrency(totalPriceInCart(cart))}</h5>
											<button type="submit">
												<span>Buy Now</span>
											</button>
										</div>
									</form>
								</div>

								{showConfetti && (
									<Confetti
										width={window.innerWidth}
										height={window.innerHeight}
									/>
								)}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Payment;
