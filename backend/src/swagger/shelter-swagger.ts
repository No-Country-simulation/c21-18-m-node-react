// swaggerDefinitions.js

const shelterSchemaDefinition = {
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "Pet name",
    },
    address: {
      type: "string",
      description: "shelter direction",
    },
    email: {
      type: "string",
      description: "pet email"
    },
    phone: {
      type: "strinh",
      description: "shelter phone",
    },

  },
  required: [
    "name",
    "address",
    "email",
    "phone",
  ],
  example: {
    name: "New shelter",
    address: "calle 123",
    email: "shelter@gmail.com",
    phone: "12345"
  },
};

export default shelterSchemaDefinition;
