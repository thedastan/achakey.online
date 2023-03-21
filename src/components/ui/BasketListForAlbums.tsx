import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useAppSelector } from "../../hooks/Index";
import { useActionOrder } from "../../hooks/useActions";
import { IMusicForBasket, IPlayList } from "../../pages/basket/types";
import { OrderPost } from "../order/types/order";
import { getUserId } from "../helper";
import SvgArrowTop from "../../assets/svg/SvgArrowTop";
import SvgCross from "../../assets/svg/SvgCross";
interface IBasketAlbums {
  image?: string;
  name?: string;
  price?: string;
  music?: IMusicForBasket[] | undefined;
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
  setOpenPopup,
  deleted,
  id,
}: IBasketAlbums) {
  const { fetchOrderPost, fetchOrder, fetchOrderId, fetchOrderItem } =
    useActionOrder();
  const Order = useAppSelector((state) => state.reducerOrder.order);
  const [active, setActive] = useState<boolean>(false);
  const [total, setTotal] = useState(0);

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

    userFiter?.filter((el) =>
      el?.order_item?.filter((i) =>
        i.album?.id === order.order_item[0].album
          ? fetchOrderItem(Number(el?.id))
          : console.log("NoNo")
      )
    );

    userFiter?.filter((el) =>
      el?.order_item?.filter((i) =>
        i.album?.id === order.order_item[0].album
          ? fetchOrderId(Number(el?.id))
          : console.log("id")
      )
    );

    setOpenPopup(true);
    fetchOrder();
  };

  useEffect(() => {
    let result = 0;

    const numberArray: any[] | undefined = music?.map((el) => el?.price);

    for (const keys of numberArray!) {
      result += typeof keys === "undefined" ? 0 : Number(keys);
    }

    setTotal(result);
  }, [music]);

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
        py="19px"
        pb="45px"
        className={`accordion ${active && "active"}`}
        w="100%"
        textColor="white"
        position="relative"
      >
        <Box
          onClick={() => setActive(!active)}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom="0.5px solid rgba(255, 255, 255, 0.5)"
          pb="19px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Image
              src={image}
              maxW="47px"
              h="47px"
              rounded="50%"
              mr={{ base: "10px", md: "26px" }}
            />
            <Text
              pl={{ base: "0", md: "17px" }}
              fontSize="20px"
              fontWeight="400"
              color="white"
            >
              Альбом: <span style={{ fontWeight: "600" }}>{name}</span>
            </Text>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            w={{ base: "50%", lg: "32%" }}
          >
            <Text pr="69px" fontWeight="600" fontSize="20px">
              {total} сом
            </Text>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                postOrder(albums);
              }}
              mr={{ base: "2%", md: "18%" }}
              border="1px"
              borderColor="white"
              rounded="38px"
              fontSize="9px"
              h="23px"
              w="84px"
              textColor="white"
              background="transparent"
              colorScheme="none"
            >
              Оплатить
            </Button>
            <Box
              cursor="pointer"
              onClick={(e) => {
                e.stopPropagation();
                deleted(`${id}`);
              }}
            >
              <SvgCross />
            </Box>
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
                borderBottom="0.5px solid rgba(255, 255, 255, 0.5)"
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
                >
                  <Text fontSize="12px" textAlign="end" color="white">
                    {Math.floor(el.price)}c
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
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
              <SvgArrowTop stroke="white" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
