import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

export default function ComingSoonPage() {
  const navigate = useNavigate();

  return (
    <Box
      minH="100vh"
      w="100vw"
      position="relative"
      bg="#0a0a1a"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/* Subtle animated grid background */}
      <MotionBox
        position="absolute"
        inset={0}
        zIndex={0}
        bg="repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 40px)"
        animate={{ backgroundPosition: ["0px 0px, 0px 0px", "40px 40px, 40px 40px", "0px 0px, 0px 0px"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        pointerEvents="none"
      />

      <VStack
        spacing={6}
        zIndex={1}
        textAlign="center"
        w="100%"
        px={4}
      >
        <Heading
          size="2xl"
          color="cyan.300"
          fontWeight="extrabold"
          letterSpacing="tight"
          lineHeight="1.1"
        >
          Coming Soon
        </Heading>
        <Text
          fontSize={{ base: "lg", md: "2xl" }}
          color="gray.300"
          maxW="2xl"
          mx="auto"
        >
          We’re working on something amazing.<br />
          This feature will be available soon. Stay tuned!
        </Text>
        <Button
          variant="outline"
          colorScheme="whiteAlpha"
          size="lg"
          onClick={() => navigate("/")}
          borderColor="gray.600"
          color="gray.200"
          _hover={{
            bg: "whiteAlpha.100",
            borderColor: "cyan.400",
            color: "cyan.200",
          }}
          mt={8}
        >
          Back to Home
        </Button>
      </VStack>
    </Box>
  );
}