import {
    Box,
    Button,
    Container,
    Image,
    useBreakpointValue,
    useDisclosure,
} from "@chakra-ui/react";
import {Link} from "react-router-dom";

import LogoAchakey from "../../assets/svg/AchakeyLogo.svg";
import {useModalforms} from "../../hooks/useActions";
import {useAppDispatch, useAppSelector} from "../../hooks/Index";
import ModalUserAuth from "../form/modal/ModalUser";
import "./style.scss";
import {SvgAvatar} from "../../assets/svg/SvgAvatar";
import {getAccessToken} from "../helper";

export default function Header() {
    const dispatch = useAppDispatch();
    const {loginModal} = useModalforms();
    const {isOpen, onOpen, onClose} = useDisclosure();

    const {searchChange} = useAppSelector((state) => state.searchChangeReducer);
    const {tracks} = useAppSelector((state) => state.musicReducer);

    const searchResultArray = tracks.filter((el) =>
        el?.name?.toLocaleLowerCase().includes(searchChange.toLocaleLowerCase())
    );

    const openModal = () => {
        onOpen();
        loginModal();
    };
    const breakpoints = useBreakpointValue({
        base: "base",
        sm: "sm",
        md: "md",
        lg: "lg",
        xl: "xl",
        "2xl": "2xl",
    });
    return (
        <Box pos="absolute" top="0" left="0" right="0" py="30px" bg="transparent">
            <ModalUserAuth isOpen={isOpen} onClose={onClose}/>
            <Container
                maxW="1440px"
                pos="relative"
                display={breakpoints === "base" && "sm" && "md"  ? "block" : "flex" }
                justifyContent="end"
                alignItems="center"
            >
                {!getAccessToken() ? (
                    <Box display="flex" zIndex="11"  justifyContent={breakpoints === "base" && "sm" ? "space-between" : "end" && breakpoints === "md" ? "end" : "end"} alignItems="center" >
                        <Box zIndex="11">
                            <Link to={"/"}>
                                <Image src={LogoAchakey} alt="Logo"/>
                            </Link>
                        </Box>

                        <Button
                            ml="20px"
                            px="30px"
                            bg="white"
                            fontFamily="Roboto"
                            fontWeight="600"
                            fontSize="16px"
                            zIndex="11"
                            onClick={openModal}
                        >
                            Войти
                        </Button>
                    </Box>
                ) : (
                    <Box display="flex"   justifyContent={breakpoints === "base" && "sm" ? "space-between" : "end" && breakpoints === "md" ? "end" : "end"} alignItems="center">
                        <Box mx="10px" zIndex="21">
                            <Link to={"/"}>
                                <Image src={LogoAchakey} alt="Logo"/>
                            </Link>
                        </Box>

                        <Box zIndex="21" w="30px" h="30px" rounded="50%">
                            <SvgAvatar/>
                        </Box>
                    </Box>

                )}
            </Container>
        </Box>
    );
}
