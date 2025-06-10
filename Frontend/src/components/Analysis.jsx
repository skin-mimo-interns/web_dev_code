import { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { RekognitionClient, DetectFacesCommand } from "@aws-sdk/client-rekognition";
import Webcam from "react-webcam";

import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Image,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  HStack,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { Client } from '@gradio/client';
import { keyframes } from '@emotion/react';
import { FaHeartbeat, FaUpload, FaTrash } from 'react-icons/fa';

// Define animations
const scanAnimation = keyframes`
  0% { top: 0%; }
  50% { top: 100%; }
  100% { top: 0%; }
`;

const glowAnimation = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

const fadeOutAnimation = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const particleAnimation = keyframes`
  0%, 100% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 0.8; transform: scale(1); }
`;

const resultFadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const headingFadeIn = keyframes`
  0% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// Generate random positions and animation properties for particles
const generateParticles = (count) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 3 + 1;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const duration = Math.random() * 2 + 1;
    const delay = Math.random() * 1;
    particles.push({
      size,
      top: `${top}%`,
      left: `${left}%`,
      duration: `${duration}s`,
      delay: `${delay}s`,
    });
  }
  return particles;
};

// Number of particles to display
const particleCount = 15;
const particles = generateParticles(particleCount);

const AnalysisPage = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [faceResult, setFaceResult] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef(null);



  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setResults(null);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    multiple: false,
  });

  

  const handleSubmit = async () => {
    if (!image) {
      setError('Please upload an image to analyze.');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);
    setFaceResult(null);

    try {
      // Convert image to ArrayBuffer
      const arrayBuffer = await image.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      // Rekognition Client
      const rekognitionClient = new RekognitionClient({
        region: "us-east-1", // change if needed
        credentials: {
          accessKeyId: "AKIA5VGOBQIRPAM54SXH",
          secretAccessKey: "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",
        },
      });

      // Rekognition: Face Detection
      const detectFacesCommand = new DetectFacesCommand({
        Image: { Bytes: bytes },
        Attributes: ["ALL"],
      });

      const rekognitionResponse = await rekognitionClient.send(detectFacesCommand);
      const faces = rekognitionResponse.FaceDetails;

      if (!faces || faces.length === 0) {
        setError("No face detected. Please upload a clear face image.");
        setLoading(false);
        return;
      }

      // Optional: display face attributes
      const face = faces[0];
      const minConfidence = 10;

      setFaceResult({
        ageRange: `${face.AgeRange.Low}–${face.AgeRange.High}`,
        gender: face.Gender?.Value,
        confidence: face.Confidence ? Math.floor(face.Confidence * 100) / 100 : null,
        smile: face.Smile?.Confidence > minConfidence ? (face.Smile.Value ? "Yes" : "No") : null,
        eyeglasses: face.Eyeglasses?.Confidence > minConfidence ? (face.Eyeglasses.Value ? "Yes" : "No") : null,
        sunglasses: face.Sunglasses?.Confidence > minConfidence ? (face.Sunglasses.Value ? "Yes" : "No") : null,
        beard: face.Beard?.Confidence > minConfidence ? (face.Beard.Value ? "Yes" : "No") : null,
        mustache: face.Mustache?.Confidence > minConfidence ? (face.Mustache.Value ? "Yes" : "No") : null,
        eyesOpen: face.EyesOpen?.Confidence > minConfidence ? (face.EyesOpen.Value ? "Yes" : "No") : null,
        mouthOpen: face.MouthOpen?.Confidence > minConfidence ? (face.MouthOpen.Value ? "Yes" : "No") : null,
        emotions: face.Emotions
          ?.filter((e) => e.Confidence > minConfidence)
          .map((e) => {
            const truncated = Math.floor(e.Confidence * 100) / 100;
            return `${e.Type} (${truncated.toFixed(2)}%)`;
          })
          .join(', ') || null

      });



      // Proceed to Gradio Prediction
      const client = await Client.connect('Taiuo/first_gradio_api');
      const result = await client.predict('/predict', {
        img: image,
      });

      const raw = result.data?.[0];

      if (typeof raw === 'string') {
        const match = raw.match(/\('(.*)',\s*([\d.]+)/);
        if (match) {
          const condition = match[1];
          const confidence = parseFloat(match[2]);

          if (condition === 'Unknown_Normal') {
            setError('No disease detected! Please upload another image.');
            setResults(null);
          } else {
            setResults([{ condition, confidence }]);
          }
        } else {
          setError('Could not parse Gradio response. Try again.');
        }
      } else {
        setError('Unexpected Gradio result format.');
      }

    } catch (err) {
      setError('Error during analysis. Try again.');
      console.error('Analysis Error:', err);
    } finally {
      setLoading(false);
    }
  };


  const handleClear = () => {
    setImage(null);
    setImagePreview(null);
    setResults(null);
    setError(null);
  };
  const captureFromWebcam = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], "webcam-image.jpg", { type: "image/jpeg" });
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
        setShowCamera(false);
      });
  };


  return (
    <Box py={12} px={6} minH="100vh" bgGradient="linear(to-b, white, red.50)">
      <VStack spacing={8} maxW="1200px" mx="auto">
        {/* Common Heading */}
        <VStack spacing={3} w="100%" animation={`${headingFadeIn} 0.5s ease-out`}>
          <Heading as="h1" size="2xl" color="gray.800" textAlign="center">
            Expert Skin Analysis
          </Heading>
          
          <Text fontSize="lg" color="gray.500" textAlign="center" maxW="600px">
            Upload an image of your skin and get a detailed analysis using advanced AI technology.
          </Text>
          <Box bg="red.50" borderLeft="5px solid #E53E3E" px={6} py={4} rounded="md" w="100%">
            <Heading size="md" color="red.500" mb={2}>Instructions</Heading>
            <Text color="gray.700">
              Please upload a <b>clear</b>, <b>close-up</b> image of the affected skin area with a <b>clean background</b> for the most accurate results.
            </Text>
          </Box>
        </VStack>

        {/* Connected Sections */}
        <Box
          w="100%"
          bgGradient="linear(to-b, white, red.50)"
          borderRadius="lg"
          boxShadow="lg"
          overflow="hidden"
          border="1px solid"
          borderColor="gray.200"
        >
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            align="stretch"
            position="relative"
          >
            {/* Left Section: Image Upload and Submit Button */}
            <Box
              w={{ base: '100%', lg: '50%' }}
              p={8}
              borderRight={{ base: 'none', lg: '1px solid' }}
              borderColor={{ base: 'transparent', lg: 'gray.200' }}
            >
              <VStack spacing={6} align="center">
                <Text fontSize="lg" fontWeight="medium" color="gray.700">
                  Upload Image
                </Text>
                <Box
                  {...getRootProps()}
                  p={8}
                  borderWidth={2}
                  borderStyle="dashed"
                  borderColor={isDragActive ? 'red.500' : 'gray.300'}
                  borderRadius="lg"
                  bg={isDragActive ? 'red.50' : 'white'}
                  textAlign="center"
                  w="100%"
                  position="relative"
                >
                  
                  <input {...getInputProps()} />
                  {imagePreview ? (
                    <Box position="relative">
                      <Image
                        src={imagePreview}
                        alt="Uploaded preview"
                        maxH="200px"
                        mx="auto"
                        borderRadius="md"
                      />
                      {/* Reupload Image Button */}
                      
                      {loading && (
                        <Box
                          position="absolute"
                          top={0}
                          left={0}
                          w="full"
                          h="full"
                          bg="blackAlpha.600"
                          borderRadius="md"
                          animation={loading ? '' : `${fadeOutAnimation} 0.5s forwards`}
                        >
                          {/* Scanning Line */}
                          <Box
                            position="absolute"
                            w="full"
                            h="2px"
                            bg="red.500"
                            animation={`${scanAnimation} 3s infinite`}
                            boxShadow="0 0 15px rgba(245, 101, 101, 0.8)"
                          />
                          {/* Glowing Dots */}
                          <Box
                            position="absolute"
                            w={5}
                            h={5}
                            bg="red.500"
                            borderRadius="full"
                            top="20%"
                            left="20%"
                            animation={`${glowAnimation} 1.5s infinite`}
                            boxShadow="0 0 15px rgba(245, 101, 101, 0.8)"
                          />
                          <Box
                            position="absolute"
                            w={5}
                            h={5}
                            bg="red.500"
                            borderRadius="full"
                            top="60%"
                            right="20%"
                            animation={`${glowAnimation} 1.8s infinite 0.3s`}
                            boxShadow="0 0 15px rgba(245, 101, 101, 0.8)"
                          />
                          <Box
                            position="absolute"
                            w={5}
                            h={5}
                            bg="red.500"
                            borderRadius="full"
                            bottom="20%"
                            left="50%"
                            animation={`${glowAnimation} 1.5s infinite 0.6s`}
                            boxShadow="0 0 15px rgba(245, 101, 101, 0.8)"
                          />
                          {/* Particle Effect */}
                          {particles.map((particle, index) => (
                            <Box
                              key={index}
                              position="absolute"
                              w={particle.size}
                              h={particle.size}
                              bg="red.200"
                              borderRadius="full"
                              top={particle.top}
                              left={particle.left}
                              animation={`${particleAnimation} ${particle.duration} infinite ${particle.delay}`}
                              boxShadow="0 0 8px rgba(245, 101, 101, 0.5)"
                            />
                          ))}
                          {/* Status Indicator */}
                          {/* <Box
                            position="absolute"
                            top={-8}
                            left="50%"
                            transform="translateX(-50%)"
                            bg="red.500"
                            color="white"
                            px={4}
                            py={1}
                            borderRadius="lg"
                            fontSize="sm"
                          >
                            Scanning...
                          </Box> */}
                        </Box>
                      )}
                    </Box>
                  ) : (
                    <Text color="gray.500">
                      {isDragActive
                        ? 'Drop the image here...'
                        : 'Drag & drop an image here, or click to select one'}
                    </Text>
                  )}
                </Box>
                <HStack spacing={4}>
                  {showCamera && (
                  <Box mt={4} w="100%" textAlign="center">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{
                        facingMode: "user",
                      }}
                      style={{ width: "100%", maxWidth: 400, borderRadius: "10px" }}
                    />
                    <HStack justify="center" mt={4}>
                      <Button colorScheme="red" onClick={captureFromWebcam}>
                        Capture Photo
                      </Button>
                      <Button variant="ghost" onClick={() => setShowCamera(false)}>
                        Cancel
                      </Button>
                    </HStack>
                  </Box>
                )}

               
                <Button
                  size="md"
                  bg={"red.500"}
                  color={"white"}
                  variant="outline"
                  leftIcon={<FaUpload />}
                  onClick={() => setShowCamera(true)}
                >
                  Take Image
                </Button>

                </HStack>


                {/* Submit and Clear Buttons */}
                <HStack spacing={4}>
                  <Button
                    colorScheme="red"
                    size="lg"
                    onClick={handleSubmit}
                    isDisabled={!image || loading}
                  >
                    {loading ? <Spinner size="sm" mr={2} /> : null}
                    Analyze Image
                  </Button>
                  {image && (
                    <Button
                      colorScheme="red"
                      isDisabled={!image || loading}
                      size="lg"
                      color={"black"}
                      onClick={handleClear}
                      leftIcon={<FaTrash />}
                    >
                      Clear
                    </Button>
                  )}
                </HStack>
              </VStack>
            </Box>

            {/* Connector Arrow (Visible on Large Screens) */}
            <Box
              display={{ base: 'none', lg: 'block' }}
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w="40px"
              h="40px"
              bg="red.500"
              borderRadius="full"
              color="white"
              fontSize="24px"
              lineHeight="40px"
              textAlign="center"
              boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
            >
              →
            </Box>

            {/* Right Section: Results or Placeholder */}
            <Box
              w={{ base: '100%', lg: '50%' }}
              p={8}
              bgGradient="linear(to-b, white, red.50)"
            >
              <VStack spacing={6} align="center">
                <Text fontSize="lg" fontWeight="medium" color="gray.700">
                  Analysis Results
                </Text>

                {/* Error Message */}
                {error && (
                  <Alert status="error" borderRadius="md" w="100%">
                    <AlertIcon />
                    <Box color={"black"}>
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Box>
                  </Alert>
                )}
                {faceResult && (
                  <Box mt={4} p={4} bg="gray.100" borderRadius="md" boxShadow="md">
                    <Heading fontSize="md" mb={2} color={"black"}>Face Detection Result</Heading>
                    <Box color={"black"}>
                    <Text>Gender: {faceResult.gender}</Text>
                    <Text>Age Range: {faceResult.ageRange} years</Text>
                    <Text>Confidence: {faceResult.confidence}%</Text>
                    <Text>Smile: {faceResult.smile}</Text>
                    <Text>Sunglasses: {faceResult.sunglasses}</Text>
                    <Text>Eyeglasses: {faceResult.eyeglasses}</Text>
                    <Text>Beard: {faceResult.beard}</Text>
                    <Text>Mustache: {faceResult.mustache}</Text>
                    <Text>Eyes Open: {faceResult.eyesOpen}</Text>
                    <Text>Mouth Open: {faceResult.mouthOpen}</Text>
                    <Text>Emotions: {faceResult.emotions}</Text>
                    </Box>
                  </Box>
                )}


                {/* Results */}
                {results && !error && (
                  <Box
                    w="100%"
                    p={6}
                    bg="white"
                    borderRadius="lg"
                    boxShadow="md"
                    textAlign="center"
                    animation={`${resultFadeIn} 0.5s ease-out`}
                  >
                    {results.map((result, index) => (
                      <HStack
                        key={index}
                        spacing={4}
                        justify="center"
                        align="center"
                        p={4}
                        bg="white"
                        borderRadius="md"
                        border="1px solid"
                        borderColor="red.100"
                      >
                        <Icon as={FaHeartbeat} color="red.500" w={8} h={8} />
                        <VStack spacing={1}>
                          <Text fontSize="xl" fontWeight="bold" color="gray.800">
                            {result.condition}
                          </Text>
                          <Text fontSize="md" color="gray.600">
                            {(result.confidence * 100).toFixed(1)}% Confidence
                          </Text>
                        </VStack>
                      </HStack>
                    ))}
                  </Box>
                )}

                {/* Placeholder if no results, error, or loading */}
                {!results && !error && !loading && (
                  <VStack spacing={4} align="center" py={6}>
                    <Icon as={FaUpload} color="gray.400" w={12} h={12} />
                    <Text color="gray.500" textAlign="center" fontSize="lg">
                      Upload an image to see the analysis results here.
                    </Text>
                  </VStack>
                )}

                {/* Placeholder during loading */}
                {loading && !results && !error && (
                  <Text color="gray.500" textAlign="center" fontSize="lg">
                    Analyzing your image...
                  </Text>
                )}
              </VStack>
            </Box>
          </Flex>
        </Box>
      </VStack>
    </Box>
  );
};

export default AnalysisPage;