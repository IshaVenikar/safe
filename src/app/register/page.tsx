'use client';

import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  Text,
  FileUpload,
} from '@chakra-ui/react';
import { HiUpload } from "react-icons/hi"
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
  contact: string;
};

export default function RegisterAnimalForm() {
  const handleFileChange = (details: { acceptedFiles: File[]; rejectedFiles: any[] }) => {
    const file = details.acceptedFiles[0];
    if (file) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      setValue("imageUrl", dataTransfer.files, { shouldValidate: true });
    }
  };

  const { user } = useAuth();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
    setValue
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
          contact: data.contact,
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
      mb={8}
      p={6}
      borderRadius="lg"
      bg={"white"}
      boxShadow="lg"
      color={textColor}
    >
      <Text fontSize="2xl" fontWeight={110} mb={4} textAlign="center">
        Register a Fur Baby
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack align="stretch">
          <FormControl isRequired>
            <FormLabel color={textColor} fontWeight={10} mb={8}>Name</FormLabel>
            <Input placeholder="What should we call the baby?" {...register('name')} boxShadow="0 4px 16px #0003" border={"grey"} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color={textColor} fontWeight={10} mb={8}>Age (in months)</FormLabel>
            <Input
              placeholder="How old is the baby?"
              type="number"
              {...register('age', { valueAsNumber: true })}
              boxShadow="0 4px 16px #0003" border={"grey"}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color={textColor} fontWeight={10} mb={8}>
              Contact Number
            </FormLabel>
            <Input
              placeholder="Your contact number"
              type="text"
              {...register('contact', {
                required: 'Contact number is required',
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: 'Enter a valid 10-digit phone number',
                },
              })}
              boxShadow="0 4px 16px #0003"
              border="grey"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color={textColor} fontWeight={10} mb={8}>Description</FormLabel>
            <Textarea
              placeholder="Please tell us something about the baby"
              {...register('details')}
              mb={0}
              boxShadow="0 4px 16px #0003" border={"grey"}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color={textColor} fontWeight={10} mb={4}>
              Upload a cute picture of the baby
            </FormLabel>

            <FileUpload.Root
              onFileChange={handleFileChange}
              accept={["image/png", "image/jpeg", "image/jpg"]}
            >
              <FileUpload.HiddenInput />
              <FileUpload.Trigger asChild>
                <Button
                  size="sm"
                  color={textColor}
                  fontWeight={10}
                  boxShadow="0 4px 16px #0003"
                  _hover={{
                    bgColor: "#F5DEB3",
                  }}
                >
                  <HiUpload style={{ marginRight: "0.5rem" }} />
                  Upload file
                </Button>
              </FileUpload.Trigger>
              {/* TODO: Change color for file list*/}
              <FileUpload.List />
            </FileUpload.Root>
          </FormControl>

          {/*TODO: Display user location if already present in DB*/}
          <FormControl isRequired>
            <FormLabel color={textColor} fontWeight={10} mb={8}>Location</FormLabel>
            <Button
              boxShadow="0 4px 16px #0003"
              rounded="l3"
              mb={1}
              fontWeight={10}
              aria-label="Location"
              onClick={handleDetectLocation}
              loading={locating}
              _hover={{
                bgColor: "#F5DEB3",
              }}
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
          {errors.contact && (
            <Text color="red.400" mt={2} fontSize="sm">
              {errors.contact.message}
            </Text>
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
