import React from "react";
import { shallow } from "enzyme";
import ReactDOM from "react-dom";
import { App } from "../components/App";
import { MemoryRouter } from "react-router";

describe("App component", () => {
	it("renders without crashing", () => {
		const div = document.createElement("div");
		const props = {
			authedUser: { id: "nour" },
			users: {},
			polls: {}
		};

		shallow(
			<MemoryRouter initialEntries={["/", "/add"]} initialIndex={0}>
				<App {...props} />
			</MemoryRouter>,
			div
		);
		ReactDOM.unmountComponentAtNode(div);
	});
});
