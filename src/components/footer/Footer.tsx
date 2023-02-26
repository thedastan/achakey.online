import { Box, Container, Text } from "@chakra-ui/react";

export default function Footer() {
  const list = [
    { item: "Условия оказания услуг" },
    { item: "Motion Web LLC 2023" },
    { item: "Политика конфиденциальности" },
  ];

  return (
    <footer
      style={{
        background: "#3E3E3E",
        zIndex: "5",
      }}
    >
      <Container maxW="1220px">
        <Box display="flex" justifyContent="center" py="9px">
          {list.map((item, index) => (
            <Text
              key={index}
              color="#949494"
              fontSize="12px"
              borderX={index === 1 ? "1px" : "none"}
              px="55px"
            >
              {item.item}
            </Text>
          ))}
        </Box>
      </Container>
    </footer>
  );
}
