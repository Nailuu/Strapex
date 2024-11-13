import { StrapiMedia } from "@/app/articles/[id]/page";
import { getStrapiExternalURL } from "@/services/data";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

interface MediaDescriptionProps {
    media: StrapiMedia;
    description: string;
}

const MediaDescription = ({ media, description }: Readonly<MediaDescriptionProps>) => {
    return (
        <div className="flex flex-col gap-4 items-center my-2 md:my-4 w-[310px] md:w-[650px] lg:w-full max-w-[1000px]">
            {(String(media.mime).startsWith("image/")) && (
                <>
                    <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-lg">
                        <img
                            width={Number(media.width)}
                            height={Number(media.height)}
                            className="object-cover w-full h-full"
                            src={getStrapiExternalURL() + media.url}
                        />
                    </AspectRatio>
                    <p className="text-muted-foreground w-full text-sm md:text-md italic px-4 md:px-8">{description}</p>
                </>
            )}
            {(String(media.mime).startsWith("video/")) && (
                <div className="flex flex-col items-center gap-2">
                    <video
                        className="w-full"
                        src={getStrapiExternalURL() + media.url}
                        controls>
                        Your browser does not support the video tag.
                    </video>
                    <p className="text-muted-foreground w-full text-sm md:text-md italic px-4 md:px-8">{description}</p>
                </div>
            )}
        </div>
    )
}

export default MediaDescription