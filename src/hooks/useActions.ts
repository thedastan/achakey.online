import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import actionCreators from "../components/bottom-audio-player/action-creators";
import actionCreatorsExcerpt from "../components/audio-player/action-creators";
import actionTracks from "../redux/action-creators/index";
import actionPostRegistr from "../components/form/register/action";
import actionModalForms from "../components/form/modal/action";
import actionPostAuth from "../components/form/auth/action";
import actionForgotPassword from "../components/form/forgotPassword/action";
import actionBasket from "../pages/basket/action-creators/index";
import actionUser from "../components/user/action-creators/index";
import actionOrder from "../components/order/action-creators/index";
import actionResetPassword from "../components/form/resetPassword/action/index";
import actionEnterSequirityCode from "../components/form/enterSequirity/action/index";
import actionChangePassword from "../components/form/changePassword/action/index";
import actionEmailVerify from "../pages/emailVerify/action/index";
import actionResetPasswordPhone from "../components/form/resetPasswordPhone/action/index";
import actionSendAgain from "../components/form/send-again/action/index";
import actionToast from "../components/toast-message/action/index";
import actionMusicModal from "../containers/Home/Music/redux/action/Index"
import { useAppDispatch } from "./Index";

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
};

export const useExcerpAction = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actionCreatorsExcerpt, dispatch);
};

export const useTracksAction = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actionTracks, dispatch);
};

export const usePostRegistr = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actionPostRegistr, dispatch);
};

export const usePostAuth = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actionPostAuth, dispatch);
};

export const useModalforms = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actionModalForms, dispatch);
};

export const useActionBasket = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actionBasket, dispatch);
};

export const useActionUser = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actionUser, dispatch);
};

export const useActionForgot = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actionForgotPassword, dispatch);
};

export const useActionOrder = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actionOrder, dispatch);
};

export const useActionResetPassword = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actionResetPassword, dispatch);
};

export const useActionEnterSequirity = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actionEnterSequirityCode, dispatch);
};

export const useActionChangePassword = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actionChangePassword, dispatch);
};

export const useActionEmailVerify = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actionEmailVerify, dispatch);
};

export const useActionResetPasswordPhone = () => {
  const dispath = useAppDispatch();
  return bindActionCreators(actionResetPasswordPhone, dispath);
};

export const useActionSendAgain = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actionSendAgain, dispatch);
};

export const useActionToastMessage = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actionToast, dispatch);
};

export const useActionMusicModal = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actionMusicModal, dispatch);
};