import { type InitArgs, Auth } from "./auth";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
  roles: string[];
  password: string;
}
const props: InitArgs<User> = {
  getUser: () => {
    return {
      email: "",
      firstName: "",
      id: 1,
      lastName: "",
      roles: [],
      password: "",
    };
  },
  fields: {
    email: "email",
    password: "password",
    id: "id",
  },
};

const auth = new Auth(props);

const user = await auth.login("", { email: "", password: "" });
