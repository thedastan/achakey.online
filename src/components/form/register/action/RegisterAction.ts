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
      const res = await PUBLIC_API.post("account/register/", {
        ...user,
      });
      dispatch({
        type: IFormsTypes.REGISTER_USER,
        payload: res.data,
      });
      toast.success("Вы успешно зарегистрировались!");
    } catch (e: any) {
      if (e.response.data?.email[0] === "user with this email already exists") {
        toast.error(
          "Пользователь с таким адресом электронной почты уже существует"
        );
      } else {
        toast.error(e.message);
      }
      dispatch({
        type: IFormsTypes.ERROR_USER,
        payload: e.message,
      });
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
      console.log(res.data);
    } catch (e: any) {
      dispatch({
        type: IFormsTypes.ERROR_USER,
        payload: e.message,
      });
    }
  };
};
