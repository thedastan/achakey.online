import React from 'react';
import disk from "../../../../assets/img/Disk.png"
import {Image, Box, useBreakpointValue} from "@chakra-ui/react";
import "./style.css"
interface MusicProps {
    musicPlay: boolean
}



const Disk: React.FC<MusicProps> = ({musicPlay}) => {
    const breakpoints = useBreakpointValue({base: "base", sm: "sm", md: "md", lg: "lg", xl: "xl", "2xl": "2xl"});
    return (
        <Box style={{display: musicPlay ? "block" : "none"}}   >
            <Image
                src={disk}
                alt="disk"
                className="disk"
                display={{base: "none", sm: "none", md: "none", lg: "block" ,xl:"block"}}
                top={{lg: "35%", xl: "35%", "2xl": "35%"}}
                width={breakpoints === "lg" ? "140px" : "170px" && breakpoints === "xl" ? "200px" : "221px"}
            />
        </Box>
    );
};

export default Disk;