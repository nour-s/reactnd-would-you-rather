export default function authedUser(state = {}, action) {
	switch (action.type) {
		case "SET_AUTHED_USER":
			return { id: action.id };
		default:
			return state;
	}
}
