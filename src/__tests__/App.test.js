import React from "react";
import { App } from "../components/App";
import { MemoryRouter } from "react-router";
import renderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";

describe("App component", () => {
	it("renders without crashing", () => {
		const div = document.createElement("div");
		const props = {
			authedUser: { id: "nour" },
			users: {},
			polls: {}
		};

		const comp = <App {...props} />;
		const renderer = new ShallowRenderer();
		renderer.render(comp);
		const tree = renderer.getRenderOutput();
		expect(tree).toMatchSnapshot();
	});
});
