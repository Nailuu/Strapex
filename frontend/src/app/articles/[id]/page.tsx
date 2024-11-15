import Carousel from "@/components/Carousel";
import { Header } from "@/components/Header";
import HeaderParagraph from "@/components/HeaderParagraph";
import MediaDescription from "@/components/MediaDescription";
import Paragraph from "@/components/Paragraph";
import { Button } from "@/components/ui/button";
import { getStrapiData, getStrapiExternalURL, getStrapiLocalURL } from "@/services/data";
import { getAuthToken } from "@/services/token";
import { getUserMeLoader, IUser } from "@/services/user";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { FilePenLine } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
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

export interface StrapiMedia {
    url: string;
    width: string;
    height: string;
    mime: string;
}

const renderContent = (content: ContentItem) => {
    switch (content.__component) {
        case 'idk.paragraph':
            return <Paragraph key={content.id} text={content.Text} />;

        case 'idk.header-paragraph':
            return <HeaderParagraph key={content.id} title={content.Title} text={content.Text} />;

        case 'idk.image-description':
            return <MediaDescription key={content.id} description={content.Description} media={content.Media as StrapiMedia} />;

        case 'idk.carousel':
            return <Carousel key={content.id} medias={content.Medias as StrapiMedia[]} description={content.Description} />;

        default:
            return null;
    }
};

const query = qs.stringify({
    fields: ["Title", "updatedAt"],
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
                        Media: {
                            fields: ["url", "width", "height", "mime"],
                        },
                    },
                },
                "idk.carousel": {
                    populate: {
                        fields: ["Description"],
                        Medias: {
                            fields: ["url", "width", "height", "mime"],
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

    const user: IUser = await getUserMeLoader();

    const date = new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: "numeric",
        minute: "numeric",
    }).format(new Date(data.updatedAt));

    return (
        <div className="flex flex-col min-h-screen" style={{ fontFamily: 'var(--font-jua)' }}>
            <Header />
            <div className="bg-gray-100 flex-grow pb-8">
                <div className="lg:my-12 md:mx-12 lg:mx-20 flex flex-col items-center gap-2 md:gap-4 lg:gap-8">
                    <div className="w-full">
                        <AspectRatio ratio={4 / 2} className="overflow-hidden lg:rounded-md">
                            <img
                                width={data.Cover.width}
                                height={data.Cover.height}
                                className="object-cover w-full h-full"
                                src={getStrapiExternalURL() + data.Cover.url}
                                alt={data.Title}
                            />
                        </AspectRatio>
                    </div>
                    <div className="flex flex-col items-center my-2 md:my-6 xl:gap-2">
                        <h2 className="text-3xl md:text-4xl xl:text-5xl">{data.Title}</h2>
                        <p className="text-sm text-muted-foreground xl:text-lg">{date}</p>
                        {user.data.role.name === "Owner" && (
                            <Button asChild className="my-4">
                                <Link href={`${getStrapiExternalURL()}/admin/content-manager/collection-types/api::article.article/${params.id}`} target="_blank">
                                    <FilePenLine className="mr-2 h-4 w-4" />
                                    Edit Article
                                </Link>
                            </Button>
                        )}
                    </div>
                    <div className="flex flex-col items-center gap-12 md:text-lg text-justify w-full max-w-[1200px]">
                        {data.Content.map((item: ContentItem) => renderContent(item))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Article