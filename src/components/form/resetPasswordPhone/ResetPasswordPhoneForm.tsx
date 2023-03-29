import {
  Box,
  Container,
  FormControl,
  HStack,
  InputGroup,
  InputRightElement,
  Link,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/Index";

import {
  useActionEmailVerify,
  useActionResetPasswordPhone,
  useActionSendAgain,
} from "../../../hooks/useActions";
import { getPadTime } from "../../helpers/getPadTime";
import BtnForm from "../../ui/BtnForm";
import EyeInput from "../../ui/EyeInput";
import Inputs from "../../ui/Inputs";
import TextError from "../../ui/TextError";

const ResetPasswordPhoneForm = () => {
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isCounting, setIsCounting] = useState<boolean>(false);

  const minutes: any | number | bigint = getPadTime(Math.floor(timeLeft / 60));
  const seconds = getPadTime(timeLeft - minutes * 60);

  const [passEye, setPassEye] = useState<boolean>(false);
  const [secondPassEye, setSecondPassEye] = useState<boolean>(false);

  const [phone, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password_confirm, setPasswordTwo] = useState<string>("");

  const [errorOne, setError] = useState<string>("");
  const [errorTwo, setErrorTwo] = useState<string>("");

  const [code, setCode] = useState<any>("");
  const [canMoveNext, setCanMoveNext] = useState(true);
  const regex = new RegExp("^(?:([0-9]))*$");

  const { openModalEmailVerify } = useActionEmailVerify();
  const { sendAgainPhone } = useActionSendAgain();

  const navigate = useNavigate();

  const { loading, resetPassPhone, error } = useAppSelector(
    (state) => state.reducerResetPasswordPhone
  );

  if (!!resetPassPhone?.phone) {
    navigate("/");
    openModalEmailVerify(true);
  }

  const handleChange = (e: any) => {
    if (!regex.test(e)) {
      setCanMoveNext(false);
      return;
    }
    setCanMoveNext(true);
    setCode(e);
  };

  const { fetchResetPasswordPhone } = useActionResetPasswordPhone();

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setError("");
    if (value.length >= 6) setPassword(value);
    else {
      setError("Введите не менее 6 символов");
    }
  };

  const handleChangePasswordTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setErrorTwo("");
    if (value === password) setPasswordTwo(value);
    else {
      setErrorTwo("Пароли не совпадают");
    }
  };

  const handleClick = () => {
    setPassEye(!passEye);
  };

  const handleSecondClick = () => {
    setSecondPassEye(!secondPassEye);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length >= 6 && password_confirm.length >= 6) {
      if (password === password_confirm) {
        fetchResetPasswordPhone({ phone, code, password, password_confirm });
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((timeLeft: number) => (timeLeft >= 1 ? timeLeft - 1 : 0));
    }, 1000);
    if (timeLeft === 0) setIsCounting(true);
    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  useEffect(() => {
    let number = sessionStorage.getItem("phoneNumber") || "";
    if (number.length) {
      setPhoneNumber(number);
    } else {
      console.log("mikjolklok");
    }
  }, []);

  return (
    <Box h="100vh" w="100%" display="flex" alignItems="center">
      <Container maxW="1220px">
        <Box w={["100%", "90%", "460px"]} mx="auto">
          <Text
            textAlign="center"
            color="white"
            fontSize="4xl"
            fontFamily="sans"
            fontWeight="medium"
            mb="10px"
          >
            Новый пароль
          </Text>
          <Box w="100%" px={{ sm: "20px" }}>
            <Text
              textAlign="center"
              color="#777E90"
              fontFamily="Poppins"
              fontWeight="400"
              fontSize="14px"
            >
              Мы отправили ваш код на номер {phone}
            </Text>
            <HStack display="flex" mt="10px" justifyContent="center">
              <PinInput
                size={{ base: "md", sm: "lg" }}
                type="number"
                manageFocus={canMoveNext}
                value={code}
                onChange={handleChange}
              >
                <PinInputField bg="white" py={{ base: "20px", sm: "25px" }} />
                <PinInputField bg="white" py={{ base: "20px", sm: "25px" }} />
                <PinInputField bg="white" py={{ base: "20px", sm: "25px" }} />
                <PinInputField bg="white" py={{ base: "20px", sm: "25px" }} />
              </PinInput>
            </HStack>
            <Text
              textAlign="center"
              my="10px"
              color="#777E90"
              fontSize="16px"
              fontFamily="sans"
            >
              {minutes}:{seconds}
            </Text>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              my="10px"
              fontFamily="Roboto"
              fontWeight="400"
              fontSize="14px"
            >
              <Link
                color="#4285F4"
                display={!!isCounting ? "block" : "none"}
                onClick={() => {
                  sendAgainPhone(phone);
                }}
              >
                Отправить еще раз
              </Link>
            </Box>
          </Box>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Box my="15px">
                <InputGroup>
                  <Inputs
                    id="password"
                    placeholder="Новый пароль*"
                    type={passEye ? "text" : "password"}
                    required={true}
                    borderColor="#AAAAAA"
                    focusBorderColor="#174079"
                    onChangeInput={handleChangePassword}
                  />
                  <InputRightElement width="3rem" h="100%">
                    <EyeInput eye={passEye} onClickEye={handleClick} />
                  </InputRightElement>
                </InputGroup>
                <TextError text={errorOne} />
              </Box>
              <Box mb="15px">
                <InputGroup>
                  <Inputs
                    id="password_confirm"
                    placeholder="Подтвердите пароль*"
                    type={secondPassEye ? "text" : "password"}
                    required={true}
                    borderColor="#AAAAAA"
                    focusBorderColor="#174079"
                    onChangeInput={handleChangePasswordTwo}
                  />
                  <InputRightElement width="3rem" h="100%">
                    <EyeInput
                      eye={secondPassEye}
                      onClickEye={handleSecondClick}
                    />
                  </InputRightElement>
                </InputGroup>
                <TextError text={errorTwo} />
              </Box>
              <BtnForm
                btnText="Изменить"
                isLoading={loading}
                bg="#007AFF"
                color="white"
                colorSceme="blue.600"
                width="100%"
              />
            </FormControl>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default ResetPasswordPhoneForm;
