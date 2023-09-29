import { ErrorName } from "./types/errors";
import { User } from "./user";

export type InitArgs<TUser> = {
  getUser: () => TUser;
  fields: {
    email: keyof TUser;
    password: keyof TUser;
    id: keyof TUser;
  };
};

export class Auth<
  TUser extends Record<string, any> = {
    name: string;
    id: number;
    email: string;
  }
> {
  options: InitArgs<TUser>;
  constructor(args: InitArgs<TUser>) {
    this.options = args;
  }

  async login(recipe: string, input: { email: string; password: string }) {
    const user = this.options.getUser();
    const password = user[this.options.fields.password];
    const email = user[this.options.fields.email];
  }

  async logout() {}

  async signup() {}

  async getUserByJwt() {
    return new User<TUser>();
  }
}

export class AuthError extends Error {
  name: ErrorName;
  constructor(args: { message: string; name: ErrorName }) {
    super(args.message);
    this.name = args.name;
  }
}
``;
