export interface IInputEnterSequirityCode {
  phone: string;
  code: number;
}

export interface IStateEnterSequirityCode {
  loading: boolean;
  error: string | any;
  sequirityCode: any;
}

export enum IEnterSequirityTypes {
  LOADING_SEQUIRITY_CODE = "LOADING_SEQUIRITY_CODE",
  ENTER_SEQUIRITY_CODE = "ENTER_SEQUIRITY_CODE",
  ERROR_SEQUIRITY_CODE = "ERROR_SEQUIRITY_CODE",
}

interface IEnterSequiritySuccess {
  type: IEnterSequirityTypes.ENTER_SEQUIRITY_CODE;
  payload: any;
}

interface IEnterSequirityLoading {
  type: IEnterSequirityTypes.LOADING_SEQUIRITY_CODE;
}

interface IEnterSequirityError {
  type: IEnterSequirityTypes.ERROR_SEQUIRITY_CODE;
  payload: string;
}

export type ISequirityCode =
  | IEnterSequiritySuccess
  | IEnterSequirityLoading
  | IEnterSequirityError;
