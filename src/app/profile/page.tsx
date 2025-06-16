"use client";

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Image,
  Badge,
  Button,
  Flex,
  Icon,
  HStack,
  Grid,
  Skeleton,
  SkeletonCircle,
  SkeletonText
} from '@chakra-ui/react';
import { User } from '@/types';
import { FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useColorMode } from '@/components/ui/color-mode';

export default function ProfilePage() {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { colorMode } = useColorMode();

  const cardBg = colorMode === 'dark' ? '#3B2A13' : 'white';
  const cardShadow = colorMode === 'dark' ? '0 2px 12px rgba(0,0,0,0.6)' : 'lg';
  const textColor = colorMode === 'dark' ? '#EADDCA' : '#6B4F27';
  const subTextColor = colorMode === 'dark' ? '#C19A6B' : 'gray.600';
  const bg = colorMode === 'dark' ? '#6B4F27' : '#EADDCA';

  useEffect(() => {
    if (!user) return;
    const fetchUserDetails = async () => {
      setLoading(true);
      const res = await fetch(`/api/users?id=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setUserDetails(data);
      }
      setLoading(false);
    };
    fetchUserDetails();
  }, [user]);

  if (authLoading || loading) {
    return (
      <Box maxW="7xl" mx="auto" mt={10} px={6} bg={bg}>
        <Grid templateColumns={{ base: '1fr', md: '300px 1fr' }} gap={10} mb={5}>
          <Box p={6} borderRadius="2xl" boxShadow={cardShadow} bg={cardBg} height="300px">
            <Flex direction="column" align="center" textAlign="center">
              <SkeletonCircle size="80px" mb={4} />
              <Skeleton height="20px" width="60%" mb={2} />
              <SkeletonText mt="2" noOfLines={2} width="80%" />
              <HStack mt={4}>
                <Skeleton height="20px" width="100px" />
                <Skeleton height="20px" width="120px" />
              </HStack>
            </Flex>
          </Box>

          <Box>
            <Flex justify="space-between" align="center" mb={4}>
              <Skeleton height="20px" width="200px" />
              <Skeleton height="32px" width="150px" />
            </Flex>

            <Stack>
              {[1, 2, 3].map((i) => (
                <Box
                  key={i}
                  p={4}
                  borderWidth={1}
                  borderRadius="xl"
                  display="flex"
                  alignItems="center"
                  gap={6}
                  boxShadow="sm"
                >
                  <Skeleton boxSize="100px" borderRadius="lg" />
                  <Box flex="1">
                    <Skeleton height="20px" mb={2} width="50%" />
                    <HStack>
                      <Skeleton height="20px" width="80px" />
                      <Skeleton height="20px" width="60px" />
                    </HStack>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        </Grid>
      </Box>
    );
  }

  if (!userDetails) {
    return (
      <Box textAlign="center" mt={20} bg={bg}>
        <Text fontSize="xl" color="gray.500">
          User not found
        </Text>
      </Box>
    );
  }

  return (
    <Box maxW="7xl" mx="auto" mt={10} px={6} bg={bg}>
      <Grid templateColumns={{ base: '1fr', md: '300px 1fr' }} gap={10} mb={5}>
        <Box p={6} borderRadius="2xl" boxShadow={cardShadow} bg={cardBg} minH="320px" height="300px">
          <Flex direction="column" align="center" textAlign="center">
            <Icon as={FaUserCircle} boxSize="80px" color="gray.400" mb={4} />
            <Heading size="md" mb={1} color={textColor}>Fur Friend</Heading>
            <Text fontSize="sm" color={subTextColor}>
              Thank you for being part of this journey.
            </Text>
            <HStack mt={3} wrap="wrap">
              <Badge colorScheme="teal">Member since {new Date(userDetails.createdAt).toLocaleDateString()}</Badge>
              <Badge colorScheme="pink">{userDetails.animals?.length || 0} Fur Babies Shared</Badge>
            </HStack>
          </Flex>
        </Box>

        {/* Animals List Section */}
        <Box>
          <Flex justify="space-between" align="center" mb={4}>
            <Heading size="md">🐾 Your Fur Babies</Heading>
            <Button colorScheme="teal" size="sm" onClick={() => router.push("/register")}>Post a New Fur Baby</Button>
          </Flex>

          <Stack>
            {userDetails.animals && userDetails.animals.length > 0 ? (
              userDetails.animals.map((animal) => (
                <Box
                  key={animal.id}
                  p={4}
                  borderWidth={1}
                  borderRadius="xl"
                  display="flex"
                  alignItems="center"
                  gap={6}
                  boxShadow="sm"
                  _hover={{ boxShadow: 'md' }}
                >
                  {animal.imageUrl && (
                    <Image
                      src={animal.imageUrl}
                      alt={animal.name}
                      boxSize="100px"
                      borderRadius="lg"
                      objectFit="cover"
                    />
                  )}
                  <Box>
                    <Text fontSize="xl" fontWeight="bold" mb={1}>{animal.name}</Text>
                    <HStack mb={1}>
                      <Badge colorScheme="purple">Age: {animal.age}</Badge>
                      <Badge colorScheme={animal.status === 'Adopted' ? 'green' : 'orange'}>
                        {animal.status}
                      </Badge>
                    </HStack>
                  </Box>
                </Box>
              ))
            ) : (
              <Box textAlign="center" mt={10}>
                <Text fontSize="lg" color="gray.500">No fur babies posted yet.</Text>
                <Button mt={4} colorScheme="teal">Post Your First Friend</Button>
              </Box>
            )}
          </Stack>
        </Box>
      </Grid>
    </Box>
  );
}
