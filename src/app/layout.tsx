import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Box } from "@chakra-ui/react";
import "./globals.css";
import ChakraProvider from "../context/ChakraProvider";
import NavBar from "../components/NavBar";
import { AuthProvider } from "@/context/AuthContext";
import { PageBackgroundSync } from "@/components/PageBackgroundSync";

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
        <ChakraProvider>
          <AuthProvider>
            <PageBackgroundSync />
            <Box minH="100vh" display="flex" flexDirection="column">
              <NavBar />
              <Box flex={1}>{children}</Box>
            </Box>
          </AuthProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
