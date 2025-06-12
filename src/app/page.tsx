'use client';

import {
  Box,
  SimpleGrid,
  Image,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { Card } from "@chakra-ui/react";
import { animals } from "./animals";
import { useColorMode } from "../components/ui/color-mode";
import { useRouter } from "next/navigation";

export default function Home() {
  const { colorMode } = useColorMode();
  const bg = colorMode === "dark" ? "gray.900" : "gray.50";
  const headingColor = colorMode === "dark" ? "gray.100" : "gray.900";
  const router = useRouter();

  return (
    <Box
      py={10}
      px={4}
      minH="100vh"
      bg={bg}
      w="100%"
      mx="auto"
      position="relative"
    >

      <Heading
        mb={8}
        textAlign="center"
        fontSize={{ base: "2xl", md: "4xl" }}
        fontWeight="bold"
        color={headingColor}
      >
        Beautiful Animals
      </Heading>

      <Box w="80%" mx="auto">
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={8}>
          {animals.map((animal, idx) => (
            <Card.Root key={idx} maxW="sm" overflow="hidden" variant="elevated">
              <Image
                src={animal.image}
                alt={animal.name}
                objectFit="cover"
                w="100%"
                h="220px"
              />
              <Card.Body gap={2}>
                <Card.Title>{animal.name}</Card.Title>
                <Card.Description>{animal.description}</Card.Description>
                <Text textStyle="sm" color="gray.500" mt={2}>
                  #{idx + 1}
                </Text>
              </Card.Body>
              <Card.Footer gap={2}>
                <Button variant="solid" colorScheme="teal">
                  View
                </Button>
                <Button variant="ghost">Share</Button>
              </Card.Footer>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Box>
      {/* Floating Action Button */}
      <Button
        position="fixed"
        bottom={8}
        right={8}
        zIndex={1000}
        colorScheme="teal"
        borderRadius="full"
        boxShadow="0 4px 16px #0003"
        size="lg"
        px={6}
        py={6}
        fontSize="md"
        onClick={() => router.push("/register-animal")}
        aria-label="Register Animal"
      >
        Register a baby
      </Button>
    </Box>
  );
}
