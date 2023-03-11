import {
    Box,
    Button,
    Container,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import {Link} from "react-router-dom";

import LogoAchakey from "../../assets/svg/AchakeyLogo.svg";
import SvgSearch from "../../assets/svg/SvgSearch";
import {useModalforms} from "../../hooks/useActions";
import {useAppDispatch, useAppSelector} from "../../hooks/Index";
import ModalUserAuth from "../form/modal/ModalUser";
import "./style.scss";
import {SvgAvatart} from "../../assets/svg/SvgAvatar";
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

    return (
        <Box pos="absolute" top="0" left="0" right="0" py="30px" bg="transparent">
            <ModalUserAuth isOpen={isOpen} onClose={onClose}/>
            <Container
                maxW="1220px"
                pos="relative"
                display="flex"
                justifyContent="end"
                alignItems="center"
            >
                {!getAccessToken() ? (
                    <Box display="flex" alignItems="center" ml="auto">
                        <Box>
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
                            onClick={openModal}
                        >
                            Войти
                        </Button>
                    </Box>
                ) : (
                    <Box w="30px" h="30px" rounded="50%">
                        <SvgAvatart/>
                    </Box>
                )}
            </Container>
        </Box>
    );
}
