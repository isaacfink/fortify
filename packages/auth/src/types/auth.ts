export type InitArgs<TUser extends Record<string, any>> = {
  getUser: () => TUser;
  fields: {
    email: keyof TUser;
    password: keyof TUser;
    id: keyof TUser;
  };
};
