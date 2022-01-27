import React from "react";
import { useHistory } from "react-router-dom";
import { IconButton, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

export function HeaderComponent({ title }) {
  const history = useHistory();

  const handleGoHome = () => {
    sessionStorage.clear();
    history.push("/");
  };

  return (
    <>
      <header>
        <Box sx={{ float: "right", paddingRight: "20px" }}>
          <IconButton
            color="primary"
            aria-label="go-home"
            onClick={handleGoHome}
          >
            <HomeIcon />
          </IconButton>
        </Box>
      </header>
    </>
  );
}

export default HeaderComponent;
