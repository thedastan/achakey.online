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
  useExcerpAction,
} from "../../hooks/useActions";
import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import { ITrack } from "../../redux/types";
import { changeAction } from "../../global-audio-player-excerpt/action";
import { OrderPopup } from "../order/OrderPopup";

import SvgNext from "../../assets/svg/SvgNext";
import SvgPause from "../../assets/svg/SvgPause";
import SvgPlay from "../../assets/svg/SvgPlay";
import SvgPrev from "../../assets/svg/SvgPrev";

import "./style.scss";
import "../ui/style.scss";
import { getIdAlums, getUserId } from "../helper";
import { fetchAlbumsDetails } from "../../pages/details-albums/action-creators";
import { fetchBasket } from "../../pages/basket/action-creators/action";
interface IlistMedia {
  listTruck?: ITrack[] | any;
}

interface ITrackChange {
  onClick?: any;
  name?: string;
  music?: ITrack;
  tracks?: boolean;
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

interface IOrderArray {
  cart: string;
  music?: number | null;
  album?: number | null | any;
}

interface IOrder {
  total_price: string | number;
  user: string;
  order_item: IOrderArray[];
}

export default function AudioPlayer({ listTruck }: IlistMedia) {
  const dispatch = useAppDispatch();
  const { albums } = useAppSelector((state) => state.reducerDetailsAlbums);
  const { basket } = useAppSelector((state) => state.reducerBasket);

  const [openPopup, setOpenPopup] = useState(false);
  const { event } = useAppSelector((state) => state.eventReducer);
  const indexCurrent = useAppSelector(
    (state) => state.currentIndexReducer.currentIndex
  );

  const { pause, active, duration, currentTime } = useAppSelector(
    (state) => state.excerptPlayerReducer
  );

  const { pauseTrack } = useAction();
  const { postBasketItem } = useActionBasket();

  const {
    excerptActiveAction,
    excerptPauseAction,
    excerptPlayAction,
    excerptCurrentTimeAction,
  } = useExcerpAction();

  const play = () => {
    if (pause) {
      excerptPlayAction();
      pauseTrack();
    } else {
      excerptPauseAction();
      pauseTrack();
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
    const order: IOrder = {
      user: getUserId(),
      total_price: Number(active?.price),
      order_item: [
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
      (el) => el.album?.id === order?.order_item[0].album
    );

    if (includesTracks[0]?.album?.id !== order?.order_item[0]?.album) {
      alert("Success");
      // postBasketItem(cart);
      fetchBasket();
    } else {
      alert("No");
      fetchBasket();
    }
    fetchBasket();
  }

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchAlbumsDetails(getIdAlums()));
  }, []);

  useEffect(() => {
    fetchBasket();
  }, [basket]);

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
          maxW="176px"
          h="225px"
          mr={{ base: "0", md: "23px" }}
          mx={{ base: "auto", md: "0" }}
          mb={{ base: "19px", md: "0" }}
        >
          <Image src={active?.image} />
        </Box>
        <Box
          w={{ base: "100%", md: "90%" }}
          flexDir={{ base: "column", md: "row" }}
          pl="10px"
        >
          <Text
            mb="32px"
            fontSize="38.57px"
            color="white"
            display={{ base: "none", md: "block" }}
          >
            {active?.name}
          </Text>
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
                onClick={OnClickPrev}
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
                {pause ? <SvgPlay fill="white" /> : <SvgPause fill="white" />}
              </Button>
              <Button
                bg="transparent"
                colorScheme="none"
                onClick={OnClickNext}
                p="0"
              >
                <SvgNext />
              </Button>
            </Box>

            <Box w="100%" ml="auto" display="flex" alignItems="center">
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={changeCurrentTime}
                className="time"
              />
              <Text
                w="60px"
                textAlign="end"
                fontSize={{ base: "12px", md: "16px" }}
                textColor="white"
              >
                {startTimer()}
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
                onClick={() => setOpenPopup(true)}
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
                В корзину
              </Button>
            </Box>
          </Box>
        </Box>
        <Box mx="auto" maxW="700px">
          <OrderPopup
            setOpenPopup={setOpenPopup}
            className={openPopup ? "transform" : ""}
          />
        </Box>
      </Box>
    </section>
  );
}
