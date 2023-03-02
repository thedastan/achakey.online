/* External dependencies */
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { playReducer } from "../components/bottom-audio-player/reducer/PlayerReducer";
import { trackReducer } from "./reducer/TrackReducer";
import { eventReducer } from "../pages/allPlaylist/reducer/reducer";
import { currentIndexReducer } from "../pages/allPlaylist/reducer/reducer";
import { FunctionForMusicReducer } from "../components/audio-player/reducer/reducer";
import { excerptPlayerReducer } from "./reducer/excerptPlayerReducer";
import { searchChangeReducer } from "../components/header/reducer-search/reducer";
import { reducerTabBoolean } from "../pages/myPlaylist/reducer/reducer";

const rootReducer = combineReducers({
  playReducer,
  trackReducer,
  eventReducer,
  currentIndexReducer,
  FunctionForMusicReducer,
  excerptPlayerReducer,
  searchChangeReducer,
  reducerTabBoolean,
});

export const setUpStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setUpStore>;
export type AppDispatch = AppStore["dispatch"];
