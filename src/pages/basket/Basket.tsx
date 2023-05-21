import {
  Box,
  Button,
  Container,
  Stack,
  Text,
  Spinner,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BasketListAlbums from "../../components/ui/BasketListForAlbums";
import BasketListProduct from "../../components/ui/BasketListProduct";
import API from "../../api/Index";
import { useAppSelector } from "../../hooks/Index";
import { useActionBasket, useActionOrder } from "../../hooks/useActions";
import { OrderPopup } from "../../components/order/OrderPopup";
import { getUserId } from "../../components/helper";
import { OrderDetails } from "../../components/order/OrderDetails";
import SvgBasketEmpty from "../../assets/svg/SvgBasketEmpty";
export default function Basket() {
  const OverlayOne = () => <ModalOverlay bg="rgba(0, 0, 0, 0.7)" />;
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const openModal1 = () => setIsOpen1(true);
  const closeModal1 = () => setIsOpen1(false);
  const openModal2 = () => setIsOpen2(true);
  const closeModal2 = () => setIsOpen2(false);

  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [total, setTotal] = useState(0);

  const { fetchBasket } = useActionBasket();
  const {fetchOrder} = useActionOrder();
  
  const { basket, loader } = useAppSelector((state) => state.reducerBasket);
  const { openOrder, openOrderId } = useAppSelector(
    (state) => state.reducerOrder
  );

  const lengthBasket = basket.filter((el) => el.user === getUserId());
  const filterUser = basket.filter((el) => el.user === getUserId());

  const deletedBasket = async (id: string) => {
    try {
      const responce = await API.delete(`account/cart/${id}`);
      fetchBasket();
      return console.log(`RESPOMCE ${responce}`);
    } catch (e) {
      fetchBasket();
    }
    try {
      await API.delete(`order/delete/${id}`);
      openOrderId(false);
      fetchOrder();
  } catch (e) {
      fetchOrder();
  }
  fetchOrder();
    fetchBasket();
  };

  useEffect(() => {
    fetchBasket();
  }, []);

  useEffect(() => {
    let result = 0;
    let totalAlbum = 0;

    const numberArray = filterUser.map((el) =>
      el.cart_item?.map((i) => i.music?.price)
    );

    const numberArrayAlbum = filterUser.map((el) =>
      el.cart_item?.map((i) => i.album?.music?.map((j) => j.price))
    );

    const newAlbumDate = numberArrayAlbum.flat();

    const newDate = numberArray.flat();

    const filterNewDate = newAlbumDate.filter((el) => el !== undefined);

    for (const keys of newDate) {
      result += typeof keys === "undefined" ? 0 : Number(keys);
    }

    for (const keys of filterNewDate.flat()) {
      totalAlbum += typeof keys === "undefined" ? 0 : Number(keys);
    }
    setTotal(totalAlbum + result);
  }, [basket]);

  return (
    <section className={lengthBasket[0]?.cart_item?.length ? "bg-menuBar" : ""}>
      <Box
        className={lengthBasket[0]?.cart_item?.length ? "bg-menuBar-blur" : ""}
        w="100%"
        minH="100vh"
        pb="50px"
        pt="140px"
        position="relative"
      >
        {!loader ? (
          <Container maxW="1220px" position="relative">
            {!lengthBasket[0]?.cart_item?.length && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                mt={["-5rem", "-13rem", "-13rem", "-10rem", "50px"]}
                color="white"
              >
                <Text
                  fontFamily="sans"
                  fontWeight="400"
                  fontStyle="normal"
                  fontSize="16px"
                  color="white"
                  pt={{ base: "40%", lg: "20%", xl: "0" }}
                >
                  В вашей корзине пока нет музыки
                </Text>
                <Box my="10">
                  <SvgBasketEmpty />
                </Box>
                <Stack direction="row" spacing={4} align="center">
                  <Link to="/excerpts">
                    <Button
                      width="267px"
                      height="45px"
                      colorScheme="blue"
                      bg="#007AFF"
                      variant="solid"
                    >
                      Перейти к покупке
                    </Button>
                  </Link>
                </Stack>
              </Box>
            )}
            <Box pl={{ base: "0", md: "5%", xl: "0" }}>
              {filterUser?.map((item, index) => (
                <div key={index}>
                  {
                    <Box>
                      {item.cart_item.map((el, idx) => (
                        <Box key={idx}>
                          {el.album !== null && (
                            <BasketListAlbums
                              openModal2={openModal2}
                              setOverlay={setOverlay}
                              albums={el?.album}
                              id={String(el.id)}
                              deleted={deletedBasket}
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

              {filterUser?.map((item, index) => (
                <div key={index}>
                  {
                    <Box>
                      {item.cart_item.map((el, idx) => (
                        <Box key={idx}>
                          {el.music !== null && (
                            <BasketListProduct
                              openModal2={openModal2}
                              setOverlay={setOverlay}
                              id={String(el.id)}
                              deleted={deletedBasket}
                              music={el.music}
                              image={el.music?.image}
                              name={String(el.music?.name)}
                              price={Number(el.music?.price)}
                            />
                          )}
                        </Box>
                      ))}
                    </Box>
                  }
                </div>
              ))}

              {lengthBasket[0]?.cart_item?.length && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flexDir={{ base: "column", sm: "row" }}
                  maxW="950px"
                  mx="auto"
                  mt="30px"
                >
                  <Text
                    fontFamily="Roboto,sans-serif"
                    fontWeight="500"
                    my="20px"
                    color="white"
                  >
                    Итого: {total} cом
                  </Text>
                  <Button
                    onClick={() => {
                      setOverlay(<OverlayOne />);
                      openModal1();
                    }}
                    bg="#007AFF"
                    colorScheme="#007AFF"
                    rounded="10px"
                    px="53px"
                    py="14px"
                    fontSize="18px"
                    fontFamily="Roboto,sans-serif"
                    fontWeight="600"
                    position="static"
                  >
                    Оплатить все
                  </Button>
                </Box>
              )}
            </Box>
            <OrderPopup
              overlay={overlay}
              closeModal1={closeModal1}
              isOpen1={isOpen1}
              className={openOrder ? "modal-content" : ""}
            />
            <OrderDetails
              overlay={overlay}
              closeModal2={closeModal2}
              isOpen2={isOpen2}
              className={openOrderId ? "modal-content" : ""}
            />
          </Container>
        ) : (
          <Box display="flex" pt="20vh">
            <Spinner size="xl" color="blue" mx="auto" />
          </Box>
        )}
      </Box>
    </section>
  );
}
