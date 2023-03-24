import { Dispatch } from "redux";
import { toast } from "react-toastify";

import API from "../../../../api/Index";
import { IFormsTypes, IInputChangePassword } from "../../formInterfaces";

export const fetchChangePassword = (newPass: IInputChangePassword) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: IFormsTypes.LOADING_CHANGE_PASSWORD,
      });
      const res = await API.post("account/change-password/", {
        ...newPass,
      });
      dispatch({
        type: IFormsTypes.CHANGE_PASSWORD,
        payload: res.data,
      });
      toast.success("Пароль успешно изменен");
    } catch (e: any) {
      dispatch({
        type: IFormsTypes.ERROR_CHANGE_PASSWORD,
        payload: "Ошибка!",
      });
      if (e.response.data.old_password[0] === "Wrong password.") {
        return toast.error("Текущий пароль не верный");
      }
    }
  };
};
