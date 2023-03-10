import { Box, Button, Container, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import BasketListAlbums from "../../components/ui/BasketListForAlbums";
import BasketListProduct from "../../components/ui/BasketListProduct";
import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import { useActionBasket } from "../../hooks/useActions";
import { ITrack } from "../../redux/types";

export default function Basket() {
  const { fetchBasket, fetchBasketItem } = useActionBasket();
  const { basket } = useAppSelector((state) => state.reducerBasket);

  function deletedBasket() {}

  useEffect(() => {
    fetchBasket();
    fetchBasketItem();
  }, []);

  const total = 540;

  return (
    <section>
      <Box w="100%" minH="90vh" pb="50px" pt="140px">
        <Container maxW="1220px">
          {!basket.length && (
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
            {basket.map((item, index) => (
              <div key={index}>
                {item.cart.map((el, index) => (
                  <div key={index}>
                    <BasketListProduct
                      key={index}
                      name={String(el.music?.name)}
                      image={el.music?.image}
                      price={Number(el.music?.price)}
                    />
                  </div>
                ))}
              </div>
            ))}

            {basket.map((item, index) => (
              <div key={index}>
                {item.cart.map((el, index) => (
                  <BasketListAlbums
                    key={index}
                    name={String(el.playlist?.name)}
                    image={el.playlist?.image}
                    price={el.playlist?.total_price}
                    music={el.playlist?.music}
                  />
                ))}
              </div>
            ))}

            {basket.length && (
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
