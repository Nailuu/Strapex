import { StrapiImage } from "@/app/articles/[id]/page";
import { getStrapiExternalURL } from "@/services/data";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

interface ImageDescriptionProps {
    image: StrapiImage;
    description: string;
}

const ImageDescription = ({ image, description }: Readonly<ImageDescriptionProps>) => {
    return (
        <div className="flex flex-col gap-4 items-center my-2 md:my-4 w-[310px] md:w-[650px] lg:w-full max-w-[1000px]">
            <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-lg">
                <Image
                    width={Number(image.width)}
                    height={Number(image.height)}
                    className="object-cover w-full h-full"
                    src={getStrapiExternalURL() + image.url}
                    alt=""
                    placeholder="blur"
                    blurDataURL="placeholder.jpg"
                    quality={70}
                />
            </AspectRatio>
            <p className="text-muted-foreground w-full text-sm md:text-md italic px-4 md:px-8">{description}</p>
        </div>
    )
}

export default ImageDescription