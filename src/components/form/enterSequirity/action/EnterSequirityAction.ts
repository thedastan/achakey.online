import { Dispatch } from "redux";

import { PUBLIC_API } from "../../../../api/Index";

import { IFormsTypes, IInputEnterSequirityCode } from "../../formInterfaces";

export const fetchSequirityCode = (phoneCode: IInputEnterSequirityCode) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: IFormsTypes.LOADING_SEQUIRITY_CODE,
      });
      const res = await PUBLIC_API.post("account/verificate_code/", {
        ...phoneCode,
      });
      dispatch({
        type: IFormsTypes.ENTER_SEQUIRITY_CODE,
        payload: res.data,
      });
    } catch (e: any) {
      dispatch({
        type: IFormsTypes.ERROR_USER,
        payload: e.message,
      });
    }
  };
};
