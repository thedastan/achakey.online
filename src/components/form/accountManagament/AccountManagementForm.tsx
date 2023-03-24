import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppSelector } from "../../../hooks/Index";
import { useActionUser } from "../../../hooks/useActions";
import LoadBlock from "../../ui/LoadBlock";
import { UserDetails } from "../../user/types";
import BtnForm from "../../ui/BtnForm";
import TextError from "../../ui/TextError";
import { emailPattern, phonePattern } from "../../helpers/helperFunction";

const AccountManagementForm = () => {
  const { userDetails, loading } = useAppSelector((state) => state.reducerUser);

  const { fetchUserDetails, fetchChangeUserFields } = useActionUser();

  const userId = JSON.parse(localStorage.getItem("user-id") as string);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDetails>();

  const onSubmit: SubmitHandler<UserDetails> = (data) => {
    fetchChangeUserFields(data);
  };

  useEffect(() => {
    fetchUserDetails(userId);
  }, []);

  return (
    <Box h="100vh" w="100%" display="flex" alignItems="center">
      <Container maxW="1220px">
        <ToastContainer />
        {!loading && userDetails.id ? (
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <input
                  defaultValue={userDetails.id}
                  type="hidden"
                  {...register("id")}
                />
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
                    placeholder="Введите почту"
                    defaultValue={userDetails.email}
                    {...register("email", {
                      required: !!userDetails.email ? true : false,
                      pattern: emailPattern,
                    })}
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
                  <TextError text={errors.email ? "Введите почту" : ""} />
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
                    defaultValue={userDetails.phone}
                    {...register("phone", {
                      required: !!userDetails.phone ? true : false,
                      pattern: phonePattern,
                    })}
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
                  <TextError
                    text={errors.phone ? "Введите номер телефона" : ""}
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
                    defaultValue={userDetails.username}
                    {...register("username")}
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
                <BtnForm
                  btnText="Сохранить"
                  bg="#007AFF"
                  color="white"
                  width="100%"
                  colorSceme="blue.600"
                />
              </FormControl>
            </form>
          </Box>
        ) : (
          <LoadBlock />
        )}
      </Container>
    </Box>
  );
};

export default AccountManagementForm;
