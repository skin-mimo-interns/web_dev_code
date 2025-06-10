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
  HStack,
  Flex,
} from '@chakra-ui/react';
import { Client } from '@gradio/client';
import { keyframes } from '@emotion/react';
import { FaUpload, FaTrash } from 'react-icons/fa';

const scanAnimation = keyframes`
  0% { top: 0%; }
  50% { top: 100%; }
  100% { top: 0%; }
`;

const resultFadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const AnalysisPage = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [results, setResults] = useState(null);
  const [gradCamImage, setGradCamImage] = useState(null);
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
      setGradCamImage(null);
      setError(null);
      setShowCamera(false);
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
    setGradCamImage(null);
    setFaceResult(null);

    try {
      const arrayBuffer = await image.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      const rekognitionClient = new RekognitionClient({
        region: "us-east-1",
        credentials: {
          accessKeyId: "AKIA5VGOBQIRPAM54SXH",
          secretAccessKey: "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",
        },
      });

      const detectFacesCommand = new DetectFacesCommand({
        Image: { Bytes: bytes },
        Attributes: ["ALL"],
      });

      const rekognitionResponse = await rekognitionClient.send(detectFacesCommand);
      const faces = rekognitionResponse.FaceDetails;

      if (!faces || faces.length === 0) {
        setError("No face detected. We are continue scanning the image, Please wait");
        setFaceResult(null);
      }
      else{
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
    }

      const client = await Client.connect('tanish090905/new-app-rajavi-code');
      const result = await client.predict('/predict', { img: image });
      console.log(result.data)
      // const [predictedClass, confidence, gradCamBase64] = result.data || [];
      // if (!predictedClass || !confidence) {
      //   setError('Could not parse Gradio response. Try again.');
      //   setLoading(false);
      //   return;
      // }

      // if (predictedClass === 'Unknown_Normal') {
      //   setError('No disease detected! Please upload another image.');
      //   setResults(null);
      //   setGradCamImage(null);
      // } else {
      
        const response = result.data || [];
        const predictionText = response[0] || '';
        const confidence = response[1] || '0';
        const gradCamBase64 = response[2] || '';

        // Extract the actual condition name from the prediction text if needed
        // For example, if the text always starts with "The skin pattern resembles a **condition**"
        // const conditionMatch = predictionText.match(/\*\*(.*?)\*\*/);
        // const predictedClass = conditionMatch ? conditionMatch[1] : 'Unknown';

        if (!predictionText || !confidence) {
          setError('Could not parse Gradio response. Try again.');
          setLoading(false);
          return;
        }

        setResults([{ 
          condition: predictionText, 
          confidence: parseFloat(confidence),
        }]);
        setGradCamImage(gradCamBase64 ? `data:image/png;base64,${gradCamBase64}` : null);
              
            } catch (err) {
              setError('Error during analysis. Try again.');
              console.error('Analysis Error:', err);
            } finally {
              setLoading(false);
              console.log("done")
            }
          };

  const handleClear = () => {
    setImage(null);
    setImagePreview(null);
    setResults(null);
    setGradCamImage(null);
    setError(null);
    setShowCamera(false);
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
        <Heading as="h1" size="2xl" color="gray.800" textAlign="center">
          Expert Skin Analysis
        </Heading>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          w="full"
          bg="white"
          rounded="lg"
          shadow="lg"
          border="1px"
          borderColor="gray.200"
        >
          <Box w={{ base: 'full', lg: '50%' }} p={8}>
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
                rounded="lg"
                bg={isDragActive ? 'red.50' : 'white'}
                textAlign="center"
                w="full"
                position="relative"
              >
                <input {...getInputProps()} />
                {imagePreview ? (
                  <Box position="relative">
                    <Image
                      src={imagePreview}
                      alt="Uploaded preview"
                      maxH="192px"
                      mx="auto"
                      rounded="md"
                    />
                    {loading && (
                      <Box
                        position="absolute"
                        inset={0}
                        bg="blackAlpha.600"
                        rounded="md"
                      >
                        <Box
                          position="absolute"
                          w="full"
                          h="2px"
                          bg="red.500"
                          animation={`${scanAnimation} 3s infinite`}
                          shadow="0 0 15px rgba(245, 101, 101, 0.8)"
                        />
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Text color="gray.500">
                    {isDragActive ? 'Drop the image here...' : 'Drag & drop an image, or click to select one'}
                  </Text>
                )}
              </Box>
              {showCamera && (
                <Box mt={4} w="full" textAlign="center">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode: "user" }}
                    style={{ width: '100%', maxWidth: '400px', borderRadius: '10px' }}
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
              <HStack spacing={4}>
                <Button
                  colorScheme="red"
                  variant="outline"
                  leftIcon={<FaUpload />}
                  onClick={() => setShowCamera(true)}
                  isDisabled={image}
                >
                  Take Image
                </Button>
                <Button
                  colorScheme="red"
                  onClick={handleSubmit}
                  isDisabled={!image || loading}
                >
                  {loading && <Spinner size="sm" mr={2} />}
                  Analyze Image
                </Button>
                
              </HStack>
              {image && (
                  <Button
                    colorScheme="red"
                    variant="outline"
                    onClick={handleClear}
                    leftIcon={<FaTrash />}
                    isDisabled={loading}
                  >
                    Clear
                  </Button>
                )}
            </VStack>
          </Box>
          <Box w={{ base: 'full', lg: '50%' }} p={8} bgGradient="linear(to-b, white, red.50)">
            <VStack spacing={6} align="center">
              <Text fontSize="lg" fontWeight="medium" color="gray.700">
                Analysis Results
              </Text>
              {error && (
                <Alert status="error" rounded="md" w="full">
                  <AlertIcon />
                  <Box color="black">
                    <Text> {error}</Text>
                  </Box>
                </Alert>
              )}
              {faceResult && (
                <Box mt={4} p={4} bg="gray.100" rounded="md" shadow="md" w="full">
                  <Heading size="md" mb={2} color="black">
                    Face Detection Result
                  </Heading>
                  <Box color="black">
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
              {results && (
                <Box
                  w="full"
                  p={6}
                  bg="white"
                  rounded="lg"
                  shadow="md"
                  textAlign="center"
                  animation={`${resultFadeIn} 0.5s ease-out`}
                >
                  {results.map((res, index) => (
                    <VStack key={index} spacing={4} align="center">
                      {gradCamImage && (
                        <Box mt={4}>
                          <Text fontSize="md" fontWeight="medium" color="gray.700" mb={2}>
                            GradCAM Visualization
                          </Text>
                          <Image
                            src={gradCamImage}
                            alt="GradCAM visualization"
                            maxH="292px"
                            mx="auto"
                            rounded="md"
                          />
                        </Box>
                      )}  
                      <HStack
                        justify="center"
                        p={4}
                        bg="white"
                        rounded="md"
                        border="1px"
                        borderColor="red.100"
                      >
                        
                        <VStack spacing={1}>

                          <Text fontSize={{md:"xl", base:"md"}} textAlign={"left"} fontWeight="medium" color="gray.800">
                            {res.condition}
                          </Text>
                          <Text fontSize="md" color="gray.600">
                            {(res.confidence * 100).toFixed(1)}% Confidence
                          </Text>
                        </VStack>
                      </HStack>
                      
                    </VStack>
                  ))}
                </Box>
              )}
              {!results && !error && !loading && (
                <Text color="gray.500" fontSize="lg" textAlign="center">
                  Upload an image to see results.
                </Text>
              )}
              {loading && !results && !error && (
                <Text color="gray.500" fontSize="lg" textAlign="center">
                  Analyzing your image...
                </Text>
              )}
            </VStack>
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
};

export default AnalysisPage;