import { Dispatch } from "redux";
import { toast } from "react-toastify";

import { PUBLIC_API } from "../../../../api/Index";
import { IForms, IFormsTypes, IInputRegister } from "../../formInterfaces";

export const fetchRegister = (user: IInputRegister) => {
  return async (dispatch: Dispatch<IForms>) => {
    try {
      if (user.phone) {
        dispatch({
          type: IFormsTypes.PHONE_NUMBER_REGISTER,
          payload: user.phone,
        });
        sessionStorage.setItem("phoneNumber", user.phone);
      } else if (user.email) {
        toast.success("Вам на почту отправлено ссылка для подверждения");
      }
      dispatch({
        type: IFormsTypes.LOADING_REGISTER,
      });
      const res = await PUBLIC_API.post("account/register/", {
        ...user,
      });
      dispatch({
        type: IFormsTypes.REGISTER_USER,
        payload: res.data,
      });
      
    } catch (e: any) {
      dispatch({
        type: IFormsTypes.ERROR_USER,
        payload: e.message,
      });
      if (e.response.data?.phone[0] || e.response.data?.email[0]) {
        toast.error(e.response.data?.phone[0]);
        toast.error(e.response.data?.email[0]);
      } else {
        toast.error(e.message);
      }
    }
  };
};

export const fetchRegisterGoogle = (auth_token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: IFormsTypes.LOADING_REGISTER,
      });
      const res = await PUBLIC_API.post(`auth/google/`, {
        auth_token,
      });
      alert(res.data);
    } catch (e: any) {
      toast.error(e.message);
      dispatch({
        type: IFormsTypes.ERROR_USER,
        payload: e.message,
      });
    }
  };
};
