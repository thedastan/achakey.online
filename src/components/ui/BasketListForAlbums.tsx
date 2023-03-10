import { Box, Button, Image, Text } from "@chakra-ui/react";
import SvgCross from "../../assets/svg/SvgCross";
import SvgPlay from "../../assets/svg/SvgPlay";

interface IBasketAlbums {
  image?: string;
  name?: string;
  price?: string;
  music?: any;
}

export default function BasketListAlbums({
  image,
  name,
  price,
  music,
}: IBasketAlbums) {
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
            src={image}
            maxW="47px"
            rounded="50%"
            mr={{ base: "10px", md: "26px" }}
          />
          <Text
            pl={{ base: "0", md: "17px" }}
            fontSize="20px"
            fontWeight="400"
            color="white"
          >
            Альбом: {name}
          </Text>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          w={{ base: "50%", lg: "32%" }}
        >
          <Text fontSize="12px" color="white">
            {price}c
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
      <Box>
        {music.map((el: any, index: any) => (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py="19px"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Image
                src={el.image}
                maxW="47px"
                rounded="50%"
                mr={{ base: "10px", md: "26px" }}
              />
              <Box>
                <Text
                  pl={{ base: "0", md: "17px" }}
                  fontSize="14.53px"
                  fontWeight="400"
                  color="white"
                >
                  {el.name}
                </Text>
                <Text
                  pl={{ base: "0", md: "17px" }}
                  fontSize="10px"
                  fontWeight="400"
                  color="white"
                >
                  Альбом: {name}
                </Text>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              w={{ base: "50%", lg: "32%" }}
            >
              <Text fontSize="12px" color="white">
                {price}c
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
        ))}
      </Box>
    </Box>
  );
}
