import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from "../../firebase/firebase";
import SidebarUser from "../../components/SidebarUser/SidebarUser";
import "./style.scss";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { currentUser } from "../../firebase/firebase";

const schema = yup.object().shape({
	password: yup
		.string()
		.required("Password is a required field")
		.min(6, "Password must be at least 6 characters	"),
	confirmPassword: yup
		.string()
		.required("Confirm password is a required field")
		.oneOf(
			[yup.ref("password"), null],
			"Password and Confirm Password must be match"
		),
});

const ChangePassword = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const changePassword = (data, e) => {
		e.preventDefault();

		auth.currentUser
			.updatePassword(data.password)
			.then(() => {
				Swal.fire({
					title: "Change password successfully",
					icon: "success",
					showConfirmButton: false,
					padding: "2rem 0 3rem 0",
					timer: 2000,
					customClass: {
						title: "alert__title",
						htmlContainer: "alert__html",
					},
				});

				reset();
			})
			.catch((error) => {
				Swal.fire({
					title: `${error}`,
					icon: "error",
					showConfirmButton: false,
					padding: "2rem 0 3rem 0",
					timer: 2000,
					customClass: {
						title: "alert__title",
						htmlContainer: "alert__html",
					},
				});
			});
	};

	return (
		<>
			<div className="change-password">
				<div className="change-password__container">
					<div className="change-password__wrap">
						<SidebarUser />

						<div className="change-password__main">
							<div className="change-password__title">
								<h3>Change password</h3>
								<span>
									For account security, please do not share your password with
									others
								</span>
							</div>
							<form
								className="change-password__content"
								onSubmit={handleSubmit(changePassword)}
							>
								<div className="change-password__input">
									<div className="change-password__input-group">
										<label htmlFor="password">Password </label>
										<input
											{...register("password")}
											type="password"
											id="password"
											placeholder="Enter Password"
											className={
												errors?.password && "change-password__error-field"
											}
										/>
									</div>

									{/* Error when submitting */}
									{errors?.password && (
										<span className="change-password__error-message">
											{errors.password.message}
										</span>
									)}
								</div>

								<div className="change-password__input">
									<div className="change-password__input-group">
										<label htmlFor="confirmPassword">Confirm Password </label>
										<input
											{...register("confirmPassword")}
											type="password"
											id="confirmPassword"
											placeholder="Confirm Password"
											className={
												errors?.confirmPassword &&
												"change-password__error-field"
											}
										/>
									</div>

									{/* Error when submitting */}
									{errors?.confirmPassword && (
										<span className="change-password__error-message">
											{errors.confirmPassword.message}
										</span>
									)}
								</div>

								<button className="change-password__confirm">Confirm</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ChangePassword;
