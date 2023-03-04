export interface ITrack {
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
}

export interface TrackState {
  track: ITrack[];
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
