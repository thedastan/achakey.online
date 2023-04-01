export interface IMessage {
  setOut: boolean;
  status: boolean;
  message: string;
}

export interface IStateToastMessage {
  toast: IMessage;
}

export enum IToastMessageType {
  TOAST_MESSAGE = "TOAST_MESSAGE",
}

interface IToastMessage {
  type: IToastMessageType.TOAST_MESSAGE;
  payload: IMessage;
}

export type IToastMessages = IToastMessage;
