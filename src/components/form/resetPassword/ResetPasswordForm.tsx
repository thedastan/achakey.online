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
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const ResetPasswordForm = () => {
  const [passEye, setPassEye] = useState<boolean>(false);
  const [secondPassEye, setSecondPassEye] = useState<boolean>(false);

  const handleClick = () => {
    setPassEye(!passEye);
  };

  const handleSecondClick = () => {
    setSecondPassEye(!secondPassEye);
  };

  const token = "1234fyfytf54er5tfty";
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("reset");
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
              <Box mb="15px">
                <InputGroup>
                  <Input
                    required
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
