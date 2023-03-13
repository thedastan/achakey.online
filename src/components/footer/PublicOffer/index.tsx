import React from 'react';
import {Box, Text, useBreakpointValue} from "@chakra-ui/react";

const PublicOffer = () => {
    const breakpoints = useBreakpointValue({
        base: "base",
        sm: "sm",
        md: "md",
        lg: "lg",
        xl: "xl",
        "2xl": "2xl",
    });
    return (
        <Box maxW="80%" mx="auto" >
            <Text
                fontFamily="Roboto, sans-serif"
                fontStyle="normal"
                fontWeight="400"
                fontSize="32px"
                lineHeight="42px"
                color="white"
                pt={breakpoints === "base" && "sm" ? "24%" : "9%"}
            >
                Публичная оферта
            </Text>
            <Text
                fontFamily="Roboto, sans-serif"
                fontStyle="normal"
                fontWeight="400"
                fontSize="24px"
                lineHeight="42px"
                color="white"
                pt="5"
            >1. Условия сбора и хранения данных</Text>
            <Text
                fontFamily="Roboto, sans-serif"
                fontStyle="normal"
                fontWeight="400"
                fontSize="14px"
                color="white"
            >Пользуясь сайтом или приобретая услуги, предлагаемые на сайте
                margulan.info, а также отвечая на
                необходимые вопросы в анкете при регистрации и/или оформлении покупки, пользователь
                подтверждает,
                что дает согласие Сервису предоставления услуг (далее Процессор) и уполномоченным им лицам, на
                обработку персональных данных, а также что является совершеннолетним и дееспособным
                лицом.</Text>
            <Text
                fontFamily="Roboto, sans-serif"
                fontStyle="normal"
                fontWeight="400"
                fontSize="24px"
                lineHeight="42px"
                color="white"
                pt="5"
            >2. Условия сбора и хранения данных</Text>
            <Text
                fontFamily="Roboto, sans-serif"
                fontStyle="normal"
                fontWeight="400"
                fontSize="14px"
                color="white"
            >Пользуясь сайтом или приобретая услуги, предлагаемые на сайте
                margulan.info, а также отвечая на
                необходимые вопросы в анкете при регистрации и/или оформлении покупки, пользователь
                подтверждает,
                что дает согласие Сервису предоставления услуг (далее Процессор) и уполномоченным им лицам, на
                обработку персональных данных, а также что является совершеннолетним и дееспособным
                лицом.</Text>
        </Box>
    );
};

export default PublicOffer;