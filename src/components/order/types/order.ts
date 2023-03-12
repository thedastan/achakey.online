import { IAlbums, ITrack } from "../../../redux/types";

export enum OrderTypes {
  ORDER = "ORDER",
  ORDER_DETAILS = "ORDER_DETAILS",
  ORDER_POST = "ORDER_POST",
}

export interface OrderState {
  order: OrderType[];
}

export interface OrderType {
  id?: number | string;
  user: string;
  total_price?: string;
  status?: string;
  order_item?: OrderItem[];
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  id?: string | number;
  order: string;
  music: ITrack;
  album: IAlbums;
}

export interface OrderPost {
  user: string;
  total_price?: string | number | null;
  status?: string | null;
  order_item: OrderItemPost[];
}

interface OrderItemPost {
  order: string;
  album?: number | string;
  music?: number | string;
}

interface OrderMusicTypes {
  name: string;
  artist?: string;
  price: string | number;
}

interface OrderAlbumTypes {
  name: string;
  music: OrderMusicTypes[];
  total_price: string;
}

interface ActionOrder {
  type: OrderTypes.ORDER;
  payload: OrderType[];
}

interface ActionOrderDetails {
  type: OrderTypes.ORDER_DETAILS;
  payload: OrderItem;
}

interface ActionPostOrder {
  type: OrderTypes.ORDER_POST;
  payload: OrderPost;
}

export type ActionTypes = ActionOrder | ActionOrderDetails | ActionPostOrder;
