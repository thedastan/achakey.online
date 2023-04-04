import React from "react";

function ReferenceToByte({ ref }: { ref: React.RefObject<any> }) {
  const refValue = ref.current?.valueOf();

  const binaryString = refValue?.toString(2);

  const byte = parseInt(binaryString!, 2);

  return byte;
}
