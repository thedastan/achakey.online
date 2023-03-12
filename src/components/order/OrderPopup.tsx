import { Box, Button, Container, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import SvgCross from "../../assets/svg/SvgCross";
import { useAppSelector } from "../../hooks/Index";
import { useActionOrder } from "../../hooks/useActions";
import "./style.scss";

interface IOrderPopup {
  className: string;
  setOpenPopup: (value: boolean) => void;
}

export const OrderPopup = ({ className, setOpenPopup }: IOrderPopup) => {
  const { fetchOrder } = useActionOrder();
  const { order } = useAppSelector((state) => state.reducerOrder);
  const { tracks } = useAppSelector((state) => state.musicReducer);

  function handleClickClose() {
    setOpenPopup(false);
  }

  // const orderFilter = order.map((el) => el.order_item?.map((i) => i.music.id));

  // function filterOrder(Order: any) {
  //   orderFilter.map((el) => el === tracks[Number(el) - 1].id);
  // }

  useEffect(() => {
    fetchOrder();
  }, []);

  // console.log(
  //   tracks.map((el) => orderFilter.map((i) => i === el.id)),
  //   "orderFilter"
  // );

  return (
    <Box
      className={`order ${className}`}
      left="0"
      right="0"
      top="0"
      maxW="688px"
      pos="absolute"
      zIndex="4"
      bg="#E0E0E0"
      rounded="20px"
      h="auto"
    >
      <Container maxW="688px" pb="34px">
        <Box w="11px" ml="auto" py="24px" onClick={handleClickClose}>
          <SvgCross />
        </Box>

        <Box mx="29px" mb="30px">
          {order.map((item, index) => (
            <Box
              key={index}
              bg="white"
              rounded="10px"
              my="5px"
              py="12px"
              px="25px"
            >
              {item.order_item?.map((el, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    w={{ base: "155px", sm: "170px" }}
                  >
                    <Image src={el?.music?.image} w="35px" rounded="50%" />
                    <Text fontSize="12px" fontWeight="400">
                      {el?.music?.name}
                    </Text>
                  </Box>
                  <Text fontWeight="400" fontSize="12px">
                    {el?.music?.price}c
                  </Text>
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
              ))}
            </Box>
          ))}
        </Box>

        <Box display="flex" justifyContent="space-between" mx="29px">
          <Text fontSize="16px" fontWeight="500" color="#242424">
            Итого: 540 сом
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
  );
};
