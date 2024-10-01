import { Card, CardFooter } from "./ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Link from 'next/link';

export interface ArticleCardProps {
    id: string;
    title: string;
    updatedAt: string;
    cover: {
        url: string;
        width: number;
        height: number;
    };
}

const ArticleCard = ({ id, title, updatedAt, cover }: Readonly<ArticleCardProps>) => {
    return (
        <Link className="w-[325px] xl:w-[375px] 2xl:w-[425px]" href={"/articles/" + id}>
            <Card className="overflow-hidden group">
                <AspectRatio ratio={4 / 3} className="overflow-hidden">
                    <img
                        width={cover.width}
                        height={cover.height}
                        className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                        src={cover.url}
                        alt={title}
                    />
                </AspectRatio>
                <CardFooter className="py-3 px-6 bg-secondary flex flex-col items-start" style={{ fontFamily: 'var(--font-jua)' }}>
                    <p className="text-sm text-muted-foreground">{updatedAt}</p>
                    <h3 className="text-xl font-semibold truncate max-w-full">{title}</h3>
                </CardFooter>
            </Card>
        </Link>
    );
}

export default ArticleCard