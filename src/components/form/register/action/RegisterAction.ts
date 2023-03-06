import { Dispatch } from "redux";
import { PUBLIC_API } from "../../../../api/Index";
import { IForms, IFormsTypes, IInputRegister } from "../../formInterfaces";

export const fetchRegister = (user: IInputRegister) => {
  return async (dispatch: Dispatch<IForms>) => {
    try {
      dispatch({
        type: IFormsTypes.LOADING_USER,
      });
      const res = await PUBLIC_API.post("account/register/", {
        ...user,
      });
      dispatch({
        type: IFormsTypes.REGISTER_USER,
        payload: res.data,
      });
      alert("Вы успешно зарегистрировались!");
    } catch (e: any) {
      alert(JSON.stringify(e.response.data, null, 2));
      dispatch({
        type: IFormsTypes.ERROR_USER,
        payload: e.message,
      });
    }
  };
};
