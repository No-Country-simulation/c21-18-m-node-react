import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { UploadWidget } from "../../components/UploadWidget/UploadWidget";
import { Select, MenuItem, Checkbox, FormControlLabel } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";

export const PetForm = ({petId, petName }) => {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState();
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const validateForm = () => {
    if (!name || !age || !address || !city) {
      setFeedback({ message: "All fields are required", type: "error" });
      return false;
    }
    if (isNaN(age)) {
      setFeedback({ message: "Age must be a number", type: "error" });
      return false;
    }
    return true;
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  // const handleFileChange = (event) => {
  //   setPetFiles(Array.from(event.target.files));
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("petId", petId);
    formData.append("petName", petName);
    formData.append("name", name);
    formData.append("age", age);
    formData.append("address", address);
    formData.append("city", city);

    if (petFiles.length > 0) {
      formData.append("picture", petFiles[0]);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/pet/create-pet",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status >= 200 && response.status < 300) {
        setFeedback({ message: "Apply created successfully", type: "success" });
        setName("");
        setAge();
        setAddress("");
        setCity("");
        setPetId(false);
      } else {
        setFeedback({
          message: "An error occurred. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      setFeedback({
        message: "An error occurred. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
        width: "100%",
        bgcolor: "#cdeac0",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="petId"
        label="Pet id"
        value={petId}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="petName"
        label="Pet name"
        value={petName}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="name"
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="age"
        label="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <TextField
        id="address"
        label="Address"
        multiline
        value={address}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        id="city"
        label="City"
        multiline
        value={city}
        onChange={(e) => setDescription(e.target.value)}
      />
      <UploadWidget />
      <Button type="submit" variant="contained" disabled={loading}>
        Apply
      </Button>
      {feedback.message && (
        <Alert severity={feedback.type}>{feedback.message}</Alert>
      )}
    </Box>
  );
};
