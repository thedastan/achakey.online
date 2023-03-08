export interface IInputRegister {
  username: string;
  email?: string;
  phone_number?: string;
  password: string;
  password_confirm: string;
}

export interface IInputAuth {
  email: string;
  password: string;
}

export interface IForgotPasword {
  phone: string;
}

export interface IAuthForgot {
  emailOrNumber: string;
  password: string;
  forgotPassword: string;
}

export interface IStateRegister {
  loading: boolean;
  error: any | string;
  registerUser: IInputRegister;
}

export interface IStateAuth {
  loading: boolean;
  error: any | string;
  authUser: IInputAuth;
}

export enum IFormsTypes {
  REGISTER_USER = "REGISTER_USER",
  LOGIN_USER = "LOGIN_USER",
  LOADING_USER = "LOADING_USER",
  ERROR_USER = "ERROR_USER",
}

interface ILoadingUser {
  type: IFormsTypes.LOADING_USER;
}

interface IErrorUser {
  type: IFormsTypes.ERROR_USER;
  payload: any;
}

interface IRegister {
  type: IFormsTypes.REGISTER_USER;
  payload: IInputRegister;
}

interface ILogin {
  type: IFormsTypes.LOGIN_USER;
  payload: IInputAuth;
}

export type IForms = IRegister | ILogin | ILoadingUser | IErrorUser;
