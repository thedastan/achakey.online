import {Box, useDisclosure} from "@chakra-ui/react";
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import SvgAllTracks from "../../assets/svg/SvgAllTracks";
import SvgBasket from "../../assets/svg/SvgBasket";
import SvgHome from "../../assets/svg/SvgHome";
import SvgTrack from "../../assets/svg/SvgTrack";
import {useAppSelector} from "../../hooks/Index";
import {useModalforms} from "../../hooks/useActions";
import ModalUserAuth from "../form/modal/ModalUser";
import {getAccessToken} from "../helper";
import "./style.scss";

interface IPropsMenuBar {
    children?: any;
}

export default function MenuBar({children}: IPropsMenuBar) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {active} = useAppSelector((state) => state.playReducer);
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
            link: "/",
        },
        {
            item: "Все треки",
            svg: (
                <SvgAllTracks
                    fill={
                        window.location.pathname === "/excerpts"
                            ? "white"
                            : "rgba(255, 255, 255, 0.4)"
                    }
                />
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
            link: "/basket",
        },
    ];

    return (
        <Box maxW="1660px" mx="auto">
            <ModalUserAuth isOpen={isOpen} onClose={onClose}/>
            <Box
                position="fixed"
                left="0"
                top="0"
                bottom="0"
                bg={
                    window.location.pathname === "/"
                        ? "linear-gradient(90deg, #000000 22.36%, rgba(0, 0, 0, 0) 93.34%)"
                        : "#0B0B0B"
                }
                zIndex="2"
                display={{base: "none", md: "block"}}
                w={window.location.pathname === "/" ? "25%" : "96px"}
            >
                <Box py="46px">
                    {list.slice(0, 2).map((el, index) => (
                        <Box key={index} onClick={handleRefresh} py="17.5px" pl="30px" pr="41px" display="flex">
                            <Link to={el.link} className="hover-text">
                                {el.svg}
                                <span className="tooltip-text" id="right">
                  {el.item}
                </span>
                            </Link>
                        </Box>
                    ))}
                    {list.slice(2, 4).map((el, index) => (
                        <Box key={index} py="17.5px" pl="30px" pr="41px" display="flex">
                            <Link to={el.link} className="hover-text">
                                {el.svg}
                                <span className="tooltip-text" id="right">
                                    {el.item}
                                  </span>
                            </Link>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box display={{base: "block", md: "none"}} zIndex="2">
                <Box
                    position="fixed"
                    bottom={active ? "60px" : "21px"}
                    left="0"
                    right="0"
                    display="flex"
                    justifyContent="center"
                    zIndex="2"
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
                        {list.map((el, index) => (
                            <Box key={index} onClick={handleRefresh} textColor="white">
                                <Link to={el.link} title={el.item}>
                                    {el.svg}
                                </Link>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
            <Box
                w={{base: "100%", md: "92%", xl: "95%"}}
                ml="auto"
                minH="100vh"
                bg="#1D1D20"
            >
                {children}
            </Box>
        </Box>
    );
}
