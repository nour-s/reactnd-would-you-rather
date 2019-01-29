function users(state = {}, action) {
	switch (action.type) {
		case "RECIEVE_USERS":
			return action.users;
		case "VOTE_FOR_OPTION":
			return { ...state, [action.user.id]: action.user };
		default:
			return state;
	}
}

export default users;
