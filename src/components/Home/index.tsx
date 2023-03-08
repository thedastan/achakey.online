import React, {useState} from "react";
import {Box, Text, Button, Stack, Container} from "@chakra-ui/react";
import SvgJaxText from "../../assets/svg/SvgJaxText";
import Music from "./Music";

const Home = () => {
    const [music, setMusic] = useState<boolean>(false);
    return (
                <Container maxW="1536px" className="bg">
                    <Box
                        pt={{base: "100px", sm: "100px", md: "200px"}}
                        pl={{base: "20px", sm: "60px", md: "100px"}}
                    >
                        <Text
                            maxW="468px"
                            style={{
                                transform: music ? " translateY(-1500%)" : "translateY(100%)",
                                transition: music ? "2s" : "2s",
                            }}
                        >
                            <SvgJaxText/>
                        </Text>
                        <Text
                            fontFamily="mono"
                            color="white"
                            fontSize={{base: "xl", sm: "xl", md: "2xl"}}
                            my={{base: "20px", sm: "20px", md: "30px"}}
                            style={{
                                transform: music ? " translateY(-1400%)" : "translateY(100%)",
                                transition: music ? "2s" : "2s",
                            }}
                        >
                            Новый
                            <br/>
                            Весений Альбом
                        </Text>
                        <Stack direction="row" spacing={4} align="center">
                            <Button
                                colorScheme="transparent"
                                variant="outline"
                                color="white"
                                fontSize="15px"
                                py="25px"
                                px="53px"
                                onClick={() => setMusic(true)}
                                style={{
                                    transform: music ? " translateY(-1300%)" : "translateY(100%)",
                                    transition: music ? "2s" : "2s",
                                }}
                            >
                                Посмотреть плейлист
                            </Button>
                        </Stack>
                        <Music music={music}/>
                    </Box>
                </Container>
    );
};

export default Home;
