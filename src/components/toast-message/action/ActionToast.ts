import { Dispatch } from "redux";
import { IToastMessageType, IMessage } from "../InterfaceToastMessage";

export const toastMessageFunction = (toastMessage: IMessage) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: IToastMessageType.TOAST_MESSAGE,
      payload: toastMessage,
    });
  };
};

export const toastMessageClose = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: IToastMessageType.TOAST_MESSAGE,
      payload: { setOut: false, status: false, message: "" },
    });
  };
};
