import { IAlbums, ITrack } from "../../../redux/types";

export enum OrderTypes {
  ORDER = "ORDER",
  ORDER_DETAILS = "ORDER_DETAILS",
  ORDER_POST = "ORDER_POST",
  ORDER_POST_ID = "ORDER_POST_ID",
}

export interface OrderState {
  order: OrderType[];
  orderDetails: OrderType | null;
  orderId: number | null;
}

export interface OrderType {
  id?: number | null;
  user: string;
  total_price?: string;
  status?: string;
  order_item: OrderItem[] | undefined;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  id?: string | number;
  order: string;
  music?: ITrack;
  album?: IAlbums;
}

export interface OrderPost {
  user: string;
  total_price?: string | number | null;
  status?: string | null;
  order_item: OrderItemPost[];
}

interface OrderItemPost {
  order: string;
  album?: number | string | null;
  music?: number | string | null;
}

interface ActionOrder {
  type: OrderTypes.ORDER;
  payload: OrderType[];
}

interface ActionOrderDetails {
  type: OrderTypes.ORDER_DETAILS;
  payload: OrderType;
}

interface ActionPostOrder {
  type: OrderTypes.ORDER_POST;
  payload: OrderPost;
}

interface ActionPostOrderId {
  type: OrderTypes.ORDER_POST_ID;
  payload: number;
}

export type ActionTypes =
  | ActionOrder
  | ActionOrderDetails
  | ActionPostOrder
  | ActionPostOrderId;
