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
import RegisterDesktop from "./RigisterDesktop";
import {playlistData} from "./playListData";
import {Link} from "react-router-dom";
import ModalUserAuth from "../../form/modal/ModalUser";
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
                {playlistData.map((el: any) => (
                    <SwiperSlide>
                        <Box
                            display="flex"
                            justifyContent={"space-between"}
                            alignItems="center"
                            flexDir={{base: "column", md: "column", lg: "row", xl: "row"}}
                            ml={breakpoints === "base" ? "-20px" : "0"}
                        >
                            <Box>
                                <Image
                                    src={el.image}
                                    width={["80vw", "80vw", "60vw", "50vw", "50vw"]}
                                    height={["36vh", "40vh", "40vh", "100vh", "100vh"]}
                                    borderRadius={{
                                        base: "20px",
                                        sm: "20px",
                                        md: "20px",
                                        lg: "0",
                                        xl: "0",
                                    }}
                                    m={["40px", "30px", "20px", "0", "0"]}
                                    alt="img"
                                />
                            </Box>
                            <Container
                                maxW={["75vw", "76vw", "45vw", "38vw", "34vw"]}
                                pr={["0", "0", "0", "0", "60px"]}
                            >
                                <Text
                                    as="h1"
                                    fontFamily="sans"
                                    fontSize={["20px", "25px", "30px", "35px", "38px"]}
                                    color="white"
                                >
                                    {el.name}
                                </Text>
                                <Flex alignItems="center" my="10">
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
                                        {!getAccessToken() ? (
                                            <Stack direction="row" spacing={4} align="center">
                                                    <Button
                                                        bg="none"
                                                        fontFamily="sans"
                                                        fontSize="14px"
                                                        px={["3vw", "3vw", "5vw", "4vw", "3vw"]}
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
                                                    <Button
                                                        border="1px"
                                                        bg="none"
                                                        fontFamily="sans"
                                                        fontSize="14px"
                                                        px={["3vw", "3vw", "5vw", "4vw", "3vw"]}
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
                                                        onClick={openModal}
                                                    >
                                                        Треки альбома
                                                    </Button>
                                            </Stack>
                                        ): (
                                            <Stack direction="row" spacing={4} align="center">
                                                <Link to="/basket">
                                                    <Button
                                                        bg="none"
                                                        fontFamily="sans"
                                                        fontSize="14px"
                                                        px={["3vw", "3vw", "5vw", "4vw", "3vw"]}
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
                                                <Link to="/excerpts">
                                                    <Button
                                                        border="1px"
                                                        bg="none"
                                                        fontFamily="sans"
                                                        fontSize="14px"
                                                        px={["3vw", "3vw", "5vw", "4vw", "3vw"]}
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
                                        )}
                                </Box>
                            </Container>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
            {!getAccessToken() ? (<RegisterDesktop />) : (<Box display="none"><RegisterDesktop/></Box>)}
        </Box>
    );
};

export default Music;
