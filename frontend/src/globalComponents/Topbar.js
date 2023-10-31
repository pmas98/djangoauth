import React from "react";
import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "./theme";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import "/static/css/button.css";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const handleLogout = () => {
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

  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      {/* ICONS */}
      <Box
        display="flex"
        className="logout-wrapper"
        justifyContent={"center"}
        alignItems={"center"}
        padding="0 .5rem"
        marginRight="2.4rem" 
        onClick={handleLogout}
      >
        <p style={{ marginRight: ".5rem" }}>Logout</p>
        <LogoutIcon />
      </Box>
    </Box>
  );
};

export default Topbar;
//        sx={{ m: "5px 5px 5px 0" }}
