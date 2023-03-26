import React, { FC } from "react";

import { useAppSelector } from "../../../hooks/Index";
import ModalComponent from "../../ui/ModalComponent";
import Authoration from "../auth/Authoration";
import EnterSecurityCode from "../enterSequirity/EnterSecurityCode";
import ForgotPassword from "../forgotPassword/ForgotPassword";
import Registration from "../register/Registration";
import TextAfterRegister from "../register/TextAfterRegister";
import { IModal } from "./action/ModalActionType";

const ModalUserAuth: FC<IModal> = ({ isOpen, onClose }) => {
  const { register, login, forgotPas, exterSequirity } = useAppSelector(
    (state) => state.reducerModalForm
  );

  const { registerUser } = useAppSelector((state) => state.registerReducer);

  return (
    <>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        headerText={
          register
            ? "Регистрация"
            : login
            ? "Авторизация"
            : forgotPas
            ? "Забыли пароль"
            : exterSequirity
            ? "Введите код безопасности"
            : ""
        }
        children={
          !!register ? (
            <>
              {!!registerUser.email ? (
                <TextAfterRegister />
              ) : (
                <Registration onClose={onClose} />
              )}
            </>
          ) : !!login ? (
            <Authoration onClose={onClose} />
          ) : !!forgotPas ? (
            <ForgotPassword />
          ) : !!exterSequirity ? (
            <EnterSecurityCode />
          ) : (
            ""
          )
        }
      />
    </>
  );
};

export default ModalUserAuth;
