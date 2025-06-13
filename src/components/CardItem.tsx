// components/CardItem.tsx
"use client";

import { Card, Image } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";

export default function CardItem({ animal, idx, theme }: {
  animal: { name: string; description: string; image: string },
  idx: number,
  theme: {
    buttonBg: string,
    buttonColor: string,
    buttonHover: string
  }
}) {
  const { colorMode } = useColorMode();

  const cardBg = colorMode === "dark" ? "#C19A6B" : "#fff";
  const cardText = colorMode === "dark" ? "#fff" : "#6B4F27";
  const cardDesc = colorMode === "dark" ? "#EADDCA" : "#C19A6B";

  return (
    <Card.Root
      maxW="sm"
      overflow="hidden"
      variant="elevated"
      style={{
        background: cardBg,
        color: cardText,
        borderRadius: 16,
        boxShadow: "0 2px 8px #0001",
      }}
    >
      <Image
        src={animal.image}
        alt={animal.name}
        objectFit="cover"
        w="100%"
        h="220px"
        style={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      />
      <Card.Body gap={2}>
        <Card.Title style={{ color: cardText }}>{animal.name}</Card.Title>
        <Card.Description style={{ color: cardDesc }}>
          {animal.description}
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
}
