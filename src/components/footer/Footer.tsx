import { Box, Container, Image, Text } from "@chakra-ui/react";
import LogoAchakey from "../../assets/img/logoAchakey.png";
import { Link } from "react-router-dom";

export default function Footer() {
  const list = [
    { item: "Политика конфиденциальности", link: "/privacy-policy" },
    { item: "Публичная оферта", link: "/public-offer" },
  ];

  const listTwo = [
    { item: "ⓒAchakey 2023" },
    { item: "Разработал Motion Web LLC " },
  ];

  return (
    <footer
      style={{
        background: "#0B0B0B",
      }}
    >
      <Container
        maxW="1220px"
        pl={{ base: "0", md: "12%", lg: "6%" }}
        pb={{ base: "96px", md: "35px" }}
      >
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          flexDir={{ base: "column", md: "row" }}
          pt="18px"
        >
          <Box  display={{ base: "block", md: "none" }}>
          <Link to="/">
            <Image
              src={LogoAchakey}
              maxW="121px"
              h="36px"
              mx="10px"
            />
          </Link>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            py={{base:"9px",md:"0"}}
            ml={{lg: "0", xl: "-80px"}}
            flexDir={{ base: "column", md: "row" }}
            textAlign="center"
            pb={{ base: "24px", md: "0" }}
          >
            {list.map((item, index) => (
              <Link to={item.link} key={index}>
                <Text
                  color="#949494"
                  fontSize="10px"
                  pl={index === 1 ? { base: "0", md: "50px" } : "0"}
                >
                  {item.item}
                </Text>
              </Link>
            ))}
          </Box>
          <Link to="/">
            <Image
              src={LogoAchakey}
              maxW="121px"
              h="36px"
              mx="10px"
              display={{ base: "none", md: "block" }}
            />
          </Link>
          <Box
            display="flex"
            justifyContent="center"
            py={{base:"9px",md:"0"}}
            flexDir={{ base: "column", md: "row" }}
            textAlign="center"
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
