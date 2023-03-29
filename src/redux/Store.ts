/* External dependencies */
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { playReducer } from "../components/bottom-audio-player/reducer/PlayerReducer";
import { eventReducer } from "../components/playlist/reducer/reducer";
import { currentIndexReducer } from "../components/playlist/reducer/reducer";
import { excerptPlayerReducer } from "../components/audio-player/reducer/excerptPlayerReducer";
import { searchChangeReducer } from "../components/header/reducer-search/reducer";
import { reducerTabBoolean } from "../pages/myPlaylist/reducer/reducer";
import { registerReducer } from "../components/form/register/reducer/RegistrReducer";
import { reducerModalForm } from "./../components/form/modal/reducer/modalFormReducer";
import { reducerAuth } from "./../components/form/auth/reducer/AuthReducer";
import { musicReducer } from "./reducer/index";
import { reducerChange } from "../global-audio-player-excerpt/reducer/index";
import { reducerChangeTimePlayerBottom } from "../global-audio-player/reducer/index";
import { reducerBasket } from "../pages/basket/reducer/index";
import { reducerIndexForAlbums } from "../components/MyAlbum/reducer/index";
import { reducerDetailsAlbums } from "../pages/details-albums/reducer/index";
import { reducerUser } from "../components/user/reducer/index";
import { forgotPasswordReducer } from "../components/form/forgotPassword/reducer/forgotPasswordReducer";
import { reducerOrder } from "../components/order/reducer/index";
import { resetPasswordReducer } from "../components/form/resetPassword/reducer/reducerResetPassword";
import { reducerEnterSequirity } from "../components/form/enterSequirity/reducer/EnterSequirityReducer";
import { reducerChangePassword } from "../components/form/changePassword/reducer/ChangePasswordReducer";
import { emailVerifyReducer } from "../pages/emailVerify/reducer/reducerEmailVerify";
import { reducerResetPasswordPhone } from "../components/form/resetPasswordPhone/reducer/ReducerResetPassPhone";

const rootReducer = combineReducers({
  playReducer,
  eventReducer,
  currentIndexReducer,
  excerptPlayerReducer,
  searchChangeReducer,
  reducerTabBoolean,
  registerReducer,
  reducerModalForm,
  reducerAuth,
  musicReducer,
  reducerChange,
  reducerChangeTimePlayerBottom,
  reducerBasket,
  reducerIndexForAlbums,
  reducerDetailsAlbums,
  reducerUser,
  forgotPasswordReducer,
  reducerOrder,
  resetPasswordReducer,
  reducerEnterSequirity,
  reducerChangePassword,
  emailVerifyReducer,
  reducerResetPasswordPhone,
});

export const setUpStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setUpStore>;
export type AppDispatch = AppStore["dispatch"];
