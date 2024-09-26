import { Skeleton } from "./ui/skeleton"

const ArticleCardSkeleton = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[295px] w-[375px] rounded-xl" />
            <div className="space-y-4">
                <Skeleton className="h-[72px] w-[375px]" />
            </div>
        </div>
    );
}

export default ArticleCardSkeleton