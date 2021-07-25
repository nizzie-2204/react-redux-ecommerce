export const formatCurrency = (price) => {
	return new Intl.NumberFormat("de-DE", {
		style: "currency",
		currency: "USD",
	}).format(price);
};

export const totalPriceInCart = (cart) => {
	return cart.reduce((initialValue, nextValue) => {
		return initialValue + nextValue.price * nextValue.quantity;
	}, 0);
};

export const options = [
	{ value: "electronics", label: "Electronics" },
	{ value: "jewelery", label: "Jewelry" },
	{ value: "men's clothing", label: "Women's clothing" },
	{ value: "women's clothing", label: "Men's clothing" },
];
