import { StrapiImage } from "@/app/articles/[id]/page";
import { getStrapiURL } from "@/services/data";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

interface ImageDescriptionProps {
    image: StrapiImage;
    description: string;
}

const ImageDescription = ({ image, description }: Readonly<ImageDescriptionProps>) => {
    return (
        <div className="flex flex-col gap-4 items-center w-[800px] my-4">
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
            <p className="text-muted-foreground text-md italic px-10">{description}</p>
        </div>
    )
}

export default ImageDescription