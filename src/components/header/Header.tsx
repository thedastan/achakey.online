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
import ModalExitAccount from "../form/modal/ModalExitAccount";
import SvgLogo from "../../assets/svg/SvgLogo"
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
  const resultSearchTracks: ISearchTrack[] = tracks.filter((el) =>
    el.name?.toLocaleLowerCase().includes(searchChange.toLocaleLowerCase())
  );

  const resultSearchAlbums: IAlbums[] = albums.filter((el) =>
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

  const userId = localStorage.getItem("user-id") as string;

  useEffect(() => {
    fetchUserDetails(userId);
  }, [userId]);

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
      <Container maxW="100%">
        {!getAccessToken() ? (
          <Box
            display="flex"
            py={{ base: "20px", sm: "0px" }}
            zIndex="4"
            justifyContent={
              breakpoints === "base" && "sm"
                ? "space-between"
                : "end" && breakpoints === "md"
                ? "end"
                : "end"
            }
            alignItems="center"
          >
            <Box zIndex="4" onClick={handleRefresh}>
              <Link to={"/"} >
                <SvgLogo/>
              </Link>
            </Box>
            <Button
              ml="20px"
              px="30px"
              bg="white"
              fontFamily="Roboto"
              fontWeight="600"
              fontSize="16px"
              zIndex="4"
              onClick={openModal}
            >
              Войти
            </Button>
          </Box>
        ) : (
          <Box
            display="flex"
            w="100%"
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
                left={{ sm: "0px", md: "50px", lg: "7%" }}
                display="flex"
                maxW="574px"
                mx="auto"
                zIndex="4"
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
                      {resultSearchTracks.length ||
                      resultSearchAlbums.length ? (
                        resultSearchTracks.map((el, index) => (
                          <Link to={`/search-result/${el.id}`} key={index}>
                            <Text
                              py="10px"
                              pl="20px"
                              cursor="pointer"
                              borderBottom={
                                resultSearchTracks.length - 1 === index
                                  ? "0"
                                  : "1px"
                              }
                              roundedBottom={
                                resultSearchTracks.length - 1 === index
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
                      {resultSearchTracks.length || resultSearchAlbums.length
                        ? resultSearchAlbums.map((el, index) => (
                            <Link
                              key={index}
                              to={`/excerpts/details/${el?.id}`}
                            >
                              <Text
                                key={index}
                                py="10px"
                                pl="20px"
                                borderBottom={
                                  resultSearchTracks.length - 1 === index
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
                        : null}
                    </Box>
                  </Popup>
                )}
              </InputGroup>
            ) : null}
            {isHomePage ? (
              <Box mr="85px" zIndex="4" onClick={handleRefresh} >
                <Link to={"/"} >
                  <SvgLogo />
                </Link>
              </Box>
            ) : null}
            <Box position="relative" >
              <Menu >
                {({ isOpen }) => (
                  <Box className="hover-menu">
                    <Box display="flex" justifyContent="center" alignItems="center" >
                      <Text className="avatar-text" >Аккаунт</Text>
                    </Box>
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
                      top="-20px"
                      right="0"
                      zIndex="4"
                      bg="transparent"
                      border="0"
                      fontFamily="sans"
                      fontSize="12px"
                    >
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
                        {!!userDetails?.username
                          ? userDetails.auth_provider !== "google" && (
                              <Box
                                display="flex"
                                justifyContent="center"
                                w="100%"
                                px="20px"
                              >
                                <Text
                                  color="#000000"
                                  my="5px"
                                  fontSize="16px"
                                  fontWeight="600"
                                  textAlign="center"
                                >
                                  {userDetails.username}
                                </Text>
                              </Box>
                            )
                          : ""}
                        {!!userDetails?.email ? (
                          <Text color="#6B6B6B" my="5px" mx="10px">
                            {userDetails.email}
                          </Text>
                        ) : (
                          ""
                        )}
                        {!!userDetails?.phone ? (
                          <Text color="#6B6B6B" my="5px" mx="10px">
                            {userDetails.phone}
                          </Text>
                        ) : (
                          ""
                        )}
                      </MenuItem>
                      {userDetails.auth_provider !== "google" && (
                        <>
                          <MenuItem
                            color="#000000"
                            pl="20px"
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
                            pl="20px"
                            py="10px"
                            fontWeight="500"
                            onClick={() => {
                              navigate("/changePassword");
                            }}
                          >
                            Изменить пароль
                          </MenuItem>
                        </>
                      )}
                      <MenuItem
                        color="#000000"
                        pt="10px"
                        pb="15px"
                        pl="20px"
                        borderTop="1px"
                        fontWeight="500"
                        borderBottomRadius="5px"
                        borderColor="rgba(210,210,210,0.62)"
                        onClick={onOpen}
                      >
                        Выйти
                      </MenuItem>
                    </MenuList>
                  </Box>
                )}
              </Menu>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
