import { Dispatch } from "redux";

import { PUBLIC_API } from "../../../../api/Index";
import {
  IEnterSequirityTypes,
  IInputEnterSequirityCode,
  ISequirityCode,
} from "../EnterSecuirityInterface";

export const fetchSequirityCode = (phoneCode: IInputEnterSequirityCode) => {
  return async (dispatch: Dispatch<ISequirityCode>) => {
    try {
      dispatch({
        type: IEnterSequirityTypes.LOADING_SEQUIRITY_CODE,
      });
      const res = await PUBLIC_API.post("account/verificate_code/", {
        ...phoneCode,
      });
      dispatch({
        type: IEnterSequirityTypes.ENTER_SEQUIRITY_CODE,
        payload: res.data,
      });
    } catch (e: any) {
      dispatch({
        type: IEnterSequirityTypes.ERROR_SEQUIRITY_CODE,
        payload: e.message,
      });
    }
  };
};
