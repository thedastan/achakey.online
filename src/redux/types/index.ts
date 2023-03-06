//Enum
export enum ActionTypes {
  FETCH_ALBUMS = "FETCH_ALBUMS",
  FETCH_TRACKS = "FETCH_TRACKS",
  FETCH_ALBUMS_ERROR = "FETCH_ALBUMS_ERROR",
  FETCH_TRACKS_ERROR = "FETCH_TRACKS_ERROR",
}

//Types
export interface ITrack {
  map(
    arg0: (
      item: ITrack,
      index: import("react").Key | null | undefined
    ) => JSX.Element
  ): import("react").ReactNode;
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

export interface IAlbums {
  map(arg0: (el: any) => any): any;
  id?: string;
  name: string;
  total_price: string;
  image: string;
  music: ITrack[];
}

//state
export interface MusicState {
  albums: IAlbums[];
  tracks: ITrack[];
  error: string;
}

//interface
interface FetchAlbumsAction {
  type: ActionTypes.FETCH_ALBUMS;
  payload: IAlbums[];
}

interface FetchAlbumsErrorAction {
  type: ActionTypes.FETCH_ALBUMS_ERROR;
  payload: string;
}

interface FetchTracksAction {
  type: ActionTypes.FETCH_TRACKS;
  payload: ITrack[];
}

interface FetchTrackErrorAction {
  type: ActionTypes.FETCH_TRACKS_ERROR;
  payload: string;
}

export type TypeAction =
  | FetchAlbumsAction
  | FetchAlbumsErrorAction
  | FetchTrackErrorAction
  | FetchTracksAction;
