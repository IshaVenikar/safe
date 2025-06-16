'use client'

import { IconButton } from '@chakra-ui/react'
import { useColorMode } from "@/components/ui/color-mode"
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ProfileButton() {
  const router = useRouter();
  const { colorMode } = useColorMode();

  return (
    <IconButton
      onClick={() => router.push("/profile")}
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
      <FaRegUser />
    </IconButton>
  )
}
