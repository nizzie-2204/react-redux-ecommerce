import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../../../Cart/CartSlice";
import Swal from "sweetalert2";
import { getProduct } from "../../productsSlice";
import PulseLoader from "react-spinners/PulseLoader";
import { css } from "@emotion/react";

import "./style.scss";
import { formatCurrency } from "../../../../helper/helper";

const override = css`
	display: block;
	margin: 15rem auto;
	color: red;
`;

const ProductDetail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(1);

	// Get product from redux store
	const product = useSelector((state) => state.products.product);
	const loading = useSelector((state) => state.products.loadingProduct);
	const { image, title, price, description } = product;

	useEffect(() => {
		const fetchProduct = async () => {
			await dispatch(getProduct(parseInt(id)))
				.then(unwrapResult)
				.catch((error) => {
					console.log(error);
				});
		};

		fetchProduct();
	}, []);

	const user = useSelector((state) => state.user.user);

	const addProduct = () => {
		// Allow to add product when user is logged in
		if (user) {
			const action = addToCart({ ...product, quantity });
			dispatch(action);

			Swal.fire({
				title: "Add to cart successfully",
				icon: "success",
				showConfirmButton: false,
				padding: "2rem 0 3rem 0",
				timer: 2000,
				customClass: {
					title: "alert__title",
					htmlContainer: "alert__html",
				},
			});
		} else {
			Swal.fire({
				title: "Oops...",
				text: "You are not logged in",
				icon: "error",
				showConfirmButton: false,
				padding: "2rem 0 3rem 0",
				timer: 2000,
				customClass: {
					title: "alert__title",
					htmlContainer: "alert__html",
				},
			});
		}
	};

	return (
		<div className="product-detail">
			<div className="product-detail__container">
				<div className="product-detail__wrap">
					{loading ? (
						<PulseLoader loading={loading} css={override} size={8} />
					) : (
						<>
							<div className="product-detail__thumb">
								<img src={image} alt="" />
							</div>
							<div className="product-detail__content">
								<div className="product-detail__content-top">
									<h3>{title}</h3>
									<div className="product-detail__content-rating">
										<span className="product-detail__content-star">
											<ion-icon name="star-outline"></ion-icon>
										</span>
										<span className="product-detail__content-star">
											<ion-icon name="star-outline"></ion-icon>
										</span>
										<span className="product-detail__content-star">
											<ion-icon name="star-outline"></ion-icon>
										</span>
										<span className="product-detail__content-star">
											<ion-icon name="star-outline"></ion-icon>
										</span>
										<span className="product-detail__content-star">
											<ion-icon name="star-outline"></ion-icon>
										</span>

										{/* <MdStar className="product-detail__content-star" /> */}
									</div>
									<p>{formatCurrency(price)}</p>
								</div>
								<div className="product-detail__content-desc">
									<p>{description}</p>
								</div>
								<div className="product-detail__content-actions">
									<div className="product-detail__content-quantity">
										<p>Quantity</p>
										<div>
											<button
												onClick={() => {
													if (quantity <= 1) {
														return;
													} else {
														setQuantity(quantity - 1);
													}
												}}
											>
												-
											</button>
											<span>{quantity}</span>
											<button
												onClick={() => {
													setQuantity(quantity + 1);
												}}
											>
												+
											</button>
										</div>
									</div>
									<button
										className="product-detail__content-add"
										onClick={addProduct}
									>
										Add to cart
									</button>
								</div>
								<div className="product-detail__content-category">
									<p>Category:</p>
									<div>
										<span>Accessories,</span>
										<span>Gaming,</span>
										<span>PC Computers,</span>
										<span>Ultrabooks</span>
									</div>
								</div>

								<div className="product-detail__content-share">
									<p>Share:</p>
									<div>
										<span>
											<ion-icon name="logo-facebook"></ion-icon>
										</span>

										<span>
											<ion-icon name="logo-youtube"></ion-icon>
										</span>
										<span>
											<ion-icon name="logo-youtube"></ion-icon>
										</span>
										<span>
											<ion-icon name="logo-twitter"></ion-icon>
										</span>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
