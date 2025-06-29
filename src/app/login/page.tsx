"use client"

import { login, signup } from "../../lib/supabase-auth/actions"
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
  Link,
  Flex,
} from "@chakra-ui/react"
import { FormLabel, FormControl } from "@chakra-ui/form-control"
import { useState } from "react"

export default function LoginPage() {
  const bg = "#EADDCA"
  const textColor = "#6B4F27"

  const [isLogin, setIsLogin] = useState(true)

  const toggleMode = () => setIsLogin((prev) => !prev)

  return (
    <Box
      minH="100vh"
      bg={bg}
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={4}
    >
      <Box
        bg="white"
        p={8}
        borderRadius="2xl"
        boxShadow="xl"
        w="full"
        maxW="sm"
      >
        <Stack as="form">
          <Heading textAlign="center" color={textColor} size="lg">
            {isLogin ? "Welcome Back 🐾" : "Join the Family 🤎"}
          </Heading>

          <FormControl id="email" isRequired>
            <FormLabel color={textColor}>Email</FormLabel>
            <Input name="email" type="email" color={textColor} />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel color={textColor}>Password</FormLabel>
            <Input name="password" type="password" color={textColor} />
          </FormControl>

          <Button
            type="submit"
            formAction={isLogin ? login : signup}
            bg={textColor}
            color="white"
            _hover={{ bg: "#B28D5B" }}
            w="full"
          >
            {isLogin ? "Log in" : "Sign up"}
          </Button>

          <Flex justify="center">
            <Text fontSize="sm" color="gray.600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <Link
                onClick={toggleMode}
                color={textColor}
                fontWeight="medium"
                cursor="pointer"
              >
                {isLogin ? "Sign up" : "Log in"}
              </Link>
            </Text>
          </Flex>
        </Stack>
      </Box>
    </Box>
  )
}
