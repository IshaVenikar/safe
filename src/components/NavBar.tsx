"use client";

import ThemeToggleButton from "../components/ThemeToggleButton";
import Link from "next/link";
import { Flex } from "@chakra-ui/react";
import { useColorMode } from "../components/ui/color-mode";

export default function NavBar() {
  const { colorMode } = useColorMode();

  const navBg = colorMode === "dark" ? "#6B4F27" : "#EADDCA";
  const navText = colorMode  === "dark" ? "#EADDCA" : "#6B4F27";

  return (
    <Flex
      as="nav"
      w="100%"
      px={4}
      py={3}
      alignItems="center"
      justifyContent="space-between"
      bg={navBg}
      position="sticky"
      top={0}
      zIndex={100}
      style={{ transition: "background 0.3s, border 0.3s" }}
    >
      <Link
        href="/"
        style={{
          fontWeight: 500,
          fontSize: 20,
          textDecoration: "none",
          color: navText,
          letterSpacing: 1,
          transition: "color 0.3s"
        }}
      >
        Safe
      </Link>
      <ThemeToggleButton />
    </Flex>
  );
}
