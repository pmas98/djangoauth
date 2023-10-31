import React, { Component } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import Timeline from "./elements/timeline";
import Sidebar from "../../globalComponents/sidebar";
import Topbar from "../../globalComponents/Topbar";

export default class TimelinePage extends Component {
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
            <Timeline />
          </div>
        </div>
      </div>
    );
  }
}
