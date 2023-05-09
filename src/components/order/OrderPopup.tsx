import { Box, Button, Container, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import API from "../../api/Index";
import SvgBlackCross from "../../assets/svg/SvgBlackCross";
import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import { useActionOrder } from "../../hooks/useActions";
import { getUserId } from "../helper";
import OrderListAlbums from "./orderListForAlbum";
import defaultImage from "../../assets/img/defaultImage.png";
import "./style.scss";
import { OrderTypes } from "./types/order";

interface IOrderPopup {
  className: string;
}

export const OrderPopup = ({ className }: IOrderPopup) => {
  const dispatch = useAppDispatch();
  const [total, setTotal] = useState(0);

  const { fetchOrder } = useActionOrder();
  const { order } = useAppSelector((state) => state.reducerOrder);

  const filterUser = order.filter((el) => el.user === getUserId());

  function handleClickClose() {
    dispatch({ type: OrderTypes.OPEN_MODAL_ORDER, payload: false });
  }

  const deletedorder = async (id: string) => {
    try {
      const responce = await API.delete(`order/delete/${id}`);
      fetchOrder();
      return console.log(responce);
    } catch (e) {
      fetchOrder();
    }
    fetchOrder();
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  useEffect(() => {
    let result = 0;
    let totalAlbum = 0;

    const numberArray = filterUser.map((el) =>
      el.order_item?.map((i) => i.music?.price)
    );

    const numberArrayAlbum = filterUser.map((el) =>
      el.order_item?.map((i) => i.album?.music?.map((j) => j.price))
    );

    const newAlbumDate = numberArrayAlbum.flat();

    const newDate = numberArray.flat();

    for (const keys of newDate) {
      result += typeof keys === "undefined" ? 0 : Number(keys);
    }

    for (const keys of newAlbumDate.flat()) {
      totalAlbum += typeof keys === "undefined" ? 0 : Number(keys);
    }
    setTotal(totalAlbum + result);
  }, [order]);

  return (
    <Box
      className={`order ${className}`}
      left="0"
      right="0"
      top={{ base: "none", sm: "none", md: "0" }}
      bottom="0"
      pos="fixed"
      zIndex="12"
      bg="transparent"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box w="100%">
        <Box
          bg="#E0E0E0"
          mx="auto"
          roundedTop="20px"
          roundedBottom={{ base: "0px", md: "20px" }}
          maxW="688px"
        >
          <Container maxW="688px" pb="34px">
            <Box pos="relative">
              <Box
                display={{ base: "block", sm: "none" }}
                onClick={handleClickClose}
                my="10px"
                pos="absolute"
                top="0"
                left="40%"
                w="92px"
                h="6px"
                borderRadius="11px"
                bg="rgba(146, 146, 146, 1);"
              />
              <Box
                w="11px"
                ml="auto"
                cursor="pointer"
                py="24px"
                onClick={handleClickClose}
              >
                <SvgBlackCross />
              </Box>
            </Box>

            <Box h="65vh" overflowY="auto">
              <Box mx={{ base: "10px", md: "29px" }} mb="30px">
                {order?.map((item, index) => (
                  <Box key={index}>
                    {item.order_item?.map((el, index) => (
                      <div key={index}>
                        {el.music !== null && (
                          <Box
                            bg="white"
                            rounded="10px"
                            my="5px"
                            py="12px"
                            px="25px"
                          >
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Box
                                display="flex"
                                justifyContent="start"
                                alignItems="center"
                                w={{ base: "155px", sm: "185px" }}
                              >
                                <Image
                                  src={
                                    el?.music?.image
                                      ? el.music.image
                                      : defaultImage
                                  }
                                  w="35px"
                                  h="35px"
                                  rounded="50%"
                                  mr="10px"
                                  mx="5px"
                                />
                                <Text
                                  fontSize="14px"
                                  fontWeight="400"
                                  textAlign="start"
                                  fontFamily="Montserrat,sans-serif"
                                  noOfLines={1}
                                >
                                  {el?.music?.name}
                                </Text>
                              </Box>
                              <Box display="flex" alignItems="center">
                                <Text
                                  fontWeight="400"
                                  // mr="48px"
                                  fontSize="14px"
                                  fontFamily="Montserrat,sans-serif"
                                >
                                  {Math.floor(Number(el?.music?.price))} cом
                                </Text>
                                {/*<Button*/}
                                {/*    onClick={() => deletedorder(`${item.id}`)}*/}
                                {/*    bg="transparent"*/}
                                {/*    colorScheme="none"*/}
                                {/*    px="0"*/}
                                {/*    py="0"*/}
                                {/*    color="#C10404"*/}
                                {/*    fontSize="12px"*/}
                                {/*    fontWeight="400"*/}
                                {/*>*/}
                                {/*    Удалить*/}
                                {/*</Button>*/}
                              </Box>
                            </Box>
                          </Box>
                        )}
                      </div>
                    ))}
                  </Box>
                ))}
                {order?.map((item, index) => (
                  <div key={index}>
                    {
                      <Box>
                        {item?.order_item?.map((el, index) => (
                          <Box key={index}>
                            {el.album !== null && (
                              <OrderListAlbums
                                deleted={deletedorder}
                                id={Number(item.id)}
                                music={el.album?.music}
                                image={el.album?.image}
                                name={el.album?.name}
                                price={el.album?.total_price}
                              />
                            )}
                          </Box>
                        ))}
                      </Box>
                    }
                  </div>
                ))}
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent={{ base: "center", sm: "space-between" }}
              flexDir={{ base: "column", sm: "row" }}
              alignItems="center"
              pt="30px"
              mx="29px"
            >
              <Text fontSize="16px" my="10px" fontWeight="500" color="#242424">
                Итого: {total} сом
              </Text>
              <Button
                position="static"
                bg="blueDark"
                maxW="282px"
                fontSize="18px"
                color="white"
              >
                Оформить заказ
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};
