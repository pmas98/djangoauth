import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Grid, Switch } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../globalComponents/theme";
import Header from "../../../globalComponents/header";
import Cookies from "js-cookie";
import EditFormModal from "./editModal";
import "/static/css/button.css";
import useMediaQuery from "@mui/material/useMediaQuery";

const DataTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [sessionData, setSessionData] = useState({});
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("md"));

  const handleEditClick = (rowData) => {
    setSelectedData({
      ...rowData,
      isEmployee,
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (values) => {
    setIsModalOpen(false);
  };

  const fetchSessionData = async () => {
    const csrfToken = Cookies.get("csrftoken");
    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    };

    fetch("api/sessionData", {
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
        console.log(data);
        setSessionData(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const fetchData = async (isEmployee) => {
    const csrfToken = Cookies.get("csrftoken");
    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    };

    const apiEndpoint = isEmployee
      ? "api/getAllEmployees"
      : "api/getAllCompanies";

    fetch(apiEndpoint, {
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
        setData(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  useEffect(() => {
    fetchData(isEmployee);
    fetchSessionData();
  }, [isEmployee, isModalOpen]);

  const employeeColumns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "department",
      headerName: "Department",
      flex: 2,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
    },
    {
      field: "birthday",
      headerName: "Birthday",
      flex: 2,
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 1,
      minWidth: 80,
      renderCell: (params) =>
        sessionData.is_staff ? (
          <button
            className="custom-button"
            onClick={() => handleEditClick(params.row, isEmployee)}
          >
            Edit
          </button>
        ) : (
          <button className="custom-button" onClick={() => {}}>
            Admin only
          </button>
        ),
    },
  ];

  const employeeColumnsSmall = [
    { field: "id", headerName: "ID", flex:1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "department",
      headerName: "Department",
      flex: 2,
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 1,
      minWidth: 80,
      renderCell: (params) =>
        sessionData.is_staff ? (
          <button
            className="custom-button"
            onClick={() => handleEditClick(params.row, isEmployee)}
          >
            Edit
          </button>
        ) : (
          <button className="custom-button" onClick={() => {}}>
            Admin only
          </button>
        ),
    },
  ];

  const companyColumns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "cnpj",
      headerName: "CNPJ",
      flex: 2,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 2,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
    },
    {
      field: "sector",
      headerName: "Sector",
      flex: 2,
    },
    {
      field: "edit",
      headerName: "Editar",
      flex: 1,
      minWidth: 80,
      renderCell: (params) =>
        sessionData.is_staff ? (
          <button
            className="custom-button"
            onClick={() => handleEditClick(params.row, isEmployee)}
          >
            Edit
          </button>
        ) : (
          <button className="custom-button" onClick={() => {}}>
            Admin only
          </button>
        ),
    },
  ];


  const companyColumnsSmall = [
    { field: "id", headerName: "ID", width: 84 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "cnpj",
      headerName: "CNPJ",
      flex: 2,
    },
    {
      field: "edit",
      headerName: "Editar",
      flex: 1,
      minWidth: 80,
      renderCell: (params) =>
        sessionData.is_staff ? (
          <button
            className="custom-button"
            onClick={() => handleEditClick(params.row, isEmployee)}
          >
            Edit
          </button>
        ) : (
          <button className="custom-button" onClick={() => {}}>
            Admin only
          </button>
        ),
    },
  ];

  return (
    <Box m="20px">
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header
          title={isEmployee ? "EMPLOYEE VIEW" : "COMPANY VIEW"}
          subtitle="List of data"
        />
        <Box
          onClick={() => {
            setIsEmployee(!isEmployee);
          }}
          className="form-wrapper"
          style={{ cursor: "pointer", fontSize: "1.2rem", marginRight: "2.1rem" }}
        >
          {isEmployee ? "See Companies" : "See Employees"}
        </Box>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <div style={{ width: "98%" }}>
          <DataGrid
            virtualization
            checkboxSelection
            rows={data}
            columns={isScreenSmall ? (isEmployee ? employeeColumnsSmall : companyColumnsSmall) : (isEmployee ? employeeColumns : companyColumns)}

          />
        </div>
        <EditFormModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialValues={{
            id: selectedData?.id || "",
            name: selectedData?.name || "",
            birthday: selectedData?.birthday || "",
            email: selectedData?.email || "",
            cnpj: selectedData?.cnpj || "",
            address: selectedData?.address || "",
            sector: selectedData?.sector || "",
            department: selectedData?.department || "",
            admissionDate: selectedData?.admissionDate || "",
            exitDate: selectedData?.exitDate || "",
            vacanciesDate: selectedData?.vacanciesDate || "",
            isAdmin: selectedData?.isAdmin || false,
            isEmployee: selectedData?.isEmployee,
          }}
          isEmployee={selectedData?.isEmployee}
          onSubmit={handleFormSubmit} // Pass the onSubmit function
        />
      </Box>
    </Box>
  );
};

export default DataTable;
