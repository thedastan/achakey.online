import {Box, Button, Container, flatten, Image, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";

import API from "../../api/Index";
import SvgBlackCross from "../../assets/svg/SvgBlackCross";
import {useAppDispatch, useAppSelector} from "../../hooks/Index";
import {useActionOrder} from "../../hooks/useActions";
import {fetchOrderItem} from "./action-creators/action";
import OrderListAlbums from "./orderListForAlbum";
import "./style.scss";
import ReactDOM from "react-dom/client";
import {OrderTypes} from "./types/order";

interface IOrderPopup {
    className: string;
}

export const OrderDetails = ({
                                 className,
                             }: IOrderPopup) => {
    const {fetchOrder} = useActionOrder();
    const [total, setTotal] = useState(0);
    const {orderDetails, orderId,openOrder, openOrderId} = useAppSelector(
        (state) => state.reducerOrder
    );
    const dispatch = useAppDispatch()

    function handleClickClose() {
        dispatch({type:OrderTypes.OPEN_MODAL_ORDER , payload:false})
        dispatch({type: OrderTypes.OPEN_MODAL_ORDER_ID, payload:false})
    }

    const deletedorder = async (id: string) => {
        try {
            const responce = await API.delete(`order/delete/${id}`);

            openOrderId(false);
            fetchOrder();
        } catch (e) {

            fetchOrder();
        }
        fetchOrder();
    };

    useEffect(() => {
        fetchOrderItem(Number(orderId));
    }, []);

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

    return (
            <Box
                className={`details ${className}`}
                left="0"
                right="0"
                top="-150px"
                bottom="0"
                pos="fixed"
                zIndex="4"
                bg="transparent"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box w="100%">
                    <Box bg="#E0E0E0" mx="auto" roundedTop="20px"
                         roundedBottom={{base: "0px", md: "20px"}} maxW="688px">
                        <Container maxW="688px" pb="34px">
                            <Box pos="relative">
                                <Box
                                    display={{base: "block", sm: "none"}}
                                    onClick={handleClickClose}
                                    my="10px"
                                    pos="absolute"
                                    top="0"
                                    left="40%"
                                    w="92px"
                                    h="6px"
                                    borderRadius="11px"
                                    bg="rgba(146, 146, 146, 1);"
                                />
                                <Box
                                    w="11px"
                                    ml="auto"
                                    py="24px"
                                    cursor="pointer"
                                    onClick={handleClickClose}
                                >
                                    <SvgBlackCross/>
                                </Box>
                            </Box>
                            <Box h="30vh" overflowY="auto">
                                <Box mx="29px" mb="30px">
                                    <Box>
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
                                                                w={{base: "100px", sm: "185px"}}
                                                            >
                                                                <Image
                                                                    src={el?.music?.image}
                                                                    w="35px"
                                                                    h="35px"
                                                                    rounded="50%"
                                                                    mx="5px"
                                                                />
                                                                <Text
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
                            >
                                <Text fontSize="16px" my="10px" fontWeight="500" color="#242424">
                                    Итого: {total} сом
                                </Text>
                                <Button
                                    position="static"
                                    bg="blueDark"
                                    maxW="282px"
                                    fontSize="18px"
                                    color="white"
                                >
                                    Оформить заказ
                                </Button>
                            </Box>
                        </Container>
                    </Box>
                </Box>
            </Box>
    );
};
