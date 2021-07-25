import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartRow from "../CartRow/CartRow";
import "./style.scss";
import { formatCurrency } from "../../../../helper/helper";
import { totalPriceInCart } from "../../../../helper/helper";
import { Helmet } from "react-helmet";

const Cart = () => {
	const cart = useSelector((state) => state.cart);

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Cart</title>
				<link
					rel="icon"
					href="https://image.flaticon.com/icons/png/512/777/777205.png"
				/>
			</Helmet>

			<div className="cart">
				<div className="cart__container">
					{cart.length > 0 ? (
						<>
							<table className="cart__content">
								<thead>
									<tr>
										<th>Images</th>
										<th>Product</th>
										<th>Unit Price </th>
										<th>Quantity</th>
										<th>Total</th>
										<th>Remove</th>
									</tr>
								</thead>
								<tbody>
									{cart.map((product) => {
										return <CartRow product={product} key={product.id} />;
									})}
								</tbody>
							</table>
							<div className="cart__total">
								<h2 className="cart__total-title">Cart Totals</h2>
								<div className="cart__total-price">
									<div>
										<span>Subtotal</span>
										<span>{formatCurrency(totalPriceInCart(cart))}</span>
									</div>
									<div>
										<span>Total</span>
										<span>{formatCurrency(totalPriceInCart(cart))}</span>
									</div>
								</div>
								<div className="cart__total-actions">
									<Link className="cart__total-back" to="/shop">
										Continue shopping
									</Link>
									<Link className="cart__total-checkout" to="/payment">
										Proceed to checkout
									</Link>
								</div>
							</div>
						</>
					) : (
						<h2 className="cart__empty">Your cart is empty</h2>
					)}
				</div>
			</div>
		</>
	);
};

export default Cart;
