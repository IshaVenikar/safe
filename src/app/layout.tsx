import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import ThemeToggleButton from "../components/ThemeToggleButton";
import Link from "next/link";
import { Box, Flex } from "@chakra-ui/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Safe",
  description: "A safe place for strays",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Box minH="100vh" display="flex" flexDirection="column">
            <Flex
              as="nav"
              w="100%"
              px={4}
              py={3}
              alignItems="center"
              justifyContent="space-between"
              bg="gray.100"
              borderBottom="1px solid #e2e8f0"
              position="sticky"
              top={0}
              zIndex={100}
            >
              <Link
                href="/"
                style={{
                  fontWeight: 300,
                  fontSize: 20,
                  textDecoration: "none",
                  color: "#222",
                }}
              >
                Safe
              </Link>
              <ThemeToggleButton />
            </Flex>
            <Box flex={1}>{children}</Box>
          </Box>
        </Provider>
      </body>
    </html>
  );
}
