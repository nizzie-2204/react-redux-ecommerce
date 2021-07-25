import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { setUserActive, setUserInActive } from "../../store/UserSlice";
import "./style.scss";

const Header = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector((state) => state.user.user);
	const cart = useSelector((state) => state.cart);

	useEffect(() => {
		auth.onAuthStateChanged((userAuth) => {
			if (userAuth) {
				const action = setUserActive(userAuth);
				dispatch(action);
			} else {
				const action = setUserInActive();
				dispatch(action);
			}
		});
	});

	const handleLogout = () => {
		auth
			.signOut()
			.then(() => {
				if (!user) {
					history.push("/login");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<header className="header">
				<div className="header__container">
					<div className="header__content">
						<Link to="/" className="header__logo">
							E-commerce
						</Link>

						<nav className="header__menu">
							<ul className="header__menu-items">
								<li className="header__menu-item">
									<Link to="/">Home</Link>
								</li>
								<li className="header__menu-item">
									<Link to="/shop">Shop</Link>
								</li>
								<li className="header__menu-item">
									<Link to="/profile">My account</Link>
								</li>
								<li className="header__menu-item">
									<Link to="/register">Register</Link>
								</li>
							</ul>
						</nav>

						<div className="header__user">
							<Link to="/cart" className="header__cart">
								<div className="header__cart-icon">
									<ion-icon name="cart-outline"></ion-icon>
								</div>
								<div className="header__cart-quantity">
									{cart ? cart.length : 0}
								</div>
							</Link>

							{user ? (
								<div className="header__links">
									<Link to="/profile" className="header__sign-in">
										<div className="header__sign-in-icon">
											<ion-icon name="person-circle-outline"></ion-icon>
										</div>
										<div className="header__sign-in-text">{user.email}</div>
									</Link>

									<button
										to="/"
										className="header__logout"
										onClick={handleLogout}
									>
										Log out
									</button>
								</div>
							) : (
								<Link to="/login" className="header__sign-in">
									<div className="header__sign-in-icon">
										<ion-icon name="person-circle-outline"></ion-icon>
									</div>
									<div className="header__sign-in-text">Sign in</div>
								</Link>
							)}
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
