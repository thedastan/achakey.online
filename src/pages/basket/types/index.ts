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
  playlist?: IPlayList;
}

interface IMusicForBasket {
  id?: string;
  name?: string;
  image?: string;
  artist?: string;
  music_len?: string;
  playlist?: boolean | number;
  user?: any[];
  price?: string;
  music_short_len?: string;
  music?: string;
  music_short?: string;
}

interface IPlayList {
  id: number | null;
  image: string;
  music: IMusicForBasket[];
  total_price: string;
  name: string;
}

interface IMusicAndPlaylist {
  cart: number | null;
  id: number | null;
  music?: IMusicForBasket;
  playlist?: IPlayList;
}

export interface BasketState {
  error: string;
  basket: IBasketTypes[];
  basketIte: IOrderItem;
}

export interface IBasketTypes {
  id?: string | number;
  user: string;
  total_price?: string;
  cart: IOrderItem[];
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

export interface IOrderItemForPost {
  cart: string;
  music?: IMusicForPost;
  playlist?: IPlayListForList;
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
