export interface IInputAuth {
  id?: string;
  access?: string;
  username: string;
  password: string;
}

export enum IFormTypesAuth {
  LOGIN_USER = "LOGIN_USER",
  ERROR_AUTH = "ERROR_AUTH",
  LOADING_AUTH = "LOADING_AUTH",
}

export interface IStateAuthUser {
  loading: boolean;
  error: string;
  loginUser: IInputAuth;
}

interface ILoadingUser {
  type: IFormTypesAuth.LOADING_AUTH;
}

interface IErrorAuth {
  type: IFormTypesAuth.ERROR_AUTH;
  payload: string;
}

interface ILoginAuth {
  type: IFormTypesAuth.LOGIN_USER;
  payload: IInputAuth;
}

export type IFormAuth = ILoadingUser | IErrorAuth | ILoginAuth;
