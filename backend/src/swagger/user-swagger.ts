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
      type: "strinh",
      description: "user phone",
    },
    picture: {
      type: "string",
      description: "user picture",
    },
  },
  required: ["name", "email", "password", "role"],
  example: {
    name: "New user",
    email: "user@gmail.com",
    password: "asdf",
    role: "GUEST",
    phone: "12345",
    picture: "asdf"
  },
};

export default userSquemaDefinition;
