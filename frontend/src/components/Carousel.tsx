"use client";

import {
    Carousel as CarouselUI,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import { StrapiImage } from "@/app/articles/[id]/page"
import { Card, CardContent } from "./ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { getStrapiURL } from "@/services/data";

interface CarouselProps {
    images: StrapiImage[];
    description: string;
}

const Carousel = ({ images, description }: Readonly<CarouselProps>) => {
    return (
        <div className="flex flex-col items-center w-full">
            <CarouselUI className="w-[800px] my-4">
                <CarouselContent>
                    {images.map((image: StrapiImage, index) => (
                        <CarouselItem key={index}>
                            <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-lg">
                                <Image
                                    width={Number(image.width)}
                                    height={Number(image.height)}
                                    className="object-cover w-full h-full"
                                    src={getStrapiURL() + image.url}
                                    alt=""
                                    placeholder="blur"
                                    blurDataURL="placeholder.jpg"
                                    quality={70}
                                />
                            </AspectRatio>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </CarouselUI>
            <p className="text-muted-foreground text-md italic px-10">{description}</p>
        </div>
    )
}

export default Carousel