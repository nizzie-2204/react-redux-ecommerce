import React from "react";
import "./style.scss";
import { formatCurrency } from "../../../../helper/helper";
import { addToCart } from "../../../Cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);
	// const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

	const addProduct = () => {
		// Allow to add product when user is logged in
		if (user) {
			const action = addToCart(product);
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
		<div className="product">
			<Link to={`/shop/product/${product?.id}`}>
				<img
					src={product?.image}
					alt={product?.title}
					className="product__image"
				/>
			</Link>
			<h3 className="product__title">{product?.title}</h3>
			<p className="product__price">{formatCurrency(product?.price)}</p>
			<button className="product__add-cart" type="button" onClick={addProduct}>
				Add to cart
			</button>
		</div>
	);
};

export default Product;
