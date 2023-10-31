import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import { NotificationContainer } from "react-notifications";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <HomePage />
        <NotificationContainer />
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
