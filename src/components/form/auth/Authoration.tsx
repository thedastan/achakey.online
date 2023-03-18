import React, { FC, useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputGroup,
  InputRightElement,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//local
import { useModalforms } from "../../../hooks/useActions";
import { usePostAuth } from "./../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/Index";
import { isEmail, isPhone } from "../../helpers/helperFunction";
import EyeInput from "../../ui/EyeInput";
import TextError from "../../ui/TextError";
import BtnForm from "../../ui/BtnForm";
import TextFormEnd from "../../ui/TextFormEnd";
import Inputs from "../../ui/Inputs";

type IModalInterface = {
  onClose: () => void;
};

const Authoration: FC<IModalInterface> = ({ onClose }) => {
  const navigate = useNavigate();
  const [passEye, setPassEye] = useState<boolean>(false);
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorUser, setErrorUser] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");

  const handleChangeEmailPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let emailOrPhone = e.target.value;
    if (isEmail(emailOrPhone)) {
      setErrorUser("");
      setUserName(emailOrPhone);
    } else if (isPhone(emailOrPhone)) {
      setErrorUser("");
      setUserName(emailOrPhone);
    } else {
      setUserName("");
      setErrorUser("Введите почту или номер");
    }
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length) {
      setErrorPassword("");
      setPassword(value);
    } else {
      setPassword("");
      setErrorPassword("Введите пароль");
    }
  };

  const { fetchAuthLogin } = usePostAuth();
  const { loading, authUser } = useAppSelector((state) => state.reducerAuth);

  const { registerModal, forgotPassModal } = useModalforms();

  const handleClick = () => {
    setPassEye(!passEye);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.length && password.length) {
      fetchAuthLogin({ username, password });
    }
  };

  const openRegister = () => {
    registerModal();
  };

  const openForgotPass = () => {
    forgotPassModal();
  };

  useEffect(() => {
    if (authUser.access || authUser.id) {
      navigate("/");
      onClose();
    }
  }, [authUser, navigate, onClose]);

  return (
    <Box w="100%" px={{ sm: "20px" }}>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Box mb="10px">
            <Inputs
              id="emailOrPhone"
              type="text"
              required={true}
              placeholder="Почта или номер*"
              borderColor={errorUser.length ? "#FF0000" : "#AAAAAA"}
              focusBorderColor={errorUser.length ? "#FF0000" : "#174079"}
              onChangeInput={handleChangeEmailPhone}
            />
            <TextError text={errorUser} />
          </Box>
          <Box mb="10px">
            <InputGroup>
              <Inputs
                id="password"
                placeholder="Пароль*"
                type={passEye ? "text" : "password"}
                required={true}
                borderColor={errorPassword.length ? "#FF0000" : "#AAAAAA"}
                focusBorderColor={errorPassword.length ? "#FF0000" : "#174079"}
                onChangeInput={handleChangePassword}
              />
              <InputRightElement width="3rem" h="100%">
                <EyeInput eye={passEye} onClickEye={handleClick} />
              </InputRightElement>
            </InputGroup>
            <TextError text={errorPassword} />
          </Box>
          <Box
            my="10px"
            fontFamily="sans"
            fontWeight="400"
            fontSize="14px"
            display="flex"
            justifyContent="flex-end"
          >
            <Link
              color="rgba(59,113,254,1)"
              onClick={() => {
                openForgotPass();
              }}
            >
              Забыли пароль?
            </Link>
          </Box>
          <BtnForm
            btnText="Войти"
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

export default Authoration;
