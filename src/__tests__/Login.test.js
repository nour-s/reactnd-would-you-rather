import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { Login } from "../components/login";

describe("Login", () => {
	const location = { state: {} };
	const users = {
		tylermcginnis: {
			id: "tylermcginnis",
			name: "Tyler McGinnis",
			avatarURL: "../../images/tyler.jpg",
			answers: {
				vthrdm985a262al8qx3do: "optionOne",
				xj352vofupe1dqz9emx13r: "optionTwo"
			},
			questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"]
		},
		johndoe: {
			id: "johndoe",
			name: "John Doe",
			avatarURL: "../../images/leaf.jpg",
			answers: {
				xj352vofupe1dqz9emx13r: "optionOne",
				vthrdm985a262al8qx3do: "optionTwo",
				"6ni6ok3ym7mf1p33lnez": "optionOne"
			},
			questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"]
		}
	};

	const setAuthedUser = () => {};

	it("Render Login without crashing", () => {
		const renderer = new ShallowRenderer();
		renderer.render(
			<Login
				location={location}
				users={users}
				setAuthedUser={setAuthedUser}
			/>
		);
		const tree = renderer.getRenderOutput();
		expect(tree).toMatchSnapshot();
	});
});
