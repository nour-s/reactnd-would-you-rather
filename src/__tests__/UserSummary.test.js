import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import UserSummary from "../components/userSummary";

describe("UserSummary", () => {
	const location = { state: {} };
	const user = {
		name: "Tyler McGinnis",
		avatarURL: "../../images/tyler.jpg"
	};

	const setAuthedUser = () => {};

	it("Render UserSummary without crashing", () => {
		const renderer = new ShallowRenderer();
		renderer.render(<UserSummary user={user} />);
		const tree = renderer.getRenderOutput();
		expect(tree).toMatchSnapshot();
	});
});
