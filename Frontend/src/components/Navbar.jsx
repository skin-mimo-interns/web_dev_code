import {
    Box, Flex, HStack, Link, Button, Image, Spacer, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerBody, useDisclosure, VStack
  } from "@chakra-ui/react";
  import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
  
  export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    return (
      <Box
        as="nav"
        w="100%"
        px={{ base: 4, md: 24 }}
        py={2}
        position="fixed"
        top={0}
        left={0}
        zIndex={10}
        bg="rgba(167, 167, 186, 0.94)"
        boxShadow="sm"
        backdropFilter="blur(6px)"
      >
        <Flex align="center">
          {/* Logo */}
          <HStack spacing={2}>
            <Image src="/taiuo.png" alt="Taiuo Logo" boxSize="82px" />
            <Box fontWeight="bold" fontSize="xl" color="cyan.300" letterSpacing="wide">
              Taiuo
            </Box>
          </HStack>
          <Spacer />
          {/* Desktop Nav Links */}
          <HStack spacing={8} display={{ base: "none", md: "flex" }}>
            <Link href="#features" color="gray.200" fontWeight="medium" _hover={{ color: "cyan.300" }}>Features</Link>
            <Link color="gray.200" fontWeight="medium" href="#how" _hover={{ color: "cyan.300" }}>How It Works</Link>
            <Link color="gray.200" fontWeight="medium" href="#contact" _hover={{ color: "cyan.300" }}>Contact</Link>
          </HStack>
          {/* Desktop CTA */}
          <Button
            ml={8}
            colorScheme="cyan"
            size="md"
            px={6}
            fontWeight="bold"
            bgGradient="linear(to-r, cyan.400, purple.400)"
            color="white"
            _hover={{ bgGradient: "linear(to-r, cyan.500, purple.500)" }}
            display={{ base: "none", md: "inline-flex" }}
            onClick={() => navigate("/demo")}
          >
            Try Demo
          </Button>
          {/* Mobile Hamburger */}
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            variant="ghost"
            color="white"
            fontSize="2xl"
            ml={2}
            display={{ base: "inline-flex", md: "none" }}
            onClick={onOpen}
          />
          {/* Mobile Drawer */}
          <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent bg="#0a0a1a">
              <DrawerBody>
                <Flex justify="flex-end" mt={2}>
                  <IconButton
                    aria-label="Close menu"
                    icon={<CloseIcon />}
                    variant="ghost"
                    color="white"
                    onClick={onClose}
                  />
                </Flex>
                <VStack spacing={8} mt={8} align="start">
                  <Link color="gray.200" fontWeight="medium" href="#features" onClick={onClose}>Features</Link>
                  <Link color="gray.200" fontWeight="medium" href="#how" onClick={onClose}>How It Works</Link>
                  <Link color="gray.200" fontWeight="medium" href="#contact" onClick={onClose}>Contact</Link>
                  <Button
                    colorScheme="cyan"
                    size="md"
                    px={6}
                    fontWeight="bold"
                    bgGradient="linear(to-r, cyan.400, purple.400)"
                    color="white"
                    w="100%"
                    onClick={onClose}
                  >
                    Try Demo
                  </Button>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Box>
    );
  }