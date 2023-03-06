import { IActionTypes, MusicAction, MusicState } from "../types/Music";

const initialState: MusicState = {
  albums: [],
  tracks: [],
  error: "",
};

export const reducerMusic = (state = initialState, action: MusicAction) => {
  switch (action.type) {
    case IActionTypes.FETCH_ALBUMS_ERROR:
      return { ...state, error: action.payload };

    case IActionTypes.FETCH_TRACKS_ERROR:
      return { ...state, error: action.payload };

    case IActionTypes.FETCH_TRACKS:
      return { error: "", tracks: action.payload };

    case IActionTypes.FETCH_ALBUMS:
      return { error: "", albums: action.payload };
    default:
      return state;
  }
};
