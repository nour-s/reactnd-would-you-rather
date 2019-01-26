import React from "react";
import { NavLink } from "react-router-dom";

export default class Nav extends React.Component {
	render() {
		return (
			<React.Fragment>
				<nav className="nav">
					<ul>
						<li>
							<NavLink to="/" exact activeClassName="active">
								Home
							</NavLink>
						</li>
						<li>
							<NavLink to="/add" exact activeClassName="active">
								New Question
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/leaderboard"
								exact
								activeClassName="active"
							>
								Leader Board
							</NavLink>
						</li>
					</ul>
				</nav>
			</React.Fragment>
		);
	}
}
