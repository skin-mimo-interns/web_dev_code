import React from 'react';
import { 
  ChakraProvider, 
  Box, 
  Text, 
  SimpleGrid, 
  VStack, 
  Icon, 
} from '@chakra-ui/react';
import { SearchIcon, StarIcon, RepeatIcon, CheckIcon } from '@chakra-ui/icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const SkinHealthSolutionSection = () => {
  const solutions = [
    {
      icon: SearchIcon,
      title: "AI-Powered Analysis",
      description: "Our advanced AI analyzes your skin conditions with 95% accuracy, identifying issues like acne, pigmentation, and early signs of skin cancer.",
      p1:"Real time analysis",
      p2:"Dermatologist validated",
      p3:"Detailed reports"
    },
    {
      icon: StarIcon,
      title: "Personalized Skincare",
      description: "Receive tailored skincare recommendations based on your unique biology, ensuring the best care for your skin type and concerns.",
      p1:"Tailored to your skin type",
      p2:"Clinically proven products",
      p3:"Budget-friendly products"
    },
    {
      icon: RepeatIcon,
      title: "Progress Monitoring",
      description: "Track your skin health improvements over time with detailed reports, helping you stay on top of your skincare journey.",
      p1:"Expert guidance",
      p2:"Prevention tips",
      p3:"Skin health awareness"
    },

  ];

  // Carousel settings for small screens
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

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
          Complete Skin Health Solution
        </Text>

        {/* Desktop: Grid Layout | Mobile: Carousel */}
        <Box display={{ base: "block", md: "none" }}>
          <Slider {...settings}>
            {solutions.map((solution, index) => (
              <Box key={index} px={2}>
                <VStack
                  bg="white"
                  p={6}
                  borderRadius="lg"
                  boxShadow="md"
                  spacing={4}
                  align="center"
                  transition="all 0.3s ease"
                  _hover={{ boxShadow: "lg", transform: "translateY(-5px)" }}
                >
                  <Icon 
                    as={solution.icon} 
                    w={12} 
                    h={12} 
                    color="red.500" 
                    mb={2}
                  />
                  <Text 
                    fontSize={{ base: "lg", md: "xl" }} 
                    fontWeight="semibold" 
                    color="gray.800"
                  >
                    {solution.title}
                  </Text>
                  <Text 
                    fontSize={{ base: "sm", md: "md" }} 
                    color="gray.600" 
                    textAlign="center"
                  >
                    {solution.description}
                  </Text>
                </VStack>
              </Box>
            ))}
          </Slider>
        </Box>

        {/* Desktop Grid Layout */}
        <SimpleGrid 
          columns={{ base: 1, md: 3 }} 
          spacing={{ base: 6, md: 8 }} 
          maxW="1200px" 
          mx="auto" 
          display={{ base: "none", md: "grid" }}
        >
          {solutions.map((solution, index) => (
            <VStack
              key={index}
              bg="white"
              p={6}
              borderRadius="lg"
              boxShadow="md"
              spacing={4}
              align="center"
              transition="all 0.3s ease"
              _hover={{ boxShadow: "lg", transform: "translateY(-5px)" }}
            >
              <Icon 
                as={solution.icon} 
                w={12} 
                h={12} 
                color="red.500" 
                mb={2}
              />
              <Text 
                fontSize={{ base: "lg", md: "xl" }} 
                fontWeight="semibold" 
                color="gray.800"
              >
                {solution.title}
              </Text>
              <Text 
                fontSize={{ base: "sm", md: "md" }} 
                color="gray.600" 
                // textAlign="center"
              >
                {solution.description}
              </Text>
              <Box display={"flex"} flexDirection={"column"} textAlign={"left"} w={"100%"} fontSize={{base:"xs", md:"sm"}} color={"gray.600"}>
              <Text pb={1} display={"flex"} >
                <CheckIcon color="green.500" boxSize={3} marginRight={2} mt={1} />
                {solution.p1}
              </Text>

              <Text pb={1} display={"flex"} >
                <CheckIcon color="green.500" boxSize={3} marginRight={2} mt={1} />
                {solution.p2}
              </Text>
              <Text pb={1} display={"flex"} >
                <CheckIcon color="green.500" boxSize={3} marginRight={2} mt={1} />
                {solution.p3}
              </Text>
              </Box>
            </VStack>
          ))}
        </SimpleGrid>
      </Box>
  );
};

export default SkinHealthSolutionSection;