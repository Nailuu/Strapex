import { Card } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

const ArticleSkeleton = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[250px] w-[375px] rounded-xl" />
            <div className="space-y-4">
                <Skeleton className="h-[35px] w-[375px]" />
            </div>
        </div>
    );
}

export default ArticleSkeleton