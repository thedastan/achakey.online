import React, {useState} from 'react';
import {Box, Text, Button, Stack , Container} from "@chakra-ui/react";
import SvgJaxText from "../../assets/svg/SvgJaxText"
import Music from "./Music";

const Home = () => {
    const [music, setMusic] = useState<boolean>(false)
    return (
        <section className="bg">
            <Container maxW="1220px">
                <Box    pl={{ base: "0", md: "4%", lg: "2%", xl: "1%" }}
                    pt={{base: "1%", md: "6%", lg:"10%"}}
                >
                    <Text
                        maxW="468px"

                        style={{
                            transform: music ? " translateY(-1500%)" : "translateY(100%)",
                            transition: music ? "2s" : "2s"
                        }}
                    >
                        <SvgJaxText/>
                    </Text>
                    <Text
                        fontFamily="mono"
                        color="white"
                        fontSize="2xl"
                        my="40px"
                        style={{
                            transform: music ? " translateY(-1400%)" : "translateY(100%)",
                            transition: music ? "2s" : "2s"
                        }}
                    >
                        Новый
                        <br/>Весений Альбом
                    </Text>
                    <Stack direction='row' spacing={4} align="center">
                        <Button
                            colorScheme="transparent"
                            variant='outline'
                            color="white"
                            fontSize="15px"
                            py="25px"
                            px="53px"
                            onClick={() => setMusic(true)}
                            style={{
                                transform: music ? " translateY(-1300%)" : "translateY(100%)",
                                transition: music ? "2s" : "2s"
                            }}
                        >
                            Посмотреть плейлист
                        </Button>
                    </Stack>
                    <Music music={music}/>
                </Box>
            </Container>
        </section>
    );
};

export default Home;