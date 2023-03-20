import { Dispatch } from "redux";
import { PUBLIC_API } from "../../../../api/Index";
import { IForms, IFormsTypes, IInputResetPassword } from "../../formInterfaces";

export const fetchResetPassword = (reset: IInputResetPassword) => {
  return async (dispatch: Dispatch<IForms>) => {
    try {
      dispatch({
        type: IFormsTypes.RESET_LOADING,
      });
      const res = await PUBLIC_API.post("reset_password/confirm/", {
        ...reset,
      });
      dispatch({
        type: IFormsTypes.RESET_PASSWORD,
        payload: res.data,
      });
    } catch (e: any) {
      dispatch({
        type: IFormsTypes.ERROR_USER,
        payload: e.message,
      });
      alert(e.message);
    }
  };
};
