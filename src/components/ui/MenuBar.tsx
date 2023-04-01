import {Box, useDisclosure} from "@chakra-ui/react";
import {Link, useNavigate} from "react-router-dom";
import SvgAllTracks from "../../assets/svg/SvgAllTracks";
import SvgBasket from "../../assets/svg/SvgBasket";
import SvgHome from "../../assets/svg/SvgHome";
import SvgTrack from "../../assets/svg/SvgTrack";
import {useAppSelector} from "../../hooks/Index";
import {useModalforms} from "../../hooks/useActions";
import ModalUserAuth from "../form/modal/ModalUser";
import {getIdAlums} from "../helper";
import "./style.scss";
import {useState} from "react";

interface IPropsMenuBar {
    children?: any;
}

export default function MenuBar({children}: IPropsMenuBar) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {active} = useAppSelector((state) => state.playReducer);
    const {basket} = useAppSelector((state) => state.reducerBasket);
    const {loginModal} = useModalforms();

    const openModal = () => {
        onOpen();
        loginModal();
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    const list = [
        {
            item: "Главная",
            svg: (
                <SvgHome
                    fill={
                        window.location.pathname === "/"
                            ? "white"
                            : "rgba(255, 255, 255, 0.4)"
                    }
                />
            ),
            line: (
                <Box ml="12px" w="0" h="27px" border="1px" borderColor="white"
                     style={{display: window.location.pathname === "/" ? "block" : "none"}}/>
            ),
            link: "/",
        },
        {
            item: "Все треки",
            svg: (
                <SvgAllTracks
                    fill={
                        window.location.pathname === "/excerpts" ||
                        window.location.pathname === "/excerpts/details/" + getIdAlums()
                            ? "white"
                            : "rgba(255, 255, 255, 0.4)"
                    }
                />
            ),
            line: (
                <Box ml="12px" w="0" h="27px" border="1px" borderColor="white" style={{
                    display:
                        window.location.pathname === "/excerpts" ||
                        window.location.pathname === "/excerpts/details/" + getIdAlums()
                            ? "block" : "none"
                }}/>
            ),
            link: "/excerpts",
        },
        {
            item: "Моя музыка",
            svg: (
                <SvgTrack
                    fill={
                        window.location.pathname === "/my-playlist"
                            ? "white"
                            : "rgba(255, 255, 255, 0.4)"
                    }
                />
            ),
            line: (
                <Box ml="12px" w="0" h="27px" border="1px" borderColor="white"
                     style={{display: window.location.pathname === "/my-playlist" ? "block" : "none"}}/>
            ),
            link: "/my-playlist",
        },
        {
            item: "Корзина",
            svg: (
                <SvgBasket
                    fill={
                        window.location.pathname === "/basket"
                            ? "white"
                            : "rgba(255, 255, 255, 0.4)"
                    }
                />
            ),
            line: (
                <Box ml="12px" w="0" h="27px" border="1px" borderColor="white"
                     style={{display: window.location.pathname === "/basket" ? "block" : "none"}}/>
            ),
            link: "/basket",
        },
    ];

    return (
        <Box maxW="2060px" mx="auto">
            <ModalUserAuth isOpen={isOpen} onClose={onClose}/>
            <Box
                position="fixed"
                left="0"
                top="0"
                bottom="0"
                bg={
                    window.location.pathname === "/"
                        ? "linear-gradient(90deg, #000000 22.36%, rgba(0, 0, 0, 0) 50.34%)"
                        : "#0B0B0B"
                }
                zIndex="1"
                display={{base: "none", md: "block"}}
                w={window.location.pathname === "/" ? "25%" : "96px"}
            >
                <Box py="60px">
                    {list.slice(0, 1).map((el, index) => (
                        <Box
                            key={index}
                            onClick={handleRefresh}
                            py="17.5px"
                            pl="30px"
                            pr="41px"
                            display="flex"
                        >
                            <Link to={el.link} className="hover-text">
                                <Box
                                    display="flex"
                                >
                                    {el.svg}
                                    {el.line}
                                </Box>
                                <span className="tooltip-text" id="right">{el.item}</span>
                            </Link>
                        </Box>
                    ))}
                    {list.slice(1, 3).map((el, index) => (
                        <Box
                            key={index}
                            py="17.5px"
                            pl="30px"
                            pr="41px"
                            display="flex"
                            position="relative"
                        >
                            <Link to={el.link} className="hover-text">
                                <Box
                                    display="flex"
                                >
                                    {el.svg}
                                    {el.line}
                                </Box>
                                <span className="tooltip-text" id="right">
                  {el.item}
                </span>
                            </Link>
                            {basket[0]?.cart_item.length && index === 2 && (
                                <Box
                                    fontSize="12px"
                                    position="absolute"
                                    w="20px"
                                    h="20px"
                                    bg="red.500"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    color="white"
                                    rounded="50%"
                                    pr="2px"
                                    right={7}
                                >
                                    {basket[0]?.cart_item?.length}
                                </Box>
                            )}
                        </Box>
                    ))}
                    {list.slice(3, 4).map((el, index) => (
                        <Box
                            key={index}
                            py="17.5px"
                            pl="27px"
                            pr="41px"
                            display="flex"
                            position="relative"
                            w="95px"
                        >
                            <Link to={el.link} className="hover-text">
                                <Box
                                    display="flex"
                                >
                                    {el.svg}
                                    {el.line}
                                </Box>
                                <span className="tooltip-text" id="right">
                  {el.item}
                </span>
                            </Link>
                            {basket[0]?.cart_item.length && index === 0 && (
                                <Box
                                    fontSize="12px"
                                    position="absolute"
                                    w="20px"
                                    h="20px"
                                    bg="red.500"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    color="white"
                                    rounded="50%"
                                    border="2px"
                                    borderColor="#1D1D20"
                                    right="35px"
                                    top="15px"
                                >
                                    {basket[0]?.cart_item?.length}
                                </Box>
                            )}
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box display={{base: "block", md: "none"}}>
                <Box
                    position="fixed"
                    bottom={active ? "76px" : "21px"}
                    left="0"
                    right="0"
                    display="flex"
                    justifyContent="center"
                    zIndex="3"
                >
                    <Box
                        py="15px"
                        rounded="59px"
                        w="90vw"
                        display="flex"
                        justifyContent="space-between"
                        bg="#0B0B0B"
                        px="46px"
                    >
                        {list.slice(0, 1).map((el, index) => (
                            <Box key={index} onClick={handleRefresh} textColor="white">
                                <Link to={el.link} title={el.item}>
                                    <Box
                                        display="flex"
                                    >
                                        {el.svg}
                                        {el.line}
                                    </Box>
                                </Link>
                            </Box>
                        ))}
                        {list.slice(1, 3).map((el, index) => (
                            <Box key={index} textColor="white">
                                <Link to={el.link} title={el.item}>
                                    <Box
                                        display="flex"
                                    >
                                        {el.svg}
                                        {el.line}
                                    </Box>
                                </Link>
                            </Box>
                        ))}
                        {list.slice(3, 4).map((el, index) => (
                            <Box display="flex">
                                <Box key={index} textColor="white"
                                     display="flex"
                                     position="relative"
                                >
                                    <Link to={el.link} title={el.item}>
                                        {el.svg}
                                    </Link>
                                    {basket[0]?.cart_item.length && index === 0 && (
                                        <Box
                                            fontSize="12px"
                                            position="absolute"
                                            w="20px"
                                            h="20px"
                                            bg="red.500"
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            color="white"
                                            rounded="50%"
                                            border="2px"
                                            borderColor="#1D1D20"
                                            right="-5px"
                                            top="-3px"
                                        >
                                            {basket[0]?.cart_item?.length}
                                        </Box>
                                    )}
                                </Box>
                                {el.line}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
            <Box
                w={{base: "100%", md: "94%", xl: "95%"}}
                ml="auto"
                minH="100vh"
                bg="#1D1D20"
            >
                {children}
            </Box>
        </Box>
    );
}
