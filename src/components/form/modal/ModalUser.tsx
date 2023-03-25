import React, { FC } from "react";

import { useAppSelector } from "../../../hooks/Index";
import ModalComponent from "../../ui/ModalComponent";
import Authoration from "../auth/Authoration";
import EnterSecurityCode from "../enterSequirity/EnterSecurityCode";
import ForgotPassword from "../forgotPassword/ForgotPassword";
import Registration from "../register/Registration";

type IModal = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalUserAuth: FC<IModal> = ({ isOpen, onClose }) => {
  const { register, login, forgotPas, exterSequirity } = useAppSelector(
    (state) => state.reducerModalForm
  );
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
            <Registration onClose={onClose} />
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
