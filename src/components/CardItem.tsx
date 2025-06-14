"use client";

import { Card, Flex, Image, Separator, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaPaw } from "react-icons/fa";
import { Tooltip } from "@/components/ui/tooltip"
import { IconButton } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";
import { Animal } from "@/types";

export default function CardItem({ animal }: { animal: Animal }) {
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
        src={animal.imageUrl}
        alt={animal.name}
        objectFit="cover"
        w="100%"
        h="220px"
        style={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      />
      <Card.Body gap={2} p={2.5}>
        <Flex align="center" justify="space-between">
          <Text fontSize="lg" fontWeight={50} color={cardText}>
            {animal.name}
          </Text>

          <Link href={`/fur-baby/${animal.id}`} passHref>
            <Tooltip content="View Fur Baby">
              <IconButton
                aria-label="View fur baby"
                variant="ghost"
                color={cardText}
                size="sm"
                style={{
                  background: colorMode === "dark" ? "#C19A6B" : "#EADDCA",
                  color: colorMode === "dark" ? "#EADDCA" : "#C19A6B",
                  transition: "background 0.3s, color 0.3s, border 0.3s"
                }}
              >
                <FaPaw />
              </IconButton>
            </Tooltip>
          </Link>
        </Flex>
        <Separator borderColor={cardText} />

        <Card.Description style={{ color: cardDesc }}>
          <Text
            as="span"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            display="inline-block"
            maxWidth="100%"
          >
            {animal.details}
          </Text>
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
}
