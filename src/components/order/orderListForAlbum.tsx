import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import SvgArrowTop from "../../assets/svg/SvgArrowTop";

import { IMusicForBasket, IPlayList } from "../../pages/basket/types";
// import "./style.scss";

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
  const [active, setActive] = useState<boolean>(false);

  return (
    <Box
      bg="white"
      rounded="13px"
      maxW="950px"
      mx="auto"
      mb="10px"
      pl={{ base: "8px", md: "25px" }}
      pr={{ base: "10px", md: "25px" }}
    >
      <Box
        pt="19px"
        pb="45px"
        position="relative"
        className={`accordion ${active && "active"}`}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          onClick={() => setActive(!active)}
          pb="19px"
          borderBottom="0.5px solid rgba(124, 124, 124, 0.5)"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
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
          <Box display="flex" alignItems="center">
            <Text mr="48px">{albums?.total_price} сом</Text>
            <Button
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
          <Box className="accordion__content">
            {music?.map((el: any, index: any) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py="19px"
                borderBottom="0.5px solid rgba(124, 124, 124, 0.5)"
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
                >
                  <Text fontSize="12px" textAlign="end" color="black">
                    {el.price}c
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            position="absolute"
            w="100%"
            ml="auto"
            display="flex"
            justifyContent="center"
            onClick={() => setActive(!active)}
            pt="10px"
          >
            <Box display="flex" alignItems="center" mx="auto">
              <Text>{music?.length} треков</Text>
              <Box className="accordion__icon" ml="17px">
                <SvgArrowTop stroke="black" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}