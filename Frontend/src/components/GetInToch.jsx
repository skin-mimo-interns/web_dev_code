import { Box, Heading, Text, VStack, HStack, Link } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const GetInTouch = () => (
  <Box
  id='contact'
    py={16}
    px={6}
    bg={"red.500"}
    textAlign="center"
  >
    <VStack spacing={6} maxW="800px" mx="auto">
      <Heading as="h2" size="xl" color="white">
        Get in Touch with Taiuo
      </Heading>
      <Text color="white" fontSize="md">
        We’re here to help you on your journey to healthier skin. Reach out to us with any questions, feedback, or partnership inquiries.
      </Text>
      <HStack
        spacing={8}
        justify="center"
        flexWrap="wrap"
        fontSize="sm"
        color="whiteAlpha.900"
      >
        <HStack spacing={2} >
          <FontAwesomeIcon icon={faMapMarkerAlt} color="#f56565" />
          <Text>Mumbai, India</Text>
        </HStack>
        <HStack spacing={2}>
          <FontAwesomeIcon icon={faEnvelope} color="#f56565" />
          <Link href="mailto:contact@taiou.com" >
            team@taiuo.com
          </Link>
        </HStack>
        
      </HStack>
      <Text mt={8} fontSize="xs" color={"white"}>
        © 2025 All Rights Reserved
      </Text>
    </VStack>
  </Box>
);

export default GetInTouch;