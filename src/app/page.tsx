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
// import { useColorMode } from "../components/ui/color-mode";
import CardItem from "@/components/CardItem";
import Banner from "@/components/Banner";

export default function Home() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  // const { colorMode } = useColorMode();
  const bg = "#EADDCA";
  const headingColor = "#6B4F27";
  const buttonBg = "#C19A6B";
  const buttonColor = "#fff";
  const buttonHover = "#F5DEB3";

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
        py={20}
        px={4}
        minH="100vh"
        bg={bg}
        w="100%"
        mx="auto"
        position="relative"
      >
        <Banner />
        <Heading
          mt={100}
          mb={20}
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
