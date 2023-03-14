import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import SvgCross from "../../assets/svg/SvgCross";
import SvgPlay from "../../assets/svg/SvgPlay";
import { useAppSelector } from "../../hooks/Index";
import { useActionOrder } from "../../hooks/useActions";
import { IMusicForBasket, IPlayList } from "../../pages/basket/types";
import { ITrack } from "../../redux/types";
import { getUserId } from "../helper";
import { OrderPopup } from "../order/OrderPopup";
import { OrderPost } from "../order/types/order";

interface IBasketAlbums {
  image?: string;
  name?: string;
  price?: string;
  music?: IMusicForBasket[];
  deleted: (value: string) => void;
  id: string;
  albums: IPlayList | undefined;
}

export default function BasketListAlbums({
  image,
  name,
  price,
  music,
  albums,
  deleted,
  id,
}: IBasketAlbums) {
  const { fetchOrderPost, fetchOrder } = useActionOrder();
  const [openPopup, setOpenPopup] = useState(false);
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

    {
      Order.forEach((el) => {
        if (
          el?.order_item?.every((i) =>
            order.order_item.some((e) => e.album === i?.album?.id)
          )
        ) {
          // alert("No");
        } else {
          // fetchOrderPost(order);
          // alert("Success");
        }
      });
    }

    console.log(
      Order.forEach((el) => {
        el?.order_item?.every((i) =>
          order.order_item.some((e) => e.album === i?.album?.id)
        );
      }),
      "ORDER"
    );

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
      <OrderPopup
        className={openPopup ? "transform" : ""}
        setOpenPopup={setOpenPopup}
      />
    </Box>
  );
}
