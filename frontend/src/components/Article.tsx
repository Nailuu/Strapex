import { Card, CardFooter } from "./ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import Link from 'next/link';

export interface ArticleProps {
    id: string;
    title: string;
    createdAt: string;
    cover: {
        url: string;
        width: number;
        height: number;
    };
}

const Article = ({ id, title, createdAt, cover }: Readonly<ArticleProps>) => {
    return (
        <Link className="w-[375px]" href={"/articles/" + id}>
            <Card className="overflow-hidden group">
                <AspectRatio ratio={16 / 9} className="overflow-hidden">
                    <Image
                        width={cover.width}
                        height={cover.height}
                        className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                        src={cover.url}
                        alt={title}
                        placeholder="blur"
                        blurDataURL="placeholder.jpg"
                        quality={70}
                    />
                </AspectRatio>
                <CardFooter className="py-3 px-6 bg-secondary flex flex-col items-start" style={{ fontFamily: 'var(--font-jua)' }}>
                    <p className="text-sm text-muted-foreground">{createdAt}</p>
                    <h3 className="text-xl font-semibold truncate max-w-full">{title}</h3>
                </CardFooter>
            </Card>
        </Link>
    );
}

export default Article