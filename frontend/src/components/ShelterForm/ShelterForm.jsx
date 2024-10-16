import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export const ShelterForm = () => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        width: "80%",
        bgcolor: "#fec3a6",
      }}
    >
      <TextField
        id="outlined-basic"
        label="Shelter Name"
        variant="outlined"
        sx={{
          width: "50%",
          marginBottom: "20px",
        }}
      />
      <TextField
        id="outlined-basic"
        label="Shelter Address"
        variant="outlined"
        sx={{
          width: "50%",
          marginBottom: "20px",
        }}
      />
      <TextField
        id="outlined-basic"
        label="Shelter Phone Number"
        variant="outlined"
        sx={{
          width: "50%",
          marginBottom: "20px",
        }}
      />
      <TextField
        id="outlined-basic"
        label="Shelter Email"
        variant="outlined"
        sx={{
          width: "50%",
          marginBottom: "20px",
        }}
      />
    </Box>
  );
};
