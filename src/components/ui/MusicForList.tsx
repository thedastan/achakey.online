import { Box, Button, Text, Image, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";

import SvgPlay from "../../assets/svg/SvgPlay";
import { SvgPlayerGif } from "../../assets/svg/SvgPlayerGif";
import { SvgPlayerGifDefault } from "../../assets/svg/SvgPlayerGifDefault";
import { useAppSelector } from "../../hooks/Index";
import { ITrack } from "../../redux/types";
import {
  useAction,
  useActionBasket,
  useActionOrder,
  useExcerpAction,
  useModalforms,
  useTracksAction,
} from "../../hooks/useActions";
import { getAccessToken, getUserId } from "../helper";
import ModalUserAuth from "../form/modal/ModalUser";
import SvgCheckMark from "../../assets/svg/SvgCheckMark";
import { OrderPost } from "../order/types/order";

interface ITrackChange {
  onClick?: any;
  name?: string;
  music?: ITrack;
  trackBoolean?: boolean;
}

interface ICartArray {
  cart: string;
  music?: number | null;
  album?: number | null;
}

interface ICart {
  total_price: string | number;
  user: string;
  cart_item: ICartArray[];
}

export default function MusicForList({
  onClick,
  name,
  music,
  trackBoolean,
}: ITrackChange) {
  const { fetchMyTracks } = useTracksAction();
  const { fetchOrderPost, fetchOrder, fetchOrderId, fetchOrderItem } =
    useActionOrder();
  const { excerptPauseAction, excerptPlayAction } = useExcerpAction();
  const { postBasketItem, fetchBasket } = useActionBasket();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loginModal } = useModalforms();
  const { pauseTrack } = useAction();

  const { basket } = useAppSelector((state) => state.reducerBasket);
  const { myTracks } = useAppSelector((state) => state.musicReducer);
  const Order = useAppSelector((state) => state.reducerOrder.order);
  const { pause, active } = useAppSelector(
    (state) => state.excerptPlayerReducer
  );

  const userFilter = basket.filter((el) => el.user === getUserId());

  const play = (music: any) => {
    if (pause) {
      excerptPlayAction();
      pauseTrack();
    } else {
      excerptPauseAction();
      onClick(music);
      pauseTrack();
    }
  };

  const PostBasketItem = async (element: ITrack | undefined) => {
    const cart: ICart = {
      user: getUserId(),
      total_price: Number(element?.price),
      cart_item: [
        {
          music: element?.id,
          cart: getUserId(),
          album: null,
        },
      ],
    };

    const userFiter = basket.filter((el) => el.user === getUserId());
    const filterBasket = userFiter[0]?.cart_item;
    const includesTracks = filterBasket?.filter(
      (el) => el.music?.id === cart?.cart_item[0].music
    );

    if (
      includesTracks !== undefined &&
      includesTracks[0]?.music?.id === cart?.cart_item[0]?.music
    ) {
      console.log("no");
    } else {
      postBasketItem(cart);
      fetchBasket();
    }

    fetchBasket();
  };

  const postOrder = async (cart?: ITrack) => {
    const order: OrderPost = {
      user: getUserId(),
      total_price: null,
      status: null,
      order_item: [
        {
          order: getUserId(),
          music: cart?.id,
          album: null,
        },
      ],
    };

    const userFiter = Order?.filter((el) => el.user === getUserId());

    const filterUser = userFiter.map(
      //@ts-ignore
      (el) =>
        el?.order_item?.filter((i) => i.music?.id === order.order_item[0].music)
    );

    const newData = filterUser.flat();
    const arrayOfObjects = newData.map((item) => ({ ...item }));

    if (arrayOfObjects[0]?.music?.id === order?.order_item[0]?.music) {
      console.log("no");
    } else {
      fetchOrderPost(order);
      fetchOrder();
    }

    if (arrayOfObjects[0]?.music?.id === order?.order_item[0]?.music) {
      console.log(arrayOfObjects);
      fetchOrderId(Number(arrayOfObjects[0]?.id));
      fetchOrderItem(Number(arrayOfObjects[0]?.id));
      console.log(arrayOfObjects[0]?.id);
    }

    userFiter?.filter((el) =>
      el?.order_item?.filter((i) =>
        i.music?.id === order.order_item[0].music
          ? fetchOrderItem(Number(el?.id))
          : console.log("NoNo")
      )
    );

    userFiter?.filter((el) =>
      el?.order_item?.filter((i) =>
        i.music?.id === order.order_item[0].music
          ? fetchOrderId(Number(el?.id))
          : console.log("id")
      )
    );

    fetchOrder();
  };

  function dataForOrderAndBasket(element?: ITrack) {
    PostBasketItem(element);
    postOrder(element);
  }

  const openModal = () => {
    onOpen();
    loginModal();
  };

  function currentTimerAudio() {
    let minutes: any = Math.floor(Number(music?.music_short_len) / 60);
    let seconds: any = Number(music?.music_short_len) % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  }

  const cart_item = userFilter[0]?.cart_item;

  const findMusic = cart_item?.some((el) => el.music?.id === music?.id);
  const findMyMusic = myTracks.some((el) => el.id === music?.id);

  useEffect(() => {
    fetchMyTracks();
  }, []);

  return (
    <Box
      py="22px"
      borderBottom="2px"
      borderColor="#4F4F4F"
      display="flex"
      justifyContent="space-between"
      alignContent="center"
      background="transparent"
    >
      <ModalUserAuth isOpen={isOpen} onClose={onClose} />
      <Box
        display="flex"
        alignItems="center"
        w={{ base: "35vw", md: "25vw" }}
        onClick={() => {
          play(music);
        }}
      >
        <Image
          src={music?.image}
          rounded="50%"
          w={{ base: "36px", md: "47px" }}
          h={{ base: "36px", md: "47px" }}
          mr={{ base: "0px", md: "29px" }}
        />
        {active?.music_short === music?.music_short ? (
          <Box
            display="inline-block"
            w={{ base: "36px", md: "32px" }}
            h={{ base: "36px", md: "32px" }}
            pt="2px"
          >
            <Box display="flex" justifyContent="center">
              {pause ? (
                <SvgPlayerGifDefault />
              ) : (
                <Box
                  display="flex"
                  pl={{ base: "10px", sm: "7px", md: "5px", lg: "0px" }}
                  justifyContent="center"
                >
                  {music?.music_short_len ? (
                    <SvgPlayerGif />
                  ) : (
                    <SvgPlay fill="#FFFFFF" />
                  )}
                </Box>
              )}
            </Box>
          </Box>
        ) : (
          <Box display={{ base: "none", md: "block" }}>
            <SvgPlay
              fill={
                active?.music_short === music?.music_short
                  ? "#49DEFF"
                  : "#FFFFFF"
              }
            />
          </Box>
        )}
        <Text
          textColor={
            music?.music_short_len && active?.music_short === music?.music_short
              ? "blue"
              : "white"
          }
          fontSize="14.53px"
          ml="17.4px"
          cursor="pointer"
          noOfLines={1}
        >
          {name}
        </Text>
      </Box>
      <Box
        display={{ base: "none", md: "flex" }}
        alignItems="center"
        ml={{ base: "0", sm: "22px" }}
      >
        <Text
          display="flex"
          alignItems="center"
          color={
            music?.music_short_len && active?.music_short === music?.music_short
              ? "blue"
              : "white"
          }
          fontSize="14.53px"
        >
          {music?.music_short_len ? currentTimerAudio() : "00:00"}
        </Text>
      </Box>

      <Text
        color={
          music?.music_short_len && active?.music_short === music?.music_short
            ? "blue"
            : "white"
        }
        ml={{ base: "5px", md: "50px" }}
        display="flex"
        alignItems={"center"}
        fontSize="14.53px"
      >
        {Math.floor(Number(music?.price))} сом
      </Text>
      <Box display="flex" alignItems="center">
        <Button
          onClick={() =>
            getAccessToken()
              ? findMyMusic
                ? console.log("Уже куплен")
                : dataForOrderAndBasket(music)
              : openModal()
          }
          border="1px"
          borderColor={
            music?.music_short_len && active?.music_short === music?.music_short
              ? "blue"
              : "white"
          }
          rounded="38px"
          fontSize={{ base: "12px ", md: "9px" }}
          h={{ base: "28px", md: "23px" }}
          w="84px"
          fontWeight="400"
          textAlign="center"
          display="flex"
          alignItems="center"
          justifyContent={findMyMusic ? "space-between" : "center"}
          textColor={
            music?.music_short_len && active?.music_short === music?.music_short
              ? "blue"
              : "white"
          }
          background="transparent"
          colorScheme="none"
          color={findMyMusic ? "#49DEFF" : findMusic ? "#49DEFF" : "white"}
        >
          <Text mr={findMyMusic ? "4px" : "0px"}>
            {findMyMusic ? `куплен` : findMusic ? "в корзине" : "+ в корзину"}
          </Text>
          <Box mt="-1px" display={findMyMusic ? "block" : "none"}>
            <SvgCheckMark />
          </Box>
        </Button>
      </Box>
    </Box>
  );
}
