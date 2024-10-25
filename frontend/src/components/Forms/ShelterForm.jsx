import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import * as API from "../../services/apiShelterService";

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
      setFeedback({
        message: "Todos los campos son requeridos",
        type: "error",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shelterEmail)) {
      setFeedback({ message: "Formato de email incorrecto", type: "error" });
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

    try {
      setLoading(true);
      const response = await API.createShelter(
        shelterName,
        shelterAddress,
        shelterPhoneNumber,
        shelterEmail
      );

      if (response && response.status === "success") {
        setFeedback({
          message: "El refugio se ha creado correctamente",
          type: "success",
        });
        // Resetear campos
        setShelterName("");
        setShelterAddress("");
        setShelterPhoneNumber("");
        setShelterEmail("");
      } else {
        throw new Error(response.message || "Error al crear el refugio");
      }
    } catch (error) {
      setFeedback({ message: error.message, type: "error" });
    } finally {
      setLoading(false);
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
        label="Nombre del Refugio"
        variant="outlined"
        value={shelterName}
        onChange={(e) => setShelterName(e.target.value)}
        sx={{ width: "50%", marginBottom: "20px" }}
      />
      <TextField
        label="Dirección"
        variant="outlined"
        value={shelterAddress}
        onChange={(e) => setShelterAddress(e.target.value)}
        sx={{ width: "50%", marginBottom: "20px" }}
      />
      <TextField
        label="Numero de Telefono"
        variant="outlined"
        value={shelterPhoneNumber}
        onChange={(e) => setShelterPhoneNumber(e.target.value)}
        sx={{ width: "50%", marginBottom: "20px" }}
      />
      <TextField
        label="Email"
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
        {loading ? "Enviando..." : "Enviado "}
      </Button>
    </Box>
  );
};
