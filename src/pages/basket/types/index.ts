import { OrderType } from "../../../components/order/types/order";

export enum BasketTypes {
  BASKET = "BASKET",
  BASKET_ITEM = "BASKET_ITEM",
  BASKET_ERROR = "BASKET_ERROR",
  BASKET_ITEM_FOR_POST = "BASKET_ITEM_FOR_POST",
}

interface IOrderItem {
  cart: number | null;
  id: number | null;
  music?: IMusicForBasket;
  album?: IPlayList;
}

interface IMusicForBasket {
  id?: string;
  name?: string;
  image?: string;
  artist?: string;
  music_short_len?: string;
  user?: any[];
  price?: string;
  music_short?: string;
  created_at?: string;
  updated_at?: string;
}
interface IPlayList {
  id: number | null;
  image: string;
  music: IMusicForBasket[];
  total_price: string;
  name: string;
}
export interface BasketState {
  error: string;
  basket: IBasketTypes[];
  basketIte: IOrderItem;
  order: OrderType;
}

export interface IBasketTypes {
  id?: string | number;
  user: string;
  total_price?: string;
  cart_item: IOrderItem[];
  created_at?: string;
}

interface IMusicForPost {
  name: string;
  artist?: string;
  price?: string;
}

interface IPlayListForList {
  playlist: {
    name: string;
    music: [
      {
        name: string;
        artist: string;
        price: string;
      }
    ];
    total_price: string;
  };
}

interface ICart_item {
  cart: string;
  music: number;
  album: number;
}

export interface IOrderItemForPost {
  total_price: string | number;
  user: string;
  cart_item: ICart_item[];
  // music?: IMusicForPost;
  // playlist?: IPlayListForList;
}

interface ActionsIBasket {
  type: BasketTypes.BASKET;
  payload: IBasketTypes[];
}

interface ActionsIBasketItem {
  type: BasketTypes.BASKET_ITEM;
  payload: IOrderItem;
}

interface ActionsIBasketError {
  type: BasketTypes.BASKET_ERROR;
  payload: string;
}

interface ActionsIBasketPost {
  type: BasketTypes.BASKET_ITEM_FOR_POST;
  payload: IOrderItemForPost;
}

export type ActionBasket =
  | ActionsIBasket
  | ActionsIBasketError
  | ActionsIBasketItem
  | ActionsIBasketPost;
