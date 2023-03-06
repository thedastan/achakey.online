/* External dependencies */
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { playReducer } from "../components/bottom-audio-player/reducer/PlayerReducer";
import { eventReducer } from "../pages/all-playlist/reducer/reducer";
import { currentIndexReducer } from "../pages/all-playlist/reducer/reducer";
import { excerptPlayerReducer } from "../components/audio-player/reducer/excerptPlayerReducer";
import { searchChangeReducer } from "../components/header/reducer-search/reducer";
import { reducerTabBoolean } from "../pages/myPlaylist/reducer/reducer";
import { reducerTracks } from "./reducer/TracksReducer";
import { registerReducer } from "../components/form/register/reducer/RegistrReducer";
import { reducerModalForm } from "./../components/form/modal/reducer/modalFormReducer";
import { reducerAuth } from "./../components/form/auth/reducer/AuthReducer";
import { musicReducer } from "./reducer/index";

const rootReducer = combineReducers({
  playReducer,
  eventReducer,
  currentIndexReducer,
  excerptPlayerReducer,
  searchChangeReducer,
  reducerTabBoolean,
  reducerTracks,
  registerReducer,
  reducerModalForm,
  reducerAuth,
  musicReducer,
});

export const setUpStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setUpStore>;
export type AppDispatch = AppStore["dispatch"];
