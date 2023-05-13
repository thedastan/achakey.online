import {Box, Button, Image, ModalOverlay, Text} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import SvgCross from "../../assets/svg/SvgCross";
import {useAppDispatch, useAppSelector} from "../../hooks/Index";
import { useActionOrder } from "../../hooks/useActions";
import { ITrack } from "../../redux/types";
import { getUserId } from "../helper";
import {OrderPost, OrderTypes} from "../order/types/order";
import "./style.scss";

interface IBasketProps {
  name: string;
  image?: any;
  price: number;
  deleted: (value: string) => void;
  id?: string;
  music: ITrack | undefined;
  setOverlay: any;
  openModal2: any;
}

export default function BasketListProduct({
  image,
  name,
  price,
  deleted,
  id,
  music,
    openModal2,
    setOverlay,
}: IBasketProps) {
  const { fetchOrderPost, fetchOrder, fetchOrderId, fetchOrderItem } =
    useActionOrder();
  const Order = useAppSelector((state) => state.reducerOrder.order);
  const dispatch = useAppDispatch()
  const OverlayOne = () => (
      <ModalOverlay
          bg='rgba(0, 0, 0, 0.7)'
      />
  )
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
      console.log("no");
    } else {
      fetchOrderPost(order);
      fetchOrder();
    }

    if (arrayOfObjects[0]?.music?.id === order?.order_item[0]?.music) {
      fetchOrderId(Number(arrayOfObjects[0]?.id));
      fetchOrderItem(Number(arrayOfObjects[0]?.id));
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
    dispatch({type:OrderTypes.OPEN_MODAL_ORDER_ID, payload:true})
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
      zIndex="0"
      position="relative"
    >
      <Box
        display={{ base: "flex", sm: "none" }}
        justifyContent="end"
        px="10px"
        pt="15px"
        alignItems="center"
        cursor="pointer"
        onClick={(e) => {
          e.stopPropagation();
          deleted(`${id}`);
        }}
      >
        <SvgCross />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py="19px"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Image
            src={image}
            w={{ base: "34px", md: "47px" }}
            h={{ base: "34px", md: "47px" }}
            rounded="50%"
            mr={{ base: "10px", md: "26px" }}
          />
          <Text
            fontSize="14.53px"
            fontWeight="400"
            fontFamily="Montserrat,sans-serif"
            color="white"
            noOfLines={1}
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
          <Text
            fontSize="12px"
            fontFamily="Roboto, sans-serif"
            color="white"
          >
            {Math.floor(price)} cом
          </Text>
          <Button
            onClick={() => {
              postOrder(music)
              setOverlay(<OverlayOne/>)
              openModal2()
            }}
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
            fontFamily="Roboto, sans-serif"
          >
            Оплатить
          </Button>
          <Box
            display={{ base: "none", sm: "block" }}
            cursor="pointer"
            onClick={() => deleted(`${id}`)}
          >
            <SvgCross />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
