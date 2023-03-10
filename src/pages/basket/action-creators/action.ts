import axios from "axios";
import { Dispatch } from "redux";
import API from "../../../api/Index";
import { ActionBasket, BasketTypes, IOrderItemForPost } from "../types";

export const fetchBasket = () => {
  return async (dispatch: Dispatch<ActionBasket>) => {
    try {
      const response = await API.get(`account/cart/`);

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

export const fetchBasketItem = () => {
  return async (dispatch: Dispatch<ActionBasket>) => {
    try {
      const response = await API.get(`account/cart_item/`);

      dispatch({
        type: BasketTypes.BASKET_ITEM,
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

export const postBasketItem = (cart: IOrderItemForPost) => {
  return async (dispatch: Dispatch<ActionBasket>) => {
    try {
      const response = await API.post(`account/cart_item/`, { ...cart });

      dispatch({
        type: BasketTypes.BASKET_ITEM_FOR_POST,
        payload: await response.data,
      });
    } catch (e) {
      dispatch({
        type: BasketTypes.BASKET_ERROR,
        payload: "Не удалось отправить в корзину",
      });
    }
  };
};
