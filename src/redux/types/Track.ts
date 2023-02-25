export interface ITrack {
  _id?: string;
  name?: string;
  text?: string;
  picture?: string;
  audio?: string;
  excerpt?: string | number;
  price?: string;
}

export interface TrackState {
  track?: ITrack[];
  error: string;
}

export enum ITrackActionTypes {
  FETCH_TRACKS = "FETCH_TRACKS",
  FETCH_TRACKS_ERROR = "FETCH_TRACKS_ERROR",
}

interface FetchTrackAction {
  type: ITrackActionTypes.FETCH_TRACKS;
  payload: ITrack[];
}

interface FetchTrackErrorAction {
  type: ITrackActionTypes.FETCH_TRACKS_ERROR;
  payload: string;
}

export type TrackAction = FetchTrackAction | FetchTrackErrorAction;
