import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./style.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from "../../firebase/firebase";

const schema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid email")
		.required("Email is a required field"),
	password: yup
		.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is a required field"),
	// .matches(
	// 	/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
	// 	"Password must contain at least 8 characters, one uppercase, one number and one special case character"
	// ),
	confirmPassword: yup
		.string()
		.required("Confirm password is a required field")
		.oneOf(
			[yup.ref("password"), null],
			"Password and Confirm Password must be match"
		),
});

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const [error, setError] = useState(null);
	const history = useHistory();

	const handleRegister = (data, e) => {
		auth
			.createUserWithEmailAndPassword(data.email, data.password)
			.then((userAuth) => {
				history.push("/login");
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	return (
		<div className="register-form">
			<div className="register-form__container">
				<form
					className="register-form__content"
					onSubmit={handleSubmit(handleRegister)}
				>
					<h3>Signup From Here</h3>
					<div className="register-form__input-group">
						<label htmlFor="email">Email Address</label>
						<input
							{...register("email")}
							type="text"
							id="email"
							placeholder="Enter address"
							className={errors.email && "register-form__error-field"}
						/>

						{/* Error when submitting */}
						{errors.email && (
							<span className="register-form__error-message">
								{errors.email.message}
							</span>
						)}
					</div>

					<div className="register-form__input-group">
						<label htmlFor="password">Password </label>
						<input
							{...register("password")}
							type="password"
							id="password"
							placeholder="Enter Password"
							className={errors.password && "register-form__error-field"}
						/>

						{/* Error when submitting */}
						{errors.password && (
							<span className="register-form__error-message">
								{errors.password.message}
							</span>
						)}
					</div>

					<div className="register-form__input-group">
						<label htmlFor="confirmPassword">Confirm Password </label>
						<input
							{...register("confirmPassword")}
							type="password"
							id="confirmPassword"
							placeholder="Confirm Password"
							className={errors.confirmPassword && "register-form__error-field"}
						/>

						{/* Error when submitting */}
						{errors.confirmPassword && (
							<span className="register-form__error-message">
								{errors.confirmPassword.message}
							</span>
						)}
					</div>

					<div className="register-form__actions">
						<button className="register-form__action" type="submit">
							Register Now
						</button>

						{/* Error when submitting */}
						{error && (
							<p className="register-form__error-submit">
								<span>
									<ion-icon name="warning-outline"></ion-icon>
								</span>
								<span>{error}</span>
							</p>
						)}

						<p className="register-form__hr">or</p>
						<Link
							className="register-form__action register-form__action--login"
							to="/login"
						>
							Login now
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
