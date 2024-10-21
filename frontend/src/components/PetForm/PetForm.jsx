import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { Select, MenuItem, Checkbox, FormControlLabel } from "@mui/material";

export const PetForm = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    size: "",
    age: "",
    type: "",
    shelterId: "",
    description: "",
    gender: "",
    status: false,
    picture: null,
  });
  const [feedback, setFeedback] = React.useState({ message: "", type: "" });
  const [loading, setLoading] = React.useState(false);

  const validateForm = () => {
    const { name, age, type, shelterId, description } = formData;
    if (!name || !type || !age || !shelterId || !description) {
      setFeedback({ message: "All fields are required", type: "error" });
      return false;
    }
    if (isNaN(age)) {
      setFeedback({ message: "Age must be a number", type: "error" });
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch("http://localhost:3000/api/pet/create-pet", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setFeedback({
          message: "Pet created successfully",
          type: "success",
        });
        setFormData({
          name: "",
          size: "",
          age: "",
          type: "",
          shelterId: "",
          description: "",
          gender: "",
          status: false,
          picture: null,
        });
      } else {
        const errorData = await response.json();
        setFeedback({
          message: errorData.message || "Failed to create pet",
          type: "error",
        });
      }
    } catch (error) {
      setFeedback({ message: "Failed to create pet", type: "error" });
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
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        name="age"
        label="Age"
        type="number"
        value={formData.age}
        onChange={handleChange}
      />
      <TextField
        name="type"
        label="Type (PERRO o GATO)"
        value={formData.type}
        onChange={handleChange}
      />
      <TextField
        name="shelterId"
        label="Shelter ID"
        type="number"
        value={formData.shelterId}
        onChange={handleChange}
      />
      <TextField
        name="description"
        label="Description"
        multiline
        rows={4}
        value={formData.description}
        onChange={handleChange}
      />
      <Select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select Gender
        </MenuItem>
        <MenuItem value="MACHO">MACHO</MenuItem>
        <MenuItem value="HEMBRA">HEMBRA</MenuItem>
      </Select>
      <Select
        name="size"
        value={formData.size}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select Size
        </MenuItem>
        <MenuItem value="CHICO">Chico</MenuItem>
        <MenuItem value="MEDIANO">Mediano</MenuItem>
        <MenuItem value="GRANDE">Grande</MenuItem>
      </Select>

      <FormControlLabel
        control={
          <Checkbox
            name="status"
            checked={formData.status}
            onChange={handleChange}
          />
        }
        label="Available for Adoption"
      />
      <TextField name="picture" type="file" onChange={handleChange} />

      <Button type="submit" variant="contained" disabled={loading}>
        Create Pet
      </Button>
      {feedback.message && (
        <Alert severity={feedback.type}>{feedback.message}</Alert>
      )}
    </Box>
  );
};
