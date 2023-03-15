//Enum
export enum ActionTypes {
  FETCH_ALBUMS = "FETCH_ALBUMS",
  FETCH_TRACKS = "FETCH_TRACKS",
  FETCH_ALBUMS_ERROR = "FETCH_ALBUMS_ERROR",
  FETCH_TRACKS_ERROR = "FETCH_TRACKS_ERROR",
  FETCH_MY_ALBUMS = "FETCH_MY_ALBUMS",
  FETCH_MY_TRACKS = "FETCH_MY_TRACKS",
}

//Types
export interface ITrack {
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

export interface IAlbums {
  id?: string;
  name: string;
  total_price: string;
  image: string;
  music: ITrack[];
}

//state
export interface MusicState {
  albums: IAlbums[];
  myAlbums: IMyAlbums[];
  tracks: ITrack[];
  myTracks: IMyTrack[];
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

// MY TRACKS & ALBUMS

//Types
export interface IMyTrack {
  id?: number | null;
  name?: string;
  image?: string;
  artist?: string;
  music_len?: string;
  user?: any[];
  price?: string;
  music?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IMyAlbums {
  id?: number | null | any;
  name: string;
  total_price: string;
  image: string;
  music: IMyTrack[];
}

// action interface

interface FetchMyAlbumsAction {
  type: ActionTypes.FETCH_MY_ALBUMS;
  payload: IAlbums[];
}

interface FetchMyTracksAction {
  type: ActionTypes.FETCH_MY_TRACKS;
  payload: ITrack[];
}

export type TypeAction =
  | FetchAlbumsAction
  | FetchAlbumsErrorAction
  | FetchTrackErrorAction
  | FetchTracksAction
  | FetchMyAlbumsAction
  | FetchMyTracksAction;
