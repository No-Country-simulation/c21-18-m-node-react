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

  let userCredentials = Cookies.get("user") || "{}"
  let userCredentialsObj = JSON.parse(userCredentials);
  userCredentialsObj.userId = "034fe29a-d1cc-4856-97df-0f6d9afe03da";
  console.log (`Datos de usuario: ${JSON.stringify(userCredentialsObj)}`)

  // const  = {...user, userId: "034fe29a-d1cc-4856-97df-0f6d9afe03da"}
  // console.log(`cookie puro ${user} TIPO: ${typeof(user)}`)
  // console.log(`los datos: ${userCredentials} TIPO: ${typeof(userCredentials)} `)


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


    try {

      // formData para user
      const userFormData = new FormData();

      Object.entries(userCredentialsObj).forEach(([key, value]) => {
        userFormData.append(key, value);
      });

      Object.entries(formData).forEach( ([key, value]) => {
        userFormData.append(key, value);
      });

      // Agregar petId
      userFormData.append("petId", id);

      // userFormData al endpoint de update
      const userResponse = await fetch(`http://localhost:3000/api/user/users/${userCredentialsObj.userId}`, {
        method: "PUT",
        body: userFormData,
        credentials: "include",
        // userCredentials: userCredentials,
      })

      // Crear un objeto desde FormData 
      const formDataObject = {};
      userFormData.forEach((value, key) => {
        formDataObject[key] = value;
      });

      // Convertir el objeto a JSON (string)
      const formDataJSON = JSON.stringify(formDataObject);

      console.log('USER DATA ===>', formDataJSON);

      if (!userResponse.ok) {
        throw new Error("Error al enviar la solicitud update");
      }

      setFeedback({ message: "Solicitud update enviada exitosamente", type: "success" });

      /////////////////////////////////////////////////
      /////////////////////////////////////////////////
      
      // const applyFormData = {
      //   "userId": userCredentialsObj.userId,
      //   "petId": id,
      // }

      // Copiar userFormData a un objeto temporal y eliminar los atributos innecesarios
      const applyFormData = {};
      userFormData.forEach((value, key) => {
        applyFormData[key] = value;
      });
      delete applyFormData.role; // Eliminar atributos como 'role'
      delete applyFormData.picture; // Eliminar otros atributos si es necesario

      // Reconstruir userFormData sin los atributos eliminados
      const filteredUserFormData = new FormData();
      Object.entries(applyFormData).forEach(([key, value]) => {
        filteredUserFormData.append(key, value);
      });

      // Verificar contenido de filteredUserFormData como JSON
      const formDataObject2 = {};
      filteredUserFormData.forEach((value, key) => {
        formDataObject2[key] = value;
      });
      const formDataJSON2 = JSON.stringify(formDataObject2);
      console.log("filteredUserFormData:", formDataJSON2);      


      //console.log('Esto va en ApplyForm: ', applyFormData)

      // applyFormData al endpoint de create form
      const applyResponse = await fetch("http://localhost:3000/api/application-form/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(applyFormData),
        body: formDataObject2,
        credentials: "include",
        // userCredentials: userCredentials,
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
          value={pet?.data?.name || ""}
          onChange={handleChange}
        />
        <TextField
          disabled
          id="userName"
          label="Nombre Completo"
          value={userCredentialsObj.name || ""}
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