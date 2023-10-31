import React, { Component } from "react";
import Cookies from "js-cookie";
import Sidebar from "../../globalComponents/sidebar";
import { Button } from "@mui/material";
import Topbar from "../../globalComponents/Topbar";
import CompanyForm from "./elements/addCompany";
export default class companyFormScreen extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    const csrfToken = Cookies.get("csrftoken");

    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    };
    fetch("api/logout", {
      method: "POST",
      headers: headers,
    })
      .then((response) => {
        window.location.href = "/";
      })
      .catch((error) => {
        // Handle errors here
      });
  };

  render() {
    return (
      <div>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flex: 1 }}>
            <Topbar />
            <CompanyForm />
          </div>
        </div>
      </div>
    );
  }
}
