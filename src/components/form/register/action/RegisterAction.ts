import { Dispatch } from "redux";

import { PUBLIC_API } from "../../../../api/Index";
import { IForms, IFormsTypes, IInputRegister } from "../../formInterfaces";

export const fetchRegisterEmail = (user: IInputRegister) => {
  return async (dispatch: Dispatch<IForms>) => {
    try {
      dispatch({
        type: IFormsTypes.LOADING_REGISTER,
      });
      await PUBLIC_API.post("account/register/", {
        ...user,
      });
      dispatch({
        type: IFormsTypes.REGISTER_USER,
        payload: user,
      });
    } catch (e: any) {
      dispatch({
        type: IFormsTypes.ERROR_REGISTER,
        payload: !!e.response.data?.email[0]
          ? e.response.data?.email[0]
          : e.message,
      });
    }
  };
};

export const fetchRegisterPhone = (user: IInputRegister) => {
  return async (dispatch: Dispatch<IForms>) => {
    try {
      dispatch({
        type: IFormsTypes.LOADING_REGISTER,
      });
      await PUBLIC_API.post("account/register/", {
        ...user,
      });
      if (user.phone) {
        dispatch({
          type: IFormsTypes.PHONE_NUMBER_REGISTER,
          payload: user.phone,
        });
        sessionStorage.setItem("phoneNumber", user.phone);
      } else if (user.email) {
        dispatch({
          type: IFormsTypes.REGISTER_USER,
          payload: user,
        });
      }
    } catch (e: any) {
      dispatch({
        type: IFormsTypes.ERROR_REGISTER,
        payload: !!e.response.data?.phone[0]
          ? e.response.data?.phone[0]
          : e.message,
      });
    }
  };
};

export const fetchErrorRegister = () => {
  return (dispatch: Dispatch<IForms>) => {
    dispatch({
      type: IFormsTypes.ERROR_REGISTER,
      payload: "",
    });
  };
};
