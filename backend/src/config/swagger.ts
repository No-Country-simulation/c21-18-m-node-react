// import petSchemaDefinition from "@/swagger/pets-swagger";
// import shelterSchemaDefinition from "@/swagger/shelter-swagger";

import path from "path";
import petSchemaDefinition from "../swagger/pets-swagger";
import shelterSchemaDefinition from "../swagger/shelter-swagger";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Adopción de mascotas",
      description:
        "Documentación del Backend de la aplicación para adopción de mascotas",
      version: "1.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        Pets: petSchemaDefinition,
        Shelters: shelterSchemaDefinition,
      },
    },
  },
  apis: [`${path.join(__dirname, "../routes/*.ts")}`],
  // apis: ["./src/routes/*.yaml"],
};

export default swaggerOptions;
