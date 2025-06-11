import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  VStack,
  Icon,
  Image,
  SimpleGrid,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { CheckIcon, TimeIcon, LockIcon, InfoIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const scanAnimation = keyframes`
  0% { top: 0%; }
  50% { top: 100%; }
  100% { top: 0%; }
`;

const glowAnimation = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

const HeroSection = () => {
  return (
    <Box minH="100vh" bgGradient="linear(to-b, white, red.50)" display="flex" flexDir="column">
      {/* Navigation Bar */}

      {/* Hero Section */}
      <Flex
        flex={1}
        align="center"
        justify="center"
        px={{ base: 4, md: 8 }}
        py={{ base: 4, md: 0 }}
      >
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          justify="space-between"
          w="full"
          maxW={{ base: '100%', md: '6xl' }}
          gap={{ base: 6, lg: 0 }}
        >
          {/* Left Side: Text and Buttons */}
          <VStack
            align={{ base: 'center', lg: 'start' }}
            w={{ base: 'full', lg: '50%' }}
            spacing={{ base: 4, md: 6 }}
          >
            <Box
              bg="red.50"
              color="red.600"
              fontSize={{ base: 'xs', md: 'sm' }}
              px={{ base: 3, md: 4 }}
              py={1}
              borderRadius="full"
              textAlign="center"
            >
              Clinical Intelligence • Machine Learning • Personalized Care
            </Box>
            <Text
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="bold"
              color="gray.900"
              lineHeight="tight"
              textAlign={{ base: 'center', lg: 'left' }}
            >
              Advanced<Text as="span" color="red.500"> AI</Text><br />
              <Text as="span" color="red.500">Dermatology</Text><br />Platform
            </Text>
            <Text
              color="gray.600"
              fontSize={{ base: 'md', md: 'lg' }}
              textAlign={{ base: 'center', lg: 'left' }}
              maxW={{ base: '90%', md: '80%' }}
            >
              Detect acne, pigmentation, eczema, aging signs, and early skin cancer using clinical intelligence. Get personalized skincare solutions based on your unique biology.
            </Text>
            <HStack
              spacing={{ base: 2, md: 4 }}
              justify={{ base: 'center', lg: 'start' }}
              flexWrap="wrap"
            >
              <Link to="/analysis">
                <Button
                  bg="red.500"
                  color="white"
                  px={{ base: 4, md: 6 }}
                  py={{ base: 2, md: 3 }}
                  borderRadius="lg"
                  leftIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <rect x="7" y="2" width="10" height="20" rx="2" ry="2"></rect>
                      <line x1="12" y1="18" x2="12" y2="18"></line>
                    </svg>
                  }
                  _hover={{ bg: 'red.600' }}
                  fontSize={{ base: 'sm', md: 'md' }}
                >
                  Start AI Analysis
                </Button>
              </Link>
              {/* <Button
                border="1px"
                borderColor="gray.300"
                color="gray.700"
                px={{ base: 4, md: 6 }}
                py={{ base: 2, md: 3 }}
                borderRadius="lg"
                leftIcon={
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                }
                _hover={{ bg: 'gray.100' }}
                fontSize={{ base: 'sm', md: 'md' }}
              >
                Watch Demo
              </Button> */}
            </HStack>
            <SimpleGrid
              columns={2}
              spacingX={0}
              spacingY={2}
              pt={{ base: 2, md: 4 }}
              color="gray.600"
              fontSize={{ base: '2xs', md: 'sm' }}
              alignItems="center"
            >
              <HStack spacing={2}>
                <CheckIcon color="green.500" w={4} h={4} />
                <Text>95% Clinical Accuracy</Text>
              </HStack>
              <HStack spacing={2}>
                <LockIcon color="green.500" w={4} h={4} />
                <Text>HIPAA Compliant</Text>
              </HStack>
              <HStack spacing={2}>
                <TimeIcon color="green.500" w={4} h={4} />
                <Text>30-Second Results</Text>
              </HStack>
              <HStack spacing={2}>
                <InfoIcon color="green.500" w={4} h={4} />
                <Text>Dermatologist Validated</Text>
              </HStack>
            </SimpleGrid>
          </VStack>

          {/* Right Side: AI Face Scanning Animation with Image */}
          <Box
            w={{ base: 'full', lg: '50%' }}
            mt={{ base: 6, lg: 0 }}
            position="relative"
            maxW={{ base: 'sm', md: 'md', lg: 'full' }}
            mx="auto"
          >
            <Box
              borderRadius="2xl"
              h={{ base: 64, md: 96 }}
              w="full"
              position="relative"
              overflow="hidden"
              border="1px solid"
              borderColor="gray.300"
            >
              {/* Your Image */}
              <Image
                src="demo.png"
                alt="Face for AI scanning"
                objectFit="cover"
                w="full"
                h="full"
                opacity={1}
              />
              {/* Scanning Line */}
              <Box
                position="absolute"
                w="full"
                h="1px"
                bg="blue.500"
                animation={`${scanAnimation} 4.5s infinite`}
                boxShadow="0 0 10px rgba(59, 130, 246, 0.5)"
              />
              {/* Glowing Dots */}
              <Box
                position="absolute"
                w={4}
                h={4}
                bg="blue.500"
                borderRadius="full"
                top="20%"
                left="30%"
                animation={`${glowAnimation} 2s infinite`}
                boxShadow="0 0 10px rgba(59, 130, 246, 0.5)"
              />
              <Box
                position="absolute"
                w={4}
                h={4}
                bg="blue.500"
                borderRadius="full"
                top="40%"
                right="20%"
                animation={`${glowAnimation} 2.5s infinite`}
                boxShadow="0 0 10px rgba(59, 130, 246, 0.5)"
              />
              <Box
                position="absolute"
                w={4}
                h={4}
                bg="blue.500"
                borderRadius="full"
                bottom="30%"
                left="40%"
                animation={`${glowAnimation} 2s infinite 0.5s`}
                boxShadow="0 0 10px rgba(59, 130, 246, 0.5)"
              />
            </Box>
            <Box
              position="absolute"
              top={0}
              right={0}
              bg="red.500"
              color="white"
              px={{ base: 3, md: 4 }}
              py={1}
              borderRadius="lg"
              fontSize={{ base: 'xs', md: 'sm' }}
            >
              Analyzing...
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default HeroSection;