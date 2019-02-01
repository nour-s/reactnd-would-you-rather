import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { CreatePoll } from "../components/Poll/createPoll";

describe("CreatePoll", () => {
	const history = { push: () => {} };
	const addNewPoll = () => {};

	it("Render CreatePoll without crashing", () => {
		const renderer = new ShallowRenderer();
		renderer.render(
			<CreatePoll history={history} addNewPoll={addNewPoll} />
		);
		const tree = renderer.getRenderOutput();
		expect(tree).toMatchSnapshot();
	});
});
