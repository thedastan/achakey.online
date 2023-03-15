import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useState } from "react";

import { useAppSelector } from "../../hooks/Index";
import { useActionOrder } from "../../hooks/useActions";
import SvgCross from "../../assets/svg/SvgCross";
import { IMusicForBasket, IPlayList } from "../../pages/basket/types";
import { OrderPost } from "../order/types/order";
import { getUserId } from "../helper";

interface IBasketAlbums {
  image?: string;
  name?: string;
  price?: string;
  music?: IMusicForBasket[];
  deleted: (value: string) => void;
  id: string;
  albums: IPlayList | undefined;
  setOpenPopup: (value: boolean) => void;
}

export default function BasketListAlbums({
  image,
  name,
  price,
  music,
  albums,
  deleted,
  id,
  setOpenPopup,
}: IBasketAlbums) {
  const { fetchOrderPost, fetchOrder } = useActionOrder();
  const Order = useAppSelector((state) => state.reducerOrder.order);

  const postOrder = async (cart: any) => {
    const order: OrderPost = {
      user: getUserId(),
      total_price: null,
      status: null,
      order_item: [
        {
          order: getUserId(),
          music: null,
          album: cart?.id,
        },
      ],
    };

    const userFiter = Order.filter((el) => el.user === getUserId());

    const filterUser = userFiter.map(
      //@ts-ignore
      (el) =>
        el?.order_item?.filter((i) => i.album?.id === order.order_item[0].album)
    );

    const newData = filterUser.flat();
    const arrayOfObjects = newData.map((item) => ({ ...item }));

    if (arrayOfObjects[0]?.album?.id === order.order_item[0].album) {
      alert("No");
    } else {
      alert("Success");
      fetchOrderPost(order);
      fetchOrder();
    }

    setOpenPopup(true);
    fetchOrder();
  };

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
            onClick={() => postOrder(albums)}
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
          <Box cursor="pointer" onClick={() => deleted(`${id}`)}>
            <SvgCross />
          </Box>
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
                {el.price}c
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
