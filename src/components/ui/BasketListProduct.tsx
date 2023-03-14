import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import SvgCross from "../../assets/svg/SvgCross";
import { useAppSelector } from "../../hooks/Index";
import { useActionOrder } from "../../hooks/useActions";
import { ITrack } from "../../redux/types";
import { getUserId } from "../helper";
import { OrderPopup } from "../order/OrderPopup";
import { OrderPost, OrderType } from "../order/types/order";
import "./style.scss";

interface IBasketProps {
  name: string;
  image?: any;
  price: number;
  deleted: (value: string) => void;
  id?: string;
  music: ITrack | undefined;
}

export default function BasketListProduct({
  image,
  name,
  price,
  deleted,
  id,
  music,
}: IBasketProps) {
  const { fetchOrderPost, fetchOrder } = useActionOrder();
  const Order = useAppSelector((state) => state.reducerOrder.order);
  const [openPopup, setOpenPopup] = useState(false);

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

    Order.forEach((obj1: OrderType) => {
      if (obj1.order_item?.length) {
        if (
          obj1.order_item?.every((el) => {
            return order.order_item.find(
              (item) => item.music !== el?.music?.id
            );
          })
        ) {
          alert("Success");
          fetchOrderPost(order);
        } else {
          alert("NO");
        }
      } else {
        fetchOrderPost(order);
        setOpenPopup(true);
      }
    });
    // fetchOrderPost(order);
    setOpenPopup(true);
    fetchOrder();
    console.log(order);
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
            {price}c
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
      <OrderPopup
        className={openPopup ? "transform" : ""}
        setOpenPopup={setOpenPopup}
      />
    </Box>
  );
}
