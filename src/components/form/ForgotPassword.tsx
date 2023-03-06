import { Box, Button, FormControl, Input, Link, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IForgotPasword } from "./formInterfaces";
import { useModalforms } from "./../../hooks/useActions";

const ForgotPassword: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasword>();

  const { registerModal } = useModalforms();

  const onSubmit: SubmitHandler<IForgotPasword> = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  const openRegister = () => {
    registerModal();
  };

  return (
    <Box w="100%" px={{ sm: "20px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Box mb="10px">
            <Input
              {...register("phone", { required: "введите номер" })}
              type="tel"
              placeholder="Номер телефона*"
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
              {errors.phone && errors.phone?.message}
            </Text>
          </Box>
          <Button
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
            Сбросить пароль
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

export default ForgotPassword;
