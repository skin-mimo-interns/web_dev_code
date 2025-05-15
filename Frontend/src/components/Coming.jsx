import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Button,
  IconButton,
  Image,
  Link,
  Fade,
} from "@chakra-ui/react";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import logo from "../../public/logo.png";

export default function ComingSoon() {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <Box
      minH="100vh"
      w="100vw"
      bg="white"
      position="relative"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={6}
    >
      {/* Top logo area */}
      <Box
        position="absolute"
        top={6}
        bg="white"
        px={6}
        py={2}
        roundedBottom="full"
        shadow="md"
        display="flex"
        alignItems="center"
        gap={3}
        userSelect="none"
        zIndex={10}
      >
        <Image src={logo} alt="Taiuo logo" boxSize="75px" />
        
      </Box>

      {/* Main text */}
      <VStack spacing={3} textAlign="center" maxW="lg" zIndex={1}>
        <Text fontSize="sm" fontWeight="medium" color="gray.600" letterSpacing="wide" userSelect="none">
          WE’RE STILL
        </Text>
        <Heading
          as="h1"
          fontSize={{ base: "4xl", md: "5xl" }}
          fontWeight="extrabold"
          color="red.600"
          userSelect="none"
        >
          Cooking Our Website.
        </Heading>
        <Text fontSize="md" color="black" maxW="sm" mx="auto">
          We are going to launch our website Very Soon. <br />
          Stay Tuned
        </Text>

        {/* Contact Us button and email hover */}
        <Box position="relative" mt={6} width="fit-content">
          <Fade in={showEmail}>
            <Text
              position="absolute"
              bottom="100%"
              mb={2}
              px={4}
              py={1}
              bg="red.50"
              borderRadius="md"
              color="red.600"
              fontWeight="semibold"
              fontSize="sm"
              userSelect="text"
              whiteSpace="nowrap"
              boxShadow="md"
            >
              team@taiuo.com
            </Text>
          </Fade>
          <Button
            colorScheme="red"
            size="lg"
            rounded="full"
            shadow="md"
            _hover={{ shadow: "lg" }}
            px={8}
            onMouseEnter={() => setShowEmail(true)}
            onMouseLeave={() => setShowEmail(false)}
          >
            Contact Us
          </Button>
        </Box>
      </VStack>

      {/* Decorative shapes */}
      <Box
        position="absolute"
        bottom={10}
        left={10}
        boxSize="50px"
        bg="blackAlpha.300"
        rounded="full"
        opacity={0.1}
        transform="rotate(20deg)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        top="30vh"
        right={20}
        boxSize="70px"
        bg="red.100"
        rounded="full"
        opacity={0.15}
        transform="rotate(45deg)"
        pointerEvents="none"
      />

      {/* Social icons */}
      {/* <HStack spacing={6} position="absolute" bottom={6} justifyContent="center" w="full" zIndex={1}>
        <Link href="https://twitter.com" isExternal>
          <IconButton
            aria-label="Twitter"
            icon={<FaTwitter />}
            rounded="full"
            size="md"
            colorScheme="blackAlpha"
            variant="ghost"
            color="black"
          />
        </Link>
        <Link href="https://instagram.com" isExternal>
          <IconButton
            aria-label="Instagram"
            icon={<FaInstagram />}
            rounded="full"
            size="md"
            colorScheme="blackAlpha"
            variant="ghost"
            color="black"
          />
        </Link>
        <Link href="https://linkedin.com" isExternal>
          <IconButton
            aria-label="LinkedIn"
            icon={<FaLinkedin />}
            rounded="full"
            size="md"
            colorScheme="blackAlpha"
            variant="ghost"
            color="black"
          />
        </Link>
      </HStack> */}
    </Box>
  );
}
