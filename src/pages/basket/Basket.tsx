import { Box, Button, Container, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import BasketListAlbums from "../../components/ui/BasketListForAlbums";
import BasketListProduct from "../../components/ui/BasketListProduct";
import API from "../../api/Index";
import { useAppSelector } from "../../hooks/Index";
import { useActionBasket } from "../../hooks/useActions";
import { OrderPopup } from "../../components/order/OrderPopup";
import { getUserId } from "../../components/helper";

export default function Basket() {
  const [openPopup, setOpenPopup] = useState(false);
  const { fetchBasket } = useActionBasket();
  const { basket } = useAppSelector((state) => state.reducerBasket);

  const lengthBasket = basket.filter((el) => el.user === getUserId());

  const deletedBasket = async (id: string) => {
    try {
      const responce = await API.delete(`account/cart/${id}`);
      fetchBasket();
      return alert(`RESPOMCE ${responce}`);
    } catch (e) {
      alert("Rejected");
      fetchBasket();
    }
    fetchBasket();
  };

  const total = 50;

  useEffect(() => {
    fetchBasket();
  }, []);

  console.log(lengthBasket);

  return (
    <section>
      <Box w="100%" minH="90vh" pb="50px" pt="140px">
        <Container maxW="1220px" position="relative">
          {!lengthBasket[0]?.cart_item?.length && (
            <Text
              textAlign="center"
              color="white"
              fontSize="48px"
              pt={{ base: "40%", lg: "20%", xl: "0" }}
            >
              Пусто...
            </Text>
          )}
          <Box pl={{ base: "0", md: "5%", xl: "0" }}>
            {basket?.map((item, index) => (
              <div key={index}>
                {
                  <Box>
                    {item.cart_item.map((el, idx) => (
                      <Box key={idx}>
                        {el.album !== null && (
                          <BasketListAlbums
                            setOpenPopup={setOpenPopup}
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

            {lengthBasket[0]?.cart_item?.length && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                maxW="950px"
                mx="auto"
                mt="30px"
              >
                <Text color="white">Итого: {total} c</Text>
                <Button
                  bg="#007AFF"
                  colorScheme="#007AFF"
                  rounded="10px"
                  px="53px"
                  py="14px"
                  fontSize="16px"
                  fontWeight="600"
                  position="static"
                >
                  Оплатить все
                </Button>
              </Box>
            )}
          </Box>
          <OrderPopup
            className={openPopup ? "transform" : ""}
            setOpenPopup={setOpenPopup}
          />
        </Container>
      </Box>
    </section>
  );
}
