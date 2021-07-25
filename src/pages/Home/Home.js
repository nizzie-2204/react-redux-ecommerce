import React from "react";
import Banner from "../../components/Banner/Banner";
import { Helmet } from "react-helmet";

const Home = () => {
	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Home</title>
				<link
					rel="icon"
					href="https://image.flaticon.com/icons/png/512/777/777205.png"
				/>
			</Helmet>
			<Banner />
		</>
	);
};

export default Home;
