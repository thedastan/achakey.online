import { ActionBasket, BasketState, BasketTypes } from "../types";

const initialState: BasketState = {
  basket: [],
  basketIte: {
    cart: null,
    id: null,
    music: {},
    album: {
      id: null,
      image: "",
      music: [],
      name: "",
      total_price: "",
    },
  },
  order: {
    user: "",
    created_at: "",
    id: null,
    order_item: [],
    status: "",
    total_price: "",
    updated_at: "",
  },
  error: "",
};

export const reducerBasket = (
  state = initialState,
  action: ActionBasket
): BasketState => {
  switch (action.type) {
    case BasketTypes.BASKET:
      return { ...state, basket: action.payload };

    case BasketTypes.BASKET_ITEM:
      return { ...state, basketIte: action.payload };

    case BasketTypes.BASKET_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
