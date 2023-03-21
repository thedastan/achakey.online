import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import SvgCross from "../../assets/svg/SvgCross";
import { useAppSelector } from "../../hooks/Index";
import { useActionOrder } from "../../hooks/useActions";
import { ITrack } from "../../redux/types";
import { getUserId } from "../helper";
import { OrderPopup } from "../order/OrderPopup";
import { OrderPost } from "../order/types/order";
import "./style.scss";

interface IBasketProps {
  name: string;
  image?: any;
  price: number;
  deleted: (value: string) => void;
  id?: string;
  music: ITrack | undefined;
  setOpenPopup: (value: boolean) => void;
}

export default function BasketListProduct({
  image,
  name,
  price,
  deleted,
  id,
  music,
  setOpenPopup,
}: IBasketProps) {
  const { fetchOrderPost, fetchOrder, fetchOrderId, fetchOrderItem } =
    useActionOrder();
  const Order = useAppSelector((state) => state.reducerOrder.order);

  const postOrder = async (cart?: ITrack) => {
    const order: OrderPost = {
      user: getUserId(),
      total_price: null,
      status: null,
      order_item: [
        {
          order: getUserId(),
          music: cart?.id,
          album: null,
        },
      ],
    };

    const userFiter = Order?.filter((el) => el.user === getUserId());

    const filterUser = userFiter.map(
      //@ts-ignore
      (el) =>
        el?.order_item?.filter((i) => i.music?.id === order.order_item[0].music)
    );

    const newData = filterUser.flat();
    const arrayOfObjects = newData.map((item) => ({ ...item }));

    if (arrayOfObjects[0]?.music?.id === order?.order_item[0]?.music) {
      alert("No");
    } else {
      alert("Success");
      fetchOrderPost(order);
      fetchOrder();
    }

    if (arrayOfObjects[0]?.music?.id === order?.order_item[0]?.music) {
      console.log(arrayOfObjects);
      fetchOrderId(Number(arrayOfObjects[0]?.id));
      fetchOrderItem(Number(arrayOfObjects[0]?.id));
      console.log(arrayOfObjects[0]?.id);
    }

    userFiter?.filter((el) =>
      el?.order_item?.filter((i) =>
        i.music?.id === order.order_item[0].music
          ? fetchOrderItem(Number(el?.id))
          : console.log("NoNo")
      )
    );

    userFiter?.filter((el) =>
      el?.order_item?.filter((i) =>
        i.music?.id === order.order_item[0].music
          ? fetchOrderId(Number(el?.id))
          : console.log("id")
      )
    );

    fetchOrder();
    setOpenPopup(true);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <Box
      className="basket"
      rounded="13px"
      maxW="950px"
      mx="auto"
      mb="10px"
      pl={{ base: "8px", md: "25px" }}
      pr={{ base: "10px", md: "29px" }}
      zIndex="1"
      position="relative"
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
            h="47px"
            rounded="50%"
            mr={{ base: "10px", md: "26px" }}
          />
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
            {Math.floor(price)}c
          </Text>
          <Button
            onClick={() => postOrder(music)}
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
    </Box>
  );
}
