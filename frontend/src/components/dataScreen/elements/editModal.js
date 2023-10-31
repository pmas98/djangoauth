import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Checkbox,
} from "@mui/material";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Cookies from "js-cookie";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const EditFormModal = ({ open, onClose, initialValues, isEmployee }) => {
  const employeeValidationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    birthday: Yup.date().required("Birthday is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    department: Yup.string().required("Department is required"),
    admissionDate: Yup.date(),
    exitDate: Yup.date(),
    vacanciesDate: Yup.date(),
    isAdmin: Yup.boolean(), // Define a boolean validation for the Checkbox
  });

  const companyValidationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    cnpj: Yup.string().required("CNPJ is required"),
    address: Yup.string().required("Address is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    sector: Yup.string().required("Sector is required"),
  });

  const [reloadData, setReloadData] = useState(false);
  const validationSchema = isEmployee
    ? employeeValidationSchema
    : companyValidationSchema;

  const isNonMobile = useMediaQuery("(min-width:600px)");

  function formatDate(date) {
    if (date) {
      const formattedDate = new Date(date);
      return formattedDate.toISOString().split("T")[0]; // Format as "YYYY-MM-DD"
    }
    return null; // Handle null values appropriately
  }

  const handleFormSubmit = (values) => {
    console.log(values);
    const csrfToken = Cookies.get("csrftoken");

    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    };

    isEmployee
      ? fetch(`api/updateEmployee/${values.id}/`, {
          method: "PUT",
          headers: headers,
          body: JSON.stringify({
            name: values.name,
            department: values.department,
            email: values.email,
            birthday: formatDate(values.birthday),
            admissionDate: formatDate(values.admissionDate),
            exitDate: formatDate(values.exitDate),
            vacanciesDate: formatDate(values.vacanciesDate),
          }),
        })
          .then((response) => {
            NotificationManager.success(
              "Employee updated sucessfully",
              "Sucess"
            );
            setReloadData(!reloadData);
          })
          .catch((error) => {
            console.log(error);
          })
      : fetch(`api/updateCompany/${values.id}/`, {
          method: "PUT",
          headers: headers,
          body: JSON.stringify({
            name: values.name,
            cnpj: values.cnpj,
            email: values.email,
            address: values.address,
            sector: values.sector,
          }),
        })
          .then((response) => {
            NotificationManager.success(
              "Company updated sucessfully",
              "Sucess"
            );
            setReloadData(!reloadData);
          })
          .catch((error) => {
            console.log(error);
          });

    onClose();
  };

  const handleDelete = (values) => {
    const csrfToken = Cookies.get("csrftoken");

    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    };

    isEmployee
      ? fetch(`api/deleteEmployee/${values.id}/`, {
          method: "DELETE",
          headers: headers,
        })
          .then((response) => {
            NotificationManager.success(
              "Employee deleted sucessfully",
              "Sucess"
            );
            setReloadData(!reloadData);
          })
          .catch((error) => {
            console.log(error);
          })
      : fetch(`api/deleteCompany/${values.id}/`, {
          method: "DELETE",
          headers: headers,
        })
          .then((response) => {
            NotificationManager.success(
              "Company deleted sucessfully",
              "Sucess"
            );
            setReloadData(!reloadData);
          })
          .catch((error) => {
            console.log(error);
          });

    onClose();
  };

  useEffect(() => {
    console.log(initialValues);
  }, [reloadData]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Data</DialogTitle>
      <DialogContent>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form>
              {values.isEmployee ? (
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr)"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Department"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.department}
                    name="department"
                    error={!!touched.department && !!errors.department}
                    helperText={touched.department && errors.department}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="date"
                    label="Admission date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.admissionDate}
                    name="admissionDate"
                    error={!!touched.admissionDate && !!errors.admissionDate}
                    helperText={touched.admissionDate && errors.admissionDate}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="date"
                    label="Vacancies date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.vacanciesDate}
                    name="vacanciesDate"
                    error={!!touched.vacanciesDate && !!errors.vacanciesDate}
                    helperText={touched.vacanciesDate && errors.vacanciesDate}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="date"
                    label="Exit date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.exitDate}
                    name="exitDate"
                    error={!!touched.exitDate && !!errors.exitDate}
                    helperText={touched.exitDate && errors.exitDate}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <Box display="flex" justifyContent="space-between">
                    <Box
                      sx={{
                        gridColumn: "span 2",
                        display: "flex",
                        alignItems: "center",
                        paddingRight: ".5rem",
                      }}
                    >
                      <Button
                        type="button"
                        color="error"
                        variant="contained"
                        onClick={() => handleDelete(values)} // Pass values as an argument
                      >
                        Remove Employee
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        gridColumn: "span 2",
                        display: "flex",
                        alignItems: "center",
                        paddingRight: ".5rem",
                      }}
                    >
                      <Button
                        type="button"
                        color="secondary"
                        variant="contained"
                        onClick={handleSubmit}
                      >
                        Edit Employee
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        gridColumn: "span 2",
                        display: "flex",
                        alignItems: "center",
                        paddingRight: ".5rem",
                      }}
                    >
                      <Button onClick={onClose}>Cancel</Button>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr)"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="CNPJ"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cnpj}
                    name="cnpj"
                    error={!!touched.cnpj && !!errors.cnpj}
                    helperText={touched.cnpj && errors.cnpj}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    name="address"
                    error={!!touched.address && !!errors.address}
                    helperText={touched.address && errors.address}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="sector"
                    label="Sector"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.sector}
                    name="sector"
                    error={!!touched.sector && !!errors.sector}
                    helperText={touched.sector && errors.sector}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Box
                      sx={{
                        gridColumn: "span 2",
                        display: "flex",
                        alignItems: "center",
                        paddingRight: ".5rem",
                      }}
                    >
                      <Button
                        type="button"
                        color="error"
                        variant="contained"
                        onClick={() => handleDelete(values)}
                      >
                        Remove Company
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        gridColumn: "span 2",
                        display: "flex",
                        alignItems: "center",
                        paddingRight: ".5rem",
                      }}
                    >
                      <Button
                        type="button"
                        color="secondary"
                        variant="contained"
                        onClick={handleSubmit}
                      >
                        Edit Company
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        gridColumn: "span 2",
                        display: "flex",
                        alignItems: "center",
                        paddingRight: ".5rem",
                      }}
                    >
                      <Button onClick={onClose}>Cancel</Button>
                    </Box>
                  </Box>
                </Box>
              )}
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditFormModal;
