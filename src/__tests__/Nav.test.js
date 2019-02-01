import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import Nav from "../components/Nav";

describe("Nav", () => {
	it("Render Nav without crashing", () => {
		const renderer = new ShallowRenderer();
		renderer.render(<Nav />);
		const tree = renderer.getRenderOutput();
		expect(tree).toMatchSnapshot();
	});
});
