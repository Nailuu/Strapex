"use client";

import {
    Carousel as CarouselUI,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { StrapiMedia } from "@/app/articles/[id]/page"
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { getStrapiExternalURL } from "@/services/data";

interface CarouselProps {
    medias: StrapiMedia[];
    description: string;
}

const Carousel = ({ medias, description }: Readonly<CarouselProps>) => {
    return (
        <div className="flex flex-col items-center w-full">
            <CarouselUI className="my-2 md:my-4 w-[250px] md:w-[625px] lg:w-full max-w-[1000px]">
                <CarouselContent>
                    {medias.map((media: StrapiMedia, index) => (
                        <CarouselItem key={index}>
                            <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-lg">
                                {(String(media.mime).startsWith("image/")) && (
                                    <img
                                        width={Number(media.width)}
                                        height={Number(media.height)}
                                        className="object-cover w-full h-full"
                                        src={getStrapiExternalURL() + media.url}
                                    />)}
                                {(String(media.mime).startsWith("video/")) && (
                                    <video
                                        className="w-full h-full"
                                        src={getStrapiExternalURL() + media.url}
                                        controls>
                                        Your browser does not support the video tag.
                                    </video>)}
                            </AspectRatio>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </CarouselUI>
            <p className="text-muted-foreground text-sm md:text-md italic px-4 md:px-8 w-[250px] md:w-[625px] lg:w-full lg:mx-4 max-w-[1000px]">{description}</p>
        </div>
    )
}

export default Carousel