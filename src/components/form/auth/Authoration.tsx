import React, { FC, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiEyeOff, FiEye } from "react-icons/fi";
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
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useModalforms } from "../../../hooks/useActions";
import { usePostAuth } from "./../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/Index";
import { IInputAuth } from "../formInterfaces";

type IModalInterface = {
  onClose: () => void;
};

const Authoration: FC<IModalInterface> = ({ onClose }) => {
  const navigate = useNavigate();
  const [passEye, setPassEye] = useState(false);

  const { fetchAuthLogin } = usePostAuth();
  const { loading, authUser } = useAppSelector((state) => state.reducerAuth);

  const { registerModal, forgotPassModal } = useModalforms();

  const handleClick = () => {
    setPassEye(!passEye);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputAuth>();

  const onSubmit: SubmitHandler<IInputAuth> = (data) => {
    fetchAuthLogin(data);
  };

  const openRegister = () => {
    registerModal();
  };

  const openForgotPass = () => {
    forgotPassModal();
  };

  useEffect(() => {
    if (authUser.access || authUser.id) {
      navigate("/");
      onClose();
    }
  }, [authUser, navigate, onClose]);

  return (
    <Box w="100%" px={{ sm: "20px" }}>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Box mb="10px">
            <Input
              {...register("username", {
                required: "введите почту или номер",
              })}
              id="emailOrNumber"
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
              py={{ base: "10px", sm: "25px" }}
              color="#174079"
            />
            <Text
              color="red.500"
              fontSize="12px"
              ml={{ base: "5px", sm: "14px" }}
            >
              {errors.username && errors.username?.message}
            </Text>
          </Box>
          <Box mb="10px">
            <InputGroup>
              <Input
                {...register("password", { required: "введите пароль" })}
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
            <Text
              color="red.500"
              fontSize="12px"
              ml={{ base: "5px", sm: "14px" }}
            >
              {errors.password && errors.password?.message}
            </Text>
          </Box>
          <Box
            my="10px"
            fontFamily="sans"
            fontWeight="400"
            fontSize="14px"
            display="flex"
            justifyContent="flex-end"
          >
            <Link
              color="rgba(59,113,254,1)"
              onClick={() => {
                openForgotPass();
              }}
            >
              Забыли пароль?
            </Link>
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
            Войти
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
              Нет аккаунта?
            </Text>
            <Link color="rgba(59,113,254,1)" onClick={openRegister}>
              Зарегистрироватсься?
            </Link>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default Authoration;
