"use client";

import {
  Box,
  Heading,
  Text,
  Image,
  Stack,
  Flex,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Animal } from "@/types";

export default function FurBabyPage() {
  const { id } = useParams();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchAnimal = async () => {
      try {
        const res = await fetch(`/api/animals/${id}`);
        if (!res.ok) throw new Error("Failed to fetch animal");
        const data = await res.json();
        setAnimal(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id]);

  if (!loading && !animal) {
    return (
      <Box textAlign="center" mt={20}>
        <Text fontSize="xl" color="gray.500">
          Fur baby not found 🐾
        </Text>
      </Box>
    );
  }

  return (
    <Box maxW="5xl" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="xl" bg="white">
      <Flex direction={["column", null, "row"]} gap={6}>
        <Box flex="1" maxW={["100%", null, "50%"]}>
          {loading ? (
            <Skeleton h="500px" borderRadius="xl" />
          ) : (
            animal?.imageUrl && (
              <Image
                src={animal.imageUrl}
                alt={animal.name}
                borderRadius="xl"
                objectFit="cover"
                w="100%"
                h="100%"
                maxH="500px"
              />
            )
          )}
        </Box>

        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Stack>
            {loading ? (
              <>
                <Flex justify="space-between" align="center">
                  <Skeleton height="28px" width="40%" />
                  <Skeleton height="20px" width="60px" />
                </Flex>
                <SkeletonText noOfLines={3} />
              </>
            ) : (
              <>
                <Flex justify="space-between" align="center">
                  <Heading size="lg">{animal?.name}</Heading>
                  <Text color="gray.500" fontWeight="medium" fontSize="md">
                    Age: {animal?.age}
                  </Text>
                </Flex>
                <Text>{animal?.details}</Text>
              </>
            )}
          </Stack>

          <Box mt={6} p={4} bg="gray.50" borderRadius="md">
            {loading ? (
              <>
                <Skeleton height="20px" width="100px" mb={2} />
                <Skeleton height="20px" width="150px" />
                <Skeleton height="20px" width="100px" mt={4} />
                <Skeleton height="20px" width="200px" />
              </>
            ) : (
              <>
                <Text fontWeight="medium">Contact</Text>
                <Text>{animal?.contact}</Text>
                {animal?.user && (
                  <>
                    <Text fontWeight="medium" mt={3}>
                      Registered by
                    </Text>
                    <Text>{animal.user.email}</Text>
                  </>
                )}
              </>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
