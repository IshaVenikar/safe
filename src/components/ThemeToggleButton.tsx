"use client"

import { ClientOnly, IconButton, Skeleton } from "@chakra-ui/react"
import { useColorMode } from "@/components/ui/color-mode"
import { LuMoon, LuSun } from "react-icons/lu"

export default function ThemeToggleButton () {
  const { toggleColorMode, colorMode } = useColorMode()
  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton
        onClick={toggleColorMode}
        variant="outline"
        size="sm"
        aria-label="Toggle color mode"
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
      >
        {colorMode === "light" ? <LuSun /> : <LuMoon />}
      </IconButton>
    </ClientOnly>
  )
}
