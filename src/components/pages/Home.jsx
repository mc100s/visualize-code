import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Visualize Code</h1>
        <Link to="/express-get-post">GET and POST requests with Express</Link>
        <Link to="/express-crud">Simple Express CRUD</Link>

        <p>TODO</p>
        <ul>
          <li>Copy / paste code</li>
          <li>Change the color of comments to dark green</li>
          <li>Add a symbol next to the file name</li>
          <li>Have a list of possible values for some fields</li>
        </ul>
      </div>
    )
  }
}
