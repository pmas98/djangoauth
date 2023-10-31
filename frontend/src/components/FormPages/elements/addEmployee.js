import React from "react";
import { Box, Button, TextField, Checkbox } from "@mui/material"; // Import Checkbox
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../globalComponents/header";
import Cookies from "js-cookie";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const EmployeeForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    const csrfToken = Cookies.get("csrftoken");

    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    };
    fetch("api/createEmployee", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        name: values.name,
        department: values.department,
        email: values.email,
        birthday: values.birthday,
        admissionDate: values.admissionDate,
      }),
    })
      .then((response) => {
        NotificationManager.success("Employee added sucessfully", "Sucess");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box m="20px">
      <Header title="ADD EMPLOYEE" subtitle="Add a New Employee" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
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
                label="Birthday"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.birthday}
                name="birthday"
                error={!!touched.birthday && !!errors.birthday}
                helperText={touched.birthday && errors.birthday}
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

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="button"
                color="secondary"
                variant="contained"
                onClick={handleSubmit}
              >
                Add New Employee
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  department: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  birthday: yup.date().required("required"),
  admissionDate: yup.date().required("required"),
  isAdmin: yup.boolean().required("required"),
});

const initialValues = {
  name: "",
  department: "",
  email: "",
  birthday: new Date(),
  admissionDate: new Date(),
  isAdmin: false,
};

export default EmployeeForm;
