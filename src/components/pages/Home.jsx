import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Visualize Code</h1>
        <ul>
          <li>
            <Link to="/express-get-post">
              GET and POST requests with Express
            </Link>
          </li>
          <li>
            <Link to="/express-crud">Simple Express CRUD</Link>
          </li>
        </ul>
        <br />

        {/* <p>TODO</p>
        <ul>
          <li>Add a symbol next to the file name</li>
          <li>Have a list of possible values for some fields</li>
        </ul> */}
      </div>
    );
  }
}
