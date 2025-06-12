import { Box, SimpleGrid, Image as ChakraImage, Text, Heading } from "@chakra-ui/react";
import { animals } from "./animals";

export default function Home() {
	return (
		<Box
			py={10}
			px={4}
			minH="100vh"
			bgGradient="linear(to-br, teal.50, blue.50)"
			maxW="80vw"
			mx="auto"
		>
			<Heading
				mb={8}
				textAlign="center"
				fontSize={{ base: "2xl", md: "4xl" }}
				fontWeight="bold"
			>
				Beautiful Animals
			</Heading>
			<SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={8}>
				{animals.map((animal, idx) => (
					<Box
						key={idx}
						boxShadow="lg"
						borderRadius="xl"
						overflow="hidden"
						bg="white"
						_hover={{
							boxShadow: "2xl",
							transform: "scale(1.03)",
						}}
						transition="all 0.2s"
					>
						<ChakraImage
							src={animal.image}
							alt={animal.name}
							objectFit="cover"
							w="100%"
							h="220px"
						/>
						<Box p={4}>
							<Heading size="md" mb={2}>
								{animal.name}
							</Heading>
							<Text color="gray.600">
								{animal.description}
							</Text>
						</Box>
					</Box>
				))}
			</SimpleGrid>
		</Box>
	);
}
