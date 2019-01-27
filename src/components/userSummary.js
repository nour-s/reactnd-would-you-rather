import React from "react";

const UserSummary = props => (
	<div className="author-info">
		<img src="/images/avatar.png" alt="avatar" />
		<span>{props.user.name}</span>
	</div>
);

export default UserSummary;
