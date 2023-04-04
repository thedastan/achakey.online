//Enum
export enum ActionTypes {
  FETCH_ALBUMS = "FETCH_ALBUMS",
  FETCH_TRACKS = "FETCH_TRACKS",
  FETCH_ALBUMS_ERROR = "FETCH_ALBUMS_ERROR",
  FETCH_TRACKS_ERROR = "FETCH_TRACKS_ERROR",
  FETCH_MY_ALBUMS = "FETCH_MY_ALBUMS",
  FETCH_MY_TRACKS = "FETCH_MY_TRACKS",
  FETCH_LOADER = "FETCH_LOADER",
  FETCH_DETAILS_TRACK = "FETCH_DETAILS_TRACK",
}

//Types
export interface ITrack {
  music?: string;
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
  text?: string;
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
  track: ITrack;
  myTracks: IMyTrack[];
  error: string;
  loader: boolean;
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

interface FetchDetailsTrack {
  type: ActionTypes.FETCH_DETAILS_TRACK;
  payload: ITrack;
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
  text?: string;
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

interface FetchLoader {
  type: ActionTypes.FETCH_LOADER;
  payload: boolean;
}

export type TypeAction =
  | FetchAlbumsAction
  | FetchAlbumsErrorAction
  | FetchTrackErrorAction
  | FetchTracksAction
  | FetchMyAlbumsAction
  | FetchMyTracksAction
  | FetchLoader
  | FetchDetailsTrack;
