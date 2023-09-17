import React from "react";
import { Flex } from "@chakra-ui/react";

function FlexContainer({ children }) {
  return <Flex className="flexContainer">{children}</Flex>;
}

export default FlexContainer;
