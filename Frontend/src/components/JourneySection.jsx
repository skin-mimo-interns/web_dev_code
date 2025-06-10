import React from 'react';
import { 
  ChakraProvider, 
  Box, 
  Flex, 
  Text, 
  Button, 
  VStack, 
  Image, 
  extendTheme 
} from '@chakra-ui/react';



const JourneySection = () => {
  const steps = [
    {
      step: "Step 1",
      title: "Capture Your Skin Image",
      description: "Simply use your smartphone camera to take clear, well-lit photos of your skin. Our app provides guidance for optimal angles and lighting.",
      image: "pic1.jpg",
    },
    {
      step: "Step 2",
      title: "AI Analysis & Diagnosis",
      description: "Upload your images for instant analysis by Taiuo's advanced AI. Our models identify conditions and provide detailed insights.",
      image: "pic2.jpeg",
    },
    {
      step: "Step 3",
      title: "Personalized Recommendations",
      description: "Receive a personalized report with actionable recommendations, including skincare product suggestions tailored to your unique biology.",
      image: "pic3.jpg",
    },
  ];

  return (
      <Box 
        py={{ base: 10, md: 16 }} 
        px={{ base: 4, md: 8 }} 
        bgGradient="linear(to-b, white, red.50)"
      >
        {/* Section Heading */}
        <Text 
          fontSize={{ base: "2xl", md: "4xl" }} 
          fontWeight="bold" 
          color="gray.800" 
          textAlign="center" 
          mb={{ base: 8, md: 12 }}
        >
          Your Journey to Healthier Skin
        </Text>

        {/* Steps */}
        <Flex 
          direction={{ base: "column", md: "row" }} 
          gap={{ base: 8, md: 6 }} 
          maxW="1200px" 
          mx="auto" 
          align="center" 
          justify="center"
        >
          {steps.map((step, index) => (
            <VStack 
              key={index} 
              spacing={4} 
              align="center" 
              w={{ base: "full", md: "33%" }} 
              maxW="400px"
            >
              <Image 
                src={step.image} 
                alt={step.title} 
                borderRadius="lg" 
                boxShadow="md" 
                objectFit="cover" 
                w="full" 
                h={{ base: "200px", md: "250px" }}
              />
              <Text 
                fontSize={{ base: "sm", md: "md" }} 
                fontWeight="bold" 
                color="red.500" 
                textTransform="uppercase"
              >
                {step.step}
              </Text>
              <Text 
                fontSize={{ base: "lg", md: "xl" }} 
                fontWeight="semibold" 
                color="gray.800" 
                textAlign="center"
              >
                {step.title}
              </Text>
              <Text 
                fontSize={{ base: "sm", md: "md" }} 
                color="gray.600" 
                textAlign="center" 
                px={{ base: 2, md: 0 }}
              >
                {step.description}
              </Text>
            </VStack>
          ))}
        </Flex>

        {/* Learn More Button */}
        <Flex justify="center" mt={{ base: 8, md: 12 }}>
          <Button 
            variant="outline" 
            borderColor="gray.300" 
            color="gray.700" 
            px={6} 
            py={3} 
            borderRadius="full" 
            _hover={{ bg: "gray.100", borderColor: "gray.400" }}
          >
            Learn More About The Process
          </Button>
        </Flex>
      </Box>
  );
};

export default JourneySection;