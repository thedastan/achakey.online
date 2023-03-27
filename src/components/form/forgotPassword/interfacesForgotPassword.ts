export interface IForgotPassword {
  phone?: string;
  email?: string;
}

export interface IStateForgotPassword {
  loading: boolean;
  error: any | string;
  forgotPassword: IForgotPassword;
}

export enum IForgotPasswordTypes {
  FORGOT_PASSWORD = "FORGOT_PASSWORD",
  FORGOT_LOADING = "FORGOT_LOADING",
  FORGOT_ERROR = "FORGOT_ERROR",
}

interface IForgotPasswordLoading {
  type: IForgotPasswordTypes.FORGOT_LOADING;
}

interface IForgotPasswordSuccess {
  type: IForgotPasswordTypes.FORGOT_PASSWORD;
  payload: any;
}

interface IForgotPasswordError {
  type: IForgotPasswordTypes.FORGOT_ERROR;
  payload: any | string;
}

export type IFormForgotPassword =
  | IForgotPasswordLoading
  | IForgotPasswordSuccess
  | IForgotPasswordError;
