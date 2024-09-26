import { Skeleton } from "./ui/skeleton"

const ArticleCardSkeleton = () => {
    return (
        <div className="flex flex-col space-y-3 w-[325px] md:w-[350px] xl:w-[375px]">
            <Skeleton className="h-[295px] rounded-xl" />
            <div className="space-y-4">
                <Skeleton className="h-[52px] md:h-[64px] lg:h-[72px]" />
            </div>
        </div>
    );
}

export default ArticleCardSkeleton