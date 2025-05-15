import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Button,
  Image,
  Fade,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import logo from "../../public/logo.png";
import placeholderImg from "../../public/side.jpg"; // Replace with your actual image path

export default function ComingSoon() {
  const [showEmail, setShowEmail] = useState(false);

  // Dynamic layout decisions
  const layoutDirection = useBreakpointValue({
    base: "column",
    sm: "column",
    md: "row",
    lg: "row",
  });

  const showFullText = useBreakpointValue({
    base: false,
    sm: true,
  });

  const textAlign = useBreakpointValue({
    base: "center",
    md: "left",
  });

  return (
    <Box minH="100vh" w="100vw" bg="white" overflow="hidden">
      {/* Top logo (hidden on small screens) */}
      

      <HStack
        h={{ base: "auto", md: "100vh" }}
        flexDirection={layoutDirection}
        spacing={0}
        px={layoutDirection === "row" ? 10 : 4}
        py={layoutDirection === "column" ? 10 : 0}
        justifyContent="space-between"
      >
        {/* Text Section */}
        <Box
          w={{ base: "100%", lg: "50%" }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems={layoutDirection === "row" ? "flex-start" : "center"}
          textAlign={textAlign}
          px={{ base: 4, lg: 10 }}
          pb={{ base: 6, md: 0 }}
        >
          <VStack spacing={3} maxW="lg">
            <Heading
              as="h2"
              fontSize={{ base: "2xl", sm: "3xl", lg: "4xl" }}
              color="red.600"
              fontWeight="bold"
              textAlign={"center"}
            >
              "Your Skin, Your Data, Your Power"
            </Heading>

            <Heading
              as="h1"
              fontSize={{ base: "3xl", sm: "4xl", lg: "5xl" }}
              color="red.600"
              fontWeight="extrabold"
            >
              Coming Soon
            </Heading>

            {showFullText && (
              <Text fontSize="md" color="black" maxW="sm">
                We are launching our website very soon. Stay tuned.
              </Text>
            )}

            {/* Contact Us Button */}
            
          </VStack>
        </Box>

        {/* Image Section */}
        <Box
          w={{ base: "100%", lg: "50%" }}
          h={{ base: "auto", lg: "100vh" }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-end"
          bg="white"
        >
          <Image
            src={placeholderImg}
            alt="Coming soon graphic"
            objectFit="contain"
            maxH={{ base: "60vh", sm: "70vh", lg: "100%" }}
            w="auto"
          />
        </Box>
        {layoutDirection === "column" && (
              <Box position="relative" mt={6} width="fit-content">
                <Button
                  colorScheme="red"
                  size="lg"
                  rounded="full"
                  shadow="md"
                  px={8}
                  onMouseEnter={() => setShowEmail(true)}
                  onMouseLeave={() => setShowEmail(false)}
                >
                  Contact Us
                </Button>
                <Fade in={showEmail}>
                  <Text
                    mt={2}
                    px={4}
                    py={1}
                    bg="red.50"
                    borderRadius="md"
                    color="red.600"
                    fontWeight="semibold"
                    fontSize="sm"
                    whiteSpace="nowrap"
                    boxShadow="md"
                    textAlign="center"
                  >
                    team@taiuo.com
                  </Text>
                </Fade>
              </Box>
            )}
      </HStack>
    </Box>
  );
}
