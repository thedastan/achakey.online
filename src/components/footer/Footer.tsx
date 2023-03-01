import { Box, Container, Image, Text } from "@chakra-ui/react";
import LogoAchakey from "../../assets/img/logoAchakey.png";

export default function Footer() {
  const list = [
    { item: "Политика конфиденциальности" },
    { item: "Публичная оферта" },
  ];

  const listTwo = [
    { item: "ⓒAchakey 2023" },
    { item: "Разработал Motion Web LLC " },
  ];

  return (
    <footer
      style={{
        background: "#0B0B0B",
        zIndex: "5",
      }}
    >
      <Container maxW="1220px" pl={{ base: "0", md: "12%", lg: "6%" }}>
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          flexDir={{ base: "column", md: "row" }}
          pt="18px"
        >
          <Image
            src={LogoAchakey}
            maxW="121px"
            h="36px"
            display={{ base: "block", md: "none" }}
          />

          <Box
            display="flex"
            justifyContent="center"
            py="9px"
            flexDir={{ base: "column", md: "row" }}
            textAlign="center"
            pb={{ base: "24px", md: "0" }}
          >
            {list.map((item, index) => (
              <Text
                key={index}
                color="#949494"
                fontSize="10px"
                pl={index === 1 ? { base: "0", md: "50px" } : "0"}
              >
                {item.item}
              </Text>
            ))}
          </Box>
          <Image
            src={LogoAchakey}
            maxW="121px"
            h="36px"
            display={{ base: "none", md: "block" }}
          />
          <Box
            display="flex"
            justifyContent="center"
            py="9px"
            flexDir={{ base: "column", md: "row" }}
            textAlign="center"
            pb={{ base: "96px", md: "0" }}
          >
            {listTwo.map((item, index) => (
              <Text
                key={index}
                color="#949494"
                fontSize="10px"
                pr={index === 0 ? { base: "0", md: "50px" } : "0"}
              >
                {item.item}
              </Text>
            ))}
          </Box>
        </Box>
      </Container>
    </footer>
  );
}
