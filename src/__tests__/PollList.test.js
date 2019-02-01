import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { PollList } from "../components/Poll/pollList";

describe("Poll", () => {
	const polls = {
		"8xf0y6ziyjabvozdd253nd": {
			id: "8xf0y6ziyjabvozdd253nd",
			author: "sarahedo",
			timestamp: 1467166872634,
			optionOne: {
				votes: ["sarahedo"],
				text: "have horrible short term memory"
			},
			optionTwo: {
				votes: [],
				text: "have horrible long term memory"
			}
		},
		vthrdm985a262al8qx3do: {
			id: "vthrdm985a262al8qx3do",
			author: "tylermcginnis",
			timestamp: 1489579767190,
			optionOne: {
				votes: ["tylermcginnis"],
				text: "find $50 yourself"
			},
			optionTwo: {
				votes: ["johndoe"],
				text: "have your best friend find $500"
			}
		}
	};
	const authedUser = { id: "sarahedo" };
	const users = {
		sarahedo: {
			id: "sarahedo",
			name: "Sarah Edo",
			avatarURL: "../../images/snow.jpg",
			answers: {
				"8xf0y6ziyjabvozdd253nd": "optionOne",
				"6ni6ok3ym7mf1p33lnez": "optionOne",
				am8ehyc8byjqgar0jgpub9: "optionTwo",
				loxhs1bqm25b708cmbf3g: "optionTwo"
			},
			questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"]
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

	it("Render Poll with the tab 'answered' selected", () => {
		const renderer = new ShallowRenderer();
		renderer.render(
			<PollList
				polls={polls}
				authedUser={authedUser}
				ui={{ selectedTab: "answered" }}
				users={users}
			/>
		);
		const tree = renderer.getRenderOutput();
		expect(tree).toMatchSnapshot();
	});

	it("Render Poll with the tab 'unanswered' selected", () => {
		const renderer = new ShallowRenderer();
		renderer.render(
			<PollList
				polls={polls}
				authedUser={authedUser}
				ui={{ selectedTab: "unanswered" }}
				users={users}
			/>
		);
		const tree = renderer.getRenderOutput();
		expect(tree).toMatchSnapshot();
	});
});
