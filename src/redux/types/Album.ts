import { ITrack } from "./Track";

export interface IAlbumsState {
  id?: string;
  name: string;
  music: ITrack[];
  total_price: string;
  image: string;
}

export enum IAlbumsActionTypes {
  FETCH_ALBUMS = "FETCH_ALBUMS",
  FETCH_ALBUMS_ERROR = "FETCH_ALBUMS_ERROR",
}

interface FetchAlbumsAction {
  type: IAlbumsActionTypes.FETCH_ALBUMS;
  payload: IAlbumsState[];
}

interface FetchAlbumsErrorAction {
  type: IAlbumsActionTypes.FETCH_ALBUMS_ERROR;
  payload: string;
}

export type AlbumsAction = FetchAlbumsAction | FetchAlbumsErrorAction;
