import { Box, Button, FormControl, Input, Link, Text } from "@chakra-ui/react";
import React, { FC, useState, ChangeEvent, FormEvent } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "../../../hooks/Index";

import { useActionForgot, useModalforms } from "../../../hooks/useActions";
import { isEmail, isPhone } from "../../helpers/helperFunction";
import { IForgotPassword } from "../formInterfaces";

const ForgotPassword: FC = () => {
  const [errors, setError] = useState<string>("");
  const [emailPhone, setEmailPhone] = useState<IForgotPassword>({
    email: "",
    phone: "",
  });

  const { loading, error, forgotPassword } = useAppSelector(
    (state) => state.forgotPasswordReducer
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let phoneOrEmail = e.target.value;
    if (isEmail(phoneOrEmail)) {
      setEmailPhone({ email: phoneOrEmail, phone: "" });
      setError("");
    } else if (isPhone(phoneOrEmail)) {
      setEmailPhone({ email: "", phone: phoneOrEmail });
      setError("");
    } else {
      setEmailPhone({ email: "", phone: "" });
      setError("Введите почту или номер телефона");
    }
  };

  const { registerModal } = useModalforms();
  const { fetchForgotPassword } = useActionForgot();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailPhone.email?.length || emailPhone.phone?.length) {
      setError("");
      fetchForgotPassword(emailPhone);
    } else {
      setError("Введите почту или номер телефона");
    }
  };

  const openRegister = () => {
    registerModal();
  };

  return (
    <Box w="100%" px={{ sm: "20px" }}>
      <ToastContainer />
      <form onSubmit={onSubmit}>
        <FormControl>
          <Box mb="10px">
            <Input
              type="text"
              onChange={handleChange}
              sx={{
                "&::placeholder": {
                  color: "#AAAAAA",
                  fontSize: "14px",
                  fontWeight: "medium",
                },
              }}
              placeholder="Почта или номер телефона*"
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
              color="red"
              fontSize="12px"
              fontFamily="500"
              ml={{ base: "5px", sm: "14px" }}
            >
              {errors}
            </Text>
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
            Сбросить пароль
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

export default ForgotPassword;
