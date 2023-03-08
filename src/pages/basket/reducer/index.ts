import { ActionBasket, BasketState, BasketTypes } from "../types";

const initialState: BasketState = {
  basket: [],
  error: "",
};

export const reducerBasket = (
  state = initialState,
  action: ActionBasket
): BasketState => {
  switch (action.type) {
    case BasketTypes.BASKET:
      return { ...state, basket: action.payload };

    case BasketTypes.BASKET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
