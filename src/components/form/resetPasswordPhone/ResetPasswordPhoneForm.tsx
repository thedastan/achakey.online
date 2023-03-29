import {
  Box,
  Container,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";

import { useActionResetPasswordPhone } from "../../../hooks/useActions";
import BtnForm from "../../ui/BtnForm";
import EyeInput from "../../ui/EyeInput";
import Inputs from "../../ui/Inputs";
import TextError from "../../ui/TextError";

const ResetPasswordPhoneForm = () => {
  const [passEye, setPassEye] = useState<boolean>(false);
  const [secondPassEye, setSecondPassEye] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordTwo, setPasswordTwo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [errorTwo, setErrorTwo] = useState<string>("");

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
    if (password.length >= 6 && passwordTwo.length >= 6) {
      console.log("reset password");
    }
  };

  const [time, setTime] = useState("00:01:00");
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const [hours, minutes, seconds] = time.split(":").map(parseFloat);
      const totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;
      if (totalSeconds <= 0) {
        clearInterval(intervalRef.current);
        return;
      }
      const newSeconds = totalSeconds - 1;
      const newHours = Math.floor(newSeconds / 3600);
      const newMinutes = Math.floor((newSeconds - newHours * 3600) / 60);
      const newTime = `${newHours.toString().padStart(2, "0")}:${newMinutes
        .toString()
        .padStart(2, "0")}:${(newSeconds - newHours * 3600 - newMinutes * 60)
        .toString()
        .padStart(2, "0")}`;
      setTime(newTime);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [time]);

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
              Мы отправили ваш код на номер +996500032640
            </Text>
            <HStack display="flex" mt="10px" justifyContent="center">
              <PinInput size={{ base: "md", sm: "lg" }}>
                <PinInputField bg="white" py={{ base: "20px", sm: "25px" }} />
                <PinInputField bg="white" py={{ base: "20px", sm: "25px" }} />
                <PinInputField bg="white" py={{ base: "20px", sm: "25px" }} />
                <PinInputField bg="white" py={{ base: "20px", sm: "25px" }} />
              </PinInput>
            </HStack>
            <Box display="flex" justifyContent="center" mt="10px">
              <Input
                w="100px"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                border="none"
                boxShadow="none"
                color="#777E90"
                focusBorderColor="none"
                _focus={{
                  boxShadow: "none",
                }}
                sx={{
                  border: "none",
                  outline: "none",
                  "::-webkit-calendar-picker-indicator": {
                    display: "none",
                  },
                  "::-webkit-inner-spin-button": {
                    display: "none",
                  },
                  "::-webkit-clear-button": {
                    display: "none",
                  },
                }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              my="10px"
              fontFamily="Roboto"
              fontWeight="400"
              fontSize="14px"
            >
              <Link color="#4285F4">Отправить еще раз</Link>
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
                <TextError text={error} />
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
                isLoading={false}
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
