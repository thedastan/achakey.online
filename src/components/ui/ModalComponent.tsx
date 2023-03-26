import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

type IPorps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  headerText: string;
  exitBtn?: boolean;
};

const ModalComponent: FC<IPorps> = ({
  isOpen,
  onClose,
  children,
  headerText,
  exitBtn,
}) => {
  return (
    <>
      <Modal
        isCentered
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          bg={!!exitBtn ? "#ffffff" : "rgba(252,252,253,0.7)"}
          maxW={["90%", "80%", "560px"]}
          px={{ base: "0", md: "50px" }}
          py="10px"
          borderRadius="21px"
          backdropFilter="blur(14.5px)"
        >
          <ModalHeader
            textAlign="center"
            fontFamily="sans"
            fontWeight="700"
            fontSize={{ base: "28px", sm: "40px" }}
            color="#2A3654"
            lineHeight={{ base: "30px", sm: "42px" }}
            letterSpacing="-0.4px"
          >
            {headerText}
          </ModalHeader>
          {!!exitBtn && <ModalCloseButton />}
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;
