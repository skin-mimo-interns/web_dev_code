import { Box, SimpleGrid, VStack, Heading, Text, Icon } from "@chakra-ui/react";
import { FaCamera, FaBrain, FaShieldAlt } from "react-icons/fa";

const features = [
  {
    icon: FaCamera,
    title: "Instant Skin Scan",
    desc: "Snap a photo and get results in seconds with our advanced AI."
  },
  {
    icon: FaBrain,
    title: "Medical-Grade AI",
    desc: "500+ skin conditions & aiming 94% accuracy."
  },
  {
    icon: FaShieldAlt,
    title: "Private & Secure",
    desc: "Your data is encrypted and never shared."
  }
];

export default function FeaturesSection() {
  return (
    <Box py={24} px={{ base: 6, md: 24 }} bg="gray.900" id="features">
      <Heading size="xl" mb={12} textAlign="center" color="white">
        Why Choose Taiuo?
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {features.map((f, i) => (
          <VStack
            key={i}
            bg="gray.800"
            p={8}
            borderRadius="xl"
            boxShadow="lg"
            align="center"
            spacing={6}
            _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
            transition="all 0.2s"
          >
            <Icon as={f.icon} w={12} h={12} color="purple.400" />
            <Heading size="md" color="white">{f.title}</Heading>
            <Text color="gray.300" textAlign="center">{f.desc}</Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}