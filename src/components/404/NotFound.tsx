  import { Box, Text, Image, Button } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      minH="100vh"
    >
      <Box display="flex" flexDir="column" alignItems="center">
        <Box display="flex" justifyContent="center" alignItems="end">
          <Box
            color="white"
            fontSize={{ base: "120px", sm: "160px", md: "200px", lg: "286px" }}
            fontWeight="700"
            display="flex"
          >
            40
            <Image
              src={require("../../assets/img/Achakey.png")}
              maxW="197px"
              maxH={{ base: "126px", sm: "176px", md: "222px", lg: "291px" }}
              mt={{ base: "20px", md: "23px", lg: "50px" }}
            />
          </Box>
        </Box>
        <Text
          textAlign="center"
          color="white"
          fontSize="18px"
          mb="59px"
        >{`Страница не найдена :(`}</Text>

        <Button
          bg="blueDark"
          w="260px"
          h="45px"
          mx="auto"
          rounded="10px"
          color="white"
          fontSize="18px"
        >
          Перейти к трекам
        </Button>
        <Box maxW="700px" mx="auto" px="10px">
          <Image src={require("../../assets/img/darkAchakey.png")} />
        </Box>
      </Box>
    </Box>
  );
}
