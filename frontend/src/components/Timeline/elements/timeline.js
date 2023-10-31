import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../globalComponents/theme";
import { useContext } from "react";
import { ColorModeContext } from "../../../globalComponents/theme";
import "react-vertical-timeline-component/style.min.css";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import FlightIcon from "@mui/icons-material/Flight";
import Header from "../../../globalComponents/header";
import Select from "react-select";
import Cookies from "js-cookie";
import LogoutIcon from '@mui/icons-material/Logout';

const Timeline = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [chosenEmployee, setChosenEmployee] = useState({});

  const fetchData = async () => {
    const csrfToken = Cookies.get("csrftoken");
    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    };

    fetch("api/getAllEmployees", {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .then((data) => {
        console.log("Ok");
        setData(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Ensure addOptions runs after data is set
    addOptions();
  }, [data, selectedValue]);

  const addOptions = async () => {
    console.log(data);
    const optionsData = data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setOptions(optionsData);
  };

  const handleSelectChange = (selectedOption) => {
    const selectedName = selectedOption.value;
    setSelectedValue(selectedOption);

    const selectedObject = data.find((item) => item.id === selectedName);

    if (selectedObject) {
      setChosenEmployee(selectedObject);
    } else {
      console.log(`Object with name '${selectedName}' not found in data`);
    }
  };

  return (
    <Box m="20px">
      <Header title="TIMELINE" subtitle="See the timeline of an employee" />
      <div style={{ maxWidth: "300px", paddingBottom: "2rem" }}>
        <Select
          options={options}
          styles={{ control: (styles) => ({ ...styles, width: "100%" }) }}
          value={selectedValue}
          onChange={handleSelectChange}
        />
      </div>
      <VerticalTimeline lineColor="#64A4DE">
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#64A4DE", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  #64A4DE)" }}
          iconStyle={{ background: "#64A4DE", color: "#fff" }} // Customize the icon background color
          date={""}
          icon={<HomeRepairServiceIcon />}
          visible={true}
        >
          <h3 className="vertical-timeline-element-title">Admission Date</h3>
          <h5 className="vertical-timeline-element-title">
            {chosenEmployee.admissionDate
              ? chosenEmployee.admissionDate
              : "Choose an employee"}
          </h5>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#64CADE", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid #64CADE" }}
          iconStyle={{ background: "#64CADE", color: "#fff" }} // Customize the icon background color
          date={""}
          icon={<FlightIcon />}
          visible={true}
        >
          <h3 className="vertical-timeline-element-title">Vacancies</h3>
          <h5 className="vertical-timeline-element-title">
            {chosenEmployee.name
              ? chosenEmployee.vacanciesDate
                ? chosenEmployee.vacanciesDate
                : "Employee hasn't had vacations yet"
              : "Choose an employee"}
          </h5>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#4CCEB9", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid #4CCEB9" }}
          iconStyle={{ background: "#4CCEB9", color: "#fff" }} // Customize the icon background color
          date={""}
          icon={<LogoutIcon />}
          visible={true}
        >
          <h3 className="vertical-timeline-element-title">Leave date</h3>
          <h5 className="vertical-timeline-element-title">
            {chosenEmployee.name
              ? chosenEmployee.exitDate
                ? chosenEmployee.exitDate
                : "Employee hasn't left the company"
              : "Choose an employee"}
          </h5>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </Box>
  );
};
export default Timeline;
