import path from "path";
import petSchemaDefinition from "../swagger/pets-swagger";
import shelterSchemaDefinition from "../swagger/shelter-swagger";
import userSquemaDefinition from "../swagger/user-swagger";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Adopción de mascotas",
      description:
        "Documentación API para adopción de mascotas",
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
        Users: userSquemaDefinition,
      },
    },
  },
  apis: [`${path.join(__dirname, "../routes/*.ts")}`],
};

export default swaggerOptions;
