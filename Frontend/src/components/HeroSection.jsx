// components/HeroSection.jsx
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  useBreakpointValue,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function AIScanOverlay() {

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 400 400"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 2,
      }}
    >
      <ellipse
        cx="200"
        cy="200"
        rx="110"
        ry="150"
        stroke="#00eaff"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
      <motion.rect
        x="90"
        width="220"
        height="10"
        rx="5"
        fill="url(#scanGradient)"
        initial={{ y: 100 }}
        animate={{ y: [100, 300, 100] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <defs>
        <linearGradient id="scanGradient" x1="90" y1="0" x2="310" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00eaff" />
          <stop offset="1" stopColor="#7f5fff" />
        </linearGradient>
      </defs>
      <polyline
        points="200,70 200,330"
        stroke="#00eaff"
        strokeWidth="1.5"
        opacity="0.3"
      />
      <polyline
        points="110,200 290,200"
        stroke="#00eaff"
        strokeWidth="1.5"
        opacity="0.3"
      />
      <polyline
        points="140,120 260,280"
        stroke="#00eaff"
        strokeWidth="1"
        opacity="0.15"
      />
      <polyline
        points="260,120 140,280"
        stroke="#00eaff"
        strokeWidth="1"
        opacity="0.15"
      />
    </svg>
  );
}

export default function HeroSection() {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      minH="100vh"
      w="100%"
      position="relative"
      bg="#0a0a1a"
      sx={{
        background:
          "linear-gradient(0deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px), #0a0a1a",
        backgroundSize: "40px 40px",
      }}
      pt={{ base: "70px", md: "90px" }} // for navbar space
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        px={{ base: 4, md: 24 }}
        py={{ base: 8, md: 24 }}
        minH={{ base: "auto", md: "calc(100vh - 90px)" }}
        position="relative"
        zIndex={2}
      >
        {/* Left: Text */}
        <VStack align="start" spacing={6} maxW="lg" w="100%">
          <HStack>
            <Badge colorScheme="blue" fontSize="sm">
              ADVANCED TECHNOLOGY
            </Badge>
            <Badge colorScheme="purple" fontSize="sm">
              AI-POWERED
            </Badge>
          </HStack>
          <Heading
            fontSize={{ base: "2xl", sm: "3xl", md: "5xl" }}
            fontWeight="extrabold"
            lineHeight="1.1"
            color="cyan.400"
          >
            Next-<Box as="span" color="purple.400">Generation Skin</Box>
            <br />
            Analysis & Diagnostics
          </Heading>
          <Text color="gray.300" fontSize={{ base: "md", md: "lg" }} maxW="lg">
          Empowering you with AI-driven insights for better skin health. Early detection, personalized care, and expert recommendations, all at your fingertips.

          </Text>
          <HStack spacing={4} flexWrap="wrap">
            <Button
              colorScheme="cyan"
              size="md"
              px={6}
              fontWeight="bold"
              bgGradient="linear(to-r, cyan.400, purple.400)"
              color="white"
              _hover={{
                bgGradient: "linear(to-r, cyan.500, purple.500)",
              }}
              w={{ base: "100%", sm: "auto" }}
              onClick={() => navigate("/demo")}
            >
              Experience Demo
            </Button>
            <Link href="#about">
            <Button
              variant="outline"
              colorScheme="whiteAlpha"
              size="md"
              px={6}
              fontWeight="bold"
              borderColor="gray.600"
              color="gray.200"
              _hover={{
                bg: "whiteAlpha.100",
                borderColor: "purple.400",
                color: "purple.200",
              }}
              w={{ base: "100%", sm: "auto" }}
            >
              Learn More
            </Button>
            </Link>
          </HStack>
        </VStack>

        {/* Right: Image with AI scan overlay */}
        <Box
          mt={{ base: 10, md: 0 }}
          ml={{ md: 12 }}
          w={{ base: "100%", sm: "350px", md: "400px" }}
          h={{ base: "250px", sm: "350px", md: "400px" }}
          borderRadius="2xl"
          overflow="hidden"
          boxShadow="2xl"
          bg="#101a2a"
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
            alt="Face Scan"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.92,
            }}
          />
          <AIScanOverlay />
        </Box>
      </Flex>
    </Box>
  );
}