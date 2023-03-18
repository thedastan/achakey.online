import { Box, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

import { usePostRegistr } from "../../../hooks/useActions";

const BtnGoogle: FC = () => {
  const { fetchRegisterGoogle } = usePostRegistr();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const user = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => {
          console.log(res.data);
          const idToken = res.data.id_token;
          // fetchRegisterGoogle(idToken)
          console.log()
        })
        .catch((err) => {
          console.log(err, "error");
        });
    },
  });

  return (
    <Box
      bg="white"
      color="2A3654"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontWeight="700"
      my="0.3rem"
      textAlign="center"
      fontFamily="sans"
      fontSize="16px"
      py="0.8rem"
      px="2.2rem"
      borderRadius="12px"
      cursor="pointer"
      onClick={() => {
        login();
      }}
    >
      <FcGoogle />
      <Text ml="5px">Google аккаунт</Text>
    </Box>
  );
};

export default BtnGoogle;
