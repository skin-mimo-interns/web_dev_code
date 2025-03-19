'use client';

import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  Image,
  useDisclosure,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Links = ['Home', 'About', 'Services', 'Contact'];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bg={useColorModeValue('gray.100', 'gray.900')}
        px={4}
        w={{ base: "90%", md: "50%" }}
        minW={"270px"}
        display={"flex"}
        mx={"auto"}
        my={6}
        pos={"fixed"}
        top={0}
        left={"50%"}
        transform={"translateX(-50%)"}
        zIndex={"1000"}
        borderRadius={"md"}
        boxShadow={"md"}
      >
        <Flex w={"full"} h={16} alignItems={'center'} justifyContent={'space-around'} display={{ base: 'none', md: 'flex' }}>
          <Box>Home</Box>
          <Box>About</Box>
          <Box w={24} h={24} display={"flex"} justifyContent={"center"} alignItems={"center"} borderRadius={"50%"} bgColor={"white"} boxShadow={"md"}>
            <Image w={20} h={20} src='/taiuo.png' />
          </Box>
          <Box>Services</Box>
          <Box>Contact</Box>
        </Flex>

        {/* Mobile View */}
        <Flex w={"full"} h={16} alignItems={'center'} justifyContent={'center'} display={{ base: 'flex', md: 'none' }}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            pos={"absolute"}
            left={4}
            onClick={isOpen ? onClose : onOpen}
          />
          
          <Box w={16} h={16} display={"flex"} justifyContent={"center"} alignItems={"center"} borderRadius={"50%"} bgColor={"white"} boxShadow={"md"}>
            <Image w={12} h={12} src='/taiuo.png'/>
          </Box>
        </Flex>
      </Box>
      
      {/* Mobile Drawer */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Stack spacing={4} mt={12}>
              {Links.map((link) => (
                <Button key={link} variant="ghost" onClick={onClose}>{link}</Button>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}