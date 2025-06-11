import React from 'react';
import {
  Flex,
  HStack,
  Text,
  Button,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Link,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      as="nav"
      justify="space-between"
      align="center"
      px={{ base: 4, md: 8 }}
      py={4}
      bg="white"
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <HStack spacing={2}>
        <Image src="logo.png" boxSize={16} />
        <Link to={"/"}>
        <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" color="gray.800">
          T<Text as="span" color="red.500">AI</Text>UO
        </Text>
        </Link>
      </HStack>

      {/* Desktop Menu */}
      <HStack
        spacing={{ base: 3, md: 6 }}
        color="gray.600"
        display={{ base: 'none', md: 'flex' }}
        fontSize={{ base: 'sm', md: 'md' }}
      >
        <Link to="/" _hover={{ color: 'red.500', textDecoration: 'none' }}>
          Home
        </Link>
        <Link to="/analysis" _hover={{ color: 'red.500', textDecoration: 'none' }}>
          Analysis
        </Link>
        {/* <Link to="/products" _hover={{ color: 'red.500', textDecoration: 'none' }}>
          Products
        </Link>
        <Link to="/education" _hover={{ color: 'red.500', textDecoration: 'none' }}>
          Education
        </Link> */}
        <Link href="#contact" _hover={{ color: 'red.500', textDecoration: 'none' }}>
          Contact
        </Link>
        <Button
          bg="red.500"
          color="white"
          px={{ base: 3, md: 4 }}
          py={{ base: 1, md: 2 }}
          borderRadius="full"
          _hover={{ bg: 'red.600' }}
          fontSize={{ base: 'sm', md: 'md' }}
        >
          Get Started
        </Button>
      </HStack>

      {/* Mobile Menu Button */}
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        icon={<HamburgerIcon />}
        variant="outline"
        aria-label="Open Menu"
        color="red"
        outlineColor="blackAlpha.100"
      />

      {/* Mobile Drawer Menu */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="start">
              <Link to="/" onClick={onClose} _hover={{ color: 'red.500', textDecoration: 'none' }}>
                Home
              </Link>
              <Link to="/analysis" onClick={onClose} _hover={{ color: 'red.500', textDecoration: 'none' }}>
                Analysis
              </Link>
              {/* <Link to="/products" onClick={onClose} _hover={{ color: 'red.500', textDecoration: 'none' }}>
                Products
              </Link>
              <Link to="/education" onClick={onClose} _hover={{ color: 'red.500', textDecoration: 'none' }}>
                Education
              </Link> */}
              <Link href='contact' onClick={onClose} _hover={{ color: 'red.500', textDecoration: 'none' }}>
                Contact
              </Link>
              <Button
                bg="red.500"
                color="white"
                px={4}
                py={2}
                borderRadius="full"
                _hover={{ bg: 'red.600' }}
                onClick={onClose}
              >
                Get Started
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Navbar;