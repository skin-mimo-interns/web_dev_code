import { Box, Text, HStack, Link } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box py={8} bg="gray.900" textAlign="center">
      <HStack justify="center" spacing={6} mb={2}>
        <Link color="gray.400" href="#">Privacy Policy</Link>
        <Link color="gray.400" href="#">Terms of Service</Link>
        <Link color="gray.400" href="#">Contact</Link>
      </HStack>
      <Text color="gray.500" fontSize="sm">
        &copy; {new Date().getFullYear()} Taiuo. All rights reserved.
      </Text>
    </Box>
  );
}