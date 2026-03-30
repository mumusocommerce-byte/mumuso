import { Skeleton } from "@/components/ui/skeleton"

function ProductCardSkeleton() {
    return (
        <div className="flex flex-col h-full">
            {/* Image */}
            <Skeleton className="aspect-square rounded-lg mb-3" />
            {/* Category */}
            <Skeleton className="h-3 w-20 mb-2" />
            {/* Title */}
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            {/* Price */}
            <Skeleton className="h-4 w-16" />
        </div>
    )
}

function CollectionSkeleton() {
    return (
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-3 max-w-2xl">
                    <Skeleton className="h-10 w-64 md:h-12 md:w-80" />
                    <Skeleton className="h-5 w-48" />
                </div>
                <Skeleton className="h-4 w-24" />
            </div>

            {/* Filter bar skeleton */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Sidebar skeleton - desktop only */}
                <aside className="hidden lg:block w-64 shrink-0">
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-32 mb-6" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-5 w-5/6" />
                        <Skeleton className="h-5 w-2/3" />
                        <div className="pt-6">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-3/4 mt-3" />
                            <Skeleton className="h-5 w-5/6 mt-3" />
                        </div>
                    </div>
                </aside>

                {/* Product grid skeleton */}
                <div className="flex-1 min-w-0">
                    {/* Sort bar */}
                    <div className="flex justify-between items-center mb-8 pb-4 border-b">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-9 w-44" />
                    </div>

                    {/* Product grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Loading() {
    return <CollectionSkeleton />
}

export { ProductCardSkeleton, CollectionSkeleton }
