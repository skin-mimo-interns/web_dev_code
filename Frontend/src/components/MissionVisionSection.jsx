import { Box, Flex, VStack, Heading, Text, Icon } from "@chakra-ui/react";
import { FaBullseye, FaEye } from "react-icons/fa";

export default function MissionVisionSection() {
  return (
    <Box
      id="mission-vision"
      py={{ base: 12, md: 24 }}
      px={{ base: 4, md: 24 }}
      bg="#10101a"
      color="white"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align="stretch"
        justify="center"
        gap={{ base: 10, md: 24 }}
        maxW="6xl"
        mx="auto"
      >
        {/* Mission */}
        <VStack
          align="start"
          spacing={4}
          flex={1}
          bg="rgba(255,255,255,0.02)"
          borderRadius="xl"
          p={{ base: 6, md: 10 }}
          boxShadow="md"
        >
          <Icon as={FaBullseye} w={10} h={10} color="cyan.400" />
          <Heading size="lg" color="cyan.300">
            Our Mission
          </Heading>
          <Text color="gray.300" fontSize="lg">
          Our mission is to empower individuals and healthcare professionals with AI-driven diagnostic tools that enhance clinical accuracy, support smart decision-making, and bridge the healthcare accessibility gap. We combine medical expertise with technology to provide everyone with access to high-quality skin health insights, from everyday concerns to critical conditions.

            </Text>
        </VStack>
        {/* Vision */}
        <VStack
          align="start"
          spacing={4}
          flex={1}
          bg="rgba(255,255,255,0.02)"
          borderRadius="xl"
          p={{ base: 6, md: 10 }}
          boxShadow="md"
        >
          <Icon as={FaEye} w={10} h={10} color="purple.400" />
          <Heading size="lg" color="purple.300">
            Our Vision
          </Heading>
          <Text color="gray.300" fontSize="lg">
          We strive to revolutionize the future of dermatological care through cutting-edge AI technology. Our vision is to make fast, accurate, and accessible skin analysis available to all — enabling early detection, timely treatment, and personalized care regardless of location or socioeconomic background.

          </Text>
        </VStack>
      </Flex>
    </Box>
  );
}