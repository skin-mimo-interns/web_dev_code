import React from 'react';
import { 
  ChakraProvider, 
  Box, 
  Flex, 
  Text, 
  SimpleGrid, 
  VStack, 
  Icon, 
  extendTheme 
} from '@chakra-ui/react';
import { 
  WarningIcon, 
  SearchIcon, 
  ViewIcon, 
  SunIcon, 
  TimeIcon, 
  CheckCircleIcon, 
  SmallCloseIcon, 
  RepeatIcon 
} from '@chakra-ui/icons';



const PlatformAdvantages = () => {
  const advantages = [
    {
      icon: WarningIcon,
      title: "Skin Cancer Detection",
      description: "Early detection of melanoma and other skin cancers with 95% accuracy",
    },
    {
      icon: SearchIcon,
      title: "Acne Analysis",
      description: "Detailed acne severity assessment and treatment suggestions",
    },
    {
      icon: ViewIcon,
      title: "Pigmentation Issues",
      description: "Identify melasma, dark spots, and hyperpigmentation patterns",
    },
    {
      icon: SunIcon,
      title: "Eczema & Dermatitis",
      description: "Detect inflammatory skin conditions and severity levels",
    },
    {
      icon: TimeIcon,
      title: "Aging Analysis",
      description: "Assess fine lines, wrinkles, and age-related skin changes",
    },
    {
      icon: CheckCircleIcon,
      title: "Infection Detection",
      description: "Identify fungal, bacterial, and viral skin infections",
    },
    {
      icon: SmallCloseIcon,
      title: "Rosacea Detection",
      description: "Identify rosacea patterns and trigger analysis",
    },
    {
      icon: RepeatIcon,
      title: "Progress Tracking",
      description: "Monitor skin health improvements over time",
    },
  ];

  return (
      <Box 
        py={{ base: 10, md: 16 }} 
        px={{ base: 4, md: 8 }} 
        bgGradient="linear(to-b,  white, red.50)"
      >
        {/* Section Heading */}
        <VStack spacing={2} mb={{ base: 8, md: 12 }} textAlign="center">
          <Text 
            fontSize={{ base: "2xl", md: "3xl" }} 
            fontWeight="bold" 
            color="gray.800"
          >
            Platform Advantages
          </Text>
          <Text 
            fontSize={{ base: "md", md: "lg" }} 
            color="gray.600"
          >
            Comprehensive skin detection and prevention
          </Text>
        </VStack>

        {/* Advantages Grid */}
        <SimpleGrid 
          columns={{ base: 1, sm: 2, md: 4 }} 
          spacing={{ base: 6, md: 8 }}
          maxW="1200px"
          mx="auto"
        >
          {advantages.map((advantage, index) => (
            <Box
              key={index}
              bg="white"
              p={6}
              borderRadius="lg"
              boxShadow="md"
              transition="all 0.3s ease"
              _hover={{ 
                transform: "scale(1.05)", 
                boxShadow: "lg",
                bg: "red.50"
              }}
              textAlign="center"
            >
              <Icon 
                as={advantage.icon} 
                w={10} 
                h={10} 
                color="red.500" 
                mb={4} 
              />
              <Text 
                fontSize={{ base: "md", md: "lg" }} 
                fontWeight="semibold" 
                color="gray.800" 
                mb={2}
              >
                {advantage.title}
              </Text>
              <Text 
                fontSize={{ base: "sm", md: "md" }} 
                color="gray.600"
              >
                {advantage.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
  );
};

export default PlatformAdvantages;