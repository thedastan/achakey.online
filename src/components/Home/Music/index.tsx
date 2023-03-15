import React, {useEffect} from "react";
import Disk from "./Disk";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, FreeMode, Scrollbar, Mousewheel} from "swiper";
import {
    Box,
    Image,
    Text,
    Button,
    Flex,
    Input,
    Stack,
    Container,
    useBreakpointValue, useDisclosure,
} from "@chakra-ui/react";
import {BsPlayCircle} from "react-icons/bs";
import "swiper/css";
import "swiper/css/pagination";

import {useAppSelector} from "../../../hooks/Index";
import {useModalforms, useTracksAction} from "../../../hooks/useActions";
import {playlistData} from "./playListData";
import {Link} from "react-router-dom";
import ModalUserAuth from "../../form/modal/ModalUser";
import Footer from "../../footer/Footer";
import "./style.css"
import {getAccessToken} from "../../helper";

interface MusicProps {
    musicPlay: boolean;
}

const Music: React.FC<MusicProps> = ({musicPlay}) => {
    const {fetchTracks} = useTracksAction();
    const breakpoints = useBreakpointValue({
        base: "base",
        sm: "sm",
        md: "md",
        lg: "lg",
        xl: "xl",
        "2xl": "2xl",
    });
    const {tracks} = useAppSelector((state) => state.musicReducer);
    console.log(tracks);

    useEffect(() => {
        fetchTracks();
    }, []);
    const {loginModal} = useModalforms();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const openModal = () => {
        onOpen();
        loginModal();
    };


    return (
        <Box
            maxW="1536px"
            className="music"
            mx={"auto"}
            style={{display: musicPlay ? "block" : "none", background: "#1D1D20"}}
            zIndex="auto"

        >
            <ModalUserAuth isOpen={isOpen} onClose={onClose}/>
            <Disk musicPlay={musicPlay}/>
            <Swiper
                direction={"vertical"}
                slidesPerView={1}
                spaceBetween={30}
                mousewheel={true}
                speed={1300}
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                }}
                modules={[Pagination, FreeMode, Scrollbar, Mousewheel]}
                className="mySwiper"
            >
                {playlistData.map((el: any, index) => (
                    <Box>
                        <SwiperSlide>
                            <Box
                                display="flex"
                                justifyContent={"space-between"}
                                alignItems="center"
                                flexDir={{base: "column", md: "column", lg: "row", xl: "row"}}
                                ml={breakpoints === "base" ? "-20px" : "0"}
                            >
                                <Box zIndex="-1">
                                    <Image
                                        src={el.image}
                                        objectFit='cover'
                                        width={["88vw", "60vw", "50vw", "50vw", "50vw"]}
                                        height={["35vh", "35vh", "40vh", "100vh", "100vh"]}
                                        borderRadius={{
                                            base: "20px",
                                            sm: "20px",
                                            md: "20px",
                                            lg: "0",
                                            xl: "0",
                                        }}
                                        m={["10px", "15px", "20px", "0", "0"]}
                                        mt={["80px","80px","80px","0","0"]}
                                        ml={["30px","0","0",'0',"0"]}
                                        alt="img"
                                    />
                                </Box>
                                <Container
                                    maxW={["75vw", "70vw", "45vw", "38vw", "34vw"]}
                                    pr={["0", "0", "0", "0", "60px"]}
                                    ml={["8%","16%","22%","7%","10%"]}
                                >
                                    <Text
                                        as="h1"
                                        fontFamily="sans"
                                        fontSize={["25px", "32px", "32px", "35px", "38px"]}
                                        fontWeight="900"
                                        color="white"
                                    >
                                        {el.name}
                                    </Text>
                                    <Flex alignItems="center" my={breakpoints === "base" && "sm" && "md" ? "5" : "7"} >
                                        <Box fontSize="40px">
                                            <BsPlayCircle color="white"/>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <Input
                                                className="input-music"
                                                min={0}
                                                max={el.music_short_len}
                                                type="range"
                                                value={el.music_short}
                                                style={{
                                                    margin: "0 20px 0 20px",
                                                    width:
                                                        breakpoints === "base"
                                                            ? "40vw"
                                                            : "30vw" && breakpoints === "sm"
                                                                ? "30vw"
                                                                : "25vw" && breakpoints === "md"
                                                                    ? "25vw"
                                                                    : "16vw",
                                                    height: "1px",
                                                    background: "white",
                                                }}
                                            />
                                            <Text
                                                as="span"
                                                fontFamily="sans"
                                                fontWeight="semibold"
                                                fontSize={["10px", "12px", "14px", "14px", "14px"]}
                                                color="rgba(255,255,255,0.34)"
                                            >
                                                {el.music_short_len}
                                            </Text>
                                        </Box>
                                    </Flex>
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                            <Stack direction="row" spacing={4} align="center">
                                                {!getAccessToken() ? (
                                                        <Button
                                                            bg="none"
                                                            fontFamily="sans"
                                                            fontSize="14px"
                                                            width={["125px","160px","160px","180px","210px"]}
                                                            py="9px"
                                                            border="1px"
                                                            borderColor="white"
                                                            borderRadius="md"
                                                            color="white"
                                                            _hover={{
                                                                color: "#49DEFF",
                                                                borderColor: "#49DEFF",
                                                                background: "none",
                                                            }}
                                                            onClick={openModal}
                                                        >
                                                            В корзину
                                                        </Button>
                                                ) : (
                                                    <Link to="/basket">
                                                        <Button
                                                            bg="none"
                                                            fontFamily="sans"
                                                            fontSize="14px"
                                                            width={["125px","160px","160px","180px","210px"]}
                                                            py="9px"
                                                            border="1px"
                                                            borderColor="white"
                                                            borderRadius="md"
                                                            color="white"
                                                            _hover={{
                                                                color: "#49DEFF",
                                                                borderColor: "#49DEFF",
                                                                background: "none",
                                                            }}
                                                        >
                                                            В корзину
                                                        </Button>
                                                    </Link>
                                                )}
                                                <Link to="/excerpts">
                                                    <Button
                                                        border="1px"
                                                        bg="none"
                                                        fontFamily="sans"
                                                        fontSize="14px"
                                                        width={["125px","160px","160px","180px","210px"]}
                                                        py="9px"
                                                        borderColor="white"
                                                        borderRadius="md"
                                                        color="white"
                                                        mx="20px"
                                                        _hover={{
                                                            color: "#49DEFF",
                                                            borderColor: "#49DEFF",
                                                            background: "none",
                                                        }}
                                                    >
                                                        Треки альбома
                                                    </Button>
                                                </Link>
                                            </Stack>
                                    </Box>
                                </Container>
                            </Box>
                            {index === playlistData.length - 1 ? <Box mt={["25px","28px","28px","-89px","-89px"]}><Footer/></Box> : ""}
                        </SwiperSlide>
                    </Box>
                ))}
            </Swiper>
        </Box>
    );
};

export default Music;
