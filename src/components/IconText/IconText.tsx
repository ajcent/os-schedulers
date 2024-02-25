import React from "react";
import { Flex, Text } from "@mantine/core";

interface IconTextProps {
  text: string;
  icon: React.ReactNode;
}

function IconText(props: IconTextProps) {
  const { text, icon } = props;

  return (
    <Flex align='center' gap={5} w='100%'>
      {icon}
      <Text>{text}</Text>
    </Flex>
  );
}

export default IconText;
