export interface IUser {
  username: string;
  email: string;
  password: string;
}

export type ILogin = Pick<IUser, 'email' | 'password'>;
