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
import { useActionChangePassword } from "../../../hooks/useActions";
import BtnForm from "../../ui/BtnForm";
import EyeInput from "../../ui/EyeInput";
import Inputs from "../../ui/Inputs";
import TextError from "../../ui/TextError";

const ChangePasswordForm = () => {
  const [passEye, setPassEye] = useState<boolean>(false);
  const [secondPassEye, setSecondPassEye] = useState<boolean>(false);
  const [thirdPassEye, setThirdPassEye] = useState<boolean>(false);

  const [old_password, setOldPassword] = useState<string>("");
  const [new_password, setNewPassword] = useState<string>("");
  const [confirm_new_password, setConfirmPassword] = useState<string>("");

  const [error_old, setErrorOld] = useState<string>("");
  const [error_new, setErrorNew] = useState<string>("");
  const [error_confirm, setErrorConfirm] = useState<string>("");

  const { loading } = useAppSelector((state) => state.reducerChangePassword);

  const { fetchChangePassword } = useActionChangePassword();

  const handleClick = () => {
    setPassEye(!passEye);
  };

  const handleSecondClick = () => {
    setSecondPassEye(!secondPassEye);
  };

  const handleThirdClick = () => {
    setThirdPassEye(!thirdPassEye);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length) {
      setErrorOld("");
      setOldPassword(value);
    } else {
      setErrorOld("Введите текущий пароль");
    }
  };

  const handleChangeTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length) {
      setErrorNew("");
      if (value.length > 5) {
        setErrorNew("");
        setNewPassword(e.target.value);
      } else {
        setErrorNew("Введите неменее 6 символов");
      }
    } else {
      setErrorNew("Введите новый пароль");
    }
  };

  const handleChangeThree = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length) {
      setErrorConfirm("");
      if (new_password === value) {
        setErrorConfirm("");
        setConfirmPassword(e.target.value);
      } else {
        setErrorConfirm("Пароли не совподают");
      }
    } else {
      setErrorConfirm("Подтвердите пароль");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (old_password.length && new_password === confirm_new_password) {
      fetchChangePassword({ old_password, new_password, confirm_new_password });
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
            Изменить пароль
          </Text>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Box mb="15px">
                <InputGroup>
                  <Inputs
                    id="password"
                    placeholder="Текущий пароль*"
                    type={passEye ? "text" : "password"}
                    required={true}
                    borderColor="#AAAAAA"
                    focusBorderColor="#174079"
                    onChangeInput={handleChange}
                  />
                  <InputRightElement width="3rem" h="100%">
                    <EyeInput eye={passEye} onClickEye={handleClick} />
                  </InputRightElement>
                </InputGroup>
                <TextError text={error_old} />
              </Box>
              <Box mb="15px">
                <InputGroup>
                  <Inputs
                    id="new_password"
                    placeholder="Новый пароль*"
                    type={secondPassEye ? "text" : "password"}
                    required={true}
                    borderColor="#AAAAAA"
                    focusBorderColor="#174079"
                    onChangeInput={handleChangeTwo}
                  />
                  <InputRightElement width="3rem" h="100%">
                    <EyeInput
                      eye={secondPassEye}
                      onClickEye={handleSecondClick}
                    />
                  </InputRightElement>
                </InputGroup>
                <TextError text={error_new} />
              </Box>
              <Box mb="15px">
                <InputGroup>
                  <Inputs
                    id="confirm_password"
                    placeholder="Подтвердите пароль*"
                    type={thirdPassEye ? "text" : "password"}
                    required={true}
                    borderColor="#AAAAAA"
                    focusBorderColor="#174079"
                    onChangeInput={handleChangeThree}
                  />
                  <InputRightElement width="3rem" h="100%">
                    <EyeInput
                      eye={thirdPassEye}
                      onClickEye={handleThirdClick}
                    />
                  </InputRightElement>
                </InputGroup>
                <TextError text={error_confirm} />
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

export default ChangePasswordForm;
