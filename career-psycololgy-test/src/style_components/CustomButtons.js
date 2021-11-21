import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const NextButton = styled(Button)`
  display: flex;
  margin: 0 auto;
  border-radius: 30px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  background-color: #378b29;
  width: 200px;
  height: 50px;
  border: none;
  box-shadow: 5px 2px 2px #ededed;
`;
export function NextBtn({ toPath, title, isActive }) {
  return (
    <Link to={toPath} style={{ textDecoration: "none" }}>
      <NextButton
        variant="contained"
        type="submit"
        size="large"
        disabled={isActive}
      >
        {title}
      </NextButton>
    </Link>
  );
}

export function PageBtn({ path, title }) {
  return (
    <Link to={path} style={{ textDecoration: "none" }}>
      <Button variant="contained" type="submit" size="large">
        {title}
      </Button>
    </Link>
  );
}

export default NextBtn;
