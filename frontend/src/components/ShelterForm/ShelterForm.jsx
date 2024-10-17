import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import axios from "axios";

export const ShelterForm = () => {
  const [shelterName, setShelterName] = React.useState("");
  const [shelterAddress, setShelterAddress] = React.useState("");
  const [shelterPhoneNumber, setShelterPhoneNumber] = React.useState("");
  const [shelterEmail, setShelterEmail] = React.useState("");
  const [feedback, setFeedback] = React.useState({ message: "", type: "" });

  const validateForm = () => {
    if (
      !shelterName ||
      !shelterAddress ||
      !shelterPhoneNumber ||
      !shelterEmail
    ) {
      setFeedback({ message: "All fields are required", type: "error" });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shelterEmail)) {
      setFeedback({ message: "Invalid email format", type: "error" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    console.log("Form submitted");
    console.log(shelterName, shelterAddress, shelterPhoneNumber, shelterEmail);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/shelter/create-shelter",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({
            name: shelterName,
            address: shelterAddress,
            phone: shelterPhoneNumber,
            email: shelterEmail,
          }),
        }
      );
      console.log(response);

      if (response.ok) {
        setFeedback({
          message: "Shelter created successfully",
          type: "success",
        });
        setShelterName("");
        setShelterAddress("");
        setShelterPhoneNumber("");
        setShelterEmail("");
      } else {
        setFeedback({ message: "Failed to create shelter", type: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
      setFeedback({ message: "Network error", type: "error" });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
      {feedback.message && (
        <Alert severity={feedback.type} sx={{ marginBottom: 2, width: "50%" }}>
          {feedback.message}
        </Alert>
      )}

      <TextField
        label="Shelter Name"
        variant="outlined"
        value={shelterName}
        onChange={(e) => setShelterName(e.target.value)}
        sx={{ width: "50%", marginBottom: "20px" }}
      />
      <TextField
        label="Shelter Address"
        variant="outlined"
        value={shelterAddress}
        onChange={(e) => setShelterAddress(e.target.value)}
        sx={{ width: "50%", marginBottom: "20px" }}
      />
      <TextField
        label="Shelter Phone Number"
        variant="outlined"
        value={shelterPhoneNumber}
        onChange={(e) => setShelterPhoneNumber(e.target.value)}
        sx={{ width: "50%", marginBottom: "20px" }}
      />
      <TextField
        label="Shelter Email"
        variant="outlined"
        value={shelterEmail}
        onChange={(e) => setShelterEmail(e.target.value)}
        sx={{ width: "50%", marginBottom: "20px" }}
      />
      <Button type="submit" variant="contained" sx={{ width: "50%" }}>
        Submit
      </Button>
    </Box>
  );
};
