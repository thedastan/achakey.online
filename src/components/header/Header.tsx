import {
  Box,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";

import SvgSearch from "../../assets/svg/SvgSearch";
import { searchResult } from "./action-creators/Action";
import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import Popup from "../ui/Popup";
import "./style.scss";

export default function Header() {
  const dispatch = useAppDispatch();
  const { searchChange } = useAppSelector((state) => state.searchChangeReducer);
  const listTruck = [
    {
      _id: "1",
      name: "Волчий вой",
      audio:
        "https://muzes.net/uploads/music/2022/10/Ulukmanapo_Volchij_voj.mp3",
      excerpt: "00:30",
      price: "90c",
    },
    {
      _id: "2",
      name: "la liga",
      audio: "https://dl2.mp3party.net/online/10068051.mp3",
      excerpt: "00:30",
      price: "90c",
    },
    {
      _id: "3",
      name: "Герой",
      audio:
        "https://uztop.net/uploads/music/2023/02/FREEMAN_996_Geroj_OST_RAZBOI.mp3",
      excerpt: "00:30",
      price: "90c",
    },
    {
      _id: "10",
      name: "Ойлорумда",
      audio:
        "https://mp3fly.net/uploads/files/mp3/02-2021/1613108060_Bakr_-_Oylorumda.mp3",
      excerpt: "00:30",
      price: "90c",
    },
    {
      _id: "5",
      name: "Силуэт",
      audio: require("../../assets/audio/bakr-tvoj-siluet-igraet-na-glazah.mp3"),
      excerpt: "00:30",
      price: "90c",
    },
  ];

  const searchResultArray = listTruck.filter((el) =>
    el.name.toLocaleLowerCase().includes(searchChange.toLocaleLowerCase())
  );

  return (
    <section>
      <Box py="30px" bg="#1D1D20">
        <Container maxW="1220px">
          <InputGroup maxW="574px" mx="auto">
            <InputLeftElement pointerEvents="none" children={<SvgSearch />} />
            <Input
              type="text"
              rounded="50px"
              placeholder="Поиск треков..."
              color="rgba(255, 255, 255, 0.57)"
              onChange={(e) => dispatch(searchResult(e.target.value))}
            />
          </InputGroup>
          {searchChange && (
            <Popup>
              <Box>
                {searchResultArray.length ? (
                  searchResultArray.map((el, index) => (
                    <Text
                      key={index}
                      py="10px"
                      pl="20px"
                      borderBottom={
                        searchResultArray.length - 1 === index ? "0" : "1px"
                      }
                      borderColor="gray.200"
                    >
                      {el.name}
                    </Text>
                  ))
                ) : (
                  <Text textAlign="center" py="50px" pl="20px">
                    oops no music...
                  </Text>
                )}
              </Box>
            </Popup>
          )}
        </Container>
      </Box>
    </section>
  );
}
