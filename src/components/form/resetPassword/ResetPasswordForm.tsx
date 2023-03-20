import {
  Box,
  Container,
  FormControl,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { useAppSelector } from "../../../hooks/Index";
import { useActionResetPassword } from "../../../hooks/useActions";
import BtnForm from "../../ui/BtnForm";
import EyeInput from "../../ui/EyeInput";
import Inputs from "../../ui/Inputs";
import TextError from "../../ui/TextError";

const ResetPasswordForm = () => {
  const url: string = window.location.href;
  const token: string = "f61ea0c6fa2461ddc31d0a1c54f1ba2c9dff977fb72";

  const [passEye, setPassEye] = useState<boolean>(false);
  const [secondPassEye, setSecondPassEye] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordTwo, setPasswordTwo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [errorTwo, setErrorTwo] = useState<string>("");

  const { loading } = useAppSelector((state) => state.resetPasswordReducer);
  const { fetchResetPassword } = useActionResetPassword();

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
      fetchResetPassword({ password, token });
    }
  };

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
          <form onSubmit={handleSubmit}>
            <FormControl>
              <input type="hidden" defaultValue={token} />
              <Box mb="15px">
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

export default ResetPasswordForm;
