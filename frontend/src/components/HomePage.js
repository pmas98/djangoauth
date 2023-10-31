import React, { Component } from "react";
import RegisterPage from "./AuthPages/RegisterPage";
import Loginpage from "./AuthPages/LoginPage";
import DataPage from "./dataScreen/dataScreen";
import employeeFormScreen from "./FormPages/employeeFormScreen";
import companyFormScreen from "./FormPages/companyFormScreen";
import TimelinePage from "./Timeline/TimelinePage";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Loginpage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/logout" component={Loginpage} />

          <Route exact path="/employeeData" component={DataPage} />
          <Route exact path="/addEmployee" component={employeeFormScreen} />
          <Route exact path="/addCompany" component={companyFormScreen} />
          <Route exact path="/timeline" component={TimelinePage} />
        </Switch>
      </Router>
    );
  }
}
