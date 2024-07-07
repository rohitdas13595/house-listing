"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { title } from "process";
import { ArrowBigRight } from "lucide-react";

const carouselDate= [
  {
    id: 1,
    title: "Buy a house",
    description: "We can help you find a house",
    image: "/carousel/h1.jpg",

  },
  {
    id: 2,
    title: "Sell a house",
    description: "We can help you sell a house",
    image: "/carousel/h2.jpg",
  },
  {
    id: 3,
    title: "Rent a house",
    description: "We can help you rent a house",
    image: "/carousel/h3.jpg",
  },  
  {
    id: 4,
    title: "Buy a house",
    description: "We can help you find a house",
    image: "/carousel/h4.jpg",
  },
  
]
export function CarouselComponent() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, loop: true })
  );


  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {carouselDate.map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div className="card w-full glass">
                <figure>
                  <img
                    src={carouselDate[index].image}
                    alt="car!"
                    className="w-full h-[700px]"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-accent">{carouselDate[index].title}</h2>
                  <p>{carouselDate[index].description}</p>
                  <div className="card-actions justify-end">
                    <a href="/v/listing"><button  className="btn btn-accent text-white">Get Started <ArrowBigRight /> </button> </a>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}


