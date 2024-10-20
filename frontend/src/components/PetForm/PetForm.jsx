import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { UploadWidget } from "../UploadWidget/UploadWidget";
import { Select, MenuItem, Checkbox, FormControlLabel } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";

export const PetForm = () => {
  const [petName, setPetName] = React.useState("");
  const [petAge, setPetAge] = React.useState("");
  const [petType, setPetType] = React.useState("");
  const [petShelterId, setPetShelterId] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [gender, setGender] = React.useState(""); // PetGender
  const [status, setStatus] = React.useState(false); // Boolean for adoption status
  const [petFiles, setPetFiles] = React.useState([]);
  const [feedback, setFeedback] = React.useState({ message: "", type: "" });
  const [loading, setLoading] = React.useState(false);

  const validateForm = () => {
    if (!petName || !petType || !petAge || !description) {
      setFeedback({ message: "All fields are required", type: "error" });
      return false;
    }
    if (isNaN(petAge)) {
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

  const handleFileChange = (event) => {
    setPetFiles(Array.from(event.target.files));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("name", petName);
    formData.append("age", petAge);
    formData.append("type", petType);
    formData.append("shelterId", petShelterId);
    formData.append("description", description);
    formData.append("gender", gender);
    formData.append("status", status);

    if (petFiles.length > 0) {
      formData.append("picture", petFiles[0]); // Single picture upload
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/pet/create-pet",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status >= 200 && response.status < 300) {
        setFeedback({ message: "Pet created successfully", type: "success" });
        setPetName("");
        setPetAge("");
        setPetType("");
        setPetShelterId("");
        setDescription("");
        setGender("");
        setStatus(false);
        setPetFiles([]);
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
        id="pet-name"
        label="Name"
        value={petName}
        onChange={(e) => setPetName(e.target.value)}
      />
      <TextField
        id="pet-age"
        label="Age"
        value={petAge}
        onChange={(e) => setPetAge(e.target.value)}
      />
      <TextField
        id="pet-type"
        label="Type"
        value={petType}
        onChange={(e) => setPetType(e.target.value)}
      />
      <TextField
        id="shelter-id"
        label="Shelter ID"
        value={petShelterId}
        onChange={(e) => setPetShelterId(e.target.value)}
      />
      <TextField
        id="description"
        label="Description"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select Gender
        </MenuItem>
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
      </Select>
      <FormControlLabel
        control={
          <Checkbox
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
        }
        label="Available for Adoption"
      />
      <UploadWidget />
      <Button type="submit" variant="contained" disabled={loading}>
        Create Pet
      </Button>
      {feedback.message && (
        <Alert severity={feedback.type}>{feedback.message}</Alert>
      )}
    </Box>
  );
};
