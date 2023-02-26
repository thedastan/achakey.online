import {
  Box,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import SvgSearch from "../../assets/svg/SvgSearch";
import "./style.scss";

export default function Header() {
  return (
    <section
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        marginBottom: "65px",
      }}
      className="header"
    >
      <Box py="30px" bg="transparent">
        <Container maxW="1220px">
          <InputGroup maxW="574px" mx="auto">
            <InputLeftElement pointerEvents="none" children={<SvgSearch />} />
            <Input
              type="text"
              rounded="50px"
              placeholder="Поиск треков..."
              color="rgba(255, 255, 255, 0.57)"
            />
          </InputGroup>
        </Container>
      </Box>
    </section>
  );
}
