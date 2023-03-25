export type IResponseEmailVerify = {
  email: string;
};

export interface IStateEmailVerify {
  emailVerify: IResponseEmailVerify;
  loading: boolean;
  error: string;
  authModal: boolean;
}

export enum IEmailVerifyTypes {
  EMAIL_VERIFY = "EMAIL_VERIFY",
  ERROR_VERIFY = "ERROR_VERIFY",
  LOADING_VERIFY = "LOADING_VERIFY",
  AUTH_MODAL_OPEN = "AUTH_MODAL_OPEN",
}

interface ILoaidngVerify {
  type: IEmailVerifyTypes.LOADING_VERIFY;
}

interface IErrorVerify {
  type: IEmailVerifyTypes.ERROR_VERIFY;
  payload: string | any;
}

interface ISuccessEmailVerify {
  type: IEmailVerifyTypes.EMAIL_VERIFY;
  payload: IResponseEmailVerify;
}

interface IOpenOrCloseModal {
  type: IEmailVerifyTypes.AUTH_MODAL_OPEN;
  payload: boolean;
}

export type IEmailVerify =
  | ILoaidngVerify
  | IErrorVerify
  | ISuccessEmailVerify
  | IOpenOrCloseModal;
