'use client';

import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  Text,
} from '@chakra-ui/react';
import { FormLabel, FormControl } from "@chakra-ui/form-control";
import { Toaster, toaster } from '@/components/ui/toaster';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase-auth/client';
import { useGetLocation } from '@/hooks/useGetLocation';

const textColor = '#6B4F27';

type FormData = {
  name: string;
  age: number;
  details: string;
  imageUrl: FileList;
  contact: number;
};

export default function RegisterAnimalForm() {
  const { user } = useAuth();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const {
    location,
    cityState,
    locating,
    locationError,
    isLoaded,
    handleDetectLocation
  } = useGetLocation();

  const buttonBg = '#C19A6B';
  const buttonHover = '#F5DEB3';

  const onSubmit = async (data: FormData) => {
    try {
      const imageFile = data.imageUrl[0];
      const fileExt = imageFile.name.split('.').pop();
      const filePath = `furry-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('furbaby-images')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from('furbaby-images').getPublicUrl(filePath);

      const res = await fetch('/api/animals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          age: data.age,
          details: data.details,
          contact: Number(data.contact),
          imageUrl: publicUrl,
          userId: user?.id,
        }),
      });

      if (!res.ok) throw new Error('Failed to register fur baby');

      toaster.create({
        title: 'Fur baby registered successfully!',
        type: 'success',
        duration: 3000,
        closable: true,
      });

      reset();
    } catch (error) {
      toaster.create({
        title: 'Error registering fur baby.',
        description: (error as Error).message,
        type: 'error',
        duration: 3000,
        closable: true,
      });
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={6}
      borderRadius="lg"
      bg="#EADDCA"
      boxShadow="lg"
      color={textColor}
    >
      <Text fontSize="2xl" fontWeight={110} mb={4} textAlign="center">
        Register a Fur Baby
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack align="stretch">
          <FormControl isRequired>
            <FormLabel color={textColor}>Name</FormLabel>
            <Input placeholder="What should we call the baby?" {...register('name')} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color={textColor}>Age</FormLabel>
            <Input
              placeholder="How old is the baby?"
              type="number"
              {...register('age', { valueAsNumber: true })}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color={textColor}>Description</FormLabel>
            <Textarea
              placeholder="Please tell us something about the baby"
              {...register('details')}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color={textColor}>Contact Number</FormLabel>
            <Input
              placeholder="How do we contact you?"
              type="number"
              {...register('contact', { valueAsNumber: true })}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color={textColor}>Upload a cute picture of the baby</FormLabel>
            <Input
              type="file"
              accept="image/*"
              multiple={false}
              {...register('imageUrl', { required: true })}
            />
          </FormControl>

          <FormControl>
            <FormLabel color={textColor}>Location</FormLabel>
            <Button
              onClick={handleDetectLocation}
              loading={locating}
              colorScheme="teal"
              size="sm"
            >
              📍 Auto-detect Location
            </Button>

            {cityState && (
              <Text fontSize="sm" mt={2}>
                Detected Location: {cityState.city}, {cityState.state}
              </Text>
            )}

            {locationError && (
              <Text fontSize="sm" mt={2} color="red.500">
                {locationError}
              </Text>
            )}
          </FormControl>
          {location && isLoaded && (
            <Box mt={2} h="25px" borderRadius="md" overflow="hidden">
              Open with{' '}
              <a
                href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'blue', textDecoration: 'underline' }}
              >
                Google Maps
              </a>
            </Box>
          )}

          <Button
            type="submit"
            bg={buttonBg}
            color="white"
            _hover={{ bg: buttonHover, color: buttonBg }}
            loading={isSubmitting}
            w="full"
          >
            Submit
          </Button>
        </VStack>
      </form>
      <Toaster />
    </Box>
  );
}
