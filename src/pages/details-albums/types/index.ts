//Enum
export enum ActionTypes {
  FETCH_ALBUMS_DETAILS = "FETCH_ALBUMS_DETAILS",
  FETCH_ALBUMS_ERROR_DETAILS = "FETCH_ALBUMS_ERROR_DETAILS",
}

//Types
interface ITrack {
  audio?: string;
  created_at?: string;
  updated_at?: string;
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

export interface IAlbumDetail {
  id?: string;
  name: string;
  total_price: string;
  image: string;
  music: ITrack[];
}

//state
export interface AlbumDetailsState {
  albums: IAlbumDetail;
  error: string;
}

interface ActionAlbumDetailSuccess {
  type: ActionTypes.FETCH_ALBUMS_DETAILS;
  payload: IAlbumDetail;
}

interface ActionAlbumDetailRejected {
  type: ActionTypes.FETCH_ALBUMS_ERROR_DETAILS;
  payload: string;
}

export type ActionsDetailsAlbum =
  | ActionAlbumDetailRejected
  | ActionAlbumDetailSuccess;
