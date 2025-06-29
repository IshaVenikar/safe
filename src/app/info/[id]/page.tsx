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
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Animal } from "@/types";
import { FaMapMarkerAlt } from "react-icons/fa";
// import { useColorMode } from "@/components/ui/color-mode";

export default function FurBabyPage() {
  const { id } = useParams();

  // const { colorMode } = useColorMode();
  const cardBg = "white";
  const cardShadow = "md";
  const textColor = "#6B4F27";
  const subTextColor = "gray.500";
  const infoBg = "gray.50";
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
    <Box maxW="5xl" mx="auto" mt={6} p={6} boxShadow={cardShadow} borderRadius="xl" bg={cardBg}>
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
                bg="gray.100"
              />
            )
          )}
        </Box>
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          fontWeight={110}
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
              <Stack spaceY={8}>
                <Flex justify="space-between" align="center">
                  <Heading size="3xl" fontWeight={50} color={textColor}>{animal?.name}</Heading>
                  <Text color={subTextColor} fontWeight="medium" fontSize="md">
                    Age: {animal?.age}
                  </Text>
                </Flex>
                <Text color={textColor}>{animal?.details}</Text>
              </Stack>
            )}
          </Stack>
          <Box mt={6} p={4} bg={infoBg} borderRadius="md">
            {loading ? (
              <>
                <Skeleton height="20px" width="100px" mb={2} />
                <Skeleton height="20px" width="150px" />
                <Skeleton height="20px" width="100px" mt={4} />
                <Skeleton height="20px" width="200px" />
              </>
            ) : (
              <>
                <Text fontWeight={100} color={textColor} mb={2}>Want to adopt {animal?.name}?</Text>
                <Text color={textColor} fontSize={13}>Location</Text>
                <Stack>
                  <Flex justify="space-between" align="center" gap={4}>
                    <Text color={textColor} fontSize={13}>{animal?.user?.location?.city},{' '}{animal?.user?.location?.state}</Text>
                    <IconButton
                      aria-label="View fur baby"
                      variant="ghost"
                      color={textColor}
                      onClick={() => {
                        const lat = animal?.user?.location?.lat;
                        const lng = animal?.user?.location?.lng;
                        if (lat && lng) {
                          window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
                        }
                      }}
                      size="sm"
                      style={{
                        background: "#EADDCA",
                        color: "#C19A6B",
                        transition: "background 0.3s, color 0.3s, border 0.3s",
                      }}
                    >
                      <FaMapMarkerAlt />
                    </IconButton>
                  </Flex>
                </Stack>
                <Text color={textColor} fontSize={13}>Contact</Text>
                <Text color={textColor} fontSize={13}>{animal?.contact}</Text>
                {animal?.user && (
                  <>
                    <Text mt={3} color={textColor} fontSize={13}>
                      Registered by
                    </Text>
                    <Text color={subTextColor} fontSize={13}>{animal.user.email}</Text>
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
