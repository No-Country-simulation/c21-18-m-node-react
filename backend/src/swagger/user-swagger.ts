const userSquemaDefinition = {
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "User name",
    },
    email: {
      type: "string",
      description: "pet email",
    },
    password: {
      type: "string",
      description: "user password",
    },
    role: {
      type: "string",
      description: "role description",
    },
    phone: {
      type: "string",
      description: "user phone",
    },
    picture: {
      type: "string",
      description: "user picture",
    },
    address: {
      type: "string",
      description: "user address"
    },
    localidad: {
      type: "string",
      description: "user localidad"
    },
    provincia: {
      type: "string",
      description: "user provincia"
    }
  },
  required: ["name", "email", "password", "role"],
  example: {
    name: "New user",
    email: "user@gmail.com",
    password: "asdf",
    role: "GUEST",
    phone: "12345",
    picture: "asdf",
    address: "calle 123",
    locailidad: "Puerto Iguazú",
    provincia: "Misiones"
  },
};

export default userSquemaDefinition;
