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
import { Toaster, toaster } from "@/components/ui/toaster"
import { useColorMode } from '@/components/ui/color-mode';

type FormData = {
  kind: string;
  age: number;
  details: string;
  status: 'Avl' | 'Adopted';
  userId: string;
};

export default function RegisterAnimalForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const { colorMode } = useColorMode();

  const bg = colorMode === 'dark' ? '#F5DEB3' : '#EADDCA';
  const textColor = colorMode === 'dark' ? '#C19A6B' : '#6B4F27';
  const buttonBg = colorMode === 'dark' ? '#6B4F27' : '#C19A6B';
  const buttonHover = colorMode === 'dark' ? '#EADDCA' : '#F5DEB3';

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/animals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          details: JSON.parse(data.details),
        }),
      });

      if (!res.ok) throw new Error('Failed to register animal');

      toaster.create({
        title: "Animal registered successfully!",
        type: "success",
        duration: 3000,
        closable: true,
      })

      reset();
    } catch (error) {
      toaster.create({
        title: "Error registering animal.",
        description: (error as Error).message,
        type: "error",
        duration: 3000,
        closable: true,
      })
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={6}
      borderRadius="lg"
      bg={bg}
      boxShadow="lg"
      color={textColor}
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
        Register a New Animal
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack align="stretch">
          <FormControl isRequired>
            <FormLabel color={textColor}>Kind</FormLabel>
            <Input placeholder="e.g., Dog, Cat" {...register('kind')} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color={textColor}>Age</FormLabel>
            <Input type="number" {...register('age', { valueAsNumber: true })} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color={textColor}>Details (JSON)</FormLabel>
            <Textarea
              placeholder='{"color": "brown", "breed": "Labrador"}'
              {...register('details')}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color={textColor}>User ID</FormLabel>
            <Input placeholder="Enter User UUID" {...register('userId')} />
          </FormControl>

          <Button
            type="submit"
            bg={buttonBg}
            color="white"
            _hover={{ bg: buttonHover, color: buttonBg }}
            loading={isSubmitting}
            w="full"
          >
            Register Animal
          </Button>
        </VStack>
      </form>
      <Toaster />
    </Box>
  );
}
