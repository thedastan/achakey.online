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
  music,
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
    <Box bg="white" rounded="13px" maxW="950px" mx="auto" mb="10px"
        >
      <Box
        pt="11px"
        pb="20px"
        position="relative"
        className={`accordion ${active && "active"}`}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          onClick={() => setActive(!active)}
          mb="11px" px="25px"
        >
          <Box
            display="flex"
            alignItems="center"
            w={{ base: "75%", sm: "80%", md: "80%" }}
          >
            <Image
              src={image ? image : defaultImage}
              w="35px"
              h="35px"
              rounded="50%"
            />

            <Text fontFamily="Roboto,sans-serif" ml={{base:"15px",sm:"26px"}} fontSize="18px" fontWeight="600" color="black">
              Альбом: {name}
            </Text>
          </Box>
          <Box>
            <Text fontFamily="Roboto,sans-serif" ml={{base:"14px",sm:"16px"}} fontSize="18px" fontWeight="600" color="black" >{total} сом</Text>
          </Box>
        </Box>
        <Box border="0.5px solid rgba(124, 124, 124, 0.5)"/>
        <Box  pb="16px" px="25px">
          <Box className="accordion__content">
            {music?.map((el: any, index: any) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                pb="7px"
                pt="16px"
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
                  />
                  <Box>
                    <Text
                      pl={{ base: "15px", md: "17px" }}
                      fontSize="14.53px"
                      fontWeight="400"
                      color="black"
                      fontFamily="Montserrat,sans-serif"
                    >
                      {el.name}
                    </Text>
                    <Text
                      pl={{ base: "15px", md: "17px" }}
                      fontSize="10px"
                      fontWeight="400"
                      color="black"
                      fontFamily="Montserrat,sans-serif"
                    >
                      Альбом: {name}
                    </Text>
                  </Box>
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
            pt="9px"
            pb="10px"
          >
            <Box display="flex" alignItems="center" justifyContent="center" mx="auto">
              <Text fontFamily='Roboto' fontSize="12px" fontWeight="400" color="#1D1D20">
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
