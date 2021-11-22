import { IconButton, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import MainTitle from "../style_components/CustomTitles";
export function HeaderCompo({ title }) {
  const history = useHistory();

  const handleGoHome = () => {
    history.push("/");
  };

  return (
    <>
      <Box sx={{ float: "right", paddingRight: "20px" }}>
        <IconButton color="primary" aria-label="go-home" onClick={handleGoHome}>
          <HomeIcon />
        </IconButton>
      </Box>
    </>
  );
}

export default HeaderCompo;
