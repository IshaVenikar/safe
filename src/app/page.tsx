'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  SimpleGrid,
  Heading,
  Button,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useColorMode } from "../components/ui/color-mode";
import CardItem from "@/components/CardItem";
import { APP_BANNER_SUBTEXT, APP_BANNER_TEXT } from "@/constants";

export default function Home() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { colorMode } = useColorMode();
  const bg = colorMode === "dark" ? "#6B4F27" : "#EADDCA";
  const headingColor = colorMode === "dark" ? "#C19A6B" : "#6B4F27";
  const buttonBg = colorMode === "dark" ? "#6B4F27" : "#C19A6B";
  const buttonColor = colorMode === "dark" ? "#fff" : "#fff";
  const buttonHover = colorMode === "dark" ? "#EADDCA" : "#F5DEB3";

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await fetch('/api/animals')
        const data = await res.json()
        setAnimals(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch animals:', error)
      }
    }

    fetchAnimals()
  }, [])

  return (
    <>
      <Box
        w={{ base: "95%", md: "90%" }}
        mx="auto"
        p={{ base: 4, md: 8 }}
        mt={4}
        borderRadius="md"
        bg={colorMode === "dark" ? "#C19A6B" : "#fff7ef"}
        color={colorMode === "dark" ? "#fff" : "#6B4F27"}
        fontSize={{ base: "sm", md: "md" }}
        fontWeight={200}
        textAlign="justify"
      >
        <Text fontSize="md">Welcome to <b>safe</b>,</Text>
        <Text fontWeight="bold" fontSize="md" color="#6B4F27">a safe corner for strays, stories, and second chances.</Text>
        <br></br>
        <Text fontSize="md">{APP_BANNER_TEXT}</Text>
        <br></br>
        <Text fontSize="sm">{APP_BANNER_SUBTEXT}</Text>
      </Box>
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
          fontWeight={110}
          color={headingColor}
        >
          Up For Adoption
        </Heading>

        {(!loading && animals.length === 0) && (
          <Box textAlign="center" mt={10}>
            <Heading as="h2" size="lg" color={headingColor}>
              No fur babies available at the moment
            </Heading>
          </Box>
        )}

        <Box w="80%" mx="auto">
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={8}>
            {loading
              ? Array.from({ length: 6 }).map((_, idx) => (
                <Box
                  key={idx}
                  borderRadius="xl"
                  boxShadow="sm"
                  overflow="hidden"
                  bg="white"
                  maxW="sm"
                >
                  <Skeleton height="220px" />
                  <Box p={4}>
                    <Skeleton height="20px" mb={3} />
                    <Skeleton height="16px" mb={2} />
                    <Skeleton height="16px" />
                  </Box>
                </Box>
              ))
              : animals.map((animal, idx) => (
                <CardItem key={idx} animal={animal} />
              ))}
          </SimpleGrid>
        </Box>

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
          fontWeight={10}
          onClick={() => router.push("/register")}
          aria-label="Register"
          style={{ background: buttonBg, color: buttonColor, borderRadius: 32, fontWeight: 700 }}
          _hover={{ background: buttonHover, color: buttonBg }}
        >
          Post a Fur Baby
        </Button>
      </Box>
    </>
  );
}
