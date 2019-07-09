import React from "react";
import { Switch, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import ExpressGetPost from "./pages/ExpressGetPost";
import ExpressCrud from "./pages/ExpressCrud";
import ReactProps from "./pages/ReactProps";
import ReactPropsVsHooks from "./pages/ReactPropsVsHooks";

export default function App() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="navbar__link navbar__link--main">
          Visualize Code
        </Link>
        <NavLink
          to="/express-get-post"
          className="navbar__link"
          activeClassName="navbar__link--active"
        >
          Example 1
        </NavLink>
        <NavLink
          to="/express-crud"
          className="navbar__link"
          activeClassName="navbar__link--active"
        >
          Example 2
        </NavLink>
      </nav>
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/express-get-post" exact component={ExpressGetPost} />
          <Route path="/express-crud" exact component={ExpressCrud} />
          <Route path="/react-props" exact component={ReactProps} />
          <Route path="/react-props-vs-hooks" exact component={ReactPropsVsHooks} />
        </Switch>
      </div>
    </div>
  );
}
