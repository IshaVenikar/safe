import {
  Box,
  Text,
} from "@chakra-ui/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image";
// import { useColorMode } from "../components/ui/color-mode";
import { APP_BANNER_SUBTEXT, APP_BANNER_TEXT_1, APP_BANNER_TEXT_2, APP_BANNER_TEXT_3 } from "@/constants";

export default function Banner() {
  // const { colorMode } = useColorMode();

  const slides = [
    {
      title: "Welcome to Safe",
      description: APP_BANNER_TEXT_1,
      image: "/images/img1.png",
    },
    {
      title: "Help a Paw in Need",
      description: APP_BANNER_TEXT_2,
      image: "/images/img2.png",
    },
    {
      title: "Every Stray Deserves a Forever Home",
      description: APP_BANNER_TEXT_3,
      image: "/images/img3.png",
    },
    {
      title: "Let's Make It Happen",
      description: APP_BANNER_SUBTEXT,
      image: "/images/img4.png",
    }
  ];

  return (
    <Box
      w={{ base: "100%", md: "100%" }}
      p={6}
      mb={5}
      borderRadius="md"
      bg={"#fff7ef"}
      color={"#6B4F27"}
      fontSize={{ base: "sm", md: "md" }}
      fontWeight={200}
      textAlign="justify"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Carousel
        className="w-full max-w-4xl mx-auto my-0 flex justify-center items-center h-[400px]"
        style={{ margin: 0, padding: 0 }}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 p-6 h-full min-h-[300px]" style={{height: '100%'}}>
                <div className="flex flex-col justify-center h-full">
                  <h2 className="text-2xl font-bold">{slide.title}</h2>
                  <p className="text-muted-foreground mt-2">{slide.description}</p>
                </div>

                <div className="flex justify-center items-center h-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    width={400}
                    height={300}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Box>
  );
}
