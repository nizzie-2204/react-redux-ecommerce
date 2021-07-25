import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { options } from "../../../../helper/helper";

import Product from "../Product/Product";
import "./style.scss";
import PulseLoader from "react-spinners/PulseLoader";

import { css } from "@emotion/react";
import { useState } from "react";
import {
	useHistory,
	useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import {
	filterProductsByPrice,
	getProducts,
	getProductsByCategory,
} from "../../productsSlice";

const override = css`
	display: block;
	text-align: center;
	margin: 15rem auto;
	color: red;
`;

const Products = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const products = useSelector((state) => state.products.products);

	const loading = useSelector((state) => state.products.loadingProducts);

	const [selectedOption, setSelectedOption] = useState(null);

	const handleChangeOption = (selectedOption) => {
		setSelectedOption(selectedOption);

		history.push(`/shop?category=${selectedOption.value}`);
	};

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

	useEffect(() => {
		const fetchFilteredProducts = async () => {
			await dispatch(getProductsByCategory(selectedOption?.value))
				.then(unwrapResult)
				.then((result) => {})
				.catch((error) => {
					console.log(error);
				});
		};
		fetchFilteredProducts();
	}, [selectedOption?.value]);

	return (
		<div className="products">
			<div className="products__container">
				{loading ? (
					<PulseLoader loading={loading} css={override} size={8} />
				) : (
					<>
						<div className="products__select">
							<Select
								value={selectedOption}
								options={options}
								onChange={handleChangeOption}
								defaultValue={null}
								placeholder="Category"
							/>
						</div>
						<div className="products__content">
							{products.map((product) => {
								return <Product product={product} key={product.id} />;
							})}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Products;
