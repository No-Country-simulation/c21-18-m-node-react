const petSchemaDefinition = {
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "Pet name",
    },
    age: {
      type: "integer",
      description: "pet age",
    },
    size: {
      type: "string",
      description: "CHICO, MEDIANO, GRANDE",
      enum: ["CHICO","MEDIANO","GRANDE"]
    },
    type: {
      type: "string",
      description: "PERRO o GATO",
      enum: ["PERRO", "GATO"],
    },
    shelterId: {
      type: "integer",
      description: "shelter id",
    },
    picture: {
      type: "string",
      description: "pet picture",
      format: "binary",
    },
    description: {
      type: "string",
      description: "pet description",
    },
    gender: {
      type: "string",
      description: "pet gender",
      enum: ["MACHO", "HEMBRA"],
    },
    status: {
      type: "boolean",
      description: "pet status",
    },
  },
  required: [
    "name",
    "age",
    "size",
    "type",
    "shelterId",
    "description",
    "gender",
    "status",
  ],
  example: {
    name: "Spike",
    age: 4,
    size: "GRANDE",
    type: "PERRO",
    shelterId: 1,
    picture: "binary",
    description: "Le gusta pasear",
    gender: "MALE",
    status: true,
  },
};

export default petSchemaDefinition;
