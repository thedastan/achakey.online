import { Box, Button, Image, Text } from "@chakra-ui/react";

import SvgCross from "../../assets/svg/SvgCross";
import SvgPlay from "../../assets/svg/SvgPlay";
import Jax from "../../assets/img/Жакс.png";
import "./style.css";

interface IBasketProps {
  name: string;
  image?: any;
  price: string;
}

export default function BasketListProduct({
  image,
  name,
  price,
}: IBasketProps) {
  return (
    <Box
      className="basket"
      rounded="13px"
      maxW="950px"
      mx="auto"
      mb="10px"
      pl={{ base: "8px", md: "25px" }}
      pr={{ base: "10px", md: "29px" }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py="19px"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Image
            src={Jax}
            maxW="47px"
            rounded="50%"
            mr={{ base: "10px", md: "26px" }}
          />
          <Box display={{ base: "none", md: "block" }}>
            <SvgPlay fill="white" />
          </Box>
          <Text
            pl={{ base: "0", md: "17px" }}
            fontSize="14.53px"
            fontWeight="400"
            color="white"
          >
            {name}
          </Text>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          w={{ base: "50%", lg: "32%" }}
        >
          <Text fontSize="12px" color="white">
            {price}
          </Text>
          <Button
            ml={{ base: "2%", md: "18%" }}
            border="1px"
            borderColor="white"
            rounded="38px"
            fontSize="9px"
            h="23px"
            w="84px"
            background="transparent"
            colorScheme="none"
            zIndex="0"
          >
            Оплатить
          </Button>
          <SvgCross />
        </Box>
      </Box>
    </Box>
  );
}
