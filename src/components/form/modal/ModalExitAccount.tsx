import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

import BtnForm from "../../ui/BtnForm";
import ModalComponent from "../../ui/ModalComponent";
import { IModal } from "./action/ModalActionType";

const ModalExitAccount: React.FC<IModal> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const logoutAccount = () => {
    onClose();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user-id");
    navigate("/");
    window.location.reload();
  };

  const ExitTextBtn = () => {
    return (
      <>
        <Text
          textAlign="center"
          fontFamily="sans"
          fontSize="16px"
          mb="20px"
          color="#1A1A25"
        >
          Вы действительно хотите выйти из этой учетной записи?
        </Text>
        <Box display="flex" justifyContent="center">
          <BtnForm
            bg="#007AFF"
            btnText="Выйти"
            color="white"
            colorSceme="blue.400"
            width={{ base: "90%", sm: "200px" }}
            onClickBtn={logoutAccount}
          />
        </Box>
      </>
    );
  };

  return (
    <>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        headerText=""
        children={<ExitTextBtn />}
        exitBtn={true}
      />
    </>
  );
};

export default ModalExitAccount;
