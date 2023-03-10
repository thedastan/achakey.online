import React from 'react';
import {Box, Button, Icon, Text} from "@chakra-ui/react";
import {IoMdClose} from "react-icons/io";

interface PostHoverProps {
    postHover: boolean,
    setPostHover: (value:boolean) => void;
}

const RegisterMobile: React.FC<PostHoverProps> = ({postHover,setPostHover}) => {
    return (
        <Box
            display={{md:"block", lg: "none" ,xl: "none", "2xl": "none"}}
            justifyContent="center"
            pos="fixed"
            zIndex="0"
            top="63%"
            right="5%"
            alignItems="center"
            borderRadius="10px"
            bg="linear-gradient(90deg, #6F7BF7 0%, #00D1FF 101.67%);"
            width="262px"
            height="160px"
            style={{
                transform:  postHover ? "translateX(0%)" : "translateX(200%)",
                transition: postHover ? "5s" : "5s",
            }}
        >
            <Icon onClick={() => setPostHover(false)} ml="85%" mt="5%" textAlign="right" color="white" as={IoMdClose} boxSize={6} />
            <Text
                color="white"
                fontWeight="200"
                fontFamily="sans"
                fontStyle="normal"
                textAlign="center"
                p="15px"
                fontSize="14px"
            >Зарегистрируйся, чтобы слушать музыки ограниченного выпуска</Text>
            <Button
                textAlign="center"
                color="white"
                fontWeight="900"
                fontFamily="sans"
                fontStyle="normal"
                colorScheme="white"
                pl="55px"
                variant='link'
                fontSize="16px">Зарегистрироваться</Button>
        </Box>
    );
};

export default RegisterMobile;