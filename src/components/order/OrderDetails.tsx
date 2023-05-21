import {
    Box,
    Button,
    Container,
    Image,
    ModalContent,
    Text,
    useBreakpointValue,
    Modal,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";

import SvgBlackCross from "../../assets/svg/SvgBlackCross";
import API from "../../api/Index";
import OrderListAlbums from "./orderListForAlbum";

import {useAppDispatch, useAppSelector} from "../../hooks/Index";
import {useActionBasket, useActionOrder} from "../../hooks/useActions";
import {OrderTypes} from "./types/order";
import {motion} from "framer-motion";
import "./style.scss";


interface IOrderPopup {
    className: string;
    isOpen2: any;
    overlay: any;
    closeModal2: any;
}


const MotionModalContent = motion(ModalContent);

export const OrderDetails = ({className, overlay, closeModal2,isOpen2 }: IOrderPopup) => {
    const dispatch = useAppDispatch();

    const [total, setTotal] = useState(0);

    const {fetchOrder} = useActionOrder();
    const {fetchBasketItem} = useActionBasket()
    const {orderDetails, orderId, openOrderId} = useAppSelector(
        (state) => state.reducerOrder
    );

    // function handleClickClose() {
    //     dispatch({type: OrderTypes.OPEN_MODAL_ORDER, payload: false});
    //     dispatch({type: OrderTypes.OPEN_MODAL_ORDER_ID, payload: false});
    // }

    const deletedorder = async (id: string) => {
        try {
            await API.delete(`order/delete/${id}`);
            openOrderId(false);
            fetchOrder();
        } catch (e) {
            fetchOrder();
        }
        fetchOrder();
    };

    // useEffect(() => {
    //   orderId && orderId>0 && fetchBasketItem(Number(orderId));
    // }, []);

    useEffect(() => {
        let result = 0;
        let totalAlbum = 0;

        const numberArray: any[] | undefined = orderDetails?.order_item?.map(
            (el) => el.music?.price
        );

        const numberArrayAlbum = orderDetails?.order_item?.map((el) =>
            el.album?.music?.map((j) => j.price)
        );

        const newAlbumDate: (string | undefined)[] | undefined =
            numberArrayAlbum?.flat();

        const newDate: (string | undefined)[] | undefined = [numberArray]?.flat();

        for (const keys of newDate) {
            result += typeof keys === "undefined" ? 0 : Number(keys);
        }

        const _total = newAlbumDate;

        for (const keys of [_total].flat()) {
            totalAlbum += typeof keys === "undefined" ? 0 : Number(keys);
        }

        setTotal(Number(totalAlbum + result));
    }, [orderDetails]);

    const bottom = useBreakpointValue({base: "0", md: "none"})
    return (
        <>
            <Modal
                isCentered
                isOpen={isOpen2}
                onClose={closeModal2}
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
                                onClick={closeModal2}
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
                                onClick={closeModal2}
                            >
                                <SvgBlackCross/>
                            </Box>
                        </Box>

                        <Box overflowY="auto">
                            <Box mx={{base: "10px", md: "29px"}} mb="30px">
                                <Box maxH="272px" overflowY="auto">
                                    {orderDetails?.order_item?.map((el: any, index: any) => (
                                        <div key={index}>
                                            {el.music !== null && (
                                                <Box
                                                    bg="white"
                                                    rounded="10px"
                                                    my="5px"
                                                    py="12px"
                                                    px="25px"
                                                >
                                                    <Box
                                                        display="flex"
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                    >
                                                        <Box
                                                            display="flex"
                                                            justifyContent="space-between"
                                                            alignItems="center"
                                                        >
                                                            <Image
                                                                src={el?.music?.image}
                                                                w="35px"
                                                                h="35px"
                                                                rounded="50%"
                                                            />
                                                            <Text
                                                                ml={{base:"10px",md:"26px"}}
                                                                fontSize="14px"
                                                                fontWeight="400"
                                                                noOfLines={1}
                                                                fontFamily="Montserrat,sans-serif"
                                                            >
                                                                {el?.music?.name}
                                                            </Text>
                                                        </Box>
                                                        <Text
                                                            fontWeight="400"
                                                            fontSize="12px"
                                                            fontFamily="Montserrat,sans-serif"
                                                        >
                                                            {Math.floor(el?.music?.price)} cом
                                                        </Text>
                                                        {/*<Button*/}
                                                        {/*    onClick={() => deletedorder(`${el?.id}`)}*/}
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
                                            )}
                                        </div>
                                    ))}
                                    {orderDetails?.order_item?.map((el, index) => (
                                        <Box key={index}>
                                            {el.album !== null && (
                                                <OrderListAlbums
                                                    deleted={deletedorder}
                                                    id={Number(el.id)}
                                                    music={el.album?.music}
                                                    image={el.album?.image}
                                                    name={el.album?.name}
                                                    price={el.album?.total_price}
                                                />
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            display="flex"
                            justifyContent={{base: "center", sm: "space-between"}}
                            mx="29px"
                            alignItems="center"
                            flexDir={{base: "column", sm: "row"}}
                            pt="30px"
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
                                onClick={()=>{
                                    alert('zakaz')
                                }}
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
