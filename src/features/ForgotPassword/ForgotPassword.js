import React, { useState } from "react";
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
});

const ForgotPassword = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const [success, setSuccess] = useState(null);
	const [error, setError] = useState(null);

	const handleForgotPw = (data, e) => {
		auth
			.sendPasswordResetEmail(data.email)
			.then(() => {
				setSuccess("Please check your email for password reset link");
				setError(null);
			})
			.catch((error) => {
				setError(error.message);
				setSuccess(null);
			});
	};

	return (
		<div className="forgot-pw">
			<div className="forgot-pw__container">
				<form
					className="forgot-pw__form"
					onSubmit={handleSubmit(handleForgotPw)}
				>
					<h3 className="forgot-pw__title">Forgot password?</h3>
					<p>
						Enter your registered email below to receive password reset
						instruction
					</p>
					<div className="forgot-pw__input-group">
						<label htmlFor="email">Email Address</label>
						<input
							{...register("email")}
							name="email"
							type="text"
							id="email"
							placeholder="Enter address"
							className={errors.email && "forgot-pw__error-field"}
						/>
						{errors.email && (
							<span className="forgot-pw__error-message">
								{errors.email.message}
							</span>
						)}
					</div>

					<button type="submit" className="forgot-pw__action">
						Reset password
					</button>

					{/* Submit successfully */}
					{success && (
						<p className="forgot-pw__success">
							<span>
								<ion-icon name="checkmark-circle-outline"></ion-icon>
							</span>
							<span>{success}</span>
						</p>
					)}

					{/* Error when submitting */}
					{error && (
						<p className="forgot-pw__error-submit">
							<span>
								<ion-icon name="warning-outline"></ion-icon>
							</span>
							<span>{error}</span>
						</p>
					)}
				</form>
			</div>
		</div>
	);
};

export default ForgotPassword;
