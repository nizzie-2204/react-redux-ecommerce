import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import Cart from "./features/Cart/components/Cart/Cart";
import ChangePassword from "./features/ChangePassword/ChangePassword";
import ForgotPassword from "./features/ForgotPassword/ForgotPassword";
import Login from "./features/Login/Login";
import Order from "./features/Order/Order";
import Payment from "./features/Payment/Payment";
import ProductDetail from "./features/Products/components/ProductDetail/ProductDetail";
import Products from "./features/Products/components/Products/Products";
import Profile from "./features/Profile/Profile";
import Register from "./features/Register/Register";
import Home from "./pages/Home/Home";
import store from "./store/store";

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<Router>
					<Header />

					<Switch>
						<PublicRoute exact path="/" component={Home} />
						<PublicRoute path="/cart" component={Cart} />
						<PublicRoute path="/forgot_password" component={ForgotPassword} />
						<PublicRoute path="/payment" component={Payment} />
						<PublicRoute exact path="/shop" component={Products} />
						<PublicRoute path="/shop?category=" component={Products} />
						<PublicRoute path="/shop/product/:id" component={ProductDetail} />

						<PublicRoute restricted path="/register" component={Register} />
						<PublicRoute restricted path="/login" component={Login} />

						<PrivateRoute path="/order" component={Order} />
						<PrivateRoute path="/profile" component={Profile} />
						<PrivateRoute path="/change_password" component={ChangePassword} />
					</Switch>

					<Footer />
				</Router>
			</Provider>
		</div>
	);
}

export default App;
