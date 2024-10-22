const petSchemaDefinition = {
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "Pet name",
    },
    age: {
      type: "number",
      description: "pet age",
    },
    type: {
      type: "string",
      description: "DOG or CAT",
      enum: ["DOG", "CAT"],
    },
    shelterId: {
      type: "number",
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
      enum: ["MALE", "FEMALE"],
    },
    status: {
      type: "boolean",
      description: "pet status",
    },
  },
  required: [
    "name",
    "age",
    "type",
    "shelterId",
    "picture",
    "description",
    "gender",
    "status",
  ],
  example: {
    name: "snoopy",
    age: 2,
    type: "DOG",
    shelterId: 1,
    picture: "binary",
    description: "Le gusta pasear",
    gender: "MALE",
    status: true,
  },
};

export default petSchemaDefinition;
