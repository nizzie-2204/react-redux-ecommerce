import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import { Link } from "react-router-dom";

const SidebarUser = () => {
	const user = useSelector((state) => state.user.user);

	return (
		<div className="profile__sidebar">
			<div className="profile__sidebar-account">
				<span className="profile__sidebar-icon">
					<ion-icon name="person-outline"></ion-icon>
				</span>
				<div className="profile__sidebar-info">
					<span>Account of</span>
					<strong>{user?.email}</strong>
				</div>
			</div>

			<div className="profile__sidebar-dropdown">
				<Link className="profile__sidebar-link" to={`/profile/${user?.uid}`}>
					Profile
				</Link>
				<Link className="profile__sidebar-link" to="/change_password">
					Change password
				</Link>
				<Link className="profile__sidebar-link" to="/order">
					Order management
				</Link>
			</div>
		</div>
	);
};

export default SidebarUser;
