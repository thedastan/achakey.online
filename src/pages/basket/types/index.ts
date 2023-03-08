export enum BasketTypes {
  BASKET = "BASKET",
  BASKET_ERROR = "BASKET_ERROR",
}

interface IOrderItem {
  id?: string | number;
  music: string;
}

export interface BasketState {
  error: string;
  basket: IBasketTypes[];
}

export interface IBasketTypes {
  id?: string | number;
  user: string;
  payment?: string;
  total_price?: string;
  status?: string;
  order_item: IOrderItem[];
  created_at?: string;
  updated_at?: string;
}

interface ActionsIBasket {
  type: BasketTypes.BASKET;
  payload: IBasketTypes[];
}

interface ActionsIBasketError {
  type: BasketTypes.BASKET_ERROR;
  payload: string;
}
export type ActionBasket = ActionsIBasket | ActionsIBasketError;
