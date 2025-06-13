'use client'

import { IconButton } from '@chakra-ui/react'
import { useAuth } from '@/context/AuthContext'
import { useColorMode } from "@/components/ui/color-mode"
import { IoIosLogOut } from "react-icons/io";

export default function LogoutButton() {
  const { logout } = useAuth()
  const { colorMode } = useColorMode();

  return (
    <IconButton
      onClick={logout}
      bg={colorMode === "dark" ? "#C19A6B" : "#C19A6B"}
      size="sm"
      variant="outline"
      ml={3}
      style={{
        background: colorMode === "dark" ? "#C19A6B" : "#EADDCA",
        color: colorMode === "dark" ? "#6B4F27" : "#6B4F27",
        border: `1px solid ${colorMode === "dark" ? "#6B4F27" : "#C19A6B"}`,
        transition: "background 0.3s, color 0.3s, border 0.3s"
      }}
      _hover={{
        background: colorMode === "dark" ? "#EADDCA" : "#F5DEB3",
        color: colorMode === "dark" ? "#6B4F27" : "#6B4F27"
      }}
      transition="background 0.3s, color 0.3s, border 0.3s"
    >
      <IoIosLogOut />
    </IconButton>
  )
}
