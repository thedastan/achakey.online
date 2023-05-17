import {
  Box,
  FormControl,
  InputGroup,
  InputRightElement,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

//local
import { useModalforms, usePostRegistr } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/Index";
import { isEmail, isPhone } from "../../helpers/helperFunction";
import Inputs from "../../ui/Inputs";
import BtnForm from "../../ui/BtnForm";
import EyeInput from "../../ui/EyeInput";
import TextError from "../../ui/TextError";
import TextFormEnd from "../../ui/TextFormEnd";
import WordIndex from "../../ui/WordIndex";
import { IModalInterface } from "../auth/formAuthInterfaces";
import GoogleRegister from "./GoogleRegister";

const Registration: FC<IModalInterface> = ({ onClose }) => {
  const [passEye, setPassEye] = useState<boolean>(false);
  const [secondPassEye, setSecondPassEye] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [phone, setPhoneNumber] = useState<string>("");
  const [password, setPassword1] = useState<string>("");
  const [password_confirm, setPassword2] = useState<string>("");
  const [agreement, setAgreement] = useState(false);

  const [errorEmailPhone, setErrorEmailPhone] = useState<string>("");
  const [errorPas, setErrorPas] = useState<string>("");
  const [errorPasConfirm, setErrorPasConfirm] = useState<string>("");

  const { fetchRegisterEmail, fetchRegisterPhone, fetchErrorRegister } =
    usePostRegistr();
  const { loginModal, enterSequirityCode } = useModalforms();
  const navigate = useNavigate();

  const { loading, phoneNumber, error } = useAppSelector(
    (state) => state.registerReducer
  );

  const { loginUser } = useAppSelector((state) => state.reducerAuth);

  if (isPhone(phoneNumber)) {
    enterSequirityCode();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let emailOrPhone = e.target.value;
    if (isEmail(emailOrPhone)) {
      setErrorEmailPhone("");
      setEmail(emailOrPhone);
    } else if (isPhone(emailOrPhone)) {
      setErrorEmailPhone("");
      setPhoneNumber(emailOrPhone);
    } else {
      setEmail("");
      setPhoneNumber("");
      setErrorEmailPhone("Введите почту или номер");
    }
  };

  const passwordChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setErrorPas("");
    if (value.length < 6) {
      setErrorPas("Введите не менее 6 символов");
    } else {
      setErrorPas("");
      setPassword1(value);
    }
  };

  const passwordChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (password === value) {
      setErrorPasConfirm("");
      setPassword2(e.target.value);
    } else {
      setErrorPasConfirm("Пароли не совпадают");
    }
  };

  const handleClick = () => {
    setPassEye(!passEye);
  };

  const handleSecondClick = () => {
    setSecondPassEye(!secondPassEye);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorPasConfirm("");
    setErrorEmailPhone("");
    if (password === password_confirm) {
      if (email.length > 5) {
        fetchRegisterEmail({ email, password, password_confirm, agreement });
      } else if (phone.length > 5) {
        fetchRegisterPhone({ phone, password, password_confirm, agreement });
      } else {
        setErrorEmailPhone("Введите почту или номер");
      }
    } else {
      setErrorPasConfirm("Пароли не совпадают");
    }
  };

  const openLogin = () => {
    loginModal();
    fetchErrorRegister();
  };

  if (!!loginUser.access) {
    onClose();
    navigate("/");
  }

  return (
    <Box w="100%" px={{ sm: "20px" }}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <WordIndex text="войдите через" size="16px" />
          <Box pt="10px" pb="20px">
            <GoogleRegister />
          </Box>
          <WordIndex text="или создать аккаунт" size="12px" />
          <Box my="10px">
            <Inputs
              id="emailOrPhone"
              type="text"
              required={true}
              placeholder="Почта или номер*"
              borderColor={errorEmailPhone.length ? "#FF0000" : "#AAAAAA"}
              focusBorderColor={errorEmailPhone.length ? "#FF0000" : "#174079"}
              onChangeInput={handleChange}
            />
            <TextError
              text={
                errorEmailPhone.length
                  ? errorEmailPhone
                  : error.length
                  ? error
                  : ""
              }
            />
          </Box>
          <Box mb="10px">
            <InputGroup>
              <Inputs
                id="password"
                type={passEye ? "text" : "password"}
                required={true}
                placeholder="Пароль*"
                borderColor={errorPas.length ? "#FF0000" : "#AAAAAA"}
                focusBorderColor={errorPas.length ? "#FF0000" : "#174079"}
                onChangeInput={passwordChange1}
              />
              <InputRightElement width="3rem" h="100%">
                <EyeInput eye={passEye} onClickEye={handleClick} />
              </InputRightElement>
            </InputGroup>
            <TextError text={errorPas} />
          </Box>
          <Box mb="10px">
            <InputGroup>
              <Inputs
                id="password_confirm"
                type={secondPassEye ? "text" : "password"}
                required={true}
                placeholder="Подтвердите пароль*"
                borderColor={errorPasConfirm.length ? "#FF0000" : "#AAAAAA"}
                focusBorderColor={
                  errorPasConfirm.length ? "#FF0000" : "#174079"
                }
                onChangeInput={passwordChange2}
              />
              <InputRightElement width="3rem" h="100%">
                <EyeInput eye={secondPassEye} onClickEye={handleSecondClick} />
              </InputRightElement>
            </InputGroup>
            <TextError text={errorPasConfirm} />
          </Box>

          <Checkbox
            ml="0"
            mt="27px"
            mb="17px"
            colorScheme="blue"
            borderColor="#353945"
            opacity="0.5"
            fontWeight="400"
            fontSize="12px"
            fontFamily="Roboto,sans-serif"
            onClick={() => setAgreement(true)}
          >
            <Link to="/privacy-policy" onClick={onClose}>
              Я согласен с Условиями использования
            </Link>
          </Checkbox>

          <BtnForm
            isLoading={loading}
            btnText="Зарегистрироваться"
            bg="#2A3654"
            color="white"
            colorSceme="blue"
            width="100%"
          />
          <TextFormEnd
            questionText="У вас уже есть аккаунт?"
            textWord="Авторизоваться"
            onClickLink={openLogin}
          />
        </FormControl>
      </form>
    </Box>
  );
};

export default Registration;
