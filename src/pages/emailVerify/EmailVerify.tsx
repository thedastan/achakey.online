import { Box, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import LoadBlock from "../../components/ui/LoadBlock";
import { useAppSelector } from "../../hooks/Index";
import { useActionEmailVerify } from "../../hooks/useActions";

const EmailVerifyPage: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  const { loading, authModal, error } = useAppSelector(
    (state) => state.emailVerifyReducer
  );

  const { getEmailVerify } = useActionEmailVerify();

  useEffect(() => {
    !!token && getEmailVerify(token);
  }, []);

  return (
    <>
      {loading ? (
        <Box
          h="100vh"
          w="100vw"
          position="fixed"
          top="0"
          left="0"
          zIndex="50"
          bg="#0B0B0B"
        >
          <LoadBlock />
        </Box>
      ) : (
        <>
          {authModal && <Navigate to="/" />}
          {error.length > 0 && (
            <Box
              h="100vh"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text color="redForm">{error}</Text>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default EmailVerifyPage;
