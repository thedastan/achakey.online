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
import { SvgAvatart } from "../../assets/svg/SvgAvatar";
import { getAccessToken } from "../helper";

export default function Header() {
  const dispatch = useAppDispatch();
  const { loginModal } = useModalforms();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { searchChange } = useAppSelector((state) => state.searchChangeReducer);
  const { tracks } = useAppSelector((state) => state.musicReducer);

  const searchResultArray = tracks.filter((el) =>
    el?.name?.toLocaleLowerCase().includes(searchChange.toLocaleLowerCase())
  );

  const openModal = () => {
    onOpen();
    loginModal();
  };

  return (
    <Box pos="absolute" top="0" left="0" right="0" py="30px" bg="transparent">
      <ModalUserAuth isOpen={isOpen} onClose={onClose} />
      <Container
        maxW="1220px"
        pos="relative"
        display="flex"
        alignItems="center"
      >
        {getAccessToken() && (
          <InputGroup maxW="574px" mx="auto" outlineColor="blue">
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
        )}
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
        {!getAccessToken() ? (
          <Box display="flex" alignItems="center" ml="auto">
            <Box>
              <Link to={"/"}>
                <Image src={LogoAchakey} alt="Logo" />
              </Link>
            </Box>

            <Button
              ml="20px"
              px="30px"
              bg="white"
              fontFamily="Roboto"
              fontWeight="600"
              fontSize="16px"
              onClick={openModal}
            >
              Войти
            </Button>
          </Box>
        ) : (
          <Box w="30px" h="30px" rounded="50%">
            <SvgAvatart />
          </Box>
        )}
      </Container>
    </Box>
  );
}
