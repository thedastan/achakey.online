import {
  Box,
  Container,
  FormControl,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

import BtnForm from "../../ui/BtnForm";
import EyeInput from "../../ui/EyeInput";
import Inputs from "../../ui/Inputs";
import TextError from "../../ui/TextError";

const ChangePasswordForm = () => {
  const [passEye, setPassEye] = useState<boolean>(false);
  const [secondPassEye, setSecondPassEye] = useState<boolean>(false);
  const [thirdPassEye, setThirdPassEye] = useState<boolean>(false);

  const handleClick = () => {
    setPassEye(!passEye);
  };

  const handleSecondClick = () => {
    setSecondPassEye(!secondPassEye);
  };

  const handleThirdClick = () => {
    setThirdPassEye(!thirdPassEye);
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
          <form>
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
                    onChangeInput={(e: any) => {
                      console.log(e);
                    }}
                  />
                  <InputRightElement width="3rem" h="100%">
                    <EyeInput eye={passEye} onClickEye={handleClick} />
                  </InputRightElement>
                </InputGroup>
                <TextError text={""} />
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
                    onChangeInput={(e: any) => {
                      console.log(e);
                    }}
                  />
                  <InputRightElement width="3rem" h="100%">
                    <EyeInput
                      eye={secondPassEye}
                      onClickEye={handleSecondClick}
                    />
                  </InputRightElement>
                </InputGroup>
                <TextError text={""} />
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
                    onChangeInput={(e: any) => {
                      console.log(e);
                    }}
                  />
                  <InputRightElement width="3rem" h="100%">
                    <EyeInput
                      eye={thirdPassEye}
                      onClickEye={handleThirdClick}
                    />
                  </InputRightElement>
                </InputGroup>
                <TextError text={""} />
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

export default ChangePasswordForm;
