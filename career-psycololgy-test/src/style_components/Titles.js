import { Typography } from "@mui/material";

export function MainTitle({ title }) {
  return (
    <Typography
      variant="body1"
      sx={{ color: "#2D2627", fontWeight: "bold", fontSize: "2rem" }}
    >
      {title}
    </Typography>
  );
}

export default MainTitle;
