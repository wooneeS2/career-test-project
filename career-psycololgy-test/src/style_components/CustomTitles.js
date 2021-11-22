import { Typography, Box } from "@mui/material";

export function MainTitle({ title }) {
  return (
    <Box sx={{ paddingLeft: "20px" }}>
      <Typography
        variant="body1"
        sx={{ color: "#2D2627", fontWeight: "bold", fontSize: "2rem" }}
      >
        {title}
      </Typography>
    </Box>
  );
}

export default MainTitle;
