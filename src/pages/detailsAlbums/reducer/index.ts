import { ActionsDetailsAlbum, ActionTypes, AlbumDetailsState } from "../types";

const initialState: AlbumDetailsState = {
  albums: {
    image: "",
    music: [],
    name: "",
    total_price: "",
    id: 0,
  },
  error: "",
};

export const reducerDetailsAlbums = (
  state = initialState,
  action: ActionsDetailsAlbum
): AlbumDetailsState => {
  switch (action.type) {
    case ActionTypes.FETCH_ALBUMS_DETAILS:
      return { ...state, albums: action.payload };

    case ActionTypes.FETCH_ALBUMS_ERROR_DETAILS:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
