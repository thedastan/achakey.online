import { Box, Button, Container, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";

import API from "../../api/Index";
import SvgBlackCross from "../../assets/svg/SvgBlackCross";
import { useAppSelector } from "../../hooks/Index";
import { useActionOrder } from "../../hooks/useActions";
import { fetchOrderItem } from "./action-creators/action";
import OrderListAlbums from "./orderListForAlbum";
import "./style.scss";

interface IOrderPopup {
  className: string;
  setOpenPopup: (value: boolean) => void;
}

export const OrderDetails = ({ className, setOpenPopup }: IOrderPopup) => {
  const { fetchOrder } = useActionOrder();
  const { orderDetails, orderId } = useAppSelector(
    (state) => state.reducerOrder
  );

  function handleClickClose() {
    setOpenPopup(false);
  }

  const deletedorder = async (id: string) => {
    try {
      const responce = await API.delete(`order/${id}`);
      fetchOrder();
      return alert(`RESPOMCE ${responce}`);
    } catch (e) {
      alert("Rejected");
      fetchOrder();
    }
    fetchOrder();
  };

  useEffect(() => {
    fetchOrderItem(Number(orderId));
  }, [orderDetails]);

  return (
    <Box
      className={`details ${className}`}
      left="0"
      right="0"
      top="0"
      bottom="0"
      pos="fixed"
      zIndex="4"
      bg="transparent"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box w="100%">
        <Box bg="#E0E0E0" mx="auto" rounded="20px" maxW="688px">
          <Container maxW="688px" pb="34px">
            <Box w="11px" ml="auto" py="24px" onClick={handleClickClose}>
              <SvgBlackCross />
            </Box>
            <Box h="30vh" overflowY="auto">
              <Box mx="29px" mb="30px">
                <Box>
                  {orderDetails?.order_item?.map((el: any, index: any) => (
                    <div key={index}>
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
                            justifyContent="space-between"
                            alignItems="center"
                            w={{ base: "155px", sm: "170px" }}
                          >
                            <Image
                              src={el?.music?.image}
                              w="35px"
                              rounded="50%"
                            />
                            <Text fontSize="12px" fontWeight="400">
                              {el?.music?.name}
                            </Text>
                          </Box>
                          <Text fontWeight="400" fontSize="12px">
                            {el?.music?.price}c
                          </Text>
                          <Button
                            onClick={() => deletedorder(`${el?.id}`)}
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
                    </div>
                  ))}
                  {orderDetails?.order_item?.map((el, index) => (
                    <Box key={index}>
                      {el.album !== null && (
                        <OrderListAlbums
                          deleted={deletedorder}
                          id={Number(el.id)}
                          music={el.album?.music}
                          image={el.album?.image}
                          name={el.album?.name}
                          price={el.album?.total_price}
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
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
      </Box>
    </Box>
  );
};
