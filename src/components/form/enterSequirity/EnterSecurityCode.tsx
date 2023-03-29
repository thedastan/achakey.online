import {
  Box,
  Button,
  HStack,
  Link,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect, FC } from "react";
import { useAppSelector } from "../../../hooks/Index";

import {
  useActionEnterSequirity,
  useActionSendAgain,
  useModalforms,
} from "../../../hooks/useActions";
import { getPadTime } from "../../helpers/getPadTime";
import LoadBlock from "../../ui/LoadBlock";

const EnterSecurityCode: FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isCounting, setIsCounting] = useState<boolean>(false);

  const minutes: any | number | bigint = getPadTime(Math.floor(timeLeft / 60));
  const seconds = getPadTime(timeLeft - minutes * 60);

  const [phone, setPhoneNumber] = useState<string>("");

  const [code, setCode] = useState<any>("");
  const [canMoveNext, setCanMoveNext] = useState(true);
  const regex = new RegExp("^(?:([0-9]))*$");

  const { fetchSequirityCode } = useActionEnterSequirity();
  const { sendAgainPhone } = useActionSendAgain();
  const { loginModal } = useModalforms();

  const { loading, error, sequirityCode } = useAppSelector(
    (state) => state.reducerEnterSequirity
  );

  const onClickCode = () => {
    fetchSequirityCode({ code, phone });
  };

  const handleChange = (e: any) => {
    if (!regex.test(e)) {
      setCanMoveNext(false);
      return;
    }
    setCanMoveNext(true);
    setCode(e);
  };

  sequirityCode?.is_correct &&
    setTimeout(() => {
      loginModal();
    }, 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((timeLeft: number) => (timeLeft >= 1 ? timeLeft - 1 : 0));
    }, 1000);
    if (timeLeft === 0) setIsCounting(true);
    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

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
      {loading && (
        <Box py="10px">
          <LoadBlock />
        </Box>
      )}
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
      <Box display="flex" justifyContent="center" py="10px">
        <Button isLoading={loading} onClick={onClickCode}>
          Отправить
        </Button>
      </Box>
      <Text
        textAlign="center"
        my="10px"
        color="#777E90"
        fontSize="16px"
        fontFamily="sans"
      >
        {minutes}:{seconds}
      </Text>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        my="10px"
        fontFamily="Roboto"
        fontWeight="400"
        fontSize="14px"
      >
        <Link
          color={isCounting ? "#4285F4" : "blue.500"}
          onClick={() => {
            isCounting && sendAgainPhone(phone);
          }}
        >
          Отправить еще раз
        </Link>
      </Box>
    </Box>
  );
};

export default EnterSecurityCode;
