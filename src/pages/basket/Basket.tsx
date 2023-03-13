import { Box, Button, Container, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import API from "../../api/Index";
import BasketListAlbums from "../../components/ui/BasketListForAlbums";
import BasketListProduct from "../../components/ui/BasketListProduct";
import { useAppSelector } from "../../hooks/Index";
import { useActionBasket } from "../../hooks/useActions";
import { ITrack } from "../../redux/types";

export default function Basket() {
  const { fetchBasket } = useActionBasket();
  const { basket } = useAppSelector((state) => state.reducerBasket);
  const { tracks } = useAppSelector((state) => state.musicReducer);

  // console.log(basketResult);
  const deletedBasket = async (id: string) => {
    try {
      const responce = await API.delete(`account/cart/${id}`);

      return alert(`RESPOMCE ${responce}`);
    } catch (e) {
      alert("Rejected");
    }
  };

  function findBasketProduct() {
    // tracks.filter((el, index) =>
    //   index + 1 === basket[Number(el.id)]?.cart_item[Number(el.id)]?.music
    //     ? setBasketResult([el])
    //     : basket[Number(el.id)]?.cart_item
    // );
  }

  useEffect(() => {
    fetchBasket();
  }, []);

  const total = 540;
  console.log(basket);

  return (
    <section>
      <Box w="100%" minH="90vh" pb="50px" pt="140px" position="relative">
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
            {basket?.map((item, index) => (
              <div key={index}>
                {item.cart_item.map((el, index) => (
                  <div key={index}>
                    <BasketListProduct
                      key={index}
                      name={String(el.music?.name)}
                      image={el.music?.image}
                      price={Number(el.music?.price)}
                      id={String(el?.id)}
                      deleted={deletedBasket}
                      music={el.music}
                    />
                  </div>
                ))}
              </div>
            ))}

            {/* {basket?.map((item, index) => (
              <div key={index}>
                {item.cart_item.map((el, index) => (
                  <BasketListAlbums
                    key={index}
                    name={String(el.album?.name)}
                    image={el.album?.image}
                    price={el.album?.total_price}
                    music={el.album?.music}
                  />
                ))}
              </div>
            ))} */}

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
