import React, { useState } from "react";
import "./style.scss";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth, db } from "../../firebase/firebase";
import { useSelector } from "react-redux";

const schema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid email")
		.required("Email is a required field"),
	password: yup.string().min(6).required("Password is a required field"),
});

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const [error, setError] = useState(null);
	const history = useHistory();
	// const user = useSelector((state) => state.user);

	const handleLogin = (data, e) => {
		e.preventDefault();

		auth
			.signInWithEmailAndPassword(data.email, data.password)
			.then((userAuth) => {
				console.log(userAuth);
				history.push("/");
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	return (
		<div className="login-form">
			<div className="login-form__container">
				{/* {email && uid ? (
					<p className="login-form__already-login">You are already logged in</p>
				) : ( */}
				<form
					className="login-form__content"
					onSubmit={handleSubmit(handleLogin)}
				>
					<h3>Login From Here</h3>
					<div className="login-form__input-group">
						<label htmlFor="email">Email Address</label>
						<input
							{...register("email")}
							name="email"
							type="text"
							id="email"
							placeholder="Enter address"
							className={errors.email && "login-form__error-field"}
						/>
						{errors.email && (
							<span className="login-form__error-message">
								{errors.email.message}
							</span>
						)}
					</div>
					<div className="login-form__input-group">
						<label htmlFor="password">Password </label>
						<input
							{...register("password")}
							name="password"
							type="password"
							id="password"
							placeholder="Enter Password"
							className={errors.password && "login-form__error-field"}
						/>
						{errors.password && (
							<span className="login-form__error-message">
								{errors.password.message}
							</span>
						)}
					</div>
					<div className="login-form__input-group--custom">
						<div>
							<input type="checkbox" id="remember" />
							<label htmlFor="remember">Remember me!</label>
						</div>
						<Link to="/forgot_password">Forgot your password?</Link>
					</div>
					<div className="login-form__actions">
						<button className="login-form__action">Login Now</button>

						{/* Error when submitting */}
						{error && (
							<p className="login-form__error-submit">
								<span>
									<ion-icon name="warning-outline"></ion-icon>
								</span>
								<span>{error}</span>
							</p>
						)}

						<p className="login-form__hr">or</p>
						<Link
							className="login-form__action login-form__action--login"
							to="/register"
						>
							Register now
						</Link>
					</div>
				</form>
				{/* )} */}
			</div>
		</div>
	);
};

export default Login;
