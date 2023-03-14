import { Box, Button, Container, Text } from "@chakra-ui/react";
import { useEffect } from "react";

import BasketListAlbums from "../../components/ui/BasketListForAlbums";
import BasketListProduct from "../../components/ui/BasketListProduct";
import API from "../../api/Index";
import { useAppSelector } from "../../hooks/Index";
import { useActionBasket } from "../../hooks/useActions";

export default function Basket() {
  const { fetchBasket } = useActionBasket();
  const { basket } = useAppSelector((state) => state.reducerBasket);

  const lengthBasket = basket.map((el) => el.cart_item.length);

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

  useEffect(() => {
    fetchBasket();
  }, []);

  const total = 540;
  console.log(basket, "BASKET");

  return (
    <section>
      <Box w="100%" minH="90vh" pb="50px" pt="140px" position="relative">
        <Container maxW="1220px">
          {!lengthBasket[0] && (
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
                {item.cart_item.map((el, index) => (
                  <div key={index}>
                    {el.music !== null && (
                      <BasketListProduct
                        key={index}
                        name={String(el.music?.name)}
                        image={el.music?.image}
                        price={Number(el.music?.price)}
                        id={String(el?.id)}
                        deleted={deletedBasket}
                        music={el.music}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}

            {basket?.map((item, index) => (
              <div key={index}>
                {
                  <Box>
                    {item.cart_item.map((el, index) => (
                      <Box key={index}>
                        {el.album !== null && (
                          <BasketListAlbums
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

            {lengthBasket[0] && (
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
        </Container>
      </Box>
    </section>
  );
}
