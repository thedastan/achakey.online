import React from 'react';
import Disk from "./Disk";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {Pagination, FreeMode, Scrollbar, Mousewheel} from "swiper";
import {Box, Image, Text, Button, Flex, Grid, Stack, Container} from "@chakra-ui/react";
import {BsPlayCircle} from "react-icons/bs"

import {playlistData} from "./playListData";

interface MusicProps {
    music: boolean
}


const Music: React.FC<MusicProps> = ({music}) => {

    return (
        <Box maxW="1536px" className="music" style={{display: music ? "block" : "none", background: "#3E3E3E"}}>
            <Disk music={music}/>
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
                {
                    playlistData.map(el => (
                        <SwiperSlide>
                            <Box display="flex" justifyContent={"space-between"} alignItems="center"
                                 flexDir={{base: "column", md: "column", lg: "row", xl: "row"}}
                            >
                                <Box>
                                    <Image
                                        src={el.image}
                                        width={["80vw", "80vw", "60vw", "50vw", "50vw"]}
                                        height={["36vh", "40vh", "40vh", "100vh", "100vh"]}
                                        borderRadius={{base: "20px", sm: "20px", md: "20px", lg: "0", xl: "0"}}
                                        m={["40px", "30px", "20px", "0", "0"]}
                                        alt="img"
                                    />
                                </Box>
                                <Container
                                    maxW={[ "75vw", "76vw", "45vw", "38vw", "520px"]}
                                    pr={["0", "0", "0", "0", "60px"]}
                                >
                                    <Text as="h1" fontFamily="sans" fontSize={["20px", "25px", "30px", "35px", "38px"]}
                                          color="white">{el.name}</Text>
                                    <Flex alignItems="center" my="10">
                                        <Box fontSize="40px">
                                            <BsPlayCircle color="white"/>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <input type="range" style={{
                                                margin: "0 20px 0 20px",
                                                width: "248px", height: "3px"
                                            }}/>
                                            <Text as="span"
                                                  fontFamily="sans"
                                                  fontWeight="semibold"
                                                  fontSize="14px"
                                                  color="rgba(255,255,255,0.34)">Отрывок</Text>
                                        </Box>
                                    </Flex>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Stack direction="row" spacing={4} align="center">
                                            <Button
                                                bg="none"
                                                fontFamily="sans"
                                                fontSize="14px"
                                                px={["45px", "45px", "35px", "40px", "45px"]}
                                                py="9px"
                                                border="1px"
                                                borderColor="white"
                                                borderRadius="md"
                                                color="white"
                                                _hover={{
                                                    color: "#0EEB24",
                                                    borderColor: "#0EEB24",
                                                    background: "none"
                                                }}
                                            >Купить
                                                сейчас
                                            </Button>
                                            <Button
                                                border="1px"
                                                bg="none"
                                                fontFamily="sans"
                                                fontSize="14px"
                                                px={["28px", "30px", "35px", "48px", "53px"]}
                                                py="9px"
                                                borderColor="white"
                                                borderRadius="md"
                                                color="white"
                                                mx="20px"
                                                _hover={{
                                                    color: "#0EEB24",
                                                    borderColor: "#0EEB24",
                                                    background: "none"
                                                }}
                                            >Весь
                                                плейлист
                                            </Button>
                                        </Stack>
                                    </Box>
                                </Container>
                            </Box>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <Flex
                justifyContent="center"
                pos="fixed"
                zIndex="10"
                top="94%"
                right="0%"
                alignItems="center"
                bg="linear-gradient(90deg, #6F7BF7 0%, #00D1FF 101.67%);"
                width="50vw"
                height="52px">
                <Text
                    color="white"
                    fontWeight="200"
                    fontFamily="sans"
                    fontStyle="normal"
                    textAlign="center"
                    fontSize="14px">Зарегистрируйся, чтобы слушать музыки ограниченного выпуска</Text>
                <Text
                    color="white"
                    fontWeight="900"
                    fontFamily="sans"
                    fontStyle="normal"
                    px="14px"
                    fontSize="19px">Зарегистрироваться</Text>
            </Flex>
        </Box>
    );
};

export default Music;