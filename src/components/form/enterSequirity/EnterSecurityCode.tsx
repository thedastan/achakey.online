import {
  Box,
  HStack,
  Input,
  Link,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import React, { useState, useRef, useEffect, FC } from "react";

import { useActionEnterSequirity } from "../../../hooks/useActions";

const EnterSecurityCode: FC = () => {
  const [time, setTime] = useState("00:01:00");
  const [phone, setPhoneNumber] = useState<string>("");
  const intervalRef = useRef<any>(null);

  const [code, setCode] = useState<any>("");
  const [canMoveNext, setCanMoveNext] = useState(true);
  const regex = new RegExp("^(?:([0-9]))*$");

  const { fetchSequirityCode } = useActionEnterSequirity();

  if (code.length === 4) {
    fetchSequirityCode({ code, phone });
    setTimeout(() => {
      setCode("");
    }, 500);
  }

  const handleChange = (e: any) => {
    if (!regex.test(e)) {
      setCanMoveNext(false);
      return;
    }
    setCanMoveNext(true);
    setCode(e);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const [hours, minutes, seconds] = time.split(":").map(parseFloat);
      const totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;
      if (totalSeconds <= 0) {
        clearInterval(intervalRef.current);
        return;
      }
      const newSeconds = totalSeconds - 1;
      const newHours = Math.floor(newSeconds / 3600);
      const newMinutes = Math.floor((newSeconds - newHours * 3600) / 60);
      const newTime = `${newHours.toString().padStart(2, "0")}:${newMinutes
        .toString()
        .padStart(2, "0")}:${(newSeconds - newHours * 3600 - newMinutes * 60)
        .toString()
        .padStart(2, "0")}`;
      setTime(newTime);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [time]);

  useEffect(() => {
    let number = sessionStorage.getItem("phoneNumber") || "";
    setPhoneNumber(number);
  }, []);

  return (
    <Box w="100%" px={{ sm: "20px" }}>
      <Text
        textAlign="center"
        color="#777E90"
        fontFamily="Poppins"
        fontWeight="400"
        fontSize="14px"
      >
        Мы отправили ваш код на номер {phone}
      </Text>
      <HStack display="flex" mt="10px" justifyContent="center">
        <PinInput
          size={{ base: "md", sm: "lg" }}
          type="number"
          manageFocus={canMoveNext}
          value={code}
          onChange={handleChange}
        >
          <PinInputField bg="white" py={{ base: "20px", sm: "25px" }} />
          <PinInputField bg="white" py={{ base: "20px", sm: "25px" }} />
          <PinInputField bg="white" py={{ base: "20px", sm: "25px" }} />
          <PinInputField bg="white" py={{ base: "20px", sm: "25px" }} />
        </PinInput>
      </HStack>
      <Box display="flex" justifyContent="center" mt="10px">
        <Input
          w="100px"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          border="none"
          boxShadow="none"
          focusBorderColor="none"
          _focus={{
            boxShadow: "none",
          }}
          sx={{
            border: "none",
            outline: "none",
            "::-webkit-calendar-picker-indicator": {
              display: "none",
            },
            "::-webkit-inner-spin-button": {
              display: "none",
            },
            "::-webkit-clear-button": {
              display: "none",
            },
          }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        my="10px"
        fontFamily="Roboto"
        fontWeight="400"
        fontSize="14px"
      >
        <Link color="#4285F4">Отправить еще раз</Link>
      </Box>
    </Box>
  );
};

export default EnterSecurityCode;
