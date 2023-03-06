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
import React, { FC, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

//local
import { useModalforms, usePostRegistr } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/Index";
import { IInputRegister } from "../formInterfaces";

const Registration: FC = () => {
  const [passEye, setPassEye] = useState<boolean>(false);
  const [secondPassEye, setSecondPassEye] = useState<boolean>(false);
  const { fetchRegister } = usePostRegistr();
  const { loginModal } = useModalforms();

  const { loading, registerUser, error } = useAppSelector(
    (state) => state.registerReducer
  );

  console.log(loading, registerUser, error);

  const handleClick = () => {
    setPassEye(!passEye);
  };

  const handleSecondClick = () => {
    setSecondPassEye(!secondPassEye);
  };

  const enterMethod = [
    {
      icon: <FcGoogle />,
      text: "Google",
    },
    {
      icon: <BsApple />,
      text: "Apple",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputRegister>();

  const onSubmit: SubmitHandler<IInputRegister> = (data) => {
    fetchRegister(data);
  };

  const openLogin = () => {
    loginModal();
  };

  return (
    <Box w="100%" px={{ sm: "20px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Text
            textAlign="center"
            color="#353535"
            fontFamily="Poppins"
            fontWeight="400"
            fontSize="14px"
          >
            войдите через
          </Text>
          <Box
            fontFamily="Roboto"
            fontSize="16px"
            py="5px"
            fontWeight="700"
            display="flex"
            flexDirection={{ base: "column", sm: "row" }}
            justifyContent="space-between"
          >
            {enterMethod.map((el, idx) => (
              <Box
                key={idx}
                bg={idx === 0 ? "#ffffff" : "#141416"}
                borderRadius="12px"
                color={idx === 0 ? "#2A3654" : "#FCFCFD"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                my="0.3rem"
                textAlign="center"
                py="0.6rem"
                px="2.2rem"
                cursor="pointer"
              >
                {el.icon}
                <Text ml="5px">{el.text}</Text>
              </Box>
            ))}
          </Box>
          <Text
            textAlign="center"
            color="#353535"
            fontFamily="Poppins"
            fontWeight="400"
            fontSize="14px"
          >
            или создать аккаунт
          </Text>
          <Box mt="10px">
            <Box mb="10px">
              <Input
                {...register("username", { required: "введите имя" })}
                id="username"
                type="text"
                placeholder="Имя*"
                border="1px"
                borderColor="#174079"
                bg="#ffffff"
                borderRadius={{ base: "10px", sm: "15px" }}
                fontSize="14px"
                py={{ base: "10px", sm: "25px" }}
                color="#000000"
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
              <Input
                {...register("email", {
                  required: "введите почту",
                })}
                id="email"
                type="text"
                placeholder="Почта*"
                border="1px"
                borderColor="#174079"
                bg="#ffffff"
                borderRadius={{ base: "10px", sm: "15px" }}
                fontSize="14px"
                py={{ base: "10px", sm: "25px" }}
                color="#000000"
              />
              <Text
                color="red.500"
                fontSize="12px"
                ml={{ base: "5px", sm: "14px" }}
              >
                {errors.email && errors.email?.message}
              </Text>
            </Box>
            <Box mb="10px">
              <Input
                {...register("phone_number", {
                  required: "введите номер",
                })}
                id="phone_number"
                type="text"
                placeholder="Номер*"
                border="1px"
                borderColor="#174079"
                bg="#ffffff"
                borderRadius={{ base: "10px", sm: "15px" }}
                fontSize="14px"
                py={{ base: "10px", sm: "25px" }}
                color="#000000"
              />
              <Text
                color="red.500"
                fontSize="12px"
                ml={{ base: "5px", sm: "14px" }}
              >
                {errors.phone_number && errors.phone_number?.message}
              </Text>
            </Box>
            <Box mb="10px">
              <InputGroup>
                <Input
                  {...register("password", { required: "введите пароль" })}
                  id="password"
                  type={passEye ? "text" : "password"}
                  placeholder="Пароль*"
                  border="1px"
                  borderColor="#174079"
                  bg="#ffffff"
                  borderRadius={{ base: "10px", sm: "15px" }}
                  fontSize="14px"
                  py={{ base: "10px", sm: "25px" }}
                  color="#000000"
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
              <Text
                color="red.500"
                fontSize="12px"
                ml={{ base: "5px", sm: "14px" }}
              >
                {errors.password && errors.password?.message}
              </Text>
            </Box>
            <Box mb="10px">
              <InputGroup>
                <Input
                  {...register("password_confirm", {
                    required: "повторите пароль",
                  })}
                  id="password_confirm"
                  type={secondPassEye ? "text" : "password"}
                  placeholder="Подтвердите пароль*"
                  border="1px"
                  borderColor="#174079"
                  bg="#ffffff"
                  borderRadius={{ base: "10px", sm: "15px" }}
                  fontSize="14px"
                  py={{ base: "10px", sm: "25px" }}
                  color="#000000"
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
              <Text
                color="red.500"
                fontSize="12px"
                ml={{ base: "5px", sm: "14px" }}
              >
                {errors.password_confirm && errors.password_confirm?.message}
              </Text>
            </Box>
          </Box>
          <Button
            isLoading={loading}
            mt={{ base: "10px", sm: "15px" }}
            type="submit"
            bg="#2A3654"
            color="white"
            fontWeight="600"
            w="100%"
            py="25px"
            colorScheme="blue"
            fontSize={{ base: "14px", sm: "18px" }}
            borderRadius="14px"
          >
            Зарегистрироваться
          </Button>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={{ base: "column", sm: "row" }}
            my="10px"
            fontFamily="Poppins"
            fontWeight="400"
            fontSize="14px"
          >
            <Text color="#353535" pr="5px">
              У вас уже есть аккаунт?
            </Text>
            <Link color="rgba(59,113,254,1)" onClick={openLogin}>
              Авторизоваться
            </Link>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default Registration;
