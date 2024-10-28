import { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/system";
import Cookies from "js-cookie";
import { getPet } from '../../services/apiPetService';
import { useParams } from 'react-router-dom';

// const ApplyForm = ({petId, petName }) => {
const ApplyForm = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const userCredentials = JSON.parse(Cookies.get("user") || "{}");
  userCredentials.userId = "034fe29a-d1cc-4856-97df-0f6d9afe03da";
  // console.log('los datos: ', userCredentials)

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const data = await getPet(id);
        setPet(data);              
      } catch (err) {
        setError('Error al cargar los datos de la mascota');
      } finally {
        setLoading(false);
      }
    };

    fetchPetData();
  }, [id]);

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const [formData, setFormData] = useState({
    age: "",
    address: "",
    province: "",
    locality: "",
    phoneNumber: "",
    message: "",
  });

  const validateForm = () => {
    const fieldsToValidate = {...formData, ...userCredentials, ...pet};

    const allFieldsFilled = Object.values(fieldsToValidate).every(field => field);

    if (!allFieldsFilled) {  
      setFeedback({ message: "Todos los campos son necesarios", type: "error" });
      return false;
    }

    return true;
  };

  // Clase de MUI para inputs
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

  // Metodo de completado de los campos
  const handleChange = (event) => {
    const { id, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Metodo del boton enviar solicitud
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    // Asignar userId a userCredentials
    userCredentials.userId = "034fe29a-d1cc-4856-97df-0f6d9afe03da";

    try {
      const userId = userCredentials.userId; // Obtener userId modificado

      // formData para user
      const userFormData = new FormData();
      Object.entries(userCredentials).forEach(([key, value]) => {
        userFormData.append(key, value);
      });
      Object.entries(formData).forEach( ([key, value]) => {
        if(key !== "message") {
          userFormData.append(key, value);
        }
      });
      console.log("userFormData:", userFormData);

      // Obtén el id del usuario de userCredentials
      //const userId = userCredentials.userId;

      // userFormData al endpoint de update
      const userResponse = await fetch(`http://localhost:3000/api/user/users/${userId}`, {
        method: "PUT",
        body: userFormData,
        credentials: "include",
        userCredentials: userCredentials,
      })

      if (!userResponse.ok) {
        throw new Error("Error al enviar la solicitud update");
      }

      setFeedback({ message: "Solicitud update enviada exitosamente", type: "success" });

      // formData para Apply
      const applyFormData = new FormData();
      applyFormData.append("userId", userCredentials.id);
      applyFormData.append("petId", id);
      applyFormData.append("message", formData.message);
      console.log("applyFormData:", applyFormData);

      // applyFormData al endpoint de create form
      const applyResponse = await fetch("http://localhost:3000/api/application-form/create", {
        method: "POST",
        body: applyFormData,
        credentials: "include",
        userCredentials: userCredentials,
      });

      if (!applyResponse.ok) {
        const errorData = await applyResponse.json();
        throw new Error(errorData.message || "Error al enviar la solicitud de adopción");
      }

      // Notificación de éxito
      setFeedback({ message: "Formulario enviado exitosamente", type: "success" });

      // Limpiar el formulario
      setFormData({
        age: "",
        address: "",
        province: "",
        locality: "",
        phoneNumber: "",
        message: "",
      });

    } catch (error) {
      setFeedback({ message: error.message || "Formulario fallido", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 style={{textAlign: 'center', marginBottom: 20}}>Formulario de solicitud de adopción</h1>
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
          // auto
          disabled
          id="petName"
          label="Nombre de la mascota"
          value={`"${pet?.data?.name || ""}"`}
          onChange={handleChange}
        />
        <TextField
          disabled
          id="userName"
          label="Nombre Completo"
          value={userCredentials.name || ""}
          onChange={handleChange}
        />
        <TextField
          id="age"
          label="Edad"
          type="number"
          value={formData.age}
          onChange={handleChange}
          InputProps={{
            sx: {
              width: "80px",
              "& input": {
                padding: 2, // Ajusta el padding para que se vea mejor con el ancho reducido
              },
            },
          }}
        />
        <TextField
          id="address"
          label="Dirección"
          multiline
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          id="province"
          label="Provincia"
          multiline
          value={formData.province}
          onChange={handleChange}
        />
        <TextField
          id="locality"
          label="Localidad"
          multiline
          value={formData.locality}
          onChange={handleChange}
        />
        <TextField
          id="phoneNumber"
          label="Teléfono"
          multiline
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <TextField
          id="message"
          label="¿Qué buscas en una mascota?"
          multiline
          value={formData.message}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" disabled={loading}>
          Enviar Solicitud
        </Button>
        {feedback.message && (
          <Alert severity={feedback.type}>{feedback.message}</Alert>
        )}
      </Box>
    </>
  );
};

export default ApplyForm;