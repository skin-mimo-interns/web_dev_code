import React from 'react';
import { Box, Flex, Heading, Text, VStack, Circle } from '@chakra-ui/react';

const ComingSoon = () => {
  return (
    <Flex
      bg="white"
      color="black"
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <VStack spacing={6}>
        {/* Logo Placeholder */}
        <Circle size="100px" bg="red.500" />

        {/* Heading */}
        <Heading size="2xl" color="red.500">
          Coming Soon
        </Heading>

        {/* Subtext */}
        <Text fontSize="lg" textAlign="center" px={4}>
          We're working hard to bring you something amazing.
        </Text>
      </VStack>
    </Flex>
  );
};

export default ComingSoon;
