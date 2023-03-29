import { Box, FormControl } from "@chakra-ui/react";
import React, { FC, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppSelector } from "../../../hooks/Index";
import { useActionForgot, useModalforms } from "../../../hooks/useActions";
import { isEmail, isPhone } from "../../helpers/helperFunction";
import BtnForm from "../../ui/BtnForm";
import Inputs from "../../ui/Inputs";
import TextError from "../../ui/TextError";
import TextFormEnd from "../../ui/TextFormEnd";
import { IModalInterface } from "../auth/formAuthInterfaces";
import { IForgotPassword } from "./interfacesForgotPassword";

const ForgotPassword: FC<IModalInterface> = ({ onClose }) => {
  const [errors, setError] = useState<string>("");
  const [emailPhone, setEmailPhone] = useState<IForgotPassword>({
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const { registerModal } = useModalforms();
  const { fetchForgotPassword, fetchForgotPasswordPhone } = useActionForgot();

  const { loading, forgotPassword, error } = useAppSelector(
    (state) => state.forgotPasswordReducer
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let phoneOrEmail = e.target.value;
    if (isEmail(phoneOrEmail)) {
      setEmailPhone({ email: phoneOrEmail, phone: "" });
      setError("");
    } else if (isPhone(phoneOrEmail)) {
      setEmailPhone({ email: "", phone: phoneOrEmail });
      setError("");
    } else {
      setEmailPhone({ email: "", phone: "" });
      setError("Введите почту или номер телефона");
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailPhone.email?.length) {
      setError("");
      const email = emailPhone.email;
      fetchForgotPassword(email);
    } else if (emailPhone.phone?.length) {
      setError("");
      const phone = emailPhone.phone;
      fetchForgotPasswordPhone(phone);
    } else {
      setError("Введите почту или номер телефона");
    }
  };

  const openRegister = () => {
    registerModal();
  };

  if (!!forgotPassword?.phone) {
    navigate("/resetPassword");
    onClose();
  }

  return (
    <Box w="100%" px={{ sm: "20px" }}>
      <ToastContainer />
      <form onSubmit={onSubmit}>
        <FormControl>
          <Box mb="10px">
            <Inputs
              id="emailOrPhone"
              placeholder="Почта или номер телефона*"
              type="text"
              required={true}
              borderColor={errors.length ? "#FF0000" : "#AAAAAA"}
              focusBorderColor={errors.length ? "#FF0000" : "#174079"}
              onChangeInput={handleChange}
            />
            <TextError text={errors} />
          </Box>
          <BtnForm
            btnText="Сбросить пароль"
            isLoading={loading}
            bg="#2A3654"
            color="white"
            width="100%"
            colorSceme="blue"
          />
          <TextFormEnd
            questionText="Нет аккаунта?"
            textWord="Зарегистрироватсься?"
            onClickLink={openRegister}
          />
        </FormControl>
      </form>
    </Box>
  );
};

export default ForgotPassword;
