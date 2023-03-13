import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const AccountManagementForm = () => {
  const [passEye, setPassEye] = useState<boolean>(false);

  const handleClick = () => {
    setPassEye(!passEye);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
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
            Аккаунт
          </Text>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Box mb="15px">
                <FormLabel
                  color="#C9C9C9"
                  fontSize="12px"
                  fontFamily="revert"
                  fontWeight="500"
                  htmlFor="emailPhone"
                >
                  Изменить почту
                </FormLabel>
                <Input
                  id="emailPhone"
                  required
                  placeholder="Введите почту"
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
              </Box>
              <Box mb="15px">
                <InputGroup>
                  <Input
                    id="password"
                    type={passEye ? "text" : "password"}
                    placeholder="Потвердить пароль"
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
              </Box>
              <Box my="15px">
                <FormLabel
                  color="#C9C9C9"
                  fontSize="12px"
                  fontFamily="revert"
                  fontWeight="500"
                  htmlFor="phoneNumber"
                >
                  Добавить номер
                </FormLabel>
                <Input
                  id="phoneNumber"
                  placeholder="Номер"
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
              </Box>
              <Box mb="15px">
                <FormLabel
                  color="#C9C9C9"
                  fontSize="12px"
                  fontFamily="revert"
                  fontWeight="500"
                  htmlFor="name"
                >
                  Добавить имя
                </FormLabel>
                <Input
                  id="name"
                  placeholder="Имя"
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
              </Box>
              <Button
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
                Сохранить
              </Button>
            </FormControl>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default AccountManagementForm;
