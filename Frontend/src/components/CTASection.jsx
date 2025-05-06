import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <Box py={24} px={{ base: 6, md: 24 }} bgGradient="linear(to-r, purple.900, cyan.900)">
      <VStack spacing={8} align="center">
        <Heading
          as={motion.h2}
          size="2xl"
          color="white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Ready to Experience the Future of Skin Health?
        </Heading>
        <Text color="gray.200" fontSize="xl" textAlign="center" maxW="2xl">
          Try Taiuo’s AI-powered skin analysis now. Fast, private, and always free to start.
        </Text>
        <Button
          as={motion.button}
          colorScheme="purple"
          size="lg"
          px={10}
          py={6}
          fontSize="xl"
          whileHover={{ scale: 1.08 }}
          onClick={() => navigate("/demo")}
        >
          Get Started
        </Button>
      </VStack>
    </Box>
  );
}