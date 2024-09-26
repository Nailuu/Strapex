import Carousel from "@/components/Carousel";
import { Header } from "@/components/Header";
import HeaderParagraph from "@/components/HeaderParagraph";
import ImageDescription from "@/components/ImageDescription";
import Paragraph from "@/components/Paragraph";
import { getStrapiData, getStrapiURL } from "@/services/data";
import { getAuthToken } from "@/services/token";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Metadata } from "next";
import Image from "next/image";
import qs from "qs";

interface ArticleProps {
    params: { id: string };
}

export async function generateMetadata({ params }: ArticleProps): Promise<Metadata> {
    const authToken = getAuthToken();

    const q = qs.stringify({ fields: ["Title"] });

    const res = await getStrapiData(`/api/articles/${params.id}`, q, authToken);

    return {
        title: res.data.Title,
    }
}

interface ContentItem {
    __component: string;
    id: number;
    [key: string]: any;
}

export interface StrapiImage {
    url: string;
    width: string;
    height: string;
}

const renderContent = (content: ContentItem) => {
    switch (content.__component) {
        case 'idk.paragraph':
            return <Paragraph key={content.id} text={content.Text} />;

        case 'idk.header-paragraph':
            return <HeaderParagraph key={content.id} title={content.Title} text={content.Text} />;

        case 'idk.image-description':
            return <ImageDescription key={content.id} description={content.Description} image={content.Image as StrapiImage} />;

        case 'idk.carousel':
            return <Carousel key={content.id} images={content.Images as StrapiImage[]} description={content.Description} />;

        default:
            return null;
    }
};

const query = qs.stringify({
    fields: ["Title", "createdAt"],
    populate: {
        Cover: {
            fields: ["url", "width", "height"],
        },
        Content: {
            on: {
                "idk.paragraph": {
                    populate: {
                        fields: ["Text"],
                    },
                },
                "idk.header-paragraph": {
                    populate: {
                        fields: ["Title", "Text"],
                    },
                },
                "idk.image-description": {
                    populate: {
                        fields: ["Description"],
                        Image: {
                            fields: ["url", "width", "height"],
                        },
                    },
                },
                "idk.carousel": {
                    populate: {
                        fields: ["Description"],
                        Images: {
                            fields: ["url", "width", "height"],
                        },
                    },
                },
            },
        },
    },
});

const Article = async ({ params }: ArticleProps) => {
    const authToken = getAuthToken();

    const res = await getStrapiData(`/api/articles/${params.id}`, query, authToken);
    const data = res.data;

    const date = new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: "numeric",
        minute: "numeric",
    }).format(new Date(data.createdAt));

    return (
        <div className="flex flex-col min-h-screen" style={{ fontFamily: 'var(--font-jua)' }}>
            <Header />
            <div className="bg-gray-100 flex-grow">
                <div className="my-12 mx-20 flex flex-col items-center gap-4">
                    <div className="w-full">
                        <AspectRatio ratio={4 / 2} className="overflow-hidden rounded-md">
                            <Image
                                width={data.Cover.width}
                                height={data.Cover.height}
                                className="object-cover w-full h-full"
                                src={getStrapiURL() + data.Cover.url}
                                alt=""
                                placeholder="blur"
                                blurDataURL="placeholder.jpg"
                                quality={70}
                            />
                        </AspectRatio>
                    </div>
                    <div className="flex flex-col items-center my-6">
                        <h2 className="text-4xl">{data.Title}</h2>
                        <p className="text-muted-foreground">{date}</p>
                    </div>
                    <div className="flex flex-col items-center gap-12 text-lg text-justify">
                        {data.Content.map((item: ContentItem) => renderContent(item))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Article