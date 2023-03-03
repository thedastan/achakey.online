import React from 'react';
import Disk from "./Disk";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {Pagination, FreeMode, Scrollbar, Mousewheel} from "swiper";
import {Box, Image, Text, Button, Flex} from "@chakra-ui/react";
import {BsPlayCircle} from "react-icons/bs"

import {playlistData} from "./playListData";

interface MusicProps {
    music: boolean
}


const Music: React.FC<MusicProps> = ({music}) => {
    return (
        <div className="music" style={{display: music ? "block" : "none", background: "#3E3E3E"}}>
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
                style={{
                    width: "100%",
                    height: "100%"
                }}
            >
                {
                    playlistData.map(el => (
                        <SwiperSlide>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Image
                                        src={el.image}
                                        width="777px"
                                        height="800px"
                                        alt="img"
                                    />
                                </Box>
                                <Box maxW="600px" pr="200px">
                                    <Text as="h1" fontFamily="sans" fontSize="4xl" color="white">{el.name}</Text>
                                    <Flex alignItems="center" my="10">
                                        <BsPlayCircle fontSize="40px" color="white"/>
                                        <Box display="flex" alignItems="center">
                                            <input type="range" style={{
                                                margin: "0 20px 0 20px",
                                                width: "248px", height: "3px"
                                            }}/>
                                            <Text as="span"
                                                  fontFamily="sans"
                                                  fontWeight="semibold"
                                                  fontSize="sm"
                                                  color="rgba(255,255,255,0.34)">Отрывок</Text>
                                        </Box>
                                    </Flex>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Box>
                                            <Button
                                                bg="none"
                                                fontFamily="sans"
                                                fontSize="14px"
                                                width="207px"
                                                height="35px"
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
                                        </Box>
                                        <Box>
                                            <Button
                                                border="1px"
                                                bg="none"
                                                fontFamily="sans"
                                                fontSize="14px"
                                                width="207px"
                                                height="35px"
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
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <Flex
                justifyContent="center"
                pos="fixed"
                zIndex="10"
                top="93%"
                right="0%"
                alignItems="center"
                bg="linear-gradient(90deg, #6F7BF7 0%, #00D1FF 101.67%);"
                width="759px"
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
        </div>
    );
};

export default Music;