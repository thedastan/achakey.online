import React from 'react';
import {Box, Image, Text} from "@chakra-ui/react";

interface IMusicLeft {
    name?: string;
    image?: any;
}

const MusicLeft = ({image,name}:IMusicLeft) => {
    return (
        <Box zIndex="-1">
            <Box
                width={{
                    base: "80vw",
                    sm: "72vw",
                    md: "53vw",
                    lg: "50vw",
                    xl: "50vw",
                    "2xl": "50vw",
                }}
                height={{
                    base: "35vh",
                    sm: "40vh",
                    md: "40vh",
                    lg: "100vh",
                    xl: "100vh",
                    "2xl": "100vh",
                }}
                className="music-container"
                zIndex="-1"
            >
                <Image
                    src={image}
                    objectFit="cover"
                    width={{
                        base: "",
                        sm: "60vw",
                        md: "60vw",
                        lg: "50vw",
                        xl: "50vw",
                        "2xl": "50vw",
                    }}
                    height={{
                        base: "",
                        sm: "35vh",
                        md: "35vh",
                        lg: "100vh",
                        xl: "100vh",
                        "2xl": "100vh",
                    }}
                    borderRadius={{
                        base: "20px",
                        sm: "20px",
                        md: "20px",
                        lg: "0",
                        xl: "0",
                    }}
                    m={["10px", "15px", "20px", "0", "0"]}
                    mt={{
                        base: "80px",
                        sm: "80px",
                        md: "80px",
                        lg: "0",
                        xl: "0",
                        "2xl": "0",
                    }}
                    ml={{
                        base: "0",
                        sm: "30px",
                        md: "0",
                        lg: "0",
                        xl: "0",
                        "2xl": "0",
                    }}
                    alt="img"
                    className="music--image"
                />
                <Text
                    as="h1"
                    fontFamily="sans"
                    className="music--text"
                    fontSize={{
                        base: "17px",
                        sm: "22px",
                        md: "32px",
                        lg: "32px",
                        xl: "35px",
                        "2xl": "38px",
                    }}
                    fontWeight="900"
                    pt={{ base: "", sm: "0", md: "0" }}
                    color="white"
                >
                    {name}
                </Text>
            </Box>
        </Box>
    );
};

export default MusicLeft;