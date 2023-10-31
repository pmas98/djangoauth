import React from "react";
import { Box, Button, TextField, Checkbox } from "@mui/material"; // Import Checkbox
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../globalComponents/header";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const CompanyForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    const csrfToken = Cookies.get("csrftoken");

    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    };

    fetch("api/createCompany", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        name: values.name,
        cnpj: values.cnpj,
        email: values.email,
        address: values.address,
        sector: values.sector,
        logo: null,
      }),
    })
      .then((response) => {
        NotificationManager.success("Company added sucessfully", "Sucess");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box m="20px">
      <Header title="ADD COMPANY" subtitle="Add a New Company" />

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
                type="number"
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
                type="text"
                label="Sector"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sector}
                name="sector"
                error={!!touched.sector && !!errors.sector}
                helperText={touched.sector && errors.sector}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 8" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="button"
                color="secondary"
                variant="contained"
                onClick={handleSubmit}
              >
                Add New Company
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
  cnpj: yup.string().required("The CNPJ must be a valid number"),
  email: yup.string().email("invalid email").required("required"),
  sector: yup.string().required("required"),
  address: yup.string().required("required"),
});

const initialValues = {
  name: "",
  cnpj: "",
  email: "",
  sector: "",
  address: "",
};

export default CompanyForm;
