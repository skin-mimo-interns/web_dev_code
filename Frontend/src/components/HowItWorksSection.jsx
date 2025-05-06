import { Box, Heading, SimpleGrid, VStack, Text, Icon } from "@chakra-ui/react";
import { FaRegImage, FaSearch, FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    icon: FaRegImage,
    title: "1. Upload",
    desc: "Take or upload a clear photo of your skin area."
  },
  {
    icon: FaSearch,
    title: "2. Analyze",
    desc: "Our AI scans your image for 500+ skin conditions."
  },
  {
    icon: FaCheckCircle,
    title: "3. Get Results",
    desc: "Receive instant, accurate diagnostics and next steps."
  }
];

export default function HowItWorksSection() {
  return (
    <Box py={24} px={{ base: 6, md: 24 }} bg="gray.800" id="how">
      <Heading size="xl" mb={12} textAlign="center" color="white">
        How It Works
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {steps.map((s, i) => (
          <VStack
            key={i}
            bg="gray.700"
            p={8}
            borderRadius="xl"
            boxShadow="md"
            align="center"
            spacing={6}
          >
            <Icon as={s.icon} w={10} h={10} color="cyan.400" />
            <Heading size="md" color="white">{s.title}</Heading>
            <Text color="gray.300" textAlign="center">{s.desc}</Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}