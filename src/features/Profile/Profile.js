import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import SidebarUser from "../../components/SidebarUser/SidebarUser";
import { Helmet } from "react-helmet";

const schema = yup.object().shape({
	username: yup.string().min(8, "Username must be at least 8 characters"),
});

const Profile = () => {
	const user = useSelector((state) => state.user.user);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const editProfile = (data, e) => {
		e.preventDefault();

		user
			.updateProfile({ displayName: data.username, photoURL: null })
			.then(() => {
				Swal.fire({
					title: "Update profile successfully",
					icon: "success",
					showConfirmButton: false,
					padding: "2rem 0 3rem 0",
					timer: 2000,
				});
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
			<Helmet>
				<meta charSet="utf-8" />
				<title>My profile</title>
				<link
					rel="icon"
					href="https://image.flaticon.com/icons/png/512/777/777205.png"
				/>
			</Helmet>

			<div className="profile">
				<div className="profile__container">
					<div className="profile__content">
						<SidebarUser />
						<div className="profile__desc">
							<div className="profile__photo">
								<div className="profile__avatar">
									<ion-icon name="person-circle-outline"></ion-icon>
								</div>
							</div>
							<form
								className="profile__info"
								onSubmit={handleSubmit(editProfile)}
							>
								<h2 className="profile__title">My Profile</h2>
								<div className="profile__input">
									<label htmlFor="email">Email</label>
									<input type="text" id="email" value={user?.email} disabled />
								</div>

								<div className="profile__input profile__input--username">
									<div className="profile__input-group">
										<label htmlFor="username">Username</label>
										<input
											type="text"
											id="username"
											defaultValue={user ? user.displayName : ""}
											{...register("username")}
											className={errors?.username && "profile__error-field"}
										/>
									</div>

									{errors?.username && (
										<span className="profile__error-message">
											{errors?.username?.message}
										</span>
									)}
								</div>

								<div className="profile__input">
									<label htmlFor="date">Date joined</label>
									<input
										type="text"
										id="date"
										value={user?.metadata?.creationTime}
										disabled
									/>
								</div>

								<button className="profile__action">Update</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
