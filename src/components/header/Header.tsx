import {
  Box,
  Button,
  Container,
  Image,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Input,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { searchResult } from "./action-creators/Action";
import Popup from "../ui/Popup";
import LogoAchakey from "../../assets/svg/AchakeyLogo.svg";
import {
  useActionEmailVerify,
  useActionUser,
  useModalforms,
} from "../../hooks/useActions";
import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import ModalUserAuth from "../form/modal/ModalUser";
import { SvgAvatar } from "../../assets/svg/SvgAvatar";
import { getAccessToken } from "../helper";
import "./style.scss";
import SvgSearch from "../../assets/svg/SvgSearch";
import { IAlbums } from "../../redux/types";

export interface ISearchTrack {
  albums?: number | string;
  id?: number | null;
  name?: string;
  image?: string;
  artist?: string;
  music_short_len?: string;
  user?: any[];
  price?: string;
  music_short?: string;
  created_at?: string;
  updated_at?: string;
  text?: string;
}

export default function Header() {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();
  const { loginModal } = useModalforms();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { fetchUserDetails } = useActionUser();
  const { openModalEmailVerify } = useActionEmailVerify();

  const { userDetails } = useAppSelector((state) => state.reducerUser);

  const { authModal } = useAppSelector((state) => state.emailVerifyReducer);

  const { searchChange } = useAppSelector((state) => state.searchChangeReducer);
  const { tracks, albums } = useAppSelector((state) => state.musicReducer);
  const arrayListForSearch: ISearchTrack[] = tracks.filter((el) =>
    el.name?.toLocaleLowerCase().includes(searchChange.toLocaleLowerCase())
  );

  const searchResultAlbum: IAlbums[] = albums.filter((el) =>
    el?.name?.toLocaleLowerCase().includes(searchChange.toLocaleLowerCase())
  );

  const openModal = () => {
    onOpen();
    loginModal();
  };

  if (!!authModal) {
    loginModal();
  }

  const handleRefresh = () => {
    window.location.reload();
  };

  const closeModal = () => {
    openModalEmailVerify(false);
    onClose();
  };

  const breakpoints = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    "2xl": "2xl",
  });

  const userId = JSON.parse(localStorage.getItem("user-id") as string);

  useEffect(() => {
    fetchUserDetails(userId);
  }, [userId]);

  console.log(albums);

  return (
    <Box
      pos={isHomePage ? "fixed" : "absolute"}
      bg={
        breakpoints === "base" && "sm"
          ? isHomePage
            ? "black"
            : "none"
          : "none"
      }
      zIndex="21"
      top="0"
      left="0"
      right="0"
      px={{ base: "0px", sm: "45px", md: "45px" }}
      pt={{ sm: "40px", md: "40px" }}
    >
      {getAccessToken() ? (
        <ModalExitAccount isOpen={isOpen} onClose={onClose} />
      ) : (
        <ModalUserAuth
          isOpen={!!authModal ? authModal : isOpen}
          onClose={() => {
            closeModal();
          }}
        />
      )}
      <Container
        maxW="1440px"
        pos="relative"
        display={breakpoints === "base" && "sm" && "md" ? "block" : "flex"}
        justifyContent="end"
        alignItems="center"
      >
        {!getAccessToken() ? (
          <Box
            display="flex"
            py={{ base: "20px", sm: "0px" }}
            zIndex="11"
            justifyContent={
              breakpoints === "base" && "sm"
                ? "space-between"
                : "end" && breakpoints === "md"
                ? "end"
                : "end"
            }
            alignItems="center"
          >
            <Box zIndex="11">
              <Link to={"/"}>
                <Image onClick={handleRefresh} src={LogoAchakey} alt="Logo" />
              </Link>
            </Box>
            <Button
              ml="20px"
              px="30px"
              bg="white"
              fontFamily="Roboto"
              fontWeight="600"
              fontSize="16px"
              zIndex="11"
              onClick={openModal}
            >
              Войти
            </Button>
          </Box>
        ) : (
          <Box
            display="flex"
            w={{ base: "100%", md: "94%" }}
            py={{ base: "20px", sm: "0px" }}
            justifyContent={
              breakpoints === "base" && "sm"
                ? isHomePage
                  ? "space-between"
                  : "end"
                : "end" && breakpoints === "md"
                ? "end"
                : "end"
            }
            alignItems="center"
          >
            {!isHomePage ? (
              <InputGroup
                width={{ sm: "100%", md: "70%", lg: "100%" }}
                left={{ sm: "0px", md: "50px", lg: "0px" }}
                display={{ base: "none", sm: "block" }}
                maxW="574px"
                mx="auto"
              >
                <InputLeftElement
                  pointerEvents="none"
                  children={
                    <Box color="gray.300">
                      <SvgSearch />
                    </Box>
                  }
                />
                <Input
                  focusBorderColor="white"
                  type="text"
                  rounded="50px"
                  placeholder="Поиск треков..."
                  color="white"
                  onChange={(e) => dispatch(searchResult(e.target.value))}
                />
                {searchChange && (
                  <Popup top={"50px"}>
                    <Box>
                      {arrayListForSearch.length && searchResultAlbum.length ? (
                        arrayListForSearch.map((el, index) => (
                          <Link to={`/search-result/${el.id}`} key={index}>
                            <Text
                              py="10px"
                              pl="20px"
                              cursor="pointer"
                              borderBottom={
                                arrayListForSearch.length - 1 === index
                                  ? "0"
                                  : "1px"
                              }
                              roundedBottom={
                                arrayListForSearch.length - 1 === index
                                  ? "5px"
                                  : "0"
                              }
                              roundedTop={0 === index ? "5px" : "0"}
                              borderColor="white"
                              _hover={{
                                bg: "blueDark",
                                color: "white",
                              }}
                            >
                              {el.name}
                              {"    "}
                              {"[Трек]"}
                            </Text>
                          </Link>
                        ))
                      ) : (
                        <Text textAlign="center" py="50px" pl="20px">
                          oops no music...
                        </Text>
                      )}
                      {arrayListForSearch.length && searchResultAlbum.length ? (
                        searchResultAlbum.map((el, index) => (
                          <Link key={index} to={`/excerpts/details/${el?.id}`}>
                            <Text
                              key={index}
                              py="10px"
                              pl="20px"
                              borderBottom={
                                arrayListForSearch.length - 1 === index
                                  ? "0"
                                  : "1px"
                              }
                              borderColor="white"
                              _hover={{
                                bg: "bluedark",
                                color: "white",
                              }}
                            >
                              {el.name}
                              {"    "}
                              {`[Album]`}
                            </Text>
                          </Link>
                        ))
                      ) : (
                        <Text textAlign="center" py="50px" pl="20px">
                          oops no music...
                        </Text>
                      )}
                    </Box>
                  </Popup>
                )}
              </InputGroup>
            ) : null}
            {isHomePage ? (
              <Box mx="10px" zIndex="21">
                <Link to={"/"}>
                  <Image onClick={handleRefresh} src={LogoAchakey} alt="Logo" />
                </Link>
              </Box>
            ) : null}
            <Box position="relative">
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      isActive={isOpen}
                      as={Button}
                      bg="transparent"
                      colorScheme="transparent"
                    >
                      <SvgAvatar
                        fill={isOpen ? "white" : "rgba(255, 255, 255, 0.4)"}
                      />
                    </MenuButton>
                    <MenuList
                      position="absolute"
                      top="-55px"
                      right="-10px"
                      zIndex="22"
                      bg="transparent"
                      border="0"
                      fontFamily="sans"
                      fontSize="12px"
                    >
                      <MenuItem
                        bg="transparent"
                        display="flex"
                        justifyContent="flex-end"
                        pr="0"
                        fontWeight="500"
                      >
                        <Text
                          bg="#646464"
                          color="white"
                          borderRadius="4px"
                          py="8px"
                          px="25px"
                        >
                          Аккаунт
                        </Text>
                      </MenuItem>
                      <MenuItem
                        fontWeight="500"
                        pb="10px"
                        pt="15px"
                        borderBottom="1px"
                        borderTopRadius="5px"
                        borderColor="rgba(210,210,210,0.62)"
                        _hover={{ background: "white" }}
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                      >
                        <Box display="flex" justifyContent="center" w="100%">
                          <Text
                            color="#000000"
                            my="5px"
                            fontSize="16px"
                            fontWeight="600"
                            textAlign="center"
                          >
                            {!!userDetails?.username
                              ? userDetails.username
                              : ""}
                          </Text>
                        </Box>
                        <Text color="#6B6B6B" my="5px">
                          {!!userDetails?.email ? userDetails.email : ""}
                        </Text>
                        <Text color="#6B6B6B" my="5px">
                          {!!userDetails?.phone ? userDetails.phone : ""}
                        </Text>
                      </MenuItem>
                      <MenuItem
                        color="#000000"
                        py="10px"
                        fontWeight="500"
                        onClick={() => {
                          navigate("/accountManagement");
                        }}
                      >
                        Управление аккаунтом
                      </MenuItem>
                      <MenuItem
                        color="#000000"
                        py="10px"
                        fontWeight="500"
                        onClick={() => {
                          navigate("/changePassword");
                        }}
                      >
                        Изменить пароль
                      </MenuItem>
                      <MenuItem
                        color="#000000"
                        pt="10px"
                        pb="15px"
                        borderTop="1px"
                        fontWeight="500"
                        borderBottomRadius="5px"
                        borderColor="rgba(210,210,210,0.62)"
                        onClick={onOpen}
                      >
                        Выйти
                      </MenuItem>
                    </MenuList>
                  </>
                )}
              </Menu>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
