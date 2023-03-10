import { Box, Button, Container, Text } from "@chakra-ui/react";
import SvgCross from "../../assets/svg/SvgCross";
import "./style.scss";

interface IOrderPopup {
  className: string;
  setOpenPopup: (value: boolean) => void;
}

export const OrderPopup = ({ className, setOpenPopup }: IOrderPopup) => {
  function handleClickClose() {
    setOpenPopup(false);
  }

  return (
    <Box
      className={`order ${className}`}
      left="0"
      right="0"
      top="0"
      w="688px"
      pos="fixed"
      zIndex="4"
      bg="white"
      rounded="20px"
      h="auto"
    >
      <Container maxW="688px" pb="34px">
        <Box w="11px" ml="auto" py="24px" onClick={handleClickClose}>
          <SvgCross />
        </Box>
        <Box display="flex" justifyContent="space-between" px="29px">
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
