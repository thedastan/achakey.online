/* External dependencies */
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { reducerResetPasswordPhone } from "../components/form/resetPasswordPhone/reducer/ReducerResetPassPhone";
import { reducerChangePassword } from "../components/form/changePassword/reducer/ChangePasswordReducer";
import { resetPasswordReducer } from "../components/form/resetPassword/reducer/reducerResetPassword";
import { forgotPasswordReducer } from "../components/form/forgotPassword/reducer/forgotPasswordReducer";
import { reducerEnterSequirity } from "../components/form/enterSequirity/reducer/EnterSequirityReducer";
import { reducerModalForm } from "./../components/form/modal/reducer/modalFormReducer";
import { registerReducer } from "../components/form/register/reducer/RegistrReducer";
import { reducerAuth } from "./../components/form/auth/reducer/AuthReducer";
import { playReducer } from "../components/bottom-audio-player/reducer/PlayerReducer";
import { excerptPlayerReducer } from "../components/audio-player/reducer/excerptPlayerReducer";
import { reducerToasrMessage } from "../components/toast-message/reducer/reducerToastMessage";
import { searchChangeReducer } from "../components/header/reducer-search/reducer";
import { reducerOrder } from "../components/order/reducer/index";
import { reducerUser } from "../components/user/reducer/index";

import { eventReducer } from "../containers/excerptPlaylist/reducer/reducer";
import { currentIndexReducer } from "../containers/excerptPlaylist/reducer/reducer";
import { reducerIndexForAlbums } from "../containers/MyAlbum/reducer/index";

import { reducerBasket } from "../pages/basket/reducer/index";
import { reducerDetailsAlbums } from "../pages/detailsAlbums/reducer/index";
import { emailVerifyReducer } from "../pages/emailVerify/reducer/reducerEmailVerify";
import { reducerTabBoolean } from "../pages/myPlaylist/reducer/reducer";

import { reducerChangeTimePlayerBottom } from "../global-audio-player/reducer/index";
import { reducerChange } from "../global-audio-player-excerpt/reducer/index";

import { musicReducer } from "./reducer/index";

const rootReducer = combineReducers({
  currentIndexReducer,
  eventReducer,
  emailVerifyReducer,
  excerptPlayerReducer,
  playReducer,
  searchChangeReducer,
  forgotPasswordReducer,
  musicReducer,
  reducerTabBoolean,
  registerReducer,
  reducerModalForm,
  reducerAuth,
  reducerChange,
  reducerChangeTimePlayerBottom,
  reducerBasket,
  reducerIndexForAlbums,
  reducerDetailsAlbums,
  reducerUser,
  reducerOrder,
  resetPasswordReducer,
  reducerEnterSequirity,
  reducerChangePassword,
  reducerResetPasswordPhone,
  reducerToasrMessage,
});

export const setUpStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setUpStore>;
export type AppDispatch = AppStore["dispatch"];
