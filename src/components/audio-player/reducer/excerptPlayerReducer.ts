import {
  ExcerptActionPlayer,
  ExcerptPlayerState,
  ExcerptPlayerTypes,
} from "../types/ExcerptPlayer";

const initialState: ExcerptPlayerState = {
  active: null,
  currentTime: 0,
  duration: 0,
  pause: true,
  volume: 50,
  forAlbum: false,
};

export const excerptPlayerReducer = (
  state = initialState,
  action: ExcerptActionPlayer
): ExcerptPlayerState => {
  switch (action.type) {
    case ExcerptPlayerTypes.EXCERPT_PAUSE:
      return { ...state, pause: true };

    case ExcerptPlayerTypes.EXCERPT_PLAY:
      return { ...state, pause: false };

    case ExcerptPlayerTypes.EXCERPT_SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };

    case ExcerptPlayerTypes.EXCERPT_SET_DURATION:
      return { ...state, duration: action.payload };

    case ExcerptPlayerTypes.EXCERPT_SET_VOLUME:
      return { ...state, volume: action.payload };

    case ExcerptPlayerTypes.EXCERPT_FOR_ALBUM:
      return { ...state, forAlbum: action.payload };

    case ExcerptPlayerTypes.EXCERPT_SET_ACTIVE:
      return {
        ...state,
        active: action.payload,
        duration: 0,
        currentTime: 0,
      };
    default:
      return state;
  }
};
