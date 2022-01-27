import { LinearProgress, Box, Typography } from "@mui/material";

export function ProgressBar(props) {
  return (
    <Box
      display="block"
      justifyContent="center"
      alignItems="center"
      minHeight="0"
      sx={{ display: "flex", alignItems: "center", padding: "10px 0 0 10px" }}
    >
      <Box sx={{ width: "90%", mr: 3 }}>
        <LinearProgress
          variant="determinate"
          sx={{ height: "0.5rem", borderRadius: "10px" }}
          {...props}
        />
      </Box>
      <Box>
        <Typography
          variant="body1"
          sx={{ color: "#2D2627", fontWeight: "bold", fontSize: "1rem" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default ProgressBar;
