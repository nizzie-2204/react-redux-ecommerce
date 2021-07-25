import axios from "axios";

const productsAPI = {
	getProducts: () => {
		return axios.get("https://fakestoreapi.com/products");
	},

	getProduct: (id) => {
		return axios.get(`https://fakestoreapi.com/products/${id}`);
	},

	getProductsByCategory: (category) => {
		return axios.get(`https://fakestoreapi.com/products/category/${category}`);
	},
};

export default productsAPI;
