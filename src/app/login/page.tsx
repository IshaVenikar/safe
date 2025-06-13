"use client"

import { login, signup } from "../../lib/supabase-auth/actions"
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react"
import { FormLabel, FormControl } from "@chakra-ui/form-control";
import { useColorMode } from "@/components/ui/color-mode";

export default function LoginPage() {
  const { colorMode } = useColorMode();

  const bg = colorMode === 'dark' ? '#F5DEB3' : '#EADDCA';
  const textColor = colorMode === 'dark' ? '#C19A6B' : '#6B4F27';

  return (
    <Box
      minH="100vh"
      bg={bg}
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      px={2}
      pt={20} // Add padding top to move form higher
    >
      <Box
        bg="white"
        p={5}
        borderRadius="xl"
        boxShadow="lg"
        w="full"
        maxW="sm"
      >
        <Stack as="form">
          <Heading textAlign="center" color={textColor}>
            Welcome
          </Heading>

          <FormControl id="email" isRequired>
            <FormLabel color={textColor}>Email</FormLabel>
            <Input name="email" type="email" />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel color={textColor}>Password</FormLabel>
            <Input name="password" type="password" />
          </FormControl>

          <Stack>
            <Button
              type="submit"
              formAction={login}
              bg={textColor}
              color="white"
              _hover={{ color: textColor }}
              w="full"
            >
              Log in
            </Button>
            <Button
              type="submit"
              formAction={signup}
              variant="outline"
              borderColor={textColor}
              color={textColor}
              w="full"
            >
              Sign up
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}
