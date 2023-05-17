import {Box, useDisclosure, Text} from "@chakra-ui/react";
import {Link, useLocation} from "react-router-dom";
import SvgAllTracks from "../../assets/svg/SvgAllTracks";
import SvgBasket from "../../assets/svg/SvgBasket";
import SvgHome from "../../assets/svg/SvgHome";
import SvgTrack from "../../assets/svg/SvgTrack";
import {useAppSelector} from "../../hooks/Index";
import {useActionMusicModal, useModalforms} from "../../hooks/useActions";
import ModalUserAuth from "../form/modal/ModalUser";
import {getIdAlums} from "../helper";
import "./style.scss";

interface IPropsMenuBar {
    children?: any;
}

export default function MenuBar({children}: IPropsMenuBar) {
    const {ActionMusicModal} = useActionMusicModal()
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {active} = useAppSelector((state) => state.playReducer);
    const {basket} = useAppSelector((state) => state.reducerBasket);
    const {pathname} = useLocation()

    const handleRefresh = () => {
        ActionMusicModal(false)
    };

    const list = [
        {
            item: "Главная",
            svg: (
                <SvgHome
                    fill={
                        pathname === "/"
                            ? "white"
                            : "rgba(255, 255, 255, 0.4)"
                    }
                />
            ),
            line: (
                <Box
                    left="37px"
                    pos="absolute"
                    w="0"
                    h="27px"
                    border="1px"
                    borderColor="white"
                    style={{
                        display: pathname === "/" ? "block" : "none",
                    }}
                />
            ),
            link: "/",
        },
        {
            item: "Все треки",
            svg: (
                <SvgAllTracks
                    fill={
                        pathname === "/excerpts" ||
                        pathname === "/excerpts/details/" + getIdAlums()
                            ? "white"
                            : "rgba(255, 255, 255, 0.4)"
                    }
                />
            ),
            line: (
                <Box
                    left="37px"
                    pos="absolute"
                    w="0"
                    h="27px"
                    border="1px"
                    borderColor="white"
                    style={{
                        display:
                            pathname === "/excerpts" ||
                            pathname === "/excerpts/details/" + getIdAlums()
                                ? "block"
                                : "none",
                    }}
                />
            ),
            link: "/excerpts",
        },
        {
            item: "Моя музыка",
            svg: (
                <SvgTrack
                    fill={
                        pathname === "/my-playlist"
                            ? "white"
                            : "rgba(255, 255, 255, 0.4)"
                    }
                />
            ),
            line: (
                <Box
                    left="37px"
                    pos="absolute"
                    w="0"
                    h="27px"
                    border="1px"
                    borderColor="white"
                    style={{
                        display:
                            pathname === "/my-playlist" ? "block" : "none",
                    }}
                />
            ),
            link: "/my-playlist",
        },
        {
            item: "Корзина",
            svg: (
                <SvgBasket
                    fill={
                        pathname === "/basket"
                            ? "white"
                            : "rgba(255, 255, 255, 0.4)"
                    }
                />
            ),
            line: (
                <Box
                    left="37px"
                    pos="absolute"
                    w="0"
                    h="27px"
                    border="1px"
                    borderColor="white"
                    style={{
                        display: pathname === "/basket" ? "block" : "none",
                    }}
                />
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
                zIndex="9"
                display={{base: "none", md: "block"}}
                w={pathname === "/" ? "25%" : "96px"}
                bg={
                    pathname === "/"
                        ? "linear-gradient(90deg, #000000 22.36%, rgba(0, 0, 0, 0) 50.34%)"
                        : "#0B0B0B"
                }
            >
                <Box py="42.75px">
                    {list.slice(0, 1).map((el) => (
                        <Box
                            key={el.link}
                            onClick={handleRefresh}
                            py="17.5px"
                            pl="30px"
                            pr="41px"
                            display="flex"
                        >
                            <Link to={el.link} className="hover-text">
                                <Box display="flex">
                                    {el.svg}
                                    {el.line}
                                </Box>
                                <Text as="span" className="tooltip-text" top="5px"
                                      left={pathname === "/" ? "49px" : "37px"}>
                                    {el.item}
                                </Text>
                            </Link>
                        </Box>
                    ))}
                    {list.slice(1, 2).map((el) => (
                        <Box
                            key={el.link}
                            py="17.5px"
                            pl="30px"
                            pr="41px"
                            display="flex"
                            position="relative"
                        >
                            <Link to={el.link} className="hover-text">
                                <Box display="flex">
                                    {el.svg}
                                    {el.line}
                                </Box>
                                <Text className="tooltip-text" top="5px"
                                      left={pathname === "/excerpts" ? "49px" : "37px"}>
                                    {el.item}
                                </Text>
                            </Link>
                        </Box>
                    ))}
                    {list.slice(2, 3).map((el) => (
                        <Box
                            key={el.link}
                            py="17.5px"
                            pl="30px"
                            pr="41px"
                            display="flex"
                            position="relative"
                        >
                            <Link to={el.link} className="hover-text">
                                <Box display="flex">
                                    {el.svg}
                                    {el.line}
                                </Box>
                                <Text className="tooltip-text" top="5px"
                                      left={pathname === "/my-playlist" ? "49px" : "37px"}>
                                    {el.item}
                                </Text>
                            </Link>
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
                                <Box display="flex">
                                    {el.svg}
                                    {el.line}
                                </Box>
                                <Text className="tooltip-text" top="5px"
                                      left={pathname === "/basket" ? "49px" : "37px"}>
                                    {el.item}
                                </Text>
                            </Link>
                            {basket[0]?.cart_item.length && index === 0 ? (
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
                                    top="15px"
                                    right="33px"
                                >
                                    {basket[0]?.cart_item?.length}
                                </Box>
                            ) : (
                                ""
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
                    zIndex="11"
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
                        {list.slice(0, 1).map((el) => (
                            <Box key={el.link} onClick={handleRefresh} textColor="white">
                                <Link to={el.link} title={el.item}>
                                    <Box pos="relative" display="flex">
                                        {el.svg}
                                        {el.line}
                                    </Box>
                                </Link>
                            </Box>
                        ))}
                        {list.slice(1, 3).map((el) => (
                            <Box key={el.link} textColor="white">
                                <Link to={el.link} title={el.item}>
                                    <Box pos="relative" display="flex">
                                        {el.svg}
                                        {el.line}
                                    </Box>
                                </Link>
                            </Box>
                        ))}
                        {list.slice(3, 4).map((el, index) => (
                            <Box display="flex" pos="relative">
                                <Box
                                    key={index}
                                    textColor="white"
                                    display="flex"
                                    position="relative"
                                >
                                    <Link to={el.link} title={el.item}>
                                        {el.svg}
                                    </Link>
                                    {basket[0]?.cart_item.length && index === 0 ? (
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
                                    ) : (
                                        ""
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
