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
import ThemeToggleButton from "../components/ThemeToggleButton";
import { useColorMode } from "../components/ui/color-mode";

export default function Home() {
  const { colorMode } = useColorMode();
  const bg = colorMode === "dark" ? "gray.900" : "gray.50";
  const headingColor = colorMode === "dark" ? "gray.100" : "gray.900";

  return (
    <Box
      py={10}
      px={4}
      minH="100vh"
      bg={bg}
      maxW="80vw"
      mx="auto"
    >
      <Box
        as="header"
        w="100%"
        mb={8}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        <ThemeToggleButton />
      </Box>

      <Heading
        mb={8}
        textAlign="center"
        fontSize={{ base: "2xl", md: "4xl" }}
        fontWeight="bold"
        color={headingColor}
      >
        Beautiful Animals
      </Heading>

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
  );
}
