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
  const [loading, setLoading] = React.useState(false);

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

    const phoneRegex = /^\d{10}$/; // Adjust this regex according to your needs
    if (!phoneRegex.test(shelterPhoneNumber)) {
      setFeedback({ message: "Phone number must be 10 digits", type: "error" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/shelter/create-shelter",
        {
          name: shelterName,
          address: shelterAddress,
          phone: shelterPhoneNumber,
          email: shelterEmail,
        },
        { withCredentials: true }
      );

      if (response.status >= 200 && response.status < 300) {
        setFeedback({
          message: "Shelter created successfully",
          type: "success",
        });
        // Reset form fields
        setShelterName("");
        setShelterAddress("");
        setShelterPhoneNumber("");
        setShelterEmail("");
      } else {
        setFeedback({ message: "Failed to create shelter", type: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
      setFeedback({
        message: error.response?.data?.message || "Network error",
        type: "error",
      });
    } finally {
      setLoading(false);
      // Clear feedback after a timeout
      setTimeout(() => {
        setFeedback({ message: "", type: "" });
      }, 3000);
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
        width: "100%",
        bgcolor: "#cdeac0",
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

      <Button
        type="submit"
        variant="contained"
        color="#cdeac0"
        sx={{ width: "50%" }}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Box>
  );
};
