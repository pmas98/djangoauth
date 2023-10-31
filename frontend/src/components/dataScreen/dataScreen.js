import React, { Component } from "react";
import Cookies from "js-cookie";
import DataTable from "./elements/dataTable";
import Sidebar from "../../globalComponents/sidebar";
import { Button } from "@mui/material";
import Topbar from "../../globalComponents/Topbar";

export default class dataScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flex: 1 }}>
            <Topbar />
            <DataTable />
          </div>
        </div>
      </div>
    );
  }
}
