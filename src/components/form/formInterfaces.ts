export interface IInputRegister {
  name?: string;
  surname?: string;
  email?: string;
  phoneNumber?: string;
  password: string;
  password_confirm: string;
}

export interface IInputAuth {
  id: string;
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

export interface IValidateRegister {
  errorEmail: string;
  errorPhone: string;
}

export interface IStateRegister {
  loading: boolean;
  error: any | string;
  registerUser: IInputRegister;
  validateRegister: IValidateRegister;
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
  LOADING_REGISTER = "LOADING_REGISTER",
  ERROR_USER = "ERROR_USER",
  VALIDATE_REGISTER = "VALIDATE_REGISTER",
}

interface ILoadingUser {
  type: IFormsTypes.LOADING_USER;
}

interface ILoadingRegister {
  type: IFormsTypes.LOADING_REGISTER;
}

interface IErrorValidationRegister {
  type: IFormsTypes.VALIDATE_REGISTER;
  payload: IValidateRegister;
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

export type IForms =
  | IRegister
  | ILogin
  | ILoadingUser
  | IErrorUser
  | ILoadingRegister
  | IErrorValidationRegister;
