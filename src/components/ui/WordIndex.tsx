import { Text } from "@chakra-ui/react";

const WordIndex = ({ text, size }: { text: string; size: string }) => {
  return (
    <Text
      textAlign="center"
      color="#353535"
      fontFamily="sans"
      fontWeight="400"
      fontSize={size}
    >
      {text}
    </Text>
  );
};
export default WordIndex;
