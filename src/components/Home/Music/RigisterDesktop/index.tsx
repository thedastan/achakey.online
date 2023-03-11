import React from 'react';
import {Box, Button, Text, useDisclosure} from "@chakra-ui/react";
import {useModalforms} from "../../../../hooks/useActions";
import ModalUserAuth from "../../../form/modal/ModalUser";
import {getAccessToken} from "../../../helper";

const RegisterDesktop = () => {
    const {loginModal} = useModalforms();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const openModal = () => {
        onOpen();
        loginModal();
    };
    return (
        <Box
            display={{base: "none", sm:"none", md:"none", lg: "flex" ,xl: "flex"}}
            justifyContent="center"
            pos="fixed"
            zIndex="10"
            top="94%"
            right="0%"
            alignItems="center"
            bg="linear-gradient(90deg, #6F7BF7 0%, #00D1FF 101.67%);"
            width="50vw"
            height="52px">
            <ModalUserAuth isOpen={isOpen} onClose={onClose}/>
            <Text
                color="white"
                fontWeight="200"
                fontFamily="sans"
                fontStyle="normal"
                textAlign="center"
                fontSize="md"
            >Зарегистрируйся, чтобы слушать музыки ограниченного выпуска</Text>
            {!getAccessToken() ? (
                <Button
                    color="white"
                    fontWeight="900"
                    fontFamily="sans"
                    fontStyle="normal"
                    px="14px"
                    colorScheme="white"
                    variant='link'
                    fontSize="xl"
                    onClick={openModal}
                >Зарегистрироваться</Button>
            ) : (
                <Button
                    color="white"
                    fontWeight="900"
                    fontFamily="sans"
                    fontStyle="normal"
                    px="14px"
                    colorScheme="white"
                    variant='link'
                    fontSize="xl"
                >Зарегистрироваться</Button>
            )}

        </Box>
    );
};

export default RegisterDesktop;