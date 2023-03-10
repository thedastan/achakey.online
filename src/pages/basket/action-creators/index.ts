import axios from "axios";
import { Dispatch } from "redux";
import API, { PUBLIC_API } from "../../../api/Index";
import { ActionBasket, BasketTypes } from "../types";

export const fetchBasket = () => {
  return async (dispatch: Dispatch<ActionBasket>) => {
    try {
      const response = await axios.get(`${PUBLIC_API}order`);

      dispatch({
        type: BasketTypes.BASKET,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: BasketTypes.BASKET_ERROR,
        payload: "При покупке музыку что то пошло не так",
      });
    }
  };
};
