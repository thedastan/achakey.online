import { ActionTypes, MusicState, TypeAction } from "../types";

const initialState: MusicState = {
  albums: [],
  tracks: [],
  myAlbums: [],
  myTracks: [],
  track: {},
  error: "",
  loader: false,
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

    case ActionTypes.FETCH_DETAILS_TRACK:
      return { ...state, error: "", track: action.payload };

    case ActionTypes.FETCH_ALBUMS:
      return { ...state, error: "", albums: action.payload };

    case ActionTypes.FETCH_MY_ALBUMS:
      return { ...state, error: "", myAlbums: action.payload };

    case ActionTypes.FETCH_MY_TRACKS:
      return { ...state, error: "", myTracks: action.payload };

    case ActionTypes.FETCH_LOADER:
      return { ...state, loader: action.payload };

    default:
      return state;
  }
};
