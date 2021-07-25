import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SidebarUser from "../../components/SidebarUser/SidebarUser";
import { db } from "../../firebase/firebase";
import { formatCurrency } from "../../helper/helper";
import "./style.scss";
import { Helmet } from "react-helmet";

const Order = () => {
	const user = useSelector((state) => state.user.user);

	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (user) {
			db.collection("user")
				.doc(user?.uid?.toString())
				.collection("orders")
				.onSnapshot((snapshot) => {
					const data = snapshot.docs.map((doc) => ({
						id: doc?.id,
						data: doc?.data(),
					}));

					setOrders(data);
				});
		} else {
			setOrders([]);
		}
	}, [orders]);

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Order</title>
				<link
					rel="icon"
					href="https://image.flaticon.com/icons/png/512/777/777205.png"
				/>
			</Helmet>

			<div className="order">
				<div className="order__container">
					<div className="order__wrap">
						<SidebarUser />
						<div className="order__content">
							{orders?.map((order) => {
								return (
									<div className="order__items">
										<h3 className="order__items-title">
											Time:
											{order.data.created}
										</h3>

										{order.data.cart.map((item) => {
											return (
												<div className="order__item">
													<img
														className="order__item-image"
														src={item.image}
														alt={item.title}
													/>
													<div className="order__item-desc">
														<h5 className="order__item-title">{item.title}</h5>
														<p className="order__item-price">
															{formatCurrency(item.price)} x {item.quantity}
														</p>
													</div>
												</div>
											);
										})}

										<div className="order__items-total">
											Total:
											<span>{formatCurrency(order.data.total)}</span>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Order;
