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
        onChange={e => {
          e.preventDefault();
        }}
      >
        {title}
      </NextButton>
    </Link>
  );
}

const PageBtn = styled(Button)`
  display: flex;
`;
export function PageButton({ title, disabled }) {
  return (
    <PageBtn variant="outlined" disabled={disabled}>
      {title}
    </PageBtn>
  );
}

export default NextBtn;
