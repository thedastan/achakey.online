import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SvgArrowTop from "../../assets/svg/SvgArrowTop";

import { IMusicForBasket, IPlayList } from "../../pages/basket/types";
import defaultImage from "../../assets/img/defaultImage.png";
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
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let result = 0;

    const numberArray: any[] | undefined = music?.map((el) => el?.price);

    for (const keys of numberArray!) {
      result += typeof keys === "undefined" ? 0 : Number(keys);
    }

    setTotal(result);
  }, [music]);

  return (
    <Box bg="white" rounded="13px" maxW="950px" mx="auto" mb="10px" px="25px">
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
          flexDir={{ base: "column", sm: "row" }}
        >
          <Box
            display="flex"
            alignItems="center"
            w={{ base: "100%", sm: "80%", md: "100%" }}
          >
            <Image
              src={image ? image : defaultImage}
              w="35px"
              h="35px"
              rounded="50%"
              mr="10px"
            />
            <Text fontSize="18px" fontWeight="400" color="black">
              Альбом: {name}
            </Text>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent={{ base: "space-between", md: "none" }}
            w={{ base: "100%", sm: "auto" }}
          >
            <Text mr="48px">{total} сом</Text>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                deleted(`${id}`);
              }}
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
                    src={el.image ? el.image : defaultImage}
                    w="35px"
                    h="35px"
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
                {/* <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text fontSize="12px" textAlign="end" color="black">
                    {Math.floor(el.price)}c
                  </Text>
                </Box> */}
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
              <Text>
                {!active && music?.length} {active ? "скрыть" : "треков"}
              </Text>
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
