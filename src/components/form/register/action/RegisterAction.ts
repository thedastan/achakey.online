import { Dispatch } from "redux";
import { toast } from "react-toastify";

import { PUBLIC_API } from "../../../../api/Index";
import { IForms, IFormsTypes, IInputRegister } from "../../formInterfaces";

export const fetchRegister = (user: IInputRegister) => {
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
        type: IFormsTypes.ERROR_USER,
        payload: e.message,
      });
      if (e.response.data?.email[0]) {
        return toast.error(e.response.data?.email[0]);
      }
      if (e.response.data?.phone[0]) {
        return toast.error(e.response.data?.phone[0]);
      }
    }
  };
};
