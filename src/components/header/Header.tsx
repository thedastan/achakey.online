import {
  Box,
  Button,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  Tooltip,
} from "@chakra-ui/react";

import SvgSearch from "../../assets/svg/SvgSearch";
import { searchResult } from "./action-creators/Action";
import { useAppDispatch, useAppSelector } from "../../hooks/Index";
import Popup from "../ui/Popup";
import "./style.scss";

export default function Header() {
  const dispatch = useAppDispatch();
  const { searchChange } = useAppSelector((state) => state.searchChangeReducer);
  const { tracks } = useAppSelector((state) => state.musicReducer);

  const searchResultArray = tracks.filter((el) =>
    el?.name?.toLocaleLowerCase().includes(searchChange.toLocaleLowerCase())
  );

  return (
    <Box pos="absolute" top="0" left="0" right="0" py="30px" bg="transparent">
      <Container maxW="1220px" pos="relative">
        <InputGroup maxW="574px" mx="auto" outlineColor="blue">
          <InputLeftElement
            pointerEvents="none"
            outlineColor="blue"
            children={<SvgSearch />}
          />
          <Input
            type="text"
            rounded="50px"
            placeholder="Поиск треков..."
            color="rgba(255, 255, 255, 0.57)"
            onChange={(e) => dispatch(searchResult(e.target.value))}
          />
        </InputGroup>
        {searchChange && (
          <Popup top="40px">
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
  );
}
