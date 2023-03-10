import {
  Box,
  Button,
  Container,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import LogoAchakey from "../../assets/svg/AchakeyLogo.svg";
import SvgSearch from "../../assets/svg/SvgSearch";
import { useModalforms } from "../../hooks/useActions";
import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import Popup from "../ui/Popup";
import ModalUserAuth from "../form/modal/ModalUser";
import { searchResult } from "./action-creators/Action";
import "./style.scss";

export default function Header() {
  const dispatch = useAppDispatch();
  const { searchChange } = useAppSelector((state) => state.searchChangeReducer);
  const { tracks } = useAppSelector((state) => state.musicReducer);

  const { loginModal } = useModalforms();

  const searchResultArray = tracks.filter((el) =>
    el?.name?.toLocaleLowerCase().includes(searchChange.toLocaleLowerCase())
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const openModal = () => {
    onOpen();
    loginModal();
  };

  return (
    <Box pos="absolute" top="0" left="0" right="0" py="30px" bg="transparent">
      <ModalUserAuth isOpen={isOpen} onClose={onClose} />
      <Container maxW="1220px" pos="relative" display="flex">
        <InputGroup maxW="574px" zIndex="10" mx="auto" outlineColor="blue">
          <InputLeftElement
            pointerEvents="none"
            outlineColor="blue"
            children={<SvgSearch />}
          />
          <Input
            type="text"
            rounded="50px"
            placeholder="Поиск треков..."
            color="rgba(255, 255, 255, 0.57)"
            onChange={(e) => dispatch(searchResult(e.target.value))}
          />
        </InputGroup>
        {searchChange && (
          <Popup top="40px">
            <Box>
              {searchResultArray.length ? (
                searchResultArray.map((el, index) => (
                  <Text
                    key={index}
                    py="10px"
                    pl="20px"
                    borderBottom={
                      searchResultArray.length - 1 === index ? "0" : "1px"
                    }
                    borderColor="gray.200"
                  >
                    {el.name}
                  </Text>
                ))
              ) : (
                <Text textAlign="center" py="50px" pl="20px">
                  oops no music...
                </Text>
              )}
            </Box>
          </Popup>
        )}
        <Box zIndex="10" display="flex" alignItems="center">
          <Box>
            <Link to={"/"}>
              <Image  src={LogoAchakey} alt="Logo" />
            </Link>
          </Box>
          <Button
            ml="20px"
            px="30px"
            bg="white"
            zIndex="10"
            fontFamily="Roboto"
            fontWeight="600"
            fontSize="16px"
            onClick={openModal}
          >
            Войти
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
