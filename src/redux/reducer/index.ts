import { ActionTypes, MusicState, TypeAction } from "../types";

const initialState: MusicState = {
  albums: [],
  tracks: [],
  error: "",
};

export const musicReducer = (
  state = initialState,
  action: TypeAction
): MusicState => {
  switch (action.type) {
    case ActionTypes.FETCH_TRACKS_ERROR:
      return { ...state, error: action.payload };
    case ActionTypes.FETCH_ALBUMS_ERROR:
      return { ...state, error: action.payload };
    case ActionTypes.FETCH_TRACKS:
      return { ...state, error: "", tracks: action.payload };
    case ActionTypes.FETCH_ALBUMS:
      return { ...state, error: "", albums: action.payload };
    default:
      return state;
  }
};
