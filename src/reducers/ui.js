export default function setUi(state = {}, action) {
	switch (action.type) {
		case "SET_SELECTED_TAB":
			return { ...state, selectedTab: action.tab };
		default:
			return state;
	}
}
