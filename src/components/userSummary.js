import React from "react";

const UserSummary = ({ user }) => (
	<div className="author-info">
		<img src={user.avatarURL} alt="avatar" />
		<span>{user.name}</span>
	</div>
);

export default UserSummary;
