import { Box, Button, Image, Text } from "@chakra-ui/react";

import { IMusicForBasket, IPlayList } from "../../pages/basket/types";

interface IBasketAlbums {
  image?: string;
  name?: string;
  price?: string;
  music?: IMusicForBasket[];
  deleted: (value: string) => void;
  id?: number;
  albums?: IPlayList | undefined;
}

export default function OrderListAlbums({
  image,
  name,
  price,
  music,
  albums,
  deleted,
  id,
}: IBasketAlbums) {
  return (
    <Box
      bg="white"
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
            color="black"
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
            onClick={() => deleted(`${id}`)}
            bg="transparent"
            colorScheme="none"
            px="0"
            py="0"
            color="#C10404"
            fontSize="12px"
            fontWeight="400"
          >
            Удалить
          </Button>
        </Box>
      </Box>
      <Box>
        {music?.map((el: any, index: any) => (
          <Box
            key={index}
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
                  color="black"
                >
                  {el.name}
                </Text>
                <Text
                  pl={{ base: "0", md: "17px" }}
                  fontSize="10px"
                  fontWeight="400"
                  color="black"
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
              <Text fontSize="12px" textAlign="end" color="black">
                {el.price}c
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
