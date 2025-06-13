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
  const bg = colorMode === "dark" ? "#6B4F27" : "#EADDCA";
  const headingColor = colorMode === "dark" ? "#C19A6B" : "#6B4F27";
  const cardBg = colorMode === "dark" ? "#C19A6B" : "#fff";
  const cardText = colorMode === "dark" ? "#fff" : "#6B4F27";
  const cardDesc = colorMode === "dark" ? "#EADDCA" : "#C19A6B";
  const buttonBg = colorMode === "dark" ? "#6B4F27" : "#C19A6B";
  const buttonColor = colorMode === "dark" ? "#fff" : "#fff";
  const buttonHover = colorMode === "dark" ? "#EADDCA" : "#F5DEB3";
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
        Up For Adoption
      </Heading>

      <Box w="80%" mx="auto">
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={8}>
          {animals.map((animal, idx) => (
            <Card.Root key={idx} maxW="sm" overflow="hidden" variant="elevated" style={{ background: cardBg, color: cardText, borderRadius: 16, boxShadow: "0 2px 8px #0001" }}>
              <Image
                src={animal.image}
                alt={animal.name}
                objectFit="cover"
                w="100%"
                h="220px"
                style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
              />
              <Card.Body gap={2}>
                <Card.Title style={{ color: cardText }}>{animal.name}</Card.Title>
                <Card.Description style={{ color: cardDesc }}>{animal.description}</Card.Description>
                <Text textStyle="sm" mt={2} style={{ color: cardDesc }}>
                  #{idx + 1}
                </Text>
              </Card.Body>
              <Card.Footer gap={2}>
                <Button
                  style={{ background: buttonBg, color: buttonColor, borderRadius: 8, fontWeight: 600 }}
                  _hover={{ background: buttonHover, color: buttonBg }}
                  variant="solid"
                >
                  View
                </Button>
                <Button
                  style={{ background: "transparent", color: buttonBg, borderRadius: 8, fontWeight: 600, border: `1px solid ${buttonBg}` }}
                  _hover={{ background: buttonHover, color: buttonBg }}
                  variant="outline"
                >
                  Share
                </Button>
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
        style={{ background: buttonBg, color: buttonColor, borderRadius: 32, fontWeight: 700 }}
        _hover={{ background: buttonHover, color: buttonBg }}
      >
        Register a baby
      </Button>
    </Box>
  );
}
