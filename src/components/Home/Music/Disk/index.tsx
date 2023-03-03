import React from 'react';
import disk from "../../../../assets/img/Disk.png"
import {Image, Flex} from "@chakra-ui/react";


interface MusicProps {
    music: boolean
}

const Disk: React.FC<MusicProps> = ({music}) => {
    return (
        <div style={{display: music ? "block" : "none"}}>
                <Image
                    src={disk}
                    alt="disk"
                    className="disk"
                    width="221px"
                    height="221px"
                />
        </div>
    );
};

export default Disk;