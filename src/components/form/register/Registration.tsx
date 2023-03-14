import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";

//local
import { useModalforms, usePostRegistr } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/Index";
import { isEmail, isPhone } from "../../helpers/helperFunction";

const Registration: FC = () => {
  const [passEye, setPassEye] = useState<boolean>(false);
  const [secondPassEye, setSecondPassEye] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword1] = useState<string>("");
  const [password_confirm, setPassword2] = useState<string>("");

  const [errorEmailPhone, setErrorEmailPhone] = useState<string>("");
  const [errorPas, setErrorPas] = useState<string>("");
  const [errorPasConfirm, setErrorPasConfirm] = useState<string>("");

  const enterMethod = [
    {
      icon: <FcGoogle />,
      text: "Google",
    },
    {
      icon: <BsApple />,
      text: "Apple",
    },
  ];

  const { fetchRegister, fetchRegisterGoogle } = usePostRegistr();
  const { loginModal } = useModalforms();

  const { loading, registerUser, error } = useAppSelector(
    (state) => state.registerReducer
  );

  const login = useGoogleLogin({
    onSuccess: (tokenResponse: { access_token: string; }) => {
      if (tokenResponse.access_token) {
        console.log(tokenResponse);
        fetchRegisterGoogle(tokenResponse.access_token);
      }
    },
  });

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
      setErrorPas("Не менее 6 символов");
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
      if (email.length > 0) {
        fetchRegister({ email, password, password_confirm });
      } else if (phoneNumber.length > 0) {
        fetchRegister({ phoneNumber, password, password_confirm });
      } else {
        setErrorEmailPhone("Введите почту или номер");
      }
    } else {
      setErrorPasConfirm("Пароли не совпадают");
    }
  };

  const openLogin = () => {
    loginModal();
  };

  return (
    <Box w="100%" px={{ sm: "20px" }}>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Text
            textAlign="center"
            color="#353535"
            fontFamily="sans"
            fontWeight="400"
            fontSize="14px"
          >
            войдите через
          </Text>
          <Box
            fontFamily="sans"
            fontSize="16px"
            fontWeight="700"
            display="flex"
            flexDirection={{ base: "column", sm: "row" }}
            justifyContent="space-between"
          >
            {enterMethod.map((el, idx) => (
              <Box
                key={idx}
                bg={idx === 0 ? "#ffffff" : "#141416"}
                w={{ base: "100%", sm: "45%" }}
                borderRadius="12px"
                color={idx === 0 ? "#2A3654" : "#FCFCFD"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                my="0.3rem"
                textAlign="center"
                fontFamily="sans"
                py="0.6rem"
                px="2.2rem"
                cursor="pointer"
                onClick={() => {
                  if (idx === 0) {
                    login();
                  }
                }}
              >
                {el.icon}
                <Text ml="5px">{el.text}</Text>
              </Box>
            ))}
          </Box>
          <Text
            textAlign="center"
            color="#353535"
            fontFamily="sans"
            fontWeight="400"
            fontSize="14px"
          >
            или создать аккаунт
          </Text>
          <Box mt="10px">
            <Box mb="10px">
              <Input
                required
                onChange={handleChange}
                id="email"
                type="text"
                placeholder="Почта или номер*"
                sx={{
                  "&::placeholder": {
                    color: "#AAAAAA",
                    fontSize: "14px",
                    fontWeight: "medium",
                  },
                }}
                border="1px"
                borderColor="#AAAAAA"
                focusBorderColor="#174079"
                bg="#ffffff"
                borderRadius={{ base: "10px", sm: "15px" }}
                fontSize="14px"
                fontWeight="medium"
                fontFamily="revert"
                py={{ base: "10px", sm: "25px" }}
                color="#174079"
              />
              <Text
                color="red"
                fontSize="12px"
                ml={{ base: "5px", sm: "14px" }}
              >
                {errorEmailPhone}
              </Text>
            </Box>
            <Box mb="10px">
              <InputGroup>
                <Input
                  required
                  onChange={passwordChange1}
                  id="password"
                  type={passEye ? "text" : "password"}
                  placeholder="Пароль*"
                  sx={{
                    "&::placeholder": {
                      color: "#AAAAAA",
                      fontSize: "14px",
                      fontWeight: "medium",
                    },
                  }}
                  border="1px"
                  borderColor="#AAAAAA"
                  focusBorderColor="#174079"
                  bg="#ffffff"
                  borderRadius={{ base: "10px", sm: "15px" }}
                  fontSize="14px"
                  fontWeight="medium"
                  fontFamily="revert"
                  py={{ base: "10px", sm: "25px" }}
                  color="#174079"
                />
                <InputRightElement width="3rem" h="100%">
                  <Box
                    color="#2A3654"
                    h="100%"
                    display="flex"
                    alignItems="center"
                    cursor="pointer"
                    fontSize={{ base: "20px", sm: "25px" }}
                    onClick={handleClick}
                  >
                    {passEye ? <BsEyeSlashFill /> : <BsEyeFill />}
                  </Box>
                </InputRightElement>
              </InputGroup>
              <Text
                color="red"
                fontSize="12px"
                ml={{ base: "5px", sm: "14px" }}
              >
                {errorPas}
              </Text>
            </Box>
            <Box mb="10px">
              <InputGroup>
                <Input
                  required
                  onChange={passwordChange2}
                  id="password_confirm"
                  type={secondPassEye ? "text" : "password"}
                  placeholder="Подтвердите пароль*"
                  sx={{
                    "&::placeholder": {
                      color: "#AAAAAA",
                      fontSize: "14px",
                      fontWeight: "medium",
                    },
                  }}
                  border="1px"
                  borderColor="#AAAAAA"
                  focusBorderColor="#174079"
                  bg="#ffffff"
                  borderRadius={{ base: "10px", sm: "15px" }}
                  fontSize="14px"
                  fontWeight="medium"
                  fontFamily="revert"
                  py={{ base: "10px", sm: "25px" }}
                  color="#174079"
                />
                <InputRightElement width="3rem" h="100%">
                  <Box
                    color="#2A3654"
                    h="100%"
                    display="flex"
                    alignItems="center"
                    cursor="pointer"
                    fontSize={{ base: "20px", sm: "25px" }}
                    onClick={handleSecondClick}
                  >
                    {secondPassEye ? <BsEyeSlashFill /> : <BsEyeFill />}
                  </Box>
                </InputRightElement>
              </InputGroup>
              <Text
                color="red"
                fontSize="12px"
                ml={{ base: "5px", sm: "14px" }}
              >
                {errorPasConfirm}
              </Text>
            </Box>
          </Box>
          <Button
            isLoading={loading}
            mt={{ base: "10px", sm: "15px" }}
            type="submit"
            bg="#2A3654"
            color="white"
            fontWeight="600"
            fontFamily="revert"
            w="100%"
            py="25px"
            colorScheme="blue"
            fontSize={{ base: "14px", sm: "18px" }}
            borderRadius="14px"
          >
            Зарегистрироваться
          </Button>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={{ base: "column", sm: "row" }}
            my="10px"
            fontFamily="sans"
            fontWeight="400"
            fontSize="14px"
          >
            <Text color="#353535" pr="5px">
              У вас уже есть аккаунт?
            </Text>
            <Link color="rgba(59,113,254,1)" onClick={openLogin}>
              Авторизоваться
            </Link>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default Registration;
