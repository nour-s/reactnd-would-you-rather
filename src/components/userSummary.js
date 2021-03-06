import React from "react";
import PropTypes from "prop-types";

const UserSummary = ({
	user = { avatarURL: "../../images/default.png", name: "Select User" }
}) => (
	<div className="author-info">
		<img src={user.avatarURL} alt="avatar" />
		<span>{user.name}</span>
	</div>
);

UserSummary.propTypes = {
	user: PropTypes.shape({
		avatarURL: PropTypes.string,
		name: PropTypes.string
	})
};

export default UserSummary;
