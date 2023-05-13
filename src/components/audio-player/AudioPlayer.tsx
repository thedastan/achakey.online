import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import {Image, useDisclosure, Text, ModalOverlay} from "@chakra-ui/react";

import {
  currentIndexAction,
  eventChange,
} from "../../containers/excerptPlaylist/reducer/action-creator";
import {
  useAction,
  useActionBasket,
  useActionOrder,
  useExcerpAction,
  useModalforms,
} from "../../hooks/useActions";
import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import { ITrack } from "../../redux/types";
import { changeAction } from "../../global-audio-player-excerpt/action";

import SvgPlay from "../../assets/svg/SvgPlay";
import defaultImage from "../../assets/img/defaultImage.png";

import { getAccessToken, getIdAlums, getUserId } from "../helper";
import { fetchAlbumsDetails } from "../../pages/detailsAlbums/action-creators";
import { OrderDetails } from "../order/OrderDetails";
import { OrderPost, OrderTypes } from "../order/types/order";
import SvgForAlbumPause from "../../assets/svg/SvgForAlbumPause";
import SvgForAlbumNext from "../../assets/svg/SvgForAlbumNext";
import SvgForAlbumPrev from "../../assets/svg/SvgForAlbumPrev";
import ModalUserAuth from "../form/modal/ModalUser";
import "./style.scss";
import "../ui/style.scss";

interface IlistMedia {
  listTruck?: ITrack[] | any;
}

interface ICartArray {
  cart: string;
  music?: number | null;
  album?: number | null | any;
}

interface ICart {
  total_price: string | number;
  user: string;
  cart_item: ICartArray[];
}
export default function AudioPlayer({ listTruck }: IlistMedia) {
  const OverlayOne = () => (
      <ModalOverlay
          bg='rgba(0, 0, 0, 0.7)'
      />
  )
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const openModalUser = () => setIsOpenUser(true);
  const closeModalUser = () => setIsOpenUser(false);
  const openModal2 = () => setIsOpen2(true);
  const closeModal2 = () => setIsOpen2(false);
  const [overlay, setOverlay] = useState(<OverlayOne/>)

  const { loginModal } = useModalforms();
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();

  const { albums } = useAppSelector((state) => state.reducerDetailsAlbums);

  const { basket } = useAppSelector((state) => state.reducerBasket);
  const Order = useAppSelector((state) => state.reducerOrder.order);
  const { openOrder, openOrderId } = useAppSelector(
    (state) => state.reducerOrder
  );
  const { event } = useAppSelector((state) => state.eventReducer);
  const indexCurrent = useAppSelector(
    (state) => state.currentIndexReducer.currentIndex
  );

  const { pause, active, duration, currentTime, forAlbum } = useAppSelector(
    (state) => state.excerptPlayerReducer
  );

  const { pauseTrack } = useAction();
  const { postBasketItem, fetchBasket } = useActionBasket();
  const { fetchOrderPost, fetchOrder, fetchOrderId, fetchOrderItem } =
    useActionOrder();

  const {
    excerptActiveAction,
    excerptPauseAction,
    excerptPlayAction,
    excerptCurrentTimeAction,
    excerptForAlbumAction,
  } = useExcerpAction();

  const play = () => {
    const activeDefaultMusic = albums?.music[0];

    if (forAlbum) {
      if (pause) {
        excerptPlayAction();
        pauseTrack();
      } else {
        excerptPauseAction();
        pauseTrack();
      }
    }

    if (!active) {
      excerptActiveAction(activeDefaultMusic);
      eventChange(true);
      dispatch(currentIndexAction(0));
      pauseTrack();
      {
        window.location.pathname === "/excerpts/details/" + getIdAlums()
          ? excerptForAlbumAction(true)
          : excerptForAlbumAction(false);
      }
    }
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeAction(Number(e.target.value)));

    excerptCurrentTimeAction(Number(e.target.value));
  };

  const OnClickNext = () => {
    dispatch(eventChange(false));

    dispatch(
      currentIndexAction(
        listTruck.length - 1 === indexCurrent ? 0 : indexCurrent + 1
      )
    );

    excerptActiveAction(
      listTruck[
        event
          ? listTruck.length - 1 === indexCurrent
            ? 0
            : indexCurrent + 1
          : listTruck.length - 1 === indexCurrent
          ? 0
          : indexCurrent + 1
      ]
    );
  };

  const OnClickPrev = () => {
    dispatch(
      currentIndexAction(
        indexCurrent === 0 ? listTruck.length - 1 : indexCurrent - 1
      )
    );

    excerptActiveAction(
      listTruck[
        event
          ? indexCurrent - 1
          : indexCurrent === 0
          ? listTruck.length - 1
          : indexCurrent - 1
      ]
    );

    dispatch(eventChange(false));
  };

  function startTimer() {
    let seconds: any = currentTime % 60;
    let minutes: any = Math.floor(currentTime / 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  }

  function postCartAlbum() {
    fetchBasket();
    const cart: ICart = {
      user: getUserId(),
      total_price: Number(active?.price),
      cart_item: [
        {
          music: null,
          cart: getUserId(),
          album: albums?.id,
        },
      ],
    };

    const userFiter = basket.filter((el) => el.user === getUserId());

    const filterBasket = userFiter[0]?.cart_item;
    const includesTracks = filterBasket.filter(
      (el) => el.album?.id === cart?.cart_item[0].album
    );

    if (includesTracks[0]?.album?.id !== cart?.cart_item[0]?.album) {
      postBasketItem(cart);
      fetchBasket();
    } else {
      fetchBasket();
    }
    fetchBasket();
  }

  function postOrderAlbum() {
    fetchOrder();
    // dispatch({ type: OrderTypes.OPEN_MODAL_ORDER, payload: true });
    setOverlay(<OverlayOne/>)
    openModal2()
    const order: OrderPost = {
      user: getUserId(),
      total_price: null,
      status: null,
      order_item: [
        {
          order: getUserId(),
          music: null,
          album: albums?.id,
        },
      ],
    };

    const userFiter = Order.filter((el) => el.user === getUserId());

    const filterUser = userFiter.map(
      //@ts-ignore
      (el) =>
        el?.order_item?.filter((i) => i.album?.id === order.order_item[0].album)
    );

    const newData = filterUser.flat();
    const arrayOfObjects = newData.map((item) => ({ ...item }));

    if (arrayOfObjects[0]?.album?.id === order.order_item[0].album) {
    } else {
      fetchOrderPost(order);
      fetchOrder();
    }

    userFiter?.filter((el) =>
      el?.order_item?.filter((i) =>
        i.album?.id === order.order_item[0].album
          ? fetchOrderItem(Number(el?.id))
          : console.log("NoNo")
      )
    );

    userFiter?.filter((el) =>
      el?.order_item?.filter((i) =>
        i.album?.id === order.order_item[0].album
          ? fetchOrderId(Number(el?.id))
          : console.log("id")
      )
    );
    setOverlay(<OverlayOne/>)
    openModal2()
    // dispatch({ type: OrderTypes.OPEN_MODAL_ORDER, payload: true });
    fetchOrder();
  }

  const findAlbum = basket[0]?.cart_item.some(
    (el) => el.album?.id === albums.id
  );

  const openModal = () => {
    openModalUser();
    loginModal();
  };

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchAlbumsDetails(getIdAlums()));
  }, []);

  useEffect(() => {
    let totalAlbum = 0;

    const numberArrayAlbum = albums.music.map((el) => el.price);

    const newAlbumDate = numberArrayAlbum.flat();

    for (const keys of newAlbumDate) {
      totalAlbum += typeof keys === "undefined" ? 0 : Number(keys);
    }
    setTotal(totalAlbum);
  }, [albums]);

  useEffect(() => {
    fetchBasket();
  }, []);

  return (
    <section
      style={{
        marginBottom: "54px",
        background: "transparent",
        position: "relative",
      }}
    >
      <Box
        display="flex"
        flexDir={{ base: "column", md: "row" }}
        alignItems="end"
      >
        <ModalUserAuth isOpen={isOpenUser} onClose={closeModalUser} />
        <Box
          mb="13px"
          fontSize="32px"
          color="white"
          fontStyle="normal"
          fontFamily="sans"
          display={{ base: "block", md: "none" }}
          fontWeight="900"
          mx="auto"
        >
          {albums.name}

          <Text></Text>
          <Text textAlign="center">{`[Album]`}</Text>
        </Box>
        <Box
          mr={{ base: "0", md: "23px" }}
          mx={{ base: "auto", md: "0" }}
          mb={{ base: "23px", md: "0" }}
          w="176px"
          h="220px"
        >
          <Image
            w={{ base: "198px", md: "176px" }}
            h={{ base: "198px", md: "220px" }}
            src={albums?.image ? albums.image : defaultImage}
            objectFit="cover"
            rounded="12px"
          />
        </Box>
        <Box
          w={{ base: "100%", md: "90%" }}
          flexDir={{ base: "column", md: "row" }}
          ml="23px"
        >
          <Box
            mb="16px"
            fontSize="38.57px"
            color="white"
            display={{ base: "none", md: "block" }}
            fontFamily="sans"
            fontStyle="normal"
            fontWeight="900"
          >
            {albums.name}
            <Text>{`[Album]`}</Text>
          </Box>
          <Box
            display="flex"
            flexDir={{ base: "column", md: "row" }}
            mb="56px"
            alignItems="center"
          >
            <Box
              mb={{ base: "31px", md: "0" }}
              w={{ base: "auto", md: "150px" }}
              display="flex"
            >
              <Button
                bg="transparent"
                colorScheme="none"
                onClick={() => (forAlbum ? OnClickPrev : console.log("Prev"))}
                p="0"
              >
                <SvgForAlbumPrev />
              </Button>
              <Button
                bg="transparent"
                colorScheme="none"
                onClick={play}
                p="0"
                mx="2px"
              >
                {forAlbum && active ? (
                  <>
                    {forAlbum && pause ? (
                      <SvgPlay fill="white" />
                    ) : (
                      <SvgForAlbumPause fill="white" />
                    )}
                  </>
                ) : (
                  <SvgPlay fill="white" />
                )}
              </Button>
              <Button
                bg="transparent"
                colorScheme="none"
                onClick={() => (forAlbum ? OnClickNext() : console.log("Next"))}
                p="0"
              >
                <SvgForAlbumNext />
              </Button>
            </Box>
            <Box w="100%" ml="auto" display="flex" alignItems="center">
              <input
                type="range"
                min={0}
                max={forAlbum ? duration : 0}
                value={forAlbum ? currentTime : 0}
                onChange={changeCurrentTime}
                className="time"
              />
              <Text
                w="60px"
                textAlign="end"
                fontSize={{ base: "12px", md: "16px" }}
                textColor="white"
              >
                {forAlbum ? startTimer() : ""}
              </Text>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            flexDir={{ base: "column", md: "row" }}
          >
            <Box
              display="flex"
              alignItems="end"
              w={{ base: "100%", md: "none" }}
              justifyContent={{ base: "space-between", md: "normal" }}
            >
              <Text
                display={{ base: "none", md: "block" }}
                color="blue"
                fontSize="20px"
                fontWeight="700"
                mr="10px"
              >
                <span style={{ fontSize: "28px", paddingRight: "4px" }}>
                  {total}
                </span>
                сом
              </Text>
              <Button
                onClick={() =>
                  getAccessToken() ? postOrderAlbum() : openModal()
                }
                ml={{ base: "0px", md: "43px", lg: "48px" }}
                mr={{ sm: "10%", md: "16px" }}
                w={{ base: "40vw", sm: "39vw", md: "17vw" }}
                rounded="50px"
                py="9px"
                fontSize="14px"
                bg="blueDark"
                textColor="white"
                colorScheme="none"
              >
                Купить альбом
              </Button>
              <Button
                onClick={() =>
                  getAccessToken() ? postCartAlbum() : openModal()
                }
                rounded="50px"
                py="9px"
                w={{ base: "40vw", sm: "39vw", md: "17vw" }}
                fontSize="14px"
                bg={findAlbum ? "#007AFF" : "none"}
                border={findAlbum ? "none" : "1px"}
                borderColor={findAlbum ? "#49DEFF" : "none"}
                color={findAlbum ? "white" : "#49DEFF"}
                _hover={{
                  color: "white",
                  bg: "#007AFF",
                  border: "none",
                }}
                colorScheme="none"
              >
                {findAlbum ? "В корзине" : "В корзину"}
                <Text
                  textAlign="end"
                  color="white"
                  fontSize="14px"
                  fontWeight="700"
                  px="5px"
                  display={{ base: "flex", md: "none" }}
                >
                  <span style={{ fontSize: "14px", paddingRight: "4px" }}>
                    {total}
                  </span>
                  <Box px="1px" textDecoration="underline">
                    c
                  </Box>
                </Text>
              </Button>
            </Box>
          </Box>
        </Box>
            <OrderDetails overlay={overlay} closeModal2={closeModal2} isOpen2={isOpen2} className={openOrder ? "modal-content" : ""} />
      </Box>
    </section>
  );
}
