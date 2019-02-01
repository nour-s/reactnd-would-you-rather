import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { Poll } from "../components/Poll/poll";

describe("Poll", () => {
	const poll = {
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
	};
	poll.user = { id: "sarahedo", name: "sarahedo" };

	const history = { push: () => {} };
	const voteForOption = () => {};
	const onPollAnswered = () => {};
	let authedUser = "johndoe";

	it("Render unanswered Poll without crashing", () => {
		const renderer = new ShallowRenderer();
		renderer.render(
			<Poll
				poll={poll}
				history={history}
				authedUser={authedUser}
				voteForOption={voteForOption}
				onPollAnswered={onPollAnswered}
				isPreview={false}
			/>
		);
		const tree = renderer.getRenderOutput();
		expect(tree).toMatchSnapshot();
	});

	it("Render answered Poll without crashing", () => {
		const renderer = new ShallowRenderer();
		renderer.render(
			<Poll
				poll={poll}
				history={history}
				authedUser={"sarahedo"}
				voteForOption={voteForOption}
				onPollAnswered={onPollAnswered}
				isPreview={true}
			/>
		);
		const tree = renderer.getRenderOutput();
		expect(tree).toMatchSnapshot();
	});
});
