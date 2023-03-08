import {
  ActionsIndexsForAlbums,
  IndexForAlbums,
  StateIndexForAlbums,
} from "../types";

const initialState: StateIndexForAlbums = {
  album: 0,
  albumForExcerpt: 0,
};

export const reducerIndexForAlbums = (
  state = initialState,
  action: ActionsIndexsForAlbums
): StateIndexForAlbums => {
  switch (action.type) {
    case IndexForAlbums.ALBUM_INDEX:
      return { ...state, album: action.payload };

    case IndexForAlbums.ALBUM_INDEX_EXCERPT:
      return { ...state, albumForExcerpt: action.payload };

    default:
      return state;
  }
};
