import {
    Box,
    Button,
    Container,
    Image,
    Text,
    useBreakpointValue,
    useDisclosure,
} from "@chakra-ui/react";
import {Link, NavLink, useNavigate,useLocation} from "react-router-dom";
import { useState } from 'react';

import LogoAchakey from "../../assets/svg/AchakeyLogo.svg";
import {useModalforms} from "../../hooks/useActions";
import {useAppDispatch, useAppSelector} from "../../hooks/Index";
import ModalUserAuth from "../form/modal/ModalUser";
import {SvgAvatar} from "../../assets/svg/SvgAvatar";
import {getAccessToken} from "../helper";
import "./style.scss";

export default function Header() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {loginModal} = useModalforms();
    const {isOpen, onOpen, onClose} = useDisclosure();

  const [drop, setDrop] = useState<boolean>(false)

  const openCloseDrop = () => {
    setDrop(!drop)
  }

  const { searchChange } = useAppSelector((state) => state.searchChangeReducer);
  const { tracks } = useAppSelector((state) => state.musicReducer);

    const searchResultArray = tracks.filter((el) =>
        el?.name?.toLocaleLowerCase().includes(searchChange.toLocaleLowerCase())
    );

    const logoutAccount = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/");
        window.location.reload();
    };

    const openModal = () => {
        onOpen();
        loginModal();
    };
    const handleRefresh = () => {
        window.location.reload();
    };
    const breakpoints = useBreakpointValue({
        base: "base",
        sm: "sm",
        md: "md",
        lg: "lg",
        xl: "xl",
        "2xl": "2xl",
    });
    return (
        <Box
            pos="absolute"
            bg={breakpoints === "base" && "sm" ? "black" : "transparent"}
            zIndex="1"
            top="0"
            left="0"
            right="0"
            py={breakpoints === "base" && "sm" ? "10px" : "10px"}
        >
            <ModalUserAuth isOpen={isOpen} onClose={onClose}/>
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
                        zIndex="11"
                        justifyContent={
                            breakpoints === "base" && "sm" ? "space-between" : "end" && breakpoints === "md" ? "end" : "end"
                        }
                        alignItems="center"
                    >
                        <Box zIndex="11">
                            <Link to={"/"} onClick={handleRefresh}>
                                <Image src={LogoAchakey} alt="Logo"/>
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
                        justifyContent={breakpoints === "base" && "sm" ? isHomePage ? "space-between" : "end" : "end" && breakpoints === "md" ? "end" : "end"}
                        alignItems="center"
                    >
                        {isHomePage ? (
                            <Box mx="10px" zIndex="21">
                                <Link to={"/"} onClick={handleRefresh}>
                                    <Image src={LogoAchakey} alt="Logo"/>
                                </Link>
                            </Box>
                        ): null}
                        <Box
                            zIndex="21"
                            w="30px"
                            h="30px"
                            rounded="50%"
                            position="relative"
                            cursor="pointer"
                            className="avatar__login"
                        >
                            <SvgAvatar fill={ drop ? "white" : "rgba(255, 255, 255, 0.4)" } />
                            <Box
                                position="absolute"
                                display={ drop ? "block" : "none" }
                                bg="transparent"
                                top="0"
                                right="0"
                                mr="30px"
                                //className="avatar__login__menu"
                            >
                                <Box display="flex" flexDir="column" alignItems="flex-end">
                                    <Box
                                        bg="#646464"
                                        color="white"
                                        borderRadius="4px"
                                        py="8px"
                                        px="25px"
                                        fontFamily="sans"
                                        fontSize="12px"
                                    >
                                        Аккаунт
                                    </Box>
                                    <Box
                                        bg="white"
                                        mt="10px"
                                        fontFamily="sans"
                                        py="5px"
                                        borderRadius="5px"
                                        fontWeight="500"
                                        color="#000000"
                                        fontSize="12px"
                                    >
                                        <Box
                                            borderBottom="1px"
                                            p="10px"
                                            borderColor="rgba(210,210,210,0.62)"
                                        >
                                            <Text textAlign="center" fontSize="14px">
                                                Malika
                                            </Text>
                                            <Text color="#6B6B6B" my="5px">
                                                tashievamalikaa@gmail.com
                                            </Text>
                                        </Box>
                                        <Box
                                            borderBottom="1px"
                                            px="10px"
                                            borderColor="rgba(210,210,210,0.62)"
                                        >
                                            <Text p="5px" my="6px">
                                                <NavLink to="/accountManagement">
                                                    Управление аккаунтом
                                                </NavLink>
                                            </Text>
                                            <Text p="5px" my="6px">
                                                Изменить пароль
                                            </Text>
                                        </Box>
                                        <Box p="8px">
                                            <Text p="5px" onClick={logoutAccount}>
                                                Выйти
                                            </Text>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Container>
        </Box>
    );
}
