import { Dispatch } from "redux";
import { IModalActionTypes, IModalsForm } from "./ModalActionType";

export const registerModal = () => {
  return async (dispatch: Dispatch<IModalsForm>) => {
    try {
      dispatch({
        type: IModalActionTypes.REGISTER_MODAL,
        payload: true,
      });
    } catch (e: any) {
      console.log(e.message);
    }
  };
};

export const loginModal = () => {
  return async (dispatch: Dispatch<IModalsForm>) => {
    try {
      dispatch({
        type: IModalActionTypes.LOGIN_MODAL,
        payload: true,
      });
    } catch (e: any) {
      console.log(e.message);
    }
  };
};

export const forgotPassModal = () => {
  return async (dispatch: Dispatch<IModalsForm>) => {
    try {
      dispatch({
        type: IModalActionTypes.FORGOT_PASS_MODAL,
        payload: true,
      });
    } catch (e: any) {
      console.log(e.message);
    }
  };
};
