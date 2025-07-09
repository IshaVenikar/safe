'use client';

import { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";
import CardItem from "@/components/CardItem";

export default function ListAnimals() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  return (
    <Box w="80%" mx="auto" mb={20} mt={10}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={8}>
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => (
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
  )
};
