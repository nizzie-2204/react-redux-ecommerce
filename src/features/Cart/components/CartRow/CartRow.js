import React from "react";
import { useDispatch } from "react-redux";
import { formatCurrency } from "../../../../helper/helper";
import {
	increaseQuantity,
	decreaseQuantity,
	removeFromCart,
} from "../../CartSlice";

const CartRow = ({ product }) => {
	const { image, title, price, quantity, id } = product;
	const dispatch = useDispatch();

	const removeProduct = () => {
		const action = removeFromCart(id);
		dispatch(action);
	};

	const increaseQuantityProduct = () => {
		const action = increaseQuantity(id);
		dispatch(action);
	};

	const decreaseQuantityProduct = () => {
		const action = decreaseQuantity(id);
		dispatch(action);
	};

	return (
		<tr>
			<td>
				<img src={image} alt={title} />
			</td>
			<td>{title}</td>
			<td>{formatCurrency(price)}</td>
			<td>
				<div className="cart__quantity">
					<button
						className="cart__quantity-action"
						onClick={() => {
							decreaseQuantityProduct();
						}}
					>
						-
					</button>
					<span>{quantity}</span>
					<button
						className="cart__quantity-action"
						onClick={() => {
							increaseQuantityProduct();
						}}
					>
						+
					</button>
				</div>
			</td>
			<td>{formatCurrency(price * quantity)}</td>
			<td>
				<ion-icon
					name="close-outline"
					style={{ cursor: "pointer", fontSize: "2rem" }}
					onClick={removeProduct}
				></ion-icon>
			</td>
		</tr>
	);
};

export default CartRow;
