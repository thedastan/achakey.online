import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import {
  currentIndexAction,
  eventChange,
} from "../playlist/reducer/action-creator";
import {
  useAction,
  useActionBasket,
  useActionOrder,
  useExcerpAction,
} from "../../hooks/useActions";
import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import { ITrack } from "../../redux/types";
import { changeAction } from "../../global-audio-player-excerpt/action";

import SvgNext from "../../assets/svg/SvgNext";
import SvgPause from "../../assets/svg/SvgPause";
import SvgPlay from "../../assets/svg/SvgPlay";
import SvgPrev from "../../assets/svg/SvgPrev";
import defaultImage from "../../assets/img/defaultImage.png";

import { getIdAlums, getUserId } from "../helper";
import { fetchAlbumsDetails } from "../../pages/details-albums/action-creators";
import { fetchBasket } from "../../pages/basket/action-creators/action";
import { OrderDetails } from "../order/OrderDetails";
import { OrderPost } from "../order/types/order";
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
  const dispatch = useAppDispatch();
  const { albums } = useAppSelector((state) => state.reducerDetailsAlbums);
  const { basket } = useAppSelector((state) => state.reducerBasket);
  const Order = useAppSelector((state) => state.reducerOrder.order);
  // const filterUser = basket.filter((el) => el.user === albums);
  const [openPopup, setOpenPopup] = useState(false);
  const { event } = useAppSelector((state) => state.eventReducer);
  const indexCurrent = useAppSelector(
    (state) => state.currentIndexReducer.currentIndex
  );

  const { pause, active, duration, currentTime, forAlbum } = useAppSelector(
    (state) => state.excerptPlayerReducer
  );

  const { pauseTrack } = useAction();
  const { postBasketItem } = useActionBasket();
  const { fetchOrderPost, fetchOrder, fetchOrderId, fetchOrderItem } =
    useActionOrder();

  const {
    excerptActiveAction,
    excerptPauseAction,
    excerptPlayAction,
    excerptCurrentTimeAction,
  } = useExcerpAction();

  const play = () => {
    if (forAlbum) {
      if (pause) {
        excerptPlayAction();
        pauseTrack();
      } else {
        excerptPauseAction();
        pauseTrack();
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
      alert("Success");
      postBasketItem(cart);
      fetchBasket();
    } else {
      alert("No");
      fetchBasket();
    }
    fetchBasket();
  }

  function postOrderAlbum() {
    setOpenPopup(true);
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
      alert("No");
    } else {
      alert("Success");
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

    setOpenPopup(true);
    fetchOrder();
  }

  const findAlbum = basket[0]?.cart_item.some(
    (el) => el.album?.id === albums.id
  );

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchAlbumsDetails(getIdAlums()));
  }, []);

  useEffect(() => {
    fetchBasket();
  }, []);

  console.log(albums, "a");
  console.log(basket, "b");

  return (
    <section
      style={{
        marginBottom: "32px",
        background: "transparent",
        position: "relative",
      }}
    >
      <Box
        display="flex"
        flexDir={{ base: "column", md: "row" }}
        alignItems="end"
      >
        <Box
          mb="20px"
          fontSize="32px"
          color="white"
          display={{ base: "block", md: "none" }}
          fontWeight="900"
          mx="auto"
        >
          {albums.name}
          <Text>{`[Album]`}</Text>
        </Box>
        <Box
          maxW="176px"
          h="225px"
          mr={{ base: "0", md: "23px" }}
          mx={{ base: "auto", md: "0" }}
          mb={{ base: "19px", md: "0" }}
        >
          <Image src={albums?.image ? albums.image : defaultImage} />
        </Box>
        <Box
          w={{ base: "100%", md: "90%" }}
          flexDir={{ base: "column", md: "row" }}
          pl="10px"
        >
          <Box
            mb="32px"
            fontSize="38.57px"
            color="white"
            display={{ base: "none", md: "block" }}
            fontWeight="900"
          >
            {albums.name}
            <Text>{`[Album]`}</Text>
          </Box>
          <Box
            display="flex"
            flexDir={{ base: "column", md: "row" }}
            mb="32px"
            alignItems="center"
          >
            <Box mb={{ base: "20px", md: "0" }} w="150px" display="flex">
              <Button
                bg="transparent"
                colorScheme="none"
                onClick={() => (forAlbum ? OnClickPrev : console.log("Prev"))}
                p="0"
              >
                <SvgPrev />
              </Button>
              <Button
                bg="transparent"
                colorScheme="none"
                onClick={play}
                p="0"
                mx="2px"
              >
                {forAlbum && pause ? (
                  <SvgPlay fill="white" />
                ) : (
                  <SvgPause fill="white" />
                )}
              </Button>
              <Button
                bg="transparent"
                colorScheme="none"
                onClick={() => (forAlbum ? OnClickNext() : console.log("Next"))}
                p="0"
              >
                <SvgNext />
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
                {forAlbum ? startTimer() : 0}
              </Text>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            flexDir={{ base: "column", md: "row" }}
          >
            <Box display="flex" flexDir={{ base: "column", sm: "row" }}>
              <Button
                onClick={postOrderAlbum}
                rounded="50px"
                w={{ base: "55vw", sm: "39vw", md: "17vw" }}
                py="9px"
                fontSize="14px"
                mr={{ base: "0", sm: "10%", md: "11px" }}
                bg="blueDark"
                textColor="white"
                mb={{ base: "20px", sm: "0" }}
              >
                Купить сейчас
              </Button>
              <Button
                onClick={postCartAlbum}
                rounded="50px"
                py="9px"
                w={{ base: "55vw", sm: "39vw", md: "17vw" }}
                fontSize="14px"
                bg="transparent"
                border="1px"
                borderColor="blueDark"
                color="blueDark"
              >
                {findAlbum ? "В корзине" : "В корзину"}
              </Button>
            </Box>
          </Box>
        </Box>
        <Box mx="auto" maxW="700px">
          <OrderDetails
            setOpenPopup={setOpenPopup}
            className={openPopup ? "active" : ""}
          />
        </Box>
      </Box>
    </section>
  );
}
