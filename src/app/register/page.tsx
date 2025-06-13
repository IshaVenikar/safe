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
import { useAuth } from '@/context/AuthContext';

type FormData = {
  name: string;
  age: number;
  details: string;
  status: 'Avl' | 'Adopted';
  contact: number;
};

export default function RegisterAnimalForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>();
  const { colorMode } = useColorMode();
  const { user } = useAuth();

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
          contact: Number(data.contact),
          details: data.details,
          userId: user?.id,
        }),
      });

      if (!res.ok) throw new Error('Failed to register fur baby');

      toaster.create({
        title: "Fur baby registered successfully!",
        type: "success",
        duration: 3000,
        closable: true,
      })

      reset();
    } catch (error) {
      toaster.create({
        title: "Error registering fur baby.",
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
        Register a Fur Baby
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack align="stretch">
          <FormControl isRequired>
            <FormLabel color={textColor}>Name</FormLabel>
            <Input placeholder="What should we call the baby?"  {...register('name')} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color={textColor}>Age</FormLabel>
            <Input placeholder="How old is the baby?" type="number" {...register('age', { valueAsNumber: true })} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color={textColor}>Description</FormLabel>
            <Textarea placeholder="Please tell us something about the baby" {...register('details')} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color={textColor}>Contact Number</FormLabel>
            <Input placeholder="How do we contact you?" type="number" {...register('contact')} />
          </FormControl>

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
