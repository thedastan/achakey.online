import {Box, Button, Container, Image, Modal, ModalContent, Text, useBreakpointValue} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";

import API from "../../api/Index";
import SvgBlackCross from "../../assets/svg/SvgBlackCross";
import {useAppDispatch, useAppSelector} from "../../hooks/Index";
import {useActionOrder} from "../../hooks/useActions";
import {getUserId} from "../helper";
import OrderListAlbums from "./orderListForAlbum";
import defaultImage from "../../assets/img/defaultImage.png";
import "./style.scss";
import {OrderTypes} from "./types/order";
import {motion} from "framer-motion";

interface IOrderPopup {
    className: string;
    isOpen1: any;
    overlay: any;
    closeModal1: any;
}


const MotionModalContent = motion(ModalContent);
export const OrderPopup = ({className, closeModal1, overlay, isOpen1}: IOrderPopup) => {
    const dispatch = useAppDispatch();
    const [total, setTotal] = useState(0);

    const {fetchOrder} = useActionOrder();
    const {order} = useAppSelector((state) => state.reducerOrder);

    const filterUser = order.filter((el) => el.user === getUserId());

    function handleClickClose() {
        dispatch({type: OrderTypes.OPEN_MODAL_ORDER, payload: false});
    }

    const deletedorder = async (id: string) => {
        try {
            const responce = await API.delete(`order/delete/${id}`);
            fetchOrder();
            return console.log(responce);
        } catch (e) {
            fetchOrder();
        }
        fetchOrder();
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    useEffect(() => {
        let result = 0;
        let totalAlbum = 0;

        const numberArray = filterUser.map((el) =>
            el.order_item?.map((i) => i.music?.price)
        );

        const numberArrayAlbum = filterUser.map((el) =>
            el.order_item?.map((i) => i.album?.music?.map((j) => j.price))
        );

        const newAlbumDate = numberArrayAlbum.flat();

        const newDate = numberArray.flat();

        for (const keys of newDate) {
            result += typeof keys === "undefined" ? 0 : Number(keys);
        }

        for (const keys of newAlbumDate.flat()) {
            totalAlbum += typeof keys === "undefined" ? 0 : Number(keys);
        }
        setTotal(totalAlbum + result);
    }, [order]);
    const bottom = useBreakpointValue({base: "0", md: "none"})
    return (
        <>
            <Modal
                isCentered
                isOpen={isOpen1}
                onClose={closeModal1}
            >
                {overlay}
                <MotionModalContent
                    position="fixed"
                    exit={{translateY: "150%"}}
                    right="0"
                    left="0"
                    bottom={bottom}
                    maxW="688px"
                    h="auto"
                    mx="auto"
                    marginTop="0"
                    marginBottom="0"
                    // className="modal-content "
                    className={`modal-content ${className}`}
                    borderTopRadius={{base: "20px", md: "none"}}
                    p="26px 23px"
                    bg="#E0E0E0"
                    rounded={{base: "0px", md: "20px"}}
                >
                    <Container
                        mx="auto"
                        maxW="688px"
                        pb="34px">
                        <Box pos="relative">
                            <Box
                                display={{base: "block", sm: "none"}}
                                onClick={closeModal1}
                                pos="absolute"
                                top="-8px"
                                left="36%"
                                w="92px"
                                h="6px"
                                borderRadius="11px"
                                bg="rgba(146, 146, 146, 1);"
                            />
                            <Box
                                w="11px"
                                ml="auto"
                                pb="24px"
                                cursor="pointer"
                                onClick={closeModal1}
                            >
                                <SvgBlackCross/>
                            </Box>
                        </Box>

                        <Box h="60vh" overflowY="auto">
                            <Box mx={{base: "10px", md: "29px"}} mb="30px">
                                <Box maxH={{base: "220px", sm: "426px", md: "619px"}} overflowY="auto">
                                   <Box h='full'>
                                       {order?.map((item, index) => (
                                           <Box key={index}>
                                               {item.order_item?.map((el, index) => (
                                                   <div key={index}>
                                                       {el.music !== null && (
                                                           <Box
                                                               bg="white"
                                                               rounded="10px"
                                                               my="10px"
                                                               pt="12px"
                                                               pb="11px"
                                                               px="25px"
                                                           >
                                                               <Box
                                                                   display="flex"
                                                                   justifyContent="space-between"
                                                                   alignItems="center"
                                                               >
                                                                   <Box
                                                                       display="flex"
                                                                       justifyContent="start"
                                                                       alignItems="center"
                                                                       w={{base: "155px", sm: "185px"}}
                                                                   >
                                                                       <Image
                                                                           src={
                                                                               el?.music?.image
                                                                                   ? el.music.image
                                                                                   : defaultImage
                                                                           }
                                                                           w="35px"
                                                                           h="35px"
                                                                           rounded="50%"
                                                                       />
                                                                       <Text
                                                                           fontSize="14px"
                                                                           fontWeight="400"
                                                                           ml={{base: "10px", sm: "26px"}}
                                                                           textAlign="start"
                                                                           fontFamily="Roboto,sans-serif"
                                                                           noOfLines={2}
                                                                       >
                                                                           {el?.music?.name}
                                                                       </Text>
                                                                   </Box>
                                                                   <Box display="flex" alignItems="center">
                                                                       <Text
                                                                           fontWeight="400"
                                                                           // mr="48px"
                                                                           fontSize="14px"
                                                                           fontFamily="Roboto,sans-serif"
                                                                       >
                                                                           {Math.floor(Number(el?.music?.price))} cом
                                                                       </Text>
                                                                       {/*<Button*/}
                                                                       {/*    onClick={() => deletedorder(`${item.id}`)}*/}
                                                                       {/*    bg="transparent"*/}
                                                                       {/*    colorScheme="none"*/}
                                                                       {/*    px="0"*/}
                                                                       {/*    py="0"*/}
                                                                       {/*    color="#C10404"*/}
                                                                       {/*    fontSize="12px"*/}
                                                                       {/*    fontWeight="400"*/}
                                                                       {/*>*/}
                                                                       {/*    Удалить*/}
                                                                       {/*</Button>*/}
                                                                   </Box>
                                                               </Box>
                                                           </Box>
                                                       )}
                                                   </div>
                                               ))}
                                           </Box>
                                       ))}
                                       {order?.map((item, index) => (
                                           <div key={index}>
                                               {
                                                   <Box>
                                                       {item?.order_item?.map((el, index) => (
                                                           <Box key={index}>
                                                               {el.album !== null && (
                                                                   <OrderListAlbums
                                                                       deleted={deletedorder}
                                                                       id={Number(item.id)}
                                                                       music={el.album?.music}
                                                                       image={el.album?.image}
                                                                       name={el.album?.name}
                                                                       price={el.album?.total_price}
                                                                   />
                                                               )}
                                                           </Box>
                                                       ))}
                                                   </Box>
                                               }
                                           </div>
                                       ))}
                                   </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            display="flex"
                            justifyContent={{base: "center", sm: "space-between"}}
                            flexDir={{base: "column", sm: "row"}}
                            alignItems="center"
                            pt="30px"
                            mx="29px"
                        >
                            <Text fontFamily="Roboto,sans-serif" fontSize={{base:"16px",sm:"20px"}} my="10px" fontWeight="500" color="#242424">
                                Итого: {total} сом
                            </Text>
                            <Button
                                position="static"
                                bg="blueDark"
                                maxW="282px"
                                fontSize="18px"
                                color="white"
                                px="70px"
                                fontFamily="Roboto,sans-serif"
                                py={{base:"14px",sm:"12px"}}
                            >
                                Оформить заказ
                            </Button>
                        </Box>
                    </Container>
                </MotionModalContent>
            </Modal>
        </>
    );
};
