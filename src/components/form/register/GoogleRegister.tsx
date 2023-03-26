import { Box, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

import { usePostAuth } from "../../../hooks/useActions";
import { ID_CLIENT } from "../../helpers/idClientGoogle";

const GoogleRegister = () => {
  const { fetchAuthGoogle } = usePostAuth();

  function handleCallbackResponse(response: any) {
    const token = response.credential;
    fetchAuthGoogle(token);
  }

  useEffect(() => {
    /* global google */
    //@ts-ignore
    google.accounts.id.initialize({
      client_id: ID_CLIENT,
      callback: handleCallbackResponse,
    });
    //@ts-ignore
    google.accounts.id.renderButton(document.getElementById("signIdDiv"), {
      theme: "filled",
    });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div id="signIdDiv"></div>
      {/* <Box
        id="signIdDiv"
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
      >
        <FcGoogle />
        <Text ml="5px">Google аккаунт</Text>
      </Box> */}
    </div>
  );
};

export default GoogleRegister;
