import * as React from "react";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Cookies from "js-cookie";
import { Select, MenuItem, Checkbox, FormControlLabel } from "@mui/material";

export const PetForm = () => {
  const userCredentials = Cookies.get("user");
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
        credentials: "include",
        userCredentials: userCredentials,
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={2}>
      <TextField
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <Grid xs={4}>
        <TextField
          name="age"
          label="Age"
          type="number"
          value={formData.age}
          onChange={handleChange}
        />
      </Grid>
      <Grid xs={4}>
        <TextField
          name="type"
          label="Type (PERRO o GATO)"
          value={formData.type}
          onChange={handleChange}
        />
      </Grid>
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

      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        onClick={handleSubmit}
      >
        Create Pet
      </Button>
      {feedback.message && (
        <Alert severity={feedback.type}>{feedback.message}</Alert>
      )}
    </Grid>
  );
};
