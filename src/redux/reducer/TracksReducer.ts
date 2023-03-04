import { ITrackActionTypes, TrackAction, TrackState } from "../types/Track";

const initialState: TrackState = {
  error: "",
  track: [],
};

export const reducerTracks = (state = initialState, action: TrackAction) => {
  switch (action.type) {
    case ITrackActionTypes.FETCH_TRACKS:
      return { ...state, track: action.payload };
    case ITrackActionTypes.FETCH_TRACKS_ERROR:
      return { error: action.payload };
    default:
      return state;
  }
};
