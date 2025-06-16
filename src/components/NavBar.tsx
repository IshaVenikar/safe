"use client";

import Link from "next/link";
import { Flex } from "@chakra-ui/react";
// import ThemeToggleButton from "../components/ThemeToggleButton";
// import { useColorMode } from "../components/ui/color-mode";
import LogoutButton from "../components/LogoutButton";
import ProfileButton from "./ProfileButton";

export default function NavBar() {
  // const { colorMode } = useColorMode();

  const navBg = "#EADDCA";
  const navText = "#6B4F27";

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
          fontSize: 25,
          textDecoration: "none",
          color: navText,
          letterSpacing: 1,
          transition: "color 0.3s"
        }}
      >
        Safe
      </Link>
      <Flex alignItems="center">
        {/* <ThemeToggleButton /> */}
        <ProfileButton />
        <LogoutButton />
      </Flex>
    </Flex>
  );
}
