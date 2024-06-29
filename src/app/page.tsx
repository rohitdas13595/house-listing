import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { CarouselComponent } from "@/components/custom/carousel";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
     <CarouselComponent />
    </main>
  );
}
