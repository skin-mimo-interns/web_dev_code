import { Box, Flex, VStack, Heading, Text, Image } from "@chakra-ui/react";

export default function AboutUsSection() {
  return (
    <Box
      id="about"
      py={{ base: 12, md: 24 }}
      px={{ base: 4, md: 24 }}
      bg="#0a0a1a"
      color="white"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        gap={{ base: 10, md: 24 }}
        maxW="6xl"
        mx="auto"
      >
        {/* Image or Illustration - hidden on mobile */}
        <Box
          flex={1}
          display={{ base: "none", md: "flex" }}
          justifyContent="center"
          alignItems="center"
        >
          <Image
  src="https://www.galderma.com/sites/default/files/styles/news_main/public/CetaphilAISkinAnalyzer_News_0.png"
  alt="Taiuo Team"
  borderRadius="xl"
  boxShadow="lg"
  maxH="320px"
  objectFit="cover"
/>
        </Box>
        {/* About Us Text */}
        <VStack
          align="start"
          spacing={4}
          flex={2}
          bg="rgba(255,255,255,0.02)"
          borderRadius="xl"
          p={{ base: 6, md: 10 }}
          boxShadow="md"
        >
          <Heading size="lg" color="cyan.300">
            About Us
          </Heading>
          <Text color="gray.300" fontSize="lg">
          Taiuo Technology is an AI-powered skin health company operating in India and the United States. We specialize in skin cancer detection using computer vision and deep learning for non-invasive skin assessments. Our goal is to make early detection accurate and accessible to all.
          </Text>
          <Text color="gray.400" fontSize="md">
          In addition to skin cancer detection, Taiuo provides personalized skincare analysis, evaluating hydration, pigmentation, and texture. Our platform is designed to educate users on skin health, raise awareness of potential abnormalities, and promote early detection.
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
}