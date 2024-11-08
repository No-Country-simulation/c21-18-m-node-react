import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
// import { styled } from "@mui/system";
import Cookies from "js-cookie";
import { getPet } from "../../services/apiPetService";
import { useParams } from "react-router-dom";
import "./ApplyForm.css";
import { getUsersByEmail } from "../../services/apiUserServices";
const  URL = import.meta.env.VITE_BACKEND_URL

const ApplyForm = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [userDB, setUserDB] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    age: "",
    address: "",
    provincia: "",
    localidad: "",
    phone: "",
    message: "",
  });

  let userCredentials = Cookies.get("user") || "{}";
  let userCredentialsObj = JSON.parse(userCredentials);
  let userEmail = userCredentialsObj.email;

  // datos de la mascota y user by email
  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const data = await getPet(id);
        setPet(data);
        const userDataDB = await getUsersByEmail(userEmail);
        setUserDB(userDataDB.data.id);
      } catch (err) {
        setError(`Error al cargar los datos de la mascota:${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPetData();
  }, [id, userEmail]);

  console.log("USERDB: ", userDB);

  const validateForm = () => {
    const fieldsToValidate = { ...formData, ...userCredentials, ...pet };

    const allFieldsFilled = Object.values(fieldsToValidate).every(
      (field) => field
    );

    if (!allFieldsFilled) {
      setFeedback({
        message: "Todos los campos son necesarios",
        type: "error",
      });
      return false;
    }

    return true;
  };

  // Clase de MUI para inputs
  // const VisuallyHiddenInput = styled("input")({
  //   clip: "rect(0 0 0 0)",
  //   clipPath: "inset(50%)",
  //   height: 1,
  //   overflow: "hidden",
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   whiteSpace: "nowrap",
  //   width: 1,
  // });

  // Metodo de completado de los campos
  const handleChange = (event) => {
    const { id, value } = event.target;

    // Verifica si el campo es "age" y permite solo números
    if (id === "age" && !/^\d*$/.test(value)) {
      return; // No actualiza el estado si el valor contiene caracteres no numéricos
    }

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

    try {
      // Data para user
      const userId = userDB;
      const data = {
        name: userCredentialsObj.name,
        email: userCredentialsObj.email,
        phone: formData.phone,
        picture: userCredentialsObj.picture,
        role: userCredentialsObj.role,
        address: formData.address,
        localidad: formData.localidad,
        provincia: formData.provincia,
      };

      console.log("USER DATA ===>", data);

      // userFormData al endpoint de update
      const userResponse = await fetch(
        `${URL}/api/user/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      if (!userResponse.ok) {
        throw new Error("Error al enviar la solicitud update");
      }

      setFeedback({
        message: "Solicitud update enviada exitosamente",
        type: "success",
      });

      // Crear objeto para enviar el formulario de adopción
      const applyFormData = {
        ...formData,
        userId: userId,
        name: userCredentialsObj.name,
        email: userCredentialsObj.email,
        petId: pet?.data?.id,
        message: formData.message,
      };

      console.log("Form apply", applyFormData);

      // applyFormData al endpoint de create form
      const applyResponse = await fetch(
        `${URL}/api/application-form/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(applyFormData),
          credentials: "include",
        }
      );

      if (!applyResponse.ok) {
        const errorData = await applyResponse.json();
        throw new Error(
          errorData.message || "Error al enviar la solicitud de adopción"
        );
      }

      // Notificación de éxito
      setFeedback({
        message: "Formulario enviado exitosamente",
        type: "success",
      });

      // Limpiar el formulario
      setFormData({
        age: "",
        address: "",
        provincia: "",
        localidad: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      setFeedback({
        message: error.message || "Formulario fallido",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container-form">
      <h1 style={{ textAlign: "center", marginBottom: 5 }}>
        Formulario de solicitud de adopción
      </h1>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "35ch" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          bgcolor: "#cdeac0",
          padding: 2,
          maxWidth: "100%", // Limita el ancho para que no se desborde
          margin: "auto", // Centra el formulario horizontalmente
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
          value={pet?.data?.name || ""}
          onChange={handleChange}
        />
        <TextField
          disabled
          id="name"
          label="Nombre Completo"
          value={userCredentialsObj.name || ""}
          onChange={handleChange}
        />
        <TextField
          id="age"
          label="Edad"
          type="text"
          value={formData.age}
          onChange={handleChange}
          inputProps={{
            inputMode: "numeric", // Muestra teclado numérico en móviles
            pattern: "[0-9]*", // Patrón que permite solo dígitos
          }}
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
          id="provincia"
          label="Provincia"
          multiline
          value={formData.provincia}
          onChange={handleChange}
        />
        <TextField
          id="localidad"
          label="Localidad"
          multiline
          value={formData.localidad}
          onChange={handleChange}
        />
        <TextField
          id="phone"
          label="Teléfono"
          multiline
          value={formData.phone}
          onChange={handleChange}
        />
        <TextField
          id="message"
          label="¿Qué buscas en una mascota?"
          multiline
          value={formData.message}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ margin: "10px", backgroundColor: "#ff928b", color: "#ffffff" }}
        >
          Enviar Solicitud
        </Button>
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}
        {feedback.message && (
          <Alert severity={feedback.type}>{feedback.message}</Alert>
        )}
      </Box>
    </div>
  );
};

export default ApplyForm;
