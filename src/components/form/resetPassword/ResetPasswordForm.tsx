import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { useAppSelector } from "../../../hooks/Index";
import { useActionResetPassword } from "../../../hooks/useActions";

const ResetPasswordForm = () => {
  const url: string = window.location.href;
  const token: string = url.slice(url.length - 33, url.length);

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
    if (password.length && passwordTwo.length) {
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
                  <Input
                    required
                    id="password"
                    type={passEye ? "text" : "password"}
                    placeholder="Новый пароль*"
                    onChange={handleChangePassword}
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
                      color="#000000"
                      h="100%"
                      display="flex"
                      alignItems="center"
                      cursor="pointer"
                      fontSize={{ base: "20px", sm: "25px" }}
                      onClick={handleClick}
                    >
                      {passEye ? <FiEyeOff /> : <FiEye />}
                    </Box>
                  </InputRightElement>
                </InputGroup>
                <Text fontSize="12px" color="red">
                  {error}
                </Text>
              </Box>
              <Box mb="15px">
                <InputGroup>
                  <Input
                    required
                    id="password_confirm"
                    type={secondPassEye ? "text" : "password"}
                    placeholder="Подтвердите пароль*"
                    onChange={handleChangePasswordTwo}
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
                      color="#000000"
                      h="100%"
                      display="flex"
                      alignItems="center"
                      cursor="pointer"
                      fontSize={{ base: "20px", sm: "25px" }}
                      onClick={handleSecondClick}
                    >
                      {secondPassEye ? <FiEyeOff /> : <FiEye />}
                    </Box>
                  </InputRightElement>
                </InputGroup>
                <Text fontSize="12px" color="red">
                  {errorTwo}
                </Text>
              </Box>
              <Button
                isLoading={loading}
                type="submit"
                colorScheme="blue.600"
                mt={{ base: "10px", sm: "15px" }}
                borderRadius={{ base: "10px", sm: "15px" }}
                fontSize={{ base: "14px", sm: "18px" }}
                fontWeight="medium"
                fontFamily="revert"
                w="100%"
                bg="#007AFF"
                color="white"
                py="25px"
              >
                Изменить
              </Button>
            </FormControl>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default ResetPasswordForm;
