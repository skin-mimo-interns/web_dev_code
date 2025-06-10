import { Box, Heading, SimpleGrid, VStack, Text, useBreakpointValue } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask, faBrain, faLightbulb, faSearch, faHeart, faUsers } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const reasons = [
  {
    icon: <FontAwesomeIcon icon={faFlask} size="lg" color="#f56565" />,
    title: "Advanced AI Models",
    description: "Our machine learning models are trained on vast, diverse dermatological datasets for unparalleled accuracy and insight."
  },
  {
    icon: <FontAwesomeIcon icon={faBrain} size="lg" color="#f56565" />,
    title: "Clinical Intelligence",
    description: "Developed in collaboration with leading dermatologists, ensuring our AI-driven insights are medically sound and reliable."
  },
  {
    icon: <FontAwesomeIcon icon={faLightbulb} size="lg" color="#f56565" />,
    title: "Social Impact",
    description: "Creating awareness about skin health through AI-powered diagnostics, promoting early action and informed self-care."
  },
  {
    icon: <FontAwesomeIcon icon={faSearch} size="lg" color="#f56565" />,
    title: "Active Research & Innovation",
    description: "We continuously push the boundaries of AI in dermatology, integrating the latest scientific breakthroughs."
  },
  {
    icon: <FontAwesomeIcon icon={faHeart} size="lg" color="#f56565" />,
    title: "Holistic Skin Health",
    description: "Beyond conditions, we consider lifestyle, environment, and genetics for a comprehensive approach to skin health."
  },
  {
    icon: <FontAwesomeIcon icon={faUsers} size="lg" color="#f56565" />,
    title: "User-Friendly Interface",
    description: "Designed for simplicity and ease of use, making complex skin analysis accessible to everyone, from novice to expert."
  }
];

const ReasonCard = ({ icon, title, description }) => (
  <Box
    p={6}
    borderWidth="1px"
    borderRadius="lg"
    boxShadow="md"
    borderColor="gray.200"
    bg="whiteAlpha.600"
    textAlign="center"
    transition="all 0.3s ease-in-out"
    _hover={{
      boxShadow: "lg",
      transform: "scale(1.02)",
      bg: "white", // slightly more solid on hover
    }}
  >
    <VStack spacing={4}>
      <Box
        w="60px"
        h="60px"
        borderRadius="full"
        bg="red.50"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {icon}
      </Box>
      <Heading as="h3" size="md" color="gray.800">
        {title}
      </Heading>
      <Text color="gray.500" fontSize="sm">
        {description}
      </Text>
    </VStack>
  </Box>
);


const WhyChooseTaiuo = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

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
    <Box py={12} px={6} bgGradient="linear(to-b, white, red.50)">
      <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }}  textAlign="center" mb={10} color="gray.800">
        Why Choose Taiuo?
      </Heading>
      {isMobile ? (
        <Box maxW="400px" mx="auto">
          <Slider {...settings}>
            {reasons.map((reason, index) => (
              <Box key={index} px={2}>
                <ReasonCard
                  icon={reason.icon}
                  title={reason.title}
                  description={reason.description}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} maxW="1200px" mx="auto">
          {reasons.map((reason, index) => (
            <ReasonCard
              key={index}
              icon={reason.icon}
              title={reason.title}
              description={reason.description}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default WhyChooseTaiuo;