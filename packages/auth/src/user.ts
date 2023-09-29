export class User<TUser extends Record<string, any>> {
  isAuthenticated: boolean;
  user: TUser | null;
  session: string | null;
  token: string | null;

  constructor() {}
}
