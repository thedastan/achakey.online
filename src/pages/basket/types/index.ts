import { OrderType } from "../../../components/order/types/order";

export enum BasketTypes {
  BASKET = "BASKET",
  BASKET_ITEM = "BASKET_ITEM",
  BASKET_ERROR = "BASKET_ERROR",
  BASKET_ITEM_FOR_POST = "BASKET_ITEM_FOR_POST",
  BASKET_LOADER = "BASKET_LOADER",
}

interface IOrderItem {
  cart: number | null;
  id: number | null;
  music?: IMusicForBasket | undefined;
  album?: IPlayList;
}

export interface IMusicForBasket {
  id?: number | null;
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

export interface IPlayList {
  id: number | null;
  image: string;
  music: IMusicForBasket[];
  total_price: string;
  name: string;
  user: string;
}

export interface BasketState {
  error: string;
  loader: boolean;
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

interface ICart_item {
  cart: string;
  music?: number | null;
  album?: number | null;
}

export interface IOrderItemForPost {
  total_price: string | number;
  user: string;
  cart_item: ICart_item[];
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

interface ActionsIBasketLoader {
  type: BasketTypes.BASKET_LOADER;
  payload: boolean;
}

export type ActionBasket =
  | ActionsIBasket
  | ActionsIBasketError
  | ActionsIBasketItem
  | ActionsIBasketPost
  | ActionsIBasketLoader;
