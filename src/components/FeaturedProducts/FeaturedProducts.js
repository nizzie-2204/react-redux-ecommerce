import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../../features/Products/productsSlice";
import { formatCurrency } from "../../helper/helper";
import "./style.scss";

const FeaturedProducts = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchProducts = async () => {
			await dispatch(getProducts())
				.then(unwrapResult)
				.then((result) => {})
				.catch((error) => {
					console.log(error);
				});
		};
		fetchProducts();
	}, []);

	return (
		<div className="featured-products">
			<div className="featured-products__container">
				<div className="featured-products__content">
					<div className="featured-products__item">
						<div className="featured-products__image">
							<img
								src="https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg"
								alt=""
							/>
						</div>
						<h3 className="featured-products__title">
							SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s
						</h3>
						<span className="featured-products__price">
							{formatCurrency(200)}
						</span>
						<button type="button" className="featured-products__add">
							Add to cart
						</button>
					</div>
					<div className="featured-products__item">
						<div className="featured-products__image">
							<img
								src="https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg"
								alt=""
							/>
						</div>
						<h3 className="featured-products__title">
							SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s
						</h3>
						<span className="featured-products__price">
							{formatCurrency(200)}
						</span>
						<button type="button" className="featured-products__add">
							Add to cart
						</button>
					</div>
					<div className="featured-products__item">
						<div className="featured-products__image">
							<img
								src="https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg"
								alt=""
							/>
						</div>
						<h3 className="featured-products__title">
							SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s
						</h3>
						<span className="featured-products__price">
							{formatCurrency(200)}
						</span>
						<button type="button" className="featured-products__add">
							Add to cart
						</button>
					</div>
					<div className="featured-products__item">
						<div className="featured-products__image">
							<img
								src="https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg"
								alt=""
							/>
						</div>
						<h3 className="featured-products__title">
							SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s
						</h3>
						<span className="featured-products__price">
							{formatCurrency(200)}
						</span>
						<button type="button" className="featured-products__add">
							Add to cart
						</button>
					</div>
					<div className="featured-products__item">
						<div className="featured-products__image">
							<img
								src="https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg"
								alt=""
							/>
						</div>
						<h3 className="featured-products__title">
							SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s
						</h3>
						<span className="featured-products__price">
							{formatCurrency(200)}
						</span>
						<button type="button" className="featured-products__add">
							Add to cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FeaturedProducts;
