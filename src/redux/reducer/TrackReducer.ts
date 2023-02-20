import { TrackState, TrackAction, ITrackActionTypes } from "../types/Track";

const initialState: TrackState = {
  track: [],
  error: "",
};

export const trackReducer = (state = initialState, action: TrackAction) => {
  switch (action.type) {
    case ITrackActionTypes.FETCH_TRACKS:
      return { ...state, track: action.payload };
    case ITrackActionTypes.FETCH_TRACKS_ERROR:
      return { eror: "", error: action.payload };

    default:
      return state;
  }
};
